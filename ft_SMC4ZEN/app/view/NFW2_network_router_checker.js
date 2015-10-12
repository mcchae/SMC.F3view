
Ext.define('SMC4ZEN.view.NFW2_network_router_checker', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_checker',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_checkerViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_router_checker'
    },
    // cls: 'zen_body',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onViewportAfterRender',
        beforeclose: 'saveData'
    },
    overflowY: 'auto',
    bodyPadding: 5,
    title : 'Checker',
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'toolbar',
                        // cls: 'zen_toolbar',
                        margin : '0 5 0 -5',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'ic_add',
                                bind: {
                                    text: '{add}'
                                },
                                listeners: {
                                    click: 'onButtonClick'
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'ic_del',
                                bind: {
                                    text: '{del}'
                                },
                                listeners: {
                                    click: 'onButtonClick2'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        id: 'tbl_checker',
                        margin: '5 0 0 0',
                        bodyBorder: true,
                        header: false,
                        title: 'My Grid Panel',
                        columnLines: true,
                        store: 'store_network_router_checker_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: 'num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                flex: 1.5,
                                bind: {
                                    text: '{tag_name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'interface',
                                flex: 1,
                                bind: {
                                    text: '{inter}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'ip',
                                flex: 1,
                                bind: {
                                    text: '{target_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'period',
                                flex: 1,
                                bind: {
                                    text: '{trans_cycle}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(value.type === "non"){
                                        return msg_checker(1,record.data.pool,record.data.fail);
                                    }else{
                                        return msg_checker(2,record.data.fail);
                                    }
                                },
                                dataIndex: 'setting',
                                flex: 3,
                                bind: {
                                    text: '{decision_method}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var val = "";
                                    if(value.action == "Proxy" || value.action == "Proxy2"){
                                        val = value.action;
                                        if(record.data.mac){
                                            val = val + " (Mac : "+record.data.mac+")";
                                        }
                                    }else{
                                        val = value.action;
                                    }
                                    return val;
                                },
                                dataIndex: 'setting',
                                flex: 2,
                                bind: {
                                    text: '{operate_mode}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onTbl_checkerCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create("SMC4ZEN.view.win_router_checker");
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("tbl_checker");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg('conf_del'), function(btn){
            if(btn === "yes"){

                Ext.data.StoreManager.lookup("store_network_router_checker_list").remove(grid_chk);

            }
        });




    },

    onViewportAfterRender: function(component, eOpts) {
        var me = this;

        console.log('this.getViewModel().data - ', this.getViewModel().data);

        if(this.getViewModel().data.network_router_checker !== undefined && this.getViewModel().data.network_router_checker.routing.checker.length > 0){
            Ext.data.StoreManager.lookup("store_network_router_checker_list").loadData(this.getViewModel().data.network_router_checker.routing.checker);
        }
        
        var network_interface = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network;

        var response = setDevInterface(network_interface.ethernet,network_interface.bridge,network_interface.bonding); 

        Ext.data.StoreManager.lookup('store_interface').loadData(response);
    },

    onTbl_checkerCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("SMC4ZEN.view.win_router_checker",{
            edit: "edit",
            record: record
        });
        win.show();
    },

    saveData: function() {

        var checker_list = [];

        Ext.data.StoreManager.lookup("store_network_router_checker_list").each(function(data, idx){

            if(data.data.mac === undefined){
                data.data.mac = null;
            }

            if(data.data.pool === undefined){
                data.data.pool = null;
            }

            delete data.data.id;

            checker_list.push(data.data);
        });

        if(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_checker){

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_checker.routing.checker = checker_list;

        }
        else{

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_checker = {
                'routing': {
                    'checker': checker_list
                }  
            };
        }

        Ext.getCmp('win_zen_device_set').viewState = true;

        return true;
    }

});
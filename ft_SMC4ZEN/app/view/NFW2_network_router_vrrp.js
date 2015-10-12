
Ext.define('SMC4ZEN.view.NFW2_network_router_vrrp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_vrrp',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_vrrpViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_router_vrrp'
    },
    // cls: 'zen_body',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose: 'saveData'
    },
    bodyPadding: 5,
    overflowY: 'auto',
    title : 'VRRP',
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
                                cls: '',
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
                                cls: '',
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
                        id: 'tbl_list',
                        margin: '5 0 0 0',
                        title: '',
                        columnLines: true,
                        store: 'store_network_router_vrrp_list',
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
                                dataIndex: 'vid',
                                flex: 1,
                                bind: {
                                    text: '{group_id}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value.interface;
                                },
                                dataIndex: 'setting',
                                flex: 1,
                                bind: {
                                    text: '{inter}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'priority',
                                flex: 1,
                                bind: {
                                    text: '{priority_level}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'period',
                                flex: 1,
                                bind: {
                                    text: '{period}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'vip',
                                flex: 1,
                                bind: {
                                    text: '{group_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(value.mode === "backup"){
                                        return value.mode.substring(0,1).toUpperCase()+value.mode.substring(1)+" - Boost up : "+record.data.boostup;
                                    }else{
                                        return value.mode.substring(0,1).toUpperCase()+value.mode.substring(1);
                                    }
                                },
                                dataIndex: 'setting',
                                flex: 1,
                                bind: {
                                    text: '{operate_mode}'
                                }
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onTbl_listCellDblClick'
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
        var win = Ext.create("SMC4ZEN.view.win_router_vrrp");
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var tbl = Ext.getCmp("tbl_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        var me = this;

        if(grid_chk.length === 0){
            Ext.Msg.alert(__weguardia,get_msg("sel_del"));
            return false;
        }else{
            Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
                if(btn === "yes"){
                    Ext.data.StoreManager.lookup("store_network_router_vrrp_list").remove(grid_chk);
                }
            });

        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        if(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp !== undefined && Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp.routing.vrrp.length > 0){
            Ext.data.StoreManager.lookup("store_network_router_vrrp_list").loadData(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp.routing.vrrp);
        }

        var network_interface = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network;

        var response = setDevInterface(network_interface.ethernet,network_interface.bridge,network_interface.bonding); 

        Ext.data.StoreManager.lookup('store_interface').loadData(response);
    },

    onTbl_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create("SMC4ZEN.view.win_router_vrrp",{
            edit: "edit",
            record: record
        });
        win.show();
    },

    saveData: function() {

        var vrrp_list = [];

        Ext.data.StoreManager.lookup("store_network_router_vrrp_list").each(function(data, idx){

            delete data.data.id;

            vrrp_list.push(data.data);
        });

        if(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp){

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp.routing.vrrp = vrrp_list;

        }
        else{

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_vrrp = {
                'routing': {
                    'vrrp': vrrp_list
                }  
            };
        }

        Ext.getCmp('win_zen_device_set').viewState = true;

        return true;
    }

});
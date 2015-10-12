
Ext.define('SMC4ZEN.view.NFW2_network_dns_iodns', {
    extend: 'Ext.form.Panel',
    alias: 'widget.nfw2_network_dns_iodns',

    requires: [
        'SMC4ZEN.view.NFW2_network_dns_iodnsViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    config: {
        accessUserInfo: {
            //선택된 메뉴의 정보를 담는 객체
            init: function(){
            	var me = this;
                me.sessionInfo = '';
               
        	}
        }
    },

    viewModel: {
        type: 'nfw2_network_dns_iodns'
    },
    // cls: 'zen_body',
    id: 'pnl_mainView',
    defaultListenerScope: true,
    overflowY: 'auto',
    bodyPadding: 5,
    listeners: {
        afterrender: 'onPnl_mainViewAfterRender',
        beforeclose: 'saveData'
    },
    title : '내부/외부 DNS',
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'toolbar',
                                // cls: 'zen_toolbar',
                                items: [
                                {
                                    xtype: 'button',
                                    id: 'addBtn',
                                    iconCls: 'ic_add',
                                    bind: {
                                        text: '{add}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick4'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'delBtn',
                                    iconCls: 'ic_del',
                                    bind: {
                                        text: '{del}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        cls: 'tbl_fw',
                        id: 'grid_list',
                        margin: '5 0 0 0',
                        title: '',
                        columnLines: true,
                        store: 'store_split_dns_list',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 60,
                                align: 'center',
                                dataIndex: '_num',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var val = value.substring(0,1);
                                    var val_ = value.substring(1);

                                    return val.toUpperCase()+val_;
                                },
                                dataIndex: 'zone',
                                flex: 1,
                                bind: {
                                    text: '{direction}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'dname',
                                flex: 1,
                                bind: {
                                    text: '{domain_name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'field',
                                flex: 0.5,
                                bind: {
                                    text: '{type4}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'hname',
                                flex: 1,
                                bind: {
                                    text: '{host_name}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'ip',
                                flex: 1,
                                bind: {
                                    text: '{host_ip}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return addComma(value);
                                },
                                dataIndex: 'ttl',
                                text: 'TTL',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return value.toUpperCase();
                                },
                                dataIndex: 'ptr',
                                text: 'PTR',
                                flex: 0.5
                            },
                            {
                                xtype: 'actioncolumn',
                                width: 60,
                                align: 'center',
                                items: [
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('chk_use') === 'on')? "b_on":"b_off";
                                        },
                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                            var me = this;

                                            var chk_use = (record.data.chk_use ==="on")?"off":"on";

                                            var obj = {
                                                '_id': record.data._id,
                                                'chk_use': chk_use
                                            };

                                            var _params = {
                                                basename: Ext.encode("splitdns_list"),
                                                obj : Ext.encode(obj),
                                                update : Ext.encode(true)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'setListTypeObj',
                                            _params,
                                            function(response){

                                                Ext.data.StoreManager.lookup("store_split_dns_list").load();
                                            }
                                            );
                                        }
                                    }
                                ]
                            }
                        ],
                        viewConfig: {
                            getRowClass: function(record, rowIndex, rowParams, store) {
                                if(record.get("chk_use") === "off"){

                                    Ext.Function.defer(function(){
                                        this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                    },100, this);

                                    return "stOff";
                                }
                            }
                        },
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        listeners: {
                            celldblclick: 'onGrid_listCellDblClick'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onButtonClick4: function(button, e, eOpts) {
        var store = Ext.data.StoreManager.lookup("store_split_dns_list");

        if(store.getCount() >= 100){
            Ext.Msg.alert("WeGuardia™ ZEN",ValidMaxCnt(100));
            return false;
        }

        var win = Ext.create('SMC4ZEN.view.win_split_dns');
        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelectionModel().getSelection();

        if(grid_chk.length === 0){
            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));
            return false;
        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){
            if(btn === "yes"){

                Ext.data.StoreManager.lookup("store_split_dns_list").remove(grid_chk);
            }
        });
    },

    onPnl_mainViewAfterRender: function(component, eOpts) {
        var me = this;

        if(Ext.getCmp('win_zen_device_set').getViewModel().data.splitdns_list !== undefined && Ext.getCmp('win_zen_device_set').getViewModel().data.splitdns_list.length > 0){
            Ext.data.StoreManager.lookup("store_split_dns_list").loadData(Ext.getCmp('win_zen_device_set').getViewModel().data.splitdns_list);
        }

    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var win = Ext.create('SMC4ZEN.view.win_split_dns',{
            edit: "edit",
            record: record
        });
        win.show();
    },

    saveData: function() {

        var iodns_list = [];

        Ext.data.StoreManager.lookup("store_split_dns_list").each(function(data, idx){

            delete data.data.id;
            iodns_list.push(data.data);
        });

        Ext.getCmp('win_zen_device_set').getViewModel().data.splitdns_list = iodns_list;

        console.log(Ext.getCmp('win_zen_device_set').getViewModel().data);

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});
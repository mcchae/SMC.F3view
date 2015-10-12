
Ext.define('SSL.view.test', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean'
    ],

    id: 'test',
    layout: 'fit',
    title: 'My Window',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    itemId: 'tabControl',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'port',
                            layout: 'fit',
                            title: '서비스 포트',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_service_port',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 100,
                                            dataIndex: 'num',
                                            text: '번호'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'name',
                                            text: '객체명'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 100,
                                            dataIndex: 'name',
                                            text: '프로토콜'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 300,
                                            dataIndex: 'name',
                                            text: '옵션'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'desc',
                                            text: '설명',
                                            flex: 1
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    text: 'MyButton'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'MyButton'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'MyButton'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPortAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            itemId: 'group',
                            layout: 'fit',
                            title: '서비스 그룹',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_service_group',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'number',
                                            text: 'Number'
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'date',
                                            text: 'Date'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'bool',
                                            text: 'Boolean'
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    text: 'MyButton'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'MyButton'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onGroupAfterRender,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPortAfterRender: function(component, eOpts) {
        // var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        // Ext.Ajax.request(
        //     {
        //         url : 'api/ftSSLMsgMgr/sendto',
        //         params :
        //         {
        //             _id : Ext.encode(_id),
        //             header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getServicePort'),
        //             body : Ext.encode({})
        //         },
        //         success : function(res_data)
        //         {
        //             var item = JSON.parse(res_data.responseText);
        //             Ext.getStore('st_ssl_service_port').loadData(item[1].config);
        //         }
        //     });
    },

    onGroupAfterRender: function(component, eOpts) {

    }

});
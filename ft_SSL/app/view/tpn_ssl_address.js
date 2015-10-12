
Ext.define('SSL.view.tpn_ssl_address', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.grid.View',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean'
    ],

    id: 'tpn_ssl_address',
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    itemId: 'pnl_ssl_ipv4',
                    layout: 'fit',
                    title: 'IPv4주소 목록',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ssl_ipv4',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '그룹생성'
                                        }
                                    ]
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'string',
                                    text: '객체명'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: '주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'string',
                                    text: '설명'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onPnl_ssl_ipv4AfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    itemId: 'pnl_ssl_ipv4group',
                    layout: 'fit',
                    title: 'IPv4주소 그룹',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ssl_ipv4group',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '그룹생성'
                                        }
                                    ]
                                }
                            ],
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
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'pnl_ssl_ipv6',
                    layout: 'fit',
                    title: 'IPv6주소 목록',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ssl_ipv6',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '그룹생성'
                                        }
                                    ]
                                }
                            ],
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
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'pnl_ssl_ipv6group',
                    layout: 'fit',
                    title: 'IPv6주소 그룹',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ssl_ipv6group',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '그룹생성'
                                        }
                                    ]
                                }
                            ],
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
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'pnl_ssl_ipv6header',
                    layout: 'fit',
                    title: 'IPv6헤더 목록',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_ssl_ipv6header',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '그룹생성'
                                        }
                                    ]
                                }
                            ],
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
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_ssl_ipv4AfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/method_call',
                params :
                {
                    _id : Ext.encode('549283537b24af2d0679635a'),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpAddress'),
                    body : {}
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);
                    console.log(item);
                }
            });
    }

});
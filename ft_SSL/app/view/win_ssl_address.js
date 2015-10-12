
Ext.define('SSL.view.win_ssl_address', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    height: 560,
    id: 'win_ssl_address',
    width: 900,
    layout: 'fit',
    title: 'My Window',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    id: '',
                    itemId: 'tabControl',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'ipv4',
                            layout: 'fit',
                            title: 'IPv4주소 목록',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_ipv4',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            itemId: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'remove',
                                                    width: 80,
                                                    text: '선택삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onRemoveClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'add',
                                                    width: 80,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onAddClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'grouping',
                                                    width: 80,
                                                    text: '그룹생성'
                                                }
                                            ]
                                        }
                                    ],
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
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var result = [];

                                                for (var i in value)
                                                {
                                                    result.push(value[i].value);
                                                }


                                                return result;
                                            },
                                            dataIndex: 'ip',
                                            text: '주소',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'desc',
                                            text: '설명'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGridItemDblClick,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onIpv4AfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            itemId: 'ipv4_group',
                            layout: 'fit',
                            title: 'IPv4주소 그룹',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_ipv4group',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            itemId: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'remove',
                                                    width: 80,
                                                    text: '선택삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onRemoveClick1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'add',
                                                    width: 80,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onAddClick1,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
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
                                            dataIndex: 'member_name',
                                            text: 'IP주소 객체',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'desc',
                                            text: '설명'
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_ssl_ipv4ItemDblClick1,
                                            scope: me
                                        }
                                    },
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onIpv4_groupAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            itemId: 'ipv6',
                            layout: 'fit',
                            title: 'IPv6주소 목록',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_ipv6',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            itemId: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'remove',
                                                    width: 80,
                                                    text: '선택삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onRemoveClick2,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'add',
                                                    width: 80,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onAddClick2,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'grouping',
                                                    width: 80,
                                                    text: '그룹생성'
                                                }
                                            ]
                                        }
                                    ],
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
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var result = [];

                                                for (var i in value)
                                                {
                                                    result.push(value[i].value);
                                                }


                                                return result;
                                            },
                                            dataIndex: 'ip',
                                            text: '주소',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'desc',
                                            text: '설명'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGridItemDblClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onIpv6AfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            itemId: 'ipv6_group',
                            layout: 'fit',
                            title: 'IPv6주소 그룹',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_ipv6group',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            itemId: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'remove',
                                                    width: 80,
                                                    text: '선택삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onRemoveClick11,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'add',
                                                    width: 80,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onAddClick11,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
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
                                            dataIndex: 'member_name',
                                            text: 'IP주소 객체',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'desc',
                                            text: '설명'
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_ssl_ipv4ItemDblClick11,
                                            scope: me
                                        }
                                    },
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onIpv6_groupAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            itemId: 'ipv6_header',
                            layout: 'fit',
                            title: 'IPv6헤더 목록',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'grid',
                                    store: 'st_ssl_ipv6header',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            itemId: 'toolbar',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    itemId: 'remove',
                                                    width: 80,
                                                    text: '선택삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onRemoveClick3,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'add',
                                                    width: 80,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onAddClick3,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'grouping',
                                                    width: 80,
                                                    text: '그룹생성'
                                                }
                                            ]
                                        }
                                    ],
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
                                            dataIndex: 'list',
                                            text: '헤더 목록',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'desc',
                                            text: '설명'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGridItemDblClick2,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onIpv4AfterRender1,
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

    onRemoveClick: function(button, e, eOpts) {
        var items = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv4').getComponent('grid').getSelectionModel().getSelection();

        body = {'cid' : []};

        for (var i in items)
        {
            body.cid.push(items[i].raw.cid);
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.removeIpAddress'),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSLMsgMgr/sendto',
                            params :
                            {
                                _id : Ext.encode(_id),
                                header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpAddress'),
                                body : Ext.encode({})
                            },
                            success : function(res_data)
                            {
                                var item = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_ipv4').loadData(item[1].config);
                            }
                        });

                }
            });
    },

    onAddClick: function(button, e, eOpts) {
        var ipv4 = Ext.create('SSL.view.win_ssl_ipv4', {
            'isNew' : true
        }).show();
    },

    onGridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        Ext.create('SSL.view.win_ssl_ipv4', {
            'isNew' : false
        }).show();
    },

    onIpv4AfterRender: function(component, eOpts) {
        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpAddress'),
                    body : Ext.encode({})
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);
                    Ext.getStore('st_ssl_ipv4').loadData(item[1].config);
                }
            });
    },

    onRemoveClick1: function(button, e, eOpts) {
        var items = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv4_group').getComponent('grid').getSelectionModel().getSelection();

        body = {'cid' : []};
        var IP_DICT = {};
        var GROUP = [];

        for (var i in items)
        {
            body.cid.push(items[i].raw.cid);
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.removeIpGroup'),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {
                }
            });
    },

    onAddClick1: function(button, e, eOpts) {
        var ipv4 = Ext.create('SSL.view.win_ssl_ipv4group', {
            'isNew' : true
        }).show();
    },

    onGpn_ssl_ipv4ItemDblClick1: function(dataview, record, item, index, e, eOpts) {
        Ext.create('SSL.view.win_ssl_ipv4group', {
            'isNew' : false
        }).show();
    },

    onIpv4_groupAfterRender: function(component, eOpts) {
        var IP_DICT = {};
        var st_ssl_ipv4 = Ext.getStore('st_ssl_ipv4').data.items;
        for (var i in st_ssl_ipv4)
        {
            item = st_ssl_ipv4[i];
            IP_DICT[item.raw.cid] = item.raw.name;
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpGroup'),
                    body : Ext.encode({})
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);

                    var GROUP = item[1].config;

                    for (var i in GROUP)
                    {
                        GROUP[i].member_name = [];
                        for ( var k in GROUP[i].member)
                        {
                            GROUP[i].member_name.push(IP_DICT[GROUP[i].member[k]]);
                        }
                    }

                    Ext.getStore('st_ssl_ipv4group').loadData(GROUP);
                }
            });

    },

    onRemoveClick2: function(button, e, eOpts) {
        var items = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv6').getComponent('grid').getSelectionModel().getSelection();

        body = {'cid' : []};

        for (var i in items)
        {
            body.cid.push(items[i].raw.cid);
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.removeIpv6Address'),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSLMsgMgr/sendto',
                            params :
                            {
                                _id : Ext.encode(_id),
                                header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpv6Address'),
                                body : Ext.encode({})
                            },
                            success : function(res_data)
                            {
                                var item = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_ipv6').loadData(item[1].config);
                            }
                        });
                }
            });


    },

    onAddClick2: function(button, e, eOpts) {
        var ipv4 = Ext.create('SSL.view.win_ssl_ipv6', {
            'isNew' : true
        }).show();
    },

    onGridItemDblClick1: function(dataview, record, item, index, e, eOpts) {
        Ext.create('SSL.view.win_ssl_ipv6', {
            'isNew' : false
        }).show();
    },

    onIpv6AfterRender: function(component, eOpts) {
        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;


        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpv6Address'),
                    body : Ext.encode({})
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);
                    Ext.getStore('st_ssl_ipv6').loadData(item[1].config);
                }
            });
    },

    onRemoveClick11: function(button, e, eOpts) {
        var items = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv6_group').getComponent('grid').getSelectionModel().getSelection();

        body = {'cid' : []};
        var IP_DICT = {};
        var GROUP = [];

        for (var i in items)
        {
            body.cid.push(items[i].raw.cid);
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.removeIpv6Group'),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {
                }
            });
    },

    onAddClick11: function(button, e, eOpts) {
        var ipv4 = Ext.create('SSL.view.win_ssl_ipv6group', {
            'isNew' : true
        }).show();
    },

    onGpn_ssl_ipv4ItemDblClick11: function(dataview, record, item, index, e, eOpts) {
        Ext.create('SSL.view.win_ssl_ipv6group', {
            'isNew' : false
        }).show();
    },

    onIpv6_groupAfterRender: function(component, eOpts) {
        var IP_DICT = {};
        var store = Ext.getStore('st_ssl_ipv6').data.items;

        for (var i in store)
        {
            item = store[i];
            IP_DICT[item.raw.cid] = item.raw.name;
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpv6Group'),
                    body : Ext.encode({})
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);

                    var GROUP = item[1].config;

                    for (var i in GROUP)
                    {
                        GROUP[i].member_name = [];
                        for ( var k in GROUP[i].member)
                        {
                            GROUP[i].member_name.push(IP_DICT[GROUP[i].member[k]]);
                        }
                    }

                    Ext.getStore('st_ssl_ipv6group').loadData(GROUP);
                }
            });

    },

    onRemoveClick3: function(button, e, eOpts) {
        var items = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv6_header').getComponent('grid').getSelectionModel().getSelection();

        body = {'cid' : []};

        for (var i in items)
        {
            body.cid.push(items[i].raw.cid);
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.removeIpv6Header'),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {

                }
            });
    },

    onAddClick3: function(button, e, eOpts) {
        var ipv4 = Ext.create('SSL.view.win_ssl_ipv6header', {
            'isNew' : true
        }).show();
    },

    onGridItemDblClick2: function(dataview, record, item, index, e, eOpts) {
        Ext.create('SSL.view.win_ssl_ipv6header', {
            'isNew' : false
        }).show();
    },

    onIpv4AfterRender1: function(component, eOpts) {
        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpv6Header'),
                    body : Ext.encode({})
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);
                    console.log(item[1].config);
                    data = item[1].config;

                    for (var i in data)
                    {
                        data[i].list = [];

                        if(data[i].ah === true)
                        {
                            data[i].list.push('인증 헤더');
                        }

                        if(data[i].hop === true)
                        {
                            data[i].list.push('홉바이홉 헤더');
                        }

                        if(data[i].esp === true)
                        {
                            data[i].list.push('ESP 헤더');
                        }

                        if(data[i].dest === true)
                        {
                            data[i].list.push('목적지 옵션 헤더');
                        }
                    }

                    Ext.getStore('st_ssl_ipv6header').loadData(data);

                }
            });
    }

});
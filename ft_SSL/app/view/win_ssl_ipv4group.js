
Ext.define('SSL.view.win_ssl_ipv4group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    height: 578,
    id: 'win_ssl_ipv4group',
    width: 535,
    autoScroll: true,
    layout: 'vbox',
    title: 'IPv4주소 그룹',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    itemId: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'name',
                                    width: 500,
                                    fieldLabel: '그룹명',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'desc',
                                    width: 500,
                                    fieldLabel: '설명',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'container',
                                    height: 400,
                                    itemId: 'ctn',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_label',
                                            width: 105,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'IPv4주소 목록'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 400,
                                            itemId: 'ctn',
                                            width: 395,
                                            autoScroll: true,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    itemId: 'ctn_search',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            width: 360
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            width: 8
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            text: 'S'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 10
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    itemId: 'grid',
                                                    header: false,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'string',
                                                            text: 'String'
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    })
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 100,
                                                    text: '확인',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    margin: '0 0 0 5',
                                                    width: 100,
                                                    text: '취소',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var component = Ext.getCmp('win_ssl_ipv4group');
        var name = component.getComponent('fm').getComponent('ctn').getComponent('name').getValue();
        var desc = component.getComponent('fm').getComponent('ctn').getComponent('desc').getValue();
        var store = component.getComponent('fm').getComponent('ctn').getComponent('ctn').getComponent('ctn').getComponent('grid').getSelectionModel().getSelection();

        var member = [];
        for (var i in store)
        {
            member.push(store[i].raw.cid);
        }

        var header  = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.addIpGroup';
        var body = {'num': 0, 'name':name, 'desc' : desc, 'member': member};


        if (component.isNew === false)
        {
            var raw = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv4_group').getComponent('grid').getSelectionModel().getSelection()[0].raw;
            var header  = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.modifyIpGroup';
            var body = {'cid' : raw.cid, 'num':raw.num, 'name':name, 'desc' : desc, 'member': member};
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode(header),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {
                    component.destroy();
                }
            });

    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        if(component.isNew === false)
        {
            var item = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv4_group').getComponent('grid').getSelectionModel().getSelection()[0].raw;

            component.getComponent('fm').getComponent('ctn').getComponent('name').setValue(item.name);
            component.getComponent('fm').getComponent('ctn').getComponent('desc').setValue(item.desc);

            var store = Ext.create('Ext.data.Store', {
                fields : [
                    {
                        name : 'cid'
                    },
                    {
                        name : 'num'
                    },
                    {
                        name : 'name'
                    },
                    {
                        name : 'member_name'
                    },
                    {
                        name : 'desc'
                    }
                ]
            });

            var column = [
                {
                    xtype: 'gridcolumn',
                    flex : 1,
                    dataIndex: 'name',
                    text: '객체명'
                }
            ];

            grid = component.getComponent('fm').getComponent('ctn').getComponent('ctn').getComponent('ctn').getComponent('grid');
            grid.reconfigure(store, column);

            store.loadData(Ext.getStore('st_ssl_ipv4').data.items);

            var selectedItems = [];

            for (var i in store.data.items)
            {
                for (var m in item.member)
                {
                    if (store.data.items[i].raw.cid === item.member[m])
                    {
                        selectedItems.push(store.data.items[i]);
                    }
                }

            }

            grid.getSelectionModel().select(selectedItems);
        }
    }

});
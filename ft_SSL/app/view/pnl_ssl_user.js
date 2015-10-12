
Ext.define('SSL.view.pnl_ssl_user', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    id: 'pnl_ssl_user',
    title: '관리자 설정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_ssl_user',
                    store: 'st_ssl_user',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    width: 70,
                                    text: '추가',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 70,
                                    text: '수정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 70,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
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
                            width: 160,
                            dataIndex: 'name',
                            text: '이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: '@id',
                            text: '아이디'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'phone',
                            text: '전화번호'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'email',
                            text: '이메일'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etc',
                            text: '설명',
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.create('SSL.view.win_ssl_user',{isNew : true}).show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var parent = Ext.getCmp('pnl_ssl_user');
        var gpn_ssl_user = parent.getComponent('gpn_ssl_user');

        selectedItem = gpn_ssl_user.getSelectionModel().getSelection();

        if (selectedItem.length === 0)
        {
            Ext.Msg.show({
                title:'경고',
                msg: '수정할 관리자를 선택하세요',
                buttons: Ext.Msg.OK
            });
            return;
        }

        Ext.create('SSL.view.win_ssl_user',{isNew : false}).show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var parent = Ext.getCmp('pnl_ssl_user');
        var gpn_ssl_user = parent.getComponent('gpn_ssl_user');


        selectedItem = gpn_ssl_user.getSelectionModel().getSelection();
        if (selectedItem.length === 0)
        {
            Ext.Msg.show({
                title:'경고',
                msg: '삭제할 관리자를 선택하세요',
                buttons: Ext.Msg.OK
            });
            return;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/RemoveUser',
                params : {
                    user_id : Ext.encode(selectedItem[0].raw['@id'])
                },
                success : function(res_data)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetUsers',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_user').loadData(resObj);
                            }
                        });
                }
            });
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetUsers',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_ssl_user').loadData(resObj);
                }
            });


    }

});
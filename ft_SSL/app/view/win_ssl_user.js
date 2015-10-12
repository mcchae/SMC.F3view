
Ext.define('SSL.view.win_ssl_user', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 255,
    id: 'win_ssl_user',
    width: 633,
    title: '관리자',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn',
                    padding: '5 5 5 5',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_id',
                            width: 300,
                            fieldLabel: '아이디'
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_password',
                                    width: 300,
                                    fieldLabel: '패스워드',
                                    inputType: 'password'
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_confirm',
                                    width: 300,
                                    fieldLabel: '패스워드 확인',
                                    inputType: 'password'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 5
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_name',
                            width: 300,
                            fieldLabel: '이름'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_phone',
                            width: 300,
                            fieldLabel: '전화번호'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_email',
                            width: 300,
                            fieldLabel: '이메일'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_etc',
                            width: 610,
                            fieldLabel: '기타설명'
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
                                    xtype: 'button',
                                    width: 70,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    width: 70,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 4
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_ssl_userAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var parent = Ext.getCmp('win_ssl_user');

        var name = parent.getComponent('ctn').getComponent('txf_name').getValue();
        var id = parent.getComponent('ctn').getComponent('txf_id').getValue();
        var password =  parent.getComponent('ctn').getComponent('ctn').getComponent('txf_password').getValue();
        var confirm =  parent.getComponent('ctn').getComponent('ctn').getComponent('txf_confirm').getValue();
        var phone = parent.getComponent('ctn').getComponent('txf_phone').getValue();
        var email = parent.getComponent('ctn').getComponent('txf_email').getValue();
        var etc = parent.getComponent('ctn').getComponent('txf_etc').getValue();

        if (id === '')
        {
            Ext.Msg.show({
                title:'경고',
                msg: '아이디를 입력하세요.',
                buttons: Ext.Msg.OK
            });
            return;
        }

        if (password === '')
        {
            Ext.Msg.show({
                title:'경고',
                msg: '패스워드를 입력하세요.',
                buttons: Ext.Msg.OK
            });
            return;
        }

        if (password != confirm)
        {
            Ext.Msg.show({
                title:'경고',
                msg: '패스워드가 일치하지 않습니다.',
                buttons: Ext.Msg.OK
            });
            return;
        }

        if (Ext.getCmp('win_ssl_user').isNew === true)
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/AddUser',
                    params : {
                        name : Ext.encode(name),
                        user_id : Ext.encode(id),
                        pwd : Ext.encode(password),
                        email : Ext.encode(email),
                        phone : Ext.encode(phone),
                        etc : Ext.encode(etc)
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
        }
        else
        {
            var pnl_ssl_user = Ext.getCmp('pnl_ssl_user');
            var gpn_ssl_user = pnl_ssl_user.getComponent('gpn_ssl_user');
            item = gpn_ssl_user.getSelectionModel().getSelection()[0].raw;
            before_id = item['@id'];

            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/ModifyUser',
                    params : {
                        before_id : Ext.encode(before_id),
                        name : Ext.encode(name),
                        user_id : Ext.encode(id),
                        pwd : Ext.encode(password),
                        email : Ext.encode(email),
                        phone : Ext.encode(phone),
                        etc : Ext.encode(etc)
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
        }

        Ext.getCmp('win_ssl_user').destroy();
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('win_ssl_user').destroy();
    },

    onWin_ssl_userAfterRender: function(component, eOpts) {
        var parent = Ext.getCmp('win_ssl_user');

        console.log(component.isNew);
        if (component.isNew === false)
        {
            var pnl_ssl_user = Ext.getCmp('pnl_ssl_user');
            var gpn_ssl_user = pnl_ssl_user.getComponent('gpn_ssl_user');

            item = gpn_ssl_user.getSelectionModel().getSelection()[0].raw;

            parent.getComponent('ctn').getComponent('txf_name').setValue(item.name);
            parent.getComponent('ctn').getComponent('txf_id').setValue(item['@id']);

            parent.getComponent('ctn').getComponent('txf_phone').setValue(item.phone);
            parent.getComponent('ctn').getComponent('txf_email').setValue(item.email);
            parent.getComponent('ctn').getComponent('txf_etc').setValue(item.etc);
        }
    }

});
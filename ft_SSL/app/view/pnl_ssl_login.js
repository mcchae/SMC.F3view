
Ext.define('SSL.view.pnl_ssl_login', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    baseCls: 'img_background',
    border: false,
    id: 'pnl_ssl_login',
    itemId: 'pnl_ssl_login',
    header: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'container',
                    height: 30,
                    itemId: 'ctn_login',
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
                            cls: 'ssl_logo',
                            width: 280
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_login',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_id',
                                    width: 140,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: {
                                            fn: me.onTxf_idKeydown,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_password',
                                    width: 140,
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: {
                                            fn: me.onTxf_passwordKeydown,
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
                                    flex: 1,
                                    width: 60,
                                    text: '로그인',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick21,
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
                },
                {
                    xtype: 'container',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    },

    onTxf_idKeydown: function(textfield, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_login');
        var txf_id = pnl.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_id');
        var txf_password = pnl.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_password');

        if(e.keyCode == 13)
        {
            if(txf_id.getValue() !== '' && txf_password.getValue() !== '')
            {
                pnl.login();
            }

        }
    },

    onTxf_passwordKeydown: function(textfield, e, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_login');
        var txf_id = pnl.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_id');
        var txf_password = pnl.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_password');

        if(e.keyCode == 13)
        {
            if(txf_id.getValue() !== '' && txf_password.getValue() !== '')
            {
                pnl.login();
            }

        }
    },

    onButtonClick21: function(button, e, eOpts) {
        var parent = Ext.getCmp('pnl_ssl_login');
        console.log('login');
        parent.login();
    },

    login: function() {
        var parent = Ext.getCmp('pnl_ssl_login');
        var id = parent.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_id').getValue();
        var pwd = parent.getComponent('ctn_login').getComponent('ctn_login').getComponent('txf_password').getValue();

        console.log('web2');

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/Login',
                params : {
                    user_id : Ext.encode(id),
                    pwd : Ext.encode(pwd)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    if (resObj === false)
                    {
                        Ext.Msg.show({
                            title:'로그인 실패',
                            msg: '로그인에 실패했습니다. 확인 후 재시도하십시오.',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });

                        return;
                    }
                    else
                    {
                        Ext.getCmp('title_panel').height = 50;

                        Ext.getCmp('pnl_ssl_login').destroy();

                        Ext.getCmp('working_panel').removeAll();
                        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_devices'));


                        Ext.getCmp('main_panel').doComponentLayout();

                    }

                },
                failure : function(result, request)
                {
                    Ext.Msg.alert('Failed');
                }

            });


    }

});
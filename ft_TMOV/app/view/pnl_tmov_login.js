
Ext.define('TMOV.view.pnl_tmov_login', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    border: false,
    id: 'pnl_tmov_login',
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
                    height: 230
                },
                {
                    xtype: 'container',
                    height: 300,
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
                            cls: 'background',
                            width: 600,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 70
                                },
                                {
                                    xtype: 'container',
                                    height: 200,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 270
                                        },
                                        {
                                            xtype: 'container',
                                            width: 250,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    height: 44
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_tmov_login_id',
                                                    fieldLabel: '아이디',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'font-size:18px;color:#12619D;font-weight:bold;',
                                                    labelWidth: 80,
                                                    listeners: {
                                                        specialkey: {
                                                            fn: me.onTxf_tmov_login_idSpecialkey,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    height: 10
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_tmov_login_pwd',
                                                    fieldLabel: '비밀번호',
                                                    labelSeparator: ' ',
                                                    labelStyle: 'font-size:18px;color:#12619D;font-weight:bold;',
                                                    labelWidth: 80,
                                                    inputType: 'password',
                                                    listeners: {
                                                        specialkey: {
                                                            fn: me.onTxf_tmov_login_pwdSpecialkey,
                                                            scope: me
                                                        }
                                                    }
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
                                                            width: 170
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            width: 80,
                                                            text: '로그인',
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

    onTxf_tmov_login_idSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('pnl_tmov_login').login();
        }
    },

    onTxf_tmov_login_pwdSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('pnl_tmov_login').login();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('pnl_tmov_login').login();
    },

    login: function() {
        var id = Ext.getCmp('txf_tmov_login_id').getValue();
        var pwd = Ext.getCmp('txf_tmov_login_pwd').getValue();
        var code = Math.floor((Math.random() * 10000) + 1);
        var component = Ext.getCmp('pnl_tmov_login');

        if (id === '' || id === undefined)
        {
            Ext.MessageBox.show({ title: '로그인 실패', msg: '사용자 ID를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (pwd === '' || pwd === undefined)
        {
            Ext.MessageBox.show({ title: '로그인 실패', msg: '비밀번호를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/Login',
                params : {
                    user_id : Ext.encode(id),
                    pwd : Ext.encode(pwd),
                    code : code
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    if (resObj.retVal.result === false)
                    {
                        Ext.MessageBox.show({ title: '로그인 실패', msg: '로그인에 실패했습니다. 확인 후 재시도하십시오.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                        return;
                    }

                    if (resObj.retVal.result === true)
                    {
                        if(resObj.retVal.user.level === 4)
                        {
                            Ext.getCmp('main').user = resObj.retVal.user.userid;
                            Ext.getCmp('txf_tmov_login_id').setValue('');
                            Ext.getCmp('txf_tmov_login_pwd').setValue('');
                            Ext.create('TMOV.view.win_tmov_manager').show();
                        }
                        else
                        {
                            component.login_success(resObj.retVal.user);
                        }
                    }

                    if (resObj.retVal.result === 'other use')
                    {
                        Ext.MessageBox.show({ title :'로그인', msg : '사용자가 접속중입니다. 기존 접속을 종료하고 접속 하시겠습니까?', buttons : Ext.MessageBox.OKCANCEL, buttonText : {ok : '확인', cancel : '취소'}, fn : function(btn)
                                             {
                                                 if (btn === 'ok')
                                                 {
                                                     Ext.Ajax.request(
                                                         {
                                                             url : 'api/ftTMOV/Login',
                                                             params : {
                                                                 user_id : Ext.encode(id),
                                                                 pwd : Ext.encode(pwd),
                                                                 code : code,
                                                                 force : Ext.encode(true)
                                                             },
                                                             success : function(res_data)
                                                             {
                                                                 var resObj = JSON.parse(res_data.responseText);

                                                                 if (resObj.retVal.result === false)
                                                                 {
                                                                     Ext.MessageBox.show({ title: '로그인 실패', msg: '로그인에 실패했습니다. 확인 후 재시도하십시오.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                                                     return;
                                                                 }

                                                                 if (resObj.retVal.result === true)
                                                                 {
                                                                     if(resObj.retVal.user.level === 4)
                                                                     {
                                                                         Ext.getCmp('main').user = resObj.retVal.user.userid;
                                                                         Ext.getCmp('txf_tmov_login_id').setValue('');
                                                                         Ext.getCmp('txf_tmov_login_pwd').setValue('');
                                                                         Ext.create('TMOV.view.win_tmov_manager').show();
                                                                     }
                                                                     else
                                                                     {
                                                                         component.login_success(resObj.retVal.user);
                                                                     }
                                                                 }
                                                             }
                                                         }
                                                     );
                                                 }
                                             }
                                            }
                                           );
                    }
                },
                failure : function(result, request)
                {
                    Ext.MessageBox.show({ title : '로그인 실패', msg : '로그인에 실패했습니다. 확인 후 재시도하십시오.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                    return;
                }
            }
        );
    },

    login_success: function(user_id) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetGroup',
                params : {
                    user : Ext.encode(user_id)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getCmp('tpn_tmov_tree').setRootNode(resObj);

                    Ext.getCmp('tpn_tmov_tree').getSelectionModel().select(0);

                    var treeview = Ext.getCmp('tpn_tmov_tree');

                    var selectedItem = treeview.getSelectionModel().getSelection();

                    if (selectedItem.length === 0)
                        return;

                    _id = selectedItem[0].raw._id;

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetDevices',
                            params : {
                                parent : Ext.encode(_id),
                                user : Ext.encode(user_id)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_tmov_device').loadData(resObj);
                            }
                        }
                    );

                }
            }
        );

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtensionGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getCmp('tpn_tmov_extension').setRootNode(resObj);

                    Ext.getCmp('tpn_tmov_extension').getSelectionModel().select(0);
                }
            }
        );

        Ext.getCmp('pnl_tmov_header').height = 76;
        Ext.getCmp('pnl_tmov_login').destroy();

        Ext.getCmp('pnl_tmov_working').removeAll();
        Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_main'));

        Ext.getCmp('tpn_tmov_tree').show();
        Ext.getCmp('main').user = user_id;
        Ext.getCmp('main').alive_check();

        Ext.getCmp('main').doComponentLayout();

    }

});
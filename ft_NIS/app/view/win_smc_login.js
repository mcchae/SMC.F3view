
Ext.define('SMC.view.win_smc_login', {
    extend: 'Ext.window.Window',
    alias: 'widget.smc_login',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    baseCls: '',
    height: 443,
    id: 'win_smc_login',
    width: 769,
    resizable: false,
    bodyCls: 'smc_login_bgcolor',
    closable: false,
    header: false,
    title: 'My Window',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    cls: 'smc_login_form',
                    height: 580,
                    itemId: 'ctn_smc_loginview',
                    width: 950,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0.7,
                            itemId: 'ctn_smc_margintop'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_loginitems',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.9,
                                    itemId: 'ctn_smc_marginleft'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_logincenter',
                                    layout: {
                                        type: 'vbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'smc_login_item',
                                            itemId: 'txf_id',
                                            margin: '0, 0, 10, 0',
                                            width: 240,
                                            fieldLabel: '아이디',
                                            labelWidth: 80,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: {
                                                    fn: me.onTxf_idKeypress,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            cls: 'smc_login_item',
                                            itemId: 'txf_pw',
                                            margin: '0, 0, 15, 0',
                                            width: 240,
                                            fieldLabel: '비밀번호',
                                            labelWidth: 80,
                                            inputType: 'password',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: {
                                                    fn: me.onTxf_pwKeypress,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            baseCls: '',
                                            cls: 'smc_login_button',
                                            height: 31,
                                            itemId: 'bt_login',
                                            margin: '0, 0, 0, 83',
                                            width: 159,
                                            text: '',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_loginClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_marginright'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_marginbott'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onTxf_idKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            // 0. 공통변수 선언

            var txf_id = textfield.getValue();
            var txf_pw = textfield.up().down('[itemId=txf_pw]').getValue();

            // 1. ID가 입력되지 않았다면 에러메세지 호출 / 리턴

            if(txf_id === null || txf_id.length <= 0){

                Ext.Msg.show({

                    'title' : 'WeGuardia™ SMC 2.0',
                    'msg' : '아이디를 입력하세요.',
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.ERROR,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.focus();

                        }

                    }

                });

                return;

            }

            // 2. 비밀번호가 입력되지 않았다면 에러메세지 호출 / 리턴

            if(txf_pw === null || txf_pw.length <= 0){

                Ext.Msg.show({

                    'title' : 'WeGuardia™ SMC 2.0',
                    'msg' : '비밀번호를 입력하세요.',
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.ERROR,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.up().down('[itemId=txf_pw]').focus();

                        }

                    }

                });

                return;

            }

            this.execute_login();

        }
    },

    onTxf_pwKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            // 0. 공통변수 선언

            var txf_id = textfield.up().down('[itemId=txf_id]').getValue();
            var txf_pw = textfield.getValue();

            // 1. ID가 입력되지 않았다면 에러메세지 호출 / 리턴

            if(txf_id === null || txf_id.length <= 0){

                Ext.Msg.show({

                    'title' : 'WeGuardia™ SMC 2.0',
                    'msg' : '아이디를 입력하세요.',
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.ERROR,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.up().down('[itemId=txf_id]').focus();

                        }

                    }

                });

                return;

            }

            // 2. 비밀번호가 입력되지 않았다면 에러메세지 호출 / 리턴

            if(txf_pw === null || txf_pw.length <= 0){

                Ext.Msg.show({

                    'title' : 'WeGuardia™ SMC 2.0',
                    'msg' : '비밀번호를 입력하세요.',
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.ERROR,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.focus();

                        }

                    }

                });

                return;

            }

            this.execute_login();

        }
    },

    onBt_loginClick: function(button, e, eOpts) {
        // onBt_loginClick =====================================================================================================================================================================
        //
        // 일 시 : 2015.07.08
        //
        // 설 명 : execute_login 함수를 호출합니다.
        //
        // =====================================================================================================================================================================================

        var txf_id = button.up().down('[itemId=txf_id]');
        var txf_pw = button.up().down('[itemId=txf_pw]');

        if(!txf_id.getValue()){

            Ext.Msg.show({

                'title' : 'WeGuardia™ SMC 2.0',
                'msg' : '아이디를 입력하세요.',
                'buttons' : Ext.Msg.OK,
                'icon' : Ext.Msg.ERROR,
                'fn' : function(res){

                    if(res === 'ok'){

                        txf_id.focus();

                    }

                }

            });

            return;

        }

        if(!txf_pw.getValue()){

            Ext.Msg.show({

                'title' : 'WeGuardia™ SMC 2.0',
                'msg' : '비밀번호를 입력하세요.',
                'buttons' : Ext.Msg.OK,
                'icon' : Ext.Msg.ERROR,
                'fn' : function(res){

                    if(res === 'ok'){

                        txf_pw.focus();

                    }

                }

            });

            return;

        }

        this.execute_login();
    },

    execute_login: function(is_session_quit, is_authorization_quit) {
        var me = this;

        var vp = Ext.getCmp('vp_SMC_mainView');
        var id = me.down('textfield[itemId="txf_id"]').getValue();
        var pw = me.down('textfield[itemId="txf_pw"]').getValue();
        var access_ip = vp.clientInfo.clientIp;
        var dest_ip = vp.clientInfo.hostIp;

        var params = {};

        params.userid = Ext.encode(id);
        params.timeout = 600;
        params.dest_ip = Ext.encode(dest_ip);
        params.access_ip = Ext.encode(access_ip);
        params.credential = Ext.encode(pw);

        if(is_session_quit !== null){

            params.otp = Ext.encode(null);
            params.is_session_quit = Ext.encode(is_session_quit);
            params.is_authorization_quit = Ext.encode(is_authorization_quit);

        }

        request_helper.xmlrpc_call_JsonP(

            'ftSMC',
            'logIn',
            params,
            function(res){

                session_id = res;

                vp.clientInfo.sessionInfo = res;
                vp.clientInfo.loginID = id;
                vp.after_login(me, id);

            }

        );
    }

});
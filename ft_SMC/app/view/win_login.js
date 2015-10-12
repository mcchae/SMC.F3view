
Ext.define('SMC.view.win_login', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 331,
    id: 'win_login',
    width: 470,
    resizable: false,
    layout: 'hbox',
    closable: false,
    title: 'WeGuardia SMC 2.0 Login',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'top',
                    height: 246,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 0,
                            id: 'txt_login_id',
                            itemId: 'txt_login_id',
                            width: 301,
                            fieldLabel: 'ID',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keydown: {
                                    fn: me.onTxt_login_idKeydown,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'txt_login_pwd',
                            itemId: 'txt_login_pin',
                            width: 301,
                            fieldLabel: 'Password',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            inputType: 'password',
                            enableKeyEvents: true,
                            listeners: {
                                keydown: {
                                    fn: me.onTxt_login_pwdKeydown,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    height: 43,
                    width: 376,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margins: '10,10,10,10',
                            height: 30,
                            id: 'btn_login_accept',
                            width: 90,
                            text: '로그인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_login_acceptClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                close: {
                    fn: me.onWin_loginClose,
                    scope: me
                },
                afterrender: {
                    fn: me.onWin_loginAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxt_login_idKeydown: function(textfield, e, eOpts) {
        var me = this;
        var code = e.browserEvent.keyCode;

        if(code === 13){

            var id = textfield.value;
            var pin = Ext.getCmp('txt_login_pwd').getValue();

            if( id === null || id.length <= 0 )
                return;
            if( pin === null || pin.length <= 0 ){
                Ext.getCmp('txt_login_pwd').focus();
                return;
            }


            me.execute_login();

        //     var _svc = 'ft_SMC';
        //     var _func = 'logIn';
        //     var _params = {

        //         userid : Ext.encode(id),
        //         credential: Ext.encode(pin)
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         _svc,
        //         _func,
        //         _params,
        //         function(response){

        //             console.log(response);

        //             Ext.getCmp(me.parentId).clientInfo.sessionInfo = response;
        //             Ext.getCmp(me.parentId).clientInfo.licalizationInfo = Ext.getCmp('cb_language').getValue();

        //             Ext.getCmp('log_button').setText('로그아웃');

        //             me.close();

        //         }
        //     );



        }
    },

    onTxt_login_pwdKeydown: function(textfield, e, eOpts) {
        var me = this;
        var code = e.browserEvent.keyCode;

        if(code === 13){

            var pin = textfield.value;
            var id = Ext.getCmp('txt_login_id').getValue();

            if( pin === null || pin.length <= 0 )
                return;
            if( id === null || id.length <= 0 ){
                Ext.getCmp('txt_login_id').focus();
                return;
            }


            me.execute_login();

        //     var _svc = 'ft_SMC';
        //     var _func = 'logIn';
        //     var _params = {

        //         userid : Ext.encode(id),
        //         credential: Ext.encode(pin)
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         _svc,
        //         _func,
        //         _params,
        //         function(response){

        //             console.log(response);

        //             Ext.getCmp(me.parentId).clientInfo.sessionInfo = response;
        //             Ext.getCmp(me.parentId).clientInfo.licalizationInfo = Ext.getCmp('cb_language').getValue();

        //             Ext.getCmp('log_button').setText('로그아웃');

        //             me.close();

        //         }
        //     );



        }
    },

    onBtn_login_acceptClick: function(button, e, eOpts) {
        var me = this;

        me.execute_login();
    },

    onWin_loginClose: function(panel, eOpts) {
        // 로그인 세션 확인
        console.log('login windows close event');
    },

    onWin_loginAfterRender: function(component, eOpts) {
        var me = this;
        tfID = me.down('textfield[itemId="txt_login_id"]');
        console.log('ifID->',tfID);
        tfID.focus();


    },

    execute_login: function(is_session_quit, is_authorization_quit) {
        var me = this;

        var id = me.down('textfield[itemId="txt_login_id"]').getValue();
        var pin = me.down('textfield[itemId="txt_login_pin"]').getValue();
        var access_ip = Ext.getCmp('vp_SMC_mainView').clientInfo.clientIp;
        var dest_ip =  Ext.getCmp('vp_SMC_mainView').clientInfo.hostIp;

        console.log('cinfo ', Ext.getCmp('vp_SMC_mainView').clientInfo);

        var _params = {
                userid : Ext.encode(id),
                credential : Ext.encode(pin),
                timeout : 600,
                access_ip : Ext.encode(access_ip),
                dest_ip : Ext.encode(dest_ip)

            };

        if(is_session_quit !== null){

            _params = {
                userid : Ext.encode(id),
                credential : Ext.encode(pin),
                timeout : 600,
                access_ip : Ext.encode(access_ip),
                dest_ip : Ext.encode(dest_ip),
                otp : Ext.encode(null),
                is_session_quit : Ext.encode(is_session_quit),
                is_authorization_quit : Ext.encode(is_authorization_quit)

            };
        }


        // 20140822 로그인 창 임시제거 시작 - login
        ///
        request_helper.xmlrpc_call_JsonP(
            'ftSMC',
            'logIn',
            _params,
            function(response){
                //         if (response.retcode){
                //             Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo = response.retval;
                //             Ext.getCmp('vp_SMC_mainView').after_login(null);
                //         }
                //         else{
                //             Ext.Msg.show({
                //                 title: '로그인 실패',
                //                 msg: response.errmsg,
                //                 width: 300,
                //                 buttons: Ext.Msg.OK,
                //                 icon: Ext.window.MessageBox.INFO
                //             });

                //         }
                Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo = response;
                session_id = response;
                Ext.getCmp('vp_SMC_mainView').clientInfo.loginID = id;
                /*
                                사용자 정보를 받아오기 위해 id값도 매개변수로 넘겨줌
                                Ext.getCmp('vp_SMC_mainView').after_login(me);

                            */
                        Ext.getCmp('vp_SMC_mainView').after_login(me, id);


                    }
                );
        // 20140822 로그인 창 임시제거 끝 - login

    }

});
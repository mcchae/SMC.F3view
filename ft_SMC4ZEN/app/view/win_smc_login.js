
Ext.define('SMC4ZEN.view.win_smc_login', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_smc_loginViewModel',
        'SMC4ZEN.view.win_smc_loginViewController',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_smc_login',
    viewModel: {
        type: 'win_smc_login'
    },
    reference: 'win_smc_login',
    autoShow: true,
    baseCls: '',
    cls: 'smc_login_bgcolor',
    draggable: false,
    height: 401,
    id: 'win_smc_login',
    resizable: false,
    width: 662,
    closable: false,
    header: false,
    title: 'My Window',
    maximized: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            cls: 'smc_login_formbg',
            height: 570,
            itemId: 'ctn_smc_loginform',
            width: 930,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1.13,
                    itemId: 'ctn_smc_top'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_smc_mid',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0.9,
                            itemId: 'ctn_smc_left'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_items',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    reference: 'txf_id',
                                    cls: 'smc_login_item',
                                    itemId: 'txf_id',
                                    margin: '0, 0, 15, 0',
                                    maxHeight: 20,
                                    maxWidth: 240,
                                    fieldLabel: '아이디',
                                    labelWidth: 70,
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: 'onTxf_idKeypress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'txf_pw',
                                    cls: 'smc_login_item',
                                    height: 20,
                                    itemId: 'txf_pw',
                                    margin: '0, 0, 15, 0',
                                    maxWidth: 240,
                                    fieldLabel: '비밀번호',
                                    labelWidth: 70,
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    enforceMaxLength: false,
                                    listeners: {
                                        keypress: 'onTxf_pwKeypress'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    baseCls: '',
                                    cls: 'smc_login_button',
                                    height: 30,
                                    itemId: 'bt_login',
                                    margin: '0, 0, 0, 73',
                                    maxWidth: 168,
                                    text: '',
                                    listeners: {
                                        click: 'onBt_loginClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_right'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_smc_bot'
                }
            ]
        }
    ],

    /*
        일 시 : 2015.07.14

        설 명 : 로그인 API를 호출합니다.
    */
    execute_login: function(session_quit, authorization_quit) {
        // 0. 공통변수 선언
        var me = this;
        var vp = Ext.getCmp('vp_smc_main');
        var id = this.lookupReference('txf_id').getValue();
        var pw = this.lookupReference('txf_pw').getValue();
        var access_ip = vp.clientInfo.clientIp;
        var dest_ip = vp.clientInfo.hostIp;

        // 1. 로그인 파라미터 생성

        var params = {};

        params.userid = Ext.encode(id);
        params.timeout = Ext.encode(600);
        params.dest_ip = Ext.encode(dest_ip);
        params.access_ip = Ext.encode(access_ip);
        params.credential = Ext.encode(pw);

        if(session_quit){

            params.otp = Ext.encode(null);
            params.is_session_quit = Ext.encode(session_quit);
            params.is_authorization_quit = Ext.encode(authorization_quit);

        }

        request_helper.xmlrpc_call_JsonP('ftSMC', 'logIn', params, function(res){

            session_id = res;

            vp.clientInfo.sessionInfo = res;
            vp.clientInfo.loginID = id;
            vp.after_login(me, id);

        });
    }

});
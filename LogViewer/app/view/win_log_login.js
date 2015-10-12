
Ext.define('SMC.view.win_log_login', {
    extend: 'Ext.window.Window',
    alias: 'widget.log_login',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    baseCls: '',
    border: false,
    cls: 'log_login_bgcolor',
    draggable: false,
    height: 250,
    id: 'win_log_login',
    width: 400,
    resizable: false,
    closable: false,
    header: false,
    maximized: true,

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
                    cls: 'log_login_form',
                    height: 580,
                    itemId: 'ctn_log_loginform',
                    width: 950,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1.1,
                            itemId: 'ctn_log_logintop',
                            margin: '0, 0, 10, 0'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_log_logincent',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.9,
                                    itemId: 'ctn_log_marginleft'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_log_items',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            cls: 'log_login_item',
                                            itemId: 'txf_id',
                                            margin: '0, 0, 10, 0',
                                            maxWidth: 240,
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
                                            cls: 'log_login_item',
                                            itemId: 'txf_pw',
                                            margin: '0, 0, 15, 0',
                                            maxWidth: 240,
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
                                            cls: 'log_login_button',
                                            height: 31,
                                            itemId: 'bt_login',
                                            margin: '0, 0, 0, 83',
                                            maxWidth: 159,
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
                                    itemId: 'ctn_log_margin_right'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_log_loginbott'
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

                    'title' : 'WeGuardia™ Logserver',
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

                    'title' : 'WeGuardia™ Logserver',
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

                    'title' : 'WeGuardia™ Logserver',
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

                    'title' : 'WeGuardia™ Logserver',
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

                'title' : 'WeGuardia™ Logserver',
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

                'title' : 'WeGuardia™ Logserver',
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
        var _main = Ext.getCmp('vp_SMC_mainView');

        var id = me.down('textfield[itemId="txf_id"]').getValue();
        var pin = me.down('textfield[itemId="txf_pw"]').getValue();

        var access_ip = _main.clientInfo.clientIp;
        var dest_ip =  _main.clientInfo.hostIp;

        var _params = {
            userid : Ext.encode(id),
            credential : Ext.encode(pin),
            access_ip : Ext.encode(access_ip),
            timeout : Ext.encode(3600),
            dest_ip : Ext.encode(dest_ip)
        };
        if(is_session_quit != null){

            _params['is_session_quit'] = Ext.encode(is_session_quit);
            _params['is_authorization_quit'] = Ext.encode(is_authorization_quit);

        }
        // 20140822 로그인 창 임시제거 시작 - login
        ///*
        request_helper.xmlrpc_call_Ajax_Post(
            'FtIFMgr',
            'logIn',
            _params,
            function(response){

                Ext.Ajax.request({
                    url : '/event/session/manage',
                    method : 'POST',
                    params : {
                        eventCode : Ext.encode('11111')
                    },
                    success : function(response, opts){

                        //console.log('success');

                    },
                    failure: function(response, opts) {
                        //console.log('failure', response, opts);
                    }
                });


                Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo = response;
                session_id = response;
                Ext.getCmp('vp_SMC_mainView').clientInfo.loginID = id;
                Ext.getCmp('vp_SMC_mainView').after_login(me, id);

                //로그인 만료기간 알려주기
                function getDday(sec, _id){
                    var TWODAY = 3600*24*2;
                    var ONEDAY = 3600*24;
                    var ONEHOUR = 3600;
                    var ONEMIN = 60;

                    var dateString = '';

                    if(sec > TWODAY){   //2일 이상일 경우
                        var day = Math.floor(sec / ONEDAY);
                        dateString = Ext.String.format("사용자[{0}]의 비밀번호 만료까지 {1}일 남았습니다.", _id, day);
                    } else if (sec <= TWODAY && sec > ONEDAY){  //1~2일 사이
                        var day = Math.floor(sec / ONEDAY);
                        var mod = sec % ONEDAY;
                        var hour = Math.floor(mod / ONEHOUR);
                        dateString = Ext.String.format("사용자[{0}]의 비밀번호 만료까지 {1}일 {2}시간 남았습니다.", _id, day, hour);

                    } else if (sec <= ONEDAY){ //1일 이하
                        var hour = Math.floor(sec / ONEHOUR);
                        var mod = sec % ONEHOUR;
                        var min = Math.floor(mod / ONEMIN);
                        var second = mod % ONEMIN;

                        dateString = Ext.String.format("사용자[{0}]의 비밀번호 만료까지 {1}시간 {2}분 {3}초 남았습니다.", _id, hour, min, second);

                    }

                    return dateString;
                }


                request_helper.xmlrpc_call_Ajax_Post(
                    'FtIFMgr',
                    'get_passwd_remain_ts',
                    {userid : Ext.encode(id)},
                    function(response){
                        if(response > 0){
                            Ext.Msg.show({
                                title:'사용자 기간',
                                msg: getDday(response, id),
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        } else {

                        }
                    }
                );
            }
        );
    }

});
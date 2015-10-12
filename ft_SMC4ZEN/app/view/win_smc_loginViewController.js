
Ext.define('SMC4ZEN.view.win_smc_loginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_smc_login',

    /*
        일 시 : 2015.07.13

        설 명 : 커서를 아이디 입력창에 놓고 엔터키를 누르면 유효성 검사를 실시합니다. 유효성 검사가 완료되면 로그인 실행 API를 호출합니다.
    */
    onTxf_idKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            var id = textfield.getValue();
            var pw = this.lookupReference('txf_pw').getValue();

            if(!id){

                Ext.Msg.show({

                    'title' : SMC_SET_PRODUCT,
                    'msg' : getDefineMsg('err_null'),
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.Error,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.focus();

                        }

                    }

                });

                return;

            }

            if(!pw){

                Ext.Msg.show({

                    'title' : SMC_SET_PRODUCT,
                    'msg' : getDefineMsg('err_null'),
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.Error,
                    'fn' : function(res){

                        if(res === 'ok'){

                            this.lookupReference('txf_pw').focus();

                        }

                    }

                });

                return;

            }

            this.getView().execute_login();

        }
    },

    /*
        일 시 : 2015.07.14

        설 명 : 커서를 비밀번호 입력창에 놓고 엔터키를 누르면 유효성 검사를 실시합니다. 유효성 검사가 완료되면 로그인 실행 API를 호출합니다.
    */
    onTxf_pwKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            var id = this.lookupReference('txf_id').getValue();
            var pw = textfield.getValue();

            if(!id){

                Ext.Msg.show({

                    'title' : SMC_SET_PRODUCT,
                    'msg' : getDefineMsg('err_null'),
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.Error,
                    'fn' : function(res){

                        if(res === 'ok'){

                            this.lookupReference('txf_id').focus();

                        }

                    }

                });

                return;

            }

            if(!pw){

                Ext.Msg.show({

                    'title' : SMC_SET_PRODUCT,
                    'msg' : getDefineMsg('err_null'),
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.Error,
                    'fn' : function(res){

                        if(res === 'ok'){

                            textfield.focus();

                        }

                    }

                });

                return;

            }

            this.getView().execute_login();

        }
    },

    /*
        일 시 : 2015.07.14

        설 명 : ID와 PW 유효성 검사를 실시합니다. 유효성 검사가 완료되면 execute_login 함수를 호출합니다.
    */
    onBt_loginClick: function(button, e, eOpts) {
        // 0. 아이디, 패스워드 객체 얻어오기

        var txf_id = this.lookupReference('txf_id');
        var txf_pw = this.lookupReference('txf_pw');

        // 1. ID / PW 검사

        if(!txf_id.getValue()){

            Ext.Msg.show({

                'title' : SMC_SET_PRODUCT,
                'msg' : getDefineMsg('err_null'),
                'buttons' : Ext.Msg.OK,
                'icon' : Ext.Msg.Error,
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

                'title' : SMC_SET_PRODUCT,
                'msg' : getDefineMsg('err_null'),
                'buttons' : Ext.Msg.OK,
                'icon' : Ext.Msg.Error,
                'fn' : function(res){

                    if(res === 'ok'){

                        txf_pw.focus();

                    }

                }

            });

            return;

        }

        // 2. 로그인 기능 수행

        this.getView().execute_login();
    }

});

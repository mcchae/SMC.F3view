
Ext.define('SMC4ZEN.view.vp_smc_main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'SMC4ZEN.view.vp_smc_mainViewModel',
        'SMC4ZEN.view.vp_smc_mainViewController',
        'Ext.tab.Panel'
    ],

    config: {
        clientInfo: {
            session_info: {
                
            }
        }
    },

    controller: 'vp_smc_main',
    viewModel: {
        type: 'vp_smc_main'
    },
    reference: 'vp_smc_main',
    cls: 'smc_login_bgcolor',
    id: 'vp_smc_main',
    layout: 'border',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            region: 'north',
            reference: 'ctn_smc_maintop',
            height: 65,
            itemId: 'ctn_smc_maintop',
            padding: 5,
            layout: 'fit'
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            region: 'center',
            reference: 'ctn_smc_maincenter',
            itemId: 'tpn_smc_maincenter',
            tabPosition: 'left',
            listeners: {
                tabchange: {
                    fn: 'onTpn_smc_maincenterTabChange',
                    scope: 'controller'
                }
            }
        }
    ],
    listeners: {
        afterrender: 'onVp_smc_mainAfterRender'
    },

    onVp_smc_mainAfterRender: function(component, eOpts) {
        // 0. 클라이언트 접속 정보 가져오기

        Ext.Ajax.request({

            'url' : '/getRemoteAddress',
            'method' : 'GET',
            'success' : function(res, op){

                var res_obj = JSON.parse(res.responseText);

                if(res_obj){

                    component.clientInfo.clientIp = res_obj.remoteAddress;
                    component.clientInfo.hostIp = res_obj.hostAddress.split(':')[0];

                }

            }

        });

        // 1. 세션-핑 실행

        var params = {

            'sid' : Ext.encode(component.clientInfo.sessionInfo)

        };

        request_helper.xmlrpc_call_JsonP('ftSMC', 'session_ping', params, function(res){});

        // 2. 로그인 화면 출력

        Ext.create('SMC4ZEN.view.win_smc_login').show();
    },

    /*
        일 시 : 2015.07.13

        설 명 : 접속된 세션을 종료합니다. 종료시 뷰-포트의 아이템들은 모두 파괴됩니다.
    */
    logout: function(session) {
        // 0. 공통변수 선언

        var me = this;
        var ctn_smc_top = me.down('[itemId=ctn_smc_maintop]');
        var tpn_smc_center = me.down('[itemId=tpn_smc_maincenter]');

        // 1. 생성되어있는 모든 윈도우 컴포넌트를 조회하여 Close

        Ext.WindowManager.each(function(component){

            if(component.getXType() === 'window'){

                component.close();

            }

        });

        // 2. 뷰-포트의 아이템 영역인 Top / Center 객체가 살아있는지 확인. 객체가 생성되어있으면 객체 내부의 모든 Item 객체 Destroy.

        if(ctn_smc_top.items !== undefined){

            ctn_smc_top.removeAll();

        }

        if(tpn_smc_center.items !== undefined){

            tpn_smc_center.removeAll();

        }

        // 3. 세션 정보가 들어있거나 세션 클리어 정보가 True 라면 Logout API 호출

        if(me.clientInfo.sessionInfo !== '' && session){

            var params = {

                'session_id' : Ext.encode(me.clientInfo.sessionInfo)

            };

            request_helper.xmlrpc_call_JsonP(
                'ftSMC',
                'logOut',
                params,
                function(res){

                    document.title = SMC_SET_PRODUCT;

                });

            me.clientInfo.sessionInfo = null;

        }

        //4. 로그인 화면 생성

        var win_login = Ext.getCmp('win_smc_login');

        if(!win_login){

            Ext.create('SMC4ZEN.view.win_smc_login', {}).show();

        }
    },

    /*
        일 시 : 2015.07.13

        설 명 : 로그인에 성공시 사용자 정보를 요청하고 뷰-포트에 아이템을 추가합니다.
    */
    after_login: function(loginView, loginId) {
        // 0. 공통변수 선언

        var me = this;

        // 1. 사용자 정보 요청

        var params = {

            'session_id' : Ext.encode(me.clientInfo.sessionInfo)

        };

        request_helper.xmlrpc_call_JsonP('ftSMC', 'getSessionInfo', params, function(res){

            var loginInfo = null;

            me.clientInfo.perspectiveInfo = res.authorization;

            if(res.authorization >= 5){

                loginInfo = '설정, 모니터 권한';

            }
            else{

                loginInfo = '모니터 권한';

            }

        });

        // 2. 로그인 화면 종료

        if(loginView){

            loginView.close();

        }

        // 3. createVpView 호출

        this.createVpView();
        var ctn_top = Ext.getCmp(SMC_COMMON_ID.smctopcontainer);
        var top_data = ctn_top.getViewModel().getData();
        var vp_center = me.down('[itemId=tpn_smc_maincenter]');

        // 4. ZEN 장비 설정 화면 붙이기

        me.setLoading(getDefineMsg('lod_zen'), true);

        for(var i = 0, max = top_data.zen.length; i < max; i++){

            var tab_tmp = Ext.create(top_data.zen[i].className, {

                'title' : top_data.zen[i].title,
                'layout' : 'border'

            });

            vp_center.add(tab_tmp);

        }

        vp_center.setActiveTab(0);

        // 5. 계정 접속 허용시간 구하기

        params = {

            'userid' : Ext.encode(loginId)

        };

        request_helper.xmlrpc_call_JsonP('ftSMC', 'get_passwd_remain_ts', params, function(res){

            var nowdate = null;
            var afterdate = null;
            var remaindate = null;

            // 5-0. 리턴된 결과 값이 0보다 크거나 공백 또는 undefined 가 아니라면 ...

            if(res !== '' && res !== undefined && res !== null){

                // 5-0-1. 비밀번호 만료 시간까지 2일 이하로 남아있다면 ...

                if(res > 0){

                    nowdate = new Date();
                    afterdate = new Date();
                    deftimestamp = afterdate.getTime() - nowdate.getTime();

                    remaindate = parseInt(deftimestamp/1000/60/60/24);

                    // 5-1. 현재 시스템 날짜를 기준으로 남은 로그인 허용시간, 분, 초 계산

                    var remainhour = parseInt(deftimestamp/1000/60/60);
                    var remainmin = parseInt(deftimestamp/1000/60);
                    var remainsec = parseInt(deftimestamp/1000);

                    // 5-2. 사용자 비밀번호가 2일 이하로 남아있을 경우

                    if(remaindate >= 2){

                        Ext.Msg.show({

                            'title' : SMC_SET_PRODUCT,
                            'msg' : '사용자 " ' + loginId + ' " 의 비밀번호 유효기간까지 ' + remaindate + '일 남았습니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.WARNING

                        });

                    }

                    // 5-3. 사용자 비밀번호가 1일 이하로 남아있을 경우

                    else if(remaindate >= 1){

                        Ext.Msg.show({

                            'title' : SMC_SET_PRODUCT,
                            'msg' : '사용자 " ' + loginId + ' " 의 비밀번호 유효기간까지 ' + remaindate + '일 ' + remainhour + '시간 남았습니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.WARNING

                        });

                    }

                    // 5-4. 사용자 비밀번호가 23시간 이하로 남아있을 경우

                    else{

                        Ext.Msg.show({

                            'title' : SMC_SET_PRODUCT,
                            'msg' : '사용자 " ' + loginId + ' " 의 비밀번호 유효기간까지 ' + remainhour + '시간 ' + remainmin + '분 ' + remainsec + '초 남았습니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.WARNING

                        });

                    }

                }

            }

        });

        me.setLoading(false);
    },

    /*
        일 시 : 2015.07.14

        설 명 : 로그인에 성공하면 뷰-포트의 Top, Center 컴포넌트를 생성하여 추가합니다.
    */
    createVpView: function() {
        // 0. 공통변수 선언

        var me = this;
        var ctn_mainmenu = Ext.create('SMC4ZEN.view.ctn_smc_mainmenu');

        // 1. 패널 아이템 추가

        me.down('[itemId=ctn_smc_maintop]').add(ctn_mainmenu);
    },

    /*
        일 시 : 2015.07.14

        설 명 : 로그아웃을 수행하면 SMC 메뉴와 센터-뷰의 환경설정 화면을 파괴합니다.
    */
    destroyVpView: function() {
        // 0. 패널 아이템 파괴

        this.lookupReference('ctn_smc_maintop').removeAll();
        this.lookupReference('tpn_smc_maincenter').removeAll();
    }

});
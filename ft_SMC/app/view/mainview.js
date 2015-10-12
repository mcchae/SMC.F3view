
Ext.define('SMC.view.mainview', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.panel.Panel'
    ],

    baseCls: 'x-container-main',
    cls: 'smc_login_testbg',
    id: 'vp_SMC_mainView',

    layout: {
        type: 'border',
        regionWeights: {
            north: 20,
            south: 0,
            center: 60,
            west: 20,
            east: 0
        }
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            clientInfo: {
                sessionInfo: '',
                localizatonInfo: '',
                perspectiveInfo: '',
                loginID: ''
            },
            listeners: {
                afterrender: {
                    fn: me.onViewportAfterRender,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'container',
                    region: 'north',
                    height: 50,
                    id: 'cont_SMC_main_top',
                    layout: 'fit'
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    id: 'cont_SMC_main_center',
                    layout: 'card'
                }
            ]
        });

        me.callParent(arguments);
    },

    onViewportAfterRender: function(component, eOpts) {
        // 2015.07.06 ===========================================================================================================================================================================
        //
        // 설 명 :
        //
        // ======================================================================================================================================================================================

        var me = this;

        // 클라이언트 접속 아이피 조회

        Ext.Ajax.request({

            'url' : '/getRemoteAddress',
            'method' : 'GET',
            'success' : function(response, opts){

                me.clientInfo.clientIp = JSON.parse(response.responseText).remoteAddress;

                var _host = JSON.parse(response.responseText).hostAddress.split(":");

                me.clientInfo.hostIp = _host[0];

            }

        });

        // 세션핑 호출

        var _params = {

            'sid' : Ext.encode(me.clientInfo.sessionInfo)

        };

        request_helper.xmlrpc_call_JsonP('ftSMC', 'session_ping', _params, function(response){});

        // SMC 초기화 시작

        SMC.initialize('');

        // SMC TOP 메뉴, 센터 영역 컨테이너 추가

        Ext.getCmp('cont_SMC_main_top').add(Ext.create('SMC.view.pnl_main_top',{}));
        Ext.getCmp('cont_SMC_main_center').add(Ext.create('SMC.view.pnl_smc_device_view',{}));

        // Zen 플래그 초기값 설정

        me.is_smc4zen = false;
    },

    logout: function(session) {
        // logout =============================================================================================================================================================================
        //
        // 일 시 : 2015.07.08
        //
        // 수 정 : 세션 상태가 로그아웃 또는 타임아웃이 리턴되거나 사용자가 Logout을 호출하였을 경우 화면을 생성 / 파괴하고 세션을 종료합니다.
        //
        // ====================================================================================================================================================================================

        // 0. 공통변수 선언

        var me = this;
        var ctn_smc_top = Ext.getCmp('cont_SMC_main_top');
        var ctn_smc_center = Ext.getCmp('cont_SMC_main_center');

        // 1. 출력되어있는 모든 윈도우를 검색하여 모두 해체시킴

        Ext.WindowManager.each(function(cmp) {

            if (cmp.xtype === 'window')
                cmp.destroy();

        });

        // 2. Top / Center 객체가 살아있는지 확인. 객체가 생성되어있으면 객체 내부의 모든 item 해체

        if (ctn_smc_top !== null)
            ctn_smc_top.removeAll(true);

        if (ctn_smc_center !== null)
            ctn_smc_center.removeAll(true);

        // 3. 세션정보가 들어있거나 세션 클리어 정보가 True 라면 Logout API 호출

        if(me.clientInfo.sessionInfo !== '' && session){

            var _params = {

                'session_id' : Ext.encode(me.clientInfo.sessionInfo)

            };
            request_helper.xmlrpc_call_JsonP(
                'ftSMC',
                'logOut',
                _params,
                function(response){

                    document.title = 'WeGuardia™ SMC 2.0';

                });

            me.clientInfo.sessionInfo = '';

        }

        // 4. 로그인 메인 화면 객체 생성

        var win_login = Ext.getCmp('win_smc_login');

        if(win_login === null || win_login === undefined){

            var login = Ext.create('widget.smc_login', {});

            login.show();

        }

        // 5. 서버 갱신 타이머가 동작 중이라면 종료

        if(me.taskObj){

            clearInterval(me.taskObj);

        }
    },

    after_login: function(loginView, _smcid) {
        // after_login =======================================================================================================================================================================
        //
        // 일 시 : 2015.07.08
        //
        // 설 명 : execute_login 함수를 호출한 후의 작업들을 수행합니다.
        //
        // ===================================================================================================================================================================================

        // 0. 공통 변수 선언

        var me = this;

        // 1. 로그인 화면이 출력되어 있을 경우 로그인화면 해제

        if(loginView !== null){

            loginView.close();

        }

        // 2. 사용자 정보를 얻기 위한 SMC객체 설정 (그리드 컬럼 등등)

        SMC.initialize(_smcid);

        // 3. 사용자 정보 요청

        request_helper.xmlrpc_call_JsonP(
            'ftSMC',
            'getSessionInfo',
            {

                'session_id': Ext.encode(session_id)

            },
            function(response){

        //         var logininfo;

                me.clientInfo.perspectiveInfo = response.authorization;

                switch(response.authorization){

                    case 1:
                    case 3:
        //                 logininfo = '모니터 권한';
                        Ext.getCmp('pnl_main_top').down('label[itemId="login_info"]').setText('( 모니터 )');
                        break;

        //             case 5:
        //             case 7:
        //                 logininfo = '설정 권한, 모니터 권한';
        //                 break;

                }

        //         Ext.getCmp('pnl_main_top').down('label[itemId="login_info"]').setText('( ' + logininfo + ' )');

            }

        );

        // 4. SMC 기본 설정 불러오기

        request_helper.xmlrpc_call_JsonP(
            'ftSMC',
            'getSMCSetting',
            {

                'key': Ext.encode('/company')

            },
            function(response){

                var pnl_top = Ext.getCmp('pnl_main_top');

                if(!(response === '' || typeof response === 'undefined')){

                    document.title = response;
                    pnl_top.down('label[itemId="login_company"]').setText(response);

                }
                else{

                    document.title = 'WeGuardia™ SMC 2.0';
                    pnl_top.down('label[itemId="login_company"]').setText('WeGuardia™ SMC 2.0');

                }

            }

        );

        // 5.

        request_helper.xmlrpc_call_JsonP(
            'ftSMC',
            'get_passwd_remain_ts',
            {

                'userid':Ext.encode(_smcid)

            },
            function(response){

                if(!(response === '' || typeof response === 'undefined')){

                    if(response > 0){

                        var day = 0, hour = 0, min = 0, sec = 0;

                        if(response >= 172800){

                            day = parseInt(response/86400);

                            Ext.Msg.alert('사용자 비밀번호 만료 알림', '사용자[' + _smcid + ']의 비밀번호 만료까지 ' + day + '일 남았습니다.');

                        }
                        else if(response >= 86400){

                            day = parseInt(response/86400);

                            hour = parseInt((response%(86400*day))/3600);

                            Ext.Msg.alert('사용자 비밀번호 만료 알림', '사용자' + _smcid + ']의 비밀번호 만료까지 ' + day + '일 ' + hour + '시간 남았습니다.');

                        }
                            else{

                                hour = parseInt(response/3600);

                                if(hour > 0){

                                    min = parseInt((response%(3600*hour))/60);

                                    if(min > 0){

                                        sec = parseInt((response%(3600*hour))%(60*min));

                                    }
                                    else{

                                        sec = parseInt(response%(3600*hour));

                                    }

                                }
                                else{

                                    min = parseInt(response/60);

                                    if(min > 0){

                                        sec = parseInt(response%(60*min));

                                    }
                                    else{

                                        sec = parseInt(response);

                                    }

                                }

                                if(hour < 10){

                                    hour = "0" + hour;

                                }

                                if(min < 10){

                                    min = "0" + min;

                                }

                                if(sec < 10){

                                    sec = "0" + sec;

                                }

                                Ext.Msg.alert('사용자 비밀번호 만료 알림', '사용자[' + _smcid + ']의 비밀번호 만료까지 ' + hour + ':' + min  + ':' + sec + ' 시간 남았습니다.');

                            }

                    }

                }

            }

        );

        // 6. SMC TOP / Center 메뉴 추가

        Ext.getCmp('cont_SMC_main_top').add(Ext.create('SMC.view.pnl_main_top',{}));
        Ext.getCmp('cont_SMC_main_center').add(Ext.create('SMC.view.pnl_smc_device_view',{}));
        Ext.getCmp('cont_SMC_main_center').add(Ext.create('SMC.view.pnl_policy_view',{}));
        Ext.getCmp('cont_SMC_main_center').add(Ext.create('SMC.view.pnl_object_view',{}));
        Ext.getCmp('cont_SMC_main_center').add(Ext.create('SMC.view.pnl_setting_view',{}));

        Ext.getCmp('cont_SMC_main_center').getLayout().setActiveItem(0);


        // 7. 로그인 아이디 정보 입력

        var loginid = Ext.getCmp('vp_SMC_mainView').clientInfo.loginID;

        // 8. 로그인 아이디 정보 출력

        Ext.getCmp('pnl_main_top').down('label[itemId="login_id"]').setText(loginid);

        // 9. 주기적으로 서버 상태 갱신

        request_helper.xmlrpc_call_Ajax_Post(
            'ftSMC',
            'getServerStatus',
            {},
            function(res){

                var status_label = Ext.getCmp('pnl_main_top').down('label[itemId=login_status]');

                if(status_label.text !== res.failover){
                    if(res.failover === ""){
                        status_label.setText(res.failover);
                    }
                    else{
                        status_label.setText('( ' + res.failover + ' )');
                    }
                }

            }
        );

        if(me.taskObj){

            clearInterval(me.taskObj);

        }

        me.taskObj = setInterval(refreshServerStatus, 10000);

        function refreshServerStatus(){

            request_helper.xmlrpc_call_Ajax_Post(
                'ftSMC',
                'getServerStatus',
                {},
                function(res){

                    var status_label = Ext.getCmp('pnl_main_top').down('label[itemId=login_status]');

                    if(status_label.text !== res.failover){
                        if(res.failover === ""){
                            status_label.setText(res.failover);
                        }
                        else{
                            status_label.setText('( ' + res.failover + ' )');
                        }
                    }

                }
            );
        }
    }

});
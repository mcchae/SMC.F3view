
Ext.define('SMC4ZEN.view.win_zen_sendpolicyViewController', {
    extend: 'Ext.app.ViewController',

    reloadDevicelist: function(arr_cid) {

    },

    onGpn_policy_listRender: function(component, eOpts) {
        var st_sendpolicy = Ext.getStore('st_sendpolicy_zenlist');

        if(!st_sendpolicy){

            st_sendpolicy = Ext.create('Ext.data.Store', {

                fields: [
                {
                    name: '@cid'
                },
                {
                    name: '_id'
                },
                {
                    name: '_kind'
                },
                {
                    name: '_last_who'
                },
                {
                    name: '_ret_cnt'
                },
                {
                    name: 'failover_state'
                },
                {
                    name: 'ha_state'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'ip2'
                },
                {
                    name: 'model'
                },
                {
                    name: 'name'
                },
                {
                    name: 'pause_state'
                },
                {
                    name: 'port_http'
                },
                {
                    name: 'port_ssh'
                },
                {
                    name: 'revision'
                },
                {
                    name: 'run_state'
                },
                {
                    name: 'serialnumber'
                },
                {
                    name: 'version'
                },
                {
                    name: 'spd_state'
                },
                {
                    name: 'spd_result'
                },
                {
                    name: '_last_ts'
                },
                {
                    name: 'spdinfo'
                },
                {
                    name: 'vpninfo'
                },
                {
                    convert: function(v, rec) {
                        return (rec.get('spd_state') === 2) ? rec.get('spd_progress').process + '%' : POLICY_STATUS[Number(rec.get('spd_state'))];
                    },
                    name: 'spd_progress'
                },
                {
                    name: 'desc'
                }
                ],
                storeId: 'st_sendpolicy_zenlist'

            });

        }

        component.bindStore(st_sendpolicy);
    },

    onBt_sendClick: function(button, e, eOpts) {
        // onBt_sendClick ==============================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 선택된 장비로 정책을 전송합니다. 정책 전송이 진행되는동안 실시간으로 체크하는 타이머 이벤트를 실행합니다.
        //
        // 수정 :
        //
        // (2014.11.21 김민수 - 자바스크립트 최적화 방법 적용)
        // (2015.01.22 김민수 - 선택된 장비의 CID 배열을 파라미터로 전달하도록 변경)
        // (2015.06.09 김민수 - 정책전송 프로그래스바 적용)
        //
        // =============================================================================================================================================================================

        var me = this;
        var component = me.componentStorage();
        var selectionModel = component.policy_grid.getSelection();

        // me.sendCount ================================================================================================================================================================
        //
        // 설명 : sendcount는 정책 전송 대상 장비들의 대수입니다. 정책 전송이 완료되면 sendcount는 reloadDeviceList 메서드에 의해 하나씩 감소합니다.
        //
        // =============================================================================================================================================================================

        var cidArray = [];

        if(!selectionModel.length){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '정책 전송할 장치가 선택되지 않았습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        for(var i = 0, max = selectionModel.length; i < max; i++){

            cidArray.push(selectionModel[i].get('@cid'));

        }

        // 정책 전송 요청 ================================================================================================================================================================
        //
        // 설명 : 정책 전송의 타이머는 const.js에 명시된 기본 값으로 동작하지 않습니다. 정책 전송의 주기는 5초로 고정입니다.
        //
        // =============================================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'sendPolicy',
            params       = {

                'cid' : Ext.encode(cidArray)

            };

        request_helper.xmlrpc_call_Ajax_Post(
        service,
        serchService,
        params,
        function(res){

            // 정책 전송 실시간 갱신 ===========================================================================================================================================================
            //
            // 설명 : 정책 전송 상태를 5초마다 갱신합니다.
            //
            // =============================================================================================================================================================================

            me.policyTask = setInterval(function(){

                me.reloadDeviceList(cidArray);

            }, 5000);

        }

        );

        button.setDisabled(true);
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onWin_zen_sendpolicyAfterRender: function(component, eOpts) {
        // onWin_xtm_sendpolicyRender ==================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 정책 전송 데이터를 초기화합니다. 초기화 단계는 progress = 0, 상태는 전송 대기로 초기화 됩니다.
        //
        // 수정 :
        //
        // (2014.10.02 김민수 - spd_result 내용을 초기화 하는 코드 추가)
        //
        // =============================================================================================================================================================================

        var policyStore = Ext.getStore('st_sendpolicy_list');

        this.down('[itemId=gpn_policy_list]').bindStore(policyStore);

        // 정책 Task 정보 저장 ===========================================================================================================================================================

        Ext.applyIf(component, {

            'policyTask' : {},
            'sendcount'  : 0

        });

        // 정책 그리드에 선택된 레코드와 인덱스 배열을 저장할 속성을 추가 (5초마다 갱신시 필가요) ===================================================================================================

        Ext.applyIf(Ext.getCmp('gpn_policy_list'), {

            'selectRecords' : [],
            'selectIndex'   : []

        });

        if(component.policyTask){

            clearInterval(component.policyTask);

        }

        Ext.each(component.deviceData, function(policyData){

            // spd_result 내용을 모두 초기화 한 후 추가합니다. ===================================================================================================================================

            policyData.spd_result = '';
            policyData.spd_progress.process   = 0;
            policyData.spd_progress.spd_state = 1;

            policyStore.add(policyData);

        });
    },

    onWin_zen_sendpolicyBeforeDestroy: function(component, eOpts) {
        // var policyStore = Ext.getStore('st_sendpolicy_list');

        // clearInterval(component.policyTask);

        // // 장비 리스트 화면 갱신 동작 ========================================================================================================================================================

        // policyStore.removeAll();

        // Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    }

});

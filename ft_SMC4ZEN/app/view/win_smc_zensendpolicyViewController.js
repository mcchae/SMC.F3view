
Ext.define('SMC4ZEN.view.win_smc_zensendpolicyViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_smc_zensendpolicy',

    reloadDeviceList: function(arr_cid) {
        var me = this.getView();
        var txf_summary = this.lookupReference('zen_dev_sendpolicysummary');
        var gpn_policylist = this.lookupReference('zen_dev_sendpolicylist');
        var prg_policystate = this.lookupReference('zen_dev_sendpolicystate');

        var tmpArray = [];

        // 2015.01.22 김민수 - 정책전송 목록 중 선택된 장비의 cid를 리스트화

        var service = 'ftZEN',
            serchService = 'getSendPolicyResults',
            params = {

                'cid' : Ext.encode(arr_cid)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                // 2015.06.03 작업완료 카운트 변수 추가
                var fin_count = 0;

                for(var i = 0, max = res.data.length; i < max; i++){

                    // 2015.06.03 sendcount 상태 변경 분리
                    if(res.data[i].spd_state === 4 && me.sendcount > 0){

                        me.sendcount += 1;

                    }
                    // 2015.06.03 정책이 적용완료 / 실패 혹은 타임아웃 등으로 인해 작업이 완료되거나 중단되었을경우
                    else if(res.data[i].spd_state >= 5){

                        fin_count += 1;

                    }

                }

                // 2015.01.22 김민수 - 정책 전송 상태저장

                gpn_policylist.selectRecords = gpn_policylist.getSelection();

                for(var i = 0, max = gpn_policylist.selectRecords.length; i < max; i++){

                    tmpArray.push(gpn_policylist.getStore().indexOf(gpn_policylist.selectRecords[i]));

                }

                gpn_policylist.selectIndex = tmpArray;
                gpn_policylist.getStore().loadData(res.data);

                // 2015.06.08 전송상태 요약정보 출력

                txf_summary.setValue('[전체 : ' + res.summary.total +
                                                   '] [전송대기 : ' + res.summary.ready +
                                                   '] [전송중 : ' + res.summary.sending +
                                                   '] [전송완료 : ' + res.summary.sended +
                                                   '] [적용완료 : ' + res.summary.success +
                                                   '] [실패 : ' + res.summary.failed +
                                                   ']');

                // 2015.06.09 프로그래스바 상태 값 설정

                var progressValue = (res.summary.success + res.summary.failed)/ res.summary.total;

                prg_policystate.updateProgress((progressValue <= 0.05) ? 0.05 : progressValue, (progressValue <= 0.05) ? '5 %' : (progressValue * 100).toString());

                // 2015.06.08 장비의 성공 / 실패값과 전체 값이 같으면 타이머 종료

                if(res.summary.total === (res.summary.success + res.summary.failed)){

                    clearInterval(me.policyTask);

                    gpn_policylist.setDisabled(false);

                    me.down('[itemId=ctn_policy_control]').down('[itemId=bt_send]').setDisabled(false);

                    // 2015.06.09 프로그래스바 100% 상태 값 설정

                    prg_policystate.updateProgress(1, '100 %');

                }

            }

        );
    },

    onGpn_policy_listRender: function(component, eOpts) {
        var st_sendpolicy = Ext.getStore('st_sendpolicy_zenlist');

        if(!st_sendpolicy){

            st_sendpolicy = Ext.create('Ext.data.Store', {

                fields: [
                { name : '_id'		},
                { name : '@cid'		},
                { name : '@groupcid'},
                { name : '_kind'	},
                { name : '_updated'	},
                { name : '_last_ts'	},
                { name : '_database'},
                { name : 'name' 	},
                { name : 'ip' 		},
                { name : 'ip2'		},
                { name : 'run_state'},
                { name : 'spd_state'},
                { name : 'ha_state'	},
                { name : 'profiles'	},
                { name : 'failover_state'},
                { name : 'pause_state'},
                { name : 'port_http'},
                { name : 'port_ssh'	},
                { name : 'spd_result'},
                {
                    name: 'spd_progress',
                    convert: function(v, rec) {
                        return (rec.get('spd_state') === 2) ? rec.get('spd_progress').process + '%' : POLICY_STATUS[Number(rec.get('spd_state'))];
                    }
                },
                { name : 'serialnumber'},
                { name : 'desc' }

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
        var wv = me.getView();
        var grp_zenselect = this.lookupReference('zen_dev_sendpolicylist').getSelection();

        // me.sendCount ================================================================================================================================================================
        //
        // 설명 : sendcount는 정책 전송 대상 장비들의 대수입니다. 정책 전송이 완료되면 sendcount는 reloadDeviceList 메서드에 의해 하나씩 감소합니다.
        //
        // =============================================================================================================================================================================

        var arr_cid = [];

        if(!grp_zenselect.length){

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_sel_zenlist'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        for(var i = 0, max = grp_zenselect.length; i < max; i++){

            arr_cid.push(grp_zenselect[i].get('@cid'));

        }

        // 정책 전송 요청 ================================================================================================================================================================
        //
        // 설명 : 정책 전송의 타이머는 const.js에 명시된 기본 값으로 동작하지 않습니다. 정책 전송의 주기는 5초로 고정입니다.
        //
        // =============================================================================================================================================================================

        var service      = 'ftZEN',
            serchService = 'sendPolicy',
            params       = {

                'cid' : Ext.encode(arr_cid)

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

            wv.policyTask = setInterval(function(){

                me.reloadDeviceList(arr_cid);

            }, 5000);

        }

        );

        button.setDisabled(true);
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onWin_zen_sendpolicyAfterRender: function(component, eOpts) {
        var st_sendpolicy = this.lookupReference('zen_dev_sendpolicylist').getStore();

        if(component.policyTask){

            clearInterval(component.policyTask);

        }

        st_sendpolicy.loadData(component.deviceData);

        // Ext.each(component.deviceData, function(policyData){

        // //     console.log("Sendpolicy data -> ", policyData);

        // //     // spd_result 내용을 모두 초기화 한 후 추가합니다. ===================================================================================================================================

        // //     policyData.spd_result = '';
        // //     policyData.spd_progress.process   = 0;
        // //     policyData.spd_progress.spd_state = 1;

        //     policyStore.add(policyData);

        // });
    },

    onWin_zen_sendpolicyBeforeDestroy: function(component, eOpts) {
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
        var gpn_sendpolicylist = this.lookupReference('zen_dev_sendpolicylist');

        clearInterval(component.policyTask);

        gpn_sendpolicylist.getStore().removeAll();

        pnl_main.down('[itemId=pnl_zen_center]').fireEvent('zendevlistRefresh');
    }

});

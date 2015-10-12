
Ext.define('SMC.view.win_xtm_sendpolicy', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_sendpolicy',

    requires: [
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.ProgressBar',
        'Ext.button.Button'
    ],

    height: 300,
    hidden: false,
    id: 'win_xtm_sendpolicy',
    width: 800,
    bodyPadding: 5,
    title: '정책 전송 장비 목록',
    maximizable: true,
    modal: true,

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
                    itemId: 'ctn_policy_state',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'dpf_summary',
                            width: 500,
                            fieldLabel: ''
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'gpn_policy_list',
                    itemId: 'gpn_policy_list',
                    margin: '0, 0, 5, 0',
                    title: '',
                    store: 'st_sendpolicy_list',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '장비명',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'ip',
                            text: 'IP 주소',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return DEVICE_STATUS[value];
                            },
                            align: 'center',
                            dataIndex: 'run_state',
                            text: '장비 상태',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            sortable: true,
                            align: 'center',
                            dataIndex: 'spd_progress',
                            text: '전송 결과',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: 'spd_result',
                            text: '정보',
                            flex: 1.5
                        }
                    ],
                    viewConfig: {
                        listeners: {
                            refresh: {
                                fn: me.onViewRefresh,
                                scope: me
                            }
                        }
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    plugins: [
                        Ext.create('Ext.grid.plugin.BufferedRenderer', {
                            pluginId: 'plg_policy_buffered',
                            leadingBufferZone: 200,
                            trailingBufferZone: 200
                        })
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_policy_progress',
                    margin: '0, 0, 5, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'progressbar',
                            flex: 1,
                            cls: 'progress_sp_style',
                            itemId: 'pgb_policyprogress',
                            animate: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_policy_control',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_send',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '전 송',
                            listeners: {
                                click: {
                                    fn: me.onBt_sendClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_close',
                            width: 100,
                            text: '닫 기',
                            listeners: {
                                click: {
                                    fn: me.onBt_closeClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onWin_xtm_sendpolicyRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWindowBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onViewRefresh: function(dataview, eOpts) {
        // onViewRefresh =================================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        var component = Ext.getCmp('gpn_policy_list');

        if (0 >= component.selectRecords.length) {

            return;

        }

        var newRecordsToSelect = [];

        for (var i = 0, max = component.selectIndex.length; i < max; i++) {

            var record = component.getStore().getAt(component.selectIndex[i]);

            if (!Ext.isEmpty(record)) {

                newRecordsToSelect.push(record);

            }

        }

        component.getSelectionModel().select(newRecordsToSelect);
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
        var selectionModel = component.policy_grid.getSelectionModel().getSelection();

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
        // onBt_closeClick ===============================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 정책전송 윈도우를 종료합니다.
        //
        // ===============================================================================================================================================================================

        this.destroy();
    },

    onWin_xtm_sendpolicyRender: function(component, eOpts) {
        // onWin_xtm_sendpolicyRender ==================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 정책 전송 데이터를 초기화합니다. 초기화 단계는 progress = 0, 상태는 전송 대기로 초기화 됩니다.
        //
        // 수정 :
        //
        // (2014.10.02 김민수 - spd_result 내용을 초기화 하는 코드 추가)
        // (2015.09.25 김민수 - 사용자계정에 설정권한이 없으면 전송버튼 비활성화)
        //
        // =============================================================================================================================================================================

        var bt_send = component.down('[itemId=ctn_policy_control]').down('[itemId=bt_send]');
        var policyStore = Ext.getStore('st_sendpolicy_list');
        var perspective = Ext.getCmp('vp_SMC_mainView').clientInfo.perspectiveInfo;

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

        // 설정 권한 조회 후 전송버튼 비활성화 설정

        if(perspective < 4){

            bt_send.setDisabled(true);

        }
    },

    onWindowBeforeDestroy: function(component, eOpts) {
        // onWindowBeforeDestroy =========================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 정책 전송 창이 종료될 때 스토어를 초기화 합니다. 이 때, 장비 목록을 갱신하는 타이머가 다시 동작합니다다다.
        //
        // ===============================================================================================================================================================================

        var policyStore = Ext.getStore('st_sendpolicy_list');

        clearInterval(component.policyTask);

        // 장비 리스트 화면 갱신 동작 ========================================================================================================================================================

        policyStore.removeAll();

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    componentStorage: function() {
        var obj = {};

        obj.policy_grid = this.down('[itemId=gpn_policy_list]');
        obj.policy_progress = this.down('[itemId=ctn_policy_progress]').down('[itemId=pgb_policyprogress]');

        return obj;
    },

    reloadDeviceList: function(selectCids) {
        // reloadDeviceList =============================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 장비 리스트를 5초 마다 갱신합니다. 장비 정책 전송시 사용합니다.
        //
        // 수정 :
        //
        // (2014.11.16 김민수 : 정책 전송이 완료되고 send_count가 0이되면 화면에 반영되기 전에 타이머가 clear 되버리는 버그가 발생하여 정책전송 완료 후 7초 뒤에 타이머가 clear 되도록 수정)
        // (2014.11.21 김민수 : 윈도우가 타이머가 clear 되기 전 먼저 닫힐 경우의 null 에러를 해결하기 위해 try catch 로 예외처리 코드 추가, 자바스크립트 최적화 코드 적용)
        // (2015.01.22 김민수 : 정책전송 현황 실시간 타이머의 장비 리스트를 getDevicelist 에서 getSendPolicyResults 로 변경)
        // (2015.06.03 김민수 : 정책전송 상태가 화면에 제대로 반영되지 않는 문제 해결 및 전송현황 정렬이 되지않는 문제 해결)
        // (2015.06.08 김민수 : 정책전송 요약정보 추가)
        //
        // ==============================================================================================================================================================================

        var me = Ext.getCmp('win_xtm_sendpolicy');
        var tmpArray = [];
        var component  = me.componentStorage();
        var policyGrid = component.policy_grid;

        // 2015.01.22 김민수 - 정책전송 목록 중 선택된 장비의 cid를 리스트화

        var service = 'ftSMC',
            serchService = 'getSendPolicyResults',
            params = {

                'cid' : Ext.encode(selectCids)

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

                policyGrid.selectRecords = policyGrid.getSelectionModel().getSelection();

                for(var i = 0, max = policyGrid.selectRecords.length; i < max; i++){

                    tmpArray.push(policyGrid.getStore().indexOf(policyGrid.selectRecords[i]));

                }

                policyGrid.selectIndex = tmpArray;
                policyGrid.getStore().loadData(res.data);

                // 2015.06.08 전송상태 요약정보 출력

                Ext.getCmp('dpf_summary').setValue('[전체 : ' + res.summary.total +
                                     '] [전송대기 : ' + res.summary.ready +
                                     '] [전송중 : ' + res.summary.sending +
                                     '] [전송완료 : ' + res.summary.sended +
                                     '] [적용완료 : ' + res.summary.success +
                                     '] [실패 : ' + res.summary.failed +
                                     ']');

                // 2015.06.09 프로그래스바 상태 값 설정

                var progressValue = (res.summary.success + res.summary.failed)/ res.summary.total;

                component.policy_progress.updateProgress((progressValue <= 0.05) ? 0.05 : progressValue);

                // 2015.06.08 장비의 성공 / 실패값과 전체 값이 같으면 타이머 종료

                if(res.summary.total === (res.summary.success + res.summary.failed)){

                    clearInterval(me.policyTask);

                    component.policy_grid.setDisabled(false);

                    me.down('[itemId=ctn_policy_control]').down('[itemId=bt_send]').setDisabled(false);

                    // 2015.06.09 프로그래스바 100% 상태 값 설정

                    component.policy_progress.updateProgress(1);

                }

            }

        );
    }

});
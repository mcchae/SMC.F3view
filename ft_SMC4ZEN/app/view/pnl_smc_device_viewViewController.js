
Ext.define('SMC4ZEN.view.pnl_smc_device_viewViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_smc_device_view',

    /*
        일 시 : 2015.06.23

        설 명 : 트리의 데이터가 최초 Load시에 하위노드를 모두 접습니다.
    */
    initExpandNode: function(children) {
        var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }
    },

    deviceDragToGroup: function(groupCid, deviceCids) {
        // deviceDragToGroup =============================================================================================================================================================
        //
        // 일시 : 2014.09.16
        //
        // 설명 : 장비를 드래그하여 노드 그룹에 이동하는 기능을 정의합니다.
        //
        // ===============================================================================================================================================================================

        var service = 'ftSMC',
            serchservice = 'movObject',
            params = {

                't_cid' : Ext.encode(groupCid),
                'cid'   : Ext.encode(deviceCids)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchservice,
            params,
            function(res){}
        );
    },

    /*
        일시 : 2015.01.17

        설명 : 그리드가 생성되어있지 않은 경우, 응답된 데이터를 기준으로 데이터 그리드를 생성합니다.

        수정 :

        - (2015.01.17 김민수 : )
    */
    createDeviceListView: function(record) {
        // createDeviceListView ========================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : 장비 리스트 view 를 생성합니다.
        //
        // 수정 :
        //
        // - (2015.01.16 김민수 : 토글버튼 활성화 시 전체, 소속된 장비만 보기 기능 추가)
        // - (2015.01.17 김민수 : 장비그룹 클릭시 데이터가 로드될 때까지 그룹 비활성화 추가)
        // - (2015.01.23 김민수 : 다른 그룹 선택시 선택된 레코드를 저장하는 스토리지가 초기화되도록 수정)
        //
        // =============================================================================================================================================================================

        // 공통 변수 선언

        var me = this;
        var g_cid = record.get('cid');
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemain);
        var pnl_group = this.lookupReference('xtm_dev_group');
        var pnl_center = this.lookupReference('xtm_dev_center');
        var ctn_center = this.lookupReference('ctn_dev_center');
        var tb_managetool = this.lookupReference('xtm_dev_control');

        // 2015.01.17 김민수 - 장비그룹 컴포넌트 비활성화 시작

        pnl_group.setDisabled(true);

        // 로드 마스크 생성

        ctn_center.setLoading(getDefineMsg('lod_xtm_dev'), true);

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        // 서비스 파라미터 정의. 클릭된 그룹의 node 정보를 전달한다. 그리드가 생성되지않았거나 생성 되었을때 모두 공통으로 사용됨.

        var service = 'ftSMC',
            serchService = 'getDeviceList',
            params = {

                'g_cid' : Ext.encode(g_cid),
                'isRecursive' : Ext.encode(SMC_GROUP_RECURSIVE)

            };

        // 이미 장비목록을 표시하는 그리드가 생성되어 있을경우 ...

        if(ctn_center._dynamicGrid){

            // AJAX 데이터 통신으로 장비 목록을 가져옴

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(res){

                    // 그리드가 생성되어있다면 ...

                    if(ctn_center._dynamicGrid){

                        // 선택된 모든 체크박스 상태 해제
                        ctn_center._dynamicGrid.getSelectionModel().deselectAll();

                        // 상태유지를 저장하는 그리드 멤버 변수 초기화
                        ctn_center._dynamicGrid.selectRecords = [];

                        // 스크롤 초기화
                        ctn_center._dynamicGrid.getView()._ws_lastScrollPosition = 0;

                        // 장비목록 데이터를 그리드의 스토어에 초기화
                        ctn_center._dynamicGrid.getStore().loadData(res);

                    }

                    // 자동 갱신 이벤트 실행

                    pnl_center.fireEvent('devlistRefresh');

                    // Summary 표시 함수 호출

                    pnl_center.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                    // 로드 마스크 제거

                    ctn_center.setLoading(false);

                    // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                    pnl_group.setDisabled(false);

                });

        }
        else{

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(res){

                    SMC_VIEW.create_grid_panel(
                        g_cid,
                        G_TYPE.DEVICE,
                        DEVICE_COMMON_ID.devicelist,
                        false,
                        function(_grid_tpl){

                            ctn_center._dynamicGrid = Ext.create(_grid_tpl,{

                                'id'            : DEVICE_COMMON_ID.devicelist,
                                'selectRecords' : [],
                                'selectIndex'   : [],
                                'border'        : false,
                                'reference'     : 'xtm_dev_list',
                                'viewConfig'    : {
                                    'itemId'    : 'gdv_smc_device_view',
                                    'preserveScrollOnRefresh' : true,
                                    'listeners' : {

                                        // 실시간 데이터 조회시 그리드-뷰의 리프레시 이벤트에서 상태유지적용

                                        'refresh': function(dataview, eOpts){

                                            var newRecordsToSelect = [];
                                            var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                            deviceList.getSelectionModel().select(newRecordsToSelect);

                                            // 선택된 row 가 없으면 상태유지 X

                                            if (0 < deviceList.selectRecords.length) {

                                                // 선택된 row 값 정보 저장

                                                for (var i = 0, max = deviceList.selectIndex.length; i < max; i++) {

                                                    var record = deviceList.getStore().getAt(deviceList.selectIndex[i]);

                                                    if (!Ext.isEmpty(record)) {

                                                        newRecordsToSelect.push(record);

                                                    }

                                                }

                                                deviceList.getSelectionModel().select(newRecordsToSelect);

                                            }

                                        }

                                    },
                                    'plugins' : [

                                        {

                                            ptype : 'gridviewdragdrop',
                                            enableDrag : true,
                                            enableDrop : false,
                                            ddGroup : 'dragDevice'

                                        }

                                    ]

                                },
                                'dockedItems': [
                                    {
                                        xtype: 'toolbar',
                                        dock  : 'bottom',
                                        id    : 'tb_devicelist_summary',
                                        items : [
                                            {
                                                xtype  : 'container',
                                                flex   : 1,
                                                itemId : 'ctn_devicelist_summary',
                                                layout : {
                                                    type  : 'hbox',
                                                    align : 'stretch',
                                                    pack  : 'end'
                                                },
                                                items: [
                                                    {
                                                        xtype      : 'displayfield',
                                                        itemId     : 'dpf_summary_state',
                                                        fieldLabel : '',
                                                        value      : '전체 장비 : 0  정상 동작 : 0'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                'listeners': {
                                    'afterrender' : function(component, eOpts){

                                        me.setSMCContextObj();

                                    }
                                },
                                'selModel'	: Ext.create('Ext.selection.CheckboxModel', {

                                    listeners: {
                                        select: function(records){

                                            tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_status]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_export]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_policy]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_terminal]').setDisabled(false);

                                        },
                                        deselect: function(records){

                                            // onCheckboxModelDeselect =====================================================================================================================================================
                                            //
                                            // 일시 : 2014.07.11
                                            //
                                            // 설명 : 그리드 아이템을 선택 해제 했을 때의 기능을 정의합니다. 그리드의 아이템을 클릭하면 장비 추가, 수정, 삭제 버튼이 활성화 됩니다.
                                            //
                                            // =============================================================================================================================================================================

                                            var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                            if(!deviceList.getSelection().length){

                                                tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_del]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_export]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_policy]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_terminal]').setDisabled(true);

                                            }

                                        }

                                    }

                                })

                            });

                            // 생성된 그리드를 컨테이너에 추가

                            ctn_center.add(ctn_center._dynamicGrid);

                            ctn_center.oldView = ctn_center._dynamicGrid;

                            ctn_center._dynamicGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){

                                if(pnl_main.taskObj){

                                    clearInterval(pnl_main.taskObj);

                                }

                                deviceCUD.updateDevice(record.get('@cid'), record.get('ip'), record.get('spd_state'), record.get('eth_count'));

                            });

                            // onGpn_smc_device_listItemClick =============================================================================================================================================
                            //
                            // 일시 : 2014.06.18
                            //
                            // 설명 : 그리드 아이템을 클릭 했을 때의 기능을 정의합니다. 그리드의 아이템을 클릭하면 장비 추가, 수정, 삭제 버튼이 활성화 됩니다.
                            //
                            // ============================================================================================================================================================================

                            ctn_center._dynamicGrid.on('itemclick', function(obj, record, item, index, e, eOpts){

                                tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_export]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_policy]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_terminal]').setDisabled(false);

                            });

                            // 서버에서 응답한 데이터를 스토어에 load

                            ctn_center._dynamicGrid.getStore().loadData(res);

                            // 로드마스크 제거

                            ctn_center.setLoading(false);

                            // 장비이름검색 (장비검색 텍스트 필드에 값이있을 경우 필터링)

                            searchDeviceName(ctn_center._dynamicGrid.getStore(), me.lookupReference('txf_search').getValue(), ['name', 'ip']);

                            // 갱신 이벤트 실행

                            pnl_center.fireEvent('devlistRefresh');

                            // Summary 함수 호출

                            pnl_center.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                            // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                            pnl_group.setDisabled(false);

                        });

                }

            );

        }
    },

    createMoniterListView: function(westObj, record) {
        // createMoniterListView ========================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : 모니터 리스트 view 를 생성합니다.
        //
        // 수정 :
        //
        // - (2015.01.17 김민수 : )
        //
        // ==============================================================================================================================================================================

        // 공통 변수 정의

        var westGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);

        // 장비 리스트 타이머 종료

        if(centerPanel.taskObj){

            clearInterval(centerPanel.taskObj);

        }

        if(centerContainer.oldView){

            var gpn_rtmlist = Ext.getCmp('pnl_rtm_main');

            if(gpn_rtmlist){

                gpn_rtmlist.reloadDevicelist();

            }

        }
        else{

            // 모니터 그리드가 추가되어있지 않은 경우 그리드 생성 후 컨테이너에 추가

            var moniterView = Ext.create('SMC4ZEN.view.pnl_rtm_main', {});

            centerContainer.add(moniterView);

            centerContainer.oldView = moniterView;

        }
    },

    onTreeNodeMouseUp: function(dataview, record, item, index, e, eOpts) {
        // onTreeNodeMouseUp ===========================================================================================================================================================
        //
        // 일시 : 2014.09.24
        //
        // 설명 : 장비 -> 그룹 이동시 끌어다놓을 그리드의 노드정보를 얻기위해 이벤트를 설정합니다.
        //
        // 수정 :
        //
        // (2014.11.21 김민수 - 자바스크립트 최적화 코드 적용)
        //
        // =============================================================================================================================================================================

        var me = this;

        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var deviceGroupRecord = deviceGroup.getSelection()[0];

        var deviceRecords = deviceList.getSelection();

        if(deviceGroup.isDD){

            deviceGroup.isDD = false;

            deviceGroup.un('itemmouseup', me.onTreeNodeMouseUp, me);

            var _svc = 'ftSMC', selectRecordSize = deviceRecords.length;

            var cidArray = [];

            if(selectRecordSize <= 0){

                return;

            }

            var moveGroupCid = record.get('cid');

            for(var i = 0, max = selectRecordSize; i < max; i++){

                cidArray.push(deviceRecords[i].get('@cid'));

            }

            me.deviceDragToGroup(moveGroupCid, cidArray);

        }
    },

    setSMCContextObj: function(gpn_object) {
        var me = this;
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemain);
        var pnl_group = this.lookupReference('xtm_dev_group');
        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var tb_searchtool = this.lookupReference('xtm_dev_search');
        var tb_managetool = this.lookupReference('xtm_dev_control');

        var dev_Context_Array = [

            {
                'name' : '장비 등록',
                'itemId' : 'mi_xtm_add',
                'children' : null,
                'callback' : function(){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    deviceCUD.createDevice(pnl_group);

                }

            },
            {
                'name' : '장비 수정',
                'itemId' : 'mi_xtm_mod',
                'children' : null,
                'callback' : function(){

                    var selectCid = gpn_devlist.getSelection()[0].get('@cid');

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    deviceCUD.updateDevice(selectCid);

                }

            },
            {
                'name' : '장비 삭제',
                'itemId' : 'mi_xtm_del',
                'children' : null,
                'callback' : function(){

                    var cidArray = [];
                    var groupCid = pnl_group.getSelection()[0].get('cid');

                    for(var i = 0; i < gpn_devlist.getSelection().length; i++){

                        cidArray.push(gpn_devlist.getSelection()[i].get('@cid'));

                    }

                    deviceCUD.deleteDevice(gpn_devlist, cidArray, groupCid, function(){

                        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_del]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_export]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_policy]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_terminal]').setDisabled(true);

                    });

                }

            },
            {
                'name' : '장비 복사',
                'itemId' : 'mi_xtm_copy',
                'children' : null,
                'callback' : function(){

                    Ext.Msg.show({

                        title : '장비 복사 확인',
                        msg : '선택된 장비를 복사하시겠습니까?',
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.Msg.QUESTION,
                        fn : function(res){

                            var g_cid = pnl_group.getSelection()[0].get('cid');
                            var filterValue = tb_searchtool.down('[itemId=txf_searchstr]').getValue();

                            if(res === 'yes'){

                                var deviceCid = gpn_devlist.getSelection()[0].get('@cid');

                                devFuncModule.devCopy(deviceCid, g_cid, filterValue);

                            }

                        }

                    });

                }

            },
            {
                'name' : '장비 일괄 편집',
                'itemId' : 'mi_xtm_mul',
                'children' : null,
                'callback' : function(){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    var selectRecords = gpn_devlist.getSelection();

                    var service      = 'ftSMC',
                        serchService = 'getObjectDefault',
                        params       = {

                            'kind' : Ext.encode('obj_dev_xtm')

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            var applyTarget = [];

                            // 기본 설정 - 기본설정 속성

                            applyTarget.push({	'smc_ip'	: false			});
                            applyTarget.push({	'dns_addr'	: false			});

                            // 2015.01.19 김민수 - group, location 추가

                            applyTarget.push({	'group_info': false			});
                            applyTarget.push({	'location_info'	: false		});

                            applyTarget.push({	'autoup_info' : false		});
                            applyTarget.push({	'rtm_info'	: false			});


                            // 기본설정 - 관리자 속성, 접근설정

                            applyTarget.push({	'admin_set'	: false			});
                            applyTarget.push({	'access_set'	: false		});

                            // 시스템설정

                            applyTarget.push({	'system_option'	: false		});
                            applyTarget.push({	'system_snmp'	: false		});

                            // 로그 설정

                            applyTarget.push({	'log_level'	: false			});
                            applyTarget.push({	'log_fail'	: false			});
                            applyTarget.push({	'log_flow'	: false			});
                            applyTarget.push({	'log_hdd'	: false			});
                            applyTarget.push({	'log_backup': false			});
                            applyTarget.push({	'log_data'	: false			});
                            applyTarget.push({	'log_tracker': false		});
                            applyTarget.push({	'log_updatetime': false		});
                            applyTarget.push({	'log_workgroup'	: false		});

                            // 로그 서버 설정

                            applyTarget.push({	'log_xtmserver'	: false		});
                            applyTarget.push({	'log_standard'	: false		});

                            // 알람 설정

                            applyTarget.push({	'log_alram' : false			});

                            // 모니터링 설정

                            applyTarget.push({	'log_moniter' : false		});

                            // 보안 설정 (정책 설정)

                            applyTarget.push({	'spdinfo_ipv4_filter_1'	: false		});
                            applyTarget.push({	'spdinfo_ipv4_filter_2'	: false		});

                            // IPSEC 설정

                            applyTarget.push({	'ipsec_groupdr' : false	});

                            res.apply_target = applyTarget;
                            res['@groupcid'] = pnl_group.getSelection()[0].get('cid');

                            Ext.create('SMC4ZEN.view.win_smc_device_multiset', {

                                'applyDevice' : selectRecords,
                                'deviceParam' : res

                            }).show();

                        }

                    );

                }

            },
            {
                'name' : '선택된 장비 파일 발급',
                'itemId' : 'mi_xtm_exportfile',
                'children' : null,
                'callback' : function(){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    var selectRecord = gpn_devlist.getSelection()[0];

                    devFuncModule.exportFile(selectRecord);

                }

            },
            {
                'name' : '선택된 장비 정책 전송',
                'itemId' : 'mi_xtm_sendpolicy',
                'children' : null,
                'callback' : function(){

                    var selectRecord  = gpn_devlist.getSelection();

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    devFuncModule.sendPolicy(selectRecord);

                }

            },
            {
                'name' : '선택된 장비 상태 정보',
                'itemId' : 'mi_xtm_showstate',
                'children' : null,
                'callback' : function(){

                    var selectRecord = gpn_devlist.getSelection()[0];

                    devFuncModule.showState(selectRecord.get('@cid'), selectRecord.get('name'));

                }

            },
            {
                'name' : '선택된 장비 동작 명령',
                'itemId' : 'mn_xtm_actcontrol',
                'children' : [

                    {
                        'name' : '서비스 재개',
                        'itemId' : 'mi_xtm_svcrestart',
                        'children' : null,
                        'callback' : function(){

                            var cidArray = [];
                            var selectRecord = gpn_devlist.getSelection();

                            for(var i = 0; i < selectRecord.length; i++){

                                cidArray.push(selectRecord[i].get('@cid'));

                            }

                            devFuncModule.devActControl().resumeService(cidArray);

                        }

                    },
                    {
                        'name' : '서비스 중지',
                        'itemId' : 'mi_xtm_svcstop',
                        'children' : null,
                        'callback' : function(){

                            var cidArray = [];
                            var selectRecord = gpn_devlist.getSelection();

                            for(var i = 0; i < selectRecord.length; i++){

                                cidArray.push(selectRecord[i].get('@cid'));

                            }

                            devFuncModule.devActControl().stopService(cidArray);

                        }

                    },
                    {
                        'name' : '장비 재시작',
                        'itemId' : 'mi_xtm_devreboot',
                        'children' : null,
                        'callback' : function(){

                            var cidArray = [];
                            var selectRecord = gpn_devlist.getSelection();

                            for(var i = 0; i < selectRecord.length; i++){

                                cidArray.push(selectRecord[i].get('@cid'));

                            }

                            devFuncModule.devActControl().restartDevice(cidArray);

                        }

                    },
                    {
                        'name' : '장비 사용 안함',
                        'itemId' : 'mi_xtm_devdisable',
                        'children' : null,
                        'callback' : function(){

                            var cidArray = [];
                            var selectRecord = gpn_devlist.getSelection();

                            for(var i = 0; i < selectRecord.length; i++){

                                cidArray.push(selectRecord[i].get('@cid'));

                            }

                            devFuncModule.devActControl().initDevice(cidArray);

                        }

                    }

                ],
                'callback' : null

            },
            {
                'name' : '연결 객체 관리',
                'itemId' : 'mi_xtm_linkobj',
                'children' : null,
                'callback' : function(){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    var selectRecord = gpn_devlist.getSelection()[0];

                    var cid = selectRecord.get('@cid');

                    devFuncModule.showLinkObject(cid, selectRecord.data, 'SMC4ZEN.view.pnl_object_hierarchy');

                }

            },
            {
                'name' : '부가 서비스',
                'itemId' : 'mn_xtm_additionalsvc',
                'children' : [

                    {
                        'name' : '터미널 접속',
                        'itemId' : 'mi_xtm_terminal',
                        'children' : null,
                        'callback' : function(){

                            var selectRecords = gpn_devlist.getSelection();

                            openTerm(selectRecords, 0);

                            // 클라이언트의 OS를 체크하여 Window일 경우 Putty로 접속하는 기능

                            /*
                            if(checkSmcClientOS() === 'windows'){

                                connectSshPutty(selectRecords, 0);

                            }
                            else{

                                openTerm(selectRecords, 0);

                            }
        */

                            //                     Ext.each(selectRecord, function(recordData){

                            //                         var service      = 'ftSMC',
                            //                             serchService = 'getDevice',
                            //                             params       = {

                            //                                 'cid' : Ext.encode(recordData.raw['@cid'])

                            //                             };

                            //                         request_helper.xmlrpc_call_Ajax_Post(
                            //                             service,
                            //                             serchService,
                            //                             params,
                            //                             function(res){

                            //                                 var ip = recordData.raw.ip;

                            //                                 if(Object.prototype.toString.call(res.system_user_admin.user) === "[object Array]"){

                            //                                     Ext.getCmp('pnl_smc_device_view_west').fireEvent('showTerminal', res.system_user_admin.user[0].id, ip, recordData.raw.name);

                            //                                 }
                            //                                 else{

                            //                                     Ext.getCmp('pnl_smc_device_view_west').fireEvent('showTerminal', res.system_user_admin.user.id, ip, recordData.raw.name);

                            //                                 }

                            //                             }

                            //                         );

                            //                     });

                        }

                    },
                    {

                        'name' : '웹으로 접속',
                        'itemId' : 'mi_xtm_https',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            var httpsUrl = 'https://' + selectRecord.get('ip')+ ':' + selectRecord.get('port_http');

                            window.open(httpsUrl, '_blank');

                        }

                    },
                    {
                        'name' : 'IPv4 ARP Table',
                        'itemId' : 'mi_xtm_arp_v4',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().arpTable(selectRecord, 'v4');

                        }

                    },
                    {
                        'name' : 'IPv6 ARP Table',
                        'itemId' : 'mi_xtm_arp_v6',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().arpTable(selectRecord, 'v6');

                        }

                    },
                    {
                        'name' : 'IPv4 Routing Table',
                        'itemId' : 'mi_xtm_route_v4',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().routingTable(selectRecord, 'v4');

                        }

                    },
                    {
                        'name' : 'IPv6 Routing Table',
                        'itemId' : 'mi_xtm_route_v6',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().routingTable(selectRecord, 'v6');

                        }

                    },
                    //             {
                    //                 'name' : 'IP 관리 상태',
                    //                 'itemId' : 'mi_xtm_ipmstat',
                    //                 'children' : null,
                    //                 'callback' : function(){

                    //                     var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                    //                     var selectRecord = gpn_devlist.getSelectionModel().getSelection()[0];

                    //                     if(pnl_main.taskObj){

                    //                         clearInterval(pnl_main.taskObj);

                    //                     }

                    //                     devFuncModule.subServiceModule().ipmList(selectRecord);

                    //                 }

                    //             },
                    {
                        'name' : 'DHCP 할당 내역',
                        'itemId' : 'mi_xtm_dhcplist',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection()[0];

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().dhcpList(selectRecord);

                        }

                    },
                    {
                        'name' : '장비 업그레이드',
                        'itemId' : 'mi_xtm_upgrade',
                        'children' : null,
                        'callback' : function(){

                            var selectRecord = gpn_devlist.getSelection();

                            if(pnl_main.taskObj){

                                clearInterval(pnl_main.taskObj);

                            }

                            devFuncModule.subServiceModule().deviceUpgrade(selectRecord);

                        }

                    }

                ],
                'callback' : null

            },
            {
                'name' : '선택된 장비 CID 보기',
                'itemId' : 'mi_xtm_showcid',
                'children' : null,
                'callback' : function(){

                    var selectRecord = gpn_devlist.getSelection()[0];

                    devFuncModule.showCid(selectRecord.get('name'), selectRecord.get('@cid'));

                }

            },
            {
                'name' : '삭제된 장비 복원',
                'itemId' : 'mi_xtm_restoredev',
                'children' : null,
                'callback' : function(){

                    var g_cid = pnl_group.getSelection()[0].get('cid');

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    devFuncModule.restoreDev(g_cid);

                }

            },

            // devFuncModule.exportAccounts

            {
                'name' : '선택 장비 요약정보 저장',
                'itemId' : 'mi_xtm_exportexl',
                'children' : null,
                'callback' : function(){

                    var selectRecords = gpn_devlist.getSelection();

                    devFuncModule.exportExcel(selectRecords);

                }

            },
            {
                'name' : '엑셀 파일로 목록 저장',
                'itemId' : 'mi_xtm_exportdevlist',
                'children' : null,
                'callback' : function(){

                    var devStore = gpn_devlist.getStore();

                    if(devStore){

                        var cidArray = [];
                        var devCount = devStore.count();

                        if(devCount > 0){

                            for(var i = 0, max = devCount; i < max; i++){

                                cidArray.push(devStore.data.items[i].get('@cid'));

                            }

                            devFuncModule.exportDevlist(cidArray);

                        }
                        else{

                            Ext.Msg.show({
                                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                                msg : '등록된 장비가 없습니다.',
                                buttons : Ext.Msg.OK,
                                icon : Ext.Msg.ERROR
                            });

                            return;

                        }

                    }

                }

            }
            //     {
            //         'name' : '접근 통제 정보갱신',
            //         'itemId' : 'mi_xtm_account',
            //         'children' : null,
            //         'callback' : function(){

            //             devFuncModule.exportAccounts();

            //         }
            //     }

        ];

        var contextCallback = function(menuInstance){

            if(!gpn_devlist){

                menuInstance.down('[itemId=mi_xtm_add]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_mul]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_exportfile]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(true);
                menuInstance.down('[itemId=mn_xtm_additionalsvc]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_showcid]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_exportexl]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_restoredev]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_linkobj]').setDisabled(true);

            }
            else{

                var selectRowSize = gpn_devlist.getSelection().length;

                // 선택된 장비가 1개일 경우 ========================================================================================================================================================

                if(selectRowSize === 1){

                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_mul]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_exportfile]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);

                    if(gpn_devlist.getSelection()[0].get('ip').match('0.0.0.0')){

                        menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(true);
                        menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(true);
                        menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                        menuInstance.down('[itemId=mn_xtm_additionalsvc]').setDisabled(true);

                    }
                    else{

                        menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(false);
                        menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);
                        menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(false);
                        menuInstance.down('[itemId=mn_xtm_additionalsvc]').setDisabled(false);

                    }

                    menuInstance.down('[itemId=mi_xtm_showcid]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_exportexl]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_linkobj]').setDisabled(false);

                }

                // 그리드는 생성되었지만 선택된 장비가 없을 경우 ======================================================================================================================================

                else if(selectRowSize <= 0){

                    menuInstance.down('[itemId=mi_xtm_add]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_mul]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_exportfile]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                    menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(true);
                    menuInstance.down('[itemId=mn_xtm_additionalsvc]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_showcid]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_exportexl]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_restoredev]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_linkobj]').setDisabled(true);

                }

                // 선택된 장비가 여러개일 경우 =====================================================================================================================================================

                else{

                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_mul]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_exportfile]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_showcid]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_linkobj]').setDisabled(true);

                }

            }

        };

        makeContextMenu({	'itemId' : 'mn_xtm_context', 'width' : 180, 'border' : false	}, gpn_devlist, contextCallback, dev_Context_Array);
    },

    onBt_addClick1: function(button, e, eOpts) {
        var groupParams = null;

        var pnl_group = this.lookupReference('xtm_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)   {

            groupParams = grp_select.get('cid');

        }
        else{

            groupParams = pnl_group.getRootNode().data.cid;

        }

        if(groupParams){

            Ext.create('SMC4ZEN.view.win_smc_group_set', {
                'mode' : 'ADD',
                'wndTitle' : getDefineText('win_title_addgrp'),
                'groupParams' : groupParams

            }).show();

        }
        else{

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : getDefineText('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

        }
    },

    onBt_modClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)   {

            Ext.create('SMC4ZEN.view.win_smc_group_set', {
                'mode' : 'MOD',
                'wndTitle' : getDefineText('win_title_modgrp'),
                'groupParams' : grp_select.get('cid')
            }).show();

        }
        else{

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : getDefineText('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

        }
    },

    onBt_delClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(!grp_select){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : getDefineText('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        Ext.Msg.show({

            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : getDefineMsg('qus_group_delete'),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                var pnl_main = Ext.getCmp('pnl_smc_device_view');

                if(res === 'yes'){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    try{

                        var serviceName = 'ftSMC',
                            rpcFunc = 'delGroup',
                            params = {

                                cid : Ext.encode(grp_select.get('cid'))

                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                        serviceName,
                        rpcFunc,
                        params,
                        function(res){

                            var serviceName = 'ftSMC',
                                rpcFunc = 'getGroup',
                                params = {

                                    gtype : Ext.encode('obj_dev')

                                };

                            treeReload(pnl_group, serviceName, rpcFunc, params);

                        }

                        );

                    }
                    catch(err){

                        Ext.Msg.show(
                        {
                            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                            msg : getDefineText('err_fail_svcexcept') + '<br><br>' + '[Svc error] : ' + err,
                            buttons : Ext.Msg.YESNO,
                            icon : Ext.Msg.QUESTION

                        });

                    }

                }

            }

        });
    },

    onBt_searchClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');
        var win_search = SMC_VIEW.make_find_treenode_window('그룹 검색', pnl_group);

        win_search.show();
    },

    onBt_showallClick: function(button, e, eOpts) {
        var me = this;
        var pnl_group = this.lookupReference('xtm_dev_group');
        var grp_group = pnl_group.getSelection()[0];
        var tb_mamagetool = this.lookupReference('xtm_dev_control');
        var tb_searchtool = this.lookupReference('xtm_dev_search');
        var deviceViewMode = tb_searchtool.down('[itemId=rdg_smc_selelctmode]').getValue().mode;

        // 장비 컨트롤 메뉴 활성화.

        tb_mamagetool.down('[itemId=bt_add]').setDisabled(false);
        tb_mamagetool.down('[itemId=bt_mod]').setDisabled(true);
        tb_mamagetool.down('[itemId=bt_del]').setDisabled(true);
        tb_mamagetool.down('[itemId=bt_export]').setDisabled(true);
        tb_mamagetool.down('[itemId=bt_policy]').setDisabled(true);
        tb_mamagetool.down('[itemId=bt_terminal]').setDisabled(true);

        if(deviceViewMode === 'device'){

            me.createDeviceListView(grp_group);

        }
        else{

            me.createMoniterListView(grp_group);

        }
    },

    onBt_showallToggle: function(button, pressed, eOpts) {
        if(pressed){

            SMC_GROUP_RECURSIVE = true;

            button.removeCls('common_rule_send');
            button.addCls('common_rule_pressed');

        }
        else{

            SMC_GROUP_RECURSIVE = false;

            button.removeCls('common_rule_pressed');
            button.addCls('common_rule_send');

        }
    },

    onBt_openClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_group = pnl_group.getSelection()[0];

        if(grp_group){

            group_open(pnl_group, grp_group);

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_close(pnl_group, grp_select);

        }
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var pnl_group = this.lookupReference('xtm_dev_group');

        deviceGroupToGroup('ftSMC', overModel.get('cid'), data.records[0].get('cid'), 'obj_dev', pnl_group);
    },

    onPnl_smc_device_tree_view_xtmAfterRender: function(component, eOpts) {
        // 1. Root Node 호출

        var me = this;

        component.setLoading(getDefineMsg('lod_group'), true);

        var service = 'ftSMC',
            serchService = 'getGroup',
            params = {

                gtype : Ext.encode('obj_dev')

            };

        request_helper.xmlrpc_call_Ajax_Post(
        service,
        serchService,
        params,
        function(res){

            // 1-1. RootNode 설정

            me.initExpandNode(res.children);
            component.setRootNode(res);

            // 1-2. 장비 그룹의 첫번째 노드 자동 선택

            component.getSelectionModel().select(0);
            component.setLoading(false);

        }

        );
    },

    onPnl_smc_device_tree_view_xtmSelect: function(rowmodel, record, index, eOpts) {
        // 공통변수 정의

        var pnl_group = this.lookupReference('xtm_dev_group');
        var pnl_center = this.lookupReference('xtm_dev_center');
        var tb_managetool = this.lookupReference('xtm_dev_control');
        var dev_mode = this.lookupReference('xtm_dev_search').down('[itemId=rdg_smc_selelctmode]').getValue().mode;

        this.lookupReference('xtm_dev_groupctrl').setDisabled(false);

        // 장비 컨트롤 메뉴 활성화.

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
        tb_managetool.down('[itemId=bt_del]').setDisabled(true);
        tb_managetool.down('[itemId=bt_status]').setDisabled(true);
        tb_managetool.down('[itemId=bt_export]').setDisabled(true);
        tb_managetool.down('[itemId=bt_policy]').setDisabled(true);
        tb_managetool.down('[itemId=bt_terminal]').setDisabled(true);

        if(dev_mode === 'device'){

            this.createDeviceListView(record);

        }
        else{

            this.createMoniterListView(record);

        }
    },

    onRdg_smc_selelctmodeChange: function(field, newValue, oldValue, eOpts) {
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemain);
        var pnl_center = this.lookupReference('xtm_dev_center');
        var ctn_center = this.lookupReference('ctn_dev_center');
        var pnl_group = this.lookupReference('xtm_dev_group');
        var tb_managetool = this.lookupReference('xtm_dev_control');

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        if(ctn_center.oldView){

            ctn_center.oldView.destroy();

            ctn_center.oldView = null;
            ctn_center._dynamicGrid = null;

        }

        var grp_select = pnl_group.getSelection()[0];

        if(newValue.mode === 'device'){

            tb_managetool.setVisible(true);

            if(grp_select){

                this.createDeviceListView(grp_select);

            }

        }
        else{

            tb_managetool.setVisible(false);

            if(grp_select){

                this.createMoniterListView(grp_select);

            }

        }
    },

    onTxf_searchstrKeypress: function(textfield, e, eOpts) {
        if(e.getKey() === e.ENTER){

            var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicelist);
            var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
            var pnl_center = this.lookupReference('xtm_dev_center');

            if(pnl_center.down('[itemId=tb_smc_device_search]').down('[itemId=rdg_smc_selelctmode]').getValue().mode === 'device'){

                if(gpn_devlist){

                    var st_devlist = gpn_devlist.getStore();

                    if(st_devlist){

                        searchDeviceName(st_devlist, textfield.getValue(), ['name', 'ip']);

                    }

                }

            }
            else{

                if(gpn_rtmlist){

                    var st_rtmlist = gpn_rtmlist.getStore();

                    if(st_rtmlist){

                        searchDeviceName(st_rtmlist, textfield.getValue(), ['name', 'gate_ip']);

                    }

                }

            }

        }
    },

    onTxf_searchstrFocus: function(component, event, eOpts) {
        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicelist);

        if(!gpn_devlist){

            return;

        }
        else{

            gpn_devlist.getSelectionModel().deselectAll();

        }

        if(!gpn_rtmlist){

            return;

        }
        else{

            gpn_rtmlist.getSelectionModel().deselectAll();

        }
    },

    onBtn_smc_device_serchClick: function(button, e, eOpts) {
        var textField = this.lookupReference('txf_search');
        var pnl_center = this.lookupReference('xtm_dev_center');
        var tb_managetool = this.lookupReference('xtm_dev_search');
        var escapeText = Ext.String.escapeRegex(textField.getValue());

        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicelist);

        if(tb_managetool.down('[itemId=rdg_smc_selelctmode]').getValue().mode === 'device'){

            if(gpn_devlist){

                var st_devlist = gpn_devlist.getStore();

                if(st_devlist){

                    searchDeviceName(st_devlist, escapeText, ['name', 'ip']);

                }

            }

        }
        else{

            if(gpn_rtmlist){

                var st_rtmlist = gpn_rtmlist.getStore();

                if(st_rtmlist){

                    searchDeviceName(st_rtmlist, textField.getValue(), ['name', 'gate_ip']);

                }

            }

        }
    },

    onBt_changeClick: function(button, e, eOpts) {
        var pnl_center = this.lookupReference('xtm_dev_center');
        var tb_managetool = this.lookupReference('xtm_dev_control');
        var cmb_period = tb_managetool.down('[itemId=ctn_smc_period]').down('[itemId=cmb_period]');

        // 업데이트 주기의 범위가 0 ~ 600 미만이거나 초과 한다면 저장 동작 취소 ================================================================================================================

        if(!cmb_period.validityCheck().blankCheck() || !cmb_period.validityCheck().scaleValidate('업데이트 주기의 범위는 0 ~ 600 입니다.<br><br>※ 주의! 업데이트 주기가 0인 경우 갱신되지 않습니다.')){

            return;

        }

        var devicePeriod = parseInt(cmb_period.getValue(), 10);

        var serviceName = 'ftSMC';
        var rpcFunc = 'setSMCSetting';
        var params = {

            'key' : Ext.encode('ui/dev/refresh_time'),
            'value' : devicePeriod

        };

        request_helper.xmlrpc_call_Ajax_Post(
        serviceName,
        rpcFunc,
        params,
        function(res){

            // 설정이 성공적으로 저장되면 시스템 타이머 종료 후 재시작 =============================================================================================================================

            if(res){

                DEVICE_COMMON_CONST.DEV_UPGRADE_TIME = devicePeriod * 1000;

                tb_managetool.down('[itemId=ctn_smc_period]').down('[itemId=cmb_period]').setValue(devicePeriod);

                // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다. ==========================================================================================================================

                pnl_center.fireEvent('devlistRefresh');

            }
            else{

                console.log('장비 갱신 오류 : 업데이트 주기 저장이 실패하였습니다. 인터넷 상태 및 서비스 상태를 확인하세요.');

            }

        }

        );
    },

    onPnl_smc_device_centerBeforeRender: function(component, eOpts) {
        // 2015.07.20 공통 스토어 생성

        Ext.create('SMC4ZEN.store.st_common_deveth');
        Ext.create('SMC4ZEN.store.st_common_totaleth');
        Ext.create('SMC4ZEN.store.st_common_bondeth');
        Ext.create('SMC4ZEN.store.st_common_vlaneth');
        Ext.create('SMC4ZEN.store.st_common_alleth');
        Ext.create('SMC4ZEN.store.st_common_pppeth');

        Ext.create('SMC4ZEN.store.st_policy_storage');
        Ext.create('SMC4ZEN.store.st_policy_vlaneth');
        Ext.create('SMC4ZEN.store.st_route_policynum');
        Ext.create('SMC4ZEN.store.st_vpn_policy');
        Ext.create('SMC4ZEN.store.st_object_select');

        Ext.create('SMC4ZEN.store.st_system_auth');

        Ext.create('SMC4ZEN.store.st_sendpolicy_list');

        // 장비 컨텍스트 메뉴 공통 스토어

        // win_xtm_restoredev

        Ext.create('SMC4ZEN.store.st_restore_device');

        // win_xtm_routetable

        Ext.create('SMC4ZEN.store.st_routing_static');
        Ext.create('SMC4ZEN.store.st_routing_ospf');
        Ext.create('SMC4ZEN.store.st_routing_rip');
        Ext.create('SMC4ZEN.store.st_routing_bgp');
        Ext.create('SMC4ZEN.store.st_routing_v6table');
    },

    onPnl_smc_device_centerAfterRender: function(component, eOpts) {
        // 갱신 주기를 Load -> 최초 로드시 갱신주기의 값은 null 입니다. 이 때 기본값인 10초로 값이 초기화 됩니다.

        var me = this;
        var serviceName = 'ftSMC';
        var rpcFunc = 'getSMCSetting';
        var params = {

            'key' : Ext.encode('ui/dev/refresh_time')

        };

        var pnl_center = this.lookupReference('xtm_dev_center');

        // 타이머 이벤트 연결

        component.on('devlistRefresh', pnl_center.refreshEvent);

        request_helper.xmlrpc_call_Ajax_Post(
        serviceName,
        rpcFunc,
        params,
        function(res){

            var devicePeriod = me.lookupReference('cmb_period');

            // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다.

            if(!res){

                devicePeriod.setValue(10);
                DEVICE_COMMON_CONST.DEV_UPGRADE_TIME = 10000;

            }
            else{
                devicePeriod.setValue(res);
                DEVICE_COMMON_CONST.DEV_UPGRADE_TIME = res * 1000;

            }

        }

        );
    },

    /*
        일 시 : 2015.09.10

        설 명 : 장비를 관리하는 View 컴포넌트가 소멸되기 직전에 호출됩니다. 종료될 때 장비 상태를 조회하는 타이머를 제거합니다.
    */
    onPnl_smc_device_viewBeforeDestroy: function(component, eOpts) {
        if(component.taskObj){

            clearInterval(component.taskObj);

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ddGroup Target을 설정합니다. ddGroup Target은 그리드와 트리와의 드래그 기능을 정의합니다.
    */
    onPnl_smc_device_viewBoxReady: function(component, width, height, eOpts) {
        var me = this;
        var pnl_group = this.lookupReference('xtm_dev_group');

        me.groupTreeDropTarget = new Ext.dd.DropTarget(pnl_group.body.dom ,{

            'ddGroup' : 'dragDevice',
            'notifyEnter': function(ddSource, e, data) {

                pnl_group.isDD = true;
                pnl_group.on('itemmouseup', me.onTreeNodeMouseUp, pnl_group);

            },
            'notifyDrop': function(ddSource, e, data) {

                return true;

            }

        });
    }

});

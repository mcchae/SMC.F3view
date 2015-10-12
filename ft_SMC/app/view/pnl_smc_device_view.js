
Ext.define('SMC.view.pnl_smc_device_view', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC.view.pnl_smc_device_tree_view',
        'SMC.view.tool_smc_device_control',
        'Ext.tree.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.form.field.ComboBox',
        'Ext.grid.plugin.BufferedRenderer'
    ],

    height: 768,
    id: 'pnl_smc_device_view',
    layout: 'border',
    title: '',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                boxready: {
                    fn: me.onPnl_smc_device_viewBoxReady,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    split: true,
                    border: false,
                    id: 'pnl_smc_device_view_west',
                    width: 270,
                    animCollapse: true,
                    collapsible: true,
                    title: '장비 그룹',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'pnl_smc_device_tree_view_west',
                            bodyPadding: 0,
                            header: false,
                            layout: {
                                type: 'accordion',
                                activeOnTop: true
                            },
                            items: [
                                {
                                    xtype: 'smc_device_tree',
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
                                    setSummaryData: function(gridComponent, summaryComponent) {
                                        // setSummaryData ================================================================================================================================================================
                                        //
                                        // 일시 : 2014.09.18
                                        //
                                        // 설명 : 장비 리스트 그리드의 Summary 데이터를 설정합니다.
                                        //
                                        // ===============================================================================================================================================================================

                                        var gridStore = gridComponent.getStore();

                                        var normalCount = 0;

                                        for(var i = 0, deviceAllCount = gridStore.count(); i < deviceAllCount; i++){

                                            if(gridStore.getAt(i).get('run_state') === 2){

                                                normalCount++;

                                            }

                                        }

                                        summaryComponent.down('[itemId=dpf_summary_state]').setValue('전체 장비 : ' + deviceAllCount + '  ' + '정상 동작 : ' + normalCount);
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
                                        function(res){

                                            console.log('장비 -> 장비 그룹으로 이동  : ', res);

                                        }

                                        );
                                    },
                                    deviceGroupToGroup: function(component, targetCid, groupCid) {
                                        // deviceGroupToGroup ============================================================================================================================================================
                                        //
                                        // 일시 : 2014.09.16
                                        //
                                        // 설명 : 장비 그룹에서 그룹을 이동할때의 동작을 정의합니다.
                                        //
                                        // ===============================================================================================================================================================================

                                        var service = 'ftSMC',
                                            serchService = 'movGroup',
                                            params = {

                                                't_cid' : Ext.encode(targetCid),
                                                'cid'   : Ext.encode(groupCid)

                                            };

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        service,
                                        serchService,
                                        params,
                                        function(res){

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

                                                var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

                                                // 장비 그룹 추가

                                                deviceGroup.setRootNode(res);

                                            }

                                            );

                                        }

                                        );
                                    },
                                    createDeviceListView: function(westObj, record) {
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

                                        var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);
                                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                                        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                                        var selectCid = record.raw.cid;
                                        var dat_search = Ext.String.escapeRegex(centerPanel.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue());

                                        // 2015.01.16 김민수 - 토글 버튼 컴포넌트 추가

                                        var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]');

                                        // 2015.01.17 김민수 - 장비그룹 컴포넌트 비활성화 시작

                                        deviceGroup.setDisabled(true);

                                        // 로드 마스크 생성

                                        centerContainer.setLoading(true);

                                        if(centerPanel.taskObj){

                                            clearInterval(centerPanel.taskObj);

                                        }

                                        // 서비스 파라미터 정의. 클릭된 그룹의 node 정보를 전달한다. 그리드가 생성되지않았거나 생성 되었을때 모두 공통으로 사용됨.

                                        var service = 'ftSMC',
                                            serchService = 'getDeviceList',
                                            params = {

                                                'g_cid' : Ext.encode(selectCid),
                                                'isRecursive' : Ext.encode(dev_recursive)

                                            };

                                        // 이미 장비목록을 표시하는 그리드가 생성되어 있을경우 ...

                                        if(centerContainer.oldView){

                                            // AJAX 데이터 통신으로 장비 목록을 가져옴

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            serchService,
                                            params,
                                            function(res){

                                                // 그리드가 생성되어있다면 ...

                                                if(westObj._dynamicGrid){

                                                    // 선택된 모든 체크박스 상태 해제

                                                    westObj._dynamicGrid.getSelectionModel().deselectAll();

                                                    // 상태유지를 저장하는 그리드 멤버 변수 초기화

                                                    westObj._dynamicGrid.selectRecords = [];

                                                    // 스크롤 초기화

                                                    westObj._dynamicGrid.getView()._ws_lastScrollPosition = 0;

                                                    // 장비목록 데이터를 그리드의 스토어에 초기화

                                                    var st_devlist = westObj._dynamicGrid.getStore();

                                                    st_devlist.loadData(res);

                                                    // 검색 필드에 값이 있으면 필터 적용

                                                    searchDeviceName(st_devlist, dat_search, ['name', 'ip']);

                                                }

                                                // 자동 갱신 이벤트 실행

                                                centerPanel.fireEvent('devlistRefresh');

                                                // Summary 표시 함수 호출

                                                deviceGroup.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                                                // 로드 마스크 제거

                                                centerContainer.setLoading(false);

                                                // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                                                deviceGroup.setDisabled(false);

                                            });

                                        }
                                        else{

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            serchService,
                                            params,
                                            function(res){

                                                SMC_VIEW.create_grid_panel(
                                                selectCid,
                                                G_TYPE.DEVICE,
                                                'gpn_smc_device_list',
                                                false,
                                                function(_grid_tpl){

                                                    westObj._dynamicGrid = Ext.create(_grid_tpl,{

                                                        'id'            : DEVICE_COMMON_ID.devicelist,
                                                        'selectRecords' : [],
                                                        'selectIndex'   : [],
                                                        'border'        : false,
                                                        'viewConfig'    : {
                                                            'itemId'    : 'gdv_smc_device_view',
                                                            'preserveScrollOnRefresh' : true,
                                                            'listeners' : {

                                                                // 실시간 데이터 조회시 그리드-뷰의 리프레시 이벤트에서 상태유지적용

                                                                refresh: function(dataview, eOpts){

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
                                                            plugins : [

                                                            {

                                                                ptype : 'gridviewdragdrop',
                                                                enableDrag : true,
                                                                enableDrop : false,
                                                                ddGroup : 'dragDevice'

                                                            }

                                                            ]

                                                        },
                                                        dockedItems: [
                                                        {
                                                            xtype : 'toolbar',
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
                                                        'selModel'	: Ext.create('Ext.selection.CheckboxModel', {

                                                            listeners: {
                                                                select: function(records){

                                                                    // onCheckboxModelSelect =======================================================================================================================================================
                                                                    //
                                                                    // 일시 : 2014.07.11
                                                                    //
                                                                    // 설명 : 그리드 아이템을 클릭 했을 때의 기능을 정의합니다. 그리드의 아이템을 클릭하면 장비 추가, 수정, 삭제 버튼이 활성화 됩니다.
                                                                    //
                                                                    // =============================================================================================================================================================================

                                                                    var controlToolbar = centerPanel.down('[itemId=tb_smc_device_control]');

                                                                    controlToolbar.down('[itemId=bt_add]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_mod]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_del]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_status]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_export]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_policy]').down('[itemId=mu_dev_sendpolicy]').down('[itemId=mi_dev_selsendpolicy]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_terminal]').setDisabled(false);

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

                                                                    var controlToolbar = centerPanel.down('[itemId=tb_smc_device_control]');

                                                                    if(!deviceList.getSelectionModel().getSelection().length){

                                                                        controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_del]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_status]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_export]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_policy]').down('[itemId=mu_dev_sendpolicy]').down('[itemId=mi_dev_selsendpolicy]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_terminal]').setDisabled(true);

                                                                    }

                                                                }

                                                            }

                                                        })

                                                    });

                                                    // 생성된 그리드를 컨테이너에 추가

                                                    centerContainer.add(westObj._dynamicGrid);

                                                    // 생성된 뷰의 정보를 저장하는 리스트에 그리드 정보 저장

                                                    centerContainer.oldView = westObj._dynamicGrid;

                                                    // 그리드 이벤트 추가

                                                    // 일시 : 2014.07.04
                                                    //
                                                    // 설명 : 더블 클릭한 row에 해당하는 장비 설정 창이 출력됩니다.
                                                    //
                                                    // ============================================================================================================================================================================

                                                    westObj._dynamicGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){

                                                        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                                        if(devicelistObj.taskObj){

                                                            clearInterval(devicelistObj.taskObj);

                                                        }

                                                        deviceCUD.updateDevice(record.raw['@cid'], record.raw.ip, record.raw.spd_state, record.raw.eth_count);

                                                    });

                                                    // 서버에서 응답한 데이터를 스토어에 load

                                                    var st_devlist = westObj._dynamicGrid.getStore();

                                                    st_devlist.loadData(res);

                                                    searchDeviceName(st_devlist, dat_search, ['name', 'ip']);

                                                    // 로드마스크 제거

                                                    centerContainer.setLoading(false);

                                                    // 갱신 이벤트 실행

                                                    centerPanel.fireEvent('devlistRefresh');

                                                    // Summary 함수 호출

                                                    deviceGroup.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                                                    // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                                                    deviceGroup.setDisabled(false);

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

                                            var moniterView = Ext.create('widget.rtm_main', {});

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

                                        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                                        var deviceGroupRecord = deviceGroup.getSelectionModel().getSelection()[0];
                                        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                        var deviceRecords = deviceList.getSelectionModel().getSelection();

                                        if(deviceGroup.isDD){

                                            deviceGroup.isDD = false;

                                            deviceGroup.un('itemmouseup', me.onTreeNodeMouseUp, me);

                                            var _svc = 'ftSMC',
                                                selectRecordSize = deviceRecords.length;

                                            var cidArray = [];

                                            if(selectRecordSize <= 0){

                                                return;

                                            }

                                            var moveGroupCid = record.raw.cid;

                                            for(var i = 0, max = selectRecordSize; i < max; i++){

                                                cidArray.push(deviceRecords[i].raw['@cid']);

                                            }

                                            me.deviceDragToGroup(moveGroupCid, cidArray);

                                        }
                                    },
                                    border: false,
                                    id: 'pnl_smc_device_tree_view_xtm',
                                    title: 'WeGuardia XTM',
                                    listeners: {
                                        select: {
                                            fn: me.onPnl_smc_device_tree_viewSelect,
                                            scope: me
                                        },
                                        afterrender: {
                                            fn: me.onPnl_smc_device_tree_viewAfterRender,
                                            scope: me
                                        },
                                        deselect: {
                                            fn: me.onPnl_smc_device_tree_viewDeselect,
                                            scope: me
                                        },
                                        expand: {
                                            fn: me.onPnl_smc_device_tree_viewExpand,
                                            scope: me
                                        },
                                        beforecollapse: {
                                            fn: me.onPnl_smc_device_tree_viewBeforeCollapse,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'smc_device_tree',
                                    setSummaryData: function(gridComponent, summaryComponent) {
                                        // setSummaryData ================================================================================================================================================================
                                        //
                                        // 일시 : 2014.09.18
                                        //
                                        // 설명 : 장비 리스트 그리드의 Summary 데이터를 설정합니다.
                                        //
                                        // ===============================================================================================================================================================================

                                        var gridStore = gridComponent.getStore();

                                        var normalCount = 0;

                                        for(var i = 0, deviceAllCount = gridStore.count(); i < deviceAllCount; i++){

                                            if(gridStore.getAt(i).get('run_state') === 2){

                                                normalCount++;

                                            }

                                        }

                                        summaryComponent.down('[itemId=dpf_summary_state]').setValue('전체 장비 : ' + deviceAllCount + '  ' + '정상 동작 : ' + normalCount);
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
                                        function(res){

                                            console.log('장비 -> 장비 그룹으로 이동  : ', res);

                                        }

                                        );
                                    },
                                    deviceGroupToGroup: function(component, targetCid, groupCid) {

                                        var service = 'ftSMC',
                                            serchService = 'movGroup',
                                            params = {

                                                't_cid' : Ext.encode(targetCid),
                                                'cid'   : Ext.encode(groupCid)

                                            };

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        service,
                                        serchService,
                                        params,
                                        function(res){

                                            var service = 'ftSMC',
                                                serchService = 'getGroup',
                                                params = {

                                                    gtype : Ext.encode('obj_zen')

                                                };

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            serchService,
                                            params,
                                            function(res){

                                                var deviceGroup = Ext.getCmp('pnl_zen_device_tree_view');

                                                // 장비 그룹 추가

                                                deviceGroup.setRootNode(res);

                                            }

                                            );

                                        }

                                        );
                                    },
                                    createDeviceZENListView: function(westObj, record) {
                                        var centerContainer = Ext.getCmp('ctn_zen_device_list');
                                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                                        var deviceGroup = Ext.getCmp('pnl_zen_device_tree_view');
                                        var selectCid   = record.raw.cid;

                                        var showMode = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');

                                        deviceGroup.setDisabled(true);

                                        centerContainer.setLoading(true);

                                        if(centerPanel.taskObj){

                                            clearInterval(centerPanel.taskObj);

                                        }

                                        var service = 'ftSMC',
                                            serchService = 'getDeviceList',
                                            params = {

                                                'g_cid' : Ext.encode(selectCid),
                                                'isRecursive' : Ext.encode(showMode.pressed)
                                            };

                                        if(centerContainer.oldZENView){

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            serchService,
                                            params,
                                            function(res){

                                                if(westObj._dynamicZENGrid){

                                                    westObj._dynamicZENGrid.getSelectionModel().deselectAll();

                                                    westObj._dynamicZENGrid.selectRecords = [];

                                                    westObj._dynamicZENGrid.getView()._ws_lastScrollPosition = 0;

                                                    westObj._dynamicZENGrid.getStore().loadData(res);

                                                    westObj._dynamicZENGrid.getView().refresh();
                                                }

                                                centerPanel.fireEvent('zendevlistRefresh');

                                                deviceGroup.setSummaryData(Ext.getCmp('gpn_zen_device_list'), Ext.getCmp('tb_zen_devicelist_summary'));

                                                centerContainer.setLoading(false);

                                                deviceGroup.setDisabled(false);

                                            }

                                            );

                                        }
                                        else{

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            serchService,
                                            params,
                                            function(res){

                                                SMC_VIEW.create_grid_panel(
                                                selectCid,
                                                G_TYPE.SMC4ZEN,
                                                'gpn_zen_device_list',
                                                false,
                                                function(_grid_tpl){

                                                    westObj._dynamicZENGrid = Ext.create(_grid_tpl,{

                                                        'id' : 'gpn_zen_device_list',
                                                        'selectRecords' : [],
                                                        'selectIndex'   : [],
                                                        'border'        : false,
                                                        'viewConfig'    : {
                                                            'itemId'    : 'gdv_zen_device_view',
                                                            'preserveScrollOnRefresh' : true,
                                                            'listeners' : {

                                                                refresh: function(dataview, eOpts){

                                                                    var newRecordsToSelect = [];
                                                                    var deviceList = Ext.getCmp('gpn_zen_device_list');

                                                                    deviceList.getSelectionModel().select(newRecordsToSelect);

                                                                    if (0 < deviceList.selectRecords.length) {

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
                                                            plugins : [
                                                            {
                                                                ptype : 'gridviewdragdrop',
                                                                enableDrag : true,
                                                                enableDrop : false,
                                                                ddGroup : 'dragDevice'
                                                            }
                                                            ]
                                                        },
                                                        dockedItems: [
                                                        {
                                                            xtype : 'toolbar',
                                                            dock  : 'bottom',
                                                            id    : 'tb_zen_devicelist_summary',
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
                                                        'selModel'	: Ext.create('Ext.selection.CheckboxModel', {

                                                            listeners: {
                                                                select: function(records){

                                                                    var controlToolbar = centerPanel.down('[itemId=tb_zen_device_control]');

                                                                    controlToolbar.down('[itemId=bt_add]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_mod]').setDisabled(false);
                                                                    controlToolbar.down('[itemId=bt_del]').setDisabled(false);

                                                                },
                                                                deselect: function(records){

                                                                    var deviceList = Ext.getCmp('gpn_zen_device_list');

                                                                    var controlToolbar = centerPanel.down('[itemId=tb_zen_device_control]');

                                                                    if(!deviceList.getSelectionModel().getSelection().length){

                                                                        controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
                                                                        controlToolbar.down('[itemId=bt_del]').setDisabled(true);

                                                                    }

                                                                }

                                                            }

                                                        })

                                                    });

                                                    centerContainer.add(westObj._dynamicZENGrid);

                                                    centerContainer.oldZENView = westObj._dynamicZENGrid;

                                                    westObj._dynamicZENGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){

                                                        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                                        var zen_ip = record.data.ip;
                                                        var zen_id = record.data.id;
                                                        var zen_port = record.data.port_http;
                                                        var session_id = record.data['@cid'];

                                                        Ext.data.JsonP.request({
                                                            url :  'https://' + zen_ip + ':' + zen_port + '/getRemoteAddressJsonP',
                                                            method : 'POST',
                                                            success : function(response){

                                                                console.log('getRemoteAddressJsonP response - ', response);
                                                                if(response.success){

                                                                    Ext.data.JsonP.request({
                                                                        url : 'https://' + zen_ip + ':' + zen_port + '/getSMCCheckJsonP',
                                                                        method : 'POST',
                                                                        success : function(response){

                                                                            console.log('getSMCCheckJsonP response - ', response);

                                                                            if(response.success)
                                                                            {
                                                                                if(!zen_id && response.userId !== 'undefined')
                                                                                {
                                                                                    zen_id = response.userId;
                                                                                }

                                                                                var zen_device_view = Ext.create('Ext.window.Window', {
                                                                                    layout: 'fit',
                                                                                    maximizable: true,
                                                                                    title : 'WeGuardia™ DMC - ' + zen_ip,
                                                                                    ip : zen_ip,
                                                                                    port : zen_port,
                                                                                    session_id : session_id,
                                                                                    width: 1300,
                                                                                    height: 650,
                                                                                    constrain: true,
                                                                                    bodyPadding: 5,
                                                                                    listeners:{
                                                                                        beforedestroy:function(component, eOpts) {

                                                                                            Ext.data.JsonP.request({
                                                                                                url : 'https://' + component.ip + ':' + component.port + '/api/ftH_menu/logOut',
                                                                                                method : 'POST',
                                                                                                params : {
                                                                                                    'session_id' : Ext.encode(component.session_id),
                                                                                                },
                                                                                                success : function(response){
                                                                                                    console.log('response - ', response);

                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });

                                                                                if(zen_id)
                                                                                {
                                                                                    //zen_device_view.update('<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="https://' + zen_ip + ':' + zen_port + '/smc4zen?userId=' + zen_id + '&session_id=' + session_id + '"></iframe>');
                                                                                    zen_device_view.update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + zen_ip + ':' + zen_port + '/smc4zen?userId=' + zen_id + '&session_id=' + session_id + '"></object>');

                                                                                    zen_device_view.show();
                                                                                }
                                                                                else
                                                                                {
                                                                                    request_helper.xmlrpc_call_Ajax_Post(
                                                                                    'ftSMC',
                                                                                    'getObject',
                                                                                    {
                                                                                        'cid' : Ext.encode(session_id)
                                                                                    },
                                                                                    function(res){

                                                                                        if(res)
                                                                                        {
                                                                                            zen_id = res.connection_info.id;

                                                                                            //zen_device_view.update('<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="https://' + zen_ip + ':' + zen_port + '/smc4zen?userId=' + zen_id + '&session_id=' + session_id + '"></iframe>');
                                                                                            zen_device_view.update('<object style="overflow:auto;width:100%;height:100%;" data="https://' + zen_ip + ':' + zen_port + '/smc4zen?userId=' + zen_id + '&session_id=' + session_id + '"></object>');

                                                                                            zen_device_view.show();
                                                                                        }
                                                                                    }
                                                                                    );
                                                                                }
                                                                            }
                                                                        },
                                                                        failure: function(response){
                                                                            Ext.Msg.show({
                                                                                title : '장비 응답 에러',
                                                                                msg : '장비의 응답이 없습니다.',
                                                                                buttons : Ext.Msg.OK,
                                                                                icon : Ext.Msg.ERROR
                                                                            });
                                                                        }

                                                                    });

                                                                }
                                                            },
                                                            failure: function(response){
                                                                Ext.Msg.show({
                                                                    title : '장비 응답 에러',
                                                                    msg : '장비의 응답이 없습니다.',
                                                                    buttons : Ext.Msg.OK,
                                                                    icon : Ext.Msg.ERROR
                                                                });
                                                            }
                                                        });

                                                    });

                                                    westObj._dynamicZENGrid.on('itemclick', function(obj, record, item, index, e, eOpts){

                                                        var controlToolbar = centerPanel.down('[itemId=tb_zen_device_control]');

                                                        controlToolbar.down('[itemId=bt_add]').setDisabled(false);
                                                        controlToolbar.down('[itemId=bt_mod]').setDisabled(false);
                                                        controlToolbar.down('[itemId=bt_del]').setDisabled(false);

                                                    });

                                                    westObj._dynamicZENGrid.getStore().loadData(res);

                                                    centerContainer.setLoading(false);

                                                    searchDeviceName(westObj._dynamicZENGrid.getStore(), centerPanel.down('[itemId=tb_zen_device_search]').down('[itemId=txf_searchstr]').getValue(), ['name', 'ip']);

                                                    // 갱신 이벤트 실행

                                                    centerPanel.fireEvent('zendevlistRefresh');

                                                    // Summary 함수 호출

                                                    deviceGroup.setSummaryData(Ext.getCmp('gpn_zen_device_list'), Ext.getCmp('tb_zen_devicelist_summary'));

                                                    // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                                                    deviceGroup.setDisabled(false);

                                                });
                                            }
                                            );
                                        }
                                    },
                                    onTreeNodeMouseUp: function(dataview, record, item, index, e, eOpts) {
                                        var me = this;

                                        var deviceGroup = Ext.getCmp('pnl_zen_device_tree_view');
                                        var deviceGroupRecord = deviceGroup.getSelectionModel().getSelection()[0];
                                        var deviceList = Ext.getCmp('gpn_zen_device_list');

                                        var deviceRecords = deviceList.getSelectionModel().getSelection();

                                        if(deviceGroup.isDD){

                                            deviceGroup.isDD = false;

                                            deviceGroup.un('itemmouseup', me.onTreeNodeMouseUp, me);

                                            var _svc = 'ftSMC',
                                                selectRecordSize = deviceRecords.length;

                                            var cidArray = [];

                                            if(selectRecordSize <= 0){

                                                return;

                                            }

                                            var moveGroupCid = record.raw.cid;

                                            for(var i = 0, max = selectRecordSize; i < max; i++){

                                                cidArray.push(deviceRecords[i].raw['@cid']);

                                            }

                                            me.deviceDragToGroup(moveGroupCid, cidArray);

                                        }
                                    },
                                    setTreeNode: function() {
                                        var me = this;

                                        me.down('[itemId=trv_smc_device_view]').on('drop', function(node, data, overModel, dropPosition, eOpts){

                                            me.deviceGroupToGroup(me, overModel.raw.cid, data.records[0].raw.cid);

                                        });


                                        var service = 'ftSMC',
                                            serchService = 'getGroup',
                                            params = {

                                                gtype : Ext.encode('obj_zen')

                                            };

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        service,
                                        serchService,
                                        params,
                                        function(res){

                                            me.setRootNode(res);
                                        }

                                        );
                                    },
                                    border: false,
                                    id: 'pnl_zen_device_tree_view',
                                    title: 'WeGuardia ZEN',
                                    listeners: {
                                        select: {
                                            fn: me.onPnl_zen_device_tree_viewSelect,
                                            scope: me
                                        },
                                        deselect: {
                                            fn: me.onPnl_zen_device_tree_viewDeselect,
                                            scope: me
                                        },
                                        expand: {
                                            fn: me.onPnl_zen_device_tree_viewExpand,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_smc_device_view_westAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'smc_device_tree',
                            hidden: true,
                            id: 'pnl_smc_ssl_grouplist',
                            title: 'WeGuardia SSL'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'smc_device_control',
                            border: false,
                            disabled: true,
                            id: 'tb_smc_device_groupctrl',
                            dock: 'top',
                            listeners: {
                                afterrender: {
                                    fn: me.onToolbarAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'smc_device_control',
                            border: false,
                            disabled: true,
                            hidden: true,
                            id: 'tb_zen_device_groupctrl',
                            dock: 'top',
                            listeners: {
                                afterrender: {
                                    fn: me.onToolbarAfterRender1,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    initDeviceData: function(deviceParams, storeObj) {
                        // initDeviceData ===============================================================================================================================================================
                        //
                        // 일시 : 2014.05.10
                        //
                        // 설명 : 파라미터로 들어온 인터페이스 정보를 각 스토어에 초기화 합니다. 스토어의 사용용도에 따라 인터페이스 초기화가 달라질 수 있습니다.
                        //
                        // ==============================================================================================================================================================================

                        Ext.each(deviceParams, function(ethData){

                            for(var i = 0; i < storeObj.length; i++){

                                storeObj[i].add({	'eth'	: ethData.name	});

                            }

                        });
                    },
                    refreshEvent: function() {
                        // refreshEvent
                        //
                        // 일시 : 2014.07.01
                        //
                        // 설명 : 장비 리스트를 5초 마다 갱신합니다.
                        //
                        // 수정 :
                        //
                        // (2014.11.15 김민수 - 타이머 주기가 0일 경우 타이머의 동작을 취소합니다.)
                        // (2015.01.06 김민수 - 장비그룹이 선택되어있지 않다면 타이머 동작이 되지 않도록 분기문 처리)
                        // (2015.01.16 김민수 - 장비리스트 조회시 isRecursive 파라미터 추가)
                        // (2015.01.17 김민수 - Loadmask 나 컴포넌트가 Disable 되있을때 블록이 걸린다면 블록을 해제하도록 코드 추가)
                        // (2015.01.18 김민수 - refresh 이벤트 자바스크립트 최적화)

                        var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                        var selectNode = treeObj.getSelectionModel().getSelection()[0];
                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                        // 1. 이미 타이머가 동작 중이라면 종료

                        if(centerPanel.taskObj){

                            clearInterval(centerPanel.taskObj);

                        }

                        // 3. 타이머를 설정
                        //
                        // 설명 : 타이머의 최소 동작 주기는 1000 (1초) 입니다. 그러나 장비가 많을 경우는 10초를 권장합니다. 이것은 주석을 달고있는 시점의 해당사항입니다 (2014.11.15)
                        // 선택된 노드의 정보가 있다면 타이머 동작

                        if(selectNode){

                            if(DEVICE_COMMON_CONST.DEV_UPGRADE_TIME > 999){

                                centerPanel.taskObj = setInterval(refreshDeviceList, DEVICE_COMMON_CONST.DEV_UPGRADE_TIME);

                            }

                        }

                        function refreshDeviceList(){

                            var treeObj    = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                            var pnl_center = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                            var selectNode = treeObj.getSelectionModel().getSelection()[0];
                            var showMode   = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]');
                            var txf_filterValue = pnl_center.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue();

                            if(selectNode === undefined || selectNode === null){

                                clearInterval(pnl_center.taskObj);

                                return;

                            }

                            var service = 'ftSMC',
                                serchService = 'getDeviceList',
                                params = {

                                    g_cid : Ext.encode(selectNode.raw.cid),
                                    isRecursive : Ext.encode(showMode.pressed)

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                            service,
                            serchService,
                            params,
                            function(res){

                                // 0. 공통변수선언

                                var gridObj         = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
                                var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);
                                var deviceGroup     = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                                var _deviceCenter = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                // 1. 그리드객체가 생성되어 있다면

                                if(gridObj){

                                    var tmpArray = [];
                                    var store = gridObj.getStore();

                                    // 2. 그리드의 selectRecords 에 이전에 선택된 Row 정보를 저장

                                    gridObj.selectRecords = gridObj.getSelectionModel().getSelection();



                                    for(var i = 0; i < gridObj.selectRecords.length; i++){

                                        tmpArray.push(store.indexOf(gridObj.selectRecords[i]));

                                    }

                                    gridObj.selectIndex = tmpArray;

                                    // 6. 새로 받은 데이터를 그리드의 스토어에 Load

                                    if(store){

                                        store.loadData(res);

                                        // 7. 그리드 스토어의 필터를 실행합니다. 검색 필드창에 데이터가 있을경우 필터로 걸러내어 다시 refresh

                                        searchDeviceName(store, Ext.String.escapeRegex(txf_filterValue), ['name', 'ip']);

                                    }

                                }

                                // 8. 요약 데이터를 갱신

                                treeObj.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                                // 2015.01.17 김민수 - timeout으로 인해 block이 생길 경우 다음 refresh에서 정상적인 응답이 오면 block을 풀기위해 추가함.

                                // 9. 로드 마스크 제거

                                centerContainer.setLoading(false);

                                // 10. 2015.01.17 김민수 - 장비그룹 비활성화 해제

                                deviceGroup.setDisabled(false);

                            }

                            );

                        }
                    },
                    initEthStore: function(deviceParams, deviceMode, deviceEthCount) {
                        // initEthStore ================================================================================================================================================================
                        //
                        // 일시 : 2014.05.10
                        //
                        // 설명 : 공통 스토어 및 화면 로드시 필요한 스토어를 초기화 합니다.
                        //
                        // 수정 :
                        //
                        // (2014.7.8  김민수) 네트워크-인터페이스 초기화 작업을 이벤트 형태로 변경
                        // (2014.11.4 김민수) 장비가 초기상태이거나 IP가 할당되지 않았을경우 장비상태조회코드 X
                        // (2014.11.14 김민수) 인터페이스 초기화 방법 변경으로 인한 장비연결 코드 주석처리
                        // (2014.11.14 김민수) 인터페이스 초기화 방법을 장비 리스트의 Row - raw.eth_count 초기화 방식으로 변경
                        // (2015.10.05 김민수) 인터페이스 초기화 bondEth / bondOnly 버그 수정
                        //
                        // =============================================================================================================================================================================

                        // 인터페이스 스토어 ==============================================================================================================================================================

                        var devEthStore   = Ext.getStore('st_common_deveth');      // 물리 인터페이스
                        var totalEthStore = Ext.getStore('st_common_totaleth');    // 물리 인터페이스 + 브릿지 목록 + 본딩 목록 + VLAN 목록
                        var bondEthStore  = Ext.getStore('st_common_bondeth');     // 물리 인터페이스 + 브릿지 목록
                        var vlanEthStore  = Ext.getStore('st_common_vlaneth');     // 물리 인터페이스 + VLAN 목록
                        var allEthStore   = Ext.getStore('st_common_alleth');      // 물리 인터페이스 + 브릿지 목록 + 본딩 목록
                        var pppEthStore   = Ext.getStore('st_common_pppeth');      // 물리 인터페이스 + PPP 목록

                        var bondOnlyStore = Ext.getStore('st_common_bondonlyeth'); // 물리 인터페에스 + 본딩 목록

                        // Policy 관련 스토어 ============================================================================================================================================================

                        var policyVlan    = Ext.getStore('st_policy_vlaneth');     // VLAN 목록 (정책 설정에서 사용하는 스토어)
                        var serverStore   = Ext.getStore('st_system_auth');        // 관리자 메뉴에서 서버 종류를 초기화합니다.
                        var policyNum     = Ext.getStore('st_route_policynum');    // 라우터에서 정책번호를 초기화합니다.

                        // 브릿지 초기화 =================================================================================================================================================================

                        var pnl_CenterView = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                        if(deviceParams.network_bridge){

                            pnl_CenterView.initDeviceData(deviceParams.network_bridge.bridge, [bondEthStore, allEthStore, totalEthStore ]);

                        }
                        // 본딩 초기화 ===================================================================================================================================================================

                        if(deviceParams.network_bonding){

                            pnl_CenterView.initDeviceData(deviceParams.network_bonding.bonding, [bondOnlyStore, allEthStore, totalEthStore]);

                        }

                        // vlan 초기화 ==================================================================================================================================================================

                        if(deviceParams.network_vlan){

                            pnl_CenterView.initDeviceData(deviceParams.network_vlan.vlan, [vlanEthStore, totalEthStore]);

                            // vlan 정책 초기화 ==============================================================================================================================================================

                            Ext.each(deviceParams.network_vlan.vlan, function(ethData){

                                policyVlan.add({	'eth'	: ethData.name		});

                            });

                        }

                        // PPP 인터페이스 초기화 ==========================================================================================================================================================

                        Ext.each(deviceParams.network_interface['interface'], function(ethData, idx){

                            if(ethData.setting){

                                if(ethData.setting['@type'] === 'PPPoE'){

                                    pppEthStore.getAt(idx).set({	'eth' :	'ppp' + idx		});

                                    totalEthStore.getAt(idx).set({	'eth' :	'ppp' + idx		});

                                }
                            }

                        });

                        // 정책 번호 초기화 ===============================================================================================================================================================

                        policyNum.add(	{	'name' : 'Any', 'value' : 'Any'		}	);

                        if(deviceParams.network_router_policy){

                            Ext.each(deviceParams.network_router_policy.list, function(policyData){

                                policyNum.add({		'name' : policyData.policy,		'value' : policyData.policy		});

                            });

                        }

                        // 서버 종류 초기화 ===============================================================================================================================================================

                        if(deviceParams.network_radius){

                            var serverObj = [];

                            serverObj.push({	name : 'Local', value : 1	});

                            if(deviceParams.network_radius.radius){

                                if(deviceParams.network_radius.radius['@chk_use'] === "on")
                                serverObj.push({	name : 'Radius', value : 2	});

                            }

                            if(deviceParams.network_radius.tacacs){

                                if(deviceParams.network_radius.tacacs['@chk_use'] === "on")
                                serverObj.push({	name : 'TACACS', value : 3	});

                            }

                            if(deviceParams.network_radius.ldap){

                                if(deviceParams.network_radius.ldap['@chk_use'] === "on")
                                serverObj.push({	name : 'LDAP'  , value : 4	});

                            }

                            serverStore.loadData(serverObj);

                        }

                        var ethArray = [];

                        try{

                            // 장비 연동시 장비의 인터페이스 카운트 값으로 인터페이스 초기화 ========================================================================================================================

                            if(deviceEthCount){

                                for(var i = 0; i < deviceEthCount; i++){

                                    ethArray.push({	'eth' : 'eth' + i	});

                                }

                                devEthStore.loadData(ethArray);
                                totalEthStore.loadData(ethArray);
                                bondEthStore.loadData(ethArray);
                                bondOnlyStore.loadData(ethArray);
                                vlanEthStore.loadData(ethArray);
                                allEthStore.loadData(ethArray);
                                pppEthStore.loadData(ethArray);

                                // 브릿지 목록 초기화

                                if(deviceParams.network_bridge){

                                    pnl_CenterView.initDeviceData(deviceParams.network_bridge.bridge, [bondEthStore, allEthStore, totalEthStore ]);

                                }

                                // 본딩 목록 초기화

                                if(deviceParams.network_bonding){

                                    pnl_CenterView.initDeviceData(deviceParams.network_bonding.bonding, [bondOnlyStore, allEthStore, totalEthStore]);

                                }

                                // VLAN 목록 초기화

                                if(deviceParams.network_vlan){

                                    pnl_CenterView.initDeviceData(deviceParams.network_vlan.vlan, [vlanEthStore, totalEthStore]);

                                }

                                // PPP는 예외로 설정합니다. PPP는 추가되는것이 아니라 인터페이스 변경되는 작업을 합니다. ===================================================================================================

                                if(deviceParams.network_interface){

                                    for(var i = 0; i < pppEthStore.count(); i++){

                                        if(deviceParams.network_interface['interface'][i].setting['@type'] !== null){

                                            if(deviceParams.network_interface['interface'][i].setting['@type'] === 'PPPoE'){

                                                pppEthStore.getAt(i).set({	'eth' :	'ppp' + i		});

                                                totalEthStore.getAt(i).set({	'eth' : 'ppp' + i	});

                                            }

                                        }

                                    }

                                }

                            }

                        }
                        catch(e){

                            console.log('인터페이스 초기화 도중 오류가 발생하였습니다. 실제 장비의 인터페이스 갯수를 설정하는 변수가 이상이 있을 수 있습니다.');

                        }

                        // 이전 인터페이스 코드 ===========================================================================================================================================================

                        // if(deviceMode !== 'ADD' && arguments[2] !== '0.0.0.0' && arguments[3] !== 0){

                        //     var service = 'ftSMC',
                        //         serchService = 'getDeviceStatusInfo',
                        //         params = {

                        //             cid : Ext.encode(deviceParams['@cid'])

                        //         };

                        //     request_helper.xmlrpc_call_Ajax_Post(
                        //         service,
                        //         serchService,
                        //         params,
                        //         function(deviceState){

                        //             var ethArray = [];

                        //             try{

                        //                 Ext.each(deviceState.smc_status['interface'], function(ethData, idx){

                        //                     if(ethData['@name'].substring(0, 3) === 'eth'){

                        //                         ethArray.push(	{	'eth' : ethData['@name']	});

                        //                     }

                        //                 });

                        //             }
                        //             catch(err){

                        //                 return;

                        //             }

                        //             devEthStore.loadData(ethArray);
                        //             totalEthStore.loadData(ethArray);
                        //             bondEthStore.loadData(ethArray);
                        //             vlanEthStore.loadData(ethArray);
                        //             allEthStore.loadData(ethArray);
                        //             pppEthStore.loadData(ethArray);

                        // 장비에 연결된 경우 브릿지, 본딩, vlan 설정 =======================================================================================================================================
                        //
                        // 설명 : 장비에 연결된 경우 인터페이스 정보를 다시 받아옵니다. 정보를 다시 받아오면 모든 스토어를 장비가 가지고 있는 인터페이스로 초기화 합니다. 이후 등록된 브릿지, 본딩, vlan을 포함하여 다시 초기화 합니다.
                        //
                        // 예외 : 인터페이스 정보가 필요없는 스토어는 이 부분에서 초기화하지 않습니다. (인터페이스가 필요없는 부분 -> 정책 번호, 서버 종류, vlan 정책)
                        //
                        // =============================================================================================================================================================================

                        //             if(deviceParams.network_bridge)
                        //                 Ext.getCmp('pnl_smc_device_center').initDeviceData(deviceParams.network_bridge.bridge,   [ bondEthStore, allEthStore ,totalEthStore ]);

                        //             if(deviceParams.network_bonding)
                        //                 Ext.getCmp('pnl_smc_device_center').initDeviceData(deviceParams.network_bonding.bonding, [ allEthStore, totalEthStore]);

                        //             if(deviceParams.network_vlan)
                        //                 Ext.getCmp('pnl_smc_device_center').initDeviceData(deviceParams.network_vlan.vlan,       [ vlanEthStore, totalEthStore]);

                        // PPP는 예외로 설정합니다. PPP는 추가되는것이 아니라 인터페이스 변경되는 작업을 합니다. ===================================================================================================

                        //             if(deviceParams.network_interface){

                        //                 for(var i = 0; i < pppEthStore.count(); i++){

                        //                     if(deviceParams.network_interface['interface'][i].setting['@type'] !== null){

                        //                         if(deviceParams.network_interface['interface'][i].setting['@type'] === 'PPPoE'){

                        //                             pppEthStore.getAt(i).set({	'eth' :	'ppp' + i		});

                        //                             totalEthStore.getAt(i).set({	'eth' : 'ppp' + i	});

                        //                         }

                        //                     }

                        //                 }

                        //             }

                        //         }

                        //     );

                        // }
                    },
                    refreshZENEvent: function() {

                        var treeObj = Ext.getCmp('pnl_zen_device_tree_view');
                        var selectNode = treeObj.getSelectionModel().getSelection()[0];
                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                        if(centerPanel.taskObj){

                            clearInterval(centerPanel.taskObj);

                        }

                        if(selectNode){

                            if(DEVICE_COMMON_CONST.DEV_UPGRADE_TIME > 999){

                                centerPanel.taskObj = setInterval(refreshDeviceList, DEVICE_COMMON_CONST.DEV_UPGRADE_TIME);

                            }

                        }

                        function refreshDeviceList(){

                            var treeObj    = Ext.getCmp('pnl_zen_device_tree_view');
                            var pnl_center = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                            var selectNode = treeObj.getSelectionModel().getSelection()[0];
                            var showMode   = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');
                            var txf_filterValue = pnl_center.down('[itemId=tb_zen_device_search]').down('[itemId=txf_searchstr]').getValue();

                            if(selectNode === undefined || selectNode === null){

                                clearInterval(pnl_center.taskObj);

                                return;

                            }

                            var service = 'ftSMC',
                                serchService = 'getDeviceList',
                                params = {

                                    g_cid : Ext.encode(selectNode.raw.cid),
                                    isRecursive : Ext.encode(showMode.pressed)

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                            service,
                            serchService,
                            params,
                            function(res){

                                var gridObj         = Ext.getCmp('gpn_zen_device_list');
                                var centerContainer = Ext.getCmp('ctn_zen_device_list');
                                var deviceGroup     = Ext.getCmp('pnl_zen_device_tree_view');
                                var _deviceCenter = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                if(gridObj){

                                    var tmpArray = [];
                                    var store = gridObj.getStore();

                                    gridObj.selectRecords = gridObj.getSelectionModel().getSelection();



                                    for(var i = 0; i < gridObj.selectRecords.length; i++){

                                        tmpArray.push(store.indexOf(gridObj.selectRecords[i]));

                                    }

                                    gridObj.selectIndex = tmpArray;

                                    if(store){

                                        store.loadData(res);

                                        searchDeviceName(store, txf_filterValue, ['name', 'ip']);

                                    }

                                }

                                treeObj.setSummaryData(Ext.getCmp('gpn_zen_device_list'), Ext.getCmp('tb_zen_devicelist_summary'));

                                centerContainer.setLoading(false);

                                deviceGroup.setDisabled(false);

                            }

                            );

                        }
                    },
                    setZENContextObj: function() {
                        var me = this;

                        if(me.contextObj){

                            me.contextObj.destroy();

                        }

                        var centerContainer = Ext.getCmp('ctn_zen_device_list');
                        var centerPanel     = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                        var deviceGroup     = Ext.getCmp('pnl_zen_device_tree_view');

                        me.on('zendevlistRefresh', me.refreshZENEvent);
                        me.on('devDestoryTimer', me.destroyTimerEvent);

                        Ext.apply(me, {

                            'taskObj' : {}

                        });

                        var dev_Context_Array = [

                        {
                            'name' : '장비 등록',
                            'itemId' : 'mi_xtm_add',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp('gpn_zen_device_list');

                                var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                var treeObj = Ext.getCmp('pnl_zen_device_tree_view');

                                if(devicelistObj.taskObj){

                                    clearInterval(devicelistObj.taskObj);

                                }

                                Ext.create('widget.zen_device_set', {

                                    'deviceMode'   : 'ADD'

                                }).show();

                            }

                        },
                        {
                            'name' : '장비 수정',
                            'itemId' : 'mi_xtm_mod',
                            'children' : null,
                            'callback' : function(){

                                var gridObj = Ext.getCmp('gpn_zen_device_list');

                                var selectRecord = gridObj.getSelectionModel().getSelection()[0];

                                var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                var treeObj = Ext.getCmp('pnl_zen_device_tree_view');

                                if(devicelistObj.taskObj){

                                    clearInterval(devicelistObj.taskObj);

                                }

                                request_helper.xmlrpc_call_Ajax_Post(
                                'ftSMC',
                                'getObject',
                                {
                                    'cid' : Ext.encode(selectRecord.data['@cid'])
                                },
                                function(res){

                                    if(res)
                                    {
                                        Ext.create('widget.zen_device_set', {

                                            'deviceParams' : res,
                                            'deviceMode'   : 'MOD'

                                        }).show();
                                    }
                                }
                                );

                            }

                        },
                        {
                            'name' : '장비 삭제',
                            'itemId' : 'mi_xtm_del',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp('gpn_zen_device_list');

                                var groupCid = deviceGroup.getSelectionModel().getSelection()[0].raw.cid;

                                var cidArray = [];

                                for(var i = 0; i < deviceList.getSelectionModel().getSelection().length; i++){

                                    cidArray.push(deviceList.getSelectionModel().getSelection()[i].raw['@cid']);

                                }

                                deviceCUD.deleteDevice(deviceList, cidArray, groupCid, function(){

                                    centerPanel.down('[itemId=tb_zen_device_control]').down('[itemId=bt_mod]').setDisabled(true);
                                    centerPanel.down('[itemId=tb_zen_device_control]').down('[itemId=bt_del]').setDisabled(true);

                                });

                            }

                        }

                        ];

                        var contextCallback = function(menuInstance){

                            var deviceList = Ext.getCmp('gpn_zen_device_list');

                            if(!deviceList){

                                menuInstance.down('[itemId=mi_xtm_add]').setDisabled(true);
                                menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                                menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);

                            }
                            else{

                                var selectRowSize = deviceList.getSelectionModel().getSelection().length;

                                if(selectRowSize === 1){

                                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);

                                }

                                else if(selectRowSize <= 0){

                                    menuInstance.down('[itemId=mi_xtm_add]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);

                                }

                                else{

                                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                                }

                            }

                        };

                        makeContextMenu({	'itemId' : 'mn_xtm_context', 'width' : 180, 'border' : false	}, me, contextCallback, dev_Context_Array);

                    },
                    setSMCContextObj: function() {

                        // onPnl_smc_device_centerAfterRender ==========================================================================================================================================
                        //
                        // 일시 : 2014.06.30
                        //
                        // 설명 : 공통 스토어 및 화면 로드시 필요한 스토어를 초기화 합니다.
                        //
                        // 수정 : (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
                        //
                        // =============================================================================================================================================================================

                        var component = this;

                        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                        var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);

                        component.on('devlistRefresh', component.refreshEvent);
                        component.on('devDestoryTimer', component.destroyTimerEvent);

                        Ext.apply(component, {

                            'taskObj' : {}

                        });

                        // 컨텍스트 메뉴 객체 LIST 설정 ====================================================================================================================================================

                        var dev_Context_Array = [

                        {
                            'name' : '장비 등록',
                            'itemId' : 'mi_xtm_add',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

                                if(devicelistObj.taskObj){

                                    clearInterval(devicelistObj.taskObj);

                                }

                                deviceCUD.createDevice(treeObj);

                            }

                        },
                        {
                            'name' : '장비 수정',
                            'itemId' : 'mi_xtm_mod',
                            'children' : null,
                            'callback' : function(){

                                var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var selectCid = gpn_devlist.getSelectionModel().getSelection()[0].raw['@cid'];

                                var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

                                if(devicelistObj.taskObj){

                                    clearInterval(devicelistObj.taskObj);

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

                                var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var groupCid = gpn_devlist.getSelectionModel().getSelection()[0].raw.cid;

                                for(var i = 0; i < gpn_devlist.getSelectionModel().getSelection().length; i++){

                                    cidArray.push(gpn_devlist.getSelectionModel().getSelection()[i].raw['@cid']);

                                }

                                deviceCUD.deleteDevice(gpn_devlist, cidArray, groupCid, function(){

                                    var dat_search = Ext.String.escapeRegex(centerPanel.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue());

                                    searchDeviceName(gpn_devlist.getStore(), dat_search, ['name', 'ip']);

                                    centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_mod]').setDisabled(true);
                                    centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_del]').setDisabled(true);
                                    centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_status]').setDisabled(true);
                                    centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_export]').setDisabled(true);
                                    centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_terminal]').setDisabled(true);

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

                                        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid;

                                        if(res === 'yes'){

                                            var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                            var deviceCid = gpn_devlist.getSelectionModel().getSelection()[0].raw['@cid'];

                                            devFuncModule.devCopy(deviceCid, groupCid, function(){

                                                var txf_search = centerPanel.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');
                                                var dat_search = Ext.String.escapeRegex(txf_search.getValue());

                                                searchDeviceName(gpn_devlist.getStore(), dat_search, ['name', 'ip']);

                                                centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_mod]').setDisabled(true);
                                                centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_del]').setDisabled(true);
                                                centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_status]').setDisabled(true);
                                                centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_export]').setDisabled(true);
                                                centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_terminal]').setDisabled(true);

                                            });

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

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                if(centerPanel.taskObj){

                                    clearInterval(centerPanel.taskObj);

                                }

                                var selectRecords = deviceList.getSelectionModel().getSelection();

                                var service      = 'ftSMC',
                                    serchService = 'getObjectDefault',
                                    params       = {

                                        kind : Ext.encode('obj_dev_xtm')

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
                                    applyTarget.push({	'ipsec_vpn_s_policy' : false	});
                                    applyTarget.push({	'ipsec_vpn_d_policy' : false	});

                                    res.apply_target = applyTarget;
                                    res['@groupcid'] = deviceGroup.getSelectionModel().getSelection()[0].raw.cid;

                                    Ext.create('widget.smc_device_multiset', {

                                        'applyDevice' : selectRecords,
                                        'deviceParam' : res

                                    }).show();

                                }

                                );

                            }

                        },
                        {
                            'name' : '장비 정책 전송',
                            'itemId' : 'mi_xtm_sendpolicy',
                            'children' : [
                            {
                                'name' : '선택 장비 정책 전송',
                                'itemId' : 'mi_xtm_selsendpolicy',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord  = deviceList.getSelectionModel().getSelection();

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.sendPolicy(true, selectRecord);

                                }

                            },
                            {
                                'name' : '변경 장비 정책 전송',
                                'itemId' : 'mi_xtm_modsendpolicy',
                                'children' : null,
                                'callback' : function(){

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    getSendpolicyList('modified', null, function(res){

                                        devFuncModule.sendPolicy(false, res);

                                    });

                                }

                            }

                            ]

                        },
                        {
                            'name' : '선택된 장비 파일 발급',
                            'itemId' : 'mi_xtm_exportfile',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                if(centerPanel.taskObj){

                                    clearInterval(centerPanel.taskObj);

                                }

                                var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                devFuncModule.exportFile(selectRecord);

                            }

                        },
                        {
                            'name' : '선택된 장비 상태 정보',
                            'itemId' : 'mi_xtm_showstate',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                devFuncModule.showState(selectRecord.raw['@cid'], selectRecord.raw.name);

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection();

                                    for(var i = 0; i < selectRecord.length; i++){

                                        cidArray.push(selectRecord[i].raw['@cid']);

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection();

                                    for(var i = 0; i < selectRecord.length; i++){

                                        cidArray.push(selectRecord[i].raw['@cid']);

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection();

                                    for(var i = 0; i < selectRecord.length; i++){

                                        cidArray.push(selectRecord[i].raw['@cid']);

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection();

                                    for(var i = 0; i < selectRecord.length; i++){

                                        cidArray.push(selectRecord[i].raw['@cid']);

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

                                if(centerPanel.taskObj){

                                    clearInterval(centerPanel.taskObj);

                                }

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                var cid = selectRecord.raw['@cid'];

                                devFuncModule.showLinkObject(cid, selectRecord.raw, 'widget.pnl_object_hierarchy');

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecords = deviceList.getSelectionModel().getSelection();

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

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                    var httpsUrl = 'https://' + selectRecord.raw.ip + ':' + selectRecord.raw.port_http;

                                    window.open(httpsUrl, '_blank');

                                }

                            },
                            {
                                'name' : 'IPv4 ARP Table',
                                'itemId' : 'mi_xtm_arp_v4',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.subServiceModule().arpTable(selectRecord, 'v4');

                                }

                            },
                            {
                                'name' : 'IPv6 ARP Table',
                                'itemId' : 'mi_xtm_arp_v6',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.subServiceModule().arpTable(selectRecord, 'v6');

                                }

                            },
                            {
                                'name' : 'IPv4 Routing Table',
                                'itemId' : 'mi_xtm_route_v4',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord  = deviceList.getSelectionModel().getSelection()[0];

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.subServiceModule().routingTable(selectRecord, 'v4');

                                }

                            },
                            {
                                'name' : 'IPv6 Routing Table',
                                'itemId' : 'mi_xtm_route_v6',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord  = deviceList.getSelectionModel().getSelection()[0];

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.subServiceModule().routingTable(selectRecord, 'v6');

                                }

                            },
                            {
                                'name' : 'DHCP 할당 내역',
                                'itemId' : 'mi_xtm_dhcplist',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

                                    }

                                    devFuncModule.subServiceModule().dhcpList(selectRecord);

                                }

                            },
                            {
                                'name' : '장비 업그레이드',
                                'itemId' : 'mi_xtm_upgrade',
                                'children' : null,
                                'callback' : function(){

                                    var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                    var selectRecord = deviceList.getSelectionModel().getSelection();

                                    if(centerPanel.taskObj){

                                        clearInterval(centerPanel.taskObj);

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

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var selectRecord = deviceList.getSelectionModel().getSelection()[0];

                                devFuncModule.showCid(selectRecord.raw.name, selectRecord.raw['@cid']);

                            }

                        },
                        {
                            'name' : '삭제된 장비 복원',
                            'itemId' : 'mi_xtm_restoredev',
                            'children' : null,
                            'callback' : function(){

                                var groupCid  = deviceGroup.getSelectionModel().getSelection()[0].raw.cid;

                                if(centerPanel.taskObj){

                                    clearInterval(centerPanel.taskObj);

                                }

                                devFuncModule.restoreDev(groupCid);

                            }

                        },

                        // devFuncModule.exportAccounts

                        {
                            'name' : '선택 장비 요약정보 저장',
                            'itemId' : 'mi_xtm_exportexl',
                            'children' : null,
                            'callback' : function(){

                                var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                var selectRecords = deviceList.getSelectionModel().getSelection();

                                devFuncModule.exportExcel(selectRecords);

                            }

                        },
                        {
                            'name' : '엑셀 파일로 목록 저장',
                            'itemId' : 'mi_xtm_exportdevlist',
                            'children' : null,
                            'callback' : function(){

                                var devStore = Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore();

                                if(devStore){

                                    var cidArray = [];
                                    var devCount = devStore.count();

                                    if(devCount > 0){

                                        for(var i = 0, max = devCount; i < max; i++){

                                            cidArray.push(devStore.data.items[i].raw['@cid']);

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

                        },
                        {
                            'name' : '접근 통제 정보갱신',
                            'itemId' : 'mi_xtm_account',
                            'children' : null,
                            'callback' : function(){
                                devFuncModule.exportAccounts();

                            }
                        }

                        ];

                        // 컨텍스트 메뉴 호출 전 callback 함수 설정 =========================================================================================================================================

                        var contextCallback = function(menuInstance){

                            var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                            // 장비 목록 그리드가 생성되지 않았을 경우 ===========================================================================================================================================

                            if(!deviceList){

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

                                var selectRowSize = deviceList.getSelectionModel().getSelection().length;

                                // 선택된 장비가 1개일 경우 ========================================================================================================================================================

                                if(selectRowSize === 1){

                                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_mul]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_exportfile]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);

                                    if(deviceList.getSelectionModel().getSelection()[0].get('ip').match('0.0.0.0')){

                                        menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(true);
                                        menuInstance.down('[itemId=mi_xtm_selsendpolicy]').setDisabled(true);
                                        menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                                        menuInstance.down('[itemId=mn_xtm_additionalsvc]').setDisabled(true);

                                    }
                                    else{

                                        menuInstance.down('[itemId=mn_xtm_actcontrol]').setDisabled(false);
                                        menuInstance.down('[itemId=mi_xtm_selsendpolicy]').setDisabled(false);
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
                                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_selsendpolicy]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_modsendpolicy]').setDisabled(false);
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
                                    menuInstance.down('[itemId=mi_xtm_selsendpolicy]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_modsendpolicy]').setDisabled(false);
                                    menuInstance.down('[itemId=mi_xtm_showstate]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_showcid]').setDisabled(true);
                                    menuInstance.down('[itemId=mi_xtm_linkobj]').setDisabled(true);

                                }

                            }

                        };

                        makeContextMenu({	'itemId' : 'mn_xtm_context', 'width' : 180, 'border' : false	}, component, contextCallback, dev_Context_Array);
                    },
                    is_smc: true,
                    region: 'center',
                    border: false,
                    html: '<div id="contextInstance">',
                    id: 'pnl_smc_device_center',
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            border: false,
                            itemId: 'tb_smc_device_search',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    flex: 2.5,
                                    itemId: 'rdg_smc_selelctmode',
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_device',
                                            margin: '0, 50, 0, 0',
                                            name: 'mode',
                                            boxLabel: '장비 설정',
                                            checked: true,
                                            inputValue: 'device'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_moniter',
                                            name: 'mode',
                                            boxLabel: '모니터',
                                            inputValue: 'moniter'
                                        }
                                    ],
                                    listeners: {
                                        change: {
                                            fn: me.onRdg_smc_selelctmodeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.7,
                                    itemId: 'txf_searchstr',
                                    fieldLabel: '',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: {
                                            fn: me.onTxf_searchstrKeypress,
                                            scope: me
                                        },
                                        focus: {
                                            fn: me.onTxf_searchstrFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btn_smc_device_serch',
                                    width: 100,
                                    text: '검 색',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_smc_device_serchClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            border: false,
                            hidden: true,
                            itemId: 'tb_zen_device_search',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 0.7,
                                    itemId: 'txf_searchstr',
                                    fieldLabel: '',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keypress: {
                                            fn: me.onTxf_searchstrKeypress1,
                                            scope: me
                                        },
                                        focus: {
                                            fn: me.onTxf_searchstrFocus1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btn_zen_device_serch',
                                    width: 100,
                                    text: '검 색',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_smc_device_serchClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            itemId: 'tb_smc_device_control',
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_add',
                                    width: 100,
                                    text: '장비 추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_addClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_mod',
                                    width: 100,
                                    text: '장비 수정',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_modClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_del',
                                    width: 100,
                                    text: '장비 삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_delClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_status',
                                    width: 100,
                                    text: '장비 상태',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_statusClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_export',
                                    width: 100,
                                    text: '파일 발급',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_exportClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'splitbutton',
                                    handler: function(button, e) {
                                        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

                                        var selectRecord = gridObj.getSelectionModel().getSelection();

                                        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                                        if(selectRecord.length <= 0){

                                            Ext.Msg.show({

                                                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                                                msg : '선택된 장비가 없습니다. 정책전송을 수행할 수 없습니다.',
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR

                                            });

                                            return false;

                                        }

                                        if(devicelistObj.taskObj){

                                            clearInterval(devicelistObj.taskObj);

                                        }

                                        devFuncModule.sendPolicy(true, selectRecord);
                                    },
                                    itemId: 'bt_policy',
                                    width: 100,
                                    text: '정책 전송',
                                    menu: {
                                        xtype: 'menu',
                                        border: false,
                                        itemId: 'mu_dev_sendpolicy',
                                        width: 180,
                                        items: [
                                            {
                                                xtype: 'menuitem',
                                                itemId: 'mi_dev_selsendpolicy',
                                                text: '선택 장비 정책 전송',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMi_dev_selsendpolicyClick,
                                                        scope: me
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'menuitem',
                                                itemId: 'mi_dev_modsendpolicy',
                                                text: '변경 장비 정책 전송',
                                                listeners: {
                                                    click: {
                                                        fn: me.onMi_dev_modsendpolicyClick,
                                                        scope: me
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_terminal',
                                    width: 100,
                                    text: '터미널 실행',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_terminalClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_period',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            validator: function(value) {
                                                // Device Refresh Period Validator =============================================================================================================================================
                                                //
                                                // 일시 : 2014.11.15
                                                //
                                                // 설명 : 타이머의 주기가 0 ~ 600 범위 내에 설정이 되어있지 않다면 저장을 취소합니다.
                                                //
                                                // =============================================================================================================================================================================

                                                if(value < 0 || value > 600){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            validityCheck: function() {
                                                // validityCheck ==============================================================================================================================================================
                                                //
                                                // 일시 : 2014.11.15
                                                //
                                                // 설명 :
                                                //
                                                // ============================================================================================================================================================================

                                                var that = this;

                                                var validateObject = {

                                                    'blankCheck' : function(){

                                                        var argument = (arguments[1] === undefined) ? true : arguments[1];

                                                        if(that.getValue() === null && argument){

                                                            Ext.Msg.show({

                                                                'title': 'WeGuardia™ SMC 2.0',
                                                                'msg'  : '업데이트 주기는 비울 수 없습니다.',
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    that.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    },
                                                    'scaleValidate' : function(msg){

                                                        var argument = (arguments[2] === undefined) ? true : arguments[2];

                                                        if(!that.validate() && argument){

                                                            Ext.Msg.show({

                                                                'title': 'WeGuardia™ SMC 2.0',
                                                                'msg'  : msg,
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    that.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    }

                                                };

                                                return validateObject;
                                            },
                                            itemId: 'cmb_period',
                                            margin: '0, 8, 0, 0',
                                            width: 205,
                                            fieldLabel: '업데이트 주기 (초)',
                                            labelWidth: 120,
                                            value: 10,
                                            store: [
                                                0,
                                                5,
                                                10,
                                                30,
                                                60,
                                                120,
                                                180,
                                                240,
                                                300,
                                                360,
                                                420,
                                                480,
                                                540,
                                                600
                                            ],
                                            listeners: {
                                                focus: {
                                                    fn: me.onCmb_periodFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_change',
                                            width: 100,
                                            text: '주기 변경',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_changeClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onTb_smc_device_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            hidden: true,
                            itemId: 'tb_zen_device_control',
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_add',
                                    width: 100,
                                    text: '장비 추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_addClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_mod',
                                    width: 100,
                                    text: '장비 수정',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_modClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'bt_del',
                                    width: 100,
                                    text: '장비 삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_delClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_zen_period',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            validator: function(value) {

                                                if(value < 0 || value > 600){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            validityCheck: function() {

                                                var that = this;

                                                var validateObject = {

                                                    'blankCheck' : function(){

                                                        var argument = (arguments[1] === undefined) ? true : arguments[1];

                                                        if(that.getValue() === null && argument){

                                                            Ext.Msg.show({

                                                                'title': 'WeGuardia™ SMC 2.0',
                                                                'msg'  : '업데이트 주기는 비울 수 없습니다.',
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    that.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    },
                                                    'scaleValidate' : function(msg){

                                                        var argument = (arguments[2] === undefined) ? true : arguments[2];

                                                        if(!that.validate() && argument){

                                                            Ext.Msg.show({

                                                                'title': 'WeGuardia™ SMC 2.0',
                                                                'msg'  : msg,
                                                                'buttons' : Ext.Msg.OK,
                                                                'icon' : Ext.Msg.ERROR,
                                                                'fn'   : function(res){

                                                                    that.focus();

                                                                }

                                                            });

                                                            return false;

                                                        }

                                                        return true;

                                                    }

                                                };

                                                return validateObject;
                                            },
                                            itemId: 'cmb_period',
                                            margin: '0, 8, 0, 0',
                                            width: 205,
                                            fieldLabel: '업데이트 주기 (초)',
                                            labelWidth: 120,
                                            value: 10,
                                            store: [
                                                0,
                                                5,
                                                10,
                                                30,
                                                60,
                                                120,
                                                180,
                                                240,
                                                300,
                                                360,
                                                420,
                                                480,
                                                540,
                                                600
                                            ],
                                            listeners: {
                                                focus: {
                                                    fn: me.onCmb_periodFocus1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_change',
                                            width: 100,
                                            text: '주기 변경',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_changeClick1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            oldView: null,
                            flex: 1,
                            id: 'ctn_smc_device_list',
                            layout: 'fit'
                        },
                        {
                            xtype: 'container',
                            oldView: null,
                            flex: 1,
                            hidden: true,
                            id: 'ctn_zen_device_list',
                            layout: 'fit'
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onPnl_smc_device_centerAfterRender,
                            scope: me
                        },
                        beforedestroy: {
                            fn: me.onPnl_smc_device_centerBeforeDestroy,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_smc_device_viewBoxReady: function(component, width, height, eOpts) {
        // onPnl_smc_device_viewBoxReady ==============================================================================================================================================
        //
        // 일시 : 2014.09.24
        //
        // 설명 : ddGroup Target을 설정합니다. ddGroup Target은 그리드와 트리와의 드래그 기능을 정의합니다.
        //
        // 수정 :
        //
        // (2014.11.15 김민수 - 장비 목록을 갱신하는 타이머 주기를 서비스에서 받아서 설정하도록 설정)
        //
        // ============================================================================================================================================================================

        var me = this;

        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

        me.groupTreeDropTarget = new Ext.dd.DropTarget(deviceGroup.body.dom ,{

            'ddGroup' : 'dragDevice',
            'notifyEnter': function(ddSource, e, data) {

                deviceGroup.isDD = true;

                deviceGroup.on('itemmouseup', deviceGroup.onTreeNodeMouseUp, deviceGroup);

            },
            'notifyDrop': function(ddSource, e, data) {

                return true;

            }

        });

        // 갱신 주기를 Load 합니다 =======================================================================================================================================================
        //
        // 설명 : 최초 로드시 갱신주기의 값은 null 입니다. 이 때 기본값인 10초로 값이 초기화 됩니다.
        //
        // ============================================================================================================================================================================

        var serviceName = 'ftSMC';
        var rpcFunc = 'getSMCSetting';
        var params = {

            'key' : Ext.encode('ui/dev/refresh_time')

        };

        request_helper.xmlrpc_call_Ajax_Post(
            serviceName,
            rpcFunc,
            params,
            function(res){

                var devicePeriod = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_control]').down('[itemId=ctn_smc_period]').down('[itemId=cmb_period]');

                // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다. ==========================================================================================================================

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

        // (2015.06.02 송영근 - ZEN용 목록 추가)

        var isZen = Ext.getCmp('vp_SMC_mainView').is_smc4zen;

        var zenGroup = Ext.getCmp('pnl_zen_device_tree_view');

        if(isZen)
        {
            zenGroup.setTreeNode();

            me.zengroupTreeDropTarget = new Ext.dd.DropTarget(zenGroup.body.dom ,{

                'ddGroup' : 'dragDevice',
                'notifyEnter': function(ddSource, e, data) {

                    zenGroup.isDD = true;

                    zenGroup.on('itemmouseup', zenGroup.onTreeNodeMouseUp, zenGroup);

                },
                'notifyDrop': function(ddSource, e, data) {

                    return true;

                }

            });

            request_helper.xmlrpc_call_Ajax_Post(
                serviceName,
                rpcFunc,
                params,
                function(res){

                    var zendevicePeriod = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_zen_device_control]').down('[itemId=ctn_zen_period]').down('[itemId=cmb_period]');

                    // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다. ==========================================================================================================================

                    if(!res){

                        zendevicePeriod.setValue(10);
                    }
                    else{

                        zendevicePeriod.setValue(res);
                    }

                }

            );

            deviceGroup.is_smc = false;

        }else{

            deviceGroup.is_smc = true;
            deviceGroup.tools['collapse-top'].hide();
            zenGroup.hide();
        }
    },

    /*
        일시 : 2015.01.17

        설명 : 트리 아이템을 클릭 했을 때의 기능을 정의합니다. 트리 아이템을 클릭하면 그룹 설정 버튼과 장비 추가 버튼이 활성화 되고, 출력 모드에 따라서 장비 목록 그리드 및 모니터 목록 그리드가 생성됩니다.

        수정 :

        - (2015.01.17 김민수 : )
    */
    onPnl_smc_device_tree_viewSelect: function(rowmodel, record, index, eOpts) {
        // 공통변수 정의

        var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var controlToolbar = deviceControl.down('[itemId=tb_smc_device_control]');
        var deviceGroup    = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var deviceViewMode = deviceControl.down('[itemId=tb_smc_device_search]').down('[itemId=rdg_smc_selelctmode]').getValue().mode;
        var westObj = Ext.getCmp(DEVICE_COMMON_ID.devicewest);

        // 장비그룹 컨트롤 컴포넌트 활성화 해제

        Ext.getCmp('tb_smc_device_groupctrl').setDisabled(false);

        // 장비 컨트롤 메뉴 활성화.

        controlToolbar.down('[itemId=bt_add]').setDisabled(false);
        controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
        controlToolbar.down('[itemId=bt_del]').setDisabled(true);
        controlToolbar.down('[itemId=bt_status]').setDisabled(true);
        controlToolbar.down('[itemId=bt_export]').setDisabled(true);
        controlToolbar.down('[itemId=bt_policy]').down('[itemId=mu_dev_sendpolicy]').down('[itemId=mi_dev_selsendpolicy]').disable();
        controlToolbar.down('[itemId=bt_terminal]').setDisabled(true);

        // 컨텍스트메뉴를 저장할 객체

        Ext.applyIf(westObj, {

            'contextObj' : null,
            '_dynamicGrid' : null

        });

        if(deviceViewMode === 'device'){

            deviceGroup.createDeviceListView(westObj, record);

        }
        else{

            deviceGroup.createMoniterListView(westObj, record);

        }
    },

    onPnl_smc_device_tree_viewAfterRender: function(component, eOpts) {
        // onPnl_smc_device_tree_viewAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.09.14
        //
        // 설명 : WEST 트리 패널이 생성된 후 플러그인의 이벤트를 설정합니다. 트리의 select / deselect 이벤트로 장비의 리스트를 출력하는 그리드를 생성 / 소멸 합니다.
        //
        // ==============================================================================================================================================================================

        // 그룹 -> 그룹 이동 설정

        component.down('[itemId=trv_smc_device_view]').on('drop', function(node, data, overModel, dropPosition, eOpts){

            component.deviceGroupToGroup(component, overModel.raw.cid, data.records[0].raw.cid);

        });

        // 트리 컴포넌트를 초기화합니다.

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

        // 장비 그룹 추가

                component.initExpandNode(res.children);
                component.setRootNode(res);

        // 장비 그룹 첫 번째 노드 선택

                component.getSelectionModel().select(0);

            }

        );
    },

    onPnl_smc_device_tree_viewDeselect: function(rowmodel, record, index, eOpts) {
        // onPnl_smc_device_tree_viewDeselect =========================================================================================================================================
        //
        // 일시 : 2015.01.18
        //
        // 설명 : 장비그룹의 선택이나 포커스가 해제되었을경우 컴포넌트를 비활성화하고 갱신 타이머를 clear 합니다.
        //
        // 수정 :
        //
        // ============================================================================================================================================================================

        // 그룹 컨트롤 툴바 비활성화

        Ext.getCmp('tb_smc_device_groupctrl').setDisabled(true);

        // 공통 변수 정의

        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);

        // 장비 추가 버튼 비활성화

        centerPanel.down('[itemId=tb_smc_device_control]').down('[itemId=bt_add]').setDisabled(true);

        // 타이머 객체가 존재하면 타이머 해제

        if(centerPanel.taskObj){

            clearInterval(centerPanel.taskObj);

        }
    },

    onPnl_smc_device_tree_viewExpand: function(p, eOpts) {
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_smc_device_search]').show();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_zen_device_search]').hide();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_smc_device_control]').show();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_zen_device_control]').hide();
        Ext.getCmp('tb_smc_device_groupctrl').show();
        Ext.getCmp('tb_zen_device_groupctrl').hide();
        Ext.getCmp('ctn_smc_device_list').show();
        Ext.getCmp('ctn_zen_device_list').hide();

        if(Ext.getCmp(DEVICE_COMMON_ID.devicecenter).taskObj){

            clearInterval(Ext.getCmp(DEVICE_COMMON_ID.devicecenter).taskObj);

        }

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).setSMCContextObj();

        var deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var deviceViewMode = deviceControl.down('[itemId=tb_smc_device_search]').down('[itemId=rdg_smc_selelctmode]').getValue().mode;
        var westObj = Ext.getCmp(DEVICE_COMMON_ID.devicewest);
        var record = deviceGroup.getSelectionModel().getSelection()[0];

        if(typeof record !== 'undefined'){

            if(deviceViewMode === 'device'){

                deviceGroup.createDeviceListView(westObj, record);

            }
            else{

                deviceGroup.createMoniterListView(westObj, record);

            }
        }
        else{

            deviceGroup.getSelectionModel().select(0);
        }

    },

    onPnl_smc_device_tree_viewBeforeCollapse: function(p, direction, animate, eOpts) {
        if(p.is_smc){
            return false;
        }
    },

    /*
        일시 : 2015.01.17

        설명 : 트리 아이템을 클릭 했을 때의 기능을 정의합니다. 트리 아이템을 클릭하면 그룹 설정 버튼과 장비 추가 버튼이 활성화 되고, 출력 모드에 따라서 장비 목록 그리드 및 모니터 목록 그리드가 생성됩니다.

        수정 :

        - (2015.01.17 김민수 : )
    */
    onPnl_zen_device_tree_viewSelect: function(rowmodel, record, index, eOpts) {
        var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var controlToolbar = deviceControl.down('[itemId=tb_zen_device_control]');
        var deviceGroup    = Ext.getCmp('pnl_zen_device_tree_view');
        var westObj = Ext.getCmp('pnl_smc_device_view_west');

        Ext.getCmp('tb_zen_device_groupctrl').setDisabled(false);

        controlToolbar.down('[itemId=bt_add]').setDisabled(false);
        controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
        controlToolbar.down('[itemId=bt_del]').setDisabled(true);


        Ext.applyIf(westObj, {

            'contextObj' : null,
            '_dynamicGrid' : null

        });

        deviceGroup.createDeviceZENListView(westObj, record);
    },

    onPnl_zen_device_tree_viewDeselect: function(rowmodel, record, index, eOpts) {
        Ext.getCmp('tb_zen_device_groupctrl').setDisabled(true);

        var centerPanel     = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var centerContainer = Ext.getCmp('ctn_zen_device_list');


        centerPanel.down('[itemId=tb_zen_device_control]').down('[itemId=bt_add]').setDisabled(true);


        if(centerPanel.taskObj){

            clearInterval(centerPanel.taskObj);

        }
    },

    onPnl_zen_device_tree_viewExpand: function(p, eOpts) {
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_smc_device_search]').hide();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_zen_device_search]').show();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_smc_device_control]').hide();
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('toolbar[itemId=tb_zen_device_control]').show();
        Ext.getCmp('tb_smc_device_groupctrl').hide();
        Ext.getCmp('tb_zen_device_groupctrl').show();
        Ext.getCmp('ctn_smc_device_list').hide();
        Ext.getCmp('ctn_zen_device_list').show();

        if(Ext.getCmp(DEVICE_COMMON_ID.devicecenter).taskObj){

            clearInterval(Ext.getCmp(DEVICE_COMMON_ID.devicecenter).taskObj);

        }


        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).setZENContextObj();

        var deviceGroup    = Ext.getCmp('pnl_zen_device_tree_view');
        var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var westObj = Ext.getCmp('pnl_smc_device_view_west');

        if(typeof deviceGroup.getSelectionModel().getSelection()[0] !== 'undefined'){

            deviceGroup.createDeviceZENListView(westObj, deviceGroup.getSelectionModel().getSelection()[0]);
        }
        else{

            deviceGroup.getSelectionModel().select(0);
        }
    },

    onPnl_smc_device_view_westAfterRender: function(component, eOpts) {
        // onPnl_smc_device_view_westAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.08.25
        //
        // 설명 : showTerminal 이벤트를 생성합니다. 터미널 실행 버튼이나 컨텍스트 메뉴로 웹-터미널 실행시 이벤트가 발생됩니다.
        //
        // ==============================================================================================================================================================================

        // 테스트 문자열

        component.on('showTerminal', devFuncModule.showTerminal);
    },

    onToolbarAfterRender: function(component, eOpts) {
        // onToolbarAfterRender ========================================================================================================================================================
        //
        // 일시 : 2014.09.15
        //
        // 설명 : 장비 그룹을 컨트롤할 버튼들에 대한 설정을 정의합니다.
        //
        // 수정 :
        //
        // - (2015.01.06 김민수 : )
        //
        // ============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');
        var bt_search = component.down('[itemId=bt_search]');
        var bt_showall = component.down('[itemId=bt_showall]');
        var bt_open   = component.down('[itemId=bt_open]');
        var bt_close  = component.down('[itemId=bt_close]');
        var bt_refresh = component.down('[itemId=bt_refresh]');

        // CSS 설정

        bt_add.setSize({	'width':24, 'height':24		});
        bt_mod.setSize({	'width':24, 'height':24		});
        bt_del.setSize({	'width':24, 'height':24		});
        bt_search.setSize({	'width':24, 'height':24		});
        bt_showall.setSize({'width':24, 'height':24		});
        bt_open.setSize({	'width':24, 'height':24		});
        bt_close.setSize({	'width':24, 'height':24		});
        bt_refresh.setSize({'width':24,	'height':24		});

        bt_add.el.addCls('common_plus_enable');
        bt_mod.el.addCls('common_modify_enable');
        bt_del.el.addCls('common_delete_enable');
        bt_search.el.addCls('common_search_enable');
        bt_showall.el.addCls('common_rule_send');
        bt_open.el.addCls('common_folder_open');
        bt_close.el.addCls('common_folder_close');
        bt_refresh.el.addCls('common_refresh_enable');

        // 트리 객체 클로저

        var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

        bt_add.on('click', function(){

            var groupParams   = null;
            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection)	{

                groupParams = treeSelection.raw.cid;

            }
            else{

                groupParams = treeObj.getRootNode().raw.cid;

            }

            if(groupParams){

                Ext.create('widget.smc_group_set', {

                    mode : 'ADD',
                    wndTitle : '그룹 추가',
                    groupParams : groupParams

                }).show();

                return true;
            }
            else{

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '기본 정보가 없습니다. 관리자에게 문의하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

        });

        bt_mod.on('click', function(){

            var groupParams = null;
            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(!treeSelection){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '수정할 그룹을 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

            groupParams = treeSelection.raw.cid;

            if(groupParams){

                Ext.create('widget.smc_group_set', {

                    mode : 'MOD',
                    wndTitle : '그룹 수정',
                    groupParams : groupParams

                }).show();

                return true;

            }
            else{

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '기본 정보가 없습니다. 관리자에게 문의하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

        });

        bt_del.on('click', function(){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(!treeSelection){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '삭제할 그룹을 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '선택된 그룹을 삭제하시겠습니까?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.Msg.QUESTION,
                fn : function(res){

                    if(res === 'yes'){

                        // 2015.01.05 추가 ==============================================================================================================================================================
                        //
                        // 설명 : 삭제 후 선택된 Raw 정보가 지속적으로 남아있는 버그를 발견하였습니다. 삭제시 타이머는 중지하도록 변경하였습니다.
                        //
                        // =============================================================================================================================================================================

                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                        if(centerPanel.taskObj){

                            clearInterval(centerPanel.taskObj);

                        }

                        // =============================================================================================================================================================================

                        try{

                            var serviceName = 'ftSMC',
                                rpcFunc = 'delGroup',
                                params = {

                                    cid : Ext.encode(treeSelection.raw.cid)

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

                                    var treeComponent = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

                                    treeReload(treeComponent, serviceName, rpcFunc, params);

                                }

                            );

                        }
                        catch(err){

                            Ext.Msg.show(
                                {
                                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                                    msg : '다음과 같은 에러가 발생하였습니다.<br><br>?' + err,
                                    buttons : Ext.Msg.YESNO,
                                    icon : Ext.Msg.QUESTION

                                });

                        }

                    }

                }

            });

        });

        bt_search.on('click', function(){

            var searchObj = SMC_VIEW.make_find_treenode_window('그룹 검색', treeObj);

            searchObj.show();

        });

        // 2015.01.20 김민수 - bt_showall click 이벤트 추가

        bt_showall.on('click', function(){

            // 공통변수 정의

            var westObj        = Ext.getCmp(DEVICE_COMMON_ID.devicewest);
            var deviceGroup    = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
            var record         = deviceGroup.getSelectionModel().getSelection()[0];
            var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
            var controlToolbar = deviceControl.down('[itemId=tb_smc_device_control]');
            var deviceViewMode = deviceControl.down('[itemId=tb_smc_device_search]').down('[itemId=rdg_smc_selelctmode]').getValue().mode;

            // 장비그룹 컨트롤 컴포넌트 활성화 해제

            Ext.getCmp('tb_smc_device_groupctrl').setDisabled(false);

            // 장비 컨트롤 메뉴 활성화.

            controlToolbar.down('[itemId=bt_add]').setDisabled(false);
            controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
            controlToolbar.down('[itemId=bt_del]').setDisabled(true);
            controlToolbar.down('[itemId=bt_export]').setDisabled(true);
            controlToolbar.down('[itemId=bt_terminal]').setDisabled(true);

            if(deviceViewMode === 'device'){

                deviceGroup.createDeviceListView(westObj, record);

            }
            else{

                deviceGroup.createMoniterListView(westObj, record);

            }

        });

        // 2015.01.19 김민수 - 토클버튼 클릭시 CSS 스타일이 변경되도록 변경

        bt_showall.on('toggle', function(button, pressed, e){

            if(pressed){

                dev_recursive = true;

                button.removeCls('common_rule_send');
                button.addCls('common_rule_pressed');

            }
            else{

                dev_recursive = false;

                button.removeCls('common_rule_pressed');
                button.addCls('common_rule_send');

            }

        });

        // 2015.06.17 토글버튼 초기화

        if(dev_recursive){

            bt_showall.toggle();

        }

        // 그룹 클릭 클로저

        treeObj.group_click_count = 0;

        bt_open.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection){

                group_open(treeObj, treeSelection);

            }

        });

        bt_close.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection){

                group_close(treeObj, treeSelection);

            }
        });

        // refresh 버튼 추가 20150918
        bt_refresh.on('click', function(){


            // 트리 컴포넌트를 초기화합니다.

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

                    // 장비 그룹 추가

                    treeObj.initExpandNode(res.children);
                    treeObj.setRootNode(res);

                    // 장비 그룹 첫 번째 노드 선택

                    treeObj.getSelectionModel().select(0);

                }

            );
        });
    },

    onToolbarAfterRender1: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');
        var bt_search = component.down('[itemId=bt_search]');
        var bt_showall = component.down('[itemId=bt_showall]');
        var bt_open   = component.down('[itemId=bt_open]');
        var bt_close  = component.down('[itemId=bt_close]');

        bt_add.setSize({	'width':24, 'height':24		});
        bt_mod.setSize({	'width':24, 'height':24		});
        bt_del.setSize({	'width':24, 'height':24		});
        bt_search.setSize({	'width':24, 'height':24		});
        bt_showall.setSize({'width':24, 'height':24		});
        bt_open.setSize({	'width':24, 'height':24		});
        bt_close.setSize({	'width':24, 'height':24		});

        bt_add.el.addCls('common_plus_enable');
        bt_mod.el.addCls('common_modify_enable');
        bt_del.el.addCls('common_delete_enable');
        bt_search.el.addCls('common_search_enable');
        bt_showall.el.addCls('common_rule_send');
        bt_open.el.addCls('common_folder_open');
        bt_close.el.addCls('common_folder_close');

        var treeObj = Ext.getCmp('pnl_zen_device_tree_view');

        bt_add.on('click', function(){

            var groupParams   = null;
            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection)	{

                groupParams = treeSelection.raw.cid;

            }
            else{

                groupParams = treeObj.getRootNode().raw.cid;

            }

            if(groupParams){

                Ext.create('widget.zen_group_set', {

                    mode : 'ADD',
                    wndTitle : '그룹 추가',
                    groupParams : groupParams

                }).show();

                return true;
            }
            else{

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '기본 정보가 없습니다. 관리자에게 문의하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

        });

        bt_mod.on('click', function(){

            var groupParams   = null;
            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection)	{

                groupParams = treeSelection.raw.cid;

            }
            else{

                groupParams = treeObj.getRootNode().raw.cid;

            }

            if(groupParams){

                Ext.create('widget.zen_group_set', {

                    mode : 'MOD',
                    wndTitle : '그룹 수정',
                    groupParams : groupParams

                }).show();

                return true;

            }
            else{

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '기본 정보가 없습니다. 관리자에게 문의하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

        });

        bt_del.on('click', function(){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : '선택된 그룹을 삭제하시겠습니까?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.Msg.QUESTION,
                fn : function(res){

                    if(res === 'yes'){

                        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                        if(centerPanel.taskObj){

                            clearInterval(centerPanel.taskObj);

                        }

                        try{

                            var serviceName = 'ftSMC',
                                rpcFunc = 'delGroup',
                                params = {

                                    cid : Ext.encode(treeSelection.raw.cid)

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                                serviceName,
                                rpcFunc,
                                params,
                                function(res){

                                    var serviceName = 'ftSMC',
                                        rpcFunc = 'getGroup',
                                        params = {

                                            gtype : Ext.encode('obj_zen')

                                        };

                                    var treeComponent = Ext.getCmp('pnl_zen_device_tree_view');

                                    treeReload(treeComponent, serviceName, rpcFunc, params);

                                }

                            );

                        }
                        catch(err){

                            Ext.Msg.show(
                                {
                                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                                    msg : '다음과 같은 에러가 발생하였습니다.<br><br>?' + err,
                                    buttons : Ext.Msg.YESNO,
                                    icon : Ext.Msg.QUESTION

                                });

                        }

                    }

                }

            });

        });

        bt_search.on('click', function(){

            var searchObj = SMC_VIEW.make_find_treenode_window('그룹 검색', treeObj);

            searchObj.show();

        });


        bt_showall.on('click', function(){

            var westObj        = Ext.getCmp('pnl_smc_device_view_west');
            var deviceGroup    = Ext.getCmp('pnl_zen_device_tree_view');
            var record         = deviceGroup.getSelectionModel().getSelection()[0];
            var deviceControl  = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
            var controlToolbar = deviceControl.down('[itemId=tb_zen_device_control]');

            Ext.getCmp('tb_zen_device_groupctrl').setDisabled(false);

            controlToolbar.down('[itemId=bt_add]').setDisabled(false);
            controlToolbar.down('[itemId=bt_mod]').setDisabled(true);
            controlToolbar.down('[itemId=bt_del]').setDisabled(true);

            deviceGroup.createDeviceZENListView(westObj, record);

        });

        bt_showall.on('toggle', function(button, pressed, e){

            if(pressed){

                button.removeCls('common_rule_send');
                button.addCls('common_rule_pressed');

            }
            else{

                button.removeCls('common_rule_pressed');
                button.addCls('common_rule_send');

            }

        });

        // 그룹 클릭 클로저

        treeObj.group_click_count = 0;

        bt_open.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection){

                group_open(treeObj, treeSelection);

            }

        });

        bt_close.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection){

                group_close(treeObj, treeSelection);

            }
        });
    },

    onRdg_smc_selelctmodeChange: function(field, newValue, oldValue, eOpts) {
        // onRdg_smc_selelctmodeChange =================================================================================================================================================
        //
        // 일시 : 2014.09.21
        //
        // 설명 : 라디오 버튼을 클릭하면 기존 Center에 있던 item 이 삭제됩니다.
        //
        // 수정 :
        //
        // (2014.09.24 김민수 - 그리드 생성 후 장비명 검색창에 인자값이 있으면 검색된 결과가 스토어에 자동으로 반영되도록 수정)
        //
        // =============================================================================================================================================================================

        var centerPanel      = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var centerContainer  = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);
        var deviceGroupPanel = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var westTreePanel    = Ext.getCmp(DEVICE_COMMON_ID.devicewest);

        // 모드 변경시 장비 리스트 갱신 타이머 종료 ==========================================================================================================================================

        if(centerPanel.taskObj){

            clearInterval(centerPanel.taskObj);

        }

        // 기존에 추가된 view 를 제거합니다. ===============================================================================================================================================

        if(centerContainer.oldView){

            centerContainer.oldView.destroy();

            centerContainer.oldView = null;

        }

        // 장비, 모니터에 맞는 UI 설정 및 그리드 셋팅 ========================================================================================================================================

        var groupSelectRecord = deviceGroupPanel.getSelectionModel().getSelection()[0];

        if(newValue.mode === 'device'){

            // 장비 컨트롤 툴바 보이기 =========================================================================================================================================================

            centerPanel.down('[itemId=tb_smc_device_control]').setVisible(true);

            // 선택된 장비 그룹이 있다면 자동으로 그리드 생성 =====================================================================================================================================

            if(groupSelectRecord){

                deviceGroupPanel.createDeviceListView(westTreePanel, groupSelectRecord);

            }

        }
        else{

            // 장비 툴바 숨기기 ===============================================================================================================================================================

            centerPanel.down('[itemId=tb_smc_device_control]').setVisible(false);

            // 선택된 장비 그룹이 있다면 자동으로 그리드 생성 =====================================================================================================================================

            if(groupSelectRecord){

                deviceGroupPanel.createMoniterListView(westTreePanel, groupSelectRecord);

            }

        }
    },

    onTxf_searchstrKeypress: function(textfield, e, eOpts) {
        // keypress ===================================================================================================================================================================
        //
        // 일시 : 2014.05.10
        //
        // 설명 : 장비를 검색합니다.
        //
        // 수정 :
        //
        // - (2014.8.14 김민수) 동적 컬럼 설정으로 인해 store 가 변경되어 동작하지 않아 스토어를 그리드 객체에서 가져오는 형태로 변경.
        //
        // ============================================================================================================================================================================

        if(e.getKey() === e.ENTER){

            var bt_search = textfield.up().down('[itemId=btn_smc_device_serch]');

            bt_search.fireEvent('click', bt_search);

        }
    },

    onTxf_searchstrFocus: function(component, e, eOpts) {
        // onTxf_searchstrFocus ========================================================================================================================================================
        //
        // 일시 : 2014.11.15
        //
        // 설명 : 검색창에 포커스가 설정되면 장비 목록을 나타내는 그리드의 Row 선택을 모두 해제합니다.
        //
        // =============================================================================================================================================================================

        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var rtmDeviceList = Ext.getCmp(RTM_COMMON_ID.devicelist);

        if(!deviceList){

            return;

        }
        else{

            deviceList.getSelectionModel().deselectAll();

        }

        if(!rtmDeviceList){

            return;

        }
        else{

            rtmDeviceList.getSelectionModel().deselectAll();

        }
    },

    onBtn_smc_device_serchClick: function(button, e, eOpts) {
        // onBtn_smc_device_serchClick ===============================================================================================================================================================
        //
        // 일시 : 2014.05.10
        //
        // 설명 : 장비를 검색합니다.
        //
        // 수정 :
        //
        // - (김민수 2014.8.14) 동적 컬럼 설정으로 인해 store 가 변경되어 동작하지 않아 스토어를 그리드 객체에서 가져오는 형태로 변경.
        //
        // ===========================================================================================================================================================================================

        var textField = button.up().down('[itemId=txf_searchstr]');

        var escapeText = Ext.String.escapeRegex(textField.getValue());
        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(centerPanel.down('[itemId=tb_smc_device_search]').down('[itemId=rdg_smc_selelctmode]').getValue().mode === 'device'){

            if(Ext.getCmp(DEVICE_COMMON_ID.devicelist)){

                var store = Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore();

                if(store){

                    searchDeviceName(store, escapeText, ['name', 'ip']);

                }

            }

        }
        else{

            if(Ext.getCmp(RTM_COMMON_ID.devicelist)){

                var store = Ext.getCmp(RTM_COMMON_ID.devicelist).getStore();

                if(store){

                    searchDeviceName(store, escapeText, ['name', 'gate_ip']);

                }

            }

        }
    },

    onTxf_searchstrKeypress1: function(textfield, e, eOpts) {

        if(e.getKey() === e.ENTER){

            var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

            if(Ext.getCmp('gpn_zen_device_list')){

                var store = Ext.getCmp('gpn_zen_device_list').getStore();

                if(store){

                    searchDeviceName(store, textfield.getValue(), ['name', 'ip']);

                }

            }

        }
    },

    onTxf_searchstrFocus1: function(component, e, eOpts) {

        var deviceList = Ext.getCmp('gpn_zen_device_list');

        if(!deviceList){

            return;

        }
        else{

            deviceList.getSelectionModel().deselectAll();

        }

    },

    onBtn_smc_device_serchClick1: function(button, e, eOpts) {

        var textField = button.up().down('[itemId=txf_searchstr]');

        var escapeText = Ext.String.escapeRegex(textField.getValue());

        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(Ext.getCmp('gpn_zen_device_list')){

            var store = Ext.getCmp('gpn_zen_device_list').getStore();

            if(store){

                searchDeviceName(store, escapeText, ['name', 'ip']);
            }

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 장비를 추가하는 기능을 가진 버튼의 핸들러를 설정합니다.
        //
        // 수정 : (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
        //
        // ==============================================================================================================================================================================

        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        var treeObj       = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        deviceCUD.createDevice(treeObj);
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 장비를 수정하는 기능을 가진 버튼의 핸들러를 설정합니다.
        //
        // 수정 : (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
        //
        // ==============================================================================================================================================================================

        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecord  = gridObj.getSelectionModel().getSelection()[0];

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        var treeObj       = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        deviceCUD.updateDevice(selectRecord.raw['@cid'], selectRecord.raw.ip, selectRecord.raw.spd_state, selectRecord.raw.eth_count);
    },

    onBt_delClick: function(button, e, eOpts) {
        // onBt_delClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 장비를 삭제하는 기능을 가진 버튼의 핸들러를 설정합니다.
        //
        // 수정 :
        // (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
        // (김민수 2014.09.12 - 다중 삭제 기능 지원으로 인한 UI 코드 변경)
        //
        // ==============================================================================================================================================================================

        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid;

        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var cidArray = [];

        for(var i = 0; i < gpn_devlist.getSelectionModel().getSelection().length; i++){

            cidArray.push(gpn_devlist.getSelectionModel().getSelection()[i].raw['@cid']);

        }

        deviceCUD.deleteDevice(gpn_devlist, cidArray, groupCid, function(){

            var pnl_center = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
            var txf_search = pnl_center.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');

            var dat_search = Ext.String.escapeRegex(txf_search.getValue());

            searchDeviceName(gpn_devlist.getStore(), dat_search, ['name', 'ip']);

            pnl_center.down('[itemId=tb_smc_device_control]').down('[itemId=bt_mod]').setDisabled(true);
            pnl_center.down('[itemId=tb_smc_device_control]').down('[itemId=bt_del]').setDisabled(true);
            pnl_center.down('[itemId=tb_smc_device_control]').down('[itemId=bt_status]').setDisabled(true);
            pnl_center.down('[itemId=tb_smc_device_control]').down('[itemId=bt_export]').setDisabled(true);
            pnl_center.down('[itemId=tb_smc_device_control]').down('[itemId=bt_terminal]').setDisabled(true);

        });
    },

    onBt_statusClick: function(button, e, eOpts) {
        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecord = deviceList.getSelectionModel().getSelection()[0];

        devFuncModule.showState(selectRecord.raw['@cid'], selectRecord.raw.name);
    },

    onBt_exportClick: function(button, e, eOpts) {
        // onBt_exportClick =============================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 장비의 초기파일을 발급하는 기능을 가진 버튼의 핸들러를 설정합니다.
        //
        // 수정 : (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
        //
        // ==============================================================================================================================================================================

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        var gridObj       = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecord  = gridObj.getSelectionModel().getSelection()[0];

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        devFuncModule.exportFile(selectRecord);
    },

    onMi_dev_selsendpolicyClick: function(item, e, eOpts) {
        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecord = gridObj.getSelectionModel().getSelection();

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        devFuncModule.sendPolicy(true, selectRecord);
    },

    onMi_dev_modsendpolicyClick: function(item, e, eOpts) {
        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        getSendpolicyList('modified', null, function(res){

            devFuncModule.sendPolicy(false, res);

        });
    },

    onBt_terminalClick: function(button, e, eOpts) {
        // onBt_terminalClick ==========================================================================================================================================================
        //
        // 일시 : 2014.08.06
        //
        // 설명 : ssh로 장비에 접속하는 터미널 윈도우를 생성합니다.
        //
        // =============================================================================================================================================================================

        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecords = gridObj.getSelectionModel().getSelection();

        // TTY.JS를 사용하는 원격 접속 기능

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
    },

    onTb_smc_device_controlAfterRender: function(component, eOpts) {
        // onTb_smc_device_controlAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.08.25
        //
        // 설명 : 터미널 버튼 클릭시 이벤트를 설정합니다. 이벤트 실행시 유저 ID와 IP 두가지 인자값을 받는 터미널 브라우저가 실행됩니다.
        //
        // ==============================================================================================================================================================================

        component.down('[itemId=bt_terminal]').on('showTerminal', devFuncModule.showTerminal);
    },

    onCmb_periodFocus: function(component, e, eOpts) {
        // onCmb_periodFocus ===========================================================================================================================================================
        //
        // 일시 : 2014.11.15
        //
        // 설명 : 업데이트 주기에 포커스가 설정되면 장비 목록을 나타내는 그리드의 Row 선택을 모두 해제합니다.
        //
        // =============================================================================================================================================================================

        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var rtmDeviceList = Ext.getCmp(RTM_COMMON_ID.devicelist);

        if(!deviceList){

            return;

        }
        else{

            deviceList.getSelectionModel().deselectAll();

        }

        if(!rtmDeviceList){

            return;

        }
        else{

            rtmDeviceList.getSelectionModel().deselectAll();

        }
    },

    onBt_changeClick: function(button, e, eOpts) {
        // onBt_changeClick ===========================================================================================================================================================
        //
        // 일시 : 2014.11.15
        //
        // 설명 : 장비의 목록을 갱신하는 타이머 주기를 변경합니다.
        //
        // ============================================================================================================================================================================

        var cmb_period = button.up().down('[itemId=cmb_period]');

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

                    Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_zen_device_control]').down('[itemId=ctn_zen_period]').down('[itemId=cmb_period]').setValue(devicePeriod);

                    // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다. ==========================================================================================================================

                    Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');

                }
                else{

                    console.log('장비 갱신 오류 : 업데이트 주기 저장이 실패하였습니다. 인터넷 상태 및 서비스 상태를 확인하세요.');

                }

            }

        );
    },

    onBt_addClick1: function(button, e, eOpts) {

        var deviceList = Ext.getCmp('gpn_zen_device_list');

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        var treeObj = Ext.getCmp('pnl_zen_device_tree_view');

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        Ext.create('widget.zen_device_set', {

            'deviceMode'   : 'ADD',
            'g_cid' : treeObj.getSelectionModel().getSelection()[0]

        }).show();
    },

    onBt_modClick1: function(button, e, eOpts) {

        var gridObj = Ext.getCmp('gpn_zen_device_list');

        var selectRecord  = gridObj.getSelectionModel().getSelection()[0];

        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        var treeObj       = Ext.getCmp('pnl_zen_device_tree_view');

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        request_helper.xmlrpc_call_Ajax_Post(
            'ftSMC',
            'getObject',
            {
                'cid' : Ext.encode(selectRecord.data['@cid'])
            },
            function(res){

                if(res)
                {
                    Ext.create('widget.zen_device_set', {

                        'deviceParams' : res,
                        'deviceMode'   : 'MOD'

                    }).show();
                }
            }
        );
    },

    onBt_delClick1: function(button, e, eOpts) {

        var groupCid = Ext.getCmp('pnl_zen_device_tree_view').getSelectionModel().getSelection()[0].raw.cid;

        var gridObj  = Ext.getCmp('gpn_zen_device_list');

        var cidArray = [];

        var showMode = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');

        for(var i = 0; i < gridObj.getSelectionModel().getSelection().length; i++){

            cidArray.push(gridObj.getSelectionModel().getSelection()[i].raw['@cid']);

        }

        Ext.Msg.show({
            title : 'WeGuardia™ SMC 2.0',
            msg : '선택된 장비를 삭제하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    gridObj.setLoading(true);

                    var service      = 'ftSMC',
                        serchService = 'delDevice',
                        params       = {

                            cid : Ext.encode(cidArray)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            var showMode = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');

                            var service = 'ftSMC',
                                serchService = 'getDeviceList',
                                params = {

                                    'g_cid' : Ext.encode(groupCid),
                                    'isRecursive' : Ext.encode(showMode.pressed)

                                };

                            request_helper.xmlrpc_call_Ajax_Post(
                                service,
                                serchService,
                                params,
                                function(res){

                                    gridObj.getStore().loadData(res);

                                    gridObj.setLoading(false);

                                }

                            );

                        }

                    );

                }

            }

        });

    },

    onCmb_periodFocus1: function(component, e, eOpts) {

        var deviceList = Ext.getCmp('gpn_zen_device_list');

        if(!deviceList){

            return;

        }
        else{

            deviceList.getSelectionModel().deselectAll();

        }
    },

    onBt_changeClick1: function(button, e, eOpts) {

        var cmb_period = button.up().down('[itemId=cmb_period]');

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

                if(res){

                    DEVICE_COMMON_CONST.DEV_UPGRADE_TIME = devicePeriod * 1000;

                    Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_control]').down('[itemId=ctn_smc_period]').down('[itemId=cmb_period]').setValue(devicePeriod);

                // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다. ==========================================================================================================================

                    Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('zendevlistRefresh');

                }
                else{

                    console.log('장비 갱신 오류 : 업데이트 주기 저장이 실패하였습니다. 인터넷 상태 및 서비스 상태를 확인하세요.');

                }

            }

        );
    },

    onPnl_smc_device_centerAfterRender: function(component, eOpts) {
        component.setSMCContextObj();
    },

    onPnl_smc_device_centerBeforeDestroy: function(component, eOpts) {
        // onPnl_smc_device_centerBeforeDestroy =========================================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : 화면 이동시 타이머를 제거합니다.
        //
        // 수정 : (김민수 2014.07.22 - 모니터 탭 삭제로 인한 이벤트 추가)
        //
        // ==============================================================================================================================================================================

        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        if(typeof deviceList !== 'undefined'){

            var devicelistStore = Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore();

            clearInterval(component.taskObj);

            devicelistStore.removeAll();

            if(component.contextObj){

                component.contextObj.destroy();

            }

        }else{

            var zendeviceList = Ext.getCmp('gpn_zen_device_list');

            if(typeof zendeviceList !== 'undefined'){

                var zendevicelistStore = zendeviceList.getStore();

                clearInterval(component.taskObj);

                zendevicelistStore.removeAll();

                if(component.contextObj){

                    component.contextObj.destroy();

                }

            }
        }


    }

});
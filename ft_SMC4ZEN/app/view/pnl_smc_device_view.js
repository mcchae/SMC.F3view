
Ext.define('SMC4ZEN.view.pnl_smc_device_view', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_smc_device_viewViewModel',
        'SMC4ZEN.view.pnl_smc_device_viewViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.grid.plugin.BufferedRenderer'
    ],

    config: {
        taskObj: null
    },

    controller: 'pnl_smc_device_view',
    viewModel: {
        type: 'pnl_smc_device_view'
    },
    id: 'pnl_smc_device_view',
    layout: 'border',
    title: '',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'pnl_smc_device_west',
            width: 250,
            animCollapse: true,
            collapsible: true,
            title: 'XTM 장비 그룹',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    reference: 'xtm_dev_groupctrl',
                    itemId: 'tb_smc_device_control',
                    items: [
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_plus_enable',
                            height: 24,
                            itemId: 'bt_add',
                            width: 24,
                            text: '',
                            tooltip: '그룹 추가',
                            listeners: {
                                click: {
                                    fn: 'onBt_addClick1',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_modify_enable',
                            height: 24,
                            itemId: 'bt_mod',
                            width: 24,
                            text: '',
                            tooltip: '그룹 수정',
                            listeners: {
                                click: {
                                    fn: 'onBt_modClick1',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_delete_enable',
                            height: 24,
                            itemId: 'bt_del',
                            width: 24,
                            text: '',
                            tooltip: '그룹 삭제',
                            listeners: {
                                click: {
                                    fn: 'onBt_delClick1',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_search_enable',
                            height: 24,
                            itemId: 'bt_search',
                            width: 24,
                            allowDepress: false,
                            text: '',
                            tooltip: '그룹 검색',
                            listeners: {
                                click: {
                                    fn: 'onBt_searchClick',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_rule_send',
                            height: 24,
                            itemId: 'bt_showall',
                            width: 24,
                            enableToggle: true,
                            text: '',
                            tooltip: '하위그룹 내용보기',
                            listeners: {
                                click: {
                                    fn: 'onBt_showallClick',
                                    scope: 'controller'
                                },
                                toggle: {
                                    fn: 'onBt_showallToggle',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_folder_open',
                            height: 24,
                            itemId: 'bt_open',
                            width: 24,
                            tooltip: '그룹 열기',
                            listeners: {
                                click: {
                                    fn: 'onBt_openClick',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            baseCls: '',
                            border: false,
                            cls: 'common_folder_close',
                            height: 24,
                            itemId: 'bt_close',
                            width: 24,
                            tooltip: '그룹 닫기',
                            listeners: {
                                click: {
                                    fn: 'onBt_closeClick',
                                    scope: 'controller'
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    group_click_count: 0,
                    flex: 1,
                    reference: 'xtm_dev_group',
                    id: 'pnl_smc_device_tree_view_xtm',
                    width: 250,
                    title: '',
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'treeviewdragdrop'
                            }
                        ],
                        listeners: {
                            drop: {
                                fn: 'onViewDrop',
                                scope: 'controller'
                            }
                        }
                    },
                    listeners: {
                        afterrender: {
                            fn: 'onPnl_smc_device_tree_view_xtmAfterRender',
                            scope: 'controller'
                        },
                        select: {
                            fn: 'onPnl_smc_device_tree_view_xtmSelect',
                            scope: 'controller'
                        }
                    }
                }
            ]
        },
        {
            xtype: 'panel',
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

                var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemain);
                var pnl_group = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                var pnl_center = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                var grp_select = pnl_group.getSelection()[0];

                // 1. 이미 타이머가 동작 중이라면 종료

                if(pnl_main.taskObj){

                    clearInterval(pnl_main.taskObj);

                }

                // 3. 타이머를 설정
                //
                // 설명 : 타이머의 최소 동작 주기는 1000 (1초) 입니다. 그러나 장비가 많을 경우는 10초를 권장합니다. 이것은 주석을 달고있는 시점의 해당사항입니다 (2014.11.15)
                // 선택된 노드의 정보가 있다면 타이머 동작

                if(grp_select){

                    if(DEVICE_COMMON_CONST.DEV_UPGRADE_TIME > 999){

                        pnl_main.taskObj = setInterval(refreshDeviceList, DEVICE_COMMON_CONST.DEV_UPGRADE_TIME);

                    }

                }

                function refreshDeviceList(){

                    var pnl_group = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
                    var grp_select = pnl_group.getSelection()[0];
                    var txf_filterValue = pnl_center.down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue();

                    if(grp_select === undefined || grp_select === null){

                        clearInterval(pnl_main.taskObj);

                        return;

                    }

                    var service = 'ftSMC',
                        serchService = 'getDeviceList',
                        params = {

                            g_cid : Ext.encode(grp_select.get('cid')),
                            isRecursive : Ext.encode(SMC_GROUP_RECURSIVE)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                    service,
                    serchService,
                    params,
                    function(res){

                        // 0. 공통변수선언

                        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
                        var _deviceCenter = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
                        var centerContainer = Ext.getCmp(DEVICE_COMMON_ID.deviceinner);

                        // 1. 그리드객체가 생성되어 있다면

                        if(gridObj){

                            var tmpArray = [];
                            var store = gridObj.getStore();

                            // 2. 그리드의 selectRecords 에 이전에 선택된 Row 정보를 저장

                            gridObj.selectRecords = gridObj.getSelection();

                            for(var i = 0; i < gridObj.selectRecords.length; i++){

                                tmpArray.push(store.indexOf(gridObj.selectRecords[i]));

                            }

                            gridObj.selectIndex = tmpArray;

                            // 6. 새로 받은 데이터를 그리드의 스토어에 Load

                            if(store){

                                store.loadData(res);

                                // 7. 그리드 스토어의 필터를 실행합니다. 검색 필드창에 데이터가 있을경우 필터로 걸러내어 다시 refresh

                                searchDeviceName(store, txf_filterValue, ['name', 'ip']);

                            }

                        }

                        // 8. 요약 데이터를 갱신

                        pnl_center.setSummaryData(Ext.getCmp(DEVICE_COMMON_ID.devicelist), Ext.getCmp('tb_devicelist_summary'));

                        // 2015.01.17 김민수 - timeout으로 인해 block이 생길 경우 다음 refresh에서 정상적인 응답이 오면 block을 풀기위해 추가함.

                        // 9. 로드 마스크 제거

                        centerContainer.setLoading(false);

                        // 10. 2015.01.17 김민수 - 장비그룹 비활성화 해제

                        pnl_group.setDisabled(false);

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
                //
                // =============================================================================================================================================================================

                // 인터페이스 스토어 ==============================================================================================================================================================

                var devEthStore = Ext.getStore('st_common_deveth');      // 장비가 가지고 있는 인터페이스를 초기화합니다. 장비가 연동이 되지 않으면 0 ~ 25로 초기화합니다.
                var totalEthStore = Ext.getStore('st_common_totaleth');    // 브릿지, 본딩을 포함하여 인터페이스를 초기화합니다.
                var bondEthStore  = Ext.getStore('st_common_bondeth');     // 브릿지를 포함하여 인터페이스를 초기화 합니다.
                var vlanEthStore = Ext.getStore('st_common_vlaneth');     // vlan을 포함하여 인터페이스를 초기화 합니다.
                var allEthStore = Ext.getStore('st_common_alleth');      // 브릿지, 본딩, vlan을 포함하여 인터페이스를 초기화합니다.
                var pppEthStore = Ext.getStore('st_common_pppeth');      // PPP 를 스토어에 초기화 합니다.

                // Policy 관련 스토어 ============================================================================================================================================================

                var policyVlan = Ext.getStore('st_policy_vlaneth');     // vlan만 초기화합니다.
                var serverStore = Ext.getStore('st_system_auth');        // 관리자 메뉴에서 서버 종류를 초기화합니다.
                var policyNum = Ext.getStore('st_route_policynum');    // 라우터에서 정책번호를 초기화합니다.

                // 브릿지 초기화 =================================================================================================================================================================

                var pnl_CenterView = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

                if(deviceParams.network_bridge){

                    pnl_CenterView.initDeviceData(deviceParams.network_bridge.bridge,   [ bondEthStore, allEthStore ,totalEthStore ]);

                }
                // 본딩 초기화 ===================================================================================================================================================================

                if(deviceParams.network_bonding){

                    pnl_CenterView.initDeviceData(deviceParams.network_bonding.bonding, [ allEthStore, totalEthStore]);

                }

                // vlan 초기화 ==================================================================================================================================================================

                if(deviceParams.network_vlan){

                    pnl_CenterView.initDeviceData(deviceParams.network_vlan.vlan,       [ vlanEthStore, totalEthStore]);

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

                    if(deviceEthCount){

                        for(var i = 0; i < deviceEthCount; i++){

                            ethArray.push({	'eth' : 'eth' + i	});

                        }

                        devEthStore.loadData(ethArray);
                        totalEthStore.loadData(ethArray);
                        bondEthStore.loadData(ethArray);
                        vlanEthStore.loadData(ethArray);
                        allEthStore.loadData(ethArray);
                        pppEthStore.loadData(ethArray);

                        // 장비에 연결된 경우 브릿지, 본딩, vlan 설정 =======================================================================================================================================
                        //
                        // 설명 : 장비의 Row 정보 중 eth_count 의 값에 따라 인터페이스를 다시 초기화합니다. 값이 없을 수 있으므로 기본으로 초기화하는 과정을 거칩니다 (상단의 초기화 코드)
                        //
                        // 예외 : 인터페이스 정보가 필요없는 스토어는 이 부분에서 초기화하지 않습니다. (인터페이스가 필요없는 부분 -> 정책 번호, 서버 종류, vlan 정책)
                        //
                        // =============================================================================================================================================================================

                        if(deviceParams.network_bridge){

                            pnl_CenterView.initDeviceData(deviceParams.network_bridge.bridge,   [ bondEthStore, allEthStore ,totalEthStore ]);

                        }

                        if(deviceParams.network_bonding){

                            pnl_CenterView.initDeviceData(deviceParams.network_bonding.bonding, [ allEthStore, totalEthStore]);

                        }

                        if(deviceParams.network_vlan){

                            pnl_CenterView.initDeviceData(deviceParams.network_vlan.vlan,       [ vlanEthStore, totalEthStore]);

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
            },
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
            setSummaryData: function(gridComponent, summaryComponent) {
                var gridStore = gridComponent.getStore();

                var normalCount = 0;

                for(var i = 0, deviceAllCount = gridStore.count(); i < deviceAllCount; i++){

                    if(gridStore.getAt(i).get('run_state') === 2){

                        normalCount++;

                    }

                }

                summaryComponent.down('[itemId=dpf_summary_state]').setValue('전체 장비 : ' + deviceAllCount + '  ' + '정상 동작 : ' + normalCount);
            },
            is_smc: true,
            _dynamicGrid: null,
            region: 'center',
            reference: 'xtm_dev_center',
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
                    reference: 'xtm_dev_search',
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
                                    fn: 'onRdg_smc_selelctmodeChange',
                                    scope: 'controller'
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            flex: 0.7,
                            reference: 'txf_search',
                            itemId: 'txf_searchstr',
                            fieldLabel: '',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: {
                                    fn: 'onTxf_searchstrKeypress',
                                    scope: 'controller'
                                },
                                focus: {
                                    fn: 'onTxf_searchstrFocus',
                                    scope: 'controller'
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
                                    fn: 'onBtn_smc_device_serchClick',
                                    scope: 'controller'
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    reference: 'xtm_dev_control',
                    itemId: 'tb_smc_device_control',
                    items: [
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_add',
                            width: 100,
                            text: '장비 추가',
                            listeners: {
                                click: 'onBt_addClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_mod',
                            width: 100,
                            text: '장비 수정',
                            listeners: {
                                click: 'onBt_modClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_del',
                            width: 100,
                            text: '장비 삭제',
                            listeners: {
                                click: 'onBt_delClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_status',
                            width: 100,
                            text: '장비 상태',
                            listeners: {
                                click: 'onBt_statusClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_export',
                            width: 100,
                            text: '파일 발급',
                            listeners: {
                                click: 'onBt_exportClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_policy',
                            width: 100,
                            text: '정책 전송',
                            listeners: {
                                click: 'onBt_policyClick'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_terminal',
                            width: 100,
                            text: '터미널 실행',
                            listeners: {
                                click: 'onBt_terminalClick'
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
                                    reference: 'cmb_period',
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
                                        focus: 'onCmb_periodFocus'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_change',
                                    width: 100,
                                    text: '주기 변경',
                                    listeners: {
                                        click: {
                                            fn: 'onBt_changeClick',
                                            scope: 'controller'
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
                    reference: 'ctn_dev_center',
                    id: 'ctn_smc_device_list',
                    layout: 'fit'
                }
            ],
            listeners: {
                beforerender: {
                    fn: 'onPnl_smc_device_centerBeforeRender',
                    scope: 'controller'
                },
                afterrender: {
                    fn: 'onPnl_smc_device_centerAfterRender',
                    scope: 'controller'
                }
            }
        }
    ],
    listeners: {
        beforedestroy: {
            fn: 'onPnl_smc_device_viewBeforeDestroy',
            scope: 'controller'
        },
        boxready: {
            fn: 'onPnl_smc_device_viewBoxReady',
            scope: 'controller'
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

        var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

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
        var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var selectRecord = gridObj.getSelectionModel().getSelection()[0];
        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        deviceCUD.updateDevice(selectRecord.data['@cid'], selectRecord.data.ip, selectRecord.data.spd_state, selectRecord.data.eth_count);
    },

    onBt_delClick: function(button, e, eOpts) {
        var cidArray = [];
        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].data.cid;

        for(var i = 0; i < gridObj.getSelectionModel().getSelection().length; i++){

            cidArray.push(gridObj.getSelectionModel().getSelection()[i].data['@cid']);

        }

        deviceCUD.deleteDevice(gridObj, cidArray, groupCid, function(){

            var deviceControl = Ext.getCmp('pnl_smc_device_center');

            deviceControl.down('[itemId=tb_smc_device_control]').down('[itemId=bt_mod]').setDisabled(true);
            deviceControl.down('[itemId=tb_smc_device_control]').down('[itemId=bt_del]').setDisabled(true);
            deviceControl.down('[itemId=tb_smc_device_control]').down('[itemId=bt_export]').setDisabled(true);
            deviceControl.down('[itemId=tb_smc_device_control]').down('[itemId=bt_policy]').setDisabled(true);

        });
    },

    onBt_statusClick: function(button, e, eOpts) {
        var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var selectRecord = deviceList.getSelectionModel().getSelection()[0];

        devFuncModule.showState(selectRecord.data['@cid'], selectRecord.data.name);
    },

    onBt_exportClick: function(button, e, eOpts) {
        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);
        var selectRecord = gridObj.getSelectionModel().getSelection()[0];

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        devFuncModule.exportFile(selectRecord);
    },

    onBt_policyClick: function(button, e, eOpts) {
        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var selectRecord = gridObj.getSelectionModel().getSelection();
        var devicelistObj = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        devFuncModule.sendPolicy(selectRecord);
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

        var selectRecords = gridObj.getSelection();

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

    onCmb_periodFocus: function(component, event, eOpts) {
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
    }

});
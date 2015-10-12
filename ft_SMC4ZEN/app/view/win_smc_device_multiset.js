
Ext.define('SMC4ZEN.view.win_smc_device_multiset', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_smc_device_multisetViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_smc_device_multiset'
    },
    constrain: true,
    height: 600,
    id: 'win_smc_device_multiset',
    overflowY: 'auto',
    width: 1000,
    layout: 'border',
    title: '장비 설정 일괄 편집',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            split: true,
            itemId: 'pnl_smc_devicemenu_tree',
            margin: '0, 0, 10, 0',
            maxWidth: 300,
            width: 200,
            animCollapse: true,
            collapsed: false,
            collapsible: true,
            title: '메뉴 리스트',
            root: {
                text: 'XTM 일괄 편집',
                expanded: true,
                panelId: 'pnl_xtm_multi_basic',
                stores: [
                    
                ],
                children: [
                    {
                        text: '기본 설정',
                        panelId: 'pnl_xtm_multi_basic',
                        stores: [
                            
                        ],
                        expanded: true,
                        children: [
                            {
                                text: '기본 설정',
                                panelId: 'pnl_xtm_multi_basic',
                                stores: [
                                    
                                ],
                                leaf: true
                            },
                            {
                                text: '관리자 설정',
                                panelId: 'pnl_xtm_multi_basic_admin',
                                stores: [
                                    'st_multimanager_list'
                                ],
                                leaf: true
                            },
                            {
                                text: '접근 설정',
                                panelId: 'pnl_xtm_multi_basic_access',
                                stores: [
                                    
                                ],
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '보안 설정',
                        panelId: 'pnl_xtm_multi_policy',
                        stores: [
                            
                        ],
                        leaf: true
                    },
                    {
                        text: 'IPSEC 그룹 설정',
                        panelId: 'pnl_xtm_multi_groupdr',
                        stores: [
                            
                        ],
                        leaf: true
                    },
                    {
                        text: '시스템',
                        panelId: 'pnl_xtm_multi_system',
                        stores: [
                            'st_multisnmp_list'
                        ],
                        leaf: true
                    },
                    {
                        text: '로그',
                        panelId: 'pnl_xtm_multi_log',
                        stores: [
                            'st_multiset_logip'
                        ],
                        expanded: true,
                        children: [
                            {
                                text: '로그 설정',
                                panelId: 'pnl_xtm_multi_log',
                                stores: [
                                    'st_multiset_logip'
                                ],
                                leaf: true
                            },
                            //{
                            //    text: '일일리포팅 설정',
                            //    panelId : 'pnl_xtm_multi_report',
                            //	  stores : [],
                            //    leaf: true
                            //},
                            {
                                text: '로그 전송',
                                panelId: 'pnl_xtm_multi_sendlog',
                                stores: [
                                    
                                ],
                                leaf: true
                            },
                            {
                                text: '알람 설정',
                                panelId: 'pnl_xtm_multi_alarm',
                                stores: [
                                    
                                ],
                                leaf: true
                            },
                            {
                                text: '모니터링 설정',
                                panelId: 'pnl_xtm_multi_monitor',
                                stores: [
                                    
                                ],
                                leaf: true
                            }
                        ]
                    }
                ]
            },
            viewConfig: {

            },
            listeners: {
                itemclick: 'onPnl_smc_devicemenu_treeItemClick'
            }
        },
        {
            xtype: 'container',
            region: 'center',
            itemId: 'ctn_device_center',
            margin: '0, 0, 10, 0',
            layout: 'fit'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 25,
            itemId: 'ctn_smc_device_control',
            margin: '0, 5, 5, 0',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_save',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '저 장',
                    listeners: {
                        click: 'onBt_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_smc_device_multisetAfterRender',
        beforedestroy: 'onWin_smc_device_multisetBeforeDestroy'
    },

    onPnl_smc_devicemenu_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        var pnl_id = record.get('panelId');
        var st_param = record.get('stores');
        var key_param = record.get('deviceParam');
        var dev_param = this.deviceParams;

        this.down('[itemId=ctn_device_center]').setLoading('설정 화면 로드 중 ...', true);

        this.createInnerview('SMC4ZEN.view.' + pnl_id, key_param, st_param, dev_param);
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 : 2014.09.12
        //
        // 설명 : 일괄 편집 설정을 선택된 장비들에게 전송합니다.
        //
        // ==============================================================================================================================================================================

        var me = this;
        var cidArray = [];

        var nowPanel = Ext.getCmp(me.oldClass.split('.')[2]);
        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelection()[0].get('cid');

        // 해당 화면의 saveData 기능 수행 ==================================================================================================================================================

        if(!nowPanel.saveData()){

            return;

        }

        me.setLoading('장비 일괄 설정을 저장하는 중 ...', true);

        // 선택된 장비들의 CID =============================================================================================================================================================

        for(var i = 0; i < me.applyDevice.length; i++){

            cidArray.push(me.applyDevice[i].get('@cid'));

        }

        Ext.Ajax.request({

            url     : 'api/ftSMC/modDeviceBatch',
            params  : {

                'obj'      : Ext.encode(me.deviceParam),
                'cid_list' : Ext.encode(cidArray)

            },
            method  : 'POST',
            success : function(res){

                var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]');

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

                        Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore().loadData(res);

                    }

                );

                me.setLoading(false);

                me.destroy();

            },
            faliure : function(err){

                me.destroy();

            }

        });
    },

    onBt_cancelClick: function(button, e, eOpts) {


        this.destroy();
    },

    onWin_smc_device_multisetAfterRender: function(component, eOpts) {
        // onWin_smc_device_multisetAfterRender ==========================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 장치의 정보를 일괄으로 편집합니다.
        //
        // ===============================================================================================================================================================================

        var ctn_center = this.down('[itemId=ctn_device_center]');
        var deviceData = this.deviceParams;

        var activationView = Ext.create('SMC4ZEN.view.pnl_xtm_multi_basic', {});

        ctn_center.add(activationView);

        this.oldView  = activationView;
        this.oldClass = 'SMC4ZEN.view.pnl_xtm_multi_basic';
    },

    onWin_smc_device_multisetBeforeDestroy: function(component, eOpts) {
        // onWin_smc_device_multisetBeforeDestroy ========================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 장비 일괄편집 창이 닫힐 때의 작업을 수행합니다.
        //
        // ===============================================================================================================================================================================

        // 장비 리스트 화면 갱신 동작 ========================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicemain).fireEvent('devlistRefresh');
    },

    createInnerview: function(panelId, deviceParam, storeParam, deviceData) {
        // 0. 공통 변수 선언

        var ctn_devcenter = this.down('[itemId=ctn_device_center]');

        // 1. 이전에 생성되어 있는 패널 제거

        if(this.oldView){

            this.oldView.close();

        }

        // 2. 필수 스토어 생성

        if(storeParam){

            for(var i = 0, max = storeParam.length; i < max; i++){

                if(!Ext.getStore(storeParam[i])){

                    Ext.create('SMC4ZEN.store.' + storeParam[i]);

                }

            }

        }

        // 3. 뷰-State 설정에 따라 새로 생성

        if(this.viewState){

            var activationView = Ext.create(panelId, {});

            // 4. 생성된 패널 붙이기

            ctn_devcenter.add(activationView);
            ctn_devcenter.setLoading(false);

            // 5. 현재의 뷰 상태를 저장

            this.oldView = activationView;
            this.oldClass = panelId;

        }

        // 6. 로드마스크 제거

        ctn_devcenter.setLoading(false);
    }

});
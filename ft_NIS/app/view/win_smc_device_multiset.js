
Ext.define('SMC.view.win_smc_device_multiset', {
    extend: 'Ext.window.Window',
    alias: 'widget.smc_device_multiset',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    height: 600,
    id: 'win_smc_device_multiset',
    width: 1000,
    constrain: true,
    overflowY: 'auto',
    layout: 'border',
    title: '장비 설정 일괄 편집',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                        panelId: 'xtm_multi_basic',
                        children: [
                            {
                                text: '기본 설정',
                                panelId: 'xtm_multi_basic',
                                expanded: true,
                                children: [
                                    {
                                        text: '기본 설정',
                                        panelId: 'xtm_multi_basic',
                                        leaf: true
                                    },
                                    {
                                        text: '관리자 설정',
                                        panelId: 'xtm_multi_basic_admin',
                                        leaf: true
                                    },
                                    {
                                        text: '접근 설정',
                                        panelId: 'xtm_multi_basic_access',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: '보안 설정',
                                panelId: 'xtm_multi_policy',
                                leaf: true
                            },
                            {
                                text: 'IPSEC 그룹 설정',
                                panelId: 'xtm_multi_groupdr',
                                leaf: true
                            },
                            {
                                text: '시스템',
                                panelId: 'xtm_multi_system',
                                leaf: true
                            },
                            {
                                text: '로그',
                                panelId: 'xtm_multi_log',
                                expanded: true,
                                children: [
                                    {
                                        text: '로그 설정',
                                        panelId: 'xtm_multi_log',
                                        leaf: true
                                    },
                                    //{
                                    //    text: '일일리포팅 설정',
                                    //    panelId : 'xtm_multi_report',
                                    //    leaf: true
                                    //},
                                    {
                                        text: '로그 전송',
                                        panelId: 'xtm_multi_sendlog',
                                        leaf: true
                                    },
                                    {
                                        text: '알람 설정',
                                        panelId: 'xtm_multi_alarm',
                                        leaf: true
                                    },
                                    {
                                        text: '모니터링 설정',
                                        panelId: 'xtm_multi_monitor',
                                        leaf: true
                                    }
                                ]
                            }
                        ]
                    },
                    viewConfig: {

                    },
                    listeners: {
                        itemclick: {
                            fn: me.onPnl_smc_devicemenu_treeItemClick,
                            scope: me
                        }
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
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_save',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '저 장',
                            listeners: {
                                click: {
                                    fn: me.onBt_saveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_cancel',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_smc_device_multisetAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_smc_device_multisetBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_smc_devicemenu_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        var panelId     = record.raw.panelId;

        var deviceData  = this.deviceParams;

        this.createInnerview(panelId, record.raw.deviceParam, deviceData);
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 : 2014.09.12
        //
        // 설명 : 일괄 편집 설정을 선택된 장비들에게 전송합니다.
        //
        // ==============================================================================================================================================================================

        var cidArray = [];
        var panelId  = 'pnl_' + this.oldAlias;
        var nowPanel = Ext.getCmp(panelId);
        var groupCid = Ext.getCmp('pnl_smc_device_tree_view_xtm').getSelectionModel().getSelection()[0].raw.cid;

        // 해당 화면의 saveData 기능 수행 ==================================================================================================================================================

        if(!nowPanel.saveData()){

            return;

        }

        // 선택된 장비들의 CID =============================================================================================================================================================

        for(var i = 0; i < this.applyDevice.length; i++){

            cidArray.push(this.applyDevice[i].raw['@cid']);

        }

        Ext.Ajax.request({

            url     : 'api/ftSMC/modDeviceBatch',
            params  : {

                'obj'      : Ext.encode(this.deviceParam),
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

                Ext.getCmp('win_smc_device_multiset').destroy();

            },
            faliure : function(err){

                Ext.getCmp('win_smc_device_multiset').destroy();

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

        var centerCont     = this.down('[itemId=ctn_device_center]');

        var deviceData     = this.deviceParams;

        var activationView = Ext.create('widget.xtm_multi_basic', {});

        centerCont.add(activationView);

        this.oldView  = activationView;
        this.oldAlias = 'xtm_multi_basic';
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

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    createInnerview: function(panelId, deviceParam, deviceData) {
        // createInnerview ==============================================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 윈도우 내부에 설정 창을 생성합니다.
        //
        // ==============================================================================================================================================================================

        var centerCont = this.down('[itemId=ctn_device_center]');

        if(this.oldView){

            this.oldView.close();

        }

        if(this.viewState){

            var activationView = Ext.create('widget.' + panelId);

            centerCont.add(activationView);

            this.oldView  = activationView;
            this.oldAlias = panelId;

        }
    }

});
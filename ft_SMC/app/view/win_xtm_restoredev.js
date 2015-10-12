
Ext.define('SMC.view.win_xtm_restoredev', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_restoredev',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.button.Button'
    ],

    height: 300,
    id: 'win_xtm_restoredev',
    width: 700,
    title: '삭제된 장비 복원',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_restore_devicelist',
                    margin: '0, 0, 10, 0',
                    title: '',
                    store: 'st_restore_device',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '장비 명',
                            flex: 1
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: '_ts',
                            text: '삭제된 날짜',
                            flex: 2,
                            format: 'Y-m-d H:i:s'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_restore_control',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_delete',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '완전 삭제',
                            listeners: {
                                click: {
                                    fn: me.onBt_deleteClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_restore',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '복 원',
                            listeners: {
                                click: {
                                    fn: me.onBt_restoreClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_close',
                            margin: '0, 0, 0, 0',
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
                afterrender: {
                    fn: me.onWin_xtm_restoredevAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_xtm_restoredevBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_deleteClick: function(button, e, eOpts) {
        // onBt_deleteClick =============================================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 장비를 영구삭제합니다.
        //
        // 수정 :
        //
        // (2014.11.24 김민수 - 자바스크립트 최적화 코드 적용)
        //
        // ==============================================================================================================================================================================

        var restoreInstance = Ext.getCmp('win_xtm_restoredev');

        var restoreList = restoreInstance.down('[itemId=gpn_restore_devicelist]');

        var selectRecord = restoreList.getSelectionModel().getSelection();

        if(selectRecord.length <= 0){

            Ext.Msg.show({

                'title' : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                'msg'   : '삭제할 장비를 선택 해주세요.',
                'icon'  : Ext.Msg.ERROR,
                'buttons' : Ext.Msg.OK

            });

            return;

        }

        Ext.Msg.show({
            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '삭제된 장비가 영구삭제됩니다. 장비를 삭제하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    var cidArray = [];

                    for(var i = 0; i < selectRecord.length; i++){

                        cidArray.push(selectRecord[i].get('@cid'));

                    }

                    var service      = 'ftSMC',
                        serchService = 'delRestoreDevice',
                        params       = {

                            'cid' : Ext.encode(cidArray)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            restoreInstance.searchRestoreDevice();

                        }

                    );

                }

            }

        });
    },

    onBt_restoreClick: function(button, e, eOpts) {
        // onBt_restoreClick ============================================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 삭제된 장비를 복구합니다. 복구 후 장비 목록은 refresh 됩니다.
        //
        // 수정 :
        //
        // - (2014.10.30 김민수 - 복구시 전체 장비 목록 조회코드 추가)
        //
        // - (2014.11.24 김민수 - 자바스크립트 최적화 코드 적용)
        //
        // ==============================================================================================================================================================================

        var restoreInstance = Ext.getCmp('win_xtm_restoredev');

        var restoreList = restoreInstance.down('[itemId=gpn_restore_devicelist]');

        var treeObj = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);

        var gridObj = Ext.getCmp(DEVICE_COMMON_ID.devicelist);

        var selectRecord = restoreList.getSelectionModel().getSelection();

        if(selectRecord.length <= 0){

            Ext.Msg.show({

                'title' : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                'msg'   : '복원할 장비를 선택 해주세요.',
                'icon'  : Ext.Msg.ERROR,
                'buttons' : Ext.Msg.OK

            });

            return;

        }

        Ext.Msg.show({
            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '선택된 장비가 복원됩니다. 장비를 복원하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    var cidArray = [];

                    for(var i = 0; i < selectRecord.length; i++){

                        cidArray.push(selectRecord[i].get('@cid'));

                    }

                    var service      = 'ftSMC',
                        serchService = 'restoreDevice',
                        params       = {

                            'cid'   : Ext.encode(cidArray),
                            'g_cid' : Ext.encode(restoreInstance.groupCid)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            restoreInstance.searchRestoreDevice();

        // 호출 후 장비 목록 갱신 ==========================================================================================================================================================

                            deviceCUD.searchDevice(treeObj, gridObj);

                        }

                    );

                }

            }

        });
    },

    onBt_closeClick: function(button, e, eOpts) {
        // onBt_closeClick ===============================================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 윈도우를 종료하면 스토어 데이터를 정리하고 장비 목록 생신을 동작합니다.
        //
        // ===============================================================================================================================================================================

        this.destroy();
    },

    onWin_xtm_restoredevAfterRender: function(component, eOpts) {
        // onWin_xtm_restoredevAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 삭제된 장비를 조회합니다. 만약 장비 복원 화면에서 영구삭제를 하였을 경우는 조회되지 않습니다.
        //
        // ===============================================================================================================================================================================

        this.searchRestoreDevice();
    },

    onWin_xtm_restoredevBeforeDestroy: function(component, eOpts) {
        // onWin_xtm_restoredevBeforeDestroy =============================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 윈도우가 종료될 때 스토어를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_restore_device').removeAll();

        // 장비 리스트 화면 갱신 동작 ========================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    searchRestoreDevice: function() {
        // onWin_xtm_restoredevAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.08.20
        //
        // 설명 : 삭제된 장비를 조회합니다. 영구삭제된 장비는 조회되지 않습니다.
        //
        // ===============================================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getRestoreObjectList',
            params       = {

                'kind' : Ext.encode('obj_dev_xtm')

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                Ext.getStore('st_restore_device').loadData(res);

            }

        );
    }

});
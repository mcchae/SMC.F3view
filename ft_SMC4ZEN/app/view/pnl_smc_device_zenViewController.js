
Ext.define('SMC4ZEN.view.pnl_smc_device_zenViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_smc_device_zen',

    createDeviceZENListView: function(g_node) {
        var me = this;
        var g_cid = g_node.get('cid');
        var pnl_main = me.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var pnl_center = this.lookupReference('zen_dev_center');
        var tb_managetool = this.lookupReference('zen_dev_control');
        var ctn_center = this.lookupReference('zen_dev_inner');

        pnl_group.setDisabled(true);

        // 로드마스크 생성

        ctn_center.setLoading(true);

        var service = 'ftZEN',
            serchService = 'getDeviceList',
            params = {

                'g_cid' : Ext.encode(g_cid),
                'isRecursive' : Ext.encode(ZEN_GROUP_RECURSIVE)

            };

        // 젠-장비 리스트를 출력하는 그리드가 생성되어 있다면 ...

        if(pnl_center._dynamicZENGrid){

            zenDevCRUD.getZenDevicelist(g_cid, ZEN_GROUP_RECURSIVE, false, function(res){

                var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
                var tb_summary = Ext.getCmp('tb_zen_devicelist_summary');

                if(pnl_center._dynamicZENGrid){

                    pnl_center._dynamicZENGrid.getSelectionModel().deselectAll();
                    pnl_center._dynamicZENGrid.selectRecords = [];
                    pnl_center._dynamicZENGrid.getView()._ws_lastScrollPosition = 0;

                    // 2015.09.15 공통 프로파일 객체 변환

                    pnl_center._dynamicZENGrid.getStore().loadData(res);
                    pnl_center._dynamicZENGrid.getView().refresh();

                }

                pnl_center.fireEvent('zendevlistRefresh');
                pnl_center.setSummaryData(gpn_devlist, tb_summary);

                ctn_center.setLoading(false);
                pnl_group.setDisabled(false);

            });

        }

        // 젠-장비를 출력하는 그리드가 생성되어있지 않다면 새로 생성

        else{

            // 2015.09.17 Row Edit 제거됨.

            //     function onZenDeviceBeforeEdit(editor, context, eOpts){

            //         if(pnl_main.taskObj){

            //             clearInterval(pnl_main.taskObj);

            //         }

            //     }

            //     // Row editor 플러그인 설정

            //     function onZenDeviceEdit(editor, context, eOpts){

            //         console.log('장비 수정 시작 !! 타이머 종료 !!');

            //         var gpn_list = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
            //         var grp_select = pnl_group.getSelection()[0];
            //         var grp_zenselect = gpn_list.getSelection()[0];
            //         var tb_summary = Ext.getCmp('tb_zen_devicelist_summary');
            //         var g_cid = grp_select.get('cid');
            //         var d_cid = grp_zenselect.get('@cid');

            //         // 장비 갱신 타이머 종료

            //         console.log('장비 수정 시작 !! 타이머 종료 !!', pnl_main.taskObj);

            //         // 추가 / 수정 정보 객체 생성

            //         var obj = {};

            //         obj.ip = context.record.get('ip');
            //         obj.name = context.record.get('name');
            //         obj.desc = context.record.get('desc');
            //         obj._kind = 'object_dev_zen';

            //         obj.profiles = {};
            //         obj.profiles.profile_common = {};
            //         obj.profiles.profile_common['@cid'] = '00000000000000000000000000000000';
            //         obj.profiles.profile_common['#text'] = 'Any';

            //         // 장비 추가

            //         if(gpn_list.editstate){

            //             zenDevCRUD.addZenDevice(g_cid, obj, function(res){

            //                 console.log("ADD Zen device result -> ", res);

            //                 zenDevCRUD.getZenDevicelist(g_cid, ZEN_GROUP_RECURSIVE, function(res){

            //                     if(pnl_center._dynamicZENGrid){

            //                         pnl_center._dynamicZENGrid.getSelectionModel().deselectAll();
            //                         pnl_center._dynamicZENGrid.selectRecords = [];
            //                         pnl_center._dynamicZENGrid.getView()._ws_lastScrollPosition = 0;
            //                         pnl_center._dynamicZENGrid.getStore().loadData(res);
            //                         pnl_center._dynamicZENGrid.getView().refresh();

            //                     }

            //                     ctn_center.setLoading(false);
            //                     pnl_group.setDisabled(false);

            //                 });

            //                 pnl_center.fireEvent('zendevlistRefresh');
            //                 pnl_center.setSummaryData(gpn_list, tb_summary);

            //             });

            //         }

            //         // 장비 수정

            //         else{

            //             zenDevCRUD.modZenBasicDevice(d_cid, obj, function(res){

            //                 console.log("Mod Zen device result -> ", res);

            //                 zenDevCRUD.getZenDevicelist(g_cid, ZEN_GROUP_RECURSIVE, function(res){

            //                     if(pnl_center._dynamicZENGrid){

            //                         pnl_center._dynamicZENGrid.getSelectionModel().deselectAll();
            //                         pnl_center._dynamicZENGrid.selectRecords = [];
            //                         pnl_center._dynamicZENGrid.getView()._ws_lastScrollPosition = 0;
            //                         pnl_center._dynamicZENGrid.getStore().loadData(res);
            //                         pnl_center._dynamicZENGrid.getView().refresh();

            //                     }

            //                     ctn_center.setLoading(false);
            //                     pnl_group.setDisabled(false);

            //                 });

            //                 pnl_center.fireEvent('zendevlistRefresh');
            //                 pnl_center.setSummaryData(gpn_list, tb_summary);

            //             });

            //         }

            //         gpn_list.editstate = false;

            //     }

            //     function onZenDeviceCancel(editor, context, eOpts){

            //         var gpn_list = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
            //         var st_zenlist = gpn_list.getStore();

            //         var tb_summary = Ext.getCmp('tb_zen_devicelist_summary');

            //         if(gpn_list.editstate){

            //             st_zenlist.removeAt(0);

            //             gpn_list.editstate = false;

            //         }

            //         pnl_center.fireEvent('zendevlistRefresh');
            //         pnl_center.setSummaryData(gpn_list, tb_summary);

            //     }

            //     var plugins = {
            //         ptype : 'rowediting',
            //         pluginId : 'zen_dev_rowediting',
            //         clicksToEdit: 2,
            //         listeners : {

            //             'edit' : onZenDeviceEdit,
            //             'beforeedit' : onZenDeviceBeforeEdit,
            //             'canceledit' : onZenDeviceCancel

            //         }

            //     };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(res){

                    SMC_VIEW.create_grid_panel(
                        g_cid,
                        G_TYPE.SMC4ZEN,
                        'gpn_zen_device_list',
                        false,
                        function(_grid_tpl){

                            pnl_center._dynamicZENGrid = Ext.create(_grid_tpl,{

                                'id' : DEVICE_COMMON_ID.devicezenlist,
                                'selectRecords' : [],
                                'selectIndex'   : [],
                                'border'        : false,
                                'reference'		: 'zen_dev_devlist',
                                'viewConfig'    : {
                                    'itemId'    : 'gdv_zen_device_view',
                                    'preserveScrollOnRefresh' : true,
                                    'listeners' : {

                                        'refresh': function(dataview, eOpts){

                                            var newRecordsToSelect = [];
                                            var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

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
                                'dockedItems': [
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
                                'listeners': {

                                    'afterrender' : function(component, eOpts){

                                        me.setContextByZen();

                                    }

                                },
                                'selModel'	: Ext.create('Ext.selection.CheckboxModel', {

                                    listeners: {

                                        'select': function(records){

                                            tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                            tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(false);

                                        },
                                        'deselect': function(records){

                                            var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

                                            if(!gpn_devlist.getSelection().length){

                                                tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_del]').setDisabled(true);
                                                tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(true);

                                            }

                                        }

                                    }

                                })

                            });

                            // ZEN 장비 리스트 그리드 추가

                            ctn_center.add(pnl_center._dynamicZENGrid);

                            pnl_center._dynamicZENGrid.on('itemclick', function(obj, record, item, index, e, eOpts){

                                tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(false);

                            });

                            pnl_center._dynamicZENGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){

                                var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
                                var grp_devselect = gpn_devlist.getSelection()[0];

                                if(pnl_main.taskObj){

                                    clearInterval(pnl_main.taskObj);

                                }

                                request_helper.xmlrpc_call_Ajax_Post(
                                    'ftZEN',
                                    'getDevice',
                                    {

                                        cid : Ext.encode(grp_devselect.get('@cid'))

                                    },
                                    function(res){

                                        if(res){

                                            var win_zenset = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                                                'openMode' : 'once_dev',
                                                'conn_info' : res,
                                                'action_dev' : 'MOD'

                                            });

                                            win_zenset.show();

                                        }
                                        else{

                                            Ext.Msg.show({
                                                title : SMC_SET_PRODUCT,
                                                msg : getDefineMsg('err_null_zeninfo'),
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR
                                            });

                                        }

                                    });

                            });

                            // 장비 목록 조회 / 출력

                            // 2015.09.15 공통 프로파일 객체 변환

                            pnl_center._dynamicZENGrid.getStore().loadData(res);

                            ctn_center.setLoading(false);

                            // 검색 조건으로 조회 (스토어 필터링)

                            searchDeviceName(pnl_center._dynamicZENGrid.getStore(), pnl_center.down('[itemId=tb_zen_device_search]').down('[itemId=txf_searchstr]').getValue(), ['name', 'ip']);

                            // 갱신 이벤트 실행

                            pnl_center.fireEvent('zendevlistRefresh');

                            // Summary 함수 호출

                            pnl_center.setSummaryData(pnl_center._dynamicZENGrid, Ext.getCmp('tb_zen_devicelist_summary'));

                            // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                            pnl_group.setDisabled(false);

                        });

                });

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 장비 그리드에서 그룹으로 드래그하여 소속된 그룹을 변경할 때, 발생하는 이벤트의 콜백-함수 입니다.
    */
    onTreeNodeMouseUp: function(view, record, item, idx, e, eOpts) {
        var me = this;

        var pnl_group = me.lookupReference('zen_dev_group');
        var pnl_select = pnl_group.getSelection()[0];
        var gpn_devlist = me.lookupReference('zen_dev_devlist');
        var gpn_select = deviceList.getSelection();

        if(pnl_group.isDD){

            pnl_group.isDD = false;
            pnl_group.on('itemmouseup', me.onTreeNodeMouseUp, me);

            var cidArray = [];
            var selectRecordSize = gpn_select.length;

            if(selectRecordSize <= 0){

                return;

            }

            for(var i = 0, max = selectRecordSize; i < max; i++){

                cidArray.push(gpn_select[i].get('@cid'));

            }

            me.deviceDragToGroup(record.get('cid'), cidArray);

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : expand 속성 값에 따라 그룹 목록을 펼칩니다.
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

        }var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ZEN 장비에 관련된 컨텍스트-메뉴를 생성합니다.
    */
    setContextByZen: function() {
        var pnl_main = this.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var pnl_center = this.lookupReference('zen_dev_center');
        var txf_search = this.lookupReference('zen_dev_searchval');
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var tb_dev_managetool = this.lookupReference('zen_dev_control');

        var dev_Context_Array = [

            {
                'name' : getDefineText('ctm_menu_adddev'),
                'itemId' : 'mi_xtm_add',
                'children' : null,
                'callback' : function(){

                    var g_cid = pnl_group.getSelection()[0].get('cid');

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftZEN',
                        'getObjectDefault',
                        {

                            kind : Ext.encode('object_dev_zen')

                        },
                        function(res){

                            if(res){

                                var win_detail = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                                    'openMode' : 'once_dev',
                                    'conn_info' : res,
                                    'action_dev' : 'ADD'

                                });

                                win_detail.show();

                            }
                            else{

                                Ext.Msg.show({
                                    title : SMC_SET_PRODUCT,
                                    msg : getDefineMsg('err_null_zeninfo'),
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });

                            }

                        });

                    //             row_editer.cancelEdit();

                    //             gpn_zenlist.editstate = true;

                    //             st_zenlist.insert(0, {

                    //                 'name' : 'WeGuardia ZEN',
                    //                 'ip'   : '0.0.0.0',
                    //                 'desc' : ''

                    //             });

                    //             row_editer.startEdit(0, 0);

                }

            },
            {
                'name' : getDefineText('ctm_menu_moddev'),
                'itemId' : 'mi_xtm_mod',
                'children' : null,
                'callback' : function(){

                    var st_zenlist = gpn_zenlist.getStore();
                    var grp_zenselect = gpn_zenlist.getSelection()[0];

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftZEN',
                        'getDevice',
                        {

                            cid : Ext.encode(grp_zenselect.get('@cid'))

                        },
                        function(res){

                            if(res){

                                var win_zenset = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                                    'openMode' : 'once_dev',
                                    'conn_info' : res,
                                    'action_dev' : 'MOD'

                                });

                                win_zenset.show();

                            }
                            else{

                                Ext.Msg.show({
                                    title : SMC_SET_PRODUCT,
                                    msg : getDefineMsg('err_null_zeninfo'),
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });

                            }

                        });

                }

            },
            {
                'name' : getDefineText('ctm_menu_deldev'),
                'itemId' : 'mi_xtm_del',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_zenselect = gpn_zenlist.getSelection();

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    Ext.Msg.show({
                        title : SMC_SET_PRODUCT,
                        msg : getDefineMsg('qus_group_delete'),
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.Msg.QUESTION,
                        fn : function(res){

                            if(res === 'yes'){

                                try{

                                    zenDevCRUD.delZenBasicDevice(grp_zenselect, function(res){

                                        tb_dev_managetool.down('[itemId=bt_mod]').setDisabled(true);
                                        tb_dev_managetool.down('[itemId=bt_del]').setDisabled(true);

                                        zenDevCRUD.getZenDevicelist(grp_select.get('cid'), ZEN_GROUP_RECURSIVE, false, function(res){

                                            var st_zenlist = gpn_zenlist.getStore();

                                            st_zenlist.loadData(res);

                                            searchDeviceName(st_zenlist, txf_search.getValue(), ['name', 'ip']);

                                        });

                                        pnl_center.fireEvent('zendevlistRefresh');

                                    });

                                }
                                catch(err){

                                    Ext.Msg.show({

                                        title : SMC_SET_PRODUCT,
                                        msg : getDefineMsg('err_fail_noreson') + '<br><br>' + '[Error] : ' + err,
                                        buttons : Ext.Msg.OK,
                                        icon : Ext.Msg.ERROR

                                    });

                                    pnl_center.fireEvent('zendevlistRefresh');

                                }

                            }
                            else{

                                pnl_center.fireEvent('zendevlistRefresh');

                            }

                        }

                    });

                }

            },
            {
                'name' : getDefineText('ctm_menu_cpydev'),
                'itemId' : 'mi_xtm_copy',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_zenselect = gpn_zenlist.getSelection()[0];

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    Ext.Msg.show({

                        title : SMC_SET_PRODUCT,
                        msg : getDefineMsg('qus_device_copy'),
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.Msg.QUESTION,
                        fn : function(res){

                            if(res === 'yes'){

                                zenDevCRUD.copyZenBasicDevice(grp_zenselect.get('@cid'), function(res){

                                    zenDevCRUD.getZenDevicelist(grp_select.get('cid'), ZEN_GROUP_RECURSIVE, false, function(res){

                                        var st_zenlist = gpn_zenlist.getStore();

                                        st_zenlist.loadData(res);

                                        searchDeviceName(st_zenlist, txf_search.getValue(), ['name', 'ip']);

                                    });

                                    pnl_center.fireEvent('zendevlistRefresh');

                                });

                            }
                            else{

                                pnl_center.fireEvent('zendevlistRefresh');

                            }

                        }

                    });

                }

            },
            {
                'name' : getDefineText('ctm_menu_batchdev'),
                'itemId' : 'mi_xtm_batchdev',
                'children' : null,
                'callback' : function(){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    var grp_zenselect = gpn_zenlist.getSelection();
                    var win_zenset = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                        'conn_info' : grp_zenselect

                    });

                    win_zenset.show();

                }

            },
            {
                'name' : getDefineText('ctm_menu_ciddev'),
                'itemId' : 'mi_xtm_viewcid',
                'children' : null,
                'callback' : function(){

                    var grp_zenselect = gpn_zenlist.getSelection()[0];

                    zenDevCRUD.showZenDeviceCid(grp_zenselect.get('name'), grp_zenselect.get('@cid'));

                }

            },
            {
                'name' : getDefineText('ctm_menu_spddev'),
                'itemId' : 'mi_xtm_sendpolicy',
                'children' : null,
                'callback' : function(){

                    var grp_zenselect = gpn_zenlist.getSelection();

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    zenDevCRUD.sendpolicyZenDevice(grp_zenselect);

                }

            },
            {
                'name' : getDefineText('ctm_menu_exportexcel'),
                'itemId' : 'mi_xtm_exportxls',
                'children' : null,
                'callback' : function(){

                    zenDevCRUD.exportZenDevicelist(gpn_zenlist.getStore());

                }

            }

        ];

        var contextCallback = function(menuInstance){

            if(!gpn_zenlist){

                menuInstance.down('[itemId=mi_xtm_add]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_batchdev]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_viewcid]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(true);
                menuInstance.down('[itemId=mi_xtm_exportxls]').setDisabled(true);

            }
            else{

                var selectRowSize = gpn_zenlist.getSelection().length;

                if(selectRowSize === 1){

                    menuInstance.down('[itemId=mi_xtm_add]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_batchdev]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_viewcid]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_exportxls]').setDisabled(false);

                }

                else if(selectRowSize <= 0){

                    menuInstance.down('[itemId=mi_xtm_add]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_batchdev]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_viewcid]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_exportxls]').setDisabled(false);

                }

                else{

                    menuInstance.down('[itemId=mi_xtm_add]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_batchdev]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_viewcid]').setDisabled(true);
                    menuInstance.down('[itemId=mi_xtm_sendpolicy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_xtm_exportxls]').setDisabled(false);

                }

            }

        };

        makeContextMenu({	'itemId' : 'mn_xtm_context', 'width' : 200, 'border' : true	}, gpn_zenlist, contextCallback, dev_Context_Array);
    },

    createMonitorZENListView: function(g_node) {
        var me = this;
        var g_cid = g_node.get('cid');
        var pnl_main = me.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var pnl_center = this.lookupReference('zen_rtm_monitor');
        // var tb_managetool = this.lookupReference('zen_dev_control');
        var ctn_center = this.lookupReference('zen_rtm_inner');
        var txf_search = this.lookupReference('zen_rtm_searchval');

        pnl_group.setDisabled(true);

        // 로드마스크 생성

        ctn_center.setLoading(true);

        var service = 'ftZEN',
            serchService = 'getDeviceList',
            params = {

                'g_cid' : Ext.encode(g_cid),
                'isRecursive' : Ext.encode(ZEN_GROUP_RECURSIVE),
                'isRtm' : true

            };

        // 젠-장비 리스트를 출력하는 그리드가 생성되어 있다면 ...

        if(pnl_center._dynamicZENGrid){

            zenDevCRUD.getZenDevicelist(g_cid, ZEN_GROUP_RECURSIVE, true, function(res){

                var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
                var tb_summary = Ext.getCmp('tb_zen_devicelist_summary');

                if(pnl_center._dynamicZENGrid){

                    pnl_center._dynamicZENGrid.getSelectionModel().deselectAll();
                    pnl_center._dynamicZENGrid.selectRecords = [];
                    pnl_center._dynamicZENGrid.getView()._ws_lastScrollPosition = 0;

                    // 2015.09.15 공통 프로파일 객체 변환

                    pnl_center._dynamicZENGrid.getStore().loadData(res);
                    pnl_center._dynamicZENGrid.getView().refresh();

                }

                pnl_center.fireEvent('zenmonitorrefresh');
                pnl_center.setSummaryData(gpn_devlist, tb_summary);

                ctn_center.setLoading(false);
                pnl_group.setDisabled(false);

            });

        }

        // 젠-장비를 출력하는 그리드가 생성되어있지 않다면 새로 생성

        else{

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(res){

                    SMC_VIEW.create_grid_panel(
                        g_cid,
                        G_TYPE.RTM4ZEN,
                        RTM_COMMON_ID.devicezenlist,
                        false,
                        function(_grid_tpl){

                            pnl_center._dynamicZENGrid = Ext.create(_grid_tpl,{

                                'id' : RTM_COMMON_ID.devicezenlist,
                                'selectRecords' : [],
                                'selectIndex'   : [],
                                'border'        : false,
                                'reference'		: 'zen_rtm_devlist',
                                'viewConfig'    : {
                                    'itemId'    : 'gdv_rtm_device_view',
                                    'preserveScrollOnRefresh' : true,
                                    'listeners' : {

                                        'refresh': function(dataview, eOpts){

                                            var newRecordsToSelect = [];
                                            var deviceList = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

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
                                'dockedItems': [
                                    {
                                        xtype : 'toolbar',
                                        dock  : 'bottom',
                                        id    : 'tb_rtm_devicelist_summary',
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

                                        //                                 me.setContextByZen();

                                    }

                                },
                                'selModel'	: Ext.create('Ext.selection.CheckboxModel', {

                                    listeners: {

                                        'select': function(records){

                                            //                                     tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                            //                                     tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                            //                                     tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                            //                                     tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(false);

                                        },
                                        'deselect': function(records){

                                            var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicezenlist);

                                            if(!gpn_rtmlist.getSelection().length){

                                                //                                         tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                                                //                                         tb_managetool.down('[itemId=bt_del]').setDisabled(true);
                                                //                                         tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(true);

                                            }

                                        }

                                    }

                                })

                            });

                            // ZEN 장비 리스트 그리드 추가

                            ctn_center.add(pnl_center._dynamicZENGrid);

                            pnl_center._dynamicZENGrid.on('itemclick', function(obj, record, item, index, e, eOpts){

                                //                         tb_managetool.down('[itemId=bt_add]').setDisabled(false);
                                //                         tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
                                //                         tb_managetool.down('[itemId=bt_del]').setDisabled(false);
                                //                         tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(false);

                            });

                            pnl_center._dynamicZENGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){



                            });

                            // 장비 목록 조회 / 출력

                            // 2015.09.15 공통 프로파일 객체 변환

                            pnl_center._dynamicZENGrid.getStore().loadData(res);

                            ctn_center.setLoading(false);

                            // 검색 조건으로 조회 (스토어 필터링)

                            searchDeviceName(pnl_center._dynamicZENGrid.getStore(), txf_search.getValue(), ['name', 'ip']);

                            // 갱신 이벤트 실행

                            pnl_center.fireEvent('zenmonitorrefresh');

                            // Summary 함수 호출

                            pnl_center.setSummaryData(pnl_center._dynamicZENGrid, Ext.getCmp('tb_rtm_devicelist_summary'));

                            // 2015.01.17 김민수 - 장비그룹 비활성화 해제

                            pnl_group.setDisabled(false);

                        });

                });

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ZEN 장비 그룹을 추가합니다.
    */
    onBt_addClick: function(button, e, eOpts) {
        var groupParams = null;
        var pnl_group = this.lookupReference('zen_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)	{

            groupParams = grp_select.get('cid');

        }
        else{

            groupParams = pnl_group.getRootNode().get('cid');

        }

        if(groupParams){

            Ext.create('SMC4ZEN.view.win_smc_zengroup_set', {

                'mode' : 'ADD',
                'wndTitle' : SMC_SET_PRODUCT,
                'groupParams' : groupParams

            }).show();

            return true;
        }
        else{

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ZEN 장비 그룹을 수정합니다.
    */
    onBt_modClick: function(button, e, eOpts) {
        var groupParams = null;
        var pnl_group = this.lookupReference('zen_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)	{

            groupParams = grp_select.get('cid');

        }
        else{

            groupParams = pnl_group.getRootNode().get('cid');

        }

        if(groupParams){

            Ext.create('SMC4ZEN.view.win_smc_zengroup_set', {

                mode : 'MOD',
                wndTitle : SMC_SET_PRODUCT,
                groupParams : groupParams

            }).show();

            return true;

        }
        else{

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ZEN 장비 그룹을 삭제합니다.
    */
    onBt_delClick: function(button, e, eOpts) {
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
        var pnl_group = this.lookupReference('zen_dev_group');
        var grp_select = pnl_group.getSelection()[0];

        if(!grp_select){

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }

        Ext.Msg.show({

            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : getDefineMsg('qus_group_delete'),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    try{

                        var serviceName = 'ftZEN',
                            rpcFunc = 'delGroup',
                            params = {

                                'cid' : Ext.encode(grp_select.get('cid'))

                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                        serviceName,
                        rpcFunc,
                        params,
                        function(res){

                            var serviceName = 'ftZEN',
                                rpcFunc = 'getGroup',
                                params = {

                                    'gtype' : Ext.encode('object_dev_zen')

                                };

                            treeReload(pnl_group, serviceName, rpcFunc, params);

                        }

                        );

                    }
                    catch(err){

                        Ext.Msg.show(
                        {
                            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                            msg : getDefineMsg('err_fail_noreson') + '<br><br>' + '[Error Msg] : ' + err,
                            buttons : Ext.Msg.YESNO,
                            icon : Ext.Msg.QUESTION

                        });

                        return false;

                    }

                }

            }

        });
    },

    /*
        일 시 : 2015.09.10

        설 명 : 그룹을 검색하는 윈도우를 출력합니다.
    */
    onBt_searchClick1: function(button, e, eOpts) {
        var win_search = SMC_VIEW.make_find_treenode_window('그룹 검색', this.lookupReference('zen_dev_group'));

        win_search.show();
    },

    /*
        일 시 : 2015.09.10

        설 명 : recursive 속성을 설정합니다.
    */
    onBt_recursiveClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_dev_group');
        var grp_select = pnl_group.getSelection()[0];
        var tb_managetool = this.lookupReference('zen_dev_control');

        tb_managetool.setDisabled(false);

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);

        this.createDeviceZENListView(grp_select);
    },

    /*
        일 시 : 2015.09.10

        설 명 : 토글이 활성화되면 버튼 스타일을 설정합니다.
    */
    onBt_recursiveToggle: function(button, pressed, eOpts) {
        if(pressed){

            ZEN_GROUP_RECURSIVE = true;

            button.removeCls('common_rule_send');
            button.addCls('common_rule_pressed');

        }
        else{

            ZEN_GROUP_RECURSIVE = false;

            button.removeCls('common_rule_pressed');
            button.addCls('common_rule_send');

        }
    },

    onBt_expandClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_dev_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_group = pnl_group.getSelection()[0];

        if(grp_group){

            group_open(pnl_group, grp_group);

        }
    },

    onBt_foldClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_dev_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_close(pnl_group, grp_select);

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 트리의 Drop 이벤트를 정의합니다. 이벤트 발생시 공통 함수인 deviceGroupToGroup 함수를 호출합니다.
    */
    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var pnl_group = this.lookupReference('zen_dev_group');

        deviceGroupToGroup('ftZEN', overModel.get('cid'), data.records[0].get('cid'), 'object_dev_zen', pnl_group);
    },

    /*
        일 시 : 2015.09.10

        설 명 : 장비그룹 선택시 ZEN 장비 그리드를 생성 / 갱신합니다.
    */
    onPnl_zen_groupSelect: function(rowmodel, record, index, eOpts) {
        // 0. 공통 변수 선언

        var pnl_group = this.lookupReference('zen_dev_group');
        var pnl_mode = this.lookupReference('zen_dev_mode');
        var tb_managetool = this.lookupReference('zen_dev_control');

        tb_managetool.setDisabled(false);

        // 1. 장비 추가 / 수정 / 삭제 버튼 활성화 여부 설정

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
        tb_managetool.down('[itemId=bt_del]').setDisabled(true);
        tb_managetool.down('[itemId=bt_sendpolicy]').setDisabled(true);

        // 3. 그리드 생성 혹은 갱신

        if(pnl_mode.activeIndex === 0){

            this.createDeviceZENListView(record);

        }
        else{

            this.createMonitorZENListView(record);

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 장비그룹을 출력하는 트리의 사이즈가 최초로 적용될 때 이벤트가 발생합니다. 이 때, 드래그 & 드롭에 대한 기능들을 정의합니다.
    */
    onPnl_zen_groupBoxReady: function(component, width, height, eOpts) {
        var me = this;
        var pnl_group = me.lookupReference('zen_dev_group');
        var pnl_center = me.lookupReference('zen_dev_center');

        pnl_group.groupTreeDropTarget = new Ext.dd.DropTarget(pnl_group.body.dom ,{

            'ddGroup' : 'dragDevice',
            'notifyEnter': function(ddSource, e, data) {

                pnl_group.isDD = true;
                pnl_group.on('itemmouseup', pnl_group.onTreeNodeMouseUp, pnl_group);

            },
            'notifyDrop': function(ddSource, e, data) {

                return true;

            }

        });
    },

    /*
        일 시 : 2015.09.10

        설 명 : 장비 그룹 리스트를 불러옵니다.
    */
    onPnl_zen_groupAfterRender: function(component, eOpts) {
        var me = this;

        component.setLoading(getDefineMsg('lod_group'), true);

        var service = 'ftZEN',
            serchService = 'getGroup',
            params = {

                gtype : Ext.encode('object_dev_zen')

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

    /*
        일 시 : 2015.09.10

        설 명 : 조건에 맞는 ZEN 장비를 검색합니다.
    */
    onTxf_searchstrKeypress: function(textfield, e, eOpts) {
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

        if(e.getKey() === e.ENTER){

            if(gpn_zenlist){

                var st_devlist = gpn_zenlist.getStore();

                if(st_devlist){

                    searchDeviceName(st_devlist, textfield.getValue(), ['name', 'ip']);

                }

            }

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 검색 필드에 포커스가 입력되면, 선택된 모든 ZEN 장비를 선택해제합니다.
    */
    onTxf_searchstrFocus: function(component, event, eOpts) {
        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

        if(!gpn_devlist){

            return;

        }
        else{

            gpn_devlist.getSelectionModel().deselectAll();

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 조건에 맞는 ZEN 장비를 검색합니다.
    */
    onBt_searchClick: function(button, e, eOpts) {

        var txf_search = this.lookupReference('zen_dev_searchval');
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var escapeText = Ext.String.escapeRegex(txf_search.getValue());

        if(gpn_zenlist){

            var st_devlist = gpn_zenlist.getStore();

            if(st_devlist){

                searchDeviceName(st_devlist, escapeText, ['name', 'ip']);
            }

        }
    },

    onBt_addClick1: function(button, e, eOpts) {
        // Row Editor Device add

        var pnl_main = this.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var gpn_list = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var st_zenlist = gpn_list.getStore();

        var g_cid = pnl_group.getSelection()[0].get('cid');

        // 갱신 타이머 종료

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getObjectDefault',
        {

            kind : Ext.encode('object_dev_zen')

        },
        function(res){

            if(res){

                var win_detail = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                    'openMode' : 'once_dev',
                    'conn_info' : res,
                    'action_dev' : 'ADD'

                });

                win_detail.show();

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_zeninfo'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        });

        // 2015.09.17 Row Edit 제거

        // row_editer.cancelEdit();

        // gpn_list.editstate = true;

        // st_zenlist.insert(0, {

        //     'name' : 'WeGuardia ZEN',
        //     'ip'   : '0.0.0.0',
        //     'desc' : ''

        // });

        // row_editer.startEdit(0, 0);
    },

    /*
        일 시 : 2015.09.15

        설 명 : 선택된 장비의 정보를 수정합니다. 수정 전 장비가 연결된 데이터베이스의 접속을 변경합니다.
    */
    onBt_detailClick: function(button, e, eOpts) {
        var pnl_main = this.getView();
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var grp_select = gpn_zenlist.getSelection()[0];

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getDevice',
        {

            cid : Ext.encode(grp_select.get('@cid'))

        },
        function(res){

            if(res){

                var win_zenset = Ext.create('SMC4ZEN.view.win_smc_zendevice_set', {

                    'openMode' : 'once_dev',
                    'conn_info' : res,
                    'action_dev' : 'MOD'

                });

                win_zenset.show();

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_zeninfo'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        });
    },

    onBt_delClick1: function(button, e, eOpts) {
        var pnl_main = this.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var pnl_center = this.lookupReference('zen_dev_center');
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var grp_select = pnl_group.getSelection()[0];
        var txf_search = this.lookupReference('zen_dev_searchval');
        var tb_dev_managetool = this.lookupReference('zen_dev_control');

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        Ext.Msg.show({
            title : SMC_SET_PRODUCT,
            msg : getDefineMsg('qus_device_delete'),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    try{

                        zenDevCRUD.delZenBasicDevice(gpn_zenlist.getSelection(), function(res){

                            tb_dev_managetool.down('[itemId=bt_mod]').setDisabled(true);
                            tb_dev_managetool.down('[itemId=bt_del]').setDisabled(true);

                            zenDevCRUD.getZenDevicelist(grp_select.get('cid'), ZEN_GROUP_RECURSIVE, false, function(res){

                                var st_zenlist = gpn_zenlist.getStore();

                                st_zenlist.loadData(res);

                                searchDeviceName(st_zenlist, txf_search.getValue(), ['name', 'ip']);

                                pnl_center.fireEvent('zendevlistRefresh');

                            });

                        });

                    }
                    catch(err){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_svcexcept') + '<br><br>' + '[Svc error] : ' + err,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        pnl_center.fireEvent('zendevlistRefresh');

                    }

                }
                else{

                    pnl_center.fireEvent('zendevlistRefresh');

                }

            }

        });
    },

    onBt_sendpolicyClick: function(button, e, eOpts) {
        var pnl_main = this.getView();
        var pnl_group = this.lookupReference('zen_dev_group');
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

        var grp_zenselect = gpn_zenlist.getSelection();

        if(pnl_main.taskObj){

            clearInterval(pnl_main.taskObj);

        }

        zenDevCRUD.sendpolicyZenDevice(grp_zenselect);
    },

    onCmb_periodFocus: function(component, event, eOpts) {
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);

        if(!gpn_zenlist){

            return;

        }
        else{

            gpn_zenlist.getSelectionModel().deselectAll();

        }
    },

    onBt_refreshClick: function(button, e, eOpts) {
        var pnl_center = this.lookupReference('zen_dev_center');
        var cmb_period = this.lookupReference('zen_dev_timeperiod');
        var tb_managetool = this.lookupReference('zen_dev_control');

        if(!cmb_period.validityCheck().blankCheck() || !cmb_period.validityCheck().scaleValidate('업데이트 주기의 범위는 0 ~ 600 입니다.<br><br>※ 주의! 업데이트 주기가 0인 경우 갱신되지 않습니다.')){

            return;

        }

        var devicePeriod = parseInt(cmb_period.getValue(), 10);

        var serviceName = 'ftSMC';
        var rpcFunc = 'setSMCSetting';
        var params = {

            'key' : Ext.encode('ui/zen/refresh_time'),
            'value' : devicePeriod

        };

        request_helper.xmlrpc_call_Ajax_Post(
        serviceName,
        rpcFunc,
        params,
        function(res){

            if(res){

                DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME = devicePeriod * 1000;

                tb_managetool.down('[itemId=ctn_zen_refresh]').down('[itemId=cmb_period]').setValue(devicePeriod);

                pnl_center.fireEvent('zendevlistRefresh');

            }
            else{

                console.log('장비 갱신 오류 : 업데이트 주기 저장이 실패하였습니다. 인터넷 상태 및 서비스 상태를 확인하세요.');

            }

        }

        );
    },

    onPnl_zen_centerBoxReady: function(component, width, height, eOpts) {
        // 0. 공통 프로파일을 저장하는 스토어 생성

        var st_common_profile = Ext.getStore('st_zencom_profile');

        if(!st_common_profile){

            st_common_profile = Ext.create('Ext.data.Store', {

                'data' : [

                {	'@cid' : '00000000000000000000000000000000', '#text' : 'Any'	}

                ],
                'fields' : [
                {	'name' : '@cid'		},
                {	'name' : '#text'	}
                ],
                'storeId' : 'st_zencom_profile'

            });

        }

        // 0-1. 공통 프로파일 목록 불러오기

        // 1. 갱신 주기를 Load -> 최초 로드시 갱신주기의 값은 null 입니다. 이 때 기본값인 10초로 값이 초기화 됩니다.

        var me = this;
        var serviceName = 'ftSMC';
        var rpcFunc = 'getSMCSetting';
        var params = {

            'key' : Ext.encode('ui/zen/refresh_time')

        };

        var pnl_center = this.lookupReference('zen_dev_center');

        // 타이머 이벤트 연결

        component.on('zendevlistRefresh', component.refreshEventByZen);

        request_helper.xmlrpc_call_Ajax_Post(
        serviceName,
        rpcFunc,
        params,
        function(res){

            var devicePeriod = me.lookupReference('zen_dev_timeperiod');

            // 타이머 주기가 설정 된 후 타이머가 동작하도록 되어있습니다.

            if(!res){

                devicePeriod.setValue(10);
                DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME = 10000;

            }
            else{

                devicePeriod.setValue(res);
                DEVICE_COMMON_CONST.ZEN_UPGRADE_TIME = res * 1000;

            }

        }

        );
    },

    /*
        일 시 : 2015.09.10

        설 명 : 조건에 맞는 ZEN 장비를 검색합니다.
    */
    onTxf_searchstrKeypress1: function(textfield, e, eOpts) {
        var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicezenlist);

        if(e.getKey() === e.ENTER){

            if(gpn_rtmlist){

                var st_devlist = gpn_rtmlist.getStore();

                if(st_devlist){

                    searchDeviceName(st_devlist, textfield.getValue(), ['name', 'ip']);

                }

            }

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 검색 필드에 포커스가 입력되면, 선택된 모든 ZEN 장비를 선택해제합니다.
    */
    onTxf_searchstrFocus1: function(component, event, eOpts) {
        var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicezenlist);

        if(!gpn_rtmlist){

            return;

        }
        else{

            gpn_rtmlist.getSelectionModel().deselectAll();

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : 조건에 맞는 ZEN 장비를 검색합니다.
    */
    onBt_searchClick2: function(button, e, eOpts) {

        var txf_search = this.lookupReference('zen_rtm_searchval');
        var gpn_rtmlist = Ext.getCmp(RTM_COMMON_ID.devicezenlist);
        var escapeText = Ext.String.escapeRegex(txf_search.getValue());

        if(gpn_rtmlist){

            var st_devlist = gpn_rtmlist.getStore();

            if(st_devlist){

                searchDeviceName(st_devlist, escapeText, ['name', 'ip']);
            }

        }
    },

    onPanelBoxReady: function(component, width, height, eOpts) {
        component.on('zenmonitorrefresh', component.refreshEventByMonitor);
    },

    /*
        일 시 : 2015.09.18

        설 명 : 장비 / 모니터간 탭을 변경할 때 발생합니다. 장비와 RTM 타이머를 종료하고 ActiveTab index 를 지정합니다.
    */
    onPnl_zen_devmodeTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        var pnl_main = this.getView();
        var pnl_mode = this.lookupReference('zen_dev_mode');
        var pnl_group = this.lookupReference('zen_dev_group');
        var grp_select = pnl_group.getSelection()[0];
        var pnl_center = this.lookupReference('zen_dev_center');

        clearInterval(pnl_main.taskObj);

        if(newCard.reference === 'zen_dev_center'){

            pnl_mode.activeIndex = 0;

            me.createDeviceZENListView(grp_select);

        }
        else{

            pnl_mode.activeIndex = 1;

            me.createMonitorZENListView(grp_select);

        }
    },

    /*
        일 시 : 2015.09.10

        설 명 : ZEN 설정화면이 소멸될 때, 장비 상태를 조회하는 타이머를 삭제합니다.
    */
    onPnl_smc_device_zenBeforeDestroy: function(component, eOpts) {
        var pnl_main = this.getView();
        var gpn_zendevlist = this.lookupReference('zen_dev_devlist');

        if(gpn_zendevlist){

            var st_zendevlist = gpn_zendevlist.getStore();

            st_zendevlist.removeAll();

        }

        clearInterval(pnl_main.taskObj);

        ZEN_GROUP_RECURSIVE = false;
    }

});


Ext.define('SMC.view.pnl_objectList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_objectList',

    requires: [
        'SMC.view.tool_smc_object_control',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Paging'
    ],

    height: 668,
    id: 'pnl_objectList',
    width: 872,
    header: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'smc_object_control',
                    flex: 1,
                    dock: 'top',
                    listeners: {
                        afterrender: {
                            fn: me.onToolbarAfterRender1,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'toolbar',
                    findObjectList: function(treeSel, chkCond, searchKey, searchValue) {
                        // 2015.06.08 김민수 - 검색 함수 재정의 ==============================================================================================================================================================================
                        //
                        // 이 름 : findObjectList
                        //
                        // 설 명 : 검색 조건이 있을경우 조건에 맞는 객체를 조회하여 리턴한다.
                        //
                        // ===============================================================================================================================================================================================================

                        var me = Ext.getCmp('pnl_objectList');

                        var _gStore = me.down('gridpanel[itemId="gpn_objectList"]').getStore();

                        var condition = {};

                        if(searchValue){

                            if(chkCond){

                                switch(searchKey){

                                    case 'oName':
                                    condition.name = searchValue;
                                    condition.op_in = true;
                                    break;
                                    case 'IPaddr':
                                    condition.ip = searchValue;
                                    condition.op_in = true;
                                    break;
                                    case 'srcPort':
                                    condition.sport = Number(searchValue);
                                    condition.op_in = true;
                                    break;
                                    case 'dstPort':
                                    condition.dport = Number(searchValue);
                                    condition.op_in = true;
                                    break;
                                }

                            }
                            else{

                                switch(searchKey){

                                    case 'oName':
                                    condition.name = searchValue;
                                    condition.op_eq	= true;
                                    break;

                                    case 'IPaddr':
                                    condition.ip = searchValue;
                                    condition.op_eq = true;
                                    break;

                                    case 'srcPort':
                                    condition.sport = Number(searchValue);
                                    condition.op_eq = true;
                                    break;

                                    case 'dstPort':
                                    condition.dport = Number(searchValue);
                                    condition.op_eq = true;
                                    break;

                                }

                            }

                            if(treeSel){

                                if(treeSel.raw._kind !== ""){

                                    condition.kind = [treeSel.raw._kind];

                                }
                                else if(treeSel.raw.gtype !== ""){

                                    condition.kind = [treeSel.raw.gtype];
                                }

                            }
                            else{

                                condition.kind = ['obj_ip_v4_addr', 'obj_ip_v6_addr', 'obj_ip_v4_group', 'obj_ip_v6_group', 'obj_ip_v6_header', 'obj_svc_port', 'obj_svc_group', 'obj_svc_http',
                                'obj_svc_rpc', 'obj_svc_url', 'obj_schedule', 'obj_ipsec_isakmpsa', 'obj_ipsec_ipsecsa', 'obj_ipsec_host', 'obj_ipsec_peer', 'obj_qos',
                                'obj_session_limit', 'obj_usr_list', 'obj_ssl_svr', 'obj_ssl_svr_group', 'obj_ssl_usr_list', 'obj_usr_group', 'obj_waf'];
                            }

                            if(condition){

                                _gStore.getProxy().extraParams = {

                                    'condition' : Ext.encode(condition)

                                };

                                _gStore.getProxy().url = 'api/ftSMC/findObjectList/';

                                _gStore.loadPage(1);

                            }

                        }
                    },
                    flex: 1,
                    dock: 'top',
                    itemId: 'tool_obj_search',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_ObjectCondition',
                            width: 200,
                            fieldLabel: '검색조건',
                            labelPad: 2,
                            labelWidth: 70,
                            value: 'oName',
                            size: 30,
                            editable: false,
                            displayField: 'cond_text',
                            queryMode: 'local',
                            store: 'st_ObjectCBCondition',
                            valueField: 'cond_id'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_ObjectCondition',
                            fieldLabel: 'Label',
                            hideLabel: true,
                            boxLabel: '포함',
                            checked: true
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_ObjectSearchText',
                            fieldLabel: 'Label',
                            hideLabel: true,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: {
                                    fn: me.onTxf_ObjectSearchTextKeypress,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var treeSel = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

                                var tool_search = button.up('[itemId=tool_obj_search]');

                                var chkCond = tool_search.down('[itemId=ck_ObjectCondition]').getValue();
                                var searchKey = tool_search.down('[itemId=cmb_ObjectCondition]').getValue();
                                var searchValue = tool_search.down('[itemId=txf_ObjectSearchText]').getValue();

                                tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);
                            },
                            itemId: 'bt_objectSearch',
                            width: 100,
                            text: '검색'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    gridRefresh: function(type, data, option) {
                        var _grid = this;
                        var _gStore = _grid.getStore();

                        var me = Ext.getCmp('pnl_objectList');

                        var toolbar_control = me.down('toolbar[itemId="tool_smc_object_control"]');
                        var toolbar_control_group = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].down('toolbar[itemId="tool_smc_object_group_control"]');
                        var recursive_option = toolbar_control_group.down('button[itemId="recursiveGroup"]').pressed;

                        // 2015.06.08 김민수 - 찾기 컴포넌트 정의

                        var tool_search = me.down('[itemId=tool_obj_search]');

                        var treeSel = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

                        var chkCond = tool_search.down('[itemId=ck_ObjectCondition]').getValue();
                        var searchKey = tool_search.down('[itemId=cmb_ObjectCondition]').getValue();
                        var searchValue = tool_search.down('[itemId=txf_ObjectSearchText]').getValue();

                        switch(type)
                        {
                            case 'add':

                            if(data['@cid'] !== "00000000000000000000000000000000")
                            {
                                if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
                                {
                                    _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
                                }

                                toolbar_control.down('button[itemId="addObject"]').disable();
                                toolbar_control.down('button[itemId="modObject"]').disable();
                                toolbar_control.down('button[itemId="delObject"]').disable();

                                _gStore.getProxy().extraParams = {
                                    g_cid : Ext.encode(data['@groupcid']),
                                    isRecursive : Ext.encode(recursive_option)
                                };

                                _gStore.loadPage(_gStore.currentPage, {
                                    callback: function(){

                                        toolbar_control.down('button[itemId="addObject"]').enable();
                                    }
                                });
                            }

                            break;
                            case 'mod':

                            if(data)
                            {
                                _gStore.each(function(store_data, idx){

                                    if(data['@cid'] === store_data.data['@cid'])
                                    {
                                        store_data.set('name', data.name);
                                        store_data.set('desc', data.desc);
                                        store_data.commit();
                                        return false;
                                    }

                                });
                            }

                            break;
                            case 'del':

                            if(data.length > 0)
                            {
                                Ext.each(data, function(record, idx){

                                    _gStore.remove(record);

                                });
                            }

                            break;
                            case 'addScript':

                            if(data > 0)
                            {
                                if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
                                {
                                    _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
                                }

                                toolbar_control.down('button[itemId="addObject"]').disable();
                                toolbar_control.down('button[itemId="modObject"]').disable();
                                toolbar_control.down('button[itemId="delObject"]').disable();

                                _gStore.getProxy().extraParams = {
                                    g_cid : Ext.encode(Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0].raw.cid),
                                    isRecursive : Ext.encode(recursive_option)
                                };

                                _gStore.loadPage(_gStore.currentPage, {
                                    callback: function(){

                                        toolbar_control.down('button[itemId="addObject"]').enable();
                                    }
                                });
                            }

                            break;
                            case 'copy':

                            if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
                            {
                                _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
                            }

                            toolbar_control.down('button[itemId="addObject"]').disable();
                            toolbar_control.down('button[itemId="modObject"]').disable();
                            toolbar_control.down('button[itemId="delObject"]').disable();

                            _gStore.getProxy().extraParams = {
                                g_cid : Ext.encode(Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0].raw.cid),
                                isRecursive : Ext.encode(recursive_option)
                            };

                            _gStore.loadPage(_gStore.currentPage, {
                                callback: function(){

                                    toolbar_control.down('button[itemId="addObject"]').enable();
                                }
                            });
                            break;
                            case 'treeSelect':

                            if(data.raw._kind){

                                if(searchValue){

                                    tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);

                                    return;

                                }
                                else{

                                    _gStore.getProxy().url = 'api/ftSMC/getObjectList/';

                                }

                                var select_record = _grid.getSelectionModel().getSelection()[0];
                                var select_grid_click = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].select_grid_click;

                                if(select_grid_click && select_record)
                                {
                                    _gStore.getProxy().extraParams = {
                                        g_cid : Ext.encode(data.raw.cid),
                                        isRecursive : Ext.encode(false)
                                    };

                                    _gStore.loadPage(1, {
                                        callback: function(){

                                            Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].searchObject(data.raw.cid, _gStore, _grid,
                                            Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0], select_record);

                                            if(data.raw._kind !== 'obj_ip_eth')
                                            {
                                                toolbar_control_group.down('button[itemId="addGroup"]').enable();
                                                toolbar_control.down('button[itemId="addObject"]').enable();
                                                toolbar_control.down('button[itemId="modObject"]').disable();
                                                toolbar_control.down('button[itemId="delObject"]').disable();

                                                if(data.raw['default'] === true)
                                                {
                                                    toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                                    toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                                }
                                                else
                                                {
                                                    toolbar_control_group.down('button[itemId="modGroup"]').enable();
                                                    toolbar_control_group.down('button[itemId="delGroup"]').enable();
                                                }

                                                toolbar_control_group.down('button[itemId="openGroup"]').enable();
                                                toolbar_control_group.down('button[itemId="closeGroup"]').enable();

                                            }
                                            else
                                            {
                                                toolbar_control_group.down('button[itemId="addGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                                toolbar_control.down('button[itemId="addObject"]').disable();
                                                toolbar_control.down('button[itemId="modObject"]').disable();
                                                toolbar_control.down('button[itemId="delObject"]').disable();
                                                toolbar_control_group.down('button[itemId="openGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="closeGroup"]').disable();
                                            }
                                        }
                                    });
                                }
                                else
                                {
                                    _gStore.getProxy().extraParams = {
                                        g_cid : Ext.encode(data.raw.cid),
                                        isRecursive : Ext.encode(recursive_option)
                                    };

                                    _gStore.loadPage(1, {
                                        callback: function(){

                                            if(data.raw._kind !== 'obj_ip_eth')
                                            {
                                                toolbar_control_group.down('button[itemId="addGroup"]').enable();
                                                toolbar_control.down('button[itemId="addObject"]').enable();
                                                toolbar_control.down('button[itemId="modObject"]').disable();
                                                toolbar_control.down('button[itemId="delObject"]').disable();

                                                if(data.raw['default'] === true)
                                                {
                                                    toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                                    toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                                }
                                                else
                                                {
                                                    toolbar_control_group.down('button[itemId="modGroup"]').enable();
                                                    toolbar_control_group.down('button[itemId="delGroup"]').enable();
                                                }

                                                toolbar_control_group.down('button[itemId="openGroup"]').enable();
                                                toolbar_control_group.down('button[itemId="closeGroup"]').enable();

                                            }
                                            else
                                            {
                                                toolbar_control_group.down('button[itemId="addGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                                toolbar_control.down('button[itemId="addObject"]').disable();
                                                toolbar_control.down('button[itemId="modObject"]').disable();
                                                toolbar_control.down('button[itemId="delObject"]').disable();
                                                toolbar_control_group.down('button[itemId="openGroup"]').disable();
                                                toolbar_control_group.down('button[itemId="closeGroup"]').disable();
                                            }
                                        }
                                    });
                                }
                            }
                            else if(data.raw._kind === null || typeof data.raw._kind === 'undefined' || data.raw._kind === '')
                            {

                                if(searchValue){

                                    tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);

                                    return;

                                }
                                else{

                                    _gStore.getProxy().url = 'api/ftSMC/getObjectList/';

                                }

                                _gStore.getProxy().extraParams = {
                                    g_cid : Ext.encode(null),
                                    isRecursive : Ext.encode(false)
                                };

                                toolbar_control_group.down('button[itemId="addGroup"]').disable();
                                toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                toolbar_control.down('button[itemId="addObject"]').disable();
                                toolbar_control.down('button[itemId="modObject"]').disable();
                                toolbar_control.down('button[itemId="delObject"]').disable();
                                toolbar_control_group.down('button[itemId="openGroup"]').enable();
                                toolbar_control_group.down('button[itemId="closeGroup"]').enable();


                                _gStore.loadPage(1);
                            }

                            break;

                        }
                    },
                    flex: 1,
                    border: false,
                    height: 678,
                    itemId: 'gpn_objectList',
                    width: 850,
                    autoScroll: true,
                    header: false,
                    title: 'My Grid Panel',
                    store: 'st_ObjectGrid',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            width: 70,
                            resizable: true,
                            align: 'center',
                            text: 'No'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                return value;
                            },
                            width: 380,
                            dataIndex: 'name',
                            text: '객체명'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 1180,
                            dataIndex: 'desc',
                            text: '객체 설명'
                        }
                    ],
                    viewConfig: {
                        id: 'gdv_objectList',
                        loadMask: true,
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {
                                ddGroup: 'objectlist-to-grouptree',
                                enableDrop: false
                            })
                        ]
                    },
                    listeners: {
                        itemdblclick: {
                            fn: me.onGpn_objectListItemDblClick,
                            scope: me
                        },
                        afterrender: {
                            fn: me.onGpn_objectListAfterRender,
                            scope: me
                        }
                    },
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        listeners: {
                            select: {
                                fn: me.onCheckboxModelSelect,
                                scope: me
                            },
                            deselect: {
                                fn: me.onCheckboxModelDeselect,
                                scope: me
                            }
                        }
                    }),
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            itemId: 'ptb_objectList',
                            width: 360,
                            afterPageText: '전체 페이지 {0}',
                            beforePageText: '페이지',
                            displayInfo: true,
                            displayMsg: '{2} 결과 중 {0} - {1}',
                            emptyMsg: '결과 없음',
                            firstText: '처음 페이지',
                            lastText: '마지막 페이지',
                            nextText: '다음 페이지',
                            prevText: '이전 페이지',
                            refreshText: '새로고침',
                            store: 'st_ObjectGrid'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_objectListAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onToolbarAfterRender1: function(component, eOpts) {
        var me_objectList = Ext.getCmp('pnl_objectList');

        var addBtn = component.down('[itemId=addObject]');
        var modBtn = component.down('[itemId=modObject]');
        var delBtn = component.down('[itemId=delObject]');

        addBtn.on('click', function(){

            me_objectList.addObject();
        });

        modBtn.on('click', function(){

            me_objectList.modObject();
        });

        delBtn.on('click', function(){

            me_objectList.delObject();

        });

    },

    onTxf_ObjectSearchTextKeypress: function(textfield, e, eOpts) {
        // 2015.06.08 김민수 - 검색 함수 재정의 ================================================================================================================================================================================
        //
        // 일 시 : 2015.06.08
        //
        // 설 명 : findObject를 Tree Select 에서 사용할 수 있도록 재정의함
        //
        // =================================================================================================================================================================================================================

        var treeSel = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

        var tool_search = textfield.up('[itemId=tool_obj_search]');

        var chkCond = tool_search.down('[itemId=ck_ObjectCondition]').getValue();
        var searchKey = tool_search.down('[itemId=cmb_ObjectCondition]').getValue();
        var searchValue = textfield.getValue();

        if(e.getKey() === e.ENTER){

            tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);

        }
    },

    onGpn_objectListItemDblClick: function(dataview, record, item, index, e, eOpts) {
        Ext.getCmp('pnl_objectList').modObject();
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var toolbar_control = Ext.getCmp('pnl_objectList').down('toolbar[itemId="tool_smc_object_control"]');

        if(record.data._kind)
        {
            if(record.data._kind === 'obj_ip_eth')
            {
                toolbar_control.down('button[itemId="modObject"]').disable();
                toolbar_control.down('button[itemId="delObject"]').disable();
            }
            else
            {
                toolbar_control.down('button[itemId="modObject"]').enable();
                toolbar_control.down('button[itemId="delObject"]').enable();
            }
        }
        else
        {
            toolbar_control.down('button[itemId="modObject"]').disable();
            toolbar_control.down('button[itemId="delObject"]').disable();
        }
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var toolbar_control = Ext.getCmp('pnl_objectList').down('toolbar[itemId="tool_smc_object_control"]');

        if(rowmodel.selected.items.length < 1)
        {
            toolbar_control.down('button[itemId="modObject"]').disable();
            toolbar_control.down('button[itemId="delObject"]').disable();
        }
    },

    onGpn_objectListAfterRender: function(component, eOpts) {
        component.getStore().removeAll();
        component.down('pagingtoolbar[itemId="ptb_objectList"]').onLoad();
    },

    onPnl_objectListAfterRender: function(component, eOpts) {
        component.down('gridpanel[itemId="gpn_objectList"]').getStore().removeAll();

        addExporter(component, 'exportGrid', '#gpn_objectList', Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0], 'excel');

        var obj_Context_Array = [

            {
                'name' : '객체 등록',
                'itemId' : 'id_objectAdd',
                'children' : null,
                'callback' : function(){
                    component.addObject();
                }
            },
            {
                'name' : '객체 수정',
                'itemId' : 'id_objectMod',
                'children': null,
                'callback' : function(){
                    component.modObject();
                }
            },
            {
                'name' : '객체 삭제',
                'itemId' : 'id_objectDel',
                'children' : null,
                'callback' : function(){
                    component.delObject();
                }
            },
            {
                'name' : '객체 복사',
                'itemId' : 'id_objectCopy',
                'children' : null,
                'callback' : function(){
                    component.copyObject();
                }
            },
            {
                'name' : '연결 객체',
                'itemId' : 'id_objectLink',
                'children' : null,
                'callback' : function(){
                    component.linkObject();
                }
            },
            {
                'name' : '그룹 찾기',
                'itemId' : 'id_objectSearch',
                'children' : null,
                'callback' : function(){
                    component.searchGroup();
                }
            },
            {
                'name' : '엑셀 파일로 목록 저장',
                'itemId' : 'id_objectExport',
                'children' : [

                    {
                        'name' : '현재 목록 저장',
                        'itemId' : 'id_objectExportPage',
                        'children' : null,
                        'callback' : function(){

                            var trpn_menu = component.up().down('[itemId=trpn_objectMenu]');

                            component.exportXlsxlByList('condition', trpn_menu);

                        }
                    },
                    {
                        'name' : '전체 목록 저장',
                        'itemId' : 'id_objectExportTotal',
                        'children' : null,
                        'callback' : function(){

                            var trpn_menu = component.up().down('[itemId=trpn_objectMenu]');

                            component.exportXlsxlByList('total', trpn_menu);

                        }
                    }

                ],
                'callback' : null
            },
            {
                'name' : '객체 일괄 등록',
                'itemId' : 'id_objectScript',
                'children' : null,
                'callback' : function(){
                    component.addScript();
                }
            },
            {
                'name' : 'IPSEC 대상 일괄 편집',
                'itemId' : 'id_ipsec_compile',
                'children' : null,
                'callback' : function(){

                    component.addBatchIpsecObject();

                }
            }
        ];

        var contextCallback = function(menuInstance){

            var objectList = component.down('gridpanel[itemId="gpn_objectList"]');

            var tree_select = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];

            menuInstance.down('[itemId=id_objectAdd]').enable();
            menuInstance.down('[itemId=id_objectMod]').enable();
            menuInstance.down('[itemId=id_objectDel]').enable();
            menuInstance.down('[itemId=id_objectCopy]').enable();
            menuInstance.down('[itemId=id_objectLink]').enable();
            menuInstance.down('[itemId=id_objectSearch]').enable();
            menuInstance.down('[itemId=id_objectExport]').enable();
            menuInstance.down('[itemId=id_objectScript]').enable();
            menuInstance.down('[itemId=id_ipsec_compile]').enable();

            if(!objectList.getSelectionModel().getSelection()[0])
            {
                menuInstance.down('[itemId=id_objectSearch]').disable();
            }

            if(tree_select)
            {
                if(!tree_select.raw._kind || tree_select.raw._kind === 'obj_ip_eth')
                {
                    menuInstance.down('[itemId=id_objectAdd]').disable();
                    menuInstance.down('[itemId=id_objectMod]').disable();
                    menuInstance.down('[itemId=id_objectDel]').disable();
                    menuInstance.down('[itemId=id_objectCopy]').disable();
                    menuInstance.down('[itemId=id_objectLink]').disable();
                    menuInstance.down('[itemId=id_objectScript]').disable();
                    menuInstance.down('[itemId=id_ipsec_compile]').disable();
                }
                else
                {
                    if(!objectList.getSelectionModel().getSelection()[0])
                    {
                        menuInstance.down('[itemId=id_objectMod]').disable();
                        menuInstance.down('[itemId=id_objectDel]').disable();
                        menuInstance.down('[itemId=id_objectCopy]').disable();
                        menuInstance.down('[itemId=id_objectLink]').disable();
                        menuInstance.down('[itemId=id_ipsec_compile]').disable();
                    }

                    if(!tree_select.raw._kind)
                    {
                        menuInstance.down('[itemId=id_objectAdd]').disable();
                    }

                    if(tree_select.raw._kind !== 'obj_ip_v4_addr' && tree_select.raw._kind !== 'obj_ip_v6_addr' &&
                       tree_select.raw._kind !== 'obj_svc_port' && tree_select.raw._kind !== 'obj_ipsec_host')
                    {
                        menuInstance.down('[itemId=id_objectScript]').disable();
                    }

                    if(tree_select.raw._kind !== 'obj_ipsec_peer')
                    {
                        menuInstance.down('[itemId=id_ipsec_compile]').disable();
                    }
                }
            }
            else
            {
                menuInstance.down('[itemId=id_objectAdd]').disable();
                menuInstance.down('[itemId=id_objectMod]').disable();
                menuInstance.down('[itemId=id_objectDel]').disable();
                menuInstance.down('[itemId=id_objectCopy]').disable();
                menuInstance.down('[itemId=id_objectLink]').disable();
                menuInstance.down('[itemId=id_objectScript]').disable();
                menuInstance.down('[itemId=id_ipsec_compile]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

        var _treeTarget = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];

        component.groupTreeDropTarget = new Ext.dd.DropTarget(_treeTarget.body.dom ,{
            ddGroup : 'objectlist-to-grouptree',

            notifyEnter: function(ddSource, e, data) {

                _treeTarget.isDD = true;
                _treeTarget.on('itemmouseup', component.onTreeNodeMouseUp, component);
            },

            notifyDrop: function(ddSource, e, data) {

                 return true;
            }

        });

        var _tv = _treeTarget.getView();

        _tv.on('drop', function(node, data, overModel, dropPosition, eOpts){

            component.onTreeNodeAdd(overModel, data.records[0]);

        });
    },

    addObject: function() {
        var gridObj = this.down('gridpanel[itemId="gpn_objectList"]');
        var record	= Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];
        var object_window;

        if(record)
        {
            switch(record.raw._kind)
            {
                case "obj_ip_v4_addr":
                    object_window = Ext.create('SMC.view.pnl_object_ipv4_addr');
                    break;
                case "obj_ip_v6_addr":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_addr');
                    break;
                case "obj_ip_v4_group":
                    object_window = Ext.create('SMC.view.pnl_object_ipv4_addr_group');
                    break;
                case "obj_ip_v6_group":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_addr_group');
                    break;
                case "obj_ip_v6_header":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_header');
                    break;
                case "obj_svc_port":
                    object_window = Ext.create('SMC.view.pnl_object_svc_port');
                    break;
                case "obj_svc_group":
                    object_window = Ext.create('SMC.view.pnl_object_svc_group');
                    break;
                case "obj_svc_http":
                    object_window = Ext.create('SMC.view.pnl_object_svc_http');
                    break;
                case "obj_svc_rpc":
                    object_window = Ext.create('SMC.view.pnl_object_svc_rpc');
                    break;
                case "obj_svc_url":
                    object_window = Ext.create('SMC.view.pnl_object_svc_url');
                    break;
                case "obj_schedule":
                    object_window = Ext.create('SMC.view.pnl_object_schedule');
                    break;
                case "obj_ipsec_isakmpsa":
                    object_window = Ext.create('SMC.view.pnl_object_isakmp_sa');
                    break;
                case "obj_ipsec_ipsecsa":
                    object_window = Ext.create('SMC.view.pnl_object_ipsec_sa');
                    break;
                case "obj_ipsec_host":
                    object_window = Ext.create('SMC.view.pnl_object_sec_host');
                    break;
                case "obj_ipsec_peer":
                    object_window = Ext.create('SMC.view.pnl_object_ipsec_gate');
                    break;
                case "obj_qos":
                    object_window = Ext.create('SMC.view.pnl_object_qos');
                    break;
                case "obj_session_limit":
                    object_window = Ext.create('SMC.view.pnl_object_session_limit');
                    break;
                case "obj_usr_list":
                    object_window = Ext.create('SMC.view.pnl_object_user');
                    break;
                case "obj_ssl_svr":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_server');
                    break;
                case "obj_ssl_svr_group":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_server_group');
                    break;
                case "obj_ssl_usr_list":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_user_group');
                    record.raw._kind = 'obj_ssl_usr';
                    break;
                case "obj_usr_group":
                    object_window = Ext.create('SMC.view.pnl_object_user_group');
                    break;
                case "obj_waf":
                    object_window = Ext.create('SMC.view.pnl_object_waf');
                    break;
                default:
                    break;
            }

            if(object_window)
            {
                var _svc = 'ftSMC',
                    _func = 'getObjectDefault',
                    _params = {
                        kind : Ext.encode(record.raw._kind)
                    };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response){

                        if(response)
                        {
                            response['@groupcid'] = record.raw.cid;
                            object_window.isNew = true;

                            object_window.loadData(response);

                            object_window.on('destroy', function() {

                                gridObj.gridRefresh('add', object_window.object);
                            });
                        }
                    }
                );
            }
        }
    },

    modObject: function() {
        var gridObj = this.down('gridpanel[itemId="gpn_objectList"]');
        var record = gridObj.getSelectionModel().getSelection()[0];
        var object_window;

        if(record)
        {
            switch(record.data._kind)
            {
                case "obj_ip_v4_addr":
                    object_window = Ext.create('SMC.view.pnl_object_ipv4_addr');
                    break;
                case "obj_ip_v6_addr":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_addr');
                    break;
                case "obj_ip_v4_group":
                    object_window = Ext.create('SMC.view.pnl_object_ipv4_addr_group');
                    break;
                case "obj_ip_v6_group":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_addr_group');
                    break;
                case "obj_ip_v6_header":
                    object_window = Ext.create('SMC.view.pnl_object_ipv6_header');
                    break;
                case "obj_svc_port":
                    object_window = Ext.create('SMC.view.pnl_object_svc_port');
                    break;
                case "obj_svc_group":
                    object_window = Ext.create('SMC.view.pnl_object_svc_group');
                    break;
                case "obj_svc_http":
                    object_window = Ext.create('SMC.view.pnl_object_svc_http');
                    break;
                case "obj_svc_rpc":
                    object_window = Ext.create('SMC.view.pnl_object_svc_rpc');
                    break;
                case "obj_svc_url":
                    object_window = Ext.create('SMC.view.pnl_object_svc_url');
                    break;
                case "obj_schedule":
                    object_window = Ext.create('SMC.view.pnl_object_schedule');
                    break;
                case "obj_ipsec_isakmpsa":
                    object_window = Ext.create('SMC.view.pnl_object_isakmp_sa');
                    break;
                case "obj_ipsec_ipsecsa":
                    object_window = Ext.create('SMC.view.pnl_object_ipsec_sa');
                    break;
                case "obj_ipsec_host":
                    object_window = Ext.create('SMC.view.pnl_object_sec_host');
                    break;
                case "obj_ipsec_peer":
                    object_window = Ext.create('SMC.view.pnl_object_ipsec_gate');
                    break;
                case "obj_qos":
                    object_window = Ext.create('SMC.view.pnl_object_qos');
                    break;
                case "obj_session_limit":
                    object_window = Ext.create('SMC.view.pnl_object_session_limit');
                    break;
                case "obj_usr_list":
                    object_window = Ext.create('SMC.view.pnl_object_user');
                    break;
                case "obj_ssl_svr":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_server');
                    break;
                case "obj_ssl_svr_group":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_server_group');
                    break;
                case "obj_ssl_usr_list":
                    object_window = Ext.create('SMC.view.pnl_object_ssl_user_group');
                    record.data._kind = 'obj_ssl_usr';
                    break;
                case "obj_usr_group":
                    object_window = Ext.create('SMC.view.pnl_object_user_group');
                    break;
                case "obj_waf":
                    object_window = Ext.create('SMC.view.pnl_object_waf');
                    break;
                default:
                    break;
            }

            if(object_window)
            {
                var _svc = 'ftSMC',
                    _func = 'getObject',
                    _params = {
                        cid : Ext.encode(record.data['@cid'])
                    };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response){

                        object_window.loadData(response);

                        object_window.on('destroy', function() {
                            gridObj.gridRefresh('mod', object_window.object);
                        });
                    }
                );
            }
        }
    },

    delObject: function() {
        var obj_view = this.up('panel');
        var gridObj = this.down('gridpanel[itemId="gpn_objectList"]');
        var obj_list = gridObj.getSelectionModel().getSelection();
        var obj_ip_list = [];

        Ext.each(obj_list, function(record, idx){
            obj_ip_list.push(record.data['@cid']);
        });

        if(obj_ip_list)
        {
            Ext.MessageBox.show({
                title:'삭제',
                msg: '삭제 하시겠습니까?',
                buttonText: {yes: "확인",no: "취소"},
                fn: function(btn){
                    if(btn === 'yes')
                    {
                        var _svc = 'ftSMC',
                            _func = 'delObject',
                            _params = {
                                cid : Ext.encode(obj_ip_list)
                            };

                        obj_view.setLoading(true);

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                obj_view.setLoading(false);

                                if(response)
                                {
                                    if(response.errorList)
                                    {
                                        if(response.errorList.length > 0)
                                        {
                                            Ext.create('SMC.view.pnl_object_delete_fail').loadData(response.errorList);

                                            var fail_array = [];

                                            Ext.each(response.errorList, function(record, idx){

                                                fail_array.push(record['@cid']);
                                            });

                                            obj_list = obj_list.filter(function(val) {
                                                return fail_array.indexOf(val.data['@cid']) === -1;
                                            });
                                        }
                                    }

                                    if(gridObj)
                                    {
                                        gridObj.gridRefresh('del', obj_list);
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
    },

    linkObject: function() {
        var me = this;

        var record = me.down('gridpanel[itemId="gpn_objectList"]').getSelectionModel().getSelection()[0];
        var cid = record.data['@cid'];
        var obj_view = me.up('panel');

        var _svc = 'ftSMC',
            _func = 'getObjectLinkInfo',
            _params = {
                cid	: Ext.encode(cid),
                mode : Ext.encode('parent')
            };

        obj_view.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                _params = {
                    cid	: Ext.encode(cid),
                    mode : Ext.encode('children')
                };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response2){

                        obj_view.setLoading(false);

                        Ext.create('SMC.view.pnl_object_hierarchy').loadData(record.data, response, response2);
                    }
                );
            }
        );
    },

    searchGroup: function() {
        var me = this;

        var record = me.down('gridpanel[itemId="gpn_objectList"]').getSelectionModel().getSelection()[0];
        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];

        Ext.each(treeObj.getRootNode().childNodes, function(child){

            if(child.raw.gtype === 'obj_ip' || child.raw.gtype === 'obj_svc' || child.raw.gtype === 'obj_ipsec' ||
               child.raw.gtype === 'obj_ssl' || child.raw.gtype === 'obj_usr')
            {
                if(child.childNodes.length > 0)
                {
                    for(var i = 0; i < child.childNodes.length; i++)
                    {
                        if(child.childNodes[i].raw.gtype === record.data._kind)
                        {
                            if(child.childNodes[i].raw.cid === record.data['@groupcid'])
                            {
                                if(!treeObj.select_grid_click)
                                {
                                    treeObj.select_grid_click = true;
                                }

                                if(treeObj.getSelectionModel().getSelection()[0])
                                {
                                    treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                                }

                                treeObj.tree_expand(child.childNodes[i]);

                                treeObj.getSelectionModel().select(child.childNodes[i], true);
                                return false;
                            }
                            else if(child.childNodes[i].childNodes.length > 0)
                            {
                                me.searchChildGroup(record.data['@groupcid'], child.childNodes[i].childNodes);
                            }
                        }
                    }
                }

            }
            else
            {
                if(child.raw.gtype === record.data._kind)
                {
                    if(child.raw.cid === record.data['@groupcid'])
                    {
                        if(!treeObj.select_grid_click)
                        {
                            treeObj.select_grid_click = true;
                        }

                        if(treeObj.getSelectionModel().getSelection()[0])
                        {
                            treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                        }

                        treeObj.tree_expand(child);

                        treeObj.getSelectionModel().select(child, true);

                        return false;
                    }
                    else if(child.childNodes.length > 0)
                    {
                        me.searchChildGroup(record.data['@groupcid'], child.childNodes);
                    }
                }
            }
        });
    },

    searchChildGroup: function(cid, childNodes) {
        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];

        for(var i=0; i<childNodes.length; i++)
        {
            if(cid === childNodes[i].raw.cid)
            {
                if(!treeObj.select_grid_click)
                {
                    treeObj.select_grid_click = true;
                }

                if(treeObj.getSelectionModel().getSelection()[0])
                {
                    treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                }

                treeObj.tree_expand(childNodes[i]);
                treeObj.getSelectionModel().select(childNodes[i], true);

                return false;
            }

            if(childNodes[i].childNodes.length > 0)
            {
                this.searchChildGroup(cid, childNodes[i].childNodes);
            }
        }
    },

    treeExpand: function(node) {
        var parent = _node.parentNode;

        if(parent)
        {
            Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].expandNode(parent);
            Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0](parent);
        }
    },

    gridExport: function() {
        exportGrid(this, 'exportGrid');
    },

    addScript: function() {
        var gridObj = this.down('gridpanel[itemId="gpn_objectList"]');
        var record = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0];
        var object_window;

        if(record)
        {
            object_window = Ext.create('SMC.view.pnl_object_script');
            object_window.loadData(record.raw._kind);

            object_window.on('destroy', function() {
                gridObj.gridRefresh('addScript', object_window.request_count);
            });
        }
    },

    copyObject: function() {
        var gridObj = this.down('gridpanel[itemId="gpn_objectList"]');
        var record = gridObj.getSelectionModel().getSelection()[0];

        if(record)
        {
            Ext.MessageBox.show({
                title:'복사',
                msg: '선택된 객체를 복사 하시겠습니까?',
                buttonText: {yes: "확인",no: "취소"},
                fn: function(btn){
                    if(btn === 'yes')
                    {
                        var _svc = 'ftSMC',
                            _func = 'copyObject',
                            _params = {
                                cid : Ext.encode(record.data['@cid'])
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                if(gridObj)
                                {
                                    gridObj.gridRefresh('copy');
                                }
                            }
                        );
                    }
                }
            });
        }
    },

    exportXlsxlByList: function(ex_type, treeobj) {
        // exportxlsxByList ==========================================================================================================================================================================================
        //
        // 일 시 : 2015.06.05
        //
        // 설 명 : 출력된 객체의 목록을 출력합니다.
        //
        // 수 정 :
        //
        // - (2015.06.05 김민수 : 객체 리스트 출력 기능 정의)
        //
        // ===========================================================================================================================================================================================================

        // 0. 공통 변수 선언 ============================================================================================================================================================================================

        // isRecursive

        var isRecursive = treeobj.down('[itemId=tool_smc_object_group_control]').down('[itemId=recursiveGroup]').pressed;

        // select Tree item

        var obj_groupsel = treeobj.getSelectionModel().getSelection()[0];
        var page_store = this.down('[itemId=ptb_objectList]').getStore();

        // object Name

        var tool_container = this.down('[itemId=tool_obj_search]');
        var cmb_cond = tool_container.down('[itemId=cmb_ObjectCondition]');
        var chk_cond = tool_container.down('[itemId=ck_ObjectCondition]');
        var txf_search = tool_container.down('[itemId=txf_ObjectSearchText]');

        var searchKey = cmb_cond.getValue();
        var searchValue = txf_search.getValue();

        // 1. 조건 검색 파라미터 설정 ======================================================================================================================================================================================

        // 1-1. 전체 페이지 검색 파라미터

        if(ex_type === 'total'){

            if(!obj_groupsel){

                Ext.Msg.show({
                    'title': '객체목록 출력 에러',
                    'msg': '객체 그룹을 선택하세요.',
                    'buttons': Ext.Msg.OK,
                    'icon': Ext.Msg.ERROR
                });

                return;

            }

            // 1-2. 전체 페이지 카운트 구하기 (페이징 100개 기준)

            var totalCount = page_store.getTotalCount();

            var svc = 'ftSMC',
                func = 'exportObjects',
                params = {

                    'condition' : function(){

                        var condStr = {};

                        // 1-3. 검색 조건이 비어있다면 전체 출력

                        if(searchValue === ''){

                            condStr.gcid = obj_groupsel.raw.cid;
                            condStr.isRecursive = isRecursive;

                        }

                        // 1-4. 검색 조건이 들어있다면 검색 후 출력

                        else{

                            condStr.kind = obj_groupsel.raw._kind;

                            if(searchKey === 'oName'){

                                condStr.name = searchValue;

                            }

                            if(searchKey === 'IPaddr'){

                                condStr.ip = searchValue;

                            }

                            if(searchKey === 'srcPort'){

                                condStr.sport = searchValue;

                            }

                            if(searchKey === 'dstPort'){

                                condStr.dport = searchValue;

                            }

                            if(chk_cond.getValue()){

                                condStr.op_in = true;

                            }
                            else{

                                condStr.op_eq = true;

                            }

                        }

                        return Ext.encode(condStr);

                    }(),
                    'start' : Ext.encode(0),
                    'limit' : Ext.encode(totalCount)

                };

        }

        // 1-3. 현재 페이지 출력

        else{

            if(!obj_groupsel){

                Ext.Msg.show({
                    'title': '객체목록 출력 에러',
                    'msg': '객체 그룹을 선택하세요.',
                    'buttons': Ext.Msg.OK,
                    'icon': Ext.Msg.ERROR
                });

                return;

            }

            var svc = 'ftSMC',
                func = 'exportObjects',
                paging = 100;

            var params = {

                'condition' : function(){

                    var condStr = {};

                    // 1-3. 검색 조건이 비어있다면 전체 출력

                    if(searchValue === ''){

                        condStr.gcid = obj_groupsel.raw.cid;
                        condStr.isRecursive = isRecursive;

                    }

                    // 1-4. 검색 조건이 들어있다면 검색 후 출력

                    else{

                        condStr.kind = obj_groupsel.raw._kind;

                        if(searchKey === 'oName'){

                            condStr.name = searchValue;

                        }

                        if(searchKey === 'IPaddr'){

                            condStr.ip = searchValue;

                        }

                        if(searchKey === 'srcPort'){

                            condStr.sport = searchValue;

                        }

                        if(searchKey === 'dstPort'){

                            condStr.dport = searchValue;

                        }

                        if(chk_cond.getValue()){

                            condStr.op_in = true;

                        }
                        else{

                            condStr.op_eq = true;

                        }

                    }

                    return Ext.encode(condStr);

                }(),
                'start' : Ext.encode(function(){

                    var currentPage = page_store.currentPage;

                    if(currentPage === 1){

                        return 0;

                    }
                    else{

                        console.log('start -> ', (currentPage * 100) - paging);

                        return (currentPage * 100) - paging;

                    }

                    }()),
                'limit' : Ext.encode(paging)

            };

        }

        request_helper.xmlrpc_call_Ajax_Post(
            svc,
            func,
            params,
            function(res){

                Ext.create('Ext.Component', {

                    'renderTo' : Ext.getBody(),
                    'cls' : 'x-hidden',
                    'autoEl' : {
                        'tag' : 'iframe',
                        'src' : res
                    }

                });

                Ext.Msg.show({

                    'title' : '객체목록 파일 저장 완료',
                    'msg' : '객체목록을 엑셀파일로 저장하였습니다.',
                    'buttons' : Ext.Msg.OK,
                    'icon' : Ext.Msg.INFO
                });

            }

        );
    },

    onTreeNodeMouseUp: function(dataview, record, item, index, e, eOpts) {
        var me = this;
        console.log('mouse up');

        var _treeTarget = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];
        var _treeRecord = _treeTarget.getSelectionModel().getSelection()[0];
        var _listSource = me.down('gridpanel[itemId="gpn_objectList"]');
        var _records = _listSource.getSelectionModel().getSelection();

        if(_records[0].raw._kind !== record.raw._kind){
            Ext.Msg.show({
                title: 'Error Message',
                msg: '그룹 타입이 맞지 않습니다.',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });
            _treeTarget.isDD = false;
            _treeTarget.un('itemmouseup', me.onTreeNodeMouseUp, me);
            return;
        }

        if(_treeTarget.isDD){
            _treeTarget.isDD = false;
            _treeTarget.un('itemmouseup', me.onTreeNodeMouseUp, me);
            var _svc = 'ftSMC',
                _len = _records.length,
                _cid_list = [];

            if(_len <= 0){
                return;
            }

            var source_gcid = _records[0].raw['@groupcid'];
            var target_gcid = record.raw['cid'];
            for(var i = 0 ; i < _len ; i++){
                _cid_list.push(_records[i].raw['@cid']);
            }

            var _params = {
                t_cid : Ext.encode(target_gcid),
                cid : Ext.encode(_cid_list)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                'movObject',
                _params,
                function(response){

                    _listSource.gridRefresh('treeSelect', _treeRecord);
                }
            );
        }
    },

    onTreeNodeAdd: function(thisnode, newnode, ref) {
        var me = this;

        var _treeTarget = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];

        var _svc = 'ftSMC',
            _params = {
                t_cid : Ext.encode(thisnode.raw['cid']),
                cid : Ext.encode(newnode.raw['cid'])
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'movGroup',
            _params,
            function(response){
                console.log('movGroup result : ', response);
                if(response){

                    _treeTarget.getSelectionModel().select(newnode);
                }
            }
        );
    },

    addBatchIpsecObject: function() {
        // 2015.05.04 김민수 ==================================================================================================================================================
        //
        // 일 시 : 2015.05.04
        //
        // 설 명 : 선택된 IPSEC 객체들의 목록을 IPSEC 일괄편집 윈도우의 파라미터로 전달합니다.
        //
        // 수 정 :
        //
        // - (2015.05.04 김민수 : IPSEC 일괄편집 기능 정의)
        //
        // ===================================================================================================================================================================

        var gpn_list = this.down('[itemId=gpn_objectList]');

        var selectRecords = gpn_list.getSelectionModel().getSelection();

        if(selectRecords){

            var win_batchipsec = Ext.create('widget.object_ipsec_compile', {

                'applyObject' : 'object',
                'selectCids' : function(){

                    var cid_list = [];

                    for(var i = 0, max = selectRecords.length; i < max; i++){

                        cid_list.push(selectRecords[i].raw['@cid']);

                    }

                    return cid_list;

                }()

            });

            win_batchipsec.show();

        }
        else{

            alertMessage('수정할 객체를 선택하세요.', null);

            return false;
        }
    }

});

Ext.define('SMC4ZEN.view.pnl_policy_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_policy_view',

    requires: [
        'SMC4ZEN.view.pnl_policy_viewViewModel',
        'SMC4ZEN.view.pnl_policy_viewViewController',
        'Ext.tree.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.selection.CheckboxModel',
        'Ext.tab.Panel'
    ],

    controller: 'pnl_policy_view',
    viewModel: {
        type: 'pnl_policy_view'
    },
    height: 806,
    id: 'pnl_policy_view',
    width: 1820,
    defaults: {
        split: true,
        bodyPadding: 0
    },
    collapseDirection: 'top',
    collapseFirst: false,
    collapsed: false,
    collapsible: false,
    title: '',
    titleCollapse: true,
    defaultListenerScope: true,

    layout: {
        type: 'border',
        regionWeights: {
            north: 0,
            south: 10,
            center: 70,
            west: 40,
            east: -20
        }
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'panel',
                        onTreeNodeMouseUp: function(dataview, record, item, index, e, eOpts) {
                            var me = this;
                            console.log('mounse up');

                            var _treeTarget = me.down('treepanel[itemId=tree_policy_group]');
                            var _treeRecord = _treeTarget.getSelectionModel().getSelection()[0];
                            var _listSource = me.down('gridpanel[itemId=gpnl_policy_list]');
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
                                    console.log('delpolcy result : ', response);
                                    me.fn_list_init(source_gcid);
                                }
                                );
                            }
                        },
                        fn_tabItem_remove: function(cidlist) {
                            var me = this;
                            var tabs = Ext.ComponentQuery.query('tabpanel[itemId=tab_spds]')[0];

                            for(var i = 0 ; i < cidlist.length ; i++){
                                var _cmp = tabs.down('component[_policy_cid=' + cidlist[i] + ']');
                                if(_cmp)
                                {
                                    _cmp.close();
                                }
                            }

                        },
                        fn_search_group: function(cid, childNodes) {
                            var pnl_main = Ext.getCmp('pnl_policy_view');
                            var pnl_west = pnl_main.down('[itemId=pnl_policy_group]');
                            var pnl_group = pnl_west.down('[itemId=tree_policy_group]');

                            for(var i=0; i<childNodes.length; i++){

                                if(cid === childNodes[i].get('cid')){

                                    pnl_west.fn_tree_expand(childNodes[i]);

                                    pnl_group.getSelectionModel().select(childNodes[i], true);

                                    return false;

                                }

                                if(childNodes[i].childNodes.length > 0){

                                    pnl_west.fn_search_group(cid, childNodes[i].childNodes);

                                }

                            }
                        },
                        fn_tree_expand: function(_node) {
                            var pnl_main = Ext.getCmp('pnl_policy_view');
                            var pnl_west = pnl_main.down('[itemId=pnl_policy_group]');
                            var pnl_group = pnl_west.down('[itemId=tree_policy_group]');

                            var _parent = _node.parentNode;

                            if(_parent === null || typeof _parent === 'undefined'){

                                return;

                            }
                            else{

                                pnl_group.expandNode(_parent, false, function(){

                                    _parent.isExpandingOrCollapsing = false;

                                });

                                pnl_west.fn_tree_expand(_parent);

                            }
                        },
                        region: 'west',
                        reference: 'xtm_policy_west',
                        itemId: 'pnl_policy_group',
                        width: 500,
                        layout: 'border',
                        collapsible: true,
                        title: '보안정책',
                        items: [
                            {
                                xtype: 'treepanel',
                                region: 'center',
                                reference: 'xtm_policy_group',
                                itemId: 'tree_policy_group',
                                scrollable: true,
                                animCollapse: true,
                                header: false,
                                title: '보안정책',
                                hideHeaders: true,
                                rootVisible: false,
                                useArrows: true,
                                dockedItems: [
                                    {
                                        xtype: 'toolbar',
                                        dock: 'top',
                                        height: 38,
                                        items: [
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_plus_enable',
                                                height: 24,
                                                itemId: 'bt_add',
                                                width: 24,
                                                text: '',
                                                tooltip: '그룹추가',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_addClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_modify_enable',
                                                height: 24,
                                                itemId: 'bt_mod',
                                                width: 24,
                                                tooltip: '그룹수정',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_modClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_delete_enable',
                                                height: 24,
                                                itemId: 'bt_del',
                                                width: 24,
                                                tooltip: '그룹삭제',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_delClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_search_enable',
                                                height: 24,
                                                itemId: 'bt_search',
                                                width: 24,
                                                tooltip: '그룹검색',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_searchClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_rule_send',
                                                height: 24,
                                                itemId: 'bt_recursive',
                                                width: 24,
                                                enableToggle: true,
                                                tooltip: '하위그룹 내용보기',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_recursiveClick',
                                                        scope: 'controller'
                                                    },
                                                    toggle: {
                                                        fn: 'onBt_recursiveToggle',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_folder_open',
                                                height: 24,
                                                itemId: 'bt_expand',
                                                width: 24,
                                                tooltip: '그룹 열기',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_expandClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                border: false,
                                                cls: 'common_folder_close',
                                                height: 24,
                                                itemId: 'bt_fold',
                                                width: 24,
                                                tooltip: '그룹 닫기',
                                                listeners: {
                                                    click: {
                                                        fn: 'onBt_foldClick',
                                                        scope: 'controller'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    plugins: [
                                        Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                            ddGroup: 'treetotree'
                                        })
                                    ],
                                    listeners: {
                                        beforedrop: {
                                            fn: 'onViewBeforeDrop',
                                            scope: 'controller'
                                        }
                                    }
                                },
                                listeners: {
                                    render: {
                                        fn: 'onTree_policy_groupRender',
                                        scope: 'controller'
                                    },
                                    select: {
                                        fn: 'onTree_policy_groupSelect',
                                        scope: 'controller'
                                    }
                                }
                            },
                            {
                                xtype: 'panel',
                                flex: 1,
                                region: 'east',
                                split: true,
                                reference: 'xtm_policy_listpanel',
                                itemId: 'pnl_policy_list',
                                resizable: false,
                                width: 150,
                                layout: 'fit',
                                collapseDirection: 'bottom',
                                collapsible: true,
                                title: '정책목록',
                                titleCollapse: true,
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        multiSelect: true,
                                        reference: 'xtm_policy_list',
                                        itemId: 'gpnl_policy_list',
                                        header: false,
                                        title: '정책목록',
                                        dockedItems: [
                                            {
                                                xtype: 'toolbar',
                                                dock: 'top',
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        border: false,
                                                        cls: 'common_plus_enable',
                                                        height: 24,
                                                        itemId: 'bt_add',
                                                        width: 24,
                                                        tooltip: '정책등록',
                                                        listeners: {
                                                            click: {
                                                                fn: 'onBt_addClick1',
                                                                scope: 'controller'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        border: false,
                                                        cls: 'common_modify_enable',
                                                        height: 24,
                                                        itemId: 'bt_mod',
                                                        width: 24,
                                                        tooltip: '정책수정',
                                                        listeners: {
                                                            click: {
                                                                fn: 'onBt_modClick1',
                                                                scope: 'controller'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        border: false,
                                                        cls: 'common_delete_enable',
                                                        height: 24,
                                                        itemId: 'bt_del',
                                                        width: 24,
                                                        tooltip: '정책삭제',
                                                        listeners: {
                                                            click: {
                                                                fn: 'onBt_delClick1',
                                                                scope: 'controller'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        border: false,
                                                        cls: 'common_search_enable',
                                                        height: 24,
                                                        itemId: 'bt_search',
                                                        width: 24,
                                                        tooltip: '정책찾기',
                                                        listeners: {
                                                            click: {
                                                                fn: 'onBt_searchClick1',
                                                                scope: 'controller'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        border: false,
                                                        cls: 'common_print_enable',
                                                        height: 24,
                                                        itemId: 'bt_print',
                                                        width: 24,
                                                        tooltip: '정책출력',
                                                        listeners: {
                                                            click: {
                                                                fn: 'onBt_printClick',
                                                                scope: 'controller'
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                resizable: true,
                                                width: 35,
                                                align: 'center',
                                                text: 'No'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'ico_' + record.data['_kind'] + '_16';
                                                    return value;
                                                },
                                                width: 224,
                                                dataIndex: 'name',
                                                text: '정책명',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    me.fn_show_policy_rule_list(record);
                                                },
                                                border: false,
                                                itemId: 'iids_policy_list_edit',
                                                width: 30,
                                                layout: 'fit',
                                                defaultWidth: 30,
                                                emptyCellText: 'edit',
                                                menuText: 'edit',
                                                altText: 'edit',
                                                iconCls: 'ico_policy_list_edit',
                                                items: [
                                                    {

                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            itemId: 'grid_ipv4_filter',
                                            plugins: [
                                                Ext.create('Ext.grid.plugin.DragDrop', {
                                                    ddGroup: 'policylist-to-grouptree',
                                                    enableDrop: false
                                                })
                                            ]
                                        },
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        }),
                                        listeners: {
                                            afterrender: 'onGpnl_policy_listAfterRender',
                                            itemdblclick: {
                                                fn: 'onGpnl_policy_listItemDblClick',
                                                scope: 'controller'
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        listeners: {
                            boxready: {
                                fn: 'onPnl_policy_groupBoxReady',
                                scope: 'controller'
                            }
                        }
                    },
                    {
                        xtype: 'tabpanel',
                        region: 'center',
                        reference: 'xtm_policy_detail',
                        id: 'tpnl_policy_detailspd',
                        itemId: 'tab_spds',
                        closable: true,
                        collapseFirst: false,
                        title: '정책 목록',
                        titleCollapse: true,
                        listeners: {
                            beforeclose: 'onTab_spdsBeforeClose'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onGpnl_policy_listAfterRender: function(component, eOpts) {
        var me = component.up('panel[itemId="pnl_policy_list"]').up('panel');

        var policy_Context_Array = [

            {
                'name' : '정책 등록',
                'itemId' : 'id_policyAdd',
                'children' : null,
                'callback' : function(){

                    var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
                    var _sModel = _trpn.getSelectionModel().getSelection()[0];

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];

                    var _selectedTabItem = '';

                    if(typeof _sModel === 'undefined'){
                        Ext.Msg.show({
                            title: 'Error Message',
                            msg: 'Choose a parent group first',
                            width: 300,
                            buttons: Ext.Msg.OK,
                            icon: Ext.window.MessageBox.INFO
                        });

                    } else {
                        var _gtype = _sModel.raw.gtype;
                        if(_gtype === '' || typeof _gtype === 'undefined'){
                            _gtype = _sModel.raw._kind;
                        }

                        var dlg = Ext.create('SMC.view.win_policy_spd_add',{
                            kind : _gtype,
                            _policy_grp : me,
                            g_cid : _sModel.raw.cid
                        });
                        dlg.show();
                    }
                }
            },
            {
                'name' : '정책 수정',
                'itemId' : 'id_policyMod',
                'children': null,
                'callback' : function(){

                    var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
                    var _sModel = _trpn.getSelectionModel().getSelection()[0];

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection()[0];

                    if(_gModel && _sModel){
                        var dlg = Ext.create('SMC.view.win_policy_spd_modify',{
                            kind : _sModel.parentNode.raw.gtype,
                            _policy_grp : me,
                            _obj : _gModel.raw,
                            _obj_cid : _sModel.raw.cid,
                            _policy_name : _gModel.raw.name
                        });
                        dlg.show();
                    } else {
                        if(!_gModel){
                            Ext.Msg.show({
                                title: 'Error Message',
                                msg: 'Choose a group first',
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });

                        } else {
                            Ext.Msg.show({
                                title: 'Error Message',
                                msg: 'Choose a policy list first',
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    }
                }
            },
            {
                'name' : '정책 삭제',
                'itemId' : 'id_policyDel',
                'children' : null,
                'callback' : function(){

                    var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
                    var _sModel = _trpn.getSelectionModel().getSelection()[0];

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection();

                    if(_gModel && _sModel){
                        var dlg = Ext.create('SMC.view.win_policy_spd_del',{
                            kind : _sModel.parentNode.raw.gtype,
                            _policy_grp : me,
                            _obj : _gModel,
                            _obj_cid : _sModel.raw.cid

                        });
                        dlg.show();
                    } else {
                        if(!_gModel){
                            Ext.Msg.show({
                                title: 'Error Message',
                                msg: 'Choose a group first',
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });

                        } else {
                            Ext.Msg.show({
                                title: 'Error Message',
                                msg: 'Choose a policy list first',
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    }
                }
            },
            {
                'name' : '정책 복사',
                'itemId' : 'id_policyCopy',
                'children' : null,
                'callback' : function(){

                    var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
                    var _sModel = _trpn.getSelectionModel().getSelection()[0];

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection()[0];

                    if(_gModel)
                    {
                        Ext.MessageBox.show({
                            title:'복사',
                            msg: '선택된 정책을 복사 하시겠습니까?',
                            buttonText: {yes: "확인",no: "취소"},
                            fn: function(btn){
                                if(btn === 'yes')
                                {
                                    var _svc = 'ftSMC',
                                        _func = 'copyPolicy',
                                        _params = {
                                            cid : Ext.encode(_gModel.data['@cid'])
                                        };

                                    request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            me.fn_list_init(_sModel.raw.cid);
                                        }
                                    );
                                }
                            }
                        });
                    }

                }
            },
            {
                'name' : '연결 객체',
                'itemId' : 'id_policyLink',
                'children' : null,
                'callback' : function(){

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection()[0];

                    var cid = _gModel.data['@cid'];

                    var _svc = 'ftSMC',
                        _func = 'getObjectLinkInfo',
                        _params = {
                            cid	: Ext.encode(cid),
                            mode : Ext.encode('parent')
                        };

                    me.up('panel').setLoading(true);

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

                                    me.up('panel').setLoading(false);

                                    Ext.create('SMC.view.pnl_object_hierarchy').loadData(_gModel.raw, response, response2);
                                }
                            );
                        }
                    );

                }
            },
            {
                'name' : '정책 찾기',
                'itemId' : 'id_policySearch',
                'children' : null,
                'callback' : function(){

                    var _trpn = me.down('treepanel[itemId=tree_policy_group]');

                    var _clickFn = function(record){
                        search_tree(
                            _trpn,
                            record.raw['@groupcid'],
                            'cid',
                            function(_target_array){

                                function _tree_expand(_node){
                                    var _parent = _node.parentNode;
                                    if(_parent == null || typeof _parent === 'undefined'){
                                        return;
                                    } else {
                                        _trpn.expandNode(_parent);
                                        _tree_expand(_parent);
                                    }
                                }
                                _tree_expand(_target_array[0]);
                                _trpn.getSelectionModel().select(_target_array[0], true);
                                me.kind = _target_array[0].raw._kind;
                                me.fn_list_init(_target_array[0].raw.cid, function(){
                                    var _grpn = me.down('gridpanel[itemId=gpnl_policy_list]');
                                    var _store = _grpn.getStore();
                                    var  _row = _store.findRecord('@cid', record.raw['@cid']);
                                    _grpn.getSelectionModel().select(_row, true);
                                });
                            }
                        );
                    };

                    var _dblclickFn = function(record){
                        me.fn_show_policy_rule_list(record);
                    };

                    var _kind = me.kind;
                    if(_kind == null || typeof _kind === 'undefined'){
                        SMC.errorWindow('대상 그룹을 선택해주세요');
                    } else {
                        SMC_VIEW.make_find_policy_window('정책 검색', me.kind, _clickFn, _dblclickFn).show();
                    }
                }
            },
            {
                'name' : '정책 출력',
                'itemId' : 'id_policyOutput',
                'children' : null,
                'callback' : function(){

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection();

                    var _len = _gModel.length;

                    if(_len > 0){

                        var _cidList = [];

                        for(var i = 0 ; i < _len ; i++){
                            var _cid = _gModel[i].raw['@cid'];
                            _cidList.push(_cid);
                        }

                        var _params = {
                            cid : Ext.encode(_cidList)
                        };

                        request_helper.xmlrpc_call_Ajax_Post(
                            SMC_SERVICE_NAME,
                            'exportPolicies',
                            _params,
                            function(response){
                                window.location = '/fileDownload?filePath=' + response;
                            }
                        );

                    } else {
                        SMC.errorWindow('출력할 정책목록을 선택해주세요');
                    }

                }
            },
            {
                'name' : '정책 일괄추가',
                'itemId' : 'id_policyCompile',
                'children' : null,
                'callback' : function(){

                    var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
                    var _gModel = _grpn.getSelectionModel().getSelection();

                    var _len = _gModel.length;

                    if(_len > 0){

                        var createEditWin = function(_type, _win_title, _rule_store, _pos, _kind, _raw, _target, _cid_list){

                            var _stor = Ext.create('Ext.data.Store',{
                                data : [],
                                fields : [
                                    {name : 'uid', type : 'string', dataIndex : 'uid'},
                                    {name : '@num', type : 'string', dataIndex : '@num'},
                                    {name : 'desc', type : 'string', dataIndex : 'desc'}
                                ]
                            });
                            var _sel_grid = Ext.create('Ext.grid.Panel',{

                                store : _stor,
                                header: false,
                                title: '정책목록',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 40,
                                        align: 'center',
                                        text: '순위',
                                        dataIndex: '@num'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'uid',
                                        align: 'center',
                                        text: '정책ID'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '설명',
                                        align: 'center',
                                        dataIndex: 'desc',
                                        flex: 1
                                    }
                                ]
                            });

                            _comp_name = SMC_VIEW.make_policy_rule_view(_kind);

                            var _width = 850,
                                _height = 768;

                            if(_type === 'remove'){
                                _width = 550;
                                _height = 468;
                            }

                            var _win = Ext.create(_comp_name,{
                                policy_rows : _sel_grid,
                                edit_type : _type,
                                ttype : 'object',
                                target : _target,
                                title : _win_title,
                                update_store : _rule_store,
                                cid_list : _cid_list,
                                insPosition : _pos,
                                obj_kind : _kind,
                                raw_data : _raw,
                                ruleRegAll : true,
                                layout : 'fit',
                                resizable : true,
                                maximizable : true,
                                modal : true,
                                collapsible: false,
                                width : _width,
                                height : _height
                            });

                            if(_type !== 'remove'){

                                _win.fn_policy_editor_init(_raw);
                            }

                            return _win;
                        };

                        var tabs = Ext.ComponentQuery.query('tabpanel[itemId=tab_spds]')[0];
                        var _tabitemlist = tabs.items.items;
                        var store_list = [];
                        var cid_list = [];

                        for(var i in _tabitemlist){

                            for(var j in _gModel){

                                if(_tabitemlist[i]._policy_cid === _gModel[j].data['@cid'])
                                {
                                    store_list.push(_tabitemlist[i].query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0].getStore());
                                    cid_list.push(_tabitemlist[i]._policy_cid);
                                }
                            }
                        }

                        var target = [];

                        Ext.each(component.getSelectionModel().getSelection(), function(data){

                            target.push(data.data['@cid']);
                        });

                        request_helper.xmlrpc_call_Ajax_Post(
                            'ftSMC',
                            'getRuleDefault',
                            {
                                kind : Ext.encode(OBJECT_SPD_IP_V4_FILTER.TEXT)
                            },
                            function(response){
                                console.log('response - ', response);
                                var _pwin = createEditWin('compile', '정책 일괄추가 [대상 -> 선택정책]', store_list, 'up', OBJECT_SPD_IP_V4_FILTER.TEXT, response, target, cid_list);
                                _pwin.show();
                                _pwin.down('panel[itemId="pnl_policy_grid_views"]').items.items[0].down('gridpanel').tools[0].handler();
                            }
                        );

                    } else {
                        SMC.errorWindow('일괄추가할 정책을 선택해주세요');
                    }

                }
            }
        ];

        var contextCallback = function(menuInstance){

            var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
            var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
            var _gModel = _grpn.getSelectionModel().getSelection();
            var _tModel = _trpn.getSelectionModel().getSelection()[0];

            var _len = _gModel.length;

            menuInstance.down('[itemId=id_policyAdd]').enable();
            menuInstance.down('[itemId=id_policySearch]').enable();

            if(_len > 0)
            {
                menuInstance.down('[itemId=id_policyMod]').enable();
                menuInstance.down('[itemId=id_policyDel]').enable();
                menuInstance.down('[itemId=id_policyCopy]').enable();
                menuInstance.down('[itemId=id_policyLink]').enable();
                menuInstance.down('[itemId=id_policyOutput]').enable();

                if(_tModel.raw._kind === 'obj_spd_ipv4_filter')
                {
                    menuInstance.down('[itemId=id_policyCompile]').enable();
                }
                else
                {
                    menuInstance.down('[itemId=id_policyCompile]').disable();
                }
            }
            else
            {
                menuInstance.down('[itemId=id_policyMod]').disable();
                menuInstance.down('[itemId=id_policyDel]').disable();
                menuInstance.down('[itemId=id_policyCopy]').disable();
                menuInstance.down('[itemId=id_policyLink]').disable();
                menuInstance.down('[itemId=id_policyOutput]').disable();
                menuInstance.down('[itemId=id_policyCompile]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_policy_context', 'width' : 180, 'border' : false}, component.up('panel[itemId="pnl_policy_list"]'), contextCallback, policy_Context_Array);
    },

    onTab_spdsBeforeClose: function(panel, eOpts) {
        panel.removeAll();

        return false;
    }

});
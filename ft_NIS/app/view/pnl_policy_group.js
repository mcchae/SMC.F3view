
Ext.define('SMC.view.pnl_policy_group', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_policy_group2',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.selection.CheckboxModel'
    ],

    height: 574,
    width: 500,
    layout: 'border',
    collapsible: true,
    title: '보안정책',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'center',
                    split: true,
                    itemId: 'pnl_security_policy',
                    autoScroll: true,
                    frameHeader: false,
                    header: false,
                    title: '보안정책',
                    titleAlign: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
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
                                    width: 24,
                                    text: '',
                                    tooltip: '그룹추가',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_modify_enable',
                                    height: 24,
                                    width: 24,
                                    tooltip: '그룹수정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_delete_enable',
                                    height: 24,
                                    width: 24,
                                    tooltip: '그룹삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_search_enable',
                                    height: 24,
                                    width: 24,
                                    tooltip: '그룹검색',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick6,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_rule_send',
                                    height: 24,
                                    itemId: 'recursiveGroup',
                                    width: 24,
                                    enableToggle: true,
                                    tooltip: '하위그룹 내용보기',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick81,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_folder_open',
                                    height: 24,
                                    width: 24,
                                    tooltip: '그룹 열기',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick8,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    border: false,
                                    cls: 'common_folder_close',
                                    height: 24,
                                    width: 24,
                                    tooltip: '그룹 닫기',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick9,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'treepanel',
                            border: false,
                            itemId: 'tree_policy_group',
                            autoScroll: true,
                            header: false,
                            title: 'My Tree Panel',
                            titleCollapse: true,
                            hideHeaders: true,
                            rootVisible: false,
                            useArrows: true,
                            viewConfig: {
                                plugins: [
                                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                                        ddGroup: 'treetotree'
                                    })
                                ]
                            },
                            listeners: {
                                render: {
                                    fn: me.onTree_policy_groupRender,
                                    scope: me
                                },
                                afterrender: {
                                    fn: me.onTree_policy_groupAfterRender,
                                    scope: me
                                },
                                itemclick: {
                                    fn: me.onTree_policy_groupItemClick,
                                    scope: me
                                },
                                select: {
                                    fn: me.onTree_policy_groupSelect,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'east',
                    split: true,
                    itemId: 'pnl_policy_list',
                    width: 150,
                    resizable: false,
                    layout: 'fit',
                    collapseDirection: 'bottom',
                    collapsible: true,
                    title: '정책목록',
                    titleAlign: 'left',
                    titleCollapse: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            multiSelect: true,
                            itemId: 'gpnl_policy_list',
                            header: false,
                            title: '정책목록',
                            titleAlign: 'left',
                            store: 'st_policy_list',
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
                                            width: 24,
                                            tooltip: '정책등록',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick3,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'common_modify_enable',
                                            height: 24,
                                            width: 24,
                                            tooltip: '정책수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick4,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'common_delete_enable',
                                            height: 24,
                                            width: 24,
                                            tooltip: '정책삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick5,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'common_search_enable',
                                            height: 24,
                                            width: 24,
                                            tooltip: '정책찾기',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick7,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'common_print_enable',
                                            height: 24,
                                            width: 24,
                                            tooltip: '정책출력',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick51,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 35,
                                    resizable: true,
                                    align: 'center',
                                    text: 'No'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'ico_' + record.raw['_kind'] + '_16';
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
                            listeners: {
                                itemdblclick: {
                                    fn: me.onGpnl_policy_listItemDblClick,
                                    scope: me
                                },
                                afterrender: {
                                    fn: me.onGpnl_policy_listAfterRender,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            })
                        }
                    ],
                    listeners: {
                        beforedestroy: {
                            fn: me.onPnl_policy_listBeforeDestroy,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                boxready: {
                    fn: me.onPanelBoxReady,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPanelBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {

        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];

        var _sModel = _trpn.getSelectionModel().getSelection()[0];

        if(typeof _sModel === 'undefined'){
            Ext.Msg.show({
                title: 'Error Message',
                msg: 'Choose a parent group first',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        } else {
            var dlg = Ext.create('SMC.view.win_policy_add_group', {
                _policy_grp : this,
                _parent_cid : _sModel.raw.cid,
                _parent_node : _sModel
            });
            dlg.show();
        }


    },

    onButtonClick1: function(button, e, eOpts) {
        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];

        var _sModel = _trpn.getSelectionModel().getSelection()[0];
        if(typeof _sModel === 'undefined'){
            Ext.Msg.show({
                title: 'Error Message',
                msg: 'Choose a parent group first',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        } else {
            var dlg = Ext.create('SMC.view.win_policy_modify_group', {
                _policy_grp : this,
                _cid : _sModel.raw.cid,
                _grp_name : _sModel.raw.text
            });
            dlg.show();
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];

        var _sModel = _trpn.getSelectionModel().getSelection()[0];
        if(typeof _sModel === 'undefined'){
            Ext.Msg.show({
                title: 'Error Message',
                msg: 'Choose a group name first',
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        } else {
            var dlg = Ext.create('SMC.view.win_policy_del_group', {
                _policy_grp : this,
                _cid : _sModel.raw.cid,
                _grp_name : _sModel.raw.text
            });
            dlg.show();
        }
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = this;

        var _trpn = me.query('treepanel[itemId=tree_policy_group]')[0];

        var dlg = SMC_VIEW.make_find_treenode_window('그룹검색', _trpn);
        dlg.show();
    },

    onButtonClick81: function(button, e, eOpts) {
        var me = this;

        var _trpn = me.query('treepanel[itemId=tree_policy_group]')[0];

        var treeSelection = _trpn.getSelectionModel().getSelection()[0];

        if(button.pressed)
        {
            if(button.cls === 'common_rule_send')
            {
                button.removeCls('common_rule_send');
                button.addCls('common_rule_pressed');
                button.cls = 'common_rule_pressed';
            }
        }
        else
        {
            if(button.cls === 'common_rule_pressed')
            {
                button.removeCls('common_rule_pressed');
                button.addCls('common_rule_send');
                button.cls = 'common_rule_send';
            }
        }

        if(treeSelection)
        {
            me.fn_list_init(treeSelection.raw);
            me.kind = treeSelection.raw._kind;
        }
    },

    onButtonClick8: function(button, e, eOpts) {
        var me = this;

        var treeObj = me.query('treepanel[itemId=tree_policy_group]')[0];

        if(treeObj.group_click_count > 0)
        {
            return false;
        }

        treeObj.group_click_count += 1;

        var treeSelection = treeObj.getSelectionModel().getSelection()[0];

        if(treeSelection)
        {
            group_open(treeObj, treeSelection);
        }
    },

    onButtonClick9: function(button, e, eOpts) {
        var me = this;

        var treeObj = me.query('treepanel[itemId=tree_policy_group]')[0];

        if(treeObj.group_click_count > 0)
        {
            return false;
        }

        treeObj.group_click_count += 1;

        var treeSelection = treeObj.getSelectionModel().getSelection()[0];

        if(treeSelection)
        {
            group_close(treeObj, treeSelection);
        }
    },

    onTree_policy_groupRender: function(component, eOpts) {
        var me = this;

        me.fn_tree_init();
    },

    onTree_policy_groupAfterRender: function(component, eOpts) {
        var me = this;

        //var _pnl = me.down('[itemId=pnl_security_policy]');
        //var _ctx = new ftContext;

        //_ctx.getMenu('policy', _pnl);
        /*

        var ctx = new contextMenu();
        ctx.addItem('group_reg', '그룹등록', function(){

        }, true);

        ctx.addItem('group_find', '그룹찾기', function(){

        }, true);

        ctx.addItem('group_mod', '그룹수정', function(){

        }, true);

        ctx.addItem('group_del', '그룹삭제', function(){

        }, true);

        ctx.addItem('testid5', 'test menu1', function(){

        }, true);

        me.treeCtx = ctx;
        var _trpn = me.query('treepanel[itemId=tree_policy_group]')[0];

        ctx.connectGrid(_trpn, function(_is_menu){

        });

        me.contextMenu = ctx;
        //*/

        var policy_Context_Array = [

            {
                'name' : '정책 일괄추가',
                'itemId' : 'id_policyCompile',
                'children' : null,
                'callback' : function(){

                    var _tModel = component.getSelectionModel().getSelection();

                    var _len = _tModel.length;

                    if(_len > 0){

                        request_helper.xmlrpc_call_Ajax_Post(
                            'ftSMC',
                            'getPolicyList',
                            {
                                g_cid : Ext.encode(_tModel[0].raw.cid),
                                isRecursive : Ext.encode(true)
                            },
                            function(response){

                                if(response.length > 0)
                                {
                                    var createEditWin = function(_type, _win_title, _rule_store, _pos, _kind, _raw, _target, _target_text, _cid_list){

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
                                            ttype : 'group',
                                            target : _target,
                                            target_text : _target_text,
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
                                    var target;
                                    var target_text;

                                    target = _tModel[0].raw.cid;
                                    target_text = _tModel[0].raw.text;

                                    for(var i in _tabitemlist){

                                        if(_tabitemlist[i]._policy['@groupcid'] === target)
                                        {
                                            store_list.push(_tabitemlist[i].query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0].getStore());
                                            cid_list.push(_tabitemlist[i]._policy_cid);
                                        }
                                    }

                                    request_helper.xmlrpc_call_Ajax_Post(
                                        'ftSMC',
                                        'getRuleDefault',
                                        {
                                            kind : Ext.encode(OBJECT_SPD_IP_V4_FILTER.TEXT)
                                        },
                                        function(response){
                                            console.log('response - ', response);
                                            var _pwin = createEditWin('compile', '정책 일괄추가 [대상 -> 선택그룹]', store_list, 'up', OBJECT_SPD_IP_V4_FILTER.TEXT, response, target, target_text, cid_list);
                                            _pwin.show();
                                            _pwin.down('panel[itemId="pnl_policy_grid_views"]').items.items[0].down('gridpanel').tools[0].handler();
                                        }
                                    );
                                }
                                else
                                {
                                    SMC.errorWindow('적용 대상목록을 찾을 수 없습니다');
                                }
                            }
                        );

                    } else {
                        SMC.errorWindow('일괄추가할 그룹을 선택해주세요');
                    }
                }
            }
        ];

        var contextCallback = function(menuInstance){

            var _tModel = component.getSelectionModel().getSelection();

            var _len = _tModel.length;

            if(_len > 0)
            {
                if(_tModel[0].raw._kind === 'obj_spd_ipv4_filter')
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
                menuInstance.down('[itemId=id_policyCompile]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_policy_context', 'width' : 180, 'border' : false}, component.up('panel[itemId="pnl_security_policy"]'), contextCallback, policy_Context_Array);
    },

    onTree_policy_groupItemClick: function(dataview, record, item, index, e, eOpts) {
        // var me = this;
        // console.log('tree item select : ', record.raw);
        // me.fn_list_init(record.raw.cid);
        // me.kind = record.raw._kind;
    },

    onTree_policy_groupSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        me.fn_list_init(record.raw);
        me.kind = record.raw._kind;
    },

    onButtonClick3: function(button, e, eOpts) {

        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
        var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
        var _sModel = _trpn.getSelectionModel().getSelection()[0];

        var _selectedTabItem = '';

        ///*
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
            //console.log(_sModel);
            if(_gtype === '' || typeof _gtype === 'undefined'){
                _gtype = _sModel.raw._kind;
            }

            var dlg = Ext.create('SMC.view.win_policy_spd_add',{
                kind : _gtype,
                _policy_grp : this,
                g_cid : _sModel.raw.cid
            });
            dlg.show();
        }
        //*/
    },

    onButtonClick4: function(button, e, eOpts) {
        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
        var _sModel = _trpn.getSelectionModel().getSelection()[0];

        var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
        var _gModel = _grpn.getSelectionModel().getSelection()[0];

        if(_gModel && _sModel){
            var dlg = Ext.create('SMC.view.win_policy_spd_modify',{
                kind : _sModel.parentNode.raw.gtype,
                _policy_grp : this,
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
    },

    onButtonClick5: function(button, e, eOpts) {
        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
        var _sModel = _trpn.getSelectionModel().getSelection()[0];

        var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
        var _gModel = _grpn.getSelectionModel().getSelection();

        if(_gModel && _sModel){
            var dlg = Ext.create('SMC.view.win_policy_spd_del',{
                kind : _sModel.parentNode.raw.gtype,
                _policy_grp : this,
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
    },

    onButtonClick7: function(button, e, eOpts) {
        var me = this;
        var _trpn = me.down('treepanel[itemId=tree_policy_group]');

        var _clickFn = function(record){
            console.log('click');
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
    },

    onButtonClick51: function(button, e, eOpts) {
        var  me = this;
        var _grpn = me.down('gridpanel[itemId=gpnl_policy_list]');
        var _gModel = _grpn.getSelectionModel().getSelection();
        var _len = _gModel.length;
        console.log(_gModel);
        if(_len > 0){

            var _cidList = [];

            for(var i = 0 ; i < _len ; i++){
                var _cid = _gModel[i].raw['@cid'];
                _cidList.push(_cid);
            }
            console.log('_cidList : ', _cidList);
            var _params = {
                cid : Ext.encode(_cidList)
            };
            ///*
            request_helper.xmlrpc_call_Ajax_Post(
                SMC_SERVICE_NAME,
                'exportPolicies',
                _params,
                function(response){
                    window.location = '/fileDownload?filePath=' + response;
                }
            );
            //*/

        } else {
            SMC.errorWindow('출력할 정책목록을 선택해주세요');
        }

    },

    onGpnl_policy_listItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;
        me.fn_show_policy_rule_list(record);
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

    onPnl_policy_listBeforeDestroy: function(component, eOpts) {
        var grid = component.down('#gpnl_policy_list');

        console.log('grid destory');

        grid.getStore().removeAll();
    },

    onPanelBoxReady: function(component, width, height, eOpts) {
        var me = this;

        var _treeTarget = me.down('treepanel[itemId=tree_policy_group]');
        //var _listSource = me.down('gridpanel[itemId=gpnl_policy_list]');


        //정책 목록 -> 정책 트리로 드래그앤 드랍 기능
        me.groupTreeDropTarget = new Ext.dd.DropTarget(_treeTarget.body.dom ,{
            ddGroup : 'policylist-to-grouptree',

            notifyEnter: function(ddSource, e, data) {
                //Add some flare to invite drop.
                //console.log('notifyEnter');
                //_store.remove(_records);
                _treeTarget.isDD = true;
                _treeTarget.on('itemmouseup', me.onTreeNodeMouseUp, me);
            },

            notifyDrop: function(ddSource, e, data) {
                //console.log('notifyDrop');

                return true;
            }

        });


        var _tv = _treeTarget.getView();
        ///*
        _tv.on('drop', function(node, data, overModel, dropPosition, eOpts){
            //console.log('drop');
            //_treeTarget.un('itemappend', me.onTreeNodeAdd, me);
            //_treeTarget.on('itemappend', me.onTreeNodeAdd, me);
            //_treeTarget.un('iteminsert', me.onTreeNodeAdd, me);
            //_treeTarget.on('iteminsert', me.onTreeNodeAdd, me);

            /*
            console.log('data :', data);
            console.log('overModel : ', overModel);
            console.log('dropPosition : ', dropPosition);
            //*/
            me.onTreeNodeAdd(overModel, data.records[0]);


        });
        /*
        _tv.on('beforedrop', function(node, data, overModel, dropPosition, dropHandlers, eOpts){
            console.log('beforedrop');
            console.log(node);
            console.log(data);
            console.log(overModel);
            console.log(dropPosition);
            console.log(dropHandlers);
            console.log(eOpts);
        });
        //*/

        me.query('treepanel[itemId=tree_policy_group]')[0].group_click_count = 0;
    },

    onPanelBeforeDestroy: function(component, eOpts) {
        var me = this;
        //me.contextMenu.destroy();

        var target = me.groupTreeDropTarget;
        if (target) {
            target.unreg();
            me.groupTreeDropTarget = null;
        }

    },

    fn_tree_init: function(newraw) {
        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_spd'),
                dummy_root : Ext.encode(false)
            };

        var me = this;

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){
                var trpn = me.query('#tree_policy_group')[0];

                for(var i=0; i<response.children.length; i++)
                {
                    if(response.children[i].gtype === 'obj_spd_ipv6_filter' || response.children[i].gtype === 'obj_spd_ipv6_nat')
                    {
                        response.children.splice(i,1);
                        i = -1;
                        continue;
                    }

                    me.fn_tree_close(response.children);
                }

                if(trpn)
                {
                    trpn.setRootNode(response);
                    trpn.getView().refresh();
                }

                if(typeof newraw !== 'undefined'){

                    //trpn.getSelectionModel().select(newraw);

                    trpn.getSelectionModel().store.each(function(data, idx){

                        if(data.raw.gtype === newraw._kind)
                        {
                            me.fn_search_group(newraw.cid, data.childNodes);
                            return false;
                        }
                    });

                }else{
                    trpn.getSelectionModel().store.each(function(record){
                       if(record.raw.gtype === "obj_spd_ipv4_filter")
                       {
                           trpn.getSelectionModel().select(record);
                           return false;
                       }
                    });
                }
            }
        );
    },

    fn_list_init: function(raw, _callback) {
        var  me = this;
        var treepanel = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
        var gpanel = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];
        var policylist = me.down('panel[itemId=pnl_policy_list]');
        //gpanel.getStore().removeAll();
        //gpanel.getStore().sync();
        var cid;
        var recursive_option = Ext.ComponentQuery.query('button[itemId=recursiveGroup]')[0].pressed;

        if(typeof raw === 'object'){
            cid = raw.cid;
            policylist.setTitle("정책목록 (" + raw.text + ")");
        } else {
            cid = raw;
        }
        var _svc = 'ftSMC',
            _func = 'getPolicyList',
            _params = {
                g_cid : Ext.encode(cid),
                isRecursive : Ext.encode(recursive_option)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){
                //console.log('fn_list_init : ', response);
                //var store = Ext.StoreManager.lookup('st_policy_list');
                var store = gpanel.getStore();
                store.loadData(response);

                if(typeof _callback !== 'undefined'){
                    _callback();
                }
            }
        );
    },

    fn_show_policy_rule_list: function(record) {
        var me = this;

        var _kind = record.raw._kind;
        var cid = record.data['@cid'];
        var name = record.data.name;

        var tabs = Ext.ComponentQuery.query('tabpanel[itemId=tab_spds]')[0];
        var _trpn = Ext.ComponentQuery.query('treepanel[itemId=tree_policy_group]')[0];
        var _sModel = _trpn.getSelectionModel().getSelection()[0];
        var _grpn = Ext.ComponentQuery.query('gridpanel[itemId=gpnl_policy_list]')[0];

        var _tabitemlist = tabs.items.items;

        var _cid_list = [];

        for(var i in _tabitemlist){

            var _cid = _tabitemlist[i]._policy_cid;

            _cid_list.push(_cid);

        }

        var _index = _cid_list.indexOf(cid);

        if(_index < 0){

            var _svc = 'ftSMC',
                _func = 'getPolicy',
                _params = {
                    cid : Ext.encode(cid)
                };

            _grpn.setLoading(true);

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    _grpn.setLoading(false);

                    var _kind = response._kind, tabItem;

                    if(_kind === 'obj_spd_ipv6_filter' || _kind === 'obj_spd_ipv6_nat'){
                        tabItem = Ext.create('SMC.view.pnl_policy_ipv6_filtering',{
                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'
                        });

                    }
                    else if(_kind === 'obj_spd_whiteblack'){

                        tabItem = Ext.create('SMC.view.pnl_xtm_white_black_list',{
                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'
                        });

                    }
                    else {

                        tabItem = Ext.create('SMC.view.pnl_policy_edit',{
                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'
                        });
                    }

                    tabItem.title = name;
                    tabs.add(tabItem);
                    tabs.setActiveTab(tabItem);
                }

            );

        }else {

            tabs.setActiveTab(_index);

        }
    },

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

    onTreeNodeAdd: function(thisnode, newnode, ref) {
        var me = this;

        var _treeTarget = me.down('treepanel[itemId=tree_policy_group]');

        var _svc = 'ftSMC',
            _params = {
                t_cid : Ext.encode(thisnode.raw['cid']),
                cid : Ext.encode(newnode.raw['cid'])
            };
        //console.log(_params);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'movGroup',
            _params,
            function(response){
                console.log('movGroup result : ', response);
                if(response){
                    //_treeTarget.fireEvent('select', _treeTarget.getView(), newnode);
                    _treeTarget.getSelectionModel().select(newnode);
                }
                //me.fn_list_init(source_gcid);
            }
        );
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

    fn_tree_close: function(children) {
        var me = this;

        for(var i=0; i<children.length; i++)
        {
            if(children[i].expanded === "true" || children[i].expanded === "false")
                children[i].expanded = false;

            if(children[i].children)
                me.fn_tree_close(children[i].children);
        }
    },

    fn_search_group: function(cid, childNodes) {
        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="tree_policy_group"]')[0];

        for(var i=0; i<childNodes.length; i++)
        {
            if(cid === childNodes[i].raw.cid)
            {
                this.fn_tree_expand(childNodes[i]);
                treeObj.getSelectionModel().select(childNodes[i], true);

                return false;
            }

            if(childNodes[i].childNodes.length > 0)
            {
                this.fn_search_group(cid, childNodes[i].childNodes);
            }
        }
    },

    fn_tree_expand: function(_node) {
        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="tree_policy_group"]')[0];
        var _parent = _node.parentNode;

        if(_parent === null || typeof _parent === 'undefined'){
            return;
        } else {
            treeObj.expandNode(_parent,false,function(){
                _parent.isExpandingOrCollapsing = false;
            });
            this.fn_tree_expand(_parent);
        }
    }

});
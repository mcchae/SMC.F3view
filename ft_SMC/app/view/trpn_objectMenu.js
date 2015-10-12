
Ext.define('SMC.view.trpn_objectMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.trpn_objectMenu',

    requires: [
        'SMC.view.tool_smc_object_group_control',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.toolbar.Toolbar'
    ],

    height: 459,
    itemId: 'trpn_objectMenu',
    width: 270,
    resizable: false,
    bodyBorder: true,
    animCollapse: true,
    collapsible: true,
    title: '객체 그룹',
    hideHeaders: true,
    rootVisible: false,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            bodyStyle: {
                background: 'white',
                padding: '5px',
                'border-style': 'none'
            },
            viewConfig: {
                id: 'trv_objectMenu',
                loadMask: true,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {

                    })
                ],
                listeners: {
                    afterrender: {
                        fn: me.onTrv_objectMenuAfterRender,
                        scope: me
                    },
                    beforedrop: {
                        fn: me.onTrv_objectMenuBeforeDrop,
                        scope: me
                    }
                }
            },
            listeners: {
                afterrender: {
                    fn: me.onObject_treeAfterRender,
                    scope: me
                },
                select: {
                    fn: me.onTrpn_objectMenuSelect,
                    scope: me
                }
            },
            dockedItems: [
                {
                    xtype: 'smc_object_group_control',
                    dock: 'top',
                    listeners: {
                        afterrender: {
                            fn: me.onToolbarAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onTrv_objectMenuAfterRender: function(component, eOpts) {
        // 2015.05.06 김민수 ==================================================================================================================================================
        //
        // 일 시 : 2015.05.06
        //
        // 설 명 : IPSEC 대상 그룹을 IPSEC 일괄편집 윈도우의 파라미터로 전달합니다.
        //
        // 수 정 :
        //
        // - (2015.05.06 김민수 : IPSEC 일괄편집 기능 정의)
        //
        // ===================================================================================================================================================================

        var obj_Context_Array = [

            {
                'name' : 'IPSEC 대상 일괄 편집',
                'itemId' : 'id_ipsec_compile',
                'children' : null,
                'callback' : function(){


                    var selectModel = component.getSelectionModel().getSelection()[0];

                    if(selectModel){

                        var group_cid = selectModel.raw.cid;

                        var win_batchipsec = Ext.create('widget.object_ipsec_compile', {

                            'selectCids' : group_cid,
                            'applyObject' : 'group'

                        });

                        win_batchipsec.show();

                    }
                    else{

                        alertMessage('수정할 객체를 선택하세요.', null);

                    }

                }
            }
        ];

        var contextCallback = function(menuInstance){

            var tree_select = component.getSelectionModel().getSelection()[0];

            menuInstance.down('[itemId=id_ipsec_compile]').disable();

            if(tree_select){

                if(tree_select.raw._kind === 'obj_ipsec_peer'){

                    menuInstance.down('[itemId=id_ipsec_compile]').enable();

                }
            }
        };

        makeContextMenu({'itemId' : 'mn_obj_tree_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);
    },

    onTrv_objectMenuBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        if(data.records[0].raw['default'] === true || overModel.raw._kind !== data.records[0].raw._kind)
        {
            return false;
        }

        return true;
    },

    onObject_treeAfterRender: function(component, eOpts) {
        component.set_obj_tree();
    },

    onToolbarAfterRender: function(component, eOpts) {
        var addBtn = component.down('[itemId=addGroup]');
        var modBtn = component.down('[itemId=modGroup]');
        var delBtn = component.down('[itemId=delGroup]');
        var searchBtn = component.down('[itemId=searchGroup]');
        var openBtn = component.down('[itemId=openGroup]');
        var closeBtn = component.down('[itemId=closeGroup]');
        var recursiveBtn = component.down('[itemId=recursiveGroup]');
        var refreshBtn = component.down('[itemId=refreshGroup]');
        var treeObj = component.up('[itemId=trpn_objectMenu]');

        addBtn.on('click', function(){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection.raw._kind)
            {
                var groupParams = null;

                if(treeSelection)
                    groupParams = treeSelection.raw.cid;
                else
                    groupParams = treeObj.getRootNode().raw.cid;

                if(groupParams){

                    Ext.create('widget.smc_object_group_set', {
                        mode : 'ADD',
                        wndTitle : '그룹 추가',
                        groupParams : groupParams

                    }).show();

                    return true;
                }
                else{

                    Ext.Msg.show({ title : '그룹 추가 에러', msg : '기본 정보가 없습니다. 관리자에게 문의하세요.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                    return false;
                }
            }
        });

        addBtn.on('enable', function(button){

            if(button.cls === 'common_plus_disable')
            {
                button.removeCls('common_plus_disable');
                button.addCls('common_plus_enable');
                button.cls = 'common_plus_enable';
            }
        });

        addBtn.on('disable', function(button){

            if(button.cls === 'common_plus_enable')
            {
                button.removeCls('common_plus_enable');
                button.addCls('common_plus_disable');
                button.cls = 'common_plus_disable';
            }
        });

        modBtn.on('click', function(){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

            if(treeSelection.raw._kind)
            {
                var groupParams = null;

                if(treeSelection)
                    groupParams = treeSelection.raw.cid;
                else
                    groupParams = treeObj.getRootNode().raw.cid;

                if(groupParams){

                    Ext.create('widget.smc_object_group_set', {
                        mode : 'MOD',
                        wndTitle : '그룹 수정',
                        groupParams : groupParams,
                        groupName : treeSelection.raw.text

                    }).show();

                    return true;
                }
                else{

                    Ext.Msg.show({ title : '그룹 추가 에러', msg : '기본 정보가 없습니다. 관리자에게 문의하세요.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                    return false;
                }
            }
        });

        modBtn.on('enable', function(button){

            if(button.cls === 'common_modify_disable')
            {
                button.removeCls('common_modify_disable');
                button.addCls('common_modify_enable');
                button.cls = 'common_modify_enable';
            }
        });

        modBtn.on('disable', function(button){

            if(button.cls === 'common_modify_enable')
            {
                button.removeCls('common_modify_enable');
                button.addCls('common_modify_disable');
                button.cls = 'common_modify_disable';
            }
        });

        delBtn.on('click', function(){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];
            var parent = treeObj.getSelectionModel().getSelection()[0].parentNode;

            if(treeSelection.raw._kind)
            {
                Ext.Msg.show({ title : '그룹 삭제 확인', msg : '선택된 그룹을 삭제하시겠습니까?', buttons : Ext.Msg.YESNO, icon : Ext.Msg.QUESTION,

                fn : function(res){

                     if(res === 'yes'){

                         try{
                             var serviceName = 'ftSMC';

                             var rpcFunc = 'delGroup';
                             var params = {
                                 cid : Ext.encode(treeSelection.raw.cid)
                             };

                             request_helper.xmlrpc_call_Ajax_Post(
                                 serviceName,
                                 rpcFunc,
                                 params,
                                 function(response){

                                     if(response)
                                     {
                                         if(response.errcode)
                                         {
                                             if(response.errcode === 5003)
                                             {
                                                 treeObj.set_obj_tree(treeSelection.raw);
                                             }
                                         }
                                         else
                                         {
                                             treeSelection.remove(true);

                                             if(parent.childNodes.length < 1)
                                             {
                                                 parent.data.leaf = true;
                                                 parent.raw.leaf = true;
                                             }

                                             treeObj.getView().refresh();
                                         }
                                     }
                                 }
                             );
                         }
                         catch(err){

                             Ext.Msg.show({ title : '그룹 삭제 에러', msg : '다음과 같은 에러가 발생하였습니다.<br><br>?' + err, buttons : Ext.Msg.YESNO, icon : Ext.Msg.QUESTION});
                         }
                     }
                  }

              });
            }

        });

        delBtn.on('enable', function(button){

            if(button.cls === 'common_delete_disable')
            {
                button.removeCls('common_delete_disable');
                button.addCls('common_delete_enable');
                button.cls = 'common_delete_enable';
            }
        });

        delBtn.on('disable', function(button){

            if(button.cls === 'common_delete_enable')
            {
                button.removeCls('common_delete_enable');
                button.addCls('common_delete_disable');
                button.cls = 'common_delete_disable';
            }
        });

        treeObj.group_click_count = 0;

        openBtn.on('click', function(){

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
        });

        openBtn.on('enable', function(button){

            if(button.cls === 'common_folder_open_disable')
            {
                button.removeCls('common_folder_open_disable');
                button.addCls('common_folder_open');
                button.cls = 'common_folder_open';
            }
        });

        openBtn.on('disable', function(button){

            if(button.cls === 'common_folder_open')
            {
                button.removeCls('common_folder_open');
                button.addCls('common_folder_open_disable');
                button.cls = 'common_folder_open_disable';
            }
        });

        closeBtn.on('click', function(){

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
        });

        closeBtn.on('enable', function(button){

            if(button.cls === 'common_folder_close_disable')
            {
                button.removeCls('common_folder_close_disable');
                button.addCls('common_folder_close');
                button.cls = 'common_folder_close';
            }
        });

        closeBtn.on('disable', function(button){

            if(button.cls === 'common_folder_close')
            {
                button.removeCls('common_folder_close');
                button.addCls('common_folder_close_disable');
                button.cls = 'common_folder_close_disable';
            }
        });


        searchBtn.on('click', function(){

            var dlg = SMC_VIEW.make_find_treenode_window('그룹검색', treeObj);
            dlg.show();

        });

        recursiveBtn.on('click', function(button){

            var treeSelection = treeObj.getSelectionModel().getSelection()[0];

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
                Ext.ComponentQuery.query('#gpn_objectList')[0].gridRefresh('treeSelect', treeSelection);
            }
        });

        refreshBtn.on('click', function(){

            treeObj.set_obj_tree();
        });
    },

    onTrpn_objectMenuSelect: function(rowmodel, record, index, eOpts) {
        Ext.ComponentQuery.query('#gpn_objectList')[0].gridRefresh('treeSelect', record);
    },

    set_obj_tree: function(new_group) {
        var me = this;

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj')
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                obj_tree_expand(response.children);

                me.setRootNode(response);

                if(new_group)
                {
                    me.getSelectionModel().store.each(function(data, idx){

                        if(data.raw.gtype === new_group._kind)
                        {
                            Ext.getCmp('pnl_objectList').searchChildGroup(new_group.cid, data.childNodes);
                            return false;
                        }
                        else if(new_group._kind.indexOf(data.raw.gtype) > -1)
                        {
                            if(data.childNodes.length > 0)
                            {
                                for(var i=0; i<data.childNodes.length; i++)
                                {
                                    if(data.childNodes[i].raw.gtype === new_group._kind)
                                    {
                                        Ext.getCmp('pnl_objectList').searchChildGroup(new_group.cid, data.childNodes[i].childNodes);
                                        return false;
                                    }
                                }
                            }
                        }
                    });
                }

                if(me.getStore())
                    me.getView().refresh();
            }
        );

    },

    tree_expand: function(_node) {
        var treeObj = this;
        var _parent = _node.parentNode;

        if(_parent === null || typeof _parent === 'undefined'){
            return;
        } else {
            treeObj.expandNode(_parent,false,function(){
                _parent.isExpandingOrCollapsing = false;
            });
            treeObj.tree_expand(_parent);
        }
    },

    searchObject: function(g_cid, object_store, object_grid, object_tree, select_data) {
        var treeObj = this;

        var _svc = 'ftSMC',
            _func = 'getObjectList',
            _params = {
                g_cid : Ext.encode(g_cid),
                start : 0,
                limit : Ext.encode(object_store.totalCount)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                var pageNumber = 1;

                Ext.each(response.result, function(data, idx){

                    if(data['@cid'] === select_data.data['@cid'])
                    {
                        if(idx > 100)
                        {
                            pageNumber = parseInt(idx/100) + 1;
                        }
                        return false;
                    }
                });

                object_store.loadPage(pageNumber, {
                    callback: function(){

                        object_store.each(function(obj_data, idx2){

                            if(obj_data.data['@cid'] === select_data.data['@cid'])
                            {
                                treeObj.select_grid_click = false;

                                object_grid.getSelectionModel().select(idx2);
                                return false;
                            }
                        });
                    }
                });
            }
        );

    }

});
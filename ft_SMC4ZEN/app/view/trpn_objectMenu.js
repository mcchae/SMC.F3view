
Ext.define('SMC4ZEN.view.trpn_objectMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.trpn_objectMenu',

    requires: [
        'SMC4ZEN.view.trpn_objectMenuViewModel',
        'SMC4ZEN.view.trpn_objectMenuViewController',
        'SMC4ZEN.view.tool_smc_object_group_control',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.toolbar.Toolbar'
    ],

    controller: 'trpn_objectMenu',
    viewModel: {
        type: 'trpn_objectMenu'
    },
    height: 459,
    id: 'trpn_objectMenu',
    itemId: 'trpn_objectMenu',
    resizable: false,
    width: 250,
    animCollapse: true,
    bodyBorder: true,
    bodyStyle: {
        background: 'white',
        padding: '5px',
        'border-style': 'none'
    },
    collapsible: true,
    title: '객체 그룹',
    hideHeaders: true,
    rootVisible: false,
    useArrows: true,

    dockedItems: [
        {
            xtype: 'smc_object_group_control',
            dock: 'top',
            listeners: {
                afterrender: 'onTool_smc_object_group_controlAfterRender'
            }
        }
    ],
    listeners: {
        afterrender: 'onTrpn_objectMenuAfterRender',
        select: 'onTrpn_objectMenuSelect'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                viewConfig: {
                    id: 'trv_objectMenu',
                    loadMask: true,
                    plugins: [
                        Ext.create('Ext.tree.plugin.TreeViewDragDrop', {

                        })
                    ],
                    listeners: {
                        afterrender: 'onTrv_objectMenuAfterRender',
                        itemmouseenter: 'onTrv_objectMenuItemMouseEnter',
                        beforedrop: 'onTrv_objectMenuBeforeDrop'
                    }
                }
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
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
                console.log('response object - ', response);
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

                if(me.getView().store)
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
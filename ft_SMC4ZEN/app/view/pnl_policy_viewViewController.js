
Ext.define('SMC4ZEN.view.pnl_policy_viewViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_policy_view',

    fn_tree_init: function(newraw) {
        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_spd'),
                dummy_root : Ext.encode(false)
            };

        var me = this;

        var pnl_west = this.lookupReference('xtm_policy_west');
        var pnl_group = this.lookupReference('xtm_policy_group');

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                for(var i=0; i<response.children.length; i++){

                    if(response.children[i].gtype === 'obj_spd_ipv6_filter' || response.children[i].gtype === 'obj_spd_ipv6_nat'){

                        response.children.splice(i, 1);

                        i = -1;

                        continue;

                    }

                    me.fn_tree_close(response.children);
                }

                if(pnl_group){

                    pnl_group.setRootNode(response);
                    pnl_group.getView().refresh();

                }

                if(typeof newraw !== 'undefined'){

                    pnl_group.getSelectionModel().store.each(function(data, idx){

                        if(data.raw.gtype === newraw._kind){

                            pnl_west.fn_search_group(newraw.cid, data.childNodes);

                            return false;

                        }

                    });

                }
                else{

                    pnl_group.getSelectionModel().store.each(function(record){

                        if(record.get('gtype') === "obj_spd_ipv4_filter"){

                            pnl_group.getSelectionModel().select(record);

                            return false;

                        }

                    });

                }

            }

        );
    },

    fn_tree_close: function(children) {
        var me = this.lookupReference('zen_policy_group');

        for(var i = 0; i < children.length; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false")
                children[i].expanded = false;

            if(children[i].children)
                this.fn_tree_close(children[i].children);

        }
    },

    fn_list_init: function(raw, _callback) {
        var cid = null;
        var gpn_list = this.lookupReference('xtm_policy_list');
        var pnl_group = this.lookupReference('xtm_policy_group');
        var pnl_policy = this.lookupReference('xtm_policy_listpanel');
        var recursive_option = Ext.ComponentQuery.query('button[itemId=recursiveGroup]')[0].pressed;

        if(typeof raw === 'object'){

            cid = raw.cid;
            pnl_policy.setTitle("정책목록 (" + raw.text + ")");

        }
        else {

            cid = raw;
        }

        var _svc = 'ftSMC',
            _func = 'getPolicyList',
            _params = {
                'g_cid' : Ext.encode(cid),
                'isRecursive' : Ext.encode(recursive_option)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                var store = gpn_list.getStore();

                store.loadData(response);

                if(typeof _callback !== 'undefined'){

                    _callback();

                }

            }

        );
    },

    onTreeNodeAdd: function(thisnode, newnode, ref) {
        var me = this;

        var pnl_group = me.lookupReference('pnl_group');

        var _svc = 'ftSMC',
            _params = {

                'cid' : Ext.encode(newnode.get('cid')),
                't_cid' : Ext.encode(thisnode.get('cid'))

            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'movGroup',
            _params,
            function(res){

                if(res){

                    pnl_group.getSelectionModel().select(newnode);

                }

                //me.fn_list_init(source_gcid);

            }

        );
    },

    fn_show_policy_rule_list: function(record) {
        var me = this;

        var cid = record.get('@cid');
        var name = record.get('name');
        var _kind = record.get('_kind');

        var pnl_policytab = this.lookupReference('xtm_policy_detail');
        var gpn_policylist = this.lookupReference('xtm_policy_list');

        var tab_list = pnl_policytab.items.items;

        var _cid_list = [];

        for(var i in tab_list){

            var _cid = tab_list[i]._policy_cid;

            _cid_list.push(_cid);

        }

        var _index = _cid_list.indexOf(cid);

        if(_index < 0){

            var _svc = 'ftSMC',
                _func = 'getPolicy',
                _params = {

                    cid : Ext.encode(cid)

                };

            gpn_policylist.setLoading(true);

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    gpn_policylist.setLoading(false);

                    var _kind = response._kind, tabItem;

                    if(_kind === 'obj_spd_ipv6_filter' || _kind === 'obj_spd_ipv6_nat'){

                        tabItem = Ext.create('SMC4ZEN.view.pnl_policy_ipv6_filtering',{

                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'

                        });

                    }
                    else if(_kind === 'obj_spd_whiteblack'){

                        tabItem = Ext.create('SMC4ZEN.view.pnl_xtm_white_black_list',{

                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'

                        });

                    }
                    else {

                        tabItem = Ext.create('SMC4ZEN.view.pnl_policy_edit',{

                            _kind : _kind,
                            _policy_cid : cid,
                            _policy : response,
                            iconCls : 'ico_' + _kind + '_16'

                        });

                    }

                    tabItem.title = name;
                    pnl_policytab.add(tabItem);
                    pnl_policytab.setActiveTab(tabItem);

                }

            );

        }
        else {

            pnl_policytab.setActiveTab(_index);

        }
    },

    onBt_addClick: function(button, e, eOpts) {

        var pnl_group = this.lookupReference('xtm_policy_group');

        var grp_select = pnl_group.getSelection()[0];

        if(!grp_select){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Choose a parent group first',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else{

            var win_group = Ext.create('SMC4ZEN.view.win_policy_add_group', {

                _policy_grp : this,
                _parent_cid : grp_select.get('cid'),
                _parent_node : grp_select

            });

            win_group.show();

        }
    },

    onBt_modClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        var grp_select = pnl_group.getSelection()[0];

        if(!grp_select){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Choose a parent group first',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else{

            var win_group = Ext.create('SMC4ZEN.view.win_policy_modify_group', {

                _policy_grp : this,
                _cid : grp_select.get('cid'),
                _grp_name : grp_select.get('text')

            });

            win_group.show();

        }
    },

    onBt_delClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        var gpn_select = pnl_group.getSelection()[0];

        if(!gpn_select){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Choose a group name first',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else {

            var win_group = Ext.create('SMC4ZEN.view.win_policy_del_group', {
                _policy_grp : this,
                _cid : gpn_select.get('cid'),
                _grp_name : gpn_select.get('text')
            });

            win_group.show();
        }
    },

    onBt_searchClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        var win_search = SMC_VIEW.make_find_treenode_window('그룹검색', pnl_group);

        win_search.show();
    },

    onBt_recursiveClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        var grp_select = pnl_group.getSelection()[0];

        if(button.pressed){

            if(button.cls === 'common_rule_send'){

                button.removeCls('common_rule_send');
                button.addCls('common_rule_pressed');
                button.cls = 'common_rule_pressed';

            }
        }
        else{

            if(button.cls === 'common_rule_pressed'){

                button.removeCls('common_rule_pressed');
                button.addCls('common_rule_send');
                button.cls = 'common_rule_send';

            }

        }

        if(grp_select){

            this.fn_list_init(grp_select.raw);
            this.kind = grp_select.get('_kind');

        }
    },

    onBt_recursiveToggle: function(button, pressed, eOpts) {
        SPD_GROUP_RECURSIVE = pressed;
    },

    onBt_expandClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_open(pnl_group, grp_select);

        }
    },

    onBt_foldClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_close(pnl_group, grp_select);

        }
    },

    onViewBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        if(data.records[0].raw['default'] === true || overModel.raw._kind !== data.records[0].raw._kind)
        {
            return false;
        }

        return true;
    },

    onTree_policy_groupRender: function(component, eOpts) {
        var me = this;
        var pnl_group = me.lookupReference('xtm_policy_group');

        me.fn_tree_init();

        var policy_Context_Array = [

        {
            'name' : '정책 일괄추가',
            'itemId' : 'id_policyCompile',
            'children' : null,
            'callback' : function(){

                var _tModel = pnl_group.getSelection();

                var _len = _tModel.length;

                if(_len > 0){

                    request_helper.xmlrpc_call_Ajax_Post(
                    'ftSMC',
                    'getPolicyList',
                    {
                        g_cid : Ext.encode(_tModel[0].get('cid')),
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

                            target = _tModel[0].get('cid');
                            target_text = _tModel[0].get('text');

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

                }
                else {

                    SMC.errorWindow('일괄추가할 그룹을 선택해주세요');

                }

            }

        }

        ];

        var contextCallback = function(menuInstance){

            var _tModel = pnl_group.getSelection();

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

        makeContextMenu({'itemId' : 'mn_policy_context', 'width' : 180, 'border' : false}, pnl_group, contextCallback, policy_Context_Array);
    },

    onTree_policy_groupSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        me.fn_list_init(record.raw);

        me.kind = record.get('_kind');
    },

    onBt_addClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');
        var gpn_policylist = this.lookupReference('xtm_policy_list');
        var grp_select = pnl_group.getSelection()[0];

        var _selectedTabItem = '';

        if(!grp_select){

            Ext.Msg.show({

                title: 'Error Message',
                msg: 'Choose a parent group first',
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO

            });

        }
        else{

            var _gtype = grp_select.get('gtype');

            if(_gtype === '' || typeof _gtype === 'undefined'){

                _gtype = grp_select.get('_kind');

            }

            var win_group = Ext.create('SMC4ZEN.view.win_policy_spd_add',{

                kind : _gtype,
                _policy_grp : this,
                g_cid : grp_select.get('cid')

            });

            win_group.show();

        }
    },

    onBt_modClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');
        var gpn_policylist = this.lookupReference('xtm_policy_list');

        var _sModel = pnl_group.getSelection()[0];
        var _gModel = gpn_policylist.getSelection()[0];

        var _kind = '';

        if(_sModel.parentNode.raw){

            _kind = _sModel.parentNode.get('gtype');

        }
        else{
            _kind = _sModel.raw.gtype;
        }

        if(_gModel && _sModel){

            var dlg = Ext.create('SMC4ZEN.view.win_policy_spd_modify',{

                kind : _kind,
                _policy_grp : this,
                _obj : _gModel.data,
                _obj_cid : _sModel.get('cid'),
                _policy_name : _gModel.get('name')

            });

            dlg.show();

        }
        else {

            if(!_gModel){

                Ext.Msg.show({
                    title: 'Error Message',
                    msg: 'Choose a group first',
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });


            }
            else {

                Ext.Msg.show({
                    title: 'Error Message',
                    msg: 'Choose a policy list first',
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

            }

        }
    },

    onBt_delClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('xtm_policy_group');
        var gpn_policylist = this.lookupReference('xtm_policy_list');

        var _sModel = pnl_group.getSelection()[0];
        var _gModel = gpn_policylist.getSelection();

        var _kind = '';

        if(_sModel.parentNode.raw){

            _kind = _sModel.parentNode.get('gtype');

        }
        else{

            _kind = _sModel.get('gtype');

        }

        if(_gModel && _sModel){

            var dlg = Ext.create('SMC4ZEN.view.win_policy_spd_del',{

                kind : _kind,
                _policy_grp : this,
                _obj : _gModel,
                _obj_cid : _sModel.get('cid')

            });

            dlg.show();

        }
        else {

            if(!_gModel){

                Ext.Msg.show({

                    title: 'Error Message',
                    msg: 'Choose a group first',
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO

                });

            }
            else{

                Ext.Msg.show({

                    title: 'Error Message',
                    msg: 'Choose a policy list first',
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO

                });

            }

        }
    },

    onBt_searchClick1: function(button, e, eOpts) {
        var me = this;

        var pnl_group = this.lookupReference('xtm_policy_group');
        var gpn_policylist = this.lookupReference('xtm_policy_list');

        var _clickFn = function(record){

            search_tree(
            pnl_group,
            record.get('@groupcid'),
            'cid',
            function(_target_array){

                function _tree_expand(_node){

                    var _parent = _node.parentNode;

                    if(_parent == null || typeof _parent === 'undefined'){

                        return;

                    }
                    else {

                        pnl_group.expandNode(_parent);
                        _tree_expand(_parent);

                    }

                }

                _tree_expand(_target_array[0]);

                pnl_group.getSelectionModel().select(_target_array[0], true);

                me.kind = _target_array[0].get('_kind');

                me.fn_list_init(_target_array[0].raw.cid, function(){

                    var _store = gpn_policylist.getStore();

                    var _row = _store.findRecord('@cid', record.get('@cid'));

                    gpn_policylist.getSelectionModel().select(_row, true);

                });

            }

            );

        };

        var _dblclickFn = function(record){

            me.fn_show_policy_rule_list(record);

        };

        var _kind = me.kind;

        if(_kind === null || typeof _kind === 'undefined'){

            SMC.errorWindow('대상 그룹을 선택해주세요');

        }
        else {

            SMC_VIEW.make_find_policy_window('정책 검색', me.kind, _clickFn, _dblclickFn).show();

        }
    },

    onBt_printClick: function(button, e, eOpts) {
        var me = this;
        var gpn_policylist = this.lookupReference('xtm_policy_list');
        var grp_select = gpn_policylist.getSelection();
        var _len = grp_select.length;

        if(_len > 0){

            var _cidList = [];

            for(var i = 0 ; i < _len ; i++){

                var _cid = grp_select[i].get('@cid');

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

        }
        else {

            SMC.errorWindow('출력할 정책목록을 선택해주세요');

        }
    },

    onGpnl_policy_listItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.fn_show_policy_rule_list(record);
    },

    onPnl_policy_groupBoxReady: function(component, width, height, eOpts) {
        var me = this;

        var pnl_group = me.lookupReference('xtm_policy_group');
        var gpn_policylist = me.lookupReference('xtm_policy_list');

        gpn_policylist.bindStore(Ext.create('SMC4ZEN.store.st_policy_list'));

        //정책 목록 -> 정책 트리로 드래그앤 드랍 기능

        me.groupTreeDropTarget = new Ext.dd.DropTarget(pnl_group.body.dom ,{

            ddGroup : 'policylist-to-grouptree',

            notifyEnter: function(ddSource, e, data) {

                pnl_group.isDD = true;
                pnl_group.on('itemmouseup', me.onTreeNodeMouseUp, me);

            },

            notifyDrop: function(ddSource, e, data) {

                return true;

            }

        });


        var _tv = pnl_group.getView();

        _tv.on('drop', function(node, data, overModel, dropPosition, eOpts){

            me.onTreeNodeAdd(overModel, data.records[0]);

        });

        pnl_group.group_click_count = 0;

        /*

        var me = this;
        //me.contextMenu.destroy();

        var target = me.groupTreeDropTarget;
        if (target) {
            target.unreg();
            me.groupTreeDropTarget = null;
        }

        */
    }

});

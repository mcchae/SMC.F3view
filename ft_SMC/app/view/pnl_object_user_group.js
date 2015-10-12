
Ext.define('SMC.view.pnl_object_user_group', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC.view.tool_smc_object_group_control',
        'SMC.view.tool_smc_object_control',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action'
    ],

    border: false,
    height: 550,
    itemId: 'pnl_object_user_group',
    minHeight: 550,
    minWidth: 1000,
    padding: '0 20 10 20',
    width: 1200,
    resizable: true,
    constrainHeader: true,
    title: '사용자 그룹',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_user_group',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1.2,
                            border: false,
                            itemId: 'pnl_user_group',
                            margin: '0 0 10 0',
                            header: false,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'smc_object_group_control',
                                            margins: '0 10 5 0',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onToolbarAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'treepanel',
                                            getGridList: function(type, data, option) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');

                                                var object_tree = this;
                                                var _grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                var _gStore = _grid.getStore();
                                                var select_data = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];

                                                switch(type)
                                                {
                                                    case 'add':

                                                    if(data['@cid'] !== "00000000000000000000000000000000")
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data['@groupcid'])
                                                        };

                                                        _gStore.loadPage(_gStore.currentPage);
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

                                                    if(option.length < 1)
                                                    {
                                                        Ext.each(data, function(record, idx){

                                                            _gStore.remove(record);
                                                        });
                                                    }
                                                    else if(data.length > option.length)
                                                    {
                                                        var fail_array = [];

                                                        Ext.each(option, function(fail_record){
                                                            fail_array.push(fail_record['@cid']);
                                                        });

                                                        Ext.each(data, function(record, idx){

                                                            if(fail_array.indexOf(record.data['@cid']) < 0)
                                                            {
                                                                _gStore.remove(record);
                                                            }
                                                        });
                                                    }

                                                    break;
                                                    case 'treeSelect':

                                                    if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
                                                    {
                                                        _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
                                                    }

                                                    if(object_tree.select_grid_click && select_data)
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data.raw.cid),
                                                            isRecursive : false
                                                        };

                                                        _gStore.loadPage(1, {
                                                            callback: function(){
                                                                object_tree.searchObject(data.raw.cid, _gStore, _grid, object_tree, select_data);
                                                            }
                                                        });
                                                    }
                                                    else
                                                    {
                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(data.raw.cid),
                                                            isRecursive : true
                                                        };
                                                        _gStore.loadPage(1);
                                                    }

                                                    break;
                                                }
                                            },
                                            searchObject: function(g_cid, object_store, object_grid, object_tree, select_data) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');

                                                var treeObj = this;

                                                var ctn_group = me.down('container[itemId="ctn_user_group"]');

                                                var _svc = 'ftSMC',
                                                    _func = 'getObjectList',
                                                    _params = {
                                                        g_cid : Ext.encode(g_cid),
                                                        start : 0,
                                                        limit : Ext.encode(object_store.totalCount)
                                                    };

                                                ctn_group.setLoading(true);

                                                request_helper.xmlrpc_call_Ajax_Post(
                                                _svc,
                                                _func,
                                                _params,
                                                function(response){

                                                    ctn_group.setLoading(false);

                                                    var pageNumber = 1;

                                                    Ext.each(response.result, function(data, idx){

                                                        if(data['@cid'] === select_data.data['#text'])
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

                                                                if(obj_data.data['@cid'] === select_data.data['#text'])
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

                                            },
                                            searchChildGroup: function(cid, childNodes) {
                                                var me = this.up('window[itemId="pnl_object_svc_group"]');

                                                var treeObj = this;

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
                                                        treeObj.searchChildGroup(cid, childNodes[i].childNodes);
                                                    }
                                                }
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
                                            set_obj_tree: function(new_group) {
                                                var _svc  = 'ftSMC',
                                                    _func = 'getGroup',
                                                    _params = {
                                                        gtype : Ext.encode('obj_usr')
                                                    };

                                                var treeObj = this;

                                                treeObj.up('container[itemId="ctn_user_group"]').setLoading(true);

                                                request_helper.xmlrpc_call_Ajax_Post(
                                                _svc,
                                                _func,
                                                _params,
                                                function(response){

                                                    treeObj.up('container[itemId="ctn_user_group"]').setLoading(false);

                                                    for(var i=0; i<response.children.length; i++)
                                                    {
                                                        if(response.children[i].gtype !== 'obj_usr_list')
                                                        {
                                                            response.children.splice(i,1);
                                                            i = -1;
                                                        }
                                                    }

                                                    tree_children_expand(response.children);

                                                    treeObj.setRootNode(response);

                                                    if(new_group)
                                                    {
                                                        treeObj.getSelectionModel().store.each(function(data, idx){

                                                            if(data.raw.gtype === new_group._kind)
                                                            {
                                                                treeObj.up('window[itemId="pnl_object_user_group"]').down('gridpanel[itemId=gpn_object_grid]').searchChildGroup(new_group.cid, data.childNodes);
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
                                                                            treeObj.up('window[itemId="pnl_object_user_group"]').down('gridpanel[itemId=gpn_object_grid]').searchChildGroup(new_group.cid, data.childNodes[i].childNodes);
                                                                            return false;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    }

                                                    if(treeObj.getStore())
                                                    treeObj.getView().refresh();

                                                }
                                                );
                                            },
                                            flex: 1,
                                            itemId: 'trpn_object_tree',
                                            margin: '0 10 5 0',
                                            autoScroll: true,
                                            title: '',
                                            rootVisible: false,
                                            useArrows: true,
                                            viewConfig: {

                                            },
                                            listeners: {
                                                select: {
                                                    fn: me.onTrpn_object_treeSelect,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'smc_object_control',
                                            margins: '0 10 0 0',
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

                                                var me = this.up('window[itemId=pnl_object_user_group]');

                                                var _gStore = me.down('gridpanel[itemId="gpn_object_grid"]').getStore();

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

                                                        condition.kind = ['obj_usr_list'];
                                                    }

                                                    if(condition){

                                                        _gStore.getProxy().extraParams = {

                                                            'condition' : Ext.encode(condition)

                                                        };

                                                        _gStore.getProxy().url = 'api/ftSMC/findObjectList/';

                                                        Ext.data.JsonP.request({

                                                            url : '/api/ftSMC/session_ping',
                                                            params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                            success : function(response){

                                                                if(response.retcode){

                                                                    _gStore.loadPage(1);

                                                                }
                                                                else{

                                                                    if(response.errcode === 268435490){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                    }
                                                                    else if(response.errcode === 268435489){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }
                                                                    else if(response.errcode === 268435527){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }

                                                                }

                                                            },
                                                            failure : function(response){

                                                                console.log(response);

                                                            }

                                                        });

                                                    }

                                                }
                                            },
                                            margins: '0 10 0 0',
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
                                                    valueField: 'cond_id',
                                                    listeners: {
                                                        afterrender: {
                                                            fn: me.onCmb_ObjectConditionAfterRender11,
                                                            scope: me
                                                        }
                                                    }
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
                                                            fn: me.onTxf_ObjectSearchTextKeypress111,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var treeSel = this.up('window[itemId=pnl_object_user_group]').down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0];

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
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            gridRefresh: function(type, data, option) {
                                                var _grid = this;
                                                var _gStore = _grid.getStore();

                                                var me = _grid.up('window[itemId=pnl_object_user_group]');

                                                var toolbar_control = me.down('toolbar[itemId="tool_smc_object_control"]');
                                                var toolbar_control_group = me.down('toolbar[itemId="tool_smc_object_group_control"]');
                                                var recursive_option = toolbar_control_group.down('button[itemId="recursiveGroup"]').pressed;

                                                // 2015.06.08 김민수 - 찾기 컴포넌트 정의

                                                var tool_search = me.down('[itemId=tool_obj_search]');

                                                var treeSel = me.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0];

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

                                                        Ext.data.JsonP.request({

                                                            url : '/api/ftSMC/session_ping',
                                                            params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                            success : function(response){

                                                                if(response.retcode){

                                                                    _gStore.loadPage(_gStore.currentPage, {
                                                                        callback: function(){

                                                                            toolbar_control.down('button[itemId="addObject"]').enable();
                                                                        }
                                                                    });

                                                                }
                                                                else{

                                                                    if(response.errcode === 268435490){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                    }
                                                                    else if(response.errcode === 268435489){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }
                                                                    else if(response.errcode === 268435527){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }

                                                                }

                                                            },
                                                            failure : function(response){

                                                                console.log(response);

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
                                                            g_cid : Ext.encode(me.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0].raw.cid),
                                                            isRecursive : Ext.encode(recursive_option)
                                                        };

                                                        Ext.data.JsonP.request({

                                                            url : '/api/ftSMC/session_ping',
                                                            params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                            success : function(response){

                                                                if(response.retcode){

                                                                    _gStore.loadPage(_gStore.currentPage, {
                                                                        callback: function(){

                                                                            toolbar_control.down('button[itemId="addObject"]').enable();
                                                                        }
                                                                    });

                                                                }
                                                                else{

                                                                    if(response.errcode === 268435490){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                    }
                                                                    else if(response.errcode === 268435489){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }
                                                                    else if(response.errcode === 268435527){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }

                                                                }

                                                            },
                                                            failure : function(response){

                                                                console.log(response);

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
                                                        g_cid : Ext.encode(me.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0].raw.cid),
                                                        isRecursive : Ext.encode(recursive_option)
                                                    };

                                                    Ext.data.JsonP.request({

                                                        url : '/api/ftSMC/session_ping',
                                                        params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                        success : function(response){

                                                            if(response.retcode){

                                                                _gStore.loadPage(_gStore.currentPage, {
                                                                    callback: function(){

                                                                        toolbar_control.down('button[itemId="addObject"]').enable();
                                                                    }
                                                                });

                                                            }
                                                            else{

                                                                if(response.errcode === 268435490){

                                                                    Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                }
                                                                else if(response.errcode === 268435489){

                                                                    Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                    Ext.Msg.show({
                                                                        title: 'WeGuardia™ SMC',
                                                                        msg: response.errmsg,
                                                                        width: 300,
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.window.MessageBox.INFO
                                                                    });
                                                                }
                                                                else if(response.errcode === 268435527){

                                                                    Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                    Ext.Msg.show({
                                                                        title: 'WeGuardia™ SMC',
                                                                        msg: response.errmsg,
                                                                        width: 300,
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.window.MessageBox.INFO
                                                                    });
                                                                }

                                                            }

                                                        },
                                                        failure : function(response){

                                                            console.log(response);

                                                        }

                                                    });

                                                    break;
                                                    case 'treeSelect':

                                                    if(data.raw._kind){

                                                        _gStore.getProxy().url = 'api/ftSMC/getObjectList/';

                                                        var select_record = _grid.getSelectionModel().getSelection()[0];
                                                        var select_grid_click = me.down('treepanel[itemId="trpn_object_tree"]').select_grid_click;

                                                        if(select_grid_click && select_record)
                                                        {
                                                            _gStore.getProxy().extraParams = {
                                                                g_cid : Ext.encode(data.raw.cid),
                                                                isRecursive : Ext.encode(false)
                                                            };

                                                            Ext.data.JsonP.request({

                                                                url : '/api/ftSMC/session_ping',
                                                                params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                                success : function(response){

                                                                    if(response.retcode){

                                                                        _gStore.loadPage(1, {
                                                                            callback: function(){

                                                                                me.down('treepanel[itemId="trpn_object_tree"]').searchObject(data.raw.cid, _gStore, _grid,
                                                                                me.down('treepanel[itemId="trpn_object_tree"]'), select_record);

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
                                                                    else{

                                                                        if(response.errcode === 268435490){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                        }
                                                                        else if(response.errcode === 268435489){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                            Ext.Msg.show({
                                                                                title: 'WeGuardia™ SMC',
                                                                                msg: response.errmsg,
                                                                                width: 300,
                                                                                buttons: Ext.Msg.OK,
                                                                                icon: Ext.window.MessageBox.INFO
                                                                            });
                                                                        }
                                                                        else if(response.errcode === 268435527){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                            Ext.Msg.show({
                                                                                title: 'WeGuardia™ SMC',
                                                                                msg: response.errmsg,
                                                                                width: 300,
                                                                                buttons: Ext.Msg.OK,
                                                                                icon: Ext.window.MessageBox.INFO
                                                                            });
                                                                        }

                                                                    }

                                                                },
                                                                failure : function(response){

                                                                    console.log(response);

                                                                }

                                                            });

                                                        }
                                                        else
                                                        {
                                                            _gStore.getProxy().extraParams = {
                                                                g_cid : Ext.encode(data.raw.cid),
                                                                isRecursive : Ext.encode(recursive_option)
                                                            };


                                                            Ext.data.JsonP.request({

                                                                url : '/api/ftSMC/session_ping',
                                                                params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                                success : function(response){

                                                                    if(response.retcode){

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
                                                                    else{

                                                                        if(response.errcode === 268435490){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                        }
                                                                        else if(response.errcode === 268435489){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                            Ext.Msg.show({
                                                                                title: 'WeGuardia™ SMC',
                                                                                msg: response.errmsg,
                                                                                width: 300,
                                                                                buttons: Ext.Msg.OK,
                                                                                icon: Ext.window.MessageBox.INFO
                                                                            });
                                                                        }
                                                                        else if(response.errcode === 268435527){

                                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                            Ext.Msg.show({
                                                                                title: 'WeGuardia™ SMC',
                                                                                msg: response.errmsg,
                                                                                width: 300,
                                                                                buttons: Ext.Msg.OK,
                                                                                icon: Ext.window.MessageBox.INFO
                                                                            });
                                                                        }

                                                                    }

                                                                },
                                                                failure : function(response){

                                                                    console.log(response);

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

                                                        toolbar_control_group.down('button[itemId="addGroup"]').disable();
                                                        toolbar_control_group.down('button[itemId="modGroup"]').disable();
                                                        toolbar_control_group.down('button[itemId="delGroup"]').disable();
                                                        toolbar_control.down('button[itemId="addObject"]').disable();
                                                        toolbar_control.down('button[itemId="modObject"]').disable();
                                                        toolbar_control.down('button[itemId="delObject"]').disable();
                                                        toolbar_control_group.down('button[itemId="openGroup"]').enable();
                                                        toolbar_control_group.down('button[itemId="closeGroup"]').enable();


                                                        _gStore.getProxy().extraParams = {
                                                            g_cid : Ext.encode(null),
                                                            isRecursive : Ext.encode(false)
                                                        };

                                                        Ext.data.JsonP.request({

                                                            url : '/api/ftSMC/session_ping',
                                                            params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                            success : function(response){

                                                                if(response.retcode){

                                                                    _gStore.loadPage(1);
                                                                }
                                                                else{

                                                                    if(response.errcode === 268435490){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(true);

                                                                    }
                                                                    else if(response.errcode === 268435489){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }
                                                                    else if(response.errcode === 268435527){

                                                                        Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                        Ext.Msg.show({
                                                                            title: 'WeGuardia™ SMC',
                                                                            msg: response.errmsg,
                                                                            width: 300,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.window.MessageBox.INFO
                                                                        });
                                                                    }

                                                                }

                                                            },
                                                            failure : function(response){

                                                                console.log(response);

                                                            }

                                                        });
                                                    }

                                                    break;

                                                }
                                            },
                                            searchChildGroup: function(cid, childNodes) {
                                                var treeObj = this.up('window[itemId=pnl_object_user_group]').down('treepanel[itemId="trpn_object_tree"]');

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
                                            flex: 1,
                                            itemId: 'gpn_object_grid',
                                            margin: '0 10 4 0',
                                            autoScroll: true,
                                            header: false,
                                            title: '',
                                            store: 'st_ObjectGroupGrid',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 50,
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
                                                    width: 150,
                                                    dataIndex: 'name',
                                                    text: '추가 객체명'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 221,
                                                    dataIndex: 'desc',
                                                    text: '객체 설명',
                                                    flex: 1
                                                }
                                            ],
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onGpn_ipv4_gridItemDblClick,
                                                    scope: me
                                                },
                                                select: {
                                                    fn: me.onGpn_object_gridSelect,
                                                    scope: me
                                                },
                                                deselect: {
                                                    fn: me.onGpn_object_gridDeselect,
                                                    scope: me
                                                }
                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    dock: 'bottom',
                                                    itemId: 'ptb_objectList',
                                                    margin: '0 0 1 0',
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
                                                    store: 'st_ObjectGroupGrid'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.6,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_object_select_grid',
                                            margin: '0 0 5 0',
                                            autoScroll: true,
                                            title: '',
                                            store: 'st_ObjectSelectGrid',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 30,
                                                    align: 'center'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = 'ico_' + record.data.kind + '_16';
                                                        return value;
                                                    },
                                                    defaultWidth: 180,
                                                    weight: 180,
                                                    dataIndex: '@name',
                                                    text: '선택된 객체 목록',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                view.up('window[itemId="pnl_object_user_group"]').down('gridpanel[itemId="gpn_object_select_grid"]').getStore().removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onGpn_object_select_gridItemDblClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
                                                        var record = object_grid.getSelectionModel().getSelection()[0];

                                                        if(record)
                                                        {
                                                            if(!Object_DuplicateCheck(record.data['@cid'], '#text', select_store))
                                                            {
                                                                alertMessage('[ ' + record.data.name + '] ' + '동일한 객체를 사용하고 있습니다.');
                                                                return false;
                                                            }

                                                            if(record.data['@cid'] === me.object['@cid'])
                                                            {
                                                                alertMessage('그룹 객체로 자기 자신을 추가할 수 없습니다. ' + '[ ' + record.data.name + '] ');
                                                                return false;
                                                            }

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

                                                                select_store.add({
                                                                    '#text': response['@cid'],
                                                                    '@name': response.name,
                                                                    'kind': response._kind

                                                                });
                                                            }
                                                            );
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var object_grid = me.down('gridpanel[itemId="gpn_object_select_grid"]');
                                                        if(!object_grid.getSelectionModel().getSelection()[0]){
                                                            return false;
                                                        }
                                                        var record = object_grid.getSelectionModel().getSelection()[0].data;
                                                        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
                                                        var object_window = Ext.create('SMC.view.pnl_object_user');

                                                        if(object_window)
                                                        {
                                                            var _svc = 'ftSMC',
                                                                _func = 'getObject',
                                                                _params = {
                                                                    cid : Ext.encode(record['#text'])
                                                                };

                                                            request_helper.xmlrpc_call_Ajax_Post(
                                                            _svc,
                                                            _func,
                                                            _params,
                                                            function(response){

                                                                object_window.loadData(response);

                                                                object_window.on('destroy', function() {

                                                                    select_store.each(function(record,idx){

                                                                        if(record.data['#text'] === object_window.object['@cid'])
                                                                        {
                                                                            record.set('@name', object_window.object.name);

                                                                            record.commit();

                                                                            return false;
                                                                        }
                                                                    });

                                                                    treeObj.getGridList('mod', object_window.object);
                                                                });
                                                            }
                                                            );
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                        delObject(select_record, '#text', select_store);
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_user_group"]');

                                                        var search_name;
                                                        var grid_data = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore().data.items;
                                                        var grid_model = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel();

                                                        search_grid(search_name, grid_data, grid_model);
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '검색'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_user_group"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_user_group"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_user_groupAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_user_groupBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
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
        var treeObj = component.up('[itemId=pnl_user_group]').down('[itemId=trpn_object_tree]');

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
                        groupParams : groupParams,
                        treeObj : treeObj

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
                        groupName : treeSelection.raw.text,
                        treeObj : treeObj

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

                         if(treeSelection.raw.cid === component.up('window[itemId="pnl_object_user_group"]').object['@groupcid']){
                             alertMessage('객체가 등록되어 있는 그룹은 삭제할 수 없습니다..');
                             return false;
                         }

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
                component.up('[itemId=pnl_user_group]').down('[itemId=gpn_object_grid]').gridRefresh('treeSelect', treeSelection);
            }
        });

        refreshBtn.on('click', function(){

            var _svc  = 'ftSMC',
                _func = 'getGroup',
                _params = {
                    gtype : Ext.encode('obj_usr')
                };


            component.up('container[itemId="ctn_user_group"]').setLoading(true);

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    component.up('container[itemId="ctn_user_group"]').setLoading(false);

                    for(var i=0; i<response.children.length; i++)
                    {
                        if(response.children[i].gtype !== 'obj_usr_list')
                        {
                            response.children.splice(i,1);
                            i = -1;
                        }
                    }

                    tree_children_expand(response.children);

                    treeObj.setRootNode(response);
                    treeObj.getView().refresh();

                }
            );
        });
    },

    onTrpn_object_treeSelect: function(rowmodel, record, index, eOpts) {
        this.down('[itemId=gpn_object_grid]').gridRefresh('treeSelect', record);
    },

    onToolbarAfterRender1: function(component, eOpts) {
        var me_objectList = component.up('window[itemId=pnl_object_user_group]');

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

    onCmb_ObjectConditionAfterRender11: function(component, eOpts) {
        var copy_store = Ext.create('Ext.data.Store', {
            storeId: 'st_ObjectCBConditionCopy',
            data: [
                {
                    cond_id: 'oName',
                    cond_text: '객체명'
                }
            ],
            fields: [
                {
                    name: 'cond_id'
                },
                {
                    name: 'cond_text'
                }
            ]
        });

        component.bindStore(copy_store);
    },

    onTxf_ObjectSearchTextKeypress111: function(textfield, e, eOpts) {
        // 2015.06.08 김민수 - 검색 함수 재정의 ================================================================================================================================================================================
        //
        // 일 시 : 2015.06.08
        //
        // 설 명 : findObject를 Tree Select 에서 사용할 수 있도록 재정의함
        //
        // =================================================================================================================================================================================================================

        var treeSel = this.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0];

        var tool_search = textfield.up('[itemId=tool_obj_search]');

        var chkCond = tool_search.down('[itemId=ck_ObjectCondition]').getValue();
        var searchKey = tool_search.down('[itemId=cmb_ObjectCondition]').getValue();
        var searchValue = textfield.getValue();

        if(e.getKey() === e.ENTER){

            tool_search.findObjectList(treeSel, chkCond, searchKey, searchValue);

        }
    },

    onGpn_ipv4_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        if(record)
        {
            if(!Object_DuplicateCheck(record.data['@cid'], '#text', select_store))
            {
                alertMessage('[ ' + record.data.name + '] ' + '동일한 오브젝트를 사용하고 있습니다.');
                return false;
            }

            if(record.data['@cid'] === me.object['@cid'])
            {
                alertMessage('그룹 오브젝트로 자기 자신을 추가할 수 없습니다. ' + '[ ' + record.data.name + '] ');
                return false;
            }

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

                    select_store.add({
                        '#text': response['@cid'],
                        '@name': response.name,
                        'kind': response._kind
                    });
                }
            );
        }



    },

    onGpn_object_gridSelect: function(rowmodel, record, index, eOpts) {
        var toolbar_control = this.down('toolbar[itemId="tool_smc_object_control"]');
        console.log('record - ', record);
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

    onGpn_object_gridDeselect: function(rowmodel, record, index, eOpts) {
        var toolbar_control = this.down('toolbar[itemId="tool_smc_object_control"]');

        if(rowmodel.selected.items.length < 1)
        {
            toolbar_control.down('button[itemId="modObject"]').disable();
            toolbar_control.down('button[itemId="delObject"]').disable();
        }
    },

    onGpn_object_select_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');

        var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(record.data['#text'])
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    treeObj.getSelectionModel().store.each(function(data, idx){

                        if(data.raw.gtype === response._kind)
                        {
                            if(data.raw.cid === response['@groupcid'])
                            {
                                if(!treeObj.select_grid_click)
                                {
                                    treeObj.select_grid_click = true;
                                }

                                if(treeObj.getSelectionModel().getSelection()[0])
                                {
                                    treeObj.getSelectionModel().deselect(treeObj.getSelectionModel().getSelection()[0], true);
                                }

                                treeObj.tree_expand(data);

                                treeObj.getSelectionModel().select(data, true);

                                return false;
                            }
                            else if(data.childNodes.length > 0)
                            {
                                treeObj.searchChildGroup(response['@groupcid'], data.childNodes);
                            }
                        }
                    });
                }
            }
        );
    },

    onPnl_object_user_groupAfterRender: function(component, eOpts) {
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
                'children' : null,
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
            }
        ];

        var contextCallback = function(menuInstance){

            var tree_select = component.down('treepanel[itemId="trpn_object_tree"]').getSelectionModel().getSelection()[0];
            var grid_select = component.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection()[0];

            if(tree_select)
            {
                menuInstance.down('[itemId=id_objectAdd]').enable();
                menuInstance.down('[itemId=id_objectMod]').enable();
                menuInstance.down('[itemId=id_objectDel]').enable();

                if(!grid_select)
                {
                    menuInstance.down('[itemId=id_objectMod]').disable();
                    menuInstance.down('[itemId=id_objectDel]').disable();
                }

                if(!tree_select.raw._kind)
                {
                    menuInstance.down('[itemId=id_objectAdd]').disable();
                }
            }
            else
            {
                menuInstance.down('[itemId=id_objectAdd]').disable();
                menuInstance.down('[itemId=id_objectMod]').disable();
                menuInstance.down('[itemId=id_objectDel]').disable();
            }

        };

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

    },

    onPnl_object_user_groupBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
        var tree = me.down('treepanel[itemId="trpn_object_tree"]');
        var ctn_group = me.down('container[itemId="ctn_user_group"]');

        me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
        select_store.removeAll();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.object = record;

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_usr')
            };

        me.show();

        if(record._locked){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '해당 객체는 ' + record._locked + '에서</br> 사용중인 객체이므로 수정할 수 없습니다.',
                buttons : Ext.Msg.OK,
                alwaysOnTop : true,
                icon : Ext.Msg.INFO

            });

            me.setTitle(me.title + ' [읽기 전용]');

            me.down('button[itemId="btn_save"]').disable();
        }

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                ctn_group.setLoading(false);

                for(var i=0; i<response.children.length; i++)
                {
                    if(response.children[i].gtype !== 'obj_usr_list')
                    {
                        response.children.splice(i,1);
                        i = -1;
                    }
                }

                tree_children_expand(response.children);

                tree.setRootNode(response);
                tree.getView().refresh();

                if(!me.isNew)
                {
                    Ext.each(record.member, function(data, idx){

                        var _svc = 'ftSMC',
                            _func = 'getObject',
                            _params = {
                                cid : Ext.encode(data)
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                select_store.add({
                                    '@name': response.name,
                                    '#text': response['@cid'],
                                    'kind': response._kind
                                });
                            }
                        );
                    });
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        if(select_store.getCount() > 0)
        {
            var object_member = [];

            select_store.each(function(record, idx){

                object_member.push(record.data['#text']);
            });

            me.object.member = object_member;

            me.object['@count'] = select_store.getCount();
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.');
            return false;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        var ctn_group = me.down('container[itemId="ctn_user_group"]');

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'chkDuplicateObject',
            {obj : Ext.encode(me.object)},
            function(response){

                if(response === true){
                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '중복되는 객체명이 존재합니다. 저장하시겠습니까?',
                        buttonText: {
                            ok     : "저장",
                            cancel : "취소"
                        },

                        buttons : Ext.Msg.OKCANCEL,
                        alwaysOnTop : true,
                        icon : Ext.Msg.INFO,
                        fn: function(buttonId) {

                            if (buttonId === "ok") {

                                ctn_group.setLoading(true);

                                request_helper.xmlrpc_call_Ajax_Post(
                                    _svc,
                                    _func,
                                    _params,
                                    function(response){

                                        ctn_group.setLoading(false);

                                        if(response)
                                        {
                                            if((_func === 'addObject') && response)
                                            {
                                                me.object['@cid'] = response;
                                            }

                                            if(typeof me.closeEvent === 'function'){
                                                me.closeEvent();
                                            }

                                            me.destroy();
                                        }
                                    }
                                );
                            }
                        }
                    });
                }
                else{
                    ctn_group.setLoading(true);

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response){

                            ctn_group.setLoading(false);

                            if(response)
                            {
                                if((_func === 'addObject') && response)
                                {
                                    me.object['@cid'] = response;
                                }

                                if(typeof me.closeEvent === 'function'){
                                    me.closeEvent();
                                }

                                me.destroy();
                            }
                        }
                    );
                }
            }
        );
    },

    addObject: function() {
        var me = this;

        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var record = treeObj.getSelectionModel().getSelection()[0];
         var object_window;

        if(record)
        {
            object_window = Ext.create('SMC.view.pnl_object_user');

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

                        response['@groupcid'] = record.raw.cid;
                        object_window.isNew = true;
                        object_window.loadData(response);

                        object_window.on('destroy', function() {
                            treeObj.getGridList('add', object_window.object);

                            if(treeObj.getSelectionModel().getSelection()[0].raw.cid ===
                               Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0].raw.cid){

                                Ext.getCmp('pnl_objectList').down('gridpanel[itemId="gpn_objectList"]').gridRefresh('add', object_window.object);
                            }
                        });
                    }
                );
            }
        }
    },

    modObject: function() {
        var me = this;

        var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var record = object_grid.getSelectionModel().getSelection()[0];
        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
        var object_window;

        if(record)
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

                    if(response)
                    {
                        object_window = Ext.create('SMC.view.pnl_object_user');
                        object_window.loadData(response);

                        object_window.on('destroy', function() {

                            select_store.each(function(record,idx){

                                if(record.data['#text'] === object_window.object['@cid'])
                                {
                                    record.set('@name', object_window.object.name);

                                    record.commit();

                                    return false;
                                }
                            });

                            treeObj.getGridList('mod', object_window.object);

                            if(treeObj.getSelectionModel().getSelection()[0].raw.cid ===
                               Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0].raw.cid){

                                Ext.getCmp('pnl_objectList').down('gridpanel[itemId="gpn_objectList"]').gridRefresh('mod', object_window.object);
                            }
                        });
                    }
                }
            );
        }

    },

    delObject: function() {
        var me = this;

        var me_objectList = Ext.getCmp('pnl_objectList');
        var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');
        var gridObj = me.down('gridpanel[itemId="gpn_object_grid"]');
        var record = gridObj.getSelectionModel().getSelection()[0];
        var fail_array = [];

        if(record)
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
                                cid : Ext.encode(record.data['@cid'])
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                if(treeObj)
                                    treeObj.getGridList(treeObj.getSelectionModel().getSelection()[0]);
                                else
                                    me.destroy();

                                if(response.errorList)
                                {
                                    if(response.errorList.length > 0)
                                    {
                                        fail_array.push(response.errorList[0]);
                                    }
                                }

                                if(fail_array.length > 0)
                                {
                                    object_window = Ext.create('SMC.view.pnl_object_delete_fail');
                                    var copy_store = Ext.create('Ext.data.Store', {
                                        storeId: 'st_ObjectGroupGridCopy',
                                        fields: [
                                            {
                                                name: 'name'
                                            },
                                            {
                                                name: 'desc'
                                            },
                                            {
                                                name: '@cid'
                                            },
                                            {
                                                name: '_kind'
                                            }
                                        ]
                                    });
                                    object_window.down('gridpanel[itemId="gpn_object_grid"]').reconfigure(copy_store);

                                    object_window.loadData(fail_array);
                                }

                                treeObj.getGridList('del', record, fail_array);

                                if(fail_array.length < 1)
                                {
                                    if(treeObj.getSelectionModel().getSelection()[0].raw.cid ===
                                       Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0].getSelectionModel().getSelection()[0].raw.cid){

                                        Ext.getCmp('pnl_objectList').down('gridpanel[itemId="gpn_objectList"]').getStore().each(function(del_record, idx){

                                            if(del_record.data['@cid'] === record.data['@cid']){
                                                Ext.getCmp('pnl_objectList').down('gridpanel[itemId="gpn_objectList"]').getStore().removeAt(idx);
                                                return false;
                                            }
                                        });
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
    }

});
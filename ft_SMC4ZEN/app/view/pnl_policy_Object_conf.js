
Ext.define('SMC4ZEN.view.pnl_policy_Object_conf', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_policy_object_conf',

    requires: [
        'SMC4ZEN.view.pnl_policy_Object_confViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox'
    ],

    config: {
        obj_store: {
            test: 'test'
        }
    },

    viewModel: {
        type: 'pnl_policy_object_conf'
    },
    height: 250,
    id: 'ID_pnl_policy_Object_conf',
    itemId: 'pnl_policy_Object_conf',
    width: 1064,
    layout: 'border',
    title: '오브젝트 설정',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'treepanel',
            searchChildGroup: function(cid, childNodes) {
                var treeObj = this;

                for(var i=0; i<childNodes.length; i++)
                {
                    if(cid === childNodes[i].raw.cid)
                    {
                        if(!treeObj.search_check)
                        {
                            treeObj.search_check = true;
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
            searchObject: function(g_cid, object_store, object_grid, object_tree, select_data) {
                var me = Ext.getCmp('ID_pnl_policy_Object_conf');

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

                        if(data['@cid'] === select_data.data['cid'])
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

                                if(obj_data.data['cid'] === select_data.data['cid'])
                                {
                                    treeObj.search_check = false;

                                    object_grid.getSelectionModel().select(idx2);
                                    return false;
                                }
                            });
                        }
                    });
                }
                );

            },
            tree_expand: function(_node) {
                var treeObj = this;
                var _parent = _node.parentNode;

                if(_parent === null || typeof _parent === 'undefined'){
                    return;
                } else {
                    treeObj.expandNode(_parent);
                    treeObj.tree_expand(_parent);
                }
            },
            search_check: false,
            region: 'west',
            split: true,
            itemId: 'trpn_object_view',
            width: 200,
            collapsible: true,
            header: false,
            title: '오브젝트',
            rootVisible: false,
            useArrows: true,
            listeners: {
                select: 'onTrpn_object_viewSelect'
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            itemId: 'pnl_object_list',
            scrollable: true,
            header: false,
            title: 'ObjectList',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            width: 100,
                            text: '객체 생성',
                            listeners: {
                                click: 'onButtonClick2'
                            }
                        },
                        {
                            xtype: 'button',
                            width: 100,
                            text: '객체 수정',
                            listeners: {
                                click: 'onButtonClick3'
                            }
                        },
                        {
                            xtype: 'button',
                            width: 100,
                            text: '객체 삭제',
                            listeners: {
                                click: 'onButtonClick4'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'search_condition',
                            width: 150,
                            fieldLabel: '검색조건',
                            labelPad: 2,
                            labelSeparator: ' ',
                            labelWidth: 60,
                            valueField: 'id'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'include_condition',
                            boxLabel: '포함',
                            checked: true
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'search_text'
                        },
                        {
                            xtype: 'button',
                            width: 100,
                            text: '검색',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onPnl_object_listAfterRender'
            }
        }
    ],
    listeners: {
        afterrender: 'onID_pnl_policy_Object_confAfterRender',
        removed: 'onID_pnl_policy_Object_confRemoved'
    },

    onTrpn_object_viewSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        me.fn_grid_init(record.raw.cid);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var _tree = me.query('treepanel[itemId=trpn_object_view]')[0];
        var _grid = me.query('gridpanel[itemId=grpn_object_list]')[0];

        var record = _tree.getSelectionModel().getSelection()[0];

        if(typeof record === 'undefined' || record === null){
            Ext.Msg.show({
                title : 'Error Message',
                msg : '그룹을 선택해 주세요',
                width	: 300,
                buttons	: Ext.Msg.OK,
                icon	: Ext.window.MessageBox.INFO
            });

        } else {
            var object_window;

            switch(record.raw._kind)
            {
                case "obj_ip_v4_addr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr');
                    break;
                case "obj_ip_v6_addr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr');
                    break;
                case "obj_ip_v4_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr_group');
                    break;
                case "obj_ip_v6_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr_group');
                    break;
                case "obj_ip_v6_header":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_header');
                    break;
                case "obj_svc_port":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_port');
                    break;
                case "obj_svc_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_group');
                    break;
                case "obj_svc_http":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_http');
                    break;
                case "obj_svc_rpc":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_rpc');
                    break;
                case "obj_svc_url":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_url');
                    break;
                case "obj_schedule":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_schedule');
                    break;
                case "obj_ipsec_isakmpsa":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_isakmp_sa');
                    break;
                case "obj_ipsec_ipsecsa":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipsec_sa');
                    break;
                case "obj_ipsec_host":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_sec_host');
                    break;
                case "obj_ipsec_peer":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipsec_gate');
                    break;
                case "obj_qos":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_qos');
                    break;
                case "obj_session_limit":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_session_limit');
                    break;
                case "obj_usr_list":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_user');
                    break;
                case "obj_ssl_svr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_server');
                    break;
                case "obj_ssl_svr_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_server_group');
                    break;
                case "obj_ssl_usr_list":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_user_group');
                    record.raw._kind = 'obj_ssl_usr';
                    break;
                case "obj_usr_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_user_group');
                    break;
                case "obj_waf":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_waf');
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

                        response['@groupcid'] = record.raw.cid;
                        object_window.isNew = true;
                        object_window.loadData(response);
                        object_window.closeEvent = function(){
                            me.fn_grid_init(record.raw.cid);
                        };
                        /*
                        object_window.saveData(function(){
                            me.fn_grid_init(record.raw.cid);
                        });
                        */

                    }
                );
            }
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;
        var _tree = me.query('treepanel[itemId=trpn_object_view]')[0];
        var _grid = me.query('gridpanel[itemId=grpn_object_list]')[0];

        var record = _grid.getSelectionModel().getSelection()[0];
        var t_record = _tree.getSelectionModel().getSelection()[0];

        console.log(t_record);

        if(typeof record === 'undefined' || record === null){
            Ext.Msg.show({
                title : 'Error Message',
                msg : '객체를 선택해 주세요',
                width	: 300,
                buttons	: Ext.Msg.OK,
                icon	: Ext.window.MessageBox.INFO
            });
        } else {
            var object_window;
            //console.log('객체 수정 : ', record);
            switch(record.raw._kind)
            {
                case "obj_ip_v4_addr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr');
                    break;
                case "obj_ip_v6_addr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr');
                    break;
                case "obj_ip_v4_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr_group');
                    break;
                case "obj_ip_v6_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr_group');
                    break;
                case "obj_ip_v6_header":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipv6_header');
                    break;
                case "obj_svc_port":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_port');
                    break;
                case "obj_svc_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_group');
                    break;
                case "obj_svc_http":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_http');
                    break;
                case "obj_svc_rpc":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_rpc');
                    break;
                case "obj_svc_url":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_svc_url');
                    break;
                case "obj_schedule":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_schedule');
                    break;
                case "obj_ipsec_isakmpsa":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_isakmp_sa');
                    break;
                case "obj_ipsec_ipsecsa":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipsec_sa');
                    break;
                case "obj_ipsec_host":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_sec_host');
                    break;
                case "obj_ipsec_peer":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ipsec_gate');
                    break;
                case "obj_qos":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_qos');
                    break;
                case "obj_session_limit":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_session_limit');
                    break;
                case "obj_usr_list":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_user');
                    break;
                case "obj_ssl_svr":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_server');
                    break;
                case "obj_ssl_svr_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_server_group');
                    break;
                case "obj_ssl_usr_list":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_ssl_user_group');
                    record.raw._kind = 'obj_ssl_usr';
                    break;
                case "obj_usr_group":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_user_group');
                    break;
                case "obj_waf":
                    object_window = Ext.create('SMC4ZEN.view.pnl_object_waf');
                    break;
                default:
                    break;
            }

            if(object_window)
            {
                var _svc = 'ftSMC',
                    _func = 'getObject',
                    _params = {
                        cid : Ext.encode(record.data.cid)
                    };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response){
                        console.log('object_window - ', object_window);
                        console.log('response - ', response);
                        object_window.loadData(response);
                        object_window.closeEvent = function(){
                            me.fn_grid_init(t_record.raw.cid);
                        };
                    }
                );
            }
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;

        var _tree = me.query('treepanel[itemId=trpn_object_view]')[0];
        var _grid = me.query('gridpanel[itemId=grpn_object_list]')[0];
        var _tree = me.query('treepanel[itemId=trpn_object_view]')[0];

        var record = _grid.getSelectionModel().getSelection()[0];
        var t_record = _tree.getSelectionModel().getSelection()[0];

        //console.log('삭제 : ', t_record);

        if(typeof record === 'undefined' || record === null){
            Ext.Msg.show({
                title : 'Error Message',
                msg : '그룹을 선택해 주세요',
                width	: 300,
                buttons	: Ext.Msg.OK,
                icon	: Ext.window.MessageBox.INFO
            });

        } else {

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
                                cid : Ext.encode(record.raw.cid)
                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                if(response.ok)
                                {
                                    me.fn_grid_init(t_record.raw.cid);
                                }
                                else
                                {
                                    if(response.errorList)
                                    {
                                        var object_window = Ext.create('SMC4ZEN.view.pnl_object_delete_fail');
                                        object_window.loadData(response.errorList);
                                    }
                                }
                            }
                        );
                    }
                }
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var _search_text = me.down('textfield[itemId=search_text]').getValue();
        var _search_cond = me.down('combobox[itemId=search_condition]').getValue();
        var _isInclude = me.down('checkbox[itemId=include_condition]').checked;
        var _grid = me.query('gridpanel[itemId=grpn_object_list]')[0];
        var _tree_select = me.query('treepanel[itemId=trpn_object_view]')[0].getSelectionModel().getSelection()[0];
        var _condition = {};

        switch(me.obj_type)
        {
            case 'src':
            case 'xsrc':
                _condition.kind = ['obj_ip_v4_addr', 'obj_ip_v4_group', 'obj_usr_group', 'obj_usr_list', 'obj_ip_eth'];
                break;
            case 'dest' :
            case 'xdest' :
                _condition.kind = ['obj_ip_v4_addr', 'obj_ip_v4_group', 'obj_ip_eth'];
                break;
            case 'service' :
            case 'xservice' :
                _condition.kind = ['obj_svc_group', 'obj_svc_port', 'obj_svc_http', 'obj_svc_rpc', 'obj_svc_url'];
                break;
        }

        if(_isInclude){
            _condition.op_in = true;
        } else {
            _condition.op_eq = true;
        }

        if(_tree_select)
        {
            if(_tree_select.raw._kind)
            {
                _condition.kind = [_tree_select.raw._kind];
            }
            else if(_tree_select.raw.gtype)
            {
                _condition.kind = [_tree_select.raw.gtype];
            }
        }

        if(_search_cond){
            _condition[_search_cond] = _search_text;
        }

        var _obj_store = _grid.getStore();

        _obj_store.getProxy().extraParams = {
            condition : Ext.encode(_condition)
        };

        _obj_store.getProxy().url = 'api/ftSMC/findObjectList/';

        _obj_store.loadPage(1);


    },

    onPnl_object_listAfterRender: function(component, eOpts) {
        var me = this;

        me.keyNav = Ext.create('Ext.util.KeyNav', me.el, {
            enter : me.onButtonClick,
            scope : this
        });
    },

    onID_pnl_policy_Object_confAfterRender: function(component, eOpts) {
        var me = this;
        var _kind = me.policyWin.obj_kind;
        var _type = me.obj_type;
        var _panel = me.query('gridpanel[itemId=grpn_object_list]')[0];
        var _search_cb = me.query('combobox[itemId=search_condition]')[0];

        var _search_store = Ext.create('Ext.data.Store',{
            fields : ['id', 'text'],
            data : OBJECT_SEARCH_LIST
        });
        _search_cb.bindStore(_search_store);
        _search_cb.setValue(OBJECT_SEARCH_LIST[0].id);

        component.setTitle(me.obj_title + '설정');

        var _gtypeStr = [];

        switch(_type){
            case 'src' :
            case 'xsrc' :
                if(_kind === OBJECT_SPD_IP_V4_FILTER.TEXT || _kind === OBJECT_SPD_IP_V4_NAT.TEXT || _kind === OBJECT_IP_ETH.TEXT || _kind === OBJECT_USER_GROUP.TEXT || _kind === OBJECT_USER_LIST.TEXT){
                    _gtypeStr.push(OBJECT_IP_V4_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_IP_V4_ADDRESS.TEXT);
                    _gtypeStr.push(OBJECT_USER_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_USER_LIST.TEXT);
                    _gtypeStr.push(OBJECT_IP_ETH.TEXT);

                } else if (_kind === OBJECT_SPD_IP_V6_FILTER.TEXT || _kind === OBJECT_SPD_IP_V6_NAT.TEXT){

                    _gtypeStr.push(OBJECT_IP_V6_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_IP_V6_HEADER.TEXT);
                    _gtypeStr.push(OBJECT_IP_V6_ADDRESS.TEXT);
                    _gtypeStr.push(OBJECT_USER_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_USER_LIST.TEXT);
                    _gtypeStr.push(OBJECT_IP_ETH.TEXT);
                }

                break;
            case 'dest' :
            case 'xdest' :
                if(_kind === OBJECT_SPD_IP_V4_FILTER.TEXT || _kind === OBJECT_SPD_IP_V4_NAT.TEXT || _kind === OBJECT_IP_ETH.TEXT){

                    _gtypeStr.push(OBJECT_IP_V4_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_IP_V4_ADDRESS.TEXT);
                    _gtypeStr.push(OBJECT_IP_ETH.TEXT);

                } else if (_kind === OBJECT_SPD_IP_V6_FILTER.TEXT || _kind === OBJECT_SPD_IP_V6_NAT.TEXT){

                    _gtypeStr.push(OBJECT_IP_V6_GROUP.TEXT);
                    _gtypeStr.push(OBJECT_IP_V6_HEADER.TEXT);
                    _gtypeStr.push(OBJECT_IP_V6_ADDRESS.TEXT);
                }
                break;
            case 'service' :
            case 'xservice' :
                _gtypeStr.push(OBJECT_SERVICE_GROUP.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_PORT.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_HTTP.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_RPC.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_URL.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_HTTPPLUS.TEXT);
                _gtypeStr.push(OBJECT_SERVICE_URLPLUS.TEXT);
                break;
        }


        var _trpn = me.query('treepanel[itemId=trpn_object_view]')[0];

        var bindStore = function _bStore(_treepanel, _gtypeArray, _res,_startIdx, _endIdx){

            if(_startIdx <= _endIdx){
                var _gtype = _gtypeArray[_startIdx++];
                request_helper.xmlrpc_call_Ajax_Post(
                    SMC_SERVICE_NAME,
                    'getGroup',
                    {gtype : Ext.encode(_gtype)},
                    function(response){
                        tree_children_expand(response.children);
                        _res.push(response);
                        bindStore(_treepanel, _gtypeArray, _res, _startIdx, _endIdx);
                    }
                );
            } else {

                var _trObj = {
                    expanded : true,
                    children : _res
                };
                console.log('_trpn - ', _trpn);
                _trpn.setRootNode(_trObj);
                _trpn.getView().refresh();

                if(component.cell_record)
                {
                    if(component.cell_record.raw.kind === 'obj_ip_eth')
                    {
                        _trpn.getSelectionModel().store.each(function(data, idx){

                            if(data.raw._kind === 'obj_ip_eth')
                            {
                                if(!_trpn.search_check)
                                {
                                    _trpn.search_check = true;
                                }

                                if(_trpn.getSelectionModel().getSelection()[0])
                                {
                                    _trpn.getSelectionModel().deselect(_trpn.getSelectionModel().getSelection()[0], true);
                                }

                                _trpn.getSelectionModel().select(data, true);
                            }
                        });
                    }
                    else
                    {
                        request_helper.xmlrpc_call_Ajax_Post(
                            SMC_SERVICE_NAME,
                            'getObject',
                            {cid : Ext.encode(component.cell_record.data.cid)},
                            function(response){

                                if(response)
                                {
                                    _trpn.getSelectionModel().store.each(function(data, idx){

                                        if(data.raw.cid === response['@groupcid'])
                                        {
                                            if(!_trpn.search_check)
                                            {
                                                _trpn.search_check = true;
                                            }

                                            if(_trpn.getSelectionModel().getSelection()[0])
                                            {
                                                _trpn.getSelectionModel().deselect(_trpn.getSelectionModel().getSelection()[0], true);
                                            }

                                            _trpn.tree_expand(data);
                                            _trpn.getSelectionModel().select(data, true);

                                            return false;
                                        }
                                        else if(data.childNodes.length > 0)
                                        {
                                            _trpn.searchChildGroup(response['@groupcid'], data.childNodes);
                                        }

                                    });
                                }
                            }
                        );
                    }
                }
            }
        };

        bindStore(_trpn, _gtypeStr, [], 0, _gtypeStr.length - 1);

        var _obj_list_store = Ext.create('Ext.data.Store',{
            storeId: 'st_obj_list',
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getObjectList/',
                reader: {
                    type: 'json',
                    root: 'retval.result',
                    totalProperty: 'retval.totalCount'
                }
            },
            fields : [
                {name : 'name', type : 'string', dataIndex : 'name'},
                {name : 'cid', type : 'string', dataIndex : 'cid', mapping : '@cid'},
                {name : 'kind', type : 'string', dataIndex : 'kind', mapping : '_kind'},
                {name : 'desc', type : 'string', dataIndex : 'desc'},
                {name : 'groupcid', type : 'string', dataIndex : 'groupcid', mapping : '@groupcid'}
            ]
        });

        var _obj_list = Ext.create('Ext.grid.Panel',{
            itemId: 'grpn_object_list',
            header: false,
            border : false,
            autoScroll : true,
            store: _obj_list_store,
            flex: 1,
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
                    align: 'center',
                    dataIndex: 'name',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
                        var _tag = '';
                        if(value){
                            metaData.tdCls = 'ico_' + record.data.kind + '_16';
                            _tag = Ext.String.format('<div style=\"text-align:left\">{0}</div>', value);
                        }
                        return _tag;
                    },
                    text: '객체 이름',
                    flex: 3
                },
                {
                    xtype: 'gridcolumn',
                    align: 'center',
                    renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
                        var _tag = '';
                        if(value){
                            _tag = Ext.String.format('<div style=\"text-align:left\">{0}</div>', value);
                        }
                        return _tag;
                    },
                    dataIndex: 'desc',
                    text: '객체 설명',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    width: 48,
                    align: 'center',
                    tooltip: 'accept',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                //_obj_list_store.remove([record]);
                                var _data = record.data;
                                me.obj_grid.fireEvent('addcolumn', {'obj' : _data.name, 'cid' : _data['cid'], 'kind' : _data['kind'], '@groupcid' : _data['groupcid']});
                            },
                            iconCls: 'ico_grid_row_add'
                        }
                    ]
                }
            ],
            listeners: {
                itemdblclick : function(obj, record, item, index, e, eOpts){
                    //_obj_list_store.remove([record]);
                    var _data = record.data;

                    me.obj_grid.fireEvent('addcolumn', {'obj' : _data.name, 'cid' : _data['cid'], 'kind' : _data['kind'], '@groupcid' : _data['groupcid']});
                }
            },
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'ptb_objectList',
                    margin: '0 0 5 0',
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
                    store: _obj_list_store
                }
            ]
        });

        var _pnl = me.query('panel[itemId=pnl_object_list]')[0];//.add(_obj_list);
        _pnl.add(_obj_list);
    },

    onID_pnl_policy_Object_confRemoved: function(component, ownerCt, eOpts) {
        var me = this;
        me.destroy();
    },

    fn_grid_init: function(_cid) {
        var me = this;
        var _grid = me.query('gridpanel[itemId=grpn_object_list]')[0];
        // request_helper.xmlrpc_call_Ajax_Post(
        //     SMC_SERVICE_NAME,
        //     'getObjectList',
        //     {g_cid : Ext.encode(_cid)},
        //     function(response){
        //         var _obj_store = me.obj_grid.getStore();
        //         var _result = response.result;
        //         var _bind_data = [];

        //         for(var i in _result){
        //             var _r = _result[i];

        //             var _res = _obj_store.find('cid', _r['@cid']);

        //             if(_res < 0){
        //                 _bind_data.push({'cid' : _r['@cid'], 'name' : _r.name, 'desc' : _r.desc, 'kind' : _r['_kind']});
        //             }
        //         }
        //         var _store = _grid.getStore();
        //         _store.loadData(_bind_data);
        //     }
        // );

        var _gStore = _grid.getStore();

        var _trpn = me.query('treepanel[itemId=trpn_object_view]')[0];

        if(_gStore.getProxy().url !== 'api/ftSMC/getObjectList/')
        {
            _gStore.getProxy().url = 'api/ftSMC/getObjectList/';
        }

        if(_trpn.search_check && Ext.getCmp('ID_pnl_policy_Object_conf').cell_record)
        {
            _gStore.getProxy().extraParams = {
                g_cid : Ext.encode(_cid),
                isRecursive : Ext.encode(false)
            };

            _gStore.loadPage(1, {
                callback: function(){
                    _trpn.searchObject(_cid, _gStore, _grid, _trpn, Ext.getCmp('ID_pnl_policy_Object_conf').cell_record);
                }
            });
        }
        else
        {
            _gStore.getProxy().extraParams = {
                g_cid : Ext.encode(_cid),
                isRecursive : Ext.encode(true)
            };
            _gStore.loadPage(1);
        }

    }

});

Ext.define('SMC.view.pnl_policy_edit', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    height: 568,
    width: 1253,
    closable: true,
    title: '',
    titleCollapse: false,

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
                    margins: '3',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margins: '5',
                            width: 100,
                            text: '추가',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            width: 100,
                            text: '수정',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick3,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            width: 100,
                            text: '삭제',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            itemId: 'btn_policy_checkRedundant',
                            width: 100,
                            text: '규칙중복검사',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick4,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            itemId: 'btn_policy_output',
                            width: 100,
                            text: '규칙출력',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick41,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            disabled: true,
                            itemId: 'btn_policy_rule_save',
                            width: 100,
                            text: '저장',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'cont_policy_search_rule',
                    layout: 'fit'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'cont_grid_panel',
                    autoScroll: true,
                    layout: 'fit'
                }
            ],
            listeners: {
                close: {
                    fn: me.onPanelClose,
                    scope: me
                },
                afterrender: {
                    fn: me.onPanelAfterRender1,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        me.fn_selected_policy_list(me, 'insert');
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;
        me.fn_selected_policy_list(me, 'update');

    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;
        me.fn_selected_policy_list(me, 'remove');
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;

        var _pid = me._policy_cid;
        var grid = me.query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0];
        var _selrows = grid.getSelectionModel().getSelection();
        //var _len = _selrows.length;


        console.log(_selrows);

        if(_selrows.length <= 1){
            var _rules = {};
            _rules['cid'] = Ext.encode(_pid);

            if(_selrows[0]){
                _rules['rule'] = Ext.encode(_selrows[0].raw);
            }
            console.log('_rules - ', _rules);
            request_helper.xmlrpc_call_Ajax_Post(
                SMC_SERVICE_NAME,
                'checkRedundancyRules',
                _rules,
                function(response){
                    var _win_tpl = _make_redundancy_rule_window(grid, response);
                    if(_win_tpl){
                        var _win = Ext.create(_win_tpl,{});
                        _win.show();
                    } else {
                        Ext.Msg.show({
                            title : 'SMC Message',
                            msg : '중복 되는 규칙이 없습니다.',
                            width	: 300,
                            buttons	: Ext.Msg.OK,
                            icon	: Ext.window.MessageBox.INFO
                        });
                    }

                }
            );

        } else {
            SMC.errorWindow('중복검사는 단일 규칙 또는 전체 규칙에 대해서만 가능합니다.');
        }
        ///*

    },

    onButtonClick41: function(button, e, eOpts) {
        var me = this;
        var _grid = me.query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0];
        var _selrows = _grid.getSelectionModel().getSelection();
        var _len = _selrows.length;

        if(me._policy_cid === 'undefined'){
            SMC.errorWindow('정책ID 값이 없습니다');
        } else {

            if(_grid){
                //var _p_cid = _selrows[0].raw['@groupcid'];
                var _p_cid = me._policy_cid;

                var _ruleList = [];

                for(var i = 0 ; i < _len ; i++){
                    var _raw = _selrows[i].raw;
                    _ruleList.push({'uid' : _raw['uid']});
                }

                var _params = {
                    cid : Ext.encode(_p_cid),
                    rules : Ext.encode(_ruleList)

                };
                request_helper.xmlrpc_call_Ajax_Post(
                    SMC_SERVICE_NAME,
                    'exportPolicy',
                    _params,
                    function(response){
                        Ext.create('Ext.Component', {
                            renderTo: Ext.getBody(),
                            cls: 'x-hidden',
                            autoEl: {
                                tag: 'iframe',
                                src: response
                            }
                        });
                        //window.location = '/fileDownload?filePath=' + response;
                    }
                );

            } else {

            }

        }
        ///*
        //*/
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        button.setDisabled(true);
        me.fn_selected_policy_list(me, 'save');

    },

    onPanelClose: function(panel, eOpts) {
        var me = this;
        request_helper.xmlrpc_call_Ajax_Post(
            SMC_SERVICE_NAME,
            'clrObject',
            {cid : Ext.encode(me._policy_cid)},
            function(response){
                /*
                if(!response){
                    Ext.Msg.show({
                        title : 'Error Message',
                        msg : 'clrObject result error',
                        width	: 300,
                        buttons	: Ext.Msg.OK,
                        icon	: Ext.window.MessageBox.INFO
                    });
                }
                */
            }
        );

    },

    onPanelAfterRender1: function(component, eOpts) {
        var me = this,
            _search;
        var _container = me.down('container[itemId=cont_grid_panel]');

        _container.removeAll(true);

        var _spd_kind = me.fn_KindMatch(me._kind);
        console.log('_spd_kind - ', _spd_kind);

        SMC_VIEW.create_grid_panel(
            me._policy_cid,
            _spd_kind,
            '',
            true,
            function(_grid_define){

                var _grid = Ext.create(_grid_define, {
                    itemId : DYNAMIC_GRID_IIDs.POLICY_VIEW
                });

                _grid.on('cellclick', function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts){

                    var _raw = record.raw,
                        _store = record.store,
                        _cur_col = tableview.getHeaderCt().getVisibleGridColumns()[cellIndex];

                    if(_cur_col.dataIndex === '@use'){

                        var msg_text = '';

                        if(_raw['@use'] === 'on'){

                            msg_text = '규칙 (정책ID[' + _raw['uid'] + '])을 사용안함으로 설정하시겠습니까?';

                        } else {

                            msg_text = '규칙 (정책ID[' + _raw['uid'] + '])을 사용함으로 설정하시겠습니까?';
                        }

                        Ext.Msg.show({
                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg_text,
                            width	: 450,
                            buttons	: Ext.MessageBox.OKCANCEL,
                            buttonText: {ok: "확인",cancel: "취소"},
                            fn: function(btn) {

                                if( btn == 'ok') {
                                    if(_raw['@use'] === 'on'){
                                        _raw['@use'] = 'off';
                                    } else {
                                        _raw['@use'] = 'on';
                                    }

                                    //저장버튼 활성화
                                    var _btn = me.query('button[itemId=btn_policy_rule_save]')[0];
                                    _btn.setDisabled(false);

                                    request_helper.xmlrpc_call_Ajax_Post(
                                        SMC_SERVICE_NAME,
                                        'modRule',
                                        {
                                            cid : Ext.encode(_raw['@groupcid']),
                                            rule : Ext.encode(_raw)
                                        },
                                        function(response){
                                            _store.loadRawData(response);
                                        }

                                    );
                                }
                            }
                        });
                    }
                    //_grid.resumeEvent('itemdblclick');
                });

                _grid.on('itemdblclick', function(obj, record, item, index, e, eOpts){
                    me.fn_selected_policy_list(me, 'update');
                });
                var _search;

                if(me._kind === OBJECT_SPD_IP_V4_FILTER.TEXT){
                    _search = Ext.create('SMC.view.pnl_policy_search_rule_filter',{
                        _policy_cid : me._policy_cid,
                        main_grid : _grid
                    });

                } else if(me._kind === OBJECT_SPD_IP_V4_NAT.TEXT){
                    _search = Ext.create('SMC.view.pnl_policy_search_rule_nat',{
                        _policy_cid : me._policy_cid,
                        main_grid : _grid
                    });
                }

                me.down('container[itemId=cont_policy_search_rule]').add(_search);

                _container.add(_grid);

                var _store = _grid.getStore();
                _store._policy_obj = me._policy;

                var _rules = me._policy.rules;

                if(typeof _rules === 'undefined'){

                } else{
                    _store.loadData(_rules);
                    console.log('store - ', _store.data.items);
                    _grid.getView().refresh();
                }
            }
        );

        var rule_Context_Array = [

            {
                'name' : '추가',
                'itemId' : 'id_ruleAdd',
                'children' : null,
                'callback' : function(){
                    me.fn_selected_policy_list(me, 'insert');
                }
            },
            {
                'name' : '수정',
                'itemId' : 'id_ruleMod',
                'children': null,
                'callback' : function(){
                    me.fn_selected_policy_list(me, 'update');
                }
            },
            {
                'name' : '삭제',
                'itemId' : 'id_ruleDel',
                'children' : null,
                'callback' : function(){
                    me.fn_selected_policy_list(me, 'remove');
                }
            },
            {
                'name' : '규칙중복검사',
                'itemId' : 'id_ruleCheck',
                'children' : null,
                'callback' : function(){

                    var _pid = me._policy_cid;
                    var grid = me.query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0];
                    var _selrows = grid.getSelectionModel().getSelection();

                    if(_selrows.length <= 1){
                        var _rules = {};
                        _rules['cid'] = Ext.encode(_pid);

                        if(_selrows[0]){
                            _rules['rule'] = Ext.encode(_selrows[0].raw);
                        }

                        request_helper.xmlrpc_call_Ajax_Post(
                            SMC_SERVICE_NAME,
                            'checkRedundancyRules',
                            _rules,
                            function(response){
                                var _win_tpl = _make_redundancy_rule_window(grid, response);
                                if(_win_tpl){
                                    var _win = Ext.create(_win_tpl,{});
                                    _win.show();
                                } else {
                                    Ext.Msg.show({
                                        title : 'SMC Message',
                                        msg : '중복 되는 규칙이 없습니다.',
                                        width	: 300,
                                        buttons	: Ext.Msg.OK,
                                        icon	: Ext.window.MessageBox.INFO
                                    });
                                }

                            }
                        );

                    } else {
                        SMC.errorWindow('중복검사는 단일 규칙 또는 전체 규칙에 대해서만 가능합니다.');
                    }
                }
            },
            {
                'name' : '규칙출력',
                'itemId' : 'id_ruleOutput',
                'children' : null,
                'callback' : function(){

                    var _grid = me.query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0];
                    var _selrows = _grid.getSelectionModel().getSelection();
                    var _len = _selrows.length;

                    if(me._policy_cid === 'undefined'){
                        SMC.errorWindow('정책ID 값이 없습니다');
                    } else {

                        if(_grid){

                            var _p_cid = me._policy_cid;

                            var _ruleList = [];

                            for(var i = 0 ; i < _len ; i++){
                                var _raw = _selrows[i].raw;
                                _ruleList.push({'uid' : _raw['uid']});
                            }

                            var _params = {
                                cid : Ext.encode(_p_cid),
                                rules : Ext.encode(_ruleList)

                            };
                            request_helper.xmlrpc_call_Ajax_Post(
                                SMC_SERVICE_NAME,
                                'exportPolicy',
                                _params,
                                function(response){
                                    Ext.create('Ext.Component', {
                                        renderTo: Ext.getBody(),
                                        cls: 'x-hidden',
                                        autoEl: {
                                            tag: 'iframe',
                                            src: response
                                        }
                                    });
                                }
                            );

                        } else {

                        }
                    }
                }
            },
            {
                'name' : '저장',
                'itemId' : 'id_ruleSave',
                'children' : null,
                'callback' : function(){

                    me.down('button[itemId="btn_policy_rule_save"]').setDisabled(true);
                    me.fn_selected_policy_list(me, 'save');

                }
            }
        ];

        var contextCallback = function(menuInstance){

            if(me.down('button[itemId="btn_policy_rule_save"]').disabled)
            {
                menuInstance.down('[itemId=id_ruleSave]').disable();
            }
            else
            {
                menuInstance.down('[itemId=id_ruleSave]').enable();
            }
        };

        makeContextMenu({'itemId' : 'mn_rule_context', 'width' : 180, 'border' : false}, me, contextCallback, rule_Context_Array);

    },

    fn_selected_policy_list: function(_me_obj, _type, _position) {
        /*
              _me_obj : 대상 컴포넌트
              _type : 수정(update), 삽입(insert), 삭제(delete)
              _position : 새로운 규칙 생성시 위치 (default : 'up')
        */

        var me = _me_obj,
            _collapsed = false;

        var _pos = 'up';


        var createEditWin = function(_type, _win_title, _rule_store, _pos, _kind, _raw){

            var _stor = Ext.create('Ext.data.Store',{
                data : _selrows,
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
                title : _win_title,
                update_store : _rule_store,
                insPosition : _pos,
                obj_kind : _kind,
                raw_data : _raw,
                sel_rows : _selrows,
                policy_cid : me._policy_cid,
                pnl_policy_edit : me,
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


        if(typeof _position === 'undefined' || _position === null || _position === ''){
            _pos = 'up';
        } else {
            _pos = _position;
        }

        var grid = me.query('gridpanel[itemId=' + DYNAMIC_GRID_IIDs.POLICY_VIEW + ']')[0];

        var _selrows = grid.getSelectionModel().getSelection();

        var _rule_list_store = grid.getStore();

        var _spd_kind = me.fn_KindMatch(me._kind);

        switch (_type){
            case 'insert' :
                _collapsed = true;
                _win_title = '정책추가';
                var _params = {
                    kind : Ext.encode(_spd_kind)
                };

                request_helper.xmlrpc_call_Ajax_Post(
                    'ftSMC',
                    'getRuleDefault',
                    _params,
                    function(response){
                        console.log('response - ', response);
                        var _pwin = createEditWin(_type, _win_title, _rule_list_store, _pos, _spd_kind, response);
                        _pwin.show();
                        _pwin.down('panel[itemId="pnl_policy_grid_views"]').items.items[0].down('gridpanel').tools[0].handler();
                    }
                );
                break;
            case 'update' :
                _collapsed = false;
                _win_title = '정책수정';
                if(_selrows.length > 0){

                    var _tRaw = _selrows[0].data;

                    _tRaw['@cid'] = _selrows[0].raw['@cid'];
                    _tRaw['@groupcid'] = _selrows[0].raw['@groupcid'];

                    if(_spd_kind === 'obj_spd_ipv4_filter')
                    {
                        _tRaw['userlev'] = _selrows[0].raw['userlev'];
                    }

                    console.log('_tRaw - ', _tRaw);

                    var _pwin = createEditWin(_type, _win_title, _rule_list_store, _pos, _spd_kind, _tRaw);
                    _pwin.show();
                    _pwin.down('panel[itemId="pnl_policy_grid_views"]').items.items[0].down('gridpanel').tools[0].handler();
                } else {
                    Ext.Msg.show({
                        title : 'Error Message',
                        msg : 'selected policy!',
                        width	: 300,
                        buttons	: Ext.Msg.OK,
                        icon	: Ext.window.MessageBox.INFO
                    });
                }
                break;
            case 'remove' :
                _win_title = '정책삭제';
                if(_selrows.length > 0){
                    createEditWin(_type, _win_title, _rule_list_store, _pos, _spd_kind, _selrows[0].raw).show();
                } else {
                    Ext.Msg.show({
                        title : 'Error Message',
                        msg : 'selected policy!',
                        width	: 300,
                        buttons	: Ext.Msg.OK,
                        icon	: Ext.window.MessageBox.INFO
                    });
                }
                break;
            case 'save' :
                //저장버튼 활성화 / 비활성화
                console.log('save policy - ', me._policy);
                request_helper.xmlrpc_call_Ajax_Post(
                    SMC_SERVICE_NAME,
                    'modPolicy',
                    {obj : Ext.encode(me._policy)},
                    function(response){
                        console.log('response - ', response);
                        var _title = '';
                        var _msg = '';
                        if(response){
                            _title = 'Success message';
                            _msg = Ext.String.format('저장 되었습니다.');
                            request_helper.xmlrpc_call_Ajax_Post(
                                SMC_SERVICE_NAME,
                                'getPolicy',
                                {cid : Ext.encode(me._policy['@cid'])},
                                function(response){
                                    if(response.rules)
                                    {
                                        _rule_list_store.loadData(response.rules);
                                        grid.getView().refresh();
                                    }
                                }
                            );

                        }
                        else {
                            _title = 'Failed message';
                            _msg = Ext.String.format('errorMsg : {0}', response);
                        }
                        Ext.Msg.show({
                            title : _title,
                            msg : _msg,
                            width	: 300,
                            buttons	: Ext.Msg.OK,
                            icon	: Ext.window.MessageBox.INFO
                        });
                    }
                );
                break;
        }
    },

    fn_KindMatch: function(source) {
        var targetList = [
            OBJECT_SPD_IP_V4_FILTER.TEXT,
            OBJECT_SPD_IP_V4_NAT.TEXT,
            OBJECT_SPD_IP_V6_FILTER.TEXT,
            OBJECT_SPD_IP_V6_NAT.TEXT,
            OBJECT_SPD_IPS.TEXT,
            OBJECT_SPD_WHITEBLACK.TEXT
        ];

        var i = 0;
        var _t = targetList[i];

        while(source.indexOf(_t) < 0){
            _t = targetList[++i];
        }

        return _t;
    }

});

Ext.define('SMC4ZEN.view.win_smc_object_set', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_smc_object_setViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.toolbar.Paging'
    ],

    viewModel: {
        type: 'win_smc_object_set'
    },
    constrain: true,
    height: 350,
    id: 'win_smc_object_set',
    maxHeight: 600,
    maxWidth: 1000,
    minWidth: 600,
    width: 800,
    layout: 'border',
    title: '객체 선택',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'treepanel',
            searchChildGroup: function(cid, childNodes, record) {
                var trpn_group = this;
                var gpn_object = this.up().down('[itemId=gpn_object_selectobj]');

                for(var i = 0, max = childNodes.length; i < max; i++){

                    if(cid === childNodes[i].get('cid')){

                        if(!trpn_group.select_grid_click){

                            trpn_group.select_grid_click = true;

                        }

                        var selectNode = trpn_group.getSelection()[0];

                        if(selectNode){

                            trpn_group.getSelectionModel().deselect(selectNode, true);

                        }

                        trpn_group.tree_expand(childNodes[i], true);

                        gpn_object.selectObject = record;

                        trpn_group.getSelectionModel().select(childNodes[i], true);

                        return false;

                    }

                    if(childNodes[i].childNodes.length > 0){

                        trpn_group.searchChildGroup(cid, childNodes[i].childNodes);

                    }

                }
            },
            tree_expand: function(node) {
                var trpn_group = this;
                var trpn_parent = node.parentNode;

                if(trpn_parent === null || trpn_parent === undefined){

                    return;

                }
                else{

                    trpn_group.expandNode(trpn_parent);
                    trpn_group.tree_expand(trpn_parent);

                }
            },
            region: 'west',
            split: true,
            itemId: 'trpn_object_group',
            width: 200,
            title: '',
            viewConfig: {

            },
            listeners: {
                select: 'onTrpn_object_groupSelect'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'tb_object_control',
                    items: [
                        {
                            xtype: 'button',
                            border: false,
                            itemId: 'bt_showall',
                            enableToggle: true,
                            text: ''
                        },
                        {
                            xtype: 'button',
                            border: false,
                            itemId: 'bt_open',
                            text: ''
                        },
                        {
                            xtype: 'button',
                            border: false,
                            itemId: 'bt_close',
                            text: ''
                        }
                    ],
                    listeners: {
                        afterrender: 'onTb_object_controlAfterRender'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            region: 'center',
            itemId: 'gpn_object_selectobj',
            title: '',
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 40,
                    align: 'center',
                    text: 'N'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.tdCls = 'ico_' + record.data._kind + '_16';

                        return value;
                    },
                    dataIndex: 'name',
                    text: '객체 이름',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'desc',
                    text: '객체 설명',
                    flex: 2
                }
            ],
            viewConfig: {
                preserveScrollOnRefresh: true
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    itemId: 'tb_object_serch',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_import',
                            fieldLabel: '',
                            boxLabel: '단어 포함 검색',
                            checked: true
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_search',
                            fieldLabel: '',
                            labelWidth: 80,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTxf_searchKeypress'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_search',
                            width: 100,
                            text: '검 색',
                            listeners: {
                                click: 'onBt_searchClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'tb_object_pageing',
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
                    store: 'st_object_select'
                }
            ],
            listeners: {
                itemdblclick: 'onGpn_object_selectobjItemDblClick'
            }
        },
        {
            xtype: 'container',
            region: 'south',
            itemId: 'ctn_object_control',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end',
                padding: 5
            },
            items: [
                {
                    xtype: 'button',
                    hidden: true,
                    itemId: 'bt_policy',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '정책 수정',
                    listeners: {
                        click: 'onBt_policyClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_select',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '선 택',
                    listeners: {
                        click: 'onBt_selectClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_close',
                    width: 100,
                    text: '닫 기',
                    listeners: {
                        click: 'onBt_closeClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_smc_object_setAfterRender',
        beforeclose: 'onWin_smc_object_setBeforeClose'
    },

    onTrpn_object_groupSelect: function(rowmodel, record, index, eOpts) {
        // onTrpn_object_groupSelect =====================================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 : 객체 항목에서 아이템을 클릭시 저장된 객체 목록을 불러옵니다.
        //
        // ===============================================================================================================================================================================

        this.refreshObjectList(record, Ext.getStore('st_object_select'));
    },

    /*
        일시 : 2015.01.30

        설명 : 버튼의 스타일을 지정하고 이벤트를 연결합니다.

        수정 :

        - (2015.01.30 김민수 : 버튼 스타일 지정)
    */
    onTb_object_controlAfterRender: function(component, eOpts) {
        var treeObj    = component.up('[itemId=trpn_object_group]');
        var bt_showall = component.down('[itemId=bt_showall]');
        var bt_open    = component.down('[itemId=bt_open]');
        var bt_close   = component.down('[itemId=bt_close]');

        // CSS 설정

        bt_showall.setSize({'width':24, 'height':24		});
        bt_open.setSize({	'width':24, 'height':24		});
        bt_close.setSize({	'width':24, 'height':24		});

        bt_showall.el.addCls('common_rule_send');
        bt_open.el.addCls('common_folder_open');
        bt_close.el.addCls('common_folder_close');

        // 이벤트 설정

        treeObj.group_click_count = 0;

        bt_open.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelection()[0];

            if(treeSelection){

                group_open(treeObj, treeSelection);

            }

        });

        bt_close.on('click', function(){

            if(treeObj.group_click_count > 0){

                return false;

            }

            treeObj.group_click_count += 1;

            var treeSelection = treeObj.getSelection()[0];

            if(treeSelection){

                group_close(treeObj, treeSelection);

            }
        });

        bt_showall.on('click', function(button, pressed, e){

            var _objectList = Ext.getCmp('win_smc_object_set');

            _objectList.loadObjectGroup(_objectList);

        });

        bt_showall.on('toggle', function(button, pressed, e){

            if(pressed){

                button.removeCls('common_rule_send');
                button.addCls('common_rule_pressed');

            }
            else{

                button.removeCls('common_rule_pressed');
                button.addCls('common_rule_send');

            }

        });
    },

    /*
        일 시 : 2015.01.30

        설 명 : 검색창에 입력된 텍스트를 서버에 요청하여 검색합니다.

        수 정 :

        - (2015.01.30 김민수 : 검색기능 추가)
    */
    onTxf_searchKeypress: function(textfield, e, eOpts) {
        var textField = textfield.up().down('[itemId=txf_search]');

        var _searchText = textField.getValue();

        if(e.getKey() === e.ENTER){

            if(_searchText){

                Ext.getCmp('win_smc_object_set').searchObject(_searchText);

            }

        }
    },

    /*
        일시 : 2015.01.30

        설명 : 객체 검색시 Proxy URL을 변경합니다.

        수정 :

        - (2015.01.30 김민수 : Proxy url 변경되도록 코드 수정)
    */
    onBt_searchClick: function(button, e, eOpts) {
        var _searchText = button.up().down('[itemId=txf_search]').getValue();

        Ext.getCmp('win_smc_object_set').searchObject(_searchText);
    },

    onGpn_object_selectobjItemDblClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_object_selectobjItemDblClick ============================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 : 객체 아이템을 더블 클릭시 파라미터로 들어온 컴포넌트의 setPolicy 이벤트로 데이터를 전달합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        var selectRecord = component.selectobj.getSelection()[0];

        this.thisObj.fireEvent('setPolicy', this.componentObj, this.policyKey, selectRecord.data);

        this.destroy();
    },

    onBt_policyClick: function(button, e, eOpts) {
        // onBt_policyClick ==============================================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 : 정책 설정을 수정하는 컴포넌트를 생성합니다.
        //
        // ===============================================================================================================================================================================

        // var _svc = 'ftSMC',
        //         _func = 'getPolicy',
        //         _params = {
        //             cid : Ext.encode(cid)
        //         };

        //     request_helper.xmlrpc_call_Ajax_Post(
        //         _svc,
        //         _func,
        //         _params,
        //         function(response){
        //             //console.log(cid);
        //             //console.log(response);
        //             var tabItem = Ext.create('SMC.view.pnl_policy_edit',{
        //                 _kind : _kind,
        //                 _policy_cid : cid,
        //                 _policy : response
        //             });

        //             tabItem.title = name;
        //             tabs.add(tabItem);
        //             tabs.setActiveTab(tabItem);

        //         }
        //     );

    },

    onBt_selectClick: function(button, e, eOpts) {
        // onBt_selectClick ==============================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 선택된 Object 데이터를 호출한 객체의 setPolicy 이벤트로 전달합니다. 객체를 설정하는 패널들은 모두 setPolicy 메서드와 콜백이 설정되어있어야 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();
        var selectRecord = component.selectobj.getSelectionModel().getSelection()[0];

        this.thisObj.fireEvent('setPolicy', this.componentObj, this.policyKey, selectRecord.data);

        this.destroy();
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.destroy();
    },

    onWin_smc_object_setAfterRender: function(component, eOpts) {
        // onWindowAfterRender ==========================================================================================================================================================
        //
        // 일시 : 2014.11.06 (최신 수정)
        //
        // 설명 : 객체, 정책의 항목을 불러오고 상황에 따라 컨텍스트 메뉴를 생성합니다.
        //
        // 생성 방법 :
        //
        //	Ext.create('widget.smc_object_set', {
        //
        //		'service'       : 'ftSMC',
        //		'searchService' : 'getGroup',
        //		'openType'      : 'Policy',
        //		'gtype'         : 'obj_spd_ipv4_filter',
        //		'policyKey'     : 'vlan_setting',
        //		'thisObj'       : this,
        //		'componentObj'  : component
        //
        //	}).show();
        //
        // 생성 프로퍼티 설명 :
        //
        // 1. service : 서비스 종류
        //
        // 2. searchService : 호출할 RPC 명칭
        //
        // 3. openType : 객체 선택창이면 'Object', 정책 선택창이면 'Policy' (컨텍스트 메뉴 생성시 필요)
        //
        // 4. gtype : kind 값
        //
        // 5. policyKey : 객체 또는 정책 선택 후 화면에서 후처리시 필요한 Key 값
        //
        // 6. thisObj : win_smc_object_set 을 호출한 부모 객체
        //
        // 7. componentObj : 리턴 값이 적용되어야할 컴포넌트 객체
        //
        // ==============================================================================================================================================================================

        component.loadObjectGroup(component);

        Ext.getStore('st_object_select').removeAll();

        component.down('[itemId=gpn_object_selectobj]').bindStore(Ext.getStore('st_object_select'));
    },

    onWin_smc_object_setBeforeClose: function(panel, eOpts) {
        this.destroy();
    },

    componentStorage: function() {
        var obj = {};

        var objtree = this.down('[itemId=trpn_object_group]');
        var selectobj = this.down('[itemId=gpn_object_selectobj]');
        var searchstr = this.down('[itemId=txf_search]');

        obj.objtree   = objtree;
        obj.selectobj = selectobj;
        obj.searchstr = searchstr;

        return obj;
    },

    makeContextMenu: function(contextType, insertComponent) {
        var me = this;

        var dev_object_array;
        var component = this.componentStorage();

        // 컨텍스트 메뉴 추가 ==============================================================================================================================================================

        makeContextMenu({	'itemId' : 'mn_object_context', 'width' : 180, 'border' : false	}, insertComponent, function(menuInstance){

            var objectCount = component.selectobj.getSelectionModel().getSelection();

            if(contextType === 'Object'){

                if(objectCount.length <= 0){

                    menuInstance.down('[itemId=mi_object_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_object_del]').setDisabled(true);
                    menuInstance.down('[itemId=mi_object_linkobject]').setDisabled(true);

                }
                else{

                    menuInstance.down('[itemId=mi_object_mod]').setDisabled(false);
                    menuInstance.down('[itemId=mi_object_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_object_linkobject]').setDisabled(false);

                }

            }
            else if(contextType === 'Policy'){


            }

        }, me.getContextData(contextType));
    },

    refreshObjectList: function(record, objectStore) {
        // refreshObjectList =============================================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 : 객체, 정책의 정보가 추가, 수정, 삭제 되었을경우 목록을 다시 불러옵니다.
        //
        // 수정 :
        //
        // - (2015.01.30 김민수 : 객체가 페이징 처리되도록 수정)
        // - (2015.06.17 김민수 : 객체 자동선택 기능 추가)
        //
        // ===============================================================================================================================================================================

        // 2015.01.30 장비-객체 UI 페이징 적용

        var me = this;
        var trpn_group = me.down('[itemId=trpn_object_group]');
        var gpn_objectlist = me.down('[itemId=gpn_object_selectobj]');
        var _isRecursive = trpn_group.down('[itemId=bt_showall]');

        if(objectStore.getProxy().url !== 'api/ftSMC/getObjectList/'){

            objectStore.getProxy().url = 'api/ftSMC/getObjectList/';

        }

        objectStore.getProxy().extraParams = {

            'g_cid' : Ext.encode(record.get('cid')),
            'isRecursive' : Ext.encode(_isRecursive.pressed)

        };

        objectStore.loadPage(1, {

            // 데이터를 로드한 뒤에 getObjectlist 호출

            'callback' : function(){

                // 선택한 정책 혹은 객체의 cid가 '00000000000000000000000000000000' 이면 Any로 간주 콜백 리턴

                if(me.componentObj === undefined || me.componentObj.policyCid === '00000000000000000000000000000000' || me.componentObj.policyCid === undefined || me.componentObj.policyCid === null){

                    return;

                }

                var service = 'ftSMC',
                    apimethod = 'getObjectList',
                    params = {

                        'g_cid' : Ext.encode(record.get('cid')),
                        'start' : Ext.encode(0),
                        'limit' : Ext.encode(objectStore.totalCount)

                    };

                request_helper.xmlrpc_call_Ajax_Get(
                    service,
                    apimethod,
                    params,
                    function(res){

                        var pageNumber = 1;

                        Ext.each(res.result, function(data, idx){

                            if(data['@cid'] === me.componentObj.policyCid){

                                if(idx > 100){

                                    pageNumber = parseInt(idx / 100) + 1;

                                    return;

                                }

                            }

                        });

                        objectStore.loadPage(pageNumber, {

                            'callback' : function(records){

                                for(var i = 0, max = objectStore.count(); i < max; i++){

                                    if(objectStore.data.items[i].get('@cid') === me.componentObj.policyCid){

                                        trpn_group.select_grid_click = false;

                                        gpn_objectlist.getSelectionModel().select(i);

                                        return false;

                                    }

                                }

                            }

                        });

                    }

                );

            }

        });
    },

    makeObjectWnd: function(kind) {
        // makeObjectWnd ================================================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 :
        //
        // ==============================================================================================================================================================================

        var wndInstance;

        switch(kind){

            case "obj_ip_v4_addr":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr');
                break;
            case "obj_ip_v6_addr":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr');
                break;
            case "obj_ip_v4_group":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipv4_addr_group');
                break;
            case "obj_ip_v6_group":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipv6_addr_group');
                break;
            case "obj_ip_v6_header":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipv6_header');
                break;
            case "obj_svc_port":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_svc_port');
                break;
            case "obj_svc_group":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_svc_group');
                break;
            case "obj_svc_http":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_svc_http');
                break;
            case "obj_svc_rpc":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_svc_rpc');
                break;
            case "obj_svc_url":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_svc_url');
                break;
            case "obj_schedule":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_schedule');
                break;
            case "obj_ipsec_isakmpsa":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_isakmp_sa');
                break;
            case "obj_ipsec_ipsecsa":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipsec_sa');
                break;
            case "obj_ipsec_host":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_sec_host');
                break;
            case "obj_ipsec_peer":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ipsec_gate');
                break;
            case "obj_qos":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_qos');
                break;
            case "obj_session_limit":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_session_limit');
                break;
            case "obj_usr_list":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_user');
                break;
            case "obj_ssl_svr":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ssl_server');
                break;
            case "obj_ssl_svr_group":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ssl_server_group');
                break;
            case "obj_ssl_usr_list":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_ssl_user_group');
                record.raw._kind = 'obj_ssl_usr';
                break;
            case "obj_usr_group":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_user_group');
                break;
            case "obj_waf":
                wndInstance = Ext.create('SMC4ZEN.view.pnl_object_waf');
                break;
            default:
                wndInstance = null;
                break;

        }

        return wndInstance;
    },

    /*
        일 시 : 2015.01.30

        설 명 : 객체그룹을 로드하여 데이터를 컴포넌트에 초기화합니다.

        수 정 :

        - (2015.01.30 김민수 : 그룹데이터 로드 기능 추가)
        - (2015.06.17 김민수 : 선택된 객체가 자동으로 선택되도록 코드 추가)
    */
    loadObjectGroup: function(component) {
        var componentObj = component.componentStorage();

        var service = component.service,
            serchService = component.searchService,
            params = {

                'gtype' : Ext.encode(component.gtype)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                // 화면에 따른 트리노드 추가 조건 ====================================================================================================================================================
                //
                // 설명 : 객체, 정책 설정 컴포넌트를 호출한 화면의 종류에 따라 트리노드 추가 조건을 제한합니다.
                //
                // ==============================================================================================================================================================================

                if(component.thisObj.getId() === 'pnl_xtm_vpn_head_office' || component.thisObj.getId() === 'pnl_xtm_vpn_host'){

                    var newChildren   = [];
                    var childrenArray = res.children;

                    delete res.children;

                    for(var i = 0; i < childrenArray.length; i++){

                        if(childrenArray[i].gtype.substring(0, 9) === 'obj_ip_v4'){

                            newChildren.push(childrenArray[i]);

                        }

                    }

                    res.children = newChildren;

                    component.down('[itemId=trpn_object_group]').setRootNode(res);

                }
                else{

                    component.down('[itemId=trpn_object_group]').setRootNode(res);

                }

                // 자동으로 최상위 노드가 선택되도록 설정 =============================================================================================================================================

                if(component.componentObj === undefined || component.componentObj.policyCid === '00000000000000000000000000000000' || component.componentObj.policyCid === undefined || component.componentObj.policyCid === null){

                    componentObj.objtree.getSelectionModel().select(0);

                }
                else{

                    component.autoSelectGroup(component.componentObj.policyCid, componentObj.objtree, componentObj.selectobj);

                }

                // 2015.06.17 선택된 객체 검색

                // 타입에 따른 컨택스트 및 버튼 활성화 설정 ===========================================================================================================================================

                //         var btn_policy = component.down('[itemId=ctn_object_control]').down('[itemId=bt_policy]');

                //         if(component.openType === 'Object'){

                //             btn_policy.setVisible(false);

                //             component.makeContextMenu(component.openType, componentObj.selectobj);

                //         }
                //         else if(component.openType === 'Policy'){

                //             btn_policy.setVisible(true);

                //         }
                //         else if(component.openType === 'Dpi'){


                //         }

            }

        );
    },

    autoSelectGroup: function(cid, tree, grid) {
        var service = 'ftSMC',
            apimethod = 'getObject',
            params = {

                'cid' : Ext.encode(cid)

            };

        request_helper.xmlrpc_call_Ajax_Get(
            service,
            apimethod,
            params,
            function(res){

                if(res){

                    tree.getSelectionModel().store.each(function(data, idx){

                        if(data.get('gtype') === res._kind){

                            if(data.get('cid') === res['@groupcid']){

                                var tree_selection = tree.getSelection()[0];

                                if(tree_selection){

                                    tree.getSelectionModel().deselect(tree_selection, true);

                                }

                                tree.tree_expand(data);

                                tree.getSelectionModel().select(data, true);

                                return;

                            }
                            else if(data.childNodes.length > 0){

                                tree.searchChildGroup(res['@groupcid'], data.childNodes);

                            }

                        }

                    });

                }

            });
    },

    getContextData: function(contextType) {
        // getContextData ===============================================================================================================================================================
        //
        // 일시 : 2014.11.06
        //
        // 설명 : 객체 설정시 컨텍스트 메뉴에 대한 구성을 정의합니다. 정의된 데이터는 contextType에 의해 화면에 따라 필요한 데이터를 리턴합니다.
        //
        // ==============================================================================================================================================================================

        var me = this;

        var objectContextData;
        var component = me.componentStorage();
        var centerPanel = Ext.getCmp(DEVICE_COMMON_ID.devicecenter);

        if(contextType === 'Object'){

        // 객체에서 공통으로 사용하는 컴포넌트 ================================================================================================================================================

            objectContextData = [

                {
                    'name' : '객체 등록',
                    'itemId' : 'mi_object_add',
                    'children' : null,
                    'callback' : function(){

                        var _svc = 'ftSMC',
                            _func = 'getObjectDefault',
                            _params = {

                                'kind' : Ext.encode(me.gtype)

                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                // 0. gtype에 맞는 객체화면 인스턴스 생성

                                var wndInstance = me.makeObjectWnd(me.gtype);

                                // 1. 인스턴스가 생성되었다면 beforedestroy 이벤트 연결 - 객체 수정 후 목록 Refresh

                                if(wndInstance){

                                    wndInstance.on('beforedestroy', function(){

                                        me.refreshObjectList(component.objtree.getSelection()[0], Ext.getStore('st_object_select'));

                                    });

                                    // 2. 화면 생성

                                    response['@groupcid'] = component.objtree.getSelection()[0].get('cid');

                                    wndInstance.isNew = true;

                                    wndInstance.loadData(response);

                                }

                            }

                        );

                    }

                },
                {
                    'name' : '객체 수정',
                    'itemId' : 'mi_object_mod',
                    'children' : null,
                    'callback' : function(){

                        var selectRecord = component.selectobj.getSelection()[0];

                        var _svc = 'ftSMC',
                            _func = 'getObject',
                            _params = {

                                'cid' : Ext.encode(selectRecord.get('@cid'))

                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                            _svc,
                            _func,
                            _params,
                            function(response){

                                // 0. gtype에 맞는 객체화면 인스턴스 생성

                                var wndInstance = me.makeObjectWnd(me.gtype);

                                // 1. 인스턴스가 생성되었다면 beforedestroy 이벤트 연결 - 객체 수정 후 목록 Refresh

                                if(wndInstance){

        //                             wndInstance.on('beforeclose', function(){

        //                                 me.refreshObjectList(component.objtree.getSelectionModel().getSelection()[0], Ext.getStore('st_object_select'));

        //                             });

                                    // 2. 화면 생성

                                    wndInstance.loadData(response);

                                }

                            }

                        );

                    }

                },
                {
                    'name' : '객체 삭제',
                    'itemId' : 'mi_object_del',
                    'children' : null,
                    'callback' : function(){

                        Ext.Msg.show({
                            title : 'WeGuardia™ SMC 2.0',
                            msg : '선택된 객체를 삭제하시겠습니까?',
                            buttons : Ext.Msg.YESNO,
                            icon : Ext.Msg.QUESTION,
                            fn : function(res){

                                if(res === 'yes'){

                                    var selectRecord = component.selectobj.getSelection()[0];

                                    var _svc = 'ftSMC',
                                        _func = 'delObject',
                                        _params = {

                                            'cid' : Ext.encode(selectRecord.get('@cid'))

                                        };

                                    request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            if(response){

                                                if(response.errorList){

                                                    // 0. 객체를 장비나 다른 화면에서 사용 중일 경우 삭제 방지

                                                    Ext.create('SMC4ZEN.view.pnl_object_delete_fail').loadData(response.errorList);

                                                }

                                            }

                                        }

                                    );

                                }

                            }

                        });

                    }

                },
                {
                    'name' : '연결 객체 관리',
                    'itemId' : 'mi_object_linkobject',
                    'children' : null,
                    'callback' : function(){

                        var selectRecord = component.selectobj.getSelection()[0];

                        if(centerPanel.taskObj){

                            clearInterval(centerPanel.taskObj);

                        }

                        devFuncModule.showLinkObject(selectRecord.get('@cid'), selectRecord.data, 'SMC4ZEN.view.pnl_object_hierarchy');

                    }

                }

            ];

        }
        else if(contextType === 'Policy'){



        }

        return objectContextData;
    },

    /*
        일시 : 2015.01.30

        설명 : 객체를 검색합니다.

        수정 :

        - (2015.01.30 김민수 : 객체검색 함수 정의)
    */
    searchObject: function(text) {
        var _objectWnd  = Ext.getCmp('win_smc_object_set');
        var _tbObject   = _objectWnd.down('[itemId=gpn_object_selectobj]').down('[itemId=tb_object_serch]');
        var _objectList = _objectWnd.down('[itemId=gpn_object_selectobj]');
        var _importChk  = _tbObject.down('[itemId=ck_import]');

        var condition = {};

        if(text){

            if(_importChk.getValue()){

                condition.name = text;
                condition.op_in = true;

            }
            else{

                condition.name = text;
                condition.op_eq	= true;

            }

            if(condition){

                condition.kind = _objectWnd.gtype;

                _objectList.getStore().getProxy().extraParams = {

                    'condition' : Ext.encode(condition)

                };

                _objectList.getStore().getProxy().url = 'api/ftSMC/findObjectList/';

                _objectList.getStore().loadPage(1);

            }

        }
    },

    onEsc: function() {
        this.destroy();
    }

});
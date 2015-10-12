
Ext.define('SMC.view.pnl_xtm_vpn_host', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_vpn_host',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.feature.Summary',
        'Ext.button.Button',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_vpn_host',
    width: 800,
    bodyPadding: 10,
    title: '보안호스트 고정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(!validIPForm(value, 'v4')){

                            return false;

                        }

                        return true;
                    },
                    itemId: 'txf_ip',
                    margin: '0, 0, 10, 0',
                    maxWidth: 230,
                    fieldLabel: '대상 IP',
                    labelWidth: 70
                },
                {
                    xtype: 'textfield',
                    itemId: 'txf_desc',
                    margin: '0, 0, 10, 0',
                    maxWidth: 570,
                    fieldLabel: '설명',
                    labelWidth: 70
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_vpnhost_object',
                    margin: '0, 0, 10, 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 10, 0, 0',
                            border: false,
                            height: 200,
                            itemId: 'ctn_vpnhost_objectgrid',
                            maxWidth: 350,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_vpnhost_objectlist',
                                    overlapHeader: false,
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            summaryRenderer: function(val, params, data) {
                                                return '총 ' + val + ' 개의 객체';
                                            },
                                            summaryType: 'count',
                                            align: 'center',
                                            dataIndex: 'name',
                                            text: '대상 보안호스트 객체',
                                            flex: 0.8
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.3,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // remove handler ================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.10.23
                                                        //
                                                        // 설명 : 선택된 ROW의 데이터를 삭제합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var store = Ext.getStore('st_vpnhost_objectlist');

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        render: {
                                            fn: me.onGpn_vpnhost_objectlistRender,
                                            scope: me
                                        }
                                    },
                                    features: [
                                        {
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_add',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '추 가',
                            listeners: {
                                click: {
                                    fn: me.onBt_addClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_clear',
                            width: 100,
                            text: '초기화',
                            listeners: {
                                click: {
                                    fn: me.onBt_clearClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_vpnhost_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_vpnhost_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_vpnhost_hostlist',
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'target_ip',
                            text: '대상 IP',
                            flex: 0.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '객체 목록',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'desc',
                            text: '설명',
                            flex: 1
                        }
                    ],
                    listeners: {
                        render: {
                            fn: me.onGpn_vpnhost_hostlistRender,
                            scope: me
                        },
                        itemclick: {
                            fn: me.onGpn_vpnhost_hostlistItemClick,
                            scope: me
                        }
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {
                        mode: 'MULTI'
                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_vpn_hostAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_vpn_hostBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_vpnhost_objectlistRender: function(component, eOpts) {
        // onGpn_vpnhost_hostlistRender ==================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : 그리드의 스토어를 동적으로 생성하여 바인딩합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_vpnhost_objectlist',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '#text'
                }
            ]

        }));
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.23
        //
        // 설명 : 오브젝트를 추가합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_ip',
            'thisObj'       : this,
            'component'     : component.gpn_objectlist

        }).show();
    },

    onBt_clearClick: function(button, e, eOpts) {
        // onBt_clearClick ===============================================================================================================================================================
        //
        // 일시 : 2014.10.23
        //
        // 설명 : 등록된 객체들을 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_vpnhost_objectlist').removeAll();
    },

    onCtn_vpnhost_controlAfterRender: function(component, eOpts) {
        // onCtn_vpnhost_controlAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.10.23
        //
        // 설명 : vpnhost 데이터를 추가, 수정, 삭제하는 기능을 정의한다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var me = this;

        var componentObj = this.componentStorage();

        bt_add.on('click', function(){

            var obj = {};

        // 유효성 검사 ====================================================================================================================================================================

            if(!me.validityCheck().storeSizeCheck(componentObj.gpn_objectlist.getStore(), 0, 64, '대상 보안호스트는 필수 항목입니다.', '대상 보안호스트의 최대갯수는 64개 입니다.') ||
               !me.validityCheck().blankCheck(componentObj.txf_targetip) ||
               !me.validityCheck().ipValidate(componentObj.txf_targetip) ||
               !me.validityCheck().duplicateCheck('add', componentObj.txf_targetip.getValue(), null, 'target_ip', 'st_vpnhost_hostlist', '대상 IP가가 중복되었습니다.')){

                return false;

            }

            obj['@num'] = 0;
            obj.desc    = componentObj.txf_desc.getValue();

            var sechostObj = [];
            var objectName = [];

            var objectStore = componentObj.gpn_objectlist.getStore();

            for(var i = 0; i < objectStore.count(); i++){

                sechostObj.push({	'#text' : objectStore.getAt(i).get('#text')		});

                objectName.push(objectStore.getAt(i).get('name'));

            }

            obj.sechost = sechostObj;

            obj.name = objectName;

            obj.target_ip = componentObj.txf_targetip.getValue();

            gridData_Add(componentObj.gpn_hostlist, obj);

            reconfigNum(componentObj.gpn_hostlist.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.gpn_hostlist.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

        // 유효성 검사 ====================================================================================================================================================================

            if(!me.validityCheck().blankCheck(componentObj.txf_targetip) ||
               !me.validityCheck().ipValidate(componentObj.txf_targetip) ||
               !me.validityCheck().storeSizeCheck(componentObj.gpn_objectlist.getStore(), 0, 64, '대상 보안호스트는 필수 항목입니다.', '대상 보안호스트의 최대갯수는 64개 입니다.') ||
               !me.validityCheck().duplicateCheck('mod', componentObj.txf_targetip.getValue(), componentObj.gpn_hostlist.getSelectionModel().getSelection()[0].get('target_ip'), 'target_ip', 'st_vpnhost_hostlist', '대상 IP가 중복되었습니다.')){

                return false;

            }

            var obj = {};

            obj['@num']   = 0;
            obj.desc      = componentObj.txf_desc.getValue();

            var sechostObj = [];
            var objectName = [];

            var objectStore = componentObj.gpn_objectlist.getStore();

            for(var i = 0; i < objectStore.count(); i++){

                sechostObj.push({	'#text' : objectStore.getAt(i).get('#text')		});

                objectName.push(objectStore.getAt(i).get('name'));

            }

            obj.sechost = sechostObj;

            obj.name = objectName;

            obj.target_ip = componentObj.txf_targetip.getValue();

            selectionGrid_Mod(componentObj.gpn_hostlist, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.gpn_hostlist.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.gpn_hostlist);

            reconfigNum(componentObj.gpn_hostlist.getStore());

        });
    },

    onGpn_vpnhost_hostlistRender: function(component, eOpts) {
        // onGpn_vpnhost_hostlistRender ==================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : 그리드의 스토어를 동적으로 생성하여 바인딩합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_vpnhost_hostlist',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'sechost'
                },
                {
                    name: 'target_ip'
                }
            ]

        }));
    },

    onGpn_vpnhost_hostlistItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_vpnhost_hostlistItemClick ===============================================================================================================================================
        //
        // 일시 : 2014.10.23
        //
        // 설명 : 보안호스트의 ROW 클릭시 해당 ROW에 저장된 데이터를 입력 컴포넌트에 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.txf_targetip.setValue(record.data.target_ip);

        component.txf_desc.setValue(record.data.desc);

        // 오브젝트 초기화 ==================================================================================================================================================================

        var objectlistStore = component.gpn_objectlist.getStore();

        objectlistStore.removeAll();

        Ext.each(record.data.sechost, function(cid){

            request_helper.xmlrpc_call_Ajax_Post(
                'ftSMC',
                'getObject',
                {
                    cid : Ext.encode(cid['#text'])
                },
                function(res){

                    var obj = {};

                    obj.name = res.name;
                    obj['#text'] = res['@cid'];
                    obj['@type'] = 'obejct';

                    objectlistStore.add(obj);

                }

            );

        });
    },

    onPnl_xtm_vpn_hostAfterRender: function(component, eOpts) {
        // onPnl_xtm_vpn_hostAfterRender ================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : 보안 호스트 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var vpnhostData = component.deviceParams;

        var componentObj = this.componentStorage();

        // setPolicy 이벤트 등록 ==========================================================================================================================================================

        component.on('setPolicy', this.setPolicyData);

        component.on('getObjectName', this.initVpnhostData);

        // 데이터 초기화 ==================================================================================================================================================================

        var me = this;

        if(vpnhostData){

            Ext.each(vpnhostData.fixed_sechost, function(vpnhostData, idx){

                var sechostSize = (vpnhostData.sechost.length === undefined) ? 1 : vpnhostData.sechost.length;

                if(!vpnhostData.sechost.length){

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftSMC',
                        'getObject',
                        {
                            cid : Ext.encode(vpnhostData.sechost['#text'])
                        },
                        function(res){

                            var tmp = vpnhostData;

                            tmp.name = res.name;

                            Ext.getStore('st_vpnhost_hostlist').add(tmp);

                        }

                    );

                }
                else{

                    me.fireEvent('getObjectName', sechostSize, vpnhostData.sechost, 0, [], vpnhostData);

                }

            });

        }
    },

    onPnl_xtm_vpn_hostBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_vpn_hostBeforeClose =================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : 데이터를 저장하고 뷰 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        obj.txf_targetip = this.down('[itemId=txf_ip]');
        obj.txf_desc     = this.down('[itemId=txf_desc]');

        var ctn_object   = this.down('[itemId=ctn_vpnhost_object]');

        obj.gpn_objectlist = ctn_object.down('[itemId=ctn_vpnhost_objectgrid]').down('[itemId=gpn_vpnhost_objectlist]');

        obj.gpn_hostlist = this.down('[itemId=gpn_vpnhost_hostlist]');

        return obj;
    },

    initVpnhostData: function(size, value, idx, objectArray, hostData) {
        // initVpnhostData ==============================================================================================================================================================
        //
        // 일시 : 2014.10.23
        //
        // 설명 : 객체의 명칭을 조회하여 메인 스토어에 추가합니다.
        //
        // ==============================================================================================================================================================================

        var me = this;

        request_helper.xmlrpc_call_Ajax_Post(
            'ftSMC',
            'getObject',
            {
                cid : Ext.encode(value[idx]['#text'])
            },
            function(res){

                objectArray.push(res.name);

                if(size === objectArray.length){

                    hostData.name = objectArray;

                    Ext.getStore('st_vpnhost_hostlist').add(hostData);

                    return;

                }
                else{

                    me.initVpnhostData(size, value, (idx + 1), objectArray, hostData);

                }

            }

        );
    },

    setPolicyData: function(component, policyKey, policyData) {
        // setPolicyData ================================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : 객체 그리드에 오브젝트 정책을 추가합니다.
        //
        // ==============================================================================================================================================================================

        var obj = {};

        var me  = this;

        // 선택된 객체 중복 검사 ===========================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getObject',
            params       = {

                cid : Ext.encode(policyData['@cid'])

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                var ipObject = res.ip;

                if(Object.prototype.toString.call(ipObject) === "[object Array]"){

                    if(ipObject.length > 64){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP가 64개 이하인 객체만 등록할 수 있습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(!me.validityCheck().duplicateCheck(policyData['@cid'], '#text', 'st_vpnhost_objectlist', '이미 등록된 객체입니다.')){

                    return false;

                }

                Ext.getStore('st_vpnhost_objectlist').add({	'name' : policyData.name, '#text' : policyData['@cid']	});

            }
        );
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 기타 설정 화면의 유효성 검사를 수행할 모듈을 정의합니다.
        //
        // ==============================================================================================================================================================================

        var validateObject = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getXType() === 'textfield'){

                    if(component.getValue() === '' && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }
                else{

                    if(component.getValue() === null && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'listeners' : {

                                'destroy' : {

                                    fn : function(){

                                        component.focus();

                                    }

                                }

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'ipValidate' : function(component){

                if(!component.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR,
                        'listeners' : {

                            'destroy' : {

                                fn : function(){

                                    component.focus();

                                }

                            }

                        }

                    });

                    return false;

                }

                return true;

            },
            'duplicateCheck' : function(){

                switch(arguments.length){

                    case 4:

                        for(var i = 0; i < Ext.getStore(arguments[2]).count(); i ++){

                            if(arguments[0] === Ext.getStore(arguments[2]).getAt(i).get(arguments[1])){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : arguments[3],
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }

                        return true;

                    default :

                        if(arguments[0] === 'add'){

                            if(!duplicationItem(arguments[1], arguments[3], arguments[4])){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : arguments[5],
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                            return true;

                        }
                        else{

                            if(!duplicationItem(arguments[1], arguments[3], arguments[4]) && arguments[1] !== arguments[2]){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : arguments[5],
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }

                        return true;

                }

            },
            storeSizeCheck : function(storeObject, minValue, maxValue, minMsg, maxMsg){

                var storeCount = storeObject.count();

                if(storeCount <= minValue){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : minMsg,
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }
                else if(storeCount >= maxMsg){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : maxMsg,
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validateObject;
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.10.22
        //
        // 설명 : VPN HOST 데이터를 저장합니다.
        //
        // ==============================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component = this.componentStorage();

        var vpnhostStore = component.gpn_hostlist.getStore();

        var vpnhostCount = vpnhostStore.count();

        if(vpnhostCount <= 0){

            deviceAllData.vpn_fixed_sechost = null;

        }
        else{

            if(!deviceAllData.vpn_fixed_sechost){

                deviceAllData.vpn_fixed_sechost = {};

            }

            var vpnhostArray = [];

            for(var i = 0; i < vpnhostCount; i++){

                var obj = {};

                obj = vpnhostStore.getAt(i).data;

                delete obj.name;

                vpnhostArray.push(obj);

            }

            deviceAllData.vpn_fixed_sechost.fixed_sechost = vpnhostArray;

        }

        return true;
    }

});
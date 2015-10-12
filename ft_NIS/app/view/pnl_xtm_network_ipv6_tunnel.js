
Ext.define('SMC.view.pnl_xtm_network_ipv6_tunnel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_ipv6_tunnel',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_network_ipv6_tunnel',
    width: 800,
    title: 'IPv6 터널링',

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_tunnel_ipv6',
                    title: 'IPv6 터널링',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_tunnel_local',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(!retValue){return true; }

                                        retValue = validIPForm(value, 'v4');

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_local',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: 'Local IPv4 주소',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_ttl',
                                    maxWidth: 300,
                                    fieldLabel: 'TTL',
                                    labelWidth: 120,
                                    value: 128,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tunnel_ttl',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_ttlChange,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_tunnel_remote',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(!retValue){return true; }

                                        retValue = validIPForm(value, 'v4');

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_remote',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    width: 300,
                                    fieldLabel: 'Remote IPv4 주소',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 255);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    hidden: true,
                                    itemId: 'nfd_value',
                                    width: 300,
                                    fieldLabel: 'Value',
                                    labelWidth: 120,
                                    value: 128
                                }
                            ]
                        },
                        {
                            xtype: 'numberfield',
                            validator: function(value) {
                                var retValue = LengthCheck(value, 1, 255);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'nfd_index',
                            margin: '0, 0, 10, 0',
                            maxWidth: 300,
                            width: 300,
                            fieldLabel: '장치명 Index',
                            labelWidth: 120
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_tunnel_control',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_tunnel_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_tunnel_list',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_tunnel_set',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'local',
                                    text: 'Local IPv4 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'remote',
                                    text: 'Remote IPv4 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ttl',
                                    text: 'TTL',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'index',
                                    text: '장비 Index',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_tunnel_listItemClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.RowModel', {
                                mode: 'MULTI'
                            })
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_tunnel_6to4',
                    checkboxToggle: true,
                    title: '6to4',
                    layout: {
                        type: 'hbox',
                        align: 'stretchmax',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue;

                                retValue = CheckNotNull(value);

                                if(!retValue){return true; }

                                retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'txf_ipv4',
                            margin: '0, 10, 10, 0',
                            fieldLabel: 'IPv4'
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue;

                                retValue = CheckNotNull(value);

                                if(!retValue){return true; }

                                retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'txf_relay',
                            margin: '0, 10, 10, 0',
                            fieldLabel: 'Relay Router'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_network_ipv6_tunnelAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_ipv6_tunnelBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_ttlChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_ttlChange ==============================================================================================================================================================
        //
        // 설명 : TTL 콤보박스의 값이 변하면 TTL 값을 메뉴얼로 설정할 수 있습니다.
        //
        // ==============================================================================================================================================================================

        var ttlComp = field.up().up().down('[itemId=ctn_tunnel_remote]').down('[itemId=nfd_value]');

        if(newValue === 'manual'){

            ttlComp.setVisible(true);

        }
        else{

            ttlComp.setVisible(false);

        }
    },

    onCtn_tunnel_controlAfterRender: function(component, eOpts) {
        // onCtn_tunnel_controlAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : 터널링 데이터를 추가, 수정, 삭제 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().tunnelBlankCheck() || !me.validityCheck().tunnelValidateCheck() ||
               !me.validityCheck().tunnelDuplicationCheck(componentObj.deviceindex.getValue(), 'add')){

                return;

            }

            var obj = {};

            obj['@cid'] = '';
            obj['@num'] = 0;
            obj.index   = 'sit' + componentObj.deviceindex.getValue();

            var localObj = {};

            localObj['#text'] = componentObj.localaddr.getValue();
            localObj['@type'] = 'single';
            localObj['@version'] = 'v4';

            obj.local = localObj;

            var remoteObj = {};

            remoteObj['#text'] = componentObj.remoteaddr.getValue();
            remoteObj['@type'] = 'single';
            remoteObj['@version'] = 'v4';

            obj.remote = remoteObj;
            obj.ttl = (componentObj.localttl.getValue() !== 'manual') ? 128 : componentObj.ttlvalue.getValue();

            gridData_Add(componentObj.tunnel_grid, obj);

            reconfigNum(componentObj.tunnel_grid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.tunnel_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '터널링 데이터 수정 에러',
                    msg : '수정할 터널링 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().tunnelBlankCheck() || !me.validityCheck().tunnelValidateCheck() ||
               !me.validityCheck().tunnelDuplicationCheck(componentObj.deviceindex.getValue(), 'mod')){

                return;

            }

            var obj = {};

            obj['@cid'] = '';
            obj.index   = 'sit' + componentObj.deviceindex.getValue();

            var localObj = {};

            localObj['#text'] = componentObj.localaddr.getValue();
            localObj['@type'] = 'single';
            localObj['@version'] = 'v4';

            obj.local = localObj;

            var remoteObj = {};

            remoteObj['#text'] = componentObj.remoteaddr.getValue();
            remoteObj['@type'] = 'single';
            remoteObj['@version'] = 'v4';

            obj.remote = remoteObj;
            obj.ttl = (componentObj.localttl.getValue() !== 'manual') ? 128 : componentObj.ttlvalue.getValue();

            selectionGrid_Mod(componentObj.tunnel_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.tunnel_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '터널링 데이터 삭제 에러',
                    msg : '삭제할 터널링 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.tunnel_grid);

            reconfigNum(componentObj.tunnel_grid.getStore());

        });
    },

    onGpn_tunnel_listItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_tunnel_listItemClick ====================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : 그리드의 row를 클릭 시 입력 컴포넌트에 데이터를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.localaddr.setValue(record.data.local['#text']);
        component.localttl.setValue((record.data.ttl !== 128) ? 'manual' : 128);
        component.remoteaddr.setValue(record.data.remote['#text']);
        component.ttlvalue.setValue(record.data.ttl);

        component.deviceindex.setValue(Number(record.data.index.substring(3)));
    },

    onPnl_xtm_network_ipv6_tunnelAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_ipv6_tunnelAfterRender =====================================================================================================================================
        //
        // 일시 : 2014.08.18
        //
        // 설명 : IPv6 터널링 데이터를 컴포넌트에 출력합니다.
        //
        // 파라미터 : [0] network_tunneling_6in4 [1] network_tunneling_6to4
        //
        // [0] network_tunneling_6in4 - 그리드 설정을 저장합니다.
        // [1] network_tunneling_6to4 - 6to4 설정을 저장합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var tunnelStore = Ext.getStore('st_tunnel_set');

        // 스토어 초기화 ==================================================================================================================================================================

        this.initStore();

        componentObj.fds_6to4.checkboxCmp.setValue(false);

        try{

            if(component.deviceParams[0]){

                var tunnelData = component.deviceParams[0].tunneling;

                if(tunnelData){

                    tunnelStore.add(tunnelData);

                }

            }

        }
        catch(err){

            console.log('IPv6 터널링 데이터 초기화 중 catch 발생 : ', err);

        }

        try{

            if(component.deviceParams[1]){

                var tunnel6to4Data = component.deviceParams[1].tunneling;

                if(tunnel6to4Data){

                    componentObj.fds_6to4.checkboxCmp.setValue((tunnel6to4Data.setting['@chk_use'] === 'on') ? true : false);
                    componentObj.addr6to4.setValue(tunnel6to4Data.ip['#text']);
                    componentObj.relay6to4.setValue(tunnel6to4Data.relay);

                }

            }

        }
        catch(err){

            console.log('6 to 4 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_ipv6_tunnelBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_ipv6_tunnelBeforeClose ======================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : ipv6 터널링 화면이 종료될 때 데이터를 저장하고 화면 상태를 변경합니다.
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

        var fds_ipv6 = this.down('[itemId=fds_tunnel_ipv6]');
        var fds_6to4 = this.down('[itemId=fds_tunnel_6to4]');

        var ctn_local  = fds_ipv6.down('[itemId=ctn_tunnel_local]');
        var ctn_remote = fds_ipv6.down('[itemId=ctn_tunnel_remote]');

        obj.localaddr   = ctn_local.down('[itemId=txf_local]');
        obj.localttl    = ctn_local.down('[itemId=cmb_ttl]');

        obj.remoteaddr  = ctn_remote.down('[itemId=txf_remote]');
        obj.ttlvalue    = ctn_remote.down('[itemId=nfd_value]');

        obj.deviceindex = fds_ipv6.down('[itemId=nfd_index]');

        obj.tunnel_grid = fds_ipv6.down('[itemId=gpn_tunnel_list]');

        obj.fds_6to4    = fds_6to4;

        obj.addr6to4    = fds_6to4.down('[itemId=txf_ipv4]');
        obj.relay6to4   = fds_6to4.down('[itemId=txf_relay]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Tunnel 데이터를 추가, 수정 시에 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            tunnelBlankCheck : function(){

                if(component.localaddr.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Local IPv4 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.remoteaddr.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Remote IPv4 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.localttl.getValue() === 'manual' && component.ttlvalue.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'TTL 값은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.deviceindex.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '장치명 Index는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            tunnel6to4BlankCheck : function(){

                if(component.fds_6to4.checkboxCmp.getValue() && component.addr6to4.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IPv4 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.fds_6to4.checkboxCmp.getValue() && component.relay6to4.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Relay Router는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }


                return true;

            },
            tunnelDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem('sit' + componentValue, 'index', 'st_tunnel_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 장치명 Index가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _tunnelName = component.tunnel_grid.getSelectionModel().getSelection()[0].get('index');

                    if(!duplicationItem('sit' + componentValue, 'index', 'st_tunnel_set') && _tunnelName !== 'sit' + componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 장치명 Index가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            },
            tunnel6to4ValidateCheck : function(){

                if(!component.addr6to4.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.relay6to4.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            tunnelValidateCheck : function(){

                if(!component.localaddr.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.remoteaddr.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.ttlvalue.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'TTL의 범위는 0 ~ 255 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.deviceindex.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '장치명 Index의 범위는 1 ~ 255 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : 터널링 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var tunnelStore = Ext.getStore('st_tunnel_set');

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // =============================================================================================================================================================================

        if(!this.validityCheck().tunnel6to4BlankCheck() || !this.validityCheck().tunnel6to4ValidateCheck()){

            return false;

        }

        // IPv6 터널링 데이터 저장 ========================================================================================================================================================

        if(tunnelStore.count() > 0){

            var tunnelData = [];

            if(!deviceAllData.network_tunneling_6in4){

                deviceAllData.network_tunneling_6in4 = {};

            }

            for(var i = 0; i < tunnelStore.count(); i++){

                tunnelData.push(tunnelStore.getAt(i).data);

            }

            deviceAllData.network_tunneling_6in4.tunneling = tunnelData;

        }
        else{

            if(deviceAllData.network_tunneling_6in4){

                deviceAllData.network_tunneling_6in4 = null;

            }

        }

        // 6 to 4 데이터 저장 ============================================================================================================================================================

        if(component.fds_6to4.checkboxCmp.getValue() === true && component.addr6to4.getValue()){

            deviceAllData.network_tunneling_6to4.tunneling.ip['#text'] = component.addr6to4.getValue();

        }
        else{

            if(!component.fds_6to4.checkboxCmp.getValue()){

                delete deviceAllData.network_tunneling_6to4.tunneling.ip['#text'];

            }

        }

        deviceAllData.network_tunneling_6to4.tunneling.ip['@type'] = 'single';

        deviceAllData.network_tunneling_6to4.tunneling.ip['@version'] = 'v4';

        deviceAllData.network_tunneling_6to4.tunneling.relay = (component.fds_6to4.checkboxCmp.getValue() === true) ? component.relay6to4.getValue() : null;

        deviceAllData.network_tunneling_6to4.tunneling.setting['@chk_use'] = (component.fds_6to4.checkboxCmp.getValue()) ? 'on' : 'off';

        return true;
    },

    initStore: function() {
        // initStore =====================================================================================================================================================================
        //
        // 설명 : tunnel store 를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_tunnel_set').removeAll();
    }

});
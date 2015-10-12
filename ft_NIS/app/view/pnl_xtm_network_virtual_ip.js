
Ext.define('SMC.view.pnl_xtm_network_virtual_ip', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_virtual_ip',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.form.field.Number'
    ],

    height: 680,
    id: 'pnl_xtm_network_virtual_ip',
    width: 800,
    bodyPadding: 10,
    title: '가상 IP 주소',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_virtual_ipv4',
                    title: '가상 IPv4 주소',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_virtualv4_input',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_interface',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 250,
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_totaleth',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!validIPForm(value, 'v4')){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_ip',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 250,
                                    fieldLabel: '가상 IPv4 주소'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!validIPForm(value, 'v4')){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_netmask',
                                    maxWidth: 250,
                                    fieldLabel: '넷마스크'
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_virtualv4_control',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_virtualv4_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_virtual_ipv4',
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    text: '인터페이스',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ip',
                                    text: '가상 IPv4  주소',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'netmask',
                                    text: '넷마스크',
                                    flex: 2
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onGpn_virtual_ipv4Render,
                                    scope: me
                                },
                                itemclick: {
                                    fn: me.onGpn_virtual_ipv4ItemClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_virtual_ipv6',
                    title: '가상 IPv6 주소',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_virtualv6_input',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_interface',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 250,
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_totaleth',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidIPv6(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;

                                    },
                                    flex: 1,
                                    itemId: 'txf_ip',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 250,
                                    fieldLabel: '가상 IPv6 주소'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 128);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_prefix',
                                    maxWidth: 250,
                                    fieldLabel: '프리픽스'
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_virtualv6_control',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_virtualv6_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            margins: '0, 0, 10, 0',
                            itemId: 'gpn_virtual_ipv6',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    text: '인터페이스',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ip',
                                    text: '가상 IPv6 주소',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'prefix',
                                    text: '프리픽스',
                                    flex: 2
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onGpn_virtual_ipv6gridRender,
                                    scope: me
                                },
                                itemclick: {
                                    fn: me.onGpn_virtual_ipv6ItemClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_network_virtual_ipAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_virtual_ipBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_virtualv4_controlAfterRender: function(component, eOpts) {
        // onCtn_virtualv4_controlAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 가상 IPv4 설정을 추가, 수정, 삭제 작업을 정의합니다.
        //
        // ===============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(componentObj.ipv4) || !me.validityCheck().blankCheck(componentObj.ipv4) ||
               !me.validityCheck().blankCheck(componentObj.netmask) || !me.validityCheck().ipValidate(componentObj.netmask)){

                return;

            }

            var obj = {};

            obj['@cid'] = '';
            obj['@num'] = 0;
            obj['interface'] = componentObj.eth_v4.getValue();
            obj.ip = componentObj.ipv4.getValue();
            obj.netmask = componentObj.netmask.getValue();

            gridData_Add(componentObj.grid_ipv4, obj);

            reconfigNum(componentObj.grid_ipv4.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_ipv4.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.ipv4) || !me.validityCheck().ipValidate(componentObj.ipv4) ||
               !me.validityCheck().blankCheck(componentObj.netmask) || !me.validityCheck().ipValidate(componentObj.netmask)){

                return;

            }

            var obj = {};

            obj['interface'] = componentObj.eth_v4.getValue();
            obj.ip = componentObj.ipv4.getValue();
            obj.netmask = componentObj.netmask.getValue();

            selectionGrid_Mod(componentObj.grid_ipv4, obj);

            reconfigNum(componentObj.grid_ipv4.getStore());

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_ipv4.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_ipv4);

            reconfigNum(componentObj.grid_ipv4.getStore());

        });
    },

    onGpn_virtual_ipv4Render: function(component, eOpts) {
        // onGpn_virtual_ipv4gridRender ==================================================================================================================================================
        //
        // 일시 : 2014.10.31
        //
        // 설명 : 그리드에 연결할할 스토어를 생성하여 그리드와 Bind 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_virtual_ipv4',
            fields: [
                {
                    name : '@cid'
                },
                {
                    name : '@num'
                },
                {
                    name : 'interface'
                },
                {
                    name : 'ip'
                },
                {
                    name : 'netmask'
                }
            ]

        }));
    },

    onGpn_virtual_ipv4ItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_virtual_ipv4ItemClick ===================================================================================================================================================
        //
        // 일시 : 2014.11.04
        //
        // 설명 : 선택된 Row의 데이터를 컴포넌트에 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.eth_v4.setValue(record.data['interface']);
        component.ipv4.setValue(record.data.ip);
        component.netmask.setValue(record.data.netmask);
    },

    onCtn_virtualv6_controlAfterRender: function(component, eOpts) {
        // onCtn_virtualv6_controlAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.11.04
        //
        // 설명 : 가상 IPv6 설정을 추가, 수정, 삭제 작업을 정의합니다.
        //
        // ===============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(componentObj.ipv6) || !me.validityCheck().ipValidate(componentObj.ipv6) ||
               !me.validityCheck().blankCheck(componentObj.prefix) || !me.validityCheck().scaleValidate(componentObj.prefix, '프리픽스의 범위는 1 ~ 128 입니다.', componentObj.prefix.getValue())){

                return;

            }

            var obj = {};

            obj['@cid'] = '';
            obj['@num'] = 0;
            obj['interface'] = componentObj.eth_v6.getValue();
            obj.ip = componentObj.ipv6.getValue();
            obj.prefix = componentObj.prefix.getValue();

            gridData_Add(componentObj.grid_ipv6, obj);

            reconfigNum(componentObj.grid_ipv6.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_ipv6.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.ipv6) || !me.validityCheck().ipValidate(componentObj.ipv6) ||
               !me.validityCheck().blankCheck(componentObj.prefix) || !me.validityCheck().scaleValidate(componentObj.prefix, '프리픽스의 범위는 1 ~ 128 입니다.', componentObj.prefix.getValue())){

                return;

            }

            var obj = {};

            obj['interface'] = componentObj.eth_v6.getValue();
            obj.ip = componentObj.ipv6.getValue();
            obj.prefix = componentObj.prefix.getValue();

            selectionGrid_Mod(componentObj.grid_ipv6, obj);

            reconfigNum(componentObj.grid_ipv6.getStore());

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_ipv6.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_ipv6);

            reconfigNum(componentObj.grid_ipv6.getStore());

        });
    },

    onGpn_virtual_ipv6gridRender: function(component, eOpts) {
        // onGpn_virtual_ipv6gridRender ==================================================================================================================================================
        //
        // 일시 : 2014.10.31
        //
        // 설명 : 그리드에 연결할할 스토어를 생성하여 그리드와 Bind 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_virtual_ipv6',
            fields: [
                {
                    name : '@cid'
                },
                {
                    name : '@num'
                },
                {
                    name : 'interface'
                },
                {
                    name : 'ip'
                },
                {
                    name : 'prefix'
                }
            ]

        }));
    },

    onGpn_virtual_ipv6ItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_virtual_ipv6ItemClick ===================================================================================================================================================
        //
        // 일시 : 2014.11.04
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.eth_v6.setValue(record.data['interface']);
        component.ipv6.setValue(record.data.ip);
        component.prefix.setValue(record.data.prefix);
    },

    onPnl_xtm_network_virtual_ipAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_virtual_ipAfterRender =======================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 가상 IP관리 데이터를 그리드에 출력합니다.
        //
        // 파라미터 :
        //
        // [0] network_virtual_ip
        // [1] network_virtual_ipv6
        //
        // ===============================================================================================================================================================================

        var ipv4Data = component.deviceParams[0];
        var ipv6Data = component.deviceParams[1];

        var componentObj = this.componentStorage();

        if(ipv4Data){

            if(ipv4Data.vip){

                componentObj.grid_ipv4.getStore().add(ipv4Data.vip);

            }

        }

        if(ipv6Data){

            if(ipv6Data.vip){

                componentObj.grid_ipv6.getStore().add(ipv6Data.vip);

            }

        }
    },

    onPnl_xtm_network_virtual_ipBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_virtual_ipBeforeClose =======================================================================================================================================
        //
        // 일시 : 2014.10.02
        //
        // 설명 : 가상화면 패널이 사라지면 데이터를 저장하고 화면 상태를 변화시킵니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj       = {};

        var fds_ipv4  = this.down('[itemId=fds_virtual_ipv4]');
        var fds_ipv6  = this.down('[itemId=fds_virtual_ipv6]');

        var eth_v4    = fds_ipv4.down('[itemId=cmb_interface]');
        var ipv4      = fds_ipv4.down('[itemId=txf_ip]');
        var netmask   = fds_ipv4.down('[itemId=txf_netmask]');

        var grid_ipv4 = fds_ipv4.down('[itemId=gpn_virtual_ipv4]');

        var eth_v6    = fds_ipv6.down('[itemId=cmb_interface]');
        var ipv6      = fds_ipv6.down('[itemId=txf_ip]');
        var prefix    = fds_ipv6.down('[itemId=nfd_prefix]');

        var grid_ipv6 = fds_ipv6.down('[itemId=gpn_virtual_ipv6]');

        obj.fds_ipv4  = fds_ipv4;
        obj.fds_ipv6  = fds_ipv6;

        obj.eth_v4    = eth_v4;
        obj.ipv4      = ipv4;
        obj.netmask   = netmask;

        obj.grid_ipv4 = grid_ipv4;

        obj.eth_v6    = eth_v6;
        obj.ipv6      = ipv6;
        obj.prefix    = prefix;

        obj.grid_ipv6 = grid_ipv6;

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.10.31
        //
        // 설명 : 가상 IP 화면의 유효성 검사를 수행합니다.
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
                            'icon' : Ext.Msg.ERROR,
                            'fn'   : function(res){

                                component.focus();

                            }

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
                            'fn'   : function(res){

                                component.focus();

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
                        'fn'   : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'scaleValidate' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[1];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        'title'   : 'WeGuardia™ SMC 2.0',
                        'msg'     : msg,
                        'buttons' : Ext.Msg.OK,
                        'icon'    : Ext.Msg.ERROR,
                        'fn'      : function(){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(value, field, storeid)){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    if(!duplicationItem(value, field, storeid) && value !== value2){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            }

        };

        return validateObject;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.10.02
        //
        // 설명 : 가상 IP 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var ipv4Store = component.grid_ipv4.getStore();
        var ipv6Store = component.grid_ipv6.getStore();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // IP v4 정보 저장 ==============================================================================================================================================================

        if(ipv4Store.count() <= 0){

            if(deviceAllData.network_virtual_ip){

                deviceAllData.network_virtual_ip = null;

            }

        }
        else{

            if(!deviceAllData.network_virtual_ip){

                deviceAllData.network_virtual_ip = {};

            }

            var virtualV4Array = [];

            for(var i = 0; i < ipv4Store.count(); i++){

                virtualV4Array.push(ipv4Store.getAt(i).data);

            }

            deviceAllData.network_virtual_ip.vip = virtualV4Array;

        }

        // IP v6 정보 저장 ==============================================================================================================================================================

        if(ipv6Store.count() <= 0){

            if(deviceAllData.network_virtual_ipv6){

                deviceAllData.network_virtual_ipv6 = null;

            }

        }
        else{

            if(!deviceAllData.network_virtual_ipv6){

                deviceAllData.network_virtual_ipv6 = {};

            }

            var virtualV6Array = [];

            for(var i = 0; i < ipv6Store.count(); i++){

                virtualV6Array.push(ipv6Store.getAt(i).data);

            }

            deviceAllData.network_virtual_ipv6.vip = virtualV6Array;

        }

        return true;
    }

});

Ext.define('SMC4ZEN.view.pnl_xtm_vpn_head_office', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_vpn_head_officeViewModel',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.feature.Summary',
        'Ext.form.field.ComboBox'
    ],

    viewModel: {
        type: 'pnl_xtm_vpn_head_office'
    },
    height: 680,
    id: 'pnl_xtm_vpn_head_office',
    width: 800,
    bodyPadding: 10,
    title: '본점',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_vpnhead_headset',
            layout: 'fit',
            checkboxToggle: true,
            title: 'Head-Office 설정',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'fpn_vpnhead_headset',
                    margin: '0, 0, 10, 0',
                    bodyPadding: 10,
                    title: '',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            validator: function(value) {
                                var retValue = LengthCheck(value, 1, 255);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'txf_timeout',
                            margin: '0, 10, 0, 0',
                            width: 300,
                            fieldLabel: 'VPN 테이블 타임아웃 결정시간',
                            labelWidth: 200,
                            value: 9
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: '초 (Default : 9초)'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            flex: 1,
            itemId: 'fds_vpnhead_hub',
            checkboxToggle: true,
            title: 'Hub and Spoke 에서 Hub로 동작',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_vpnhead_hubnetwork',
                    layout: 'fit',
                    title: 'Hub Network',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_vpnhead_object',
                            margin: '0, 0, 10, 0',
                            title: '',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnhead_object',
                                    margin: '10, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_policy',
                                            width: 100,
                                            text: '정책 추가',
                                            listeners: {
                                                click: 'onBt_policyClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_vpnhead_object',
                                    margin: '0, 0, 10, 0',
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            summaryRenderer: function(val, params, data) {
                                                return '총 ' + val + '개의 네트워크';
                                            },
                                            summaryType: 'count',
                                            dataIndex: 'name',
                                            text: '선택된 오브젝트 목록',
                                            flex: 0.8
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.2,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        var store = Ext.getStore('st_vpn_headoffice');

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    features: [
                                        {
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 0, 10, 0',
                                    text: '※ 오브젝트를 등록하지 않으면 default로 Any Network 가 적용됩니다.'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_vpnhead_relay',
                    checkboxToggle: true,
                    title: 'Hub 장비간 Packet Relay 기능',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_vpnhead_relay',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            items: [
                                {
                                    xtype: 'combobox',
                                    anchor: '50%',
                                    itemId: 'cmb_eth',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: 'Packet Relay 시 사용하는 Interface',
                                    labelWidth: 250,
                                    value: 'eth0',
                                    editable: false,
                                    emptyText: 'Select Interface ...',
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_deveth',
                                    valueField: 'eth',
                                    listeners: {
                                        afterrender: 'onCmb_ethAfterRender'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidMAC(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    anchor: '60%',
                                    itemId: 'txf_mac',
                                    fieldLabel: 'Packet Relay 시 목적지 MAC',
                                    labelWidth: 250
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_vpn_head_officeAfterRender',
        beforeclose: 'onPnl_xtm_vpn_head_officeBeforeClose'
    },

    onBt_policyClick: function(button, e, eOpts) {
        Ext.create('SMC4ZEN.view.win_smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_ip',
            'policyKey'     : 'ipsec_head',
            'thisObj'       : this,
            'componentObj'  : button

        }).show();
    },

    onCmb_ethAfterRender: function(component, eOpts) {
        comboAutoSelect(component, 'st_common_deveth');
    },

    onPnl_xtm_vpn_head_officeAfterRender: function(component, eOpts) {
        // onPnl_xtm_vpn_head_officeAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.06.11
        //
        // 설명 : IPSec 본점 화면의 컴포넌트를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.on('setPolicy', this.setPolicyData);

        this.initStore();

        var deviceData = component.deviceParams;

        // 컴포넌트 이벤트 및 값 초기화 =====================================================================================================================================================

        componentObj.fds_headset.checkboxCmp.setValue(false);
        componentObj.fds_hub.checkboxCmp.setValue(false);
        componentObj.fds_relay.checkboxCmp.setValue(false);

        componentObj.fds_headset.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(!newValue){

                componentObj.headset_valid.getForm().reset();

            }

        });

        componentObj.fds_hub.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(newValue){

                componentObj.fds_relay.checkboxCmp.setDisabled(false);

            }
            else{

                componentObj.fds_relay.checkboxCmp.setValue(false);

                componentObj.fds_relay.checkboxCmp.setDisabled(true);

                componentObj.hubnet_valid.getForm().reset();

                componentObj.relay_valid.getForm().reset();

            }

        });

        componentObj.fds_relay.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(!newValue){

                componentObj.relay_valid.getForm().reset();

            }

        });

        if(deviceData){

            try{

        // Head-Office 설정 ==============================================================================================================================================================

                if(deviceData.head_office){

                    componentObj.fds_headset.checkboxCmp.setValue((deviceData.head_office['@chk_use'] === 'on') ? true : false);

                    if(deviceData.head_office['@chk_use'] === 'on'){

                        componentObj.timeout.setValue(deviceData.head_office['#text']);

                    }

                }

        // Hub and Spoke 에서 Hub로 동작 설정 ==============================================================================================================================================

                if(deviceData.hub_and_spoke){

                    componentObj.fds_hub.checkboxCmp.setValue((deviceData.hub_and_spoke['@chk_use'] === 'on') ? true : false);

                    if(deviceData.hub_and_spoke.hub_and_spoke_network['@count']){

                        if(deviceData.hub_and_spoke.hub_and_spoke_network.member){

                            Ext.each(deviceData.hub_and_spoke.hub_and_spoke_network.member, function(hubData){

                                request_helper.xmlrpc_call_Ajax_Post(
                                    'ftSMC',
                                    'getObject',
                                    {
                                        cid : Ext.encode(hubData['@cid'])
                                    },
                                    function(res){

                                        var hubStore = Ext.getStore('st_vpn_headoffice');

                                        hubStore.add({	'name' : res.name , '@cid' : res['@cid']	});

                                    }

                                );

                            });

                        }

                    }

        // Hub 장비간 Packet Relay 기능 설정 ===============================================================================================================================================

                    if(deviceData.hub_and_spoke.packet_relay){

                        componentObj.fds_relay.checkboxCmp.setValue((deviceData.hub_and_spoke.packet_relay['@chk_use'] === 'on') ? true : false);

                        componentObj.eth.setValue(deviceData.hub_and_spoke.packet_relay['interface']);

                        componentObj.mac.setValue(deviceData.hub_and_spoke.packet_relay.mac);

                    }

                }

            }
            catch(err){

                console.log('VPN 본점 데이터 초기화 중 catch 발생 : ', err);

            }

        }
    },

    onPnl_xtm_vpn_head_officeBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj          = {};

        var fds_headset  = this.down('[itemId=fds_vpnhead_headset]');
        var fds_hub      = this.down('[itemId=fds_vpnhead_hub]');
        var fds_hubnet   = fds_hub.down('[itemId=fds_vpnhead_hubnetwork]');
        var fds_relay    = fds_hub.down('[itemId=fds_vpnhead_relay]');

        var headset_valid = fds_headset.down('[itemId=fpn_vpnhead_headset]');
        var hubnet_valid = fds_hubnet.down('[itemId=fpn_vpnhead_object]');
        var relay_valid  = fds_relay.down('[itemId=fpn_vpnhead_relay]');

        var timeout      = fds_headset.down('[itemId=txf_timeout]');

        var selectObject = fds_hubnet.down('[itemId=txf_obj]');
        var object_grid  = fds_hubnet.down('[itemId=gpn_vpnhead_object]');

        var eth          = fds_relay.down('[itemId=cmb_eth]');
        var mac          = fds_relay.down('[itemId=txf_mac]');

        return function(){

            obj.fds_headset  = fds_headset;
            obj.fds_hub      = fds_hub;
            obj.fds_relay    = fds_relay;

            obj.headset_valid = headset_valid;
            obj.hubnet_valid = hubnet_valid;
            obj.relay_valid  = relay_valid;

            obj.timeout      = timeout;
            obj.selectObject = selectObject;
            obj.object_grid  = object_grid;

            obj.eth          = eth;
            obj.mac          = mac;

            return obj;

        }();
    },

    setPolicyData: function(component, policyKey, policyData) {
        var objectTmp = Ext.getStore('st_vpn_headoffice');

        if(!this.validityCheck().vpnPolicyCheck(policyData['@cid'])){

            return;

        }

        objectTmp.add({

            'name' : policyData.name,
            '@cid' : policyData['@cid']

        });
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.09
        //
        // 설명 : IPSEC 본점 유효성 검사를 수행합니다.
        //
        // - IP주소 blank 검사
        //
        // ==============================================================================================================================================================================

        var objectTmp = Ext.getStore('st_vpn_headoffice');

        var component = this.componentStorage();

        var validCheckObj = {

            vpnblankCheck : function(){

                if(component.timeout.getValue() === null && component.fds_headset.checkboxCmp.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.mac.getValue() === '' && component.fds_relay.checkboxCmp.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            vpnPolicyCheck : function(cid){

                for(var i = 0; i < objectTmp.count(); i ++){

                    if(cid === objectTmp.getAt(i).get('@cid')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '이미 등록된 오브젝트 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            vpnValidateCheck : function(){

                if(!component.timeout.validate() && component.fds_headset.checkboxCmp.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'VPN 타임아웃의 범위는 1 ~ 255 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.mac.validate() && component.fds_relay.checkboxCmp.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MAC 주소의 형식에 맞지 않습니다.',
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
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.06.11
        //
        // 설명 : IPSec 본점 데이터를 저장합니다. 사용되는 파라미터는 head_office, hub_and_spoke 입니다.
        //
        // ============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var hubStore = Ext.getStore('st_vpn_headoffice');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // Head Office 데이터 저장 ======================================================================================================================================================

        if(!this.validityCheck().vpnblankCheck() || !this.validityCheck().vpnValidateCheck()){

            return false;

        }

        if(componentObj.fds_headset.checkboxCmp.getValue() === true){

            deviceAllData.vpn_script.head_office['@chk_use'] = 'on';

            deviceAllData.vpn_script.head_office['#text'] = componentObj.timeout.getValue();

        }
        else{

            if(deviceAllData.vpn_script.head_office['#text']){

                delete deviceAllData.vpn_script.head_office['#text'];

            }

            deviceAllData.vpn_script.head_office['@chk_use'] = 'off';

        }

        // 객체 저장 ====================================================================================================================================================================
        //
        // 설명 : 객체를 저장하기 위해서는 저장된 @cid를 getObject를 이용하여 name을 그리드에 추가한다.
        //
        // =============================================================================================================================================================================

        var dataObj;
        var hubCount = hubStore.count();

        deviceAllData.vpn_script.hub_and_spoke['@chk_use'] = (componentObj.fds_hub.checkboxCmp.getValue() === true) ? 'on' : 'off';

        if(hubCount === 0){

            if(deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member){

                delete deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member;

            }

            deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network['@count'] = 0;

        }
        else if(hubCount === 1){

            deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network['@count'] = 1;

            if(deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member){

                var tmpObj = {};

                tmpObj['@cid'] = hubStore.getAt(0).get('@cid');

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = tmpObj;

            }
            else{

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = {};

                var tmpObj = {};

                tmpObj['@cid'] = hubStore.getAt(0).get('@cid');

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = tmpObj;

            }

        }
        else{

            deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network['@count'] = hubCount;

            if(deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member){

                var hubArray = [];

                for(var i = 0; i < hubCount; i++){

                    var hubObj = {};

                    hubObj['@cid'] = hubStore.getAt(i).get('@cid');

                    hubArray.push(hubObj);

                }

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = hubArray;

            }
            else{

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = [];

                var hubArray = [];

                for(var i = 0; i < hubCount; i++){

                    var hubObj = {};

                    hubObj['@cid'] = hubStore.getAt(i).get('@cid');

                    hubArray.push(hubObj);

                }

                deviceAllData.vpn_script.hub_and_spoke.hub_and_spoke_network.member = hubArray;

            }

        }

        // 패킷 릴레이 저장 ============================================================================================================================================================

        if(componentObj.fds_relay.checkboxCmp.getValue()){

            deviceAllData.vpn_script.hub_and_spoke.packet_relay['@chk_use']  = 'on';
            deviceAllData.vpn_script.hub_and_spoke.packet_relay['interface'] = (componentObj.eth.getValue() === '') ? null : componentObj.eth.getValue();
            deviceAllData.vpn_script.hub_and_spoke.packet_relay.mac          = (componentObj.mac.getValue() === '') ? null : componentObj.mac.getValue();

        }
        else{

            deviceAllData.vpn_script.hub_and_spoke.packet_relay['@chk_use']  = 'off';
            deviceAllData.vpn_script.hub_and_spoke.packet_relay['interface'] = null;
            deviceAllData.vpn_script.hub_and_spoke.packet_relay.mac          = null;

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();

        var hubStore = Ext.getStore('st_vpn_headoffice');

        hubStore.removeAll();

        component.object_grid.bindStore(hubStore);
    }

});
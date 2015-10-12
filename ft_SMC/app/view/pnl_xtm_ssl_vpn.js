
Ext.define('SMC.view.pnl_xtm_ssl_vpn', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_ssl_vpn',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    height: 680,
    id: 'pnl_xtm_ssl_vpn',
    width: 800,
    bodyPadding: 10,
    title: 'SSL VPN 설정',

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
                    itemId: 'ctn_ssl_useservice',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            itemId: 'ck_usevpn',
                            margin: '0, 150, 0, 0',
                            fieldLabel: '',
                            boxLabel: 'SSL VPN 서비스 사용',
                            listeners: {
                                change: {
                                    fn: me.onCk_usevpnChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    itemId: 'fds_ssl_connect',
                    padding: 10,
                    title: '접속 환경설정',
                    items: [
                        {
                            xtype: 'radiogroup',
                            itemId: 'rdg_protocol',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '터널 프로토콜',
                            layout: {
                                type: 'checkboxgroup',
                                autoFlex: false
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_tcp',
                                    margin: '0, 50, 0, 0',
                                    name: 'protocol',
                                    boxLabel: 'TCP',
                                    checked: true,
                                    inputValue: 'TCP'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_udp',
                                    name: 'protocol',
                                    boxLabel: 'UDP',
                                    inputValue: 'UDP'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ssl_port',
                            margin: '0, 0, 50, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 65535);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_port',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '터널 포트'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'lab_text',
                                    text: '※ TCP 포트 80 및 443 사용 불가'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ssl_group',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
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
                                    itemId: 'txf_ip',
                                    width: 250,
                                    fieldLabel: 'Client IP Group'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 10, 0, 10',
                                    text: ' /'
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
                                    itemId: 'txf_netmask',
                                    margin: '0, 10, 0, 0',
                                    width: 150,
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'label',
                                    text: '※ 네트워크 주소 / 넷마스크'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_ssl_usergroup',
                    title: 'SSL VPN 사용자 그룹 선택',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_ssl_addpolicy',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_addpolicy',
                                    width: 100,
                                    text: '정책 추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_initClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_ssl_usrgroup',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_ssl_usrgroups',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '#text',
                                    text: '선택된 사용자 그룹 목록',
                                    flex: 0.8
                                },
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    dataIndex: 'bool',
                                    flex: 0.2,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                // handler ====================================================================================================================================================================
                                                //
                                                // 일시 : 2014.08.12
                                                //
                                                // 설명 : SSL 사용자 그룹 row 를 삭제합니다.
                                                //
                                                // ============================================================================================================================================================================

                                                var store = Ext.getStore('st_ssl_usrgroups');

                                                store.removeAt(rowIndex);
                                            },
                                            iconCls: 'ico_grid_row_delete'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_ssl_vpnAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_ssl_vpnBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCk_usevpnChange: function(field, newValue, oldValue, eOpts) {
        // onCk_usevpnChange ==========================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSL VPN 사용 체크박스에 따른 컴포넌트 활성화를 설정합니다.
        //
        // ============================================================================================================================================================================

        var component = this.componentStorage();

        if(newValue){

            component.fds_ssl.setDisabled(false);


        }
        else{

            component.fds_ssl.setDisabled(true);


        }
    },

    onBt_initClick: function(button, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_usr_group',
            'policyKey'     : '',
            'thisObj'       : this

        }).show();
    },

    onPnl_xtm_ssl_vpnAfterRender: function(component, eOpts) {
        // onPnl_xtm_ssl_vpnAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSL VPN 데이터를 컴포넌트에 설정합니다. 사용자 그룹 객체를 조회시 필요한 이벤트를 설정합니다.
        //
        // ==============================================================================================================================================================================

        // 이벤트 지정 ====================================================================================================================================================================

        this.on('setPolicy', this.setPolicyData);

        var sslStore = Ext.getStore('st_ssl_usrgroups');

        this.initStore();

        var componentObj = this.componentStorage();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.vpn;

                if(deviceData){

        // SSL VPN 사용, 프로토콜, 포트, IP, 넷마스크 데이터 초기화 ============================================================================================================================

                    try{

                        componentObj.usevpn.setValue((deviceData['@chk_use'] === "on") ? true : false);
                        componentObj.protocol.setValue({	'protocol' : deviceData.setting['@protocol']	});
                        componentObj.port.setValue(deviceData.port);
                        componentObj.ip.setValue(deviceData.ip);
                        componentObj.netmask.setValue(deviceData.netmask);

        // SSL 사용자 그룹 초기화 ==========================================================================================================================================================


                        if(deviceData.usr_groups)
                            sslStore.add(deviceData.usr_groups);

                    }
                    catch(err){

                        console.log('SSL VPN 데이터 초기화 중 catch 발생 : ', err);

                    }

                }

            }

        }
        catch(err){

            console.log('SSL VPN 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_ssl_vpnBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_ssl_vpnBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : 화면이 close 이벤트가 발생하면 다른 화면으로 넘어가기전 유효성 검사를 실시합니다.
        //
        // ===========================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj       = {};

        var ctn_use   = this.down('[itemId=ctn_ssl_useservice]');

        var usevpn    = ctn_use.down('[itemId=ck_usevpn]');
        var usergroup = ctn_use.down('[itemId=txf_usergroup]');

        var fds_ssl   = this.down('[itemId=fds_ssl_connect]');

        var protocol  = fds_ssl.down('[itemId=rdg_protocol]');
        var port      = fds_ssl.down('[itemId=nfd_port]');
        var text      = fds_ssl.down('[itemId=lab_text]');
        var ip        = fds_ssl.down('[itemId=txf_ip]');
        var netmask   = fds_ssl.down('[itemId=txf_netmask]');

        return function(){

            obj.ctn_use   = ctn_use;
            obj.usevpn    = usevpn;
            obj.usergroup = usergroup;
            obj.fds_ssl   = fds_ssl;
            obj.protocol  = protocol;
            obj.port      = port;
            obj.text      = text;
            obj.ip        = ip;
            obj.netmask   = netmask;

            return obj;

        }();
    },

    setPolicyData: function(component, policyKey, policyData) {
        // setPolicyData ==============================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : 오브젝트 선택 시 선택된 객체를 SSL 객체에 저장합니다.
        //
        // ============================================================================================================================================================================

        var sslStore = Ext.getStore('st_ssl_usrgroups');

        var policyArray = [];

        if(!this.validityCheck().sslUserGroupCheck(policyData['@cid'])){

            return;

        }

        sslStore.add({

            '#text' : policyData.name,
            '@cid' : policyData['@cid']

        });
    },

    validityCheck: function() {
        // validityCheck ==============================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : VLAN 필터링의 유효성을 검사합니다.
        //
        // ============================================================================================================================================================================

        var sslStore = Ext.getStore('st_ssl_usrgroups');

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(component.usevpn.getValue() && component.port.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SSL 터널 포트는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            portCheck : function(){

                if(component.usevpn.getValue() && !component.port.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SSL 터널 포트의 범위는 1 ~ 65535 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usevpn.getValue() && component.port.getValue() === 80 || component.port.getValue() === 443){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '80번, 443번 포트는 사용할 수 없습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            sslIpCheck : function(){

                if(component.usevpn.getValue() && component.ip.getValue() !== '' && !component.ip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IPv4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            sslNetmaskCheck : function(){

                if(component.usevpn.getValue() && component.netmask.getValue() !== '' && !component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            sslUserGroupCheck : function(cid){

                for(var i = 0; i < sslStore.count(); i ++){

                    if(cid === sslStore.getAt(i).get('@cid')){

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

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSL VPN 서비스 데이터를 저장합니다.
        //
        // ============================================================================================================================================================================

        var component = this.componentStorage();

        var sslStore = Ext.getStore('st_ssl_usrgroups');

        // 저장시 유효성 검사 ============================================================================================================================================================

        if(!this.validityCheck().blankCheck() || !this.validityCheck().portCheck() || !this.validityCheck().sslIpCheck() || !this.validityCheck().sslNetmaskCheck()){

            return false;

        }

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // SSL VPN 사용, 프로토콜, 포트, IP, 넷마스크 데이터 저장 ============================================================================================================================

        if(component.usevpn.getValue()){

            deviceAllData.ssl_setting.vpn['@chk_use'] = (component.usevpn.getValue() === true) ? 'on' : 'off';
            deviceAllData.ssl_setting.vpn.setting['@protocol'] = component.protocol.getValue().protocol;
            deviceAllData.ssl_setting.vpn.port = component.port.getValue();
            deviceAllData.ssl_setting.vpn.ip = component.ip.getValue();
            deviceAllData.ssl_setting.vpn.netmask = component.netmask.getValue();

        }
        else{

        // SSL VPN 사용하지 않는다면 ======================================================================================================================================================

            if(deviceAllData.ssl_setting.vpn.setting['@protocol']){

                delete deviceAllData.ssl_setting.vpn.setting['@protocol'];

            }

            if(deviceAllData.ssl_setting.vpn.ip){

                delete deviceAllData.ssl_setting.vpn.ip;

            }

            if(deviceAllData.ssl_setting.vpn.netmask){

                delete deviceAllData.ssl_setting.vpn.netmask;

            }

        }

        // SSL 사용자 그룹 저장 ==========================================================================================================================================================

        var sslArray = [];

        if(sslStore.count() > 0){

            for(var i = 0; i < sslStore.count(); i++){

                sslArray.push(	{	'#text' : sslStore.getAt(i).get('#text'), '@cid' : sslStore.getAt(i).get('@cid')	}	);

            }

            deviceAllData.ssl_setting.vpn.usr_groups = sslArray;

        }
        else{

            if(deviceAllData.ssl_setting.vpn.usr_groups){

                delete deviceAllData.ssl_setting.vpn.usr_groups;

            }

        }

        return true;
    },

    initStore: function() {
        var sslStore = Ext.getStore('st_ssl_usrgroups');

        sslStore.removeAll();
    }

});
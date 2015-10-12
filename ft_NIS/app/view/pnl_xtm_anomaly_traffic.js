
Ext.define('SMC.view.pnl_xtm_anomaly_traffic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_anomaly_traffic',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label'
    ],

    height: 680,
    id: 'pnl_xtm_anomaly_traffic',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: 'Traffic Anomaly',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_traffic_dos',
                    checkboxToggle: true,
                    title: 'Traffic Anomaly 검사 (DOS)',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_dos1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_action',
                                    margin: '0, 10, 0, 0',
                                    width: 230,
                                    fieldLabel: '액션',
                                    value: 'alert',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_anomaly_action',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_actionChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 4294967295);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    disabled: true,
                                    itemId: 'nfd_blocktime',
                                    width: 230,
                                    fieldLabel: '차단 시간'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_dos2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 4294967295);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_synpps',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 230,
                                    width: 230,
                                    fieldLabel: 'SYN PPS'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 4294967295);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_udppps',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 230,
                                    width: 230,
                                    fieldLabel: 'UDP PPS'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 4294967295);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_icmppps',
                                    maxWidth: 230,
                                    width: 230,
                                    fieldLabel: 'ICMP PPS'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_dos3',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 65535);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_limit',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 280,
                                    width: 280,
                                    fieldLabel: 'Ping Packet Size Limit',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '( 1 ~ 65535, 0 : No Limit )'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_traffic_ddos',
                    checkboxToggle: true,
                    title: 'Traffic Anomaly 검사 (DDOS)',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_ddos1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_action',
                                    margin: '0, 10, 0, 0',
                                    width: 230,
                                    fieldLabel: '액션',
                                    value: 'alert',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_anomaly_action',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_actionChange1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 4294967295);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    disabled: true,
                                    itemId: 'nfd_blocktime',
                                    width: 230,
                                    fieldLabel: '차단 시간'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_ddos2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_traffic_syn',
                                    margin: '0, 10, 0, 0',
                                    title: 'SYN',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 4294967295);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '100%',
                                            itemId: 'nfd_dispersion',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '분산도'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            itemId: 'cmb_sensitive',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '민감도',
                                            value: 'high',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: [
                                                'high',
                                                'middle',
                                                'low'
                                            ],
                                            valueField: 'value'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_traffic_udp',
                                    margin: '0, 10, 0, 0',
                                    title: 'UDP',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 4294967295);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '100%',
                                            itemId: 'nfd_dispersion',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '분산도'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            itemId: 'cmb_sensitive',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '민감도',
                                            value: 'high',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: [
                                                'high',
                                                'middle',
                                                'low'
                                            ],
                                            valueField: 'value'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_traffic_icmp',
                                    margin: '0, 0, 0, 0',
                                    title: 'ICMP',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 4294967295);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '100%',
                                            itemId: 'nfd_dispersion',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '분산도'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '100%',
                                            itemId: 'cmb_sensitive',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '민감도',
                                            value: 'high',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: [
                                                'high',
                                                'middle',
                                                'low'
                                            ],
                                            valueField: 'value'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_traffic_desc',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '0, 0, 10, 0',
                                    text: '탐지 민감도 설명'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 0, 10, 0',
                                    text: '※ high : 비정상 트래픽을 최대 보안 수준으로 조사'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 0, 10, 0',
                                    text: '※ middle : 비정상 트래픽을 일반 보안 수준으로 조사 (moderate performance)'
                                },
                                {
                                    xtype: 'label',
                                    text: '※ low : 비정상 트래픽을 최소 보안 수준으로 조사 (high performance)'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_anomaly_trafficAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_anomaly_trafficBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_actionChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_actionChange ============================================================================================================================================================
        //
        // 일시 : 2014.10.1
        //
        // 설명 : drop 선택시 차단 시간 컴포넌트의 disable이 해제됩니다.
        //
        // ===============================================================================================================================================================================

        var nfd_blocktime = field.up().down('[itemId=nfd_blocktime]');

        if(newValue === 'alert'){

            nfd_blocktime.setDisabled(true);

        }
        else{

            nfd_blocktime.setDisabled(false);

        }
    },

    onCmb_actionChange1: function(field, newValue, oldValue, eOpts) {
        // onCmb_actionChange ============================================================================================================================================================
        //
        // 일시 : 2014.10.1
        //
        // 설명 : drop 선택시 차단 시간 컴포넌트의 disable이 해제됩니다.
        //
        // ===============================================================================================================================================================================

        var nfd_blocktime = field.up().down('[itemId=nfd_blocktime]');

        if(newValue === 'alert'){

            nfd_blocktime.setDisabled(true);

        }
        else{

            nfd_blocktime.setDisabled(false);

        }
    },

    onPnl_xtm_anomaly_trafficAfterRender: function(component, eOpts) {
        // onPnl_xtm_anomaly_trafficAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : 비정상 트래픽 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var deviceData = component.deviceParams;

        var componentObj = this.componentStorage();

        // 필드셋 체크박스 false 설정 ======================================================================================================================================================

        componentObj.fds_dos.checkboxCmp.setValue(false);
        componentObj.fds_ddos.checkboxCmp.setValue(false);

        // DOS 데이터 초기화 ==============================================================================================================================================================

        componentObj.fds_dos.checkboxCmp.setValue((deviceData.dos['@chk_use'] === 'on') ? true : false);

        componentObj.dos_action.setValue(deviceData.dos.action);
        componentObj.dos_time.setValue(deviceData.dos.block_time);
        componentObj.dos_synpps.setValue(deviceData.dos.syn);
        componentObj.dos_udppps.setValue(deviceData.dos.udp);
        componentObj.dos_icmppps.setValue(deviceData.dos.icmp);
        componentObj.dos_limit.setValue(deviceData.dos.ping_limit);

        // DDOS 데이터 초기화 =============================================================================================================================================================

        componentObj.fds_ddos.checkboxCmp.setValue((deviceData.ddos['@chk_use'] === 'on') ? true : false);

        componentObj.ddos_action.setValue(deviceData.ddos.action);
        componentObj.ddos_time.setValue(deviceData.ddos.block_time);

        componentObj.ddos_syn_dispersion.setValue((typeof deviceData.ddos.syn['#text'] === undefined) ? 1000 : deviceData.ddos.syn['#text']);
        componentObj.ddos_syn_sensitive.setValue((deviceData.ddos.syn['@level'] === '') ? 'high' : deviceData.ddos.syn['@level']);

        componentObj.ddos_udp_dispersion.setValue((typeof deviceData.ddos.udp['#text'] === undefined) ? 1000 : deviceData.ddos.udp['#text']);
        componentObj.ddos_udp_sensitive.setValue((deviceData.ddos.udp['@level'] === '') ? 'high' : deviceData.ddos.udp['@level']);

        componentObj.ddos_icmp_dispersion.setValue((typeof deviceData.ddos.icmp['#text'] === undefined) ? 1000 : deviceData.ddos.icmp['#text']);
        componentObj.ddos_icmp_sensitive.setValue((deviceData.ddos.icmp['@level'] === '') ? 'high' : deviceData.ddos.icmp['@level']);
    },

    onPnl_xtm_anomaly_trafficBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_anomaly_trafficBeforeClose ==========================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : 화면이 이동하거나 파괴될 때의 작업을 수행합니다.
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

        var fds_dos  = this.down('[itemId=fds_traffic_dos]');
        var fds_ddos = this.down('[itemId=fds_traffic_ddos]');

        // DOS TRAFFIC 컴포넌트 ============================================================================================================================================================

        obj.fds_dos  = fds_dos;
        obj.fds_ddos = fds_ddos;

        obj.dos_action = fds_dos.down('[itemId=ctn_traffic_dos1]').down('[itemId=cmb_action]');
        obj.dos_time   = fds_dos.down('[itemId=ctn_traffic_dos1]').down('[itemId=nfd_blocktime]');

        obj.dos_synpps = fds_dos.down('[itemId=ctn_traffic_dos2]').down('[itemId=nfd_synpps]');
        obj.dos_udppps = fds_dos.down('[itemId=ctn_traffic_dos2]').down('[itemId=nfd_udppps]');
        obj.dos_icmppps = fds_dos.down('[itemId=ctn_traffic_dos2]').down('[itemId=nfd_icmppps]');

        obj.dos_limit  = fds_dos.down('[itemId=ctn_traffic_dos3]').down('[itemId=nfd_limit]');

        // DDOS TRAFFIC 컴포넌트 ===========================================================================================================================================================

        obj.ddos_action = fds_ddos.down('[itemId=ctn_traffic_ddos1]').down('[itemId=cmb_action]');
        obj.ddos_time   = fds_ddos.down('[itemId=ctn_traffic_ddos1]').down('[itemId=nfd_blocktime]');

        obj.ddos_syn_dispersion = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_syn]').down('[itemId=nfd_dispersion]');
        obj.ddos_syn_sensitive  = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_syn]').down('[itemId=cmb_sensitive]');

        obj.ddos_udp_dispersion = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_udp]').down('[itemId=nfd_dispersion]');
        obj.ddos_udp_sensitive  = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_udp]').down('[itemId=cmb_sensitive]');

        obj.ddos_icmp_dispersion = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_icmp]').down('[itemId=nfd_dispersion]');
        obj.ddos_icmp_sensitive  = fds_ddos.down('[itemId=ctn_traffic_ddos2]').down('[itemId=fds_traffic_icmp]').down('[itemId=cmb_sensitive]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck =================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 내부 데이터를 유효성 검사를 실시합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            trafficBlankCheck : function(){

        // DOS Blank 체크 ================================================================================================================================================================

                if(component.fds_dos.checkboxCmp.getValue()){

                    if(component.dos_action.getValue() === 'drop' && component.dos_time.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dos_synpps.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dos_udppps.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dos_icmppps.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dos_limit.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

        // DDOS Blank 체크 ===============================================================================================================================================================

                if(component.fds_ddos.checkboxCmp.getValue()){

                    if(component.ddos_action.getValue() === 'drop' && component.ddos_time.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ddos_syn_dispersion.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ddos_udp_dispersion.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ddos_icmp_dispersion.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '필수 입력 항목입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            dosValidCheck : function(){

                if(component.fds_dos.checkboxCmp.getValue()){

                    if(component.dos_action.getValue() === 'drop' && !component.dos_time.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.dos_synpps.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.dos_udppps.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.dos_icmppps.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.dos_limit.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 65535 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            ddosValidCheck : function(){

                if(component.fds_ddos.checkboxCmp.getValue()){

                    if(component.ddos_action.getValue() === 'drop' && !component.dos_limit.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.ddos_syn_dispersion.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.ddos_udp_dispersion.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.ddos_icmp_dispersion.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '0 ~ 4294967295 사이의 정수만 입력이 가능합니다.',
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
        // saveData ==================================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : 비정상 트래픽 설정 정보에 대해 저장합니다.
        //
        // ===========================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component     = this.componentStorage();

        // DOS TRAFFIC 저장 ===========================================================================================================================================================

        if(!this.validityCheck().trafficBlankCheck() || !this.validityCheck().dosValidCheck() || !this.validityCheck().ddosValidCheck()){

            return;

        }

        if(component.fds_dos.checkboxCmp.getValue()){

            deviceAllData.network_anomaly.dos['@chk_use'] = 'on';

            deviceAllData.network_anomaly.dos.action      = component.dos_action.getValue();
            deviceAllData.network_anomaly.dos.block_time  = component.dos_time.getValue();
            deviceAllData.network_anomaly.dos.syn         = component.dos_synpps.getValue();
            deviceAllData.network_anomaly.dos.udp         = component.dos_udppps.getValue();
            deviceAllData.network_anomaly.dos.icmp        = component.dos_icmppps.getValue();
            deviceAllData.network_anomaly.dos.ping_limit  = component.dos_limit.getValue();

        }
        else{

            deviceAllData.network_anomaly.dos['@chk_use'] = 'off';

            deviceAllData.network_anomaly.dos.action      = 'alert';
            deviceAllData.network_anomaly.dos.block_time  = null;
            deviceAllData.network_anomaly.dos.syn         = null;
            deviceAllData.network_anomaly.dos.udp         = null;
            deviceAllData.network_anomaly.dos.icmp        = null;
            deviceAllData.network_anomaly.dos.ping_limit  = null;

        }

        // DDOS TRAFFIC 저장 ==========================================================================================================================================================

        if(component.fds_ddos.checkboxCmp.getValue()){

            deviceAllData.network_anomaly.ddos['@chk_use'] = 'on';

            deviceAllData.network_anomaly.ddos.action      = component.ddos_action.getValue();
            deviceAllData.network_anomaly.ddos.block_time  = component.ddos_time.getValue();

            deviceAllData.network_anomaly.ddos.syn['#text']  = component.ddos_syn_dispersion.getValue();
            deviceAllData.network_anomaly.ddos.syn['@level'] = component.ddos_syn_sensitive.getValue();

            deviceAllData.network_anomaly.ddos.udp['#text']  = component.ddos_udp_dispersion.getValue();
            deviceAllData.network_anomaly.ddos.udp['@level'] = component.ddos_udp_sensitive.getValue();

            deviceAllData.network_anomaly.ddos.icmp['#text'] = component.ddos_icmp_dispersion.getValue();
            deviceAllData.network_anomaly.ddos.icmp['@level'] = component.ddos_icmp_sensitive.getValue();

        }
        else{

            deviceAllData.network_anomaly.ddos['@chk_use'] = 'off';

            deviceAllData.network_anomaly.ddos.action      = 'alert';
            deviceAllData.network_anomaly.ddos.block_time  = null;

            if(deviceAllData.network_anomaly.ddos.syn['#text']){

                delete deviceAllData.network_anomaly.ddos.syn['#text'];

            }

            deviceAllData.network_anomaly.ddos.syn['@level'] = '';

            if(deviceAllData.network_anomaly.ddos.udp['#text']){

                delete deviceAllData.network_anomaly.ddos.udp['#text'];

            }

            deviceAllData.network_anomaly.ddos.udp['@level'] = component.ddos_udp_sensitive.getValue();

            if(deviceAllData.network_anomaly.ddos.icmp['#text']){

                delete deviceAllData.network_anomaly.ddos.icmp['#text'];

            }

            deviceAllData.network_anomaly.ddos.icmp['@level'] = component.ddos_icmp_sensitive.getValue();

        }

        return true;
    }

});
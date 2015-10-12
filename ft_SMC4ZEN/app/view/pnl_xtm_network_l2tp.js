
Ext.define('SMC4ZEN.view.pnl_xtm_network_l2tp', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_l2tpViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio'
    ],

    viewModel: {
        type: 'pnl_xtm_network_l2tp'
    },
    height: 680,
    id: 'pnl_xtm_network_l2tp',
    overflowY: 'auto',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: 'L2TP',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_l2tp_cont',
            title: 'L2TP 설정',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_usel2tp',
                    margin: '0, 0, 10, 0',
                    fieldLabel: '',
                    boxLabel: 'L2TP 서비스 사용'
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_l2tp_client',
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
                            itemId: 'txf_virtualaddr',
                            margin: '0, 10, 0, 0',
                            width: 300,
                            fieldLabel: '클라이언트 가상 주소',
                            labelWidth: 130
                        },
                        {
                            xtype: 'label',
                            margin: '0, 10, 0, 0',
                            text: '/'
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
                            width: 170,
                            fieldLabel: '',
                            labelWidth: 130
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    itemId: 'txf_passwd',
                    margin: '0, 0, 10, 0',
                    maxWidth: 300,
                    width: 300,
                    fieldLabel: 'L2TP 비밀키',
                    labelWidth: 130
                },
                {
                    xtype: 'radiogroup',
                    itemId: 'rdg_authtype',
                    margin: '0, 0, 10, 0',
                    fieldLabel: '인증 방식',
                    labelWidth: 130,
                    layout: {
                        type: 'checkboxgroup',
                        autoFlex: false
                    },
                    items: [
                        {
                            xtype: 'radiofield',
                            itemId: 'rd_local',
                            margin: '0, 20, 0, 0',
                            name: 'type',
                            boxLabel: '로컬 인증',
                            checked: true,
                            inputValue: 'local'
                        },
                        {
                            xtype: 'radiofield',
                            itemId: 'rd_remote',
                            name: 'type',
                            boxLabel: '외부 인증',
                            inputValue: 'remote'
                        }
                    ]
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
                    itemId: 'txf_dns1',
                    margin: '0, 0, 10, 0',
                    maxWidth: 300,
                    width: 300,
                    fieldLabel: '1st DNS',
                    labelWidth: 130
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
                    itemId: 'txf_dns2',
                    maxWidth: 300,
                    width: 300,
                    fieldLabel: '2nd DNS',
                    labelWidth: 130
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_network_l2tpAfterRender',
        beforeclose: 'onPnl_xtm_network_l2tpBeforeClose'
    },

    onPnl_xtm_network_l2tpAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_l2tpAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : L2TP 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams;

                if(deviceData.l2tp){

                    componentObj.usel2tp.setValue((deviceData.l2tp['@chk_use'] === "on") ? true : false);
                    componentObj.virtualaddr.setValue(deviceData.l2tp.client_ip);
                    componentObj.netmask.setValue(deviceData.l2tp.client_netmask);
                    componentObj.passwd.setValue(deviceData.l2tp.secret);
                    componentObj.authtype.setValue({	'type' : deviceData.l2tp.auth	});
                    componentObj.dns1.setValue(deviceData.l2tp.dns1);
                    componentObj.dns2.setValue(deviceData.l2tp.dns2);

                }

            }

        }
        catch(err){

            console.log('L2TP 데이터를 초기화 하는 도중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_l2tpBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_l2tpBeforeClose ============================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : 화면이 close 되면 데이터를 save 합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj         = {};

        var fpn_valid   = this.down('[itemId=fds_l2tp_cont]');

        obj.usel2tp     = fpn_valid.down('[itemId=ck_usel2tp]');
        obj.virtualaddr = fpn_valid.down('[itemId=txf_virtualaddr]');
        obj.netmask     = fpn_valid.down('[itemId=txf_netmask]');
        obj.passwd      = fpn_valid.down('[itemId=txf_passwd]');
        obj.authtype    = fpn_valid.down('[itemId=rdg_authtype]');
        obj.dns1        = fpn_valid.down('[itemId=txf_dns1]');
        obj.dns2        = fpn_valid.down('[itemId=txf_dns2]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : L2TP의 데이터를 추가, 설정시에 유효성 검사를 수행합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            ipTypeCheck : function(){

                if(!component.virtualaddr.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IPv4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.dns1.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'DNS 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.dns2.validate()){


                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'DNS 형식에 맞지 않습니다.',
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
        // 일시 : 2014.08.13
        //
        // 설명 : L2TP 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(!this.validityCheck().ipTypeCheck()){

            return false;

        }

        deviceAllData.l2tp_config.l2tp['@chk_use'] = (component.usel2tp.getValue() === true) ? 'on' : 'off';
        deviceAllData.l2tp_config.l2tp.client_ip = component.virtualaddr.getValue();
        deviceAllData.l2tp_config.l2tp.client_netmask = component.netmask.getValue();
        deviceAllData.l2tp_config.l2tp.auth = component.authtype.getValue().type;
        deviceAllData.l2tp_config.l2tp.dns1 = component.dns1.getValue();
        deviceAllData.l2tp_config.l2tp.dns2 = component.dns2.getValue();
        deviceAllData.l2tp_config.l2tp.secret = component.passwd.getValue();

        return true;
    }

});
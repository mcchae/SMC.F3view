
Ext.define('SMC4ZEN.view.pnl_xtm_ssl_inspection', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_ssl_inspectionViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.Label'
    ],

    viewModel: {
        type: 'xtm_ssl_inspection'
    },
    height: 680,
    id: 'pnl_xtm_ssl_inspection',
    overflowY: 'auto',
    width: 800,
    layout: 'anchor',
    bodyPadding: 10,
    title: 'SSLI 설정',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_ssli_use',
            checkboxToggle: true,
            title: 'SSL Inspection 사용',
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_ssli_port',
                    margin: '0, 0, 10, 0',
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
                            fieldLabel: 'SSL Proxy 서버 포트',
                            labelWidth: 150
                        },
                        {
                            xtype: 'label',
                            text: 'SSL Proxy에서 사용할 서버 포트를 지정합니다.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_ssli_proxy',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_auth',
                            margin: '0, 10, 0, 0',
                            width: 350,
                            fieldLabel: 'SSL Proxy 인증서',
                            labelWidth: 150
                        },
                        {
                            xtype: 'label',
                            text: 'SSL Proxy에서 사용할 인증서를 지정합니다.'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_ssl_inspectionAfterRender',
        beforeclose: 'onPnl_xtm_ssl_inspectionBeforeClose'
    },

    onPnl_xtm_ssl_inspectionAfterRender: function(component, eOpts) {
        // onPnl_xtm_ssl_inspectionAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : 오브젝트 선택 시 선택된 객체를 SSL 객체에 저장합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        componentObj.fds_usessli.checkboxCmp.setValue(false);

        // SSLI 속성이 없으면 ==============================================================================================================================================================

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.option;

                if(deviceData){

                    componentObj.fds_usessli.checkboxCmp.setValue((deviceData.chk_use === "on") ? true : false);
                    componentObj.port.setValue(deviceData.s_port);
                    componentObj.auth.setValue(deviceData.s_cert);

                }

            }

        }
        catch(err){

            console.log('SSLI 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_ssl_inspectionBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_ssl_inspectionBeforeClose ===========================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSLI 화면이 닫히기 전 데이터 유효성 검사와 데이터를 임시 저장합니다.
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

        var fds_usessli = this.down('[itemId=fds_ssli_use]');

        var port        = fds_usessli.down('[itemId=nfd_port]');
        var auth        = fds_usessli.down('[itemId=txf_auth]');

        return function(){

            obj.fds_usessli = fds_usessli;
            obj.port        = port;
            obj.auth        = auth;

            return obj;

        }();
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSLI의 유효성을 검사합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(component.port.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SSL Proxy 서버 포트는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            portCheck : function(){

                if(!component.port.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SSL Proxy 서버 포트의 범위는 1 ~ 65535 입니다.',
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
        // saveData ======================================================================================================================================================================
        //
        // 일시 : 2014.08.11
        //
        // 설명 : SSLI 데이터를 저장합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj  = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(componentObj.fds_usessli.checkboxCmp.getValue()){

            if(!deviceAllData.ssli){

                deviceAllData.ssli = {};

                deviceAllData.ssli.option = {};

            }

            if(!this.validityCheck().blankCheck() || !this.validityCheck().portCheck()){

                return false;

            }

            deviceAllData.ssli.option.chk_use = (componentObj.fds_usessli.checkboxCmp.getValue() === true) ? 'on' : 'off';
            deviceAllData.ssli.option.s_cert  = componentObj.auth.getValue();
            deviceAllData.ssli.option.s_port  = componentObj.port.getValue();

        }
        else{

            delete deviceAllData.ssli;

        }

        return true;
    }

});
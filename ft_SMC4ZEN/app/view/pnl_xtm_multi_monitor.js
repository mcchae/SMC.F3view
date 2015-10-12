
Ext.define('SMC4ZEN.view.pnl_xtm_multi_monitor', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_multi_monitorViewModel',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'pnl_xtm_multi_monitor'
    },
    height: 680,
    id: 'pnl_xtm_multi_monitor',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '모니터링 설정',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 1,
            itemId: 'fds_multi_moniterset',
            checkboxToggle: true,
            title: '모니터링 설정',
            items: [
                {
                    xtype: 'fieldset',
                    height: 150,
                    itemId: 'fds_log_monitoring',
                    margin: '10, 0, 10, 0',
                    title: '모니터링 동작 On / Off 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_log_allselect',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_select',
                                    text: '전체 선택 / 해제',
                                    listeners: {
                                        click: 'onBt_selectClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_log_top',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_session',
                                    name: 'top',
                                    boxLabel: '세선 사용량 모니터'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_host',
                                    name: 'top',
                                    boxLabel: '호스트별 TOP-10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_service',
                                    fieldLabel: '',
                                    name: 'top',
                                    boxLabel: '서비스별 TOP-10'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_log_bot',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_flow',
                                    name: 'bot',
                                    boxLabel: '플로우별 TOP-10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_policy',
                                    name: 'bot',
                                    boxLabel: '정책룰별 TOP-10'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_protocol',
                                    fieldLabel: '',
                                    name: 'bot',
                                    boxLabel: 'Protocol 사용량 모니터'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_multi_monitorAfterRender',
        beforeclose: 'onPnl_xtm_multi_monitorBeforeClose'
    },

    onBt_selectClick: function(button, e, eOpts) {
        // saveData ======================================================================================================================================================================
        //
        // 일시 : 2014.06.19
        //
        // 설명 : 로그 모니터링 설정 중 체크박스를 모두 선택 / 해제 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        if(this.chkflag){

            component.ckg_logtop.down('[itemId=ck_session]').setValue(true);
            component.ckg_logtop.down('[itemId=ck_host]').setValue(true);
            component.ckg_logtop.down('[itemId=ck_service]').setValue(true);

            component.ckg_logbot.down('[itemId=ck_flow]').setValue(true);
            component.ckg_logbot.down('[itemId=ck_policy]').setValue(true);
            component.ckg_logbot.down('[itemId=ck_protocol]').setValue(true);

            this.chkflag = false;

        }
        else{

            component.ckg_logtop.down('[itemId=ck_session]').setValue(false);
            component.ckg_logtop.down('[itemId=ck_host]').setValue(false);
            component.ckg_logtop.down('[itemId=ck_service]').setValue(false);

            component.ckg_logbot.down('[itemId=ck_flow]').setValue(false);
            component.ckg_logbot.down('[itemId=ck_policy]').setValue(false);
            component.ckg_logbot.down('[itemId=ck_protocol]').setValue(false);

            this.chkflag = true;

        }
    },

    onPnl_xtm_multi_monitorAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_monitorAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 멀티 모니터 설정의 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        this.chkflag = true;

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 이벤트 설정 ====================================================================================================================================================================

        componentObj.fds_monitor_main.checkboxCmp.setValue(false);

        componentObj.fds_monitor_main.checkboxCmp.on('change', function(cb,newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'log_moniter', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'log_moniter', false);

            }

        });

        try{

        // 모니터링 동작 on / off 설정 =====================================================================================================================================================

            if(getApplyTarget(wndInstance.apply_target, 'log_moniter')){

                componentObj.fds_monitor_main.checkboxCmp.setValue(true);

                if(wndInstance.manage_monitor.monitor){

                    componentObj.ckg_logtop.down('[itemId=ck_session]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_session'] === 'on') ? true : false);
                    componentObj.ckg_logtop.down('[itemId=ck_host]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_host'] === 'on') ? true : false);
                    componentObj.ckg_logtop.down('[itemId=ck_service]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_service'] === 'on') ? true : false);

                    componentObj.ckg_logbot.down('[itemId=ck_flow]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_flow'] === 'on') ? true : false);
                    componentObj.ckg_logbot.down('[itemId=ck_policy]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_pnum'] === 'on') ? true : false);
                    componentObj.ckg_logbot.down('[itemId=ck_protocol]').setValue((wndInstance.manage_monitor.monitor.setting['@chk_protocol'] === 'on') ? true : false);

                }

            }

        }
        catch(err){

            console.log('로그 모니터링 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_multi_monitorBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_basicBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : innerView 가 종료될 때 메인 뷰의 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_monitor_main = this.down('[itemId=fds_multi_moniterset]');

        var fds_monitoring  = fds_monitor_main.down('[itemId=fds_log_monitoring]');
        var ctn_all_select  = fds_monitoring.down('[itemId=ctn_log_allselect]');

        var allselect       = ctn_all_select.down('[itemId=bt_select]');
        var ckg_logtop      = fds_monitoring.down('[itemId=ckg_log_top]');
        var ckg_logbot      = fds_monitoring.down('[itemId=ckg_log_bot]');

        obj.fds_monitor_main = fds_monitor_main;
        obj.allselect   = allselect;
        obj.ckg_logtop  = ckg_logtop;
        obj.ckg_logbot  = ckg_logbot;

        return obj;
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 로그 모니터링 설정을 저장합니다.
        //
        // ==============================================================================================================================================================================

        var component   = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 모니터링 동작 on / off 설정 =====================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'log_moniter')){

            wndInstance.manage_monitor.monitor.setting['@chk_session']  = (component.ckg_logtop.down('[itemId=ck_session]').getValue() === true) ? 'on' : 'off';
            wndInstance.manage_monitor.monitor.setting['@chk_host']     = (component.ckg_logtop.down('[itemId=ck_host]').getValue() === true) ? 'on' : 'off';
            wndInstance.manage_monitor.monitor.setting['@chk_service']  = (component.ckg_logtop.down('[itemId=ck_service]').getValue() === true) ? 'on' : 'off';

            wndInstance.manage_monitor.monitor.setting['@chk_flow']     = (component.ckg_logbot.down('[itemId=ck_flow]').getValue() === true) ? 'on' : 'off';
            wndInstance.manage_monitor.monitor.setting['@chk_pnum']     = (component.ckg_logbot.down('[itemId=ck_policy]').getValue() === true) ? 'on' : 'off';
            wndInstance.manage_monitor.monitor.setting['@chk_protocol'] = (component.ckg_logbot.down('[itemId=ck_protocol]').getValue() === true) ? 'on' : 'off';

        }

        return true;
    }

});
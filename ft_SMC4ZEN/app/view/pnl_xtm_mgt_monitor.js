
Ext.define('SMC4ZEN.view.pnl_xtm_mgt_monitor', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_mgt_monitorViewModel',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Check',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_mgt_monitor'
    },
    height: 680,
    id: 'pnl_xtm_mgt_monitor',
    width: 800,
    bodyPadding: 10,
    title: '모니터',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            height: 150,
            itemId: 'fds_log_monitoring',
            margin: '0, 0, 10, 0',
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
        },
        {
            xtype: 'fieldset',
            flex: 1,
            itemId: 'fds_log_traffic',
            title: '트래픽 모니터링 설정 (확인할 인터페이스 선택)',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_log_trafficset',
                    margin: '10, 0, 10, 0',
                    title: '',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            align: 'center',
                            dataIndex: 'name',
                            text: '인터페이스 '
                        },
                        {
                            xtype: 'checkcolumn',
                            width: 300,
                            dataIndex: 'use',
                            text: '모니터링 설정 여부'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_mgt_monitorAfterRender',
        beforeclose: 'onPnl_xtm_mgt_monitorBeforeClose'
    },

    onBt_selectClick: function(button, e, eOpts) {
        // saveData =============================================================================================================================
        //
        // 일시 : 2014.06.19
        //
        // 설명 : 로그 모니터링 설정 중 체크박스를 모두 선택 / 해제 합니다.
        //
        // ======================================================================================================================================

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

    onPnl_xtm_mgt_monitorAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_monitorAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.06.18
        //
        // 설명 : 로그 모니터링 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var devStore     = Ext.getStore('st_common_deveth');
        var trafficStore = Ext.getStore('st_moniter_set');

        var componentObj = this.componentStorage();

        this.initStore();

        this.chkflag     = true;

        try{

            var deviceData   = this.deviceParams;

        // 모니터링 동작 on / off 설정 =====================================================================================================================================================

            if(deviceData.monitor){

                componentObj.ckg_logtop.down('[itemId=ck_session]').setValue((deviceData.monitor.setting['@chk_session'] === 'on') ? true : false);
                componentObj.ckg_logtop.down('[itemId=ck_host]').setValue((deviceData.monitor.setting['@chk_host'] === 'on') ? true : false);
                componentObj.ckg_logtop.down('[itemId=ck_service]').setValue((deviceData.monitor.setting['@chk_service'] === 'on') ? true : false);

                componentObj.ckg_logbot.down('[itemId=ck_flow]').setValue((deviceData.monitor.setting['@chk_flow'] === 'on') ? true : false);
                componentObj.ckg_logbot.down('[itemId=ck_policy]').setValue((deviceData.monitor.setting['@chk_pnum'] === 'on') ? true : false);
                componentObj.ckg_logbot.down('[itemId=ck_protocol]').setValue((deviceData.monitor.setting['@chk_protocol'] === 'on') ? true : false);

            }

        // 그리드 인터페이스 초기화 =========================================================================================================================================================

            for(var i = 0; i < devStore.count(); i++){

                var initObj  = {};

                initObj.name = devStore.getAt(i).get('eth');
                initObj.use  = false;

                trafficStore.add(initObj);

            }

        // 설정된 인터페이스 값 얻어오기 =====================================================================================================================================================

            if(deviceData.monitor.eth){

                var useEth = deviceData.monitor.eth.split(';');

        // 그리드 인터페이스 값 넣기 ========================================================================================================================================================

                for(var i = 0; i < trafficStore.count(); i++){

                    var modUse;

                    if(useEth){

                        for(var j = 0; j < useEth.length; j++){

                            if(Number(useEth[j]) === i){

                                modUse = true;

                                break;

                            }
                            else{

                                modUse = false;

                            }

                        }

                    }
                    else{

                        modUse = false;

                    }

                    trafficStore.getAt(i).set({		'use' : modUse		});

                }

            }

            trafficStore.sync();

        }
        catch(err){

            console.log('로그 모니터링 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_mgt_monitorBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_monitoring  = this.down('[itemId=fds_log_monitoring]');
        var ctn_all_select  = fds_monitoring.down('[itemId=ctn_log_allselect]');
        var fds_log_traffic = this.down('[itemId=fds_log_traffic]');

        var allselect       = ctn_all_select.down('[itemId=bt_select]');
        var ckg_logtop      = fds_monitoring.down('[itemId=ckg_log_top]');
        var ckg_logbot      = fds_monitoring.down('[itemId=ckg_log_bot]');

        var grid_traffic    = fds_log_traffic.down('[itemId=gpn_log_trafficset]');

        obj.allselect   = allselect;
        obj.ckg_logtop  = ckg_logtop;
        obj.ckg_logbot  = ckg_logbot;
        obj.grid_traffic = grid_traffic;

        return obj;
    },

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.06.18
        //
        // 설명 : 로그 모니터링 설정을 저장합니다.
        //
        // ============================================================================================================================================================================

        var trafficStore  = Ext.getStore('st_moniter_set');

        var component     = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams.manage_monitor.monitor;

        // 모니터링 동작 on / off 설정 ===================================================================================================================================================

        deviceAllData.setting['@chk_session']  = (component.ckg_logtop.down('[itemId=ck_session]').getValue() === true) ? 'on' : 'off';
        deviceAllData.setting['@chk_host']     = (component.ckg_logtop.down('[itemId=ck_host]').getValue() === true) ? 'on' : 'off';
        deviceAllData.setting['@chk_service']  = (component.ckg_logtop.down('[itemId=ck_service]').getValue() === true) ? 'on' : 'off';

        deviceAllData.setting['@chk_flow']     = (component.ckg_logbot.down('[itemId=ck_flow]').getValue() === true) ? 'on' : 'off';
        deviceAllData.setting['@chk_pnum']     = (component.ckg_logbot.down('[itemId=ck_policy]').getValue() === true) ? 'on' : 'off';
        deviceAllData.setting['@chk_protocol'] = (component.ckg_logbot.down('[itemId=ck_protocol]').getValue() === true) ? 'on' : 'off';

        // 인터페이스 저장 ===============================================================================================================================================================

        var tmpEth   = "";

        var portFlag = false;

        for(var i = 0; i < trafficStore.count(); i++){

            if(trafficStore.getAt(i).get('use')){

                portFlag = true;

                var ethStr = trafficStore.getAt(i).get('name');

                tmpEth  += ethStr.substring(3) + ';';

            }

        }

        if(portFlag){

            deviceAllData.eth = tmpEth.substring(0, tmpEth.length - 1);

        }
        else{

            deviceAllData.eth = null;

        }

        trafficStore.sync();

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_traffic = Ext.getStore('st_moniter_set');

        st_traffic.removeAll();

        component.grid_traffic.bindStore(st_traffic);
    }

});
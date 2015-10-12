
Ext.define('SMC4ZEN.view.pnl_xtm_mgt_syslog', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_mgt_syslogViewModel',
        'SMC4ZEN.view.ctn_mgr_control',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.CheckboxGroup',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    viewModel: {
        type: 'pnl_xtm_mgt_syslog'
    },
    height: 680,
    id: 'pnl_xtm_mgt_syslog',
    width: 800,
    bodyPadding: 10,
    title: '로그 전송',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_mgt_syslogAfterRender',
        beforeclose: 'onPnl_xtm_mgt_syslogBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_log_server',
                        title: 'XTM 로그 서버',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'ctn_log_server',
                                margin: '10, 0, 10, 0',
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
                                        width: 180,
                                        fieldLabel: '로그 서버 포트',
                                        value: 514
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_select',
                                        margin: '0, 10, 0, 0',
                                        width: 120,
                                        fieldLabel: '',
                                        value: 'Log Server',
                                        editable: false,
                                        displayField: 'server',
                                        store: [
                                            'Log Server',
                                            'SMC Server'
                                        ],
                                        listeners: {
                                            change: 'onCmb_selectChange'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;
                                        },
                                        itemId: 'txf_addr',
                                        margin: '0, 10, 0, 0',
                                        width: 250,
                                        fieldLabel: '로그 서버 주소',
                                        enableKeyEvents: true
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        hidden: true,
                                        itemId: 'lab_smc',
                                        text: '( 로그 서버를 SMC 서버에서 구동 필수 )'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_ipsec',
                                        fieldLabel: '',
                                        boxLabel: 'IPSec 암호화 사용'
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'ckg_tracker',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                fieldLabel: '트래커 사용',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_fw',
                                        margin: '0, 20, 0, 0',
                                        boxLabel: '방화벽'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_url',
                                        margin: '0, 20, 0, 0',
                                        boxLabel: 'URL'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_vpn',
                                        margin: '0, 20, 0, 0',
                                        fieldLabel: '',
                                        boxLabel: 'VPN'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_dpi',
                                        margin: '0, 20, 0, 0',
                                        fieldLabel: '',
                                        boxLabel: 'DPI'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_app',
                                        fieldLabel: '',
                                        boxLabel: 'APP'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        itemId: 'fds_log_standard',
                        title: 'Standard 로그 서버',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'ctn_log_server',
                                margin: '10, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        itemId: 'ck_format',
                                        margin: '0, 10, 0, 0',
                                        width: 200,
                                        fieldLabel: '표준 로그포멧',
                                        value: 'Standard',
                                        editable: false,
                                        displayField: 'format',
                                        store: [
                                            'Standard',
                                            'WELF'
                                        ]
                                    },
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
                                        width: 180,
                                        fieldLabel: '로그서버 포트',
                                        value: 514
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;
                                        },
                                        itemId: 'txf_addr',
                                        margin: '0, 10, 0, 0',
                                        width: 250,
                                        fieldLabel: '로그서버 주소',
                                        enableKeyEvents: true
                                    }
                                ]
                            },
                            {
                                xtype: 'ctn_mgr_control',
                                itemId: 'ctn_log_control',
                                margin: '5, 0, 5, 0',
                                listeners: {
                                    afterrender: 'onCtn_sendlog_controlAfterRender'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                itemId: 'gpn_log_standard',
                                margin: '10, 0, 10, 0',
                                title: '',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        width: 30,
                                        defaultWidth: 20,
                                        dataIndex: '@num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'format',
                                        text: '표준 로그 포멧',
                                        flex: 2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'port',
                                        text: '로그 서버 포트',
                                        flex: 2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ip',
                                        text: '로그 서버 주소',
                                        flex: 2
                                    }
                                ],
                                listeners: {
                                    itemclick: 'onGpn_log_standardItemClick'
                                },
                                selModel: Ext.create('Ext.selection.RowModel', {
                                    selType: 'rowmodel',
                                    mode: 'MULTI'
                                })
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onCmb_selectChange: function(field, newValue, oldValue, eOpts) {
        var xtmaddr = field.up().down('[itemId=txf_addr]');
        var xtmlab  = field.up().down('[itemId=lab_smc]');

        if(newValue === 'Log Server'){

            xtmaddr.setVisible(true);
            xtmlab.setVisible(false);

        }
        else{

            xtmaddr.setVisible(false);
            xtmlab.setVisible(true);

        }
    },

    onCtn_sendlog_controlAfterRender: function(component, eOpts) {
        var bt_add       = component.down('[itemId=bt_add]');
        var bt_mod       = component.down('[itemId=bt_mod]');
        var bt_del       = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().stdCountCheck() || !me.validityCheck().stdBlankCheck() || !me.validityCheck().stdValidCheck()){

                return;

            }

            var obj     = {};

            obj['@num'] = 0;
            obj.format  = componentObj.stdformat.getValue();
            obj.ip      = componentObj.stdaddr.getValue();
            obj.port    = componentObj.stdport.getValue();

            gridData_Add(componentObj.stdgrid, obj);

            reconfigNum(componentObj.stdgrid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.stdgrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '로그서버 수정 에러',
                    msg : '수정할 로그서버 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().stdBlankCheck() || !me.validityCheck().stdValidCheck()){

                return;

            }

            var obj     = {};

            obj['@num'] = 0;
            obj.format  = componentObj.stdformat.getValue();
            obj.ip      = componentObj.stdaddr.getValue();
            obj.port    = componentObj.stdport.getValue();

            selectionGrid_Mod(componentObj.stdgrid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.stdgrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '로그서버 삭제 에러',
                    msg : '삭제할 로그서버 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.stdgrid);

            reconfigNum(componentObj.stdgrid.getStore());

        });
    },

    onGpn_log_standardItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.stdformat.setValue(record.data.format);
        component.stdport.setValue(record.data.port);
        component.stdaddr.setValue(record.data.ip);
    },

    onPnl_xtm_mgt_syslogAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_syslogAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.06.19
        //
        // 설명 : syslog 설정 데이터를 컴포넌트에 설정합니다. 파라미터는 syslog_setting 입니다.
        //
        // ===============================================================================================================================================================================

        var standardStore = Ext.getStore('st_syslog_standardset');

        var componentObj = this.componentStorage();

        this.initStore();

        var deviceData = component.deviceParams;

        try{

            if(deviceData){

                if(deviceData.xtm){

                    componentObj.xtmport.setValue(deviceData.xtm.port);

                    componentObj.selectserver.setValue((deviceData.xtm.smc_use === 'on') ? 'SMC Server' : 'Log Server');

                    componentObj.xtmaddr.setValue(deviceData.xtm.ip);

                    componentObj.xtmipsec.setValue((deviceData.xtm['@chk_ipsec'] === 'on') ? true : false);

                    componentObj.xtmtracker.down('[itemId=ck_fw]').setValue((deviceData.xtm.tracker['@chk_fw'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_url]').setValue((deviceData.xtm.tracker['@chk_url'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_vpn]').setValue((deviceData.xtm.tracker['@chk_vpn'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_dpi]').setValue((deviceData.xtm.tracker['@chk_dpi'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_app]').setValue((deviceData.xtm.tracker['@chk_app'] === 'on') ? true : false);

                }

            }

        }
        catch(err){

            console.log('시스템 로그 데이터 초기화 중 catch 발생 : ', err);

        }

        try{

            if(deviceData.standard){

                standardStore.add(deviceData.standard);

            }

        }
        catch(err){

            console.log('시스템 로그 데이터 스탠다드 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_mgt_syslogBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj     = {};

        var fds_xtm = this.down('[itemId=fds_log_server]');
        var fds_std = this.down('[itemId=fds_log_standard]');

        var ctn_xtm = fds_xtm.down('[itemId=ctn_log_server]');
        var ctn_std = fds_std.down('[itemId=ctn_log_server]');

        var xtmport = ctn_xtm.down('[itemId=nfd_port]');
        var selectserver = ctn_xtm.down('[itemId=cmb_select]');
        var xtmaddr = ctn_xtm.down('[itemId=txf_addr]');
        var xtmlab  = ctn_xtm.down('[itemId=lab_smc]');
        var xtmipsec = ctn_xtm.down('[itemId=ck_ipsec]');
        var xtmtracker = fds_xtm.down('[itemId=ckg_tracker]');

        var stdformat = ctn_std.down('[itemId=ck_format]');
        var stdport   = ctn_std.down('[itemId=nfd_port]');
        var stdaddr   = ctn_std.down('[itemId=txf_addr]');

        var stdgrid   = fds_std.down('[itemId=gpn_log_standard]');

        obj.xtmport      = xtmport;
        obj.selectserver = selectserver;
        obj.xtmaddr      = xtmaddr;
        obj.xtmlab       = xtmlab;
        obj.xtmipsec     = xtmipsec;
        obj.xtmtracker   = xtmtracker;

        obj.stdformat    = stdformat;
        obj.stdport      = stdport;
        obj.stdaddr      = stdaddr;

        obj.stdgrid      = stdgrid;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 로그 전송의 유효성 검사를 진행합니다.
        //
        // 참고 : 로그 서버의 최대 갯수는 5개입니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            xtmBlankCheck : function(){

                if(component.xtmport.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그서버 포트는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

        //         if(component.xtmaddr.getValue() !== '' && component.selectserver.getValue() === 'Log Server'){

        //             alert(1);

        //             Ext.Msg.show({

        //                 title : 'XTM 로그 저장 에러',
        //                 msg : '로그서버 주소는 필수항목 입니다.',
        //                 buttons : Ext.Msg.OK,
        //                 icon : Ext.Msg.ERROR

        //             });

        //             return false;

        //         }

                return true;

            },
            xtmValidCheck : function(){

                if(!component.xtmport.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그서버 포트 범위는 1 ~ 65535 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR


                    });

                    return false;

                }

                if(component.xtmaddr.getValue() !== '' && !component.xtmaddr.validate() && component.selectserver.getValue() === 'Log Server'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR


                    });

                    return false;

                }

                return true;

            },
            stdBlankCheck : function(){

                if(component.stdport.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그서버 포트는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.stdaddr.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그서버 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            stdValidCheck : function(){

                if(!component.stdport.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그서버 포트 범위는 1 ~ 65535 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.stdaddr.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            stdCountCheck : function(){

                if(component.stdgrid.getStore().count() >= 5){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '로그 서버의 최대 등록 갯수는 5개 입니다.',
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
        // 일시 : 2014.06.19
        //
        // 설명 : syslog 설정 작업을 저장합니다. 파라미터의 삭제, 추가 작업이 필요하므로 window 객체를 가져와 작업합니다.
        //
        // ============================================================================================================================================================================

        var standardStore = Ext.getStore('st_syslog_standardset');

        var syslogData    = this.deviceParams;

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component     = this.componentStorage();

        if(!this.validityCheck().xtmBlankCheck() || !this.validityCheck().xtmValidCheck()){

            return false;

        }

        // XTM 저장 ===================================================================================================================================================================

        syslogData.xtm.port    = component.xtmport.getValue();
        syslogData.xtm.smc_use = (component.selectserver.getValue() === 'SMC Server') ? 'on' : null;
        syslogData.xtm.ip      = (component.selectserver.getValue() === 'SMC Server') ? null : component.xtmaddr.getValue();
        syslogData.xtm['@chk_ipsec'] = (component.xtmipsec.getValue() === true) ? 'on' : 'off';

        syslogData.xtm.tracker['@chk_fw']  = (component.xtmtracker.down('[itemId=ck_fw]').getValue() === true) ? 'on' : 'off';
        syslogData.xtm.tracker['@chk_url']  = (component.xtmtracker.down('[itemId=ck_url]').getValue() === true) ? 'on' : 'off';
        syslogData.xtm.tracker['@chk_vpn'] = (component.xtmtracker.down('[itemId=ck_vpn]').getValue() === true) ? 'on' : 'off';
        syslogData.xtm.tracker['@chk_dpi'] = (component.xtmtracker.down('[itemId=ck_dpi]').getValue() === true) ? 'on' : 'off';
        syslogData.xtm.tracker['@chk_app'] = (component.xtmtracker.down('[itemId=ck_app]').getValue() === true) ? 'on' : 'off';

        // 스탠다드 서버 저장 ============================================================================================================================================================
        //
        // 설명 : 데이터가 없으면 standard 속성을 삭제합니다.
        //
        // ============================================================================================================================================================================

        if(standardStore.count()){

        // 스탠다드 설정이 있으면 =========================================================================================================================================================

            if(standardStore.count() === 1){

                if(deviceAllData.syslog_setting.standard){

                    deviceAllData.syslog_setting.standard = {};

                }

                deviceAllData.syslog_setting.standard = standardStore.getAt(0).data;

            }
            else{

                var dataObj = [];

                if(deviceAllData.syslog_setting.standard){

                    deviceAllData.syslog_setting.standard = [];

                }

                for(var i = 0; i < standardStore.count(); i++){

                    dataObj.push(standardStore.getAt(i).data);

                }

                deviceAllData.syslog_setting.standard = dataObj;

            }

        }
        else{

            if(deviceAllData.syslog_setting.standard){

                delete deviceAllData.syslog_setting.standard;

            }

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_standard = Ext.getStore('st_syslog_standardset');

        st_standard.removeAll();

        component.stdgrid.bindStore(st_standard);
    }

});
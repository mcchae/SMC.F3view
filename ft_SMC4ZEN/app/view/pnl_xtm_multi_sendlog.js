
Ext.define('SMC4ZEN.view.pnl_xtm_multi_sendlog', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_multi_sendlogViewModel',
        'SMC4ZEN.view.ctn_multi_control',
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
        type: 'pnl_xtm_multi_sendlog'
    },
    height: 680,
    id: 'pnl_xtm_multi_sendlog',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '로그 전송',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_multi_logAfterRender',
        beforeclose: 'onPnl_xtm_multi_logBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_log_server',
                        margin: '0, 0, 10, 0',
                        checkboxToggle: true,
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
                                        editable: false,
                                        displayField: 'value',
                                        valueField: 'value',
                                        listeners: {
                                            change: 'onCmb_selectChange1',
                                            afterrender: 'onCmb_selectAfterRender'
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
                        checkboxToggle: true,
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
                                        width: 250,
                                        fieldLabel: '표준 로그포멧',
                                        editable: false,
                                        displayField: 'value',
                                        valueField: 'value',
                                        listeners: {
                                            afterrender: 'onCk_formatAfterRender'
                                        }
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
                                xtype: 'ctn_multi_control',
                                itemId: 'ctn_log_control',
                                margin: '10, 0, 10, 0',
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
                                    itemclick: 'onGpn_log_standardItemClick1',
                                    render: 'onGpn_log_standardRender'
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

    onCmb_selectChange1: function(field, newValue, oldValue, eOpts) {
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

    onCmb_selectAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_multi_server',
            'fields' : [
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'value' : 'Log Server'		},
                {	'value' : 'SMC Server'		}
            ]
        }));

        component.setValue('Log Server');
    },

    onCk_formatAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_multi_logformat',
            'fields' : [
                {	'name' : 'value'		}
            ],
            'data' : [
                {	'value' : 'Standard'	},
                {	'value' : 'WELF'		}
            ]
        }));

        component.setValue('Standard');
    },

    onCtn_sendlog_controlAfterRender: function(component, eOpts) {
        // onCtn_sendlog_controlAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.09.05
        //
        // 설명 : 로그 서버의 Standard 설정을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

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

                    title : 'WeGuardia™ SMC 2.0',
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

                    title : 'WeGuardia™ SMC 2.0',
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

    onGpn_log_standardItemClick1: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.stdformat.setValue(record.data.format);
        component.stdport.setValue(record.data.port);
        component.stdaddr.setValue(record.data.ip);
    },

    onGpn_log_standardRender: function(component, eOpts) {
        // onGpn_log_standardRender ======================================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_multiset_standard',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'format'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'port'
                }
            ]

        }));
    },

    onPnl_xtm_multi_logAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_logAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.09.04
        //
        // 설명 : 일괄 편집 로그설정 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var standardStore = Ext.getStore('st_multiset_standard');

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 필드셋 체크박스 이벤트 ===========================================================================================================================================================

        componentObj.fds_xtm.checkboxCmp.setValue(false);
        componentObj.fds_std.checkboxCmp.setValue(false);

        componentObj.fds_xtm.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'log_xtmserver', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'log_xtmserver', false);

            }

        });

        componentObj.fds_std.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'log_standard', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'log_standard', false);

            }

        });

        // 데이터 초기화 ==================================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'log_xtmserver')){

            componentObj.fds_xtm.checkboxCmp.setValue(true);

            if(wndInstance.syslog_setting){

                if(wndInstance.syslog_setting.xtm){

                    componentObj.xtmport.setValue(wndInstance.syslog_setting.xtm.port);

                    componentObj.selectserver.setValue((wndInstance.syslog_setting.xtm.smc_use === 'on') ? 'SMC Server' : 'Log Server');

                    componentObj.xtmaddr.setValue(wndInstance.syslog_setting.xtm.ip);

                    componentObj.xtmipsec.setValue((wndInstance.syslog_setting.xtm['@chk_ipsec'] === 'on') ? true : false);

                    componentObj.xtmtracker.down('[itemId=ck_fw]').setValue((wndInstance.syslog_setting.xtm.tracker['@chk_fw'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_url]').setValue((wndInstance.syslog_setting.xtm.tracker['@chk_url'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_vpn]').setValue((wndInstance.syslog_setting.xtm.tracker['@chk_vpn'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_dpi]').setValue((wndInstance.syslog_setting.xtm.tracker['@chk_dpi'] === 'on') ? true : false);
                    componentObj.xtmtracker.down('[itemId=ck_app]').setValue((wndInstance.syslog_setting.xtm.tracker['@chk_app'] === 'on') ? true : false);

                }

            }

        }

        if(getApplyTarget(wndInstance.apply_target, 'log_standard')){

            componentObj.fds_std.checkboxCmp.setValue(true);

            if(wndInstance.syslog_setting.standard){

                standardStore.add(wndInstance.syslog_setting.standard);

            }

        }
    },

    onPnl_xtm_multi_logBeforeClose: function(panel, eOpts) {
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

        var fds_xtm = this.down('[itemId=fds_log_server]');
        var fds_std = this.down('[itemId=fds_log_standard]');

        var ctn_xtm = fds_xtm.down('[itemId=ctn_log_server]');
        var ctn_std = fds_std.down('[itemId=ctn_log_server]');

        var xtmport      = ctn_xtm.down('[itemId=nfd_port]');
        var selectserver = ctn_xtm.down('[itemId=cmb_select]');
        var xtmaddr      = ctn_xtm.down('[itemId=txf_addr]');
        var xtmlab       = ctn_xtm.down('[itemId=lab_smc]');
        var xtmipsec     = ctn_xtm.down('[itemId=ck_ipsec]');
        var xtmtracker   = fds_xtm.down('[itemId=ckg_tracker]');

        var stdformat = ctn_std.down('[itemId=ck_format]');
        var stdport   = ctn_std.down('[itemId=nfd_port]');
        var stdaddr   = ctn_std.down('[itemId=txf_addr]');

        var stdgrid   = fds_std.down('[itemId=gpn_log_standard]');

        obj.fds_xtm   = fds_xtm;
        obj.fds_std   = fds_std;

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
        // validateCheck =============================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 로그 전송의 유효성 검사를 진행합니다.
        //
        // 참고 : 로그 서버의 최대 갯수는 5개입니다.
        //
        // ===========================================================================================================================================================================

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

                if(component.fds_xtm.checkboxCmp.getValue() && component.xtmaddr.getValue() !== '' && component.selectserver.getValue() === 'Log Server'){

                    if(!component.xtmaddr.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IPv4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

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
                        msg : 'IPv4 형식에 맞지 않습니다.',
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
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.06.19
        //
        // 설명 : syslog 설정 작업을 저장합니다. 파라미터의 삭제, 추가 작업이 필요하므로 window 객체를 가져와 작업합니다.
        //
        // ==============================================================================================================================================================================

        var standardStore = Ext.getStore('st_multiset_standard');

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var component   = this.componentStorage();

        if(!this.validityCheck().xtmBlankCheck() || !this.validityCheck().xtmValidCheck()){

            return false;

        }

        // XTM 저장 ======================================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'log_xtmserver')){

            wndInstance.syslog_setting.xtm.port    = component.xtmport.getValue();
            wndInstance.syslog_setting.xtm.smc_use = (component.selectserver.getValue() === 'SMC Server') ? 'on' : null;
            wndInstance.syslog_setting.xtm.ip      = (component.selectserver.getValue() === 'SMC Server') ? null : component.xtmaddr.getValue();
            wndInstance.syslog_setting.xtm['@chk_ipsec'] = (component.xtmipsec.getValue() === true) ? 'on' : 'off';

            wndInstance.syslog_setting.xtm.tracker['@chk_fw']  = (component.xtmtracker.down('[itemId=ck_fw]').getValue() === true) ? 'on' : 'off';
            wndInstance.syslog_setting.xtm.tracker['@chk_url'] = (component.xtmtracker.down('[itemId=ck_url]').getValue() === true) ? 'on' : 'off';
            wndInstance.syslog_setting.xtm.tracker['@chk_vpn'] = (component.xtmtracker.down('[itemId=ck_vpn]').getValue() === true) ? 'on' : 'off';
            wndInstance.syslog_setting.xtm.tracker['@chk_dpi'] = (component.xtmtracker.down('[itemId=ck_dpi]').getValue() === true) ? 'on' : 'off';
            wndInstance.syslog_setting.xtm.tracker['@chk_app'] = (component.xtmtracker.down('[itemId=ck_app]').getValue() === true) ? 'on' : 'off';

        }

        // 스탠다드 서버 저장 ==============================================================================================================================================================
        //
        // 설명 : 데이터가 없으면 standard 속성을 삭제합니다.
        //
        // ==============================================================================================================================================================================

        // 스탠다드 설정이 있으면 ===========================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'log_standard')){

            if(standardStore.count() <= 0){

                if(wndInstance.syslog_setting.standard){

                    delete wndInstance.syslog_setting.standard;

                }

            }
            else{

                var dataObj = [];

                if(wndInstance.syslog_setting.standard){

                    wndInstance.syslog_setting.standard = [];

                }

                for(var i = 0; i < standardStore.count(); i++){

                    dataObj.push(standardStore.getAt(i).data);

                }

                wndInstance.syslog_setting.standard = dataObj;

            }

        }

        return true;
    }

});
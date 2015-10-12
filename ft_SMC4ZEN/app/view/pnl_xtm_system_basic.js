
Ext.define('SMC4ZEN.view.pnl_xtm_system_basic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_system_basicViewModel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.form.FieldSet',
        'Ext.form.Panel'
    ],

    config: {
        sessiontotal: 0,
        memorytotal: 0
    },

    viewModel: {
        type: 'pnl_xtm_system_basic'
    },
    height: 680,
    id: 'pnl_xtm_system_basic',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '옵션',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_system_basicAfterRender',
        beforeclose: 'onPnl_xtm_system_basicBeforeClose'
    },
    items: [
        {
            xtype: 'checkboxfield',
            itemId: 'ck_stateful',
            margin: '0, 0, 10, 0',
            fieldLabel: 'Stateful inspection 사용',
            labelWidth: 150,
            boxLabel: ''
        },
        {
            xtype: 'checkboxfield',
            itemId: 'ck_multilevel',
            margin: '0, 0, 10, 0',
            fieldLabel: '멀티레벨 분리기법',
            labelWidth: 150,
            boxLabel: '정책개수와 무관한 성능 보장'
        },
        {
            xtype: 'container',
            itemId: 'ctn_basic_timeout',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'nfd_timeout',
                    margin: '0, 10, 0, 0',
                    maxWidth: 250,
                    fieldLabel: 'WebSMC 타임아웃 설정',
                    labelWidth: 150,
                    value: 600,
                    maxValue: 3600,
                    minValue: 0
                },
                {
                    xtype: 'label',
                    flex: 1,
                    text: '초 ( 0 ~ 3600, 0 : OFF )'
                }
            ]
        },
        {
            xtype: 'numberfield',
            itemId: 'nfd_connport',
            margin: '0, 0, 10, 0',
            maxWidth: 250,
            fieldLabel: 'WebSMC 접속 포트',
            labelWidth: 150,
            value: 8443
        },
        {
            xtype: 'numberfield',
            itemId: 'nfd_sshport',
            margin: '0, 0, 10, 0',
            maxWidth: 250,
            fieldLabel: 'SSH 접속 포트',
            labelWidth: 150,
            value: 22
        },
        {
            xtype: 'checkboxgroup',
            itemId: 'ckg_bypass',
            margin: '0, 0, 10, 0',
            maxWidth: 500,
            fieldLabel: 'Bypass 기능 사용',
            labelWidth: 145,
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_bp1',
                    name: 'bypass',
                    boxLabel: 'B/P1',
                    inputValue: 'on1'
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_bp2',
                    name: 'bypass',
                    boxLabel: 'B/P2',
                    inputValue: 'on2'
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_bp3',
                    fieldLabel: '',
                    name: 'bypass',
                    boxLabel: 'B/P3',
                    inputValue: 'on3'
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_bp4',
                    fieldLabel: '',
                    name: 'bypass',
                    boxLabel: 'B/P4',
                    inputValue: 'on4'
                }
            ]
        },
        {
            xtype: 'combobox',
            itemId: 'cmb_timezone',
            margin: '0, 0, 10, 0',
            fieldLabel: '표준 시간대',
            labelWidth: 150,
            editable: false,
            valueField: 'value',
            listeners: {
                afterrender: 'onCmb_timezoneAfterRender'
            }
        },
        {
            xtype: 'displayfield',
            itemId: 'dpf_serial',
            margin: '0, 0, 10, 0',
            fieldLabel: '하드웨어 시리얼',
            labelWidth: 150
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_basic_optimization',
            title: '최적화 설정',
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'fpn_basic_limit',
                    margin: '10, 0, 10, 0',
                    bodyPadding: 10,
                    title: '',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_basic_sessionlimit',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 170,
                                    text: '최대 세션 사용률 제한'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'lab_total',
                                    margin: '0, 20, 0, 0',
                                    width: 70,
                                    text: ' 0 의 '
                                },
                                {
                                    xtype: 'numberfield',
                                    disabled: true,
                                    itemId: 'nfd_session',
                                    margin: '0, 20, 0, 0',
                                    width: 100,
                                    fieldLabel: '',
                                    value: 0,
                                    maxValue: 100,
                                    minValue: 0,
                                    listeners: {
                                        change: 'onNfd_sessionChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 50, 0, 0',
                                    text: '%'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'lab_current'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_basic_memorylimit',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 170,
                                    text: '최대 메모리 사용률 제한'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'lab_total',
                                    margin: '0, 20, 0, 0',
                                    width: 70,
                                    text: '0 의'
                                },
                                {
                                    xtype: 'numberfield',
                                    disabled: true,
                                    itemId: 'nfd_memory',
                                    margin: '0, 20, 0, 0',
                                    width: 100,
                                    fieldLabel: '',
                                    value: 0,
                                    maxValue: 100,
                                    minValue: 0,
                                    listeners: {
                                        change: 'onNfd_memoryChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 50, 0, 0',
                                    text: '%'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'lab_current'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_basic_useexcess',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_useexcess',
                                    width: 350,
                                    fieldLabel: '사용률 제한 초과 시',
                                    labelWidth: 165,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'value',
                                    listeners: {
                                        afterrender: 'onCmb_useexcessAfterRender'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    onPnl_xtm_system_basicAfterRender: function(component, eOpts) {
        // onPnl_xtm_system_basicAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.06.12
        //
        // 설명 : 시스템의 기본 속성을 컴포넌트에 설정합니다. 파라미터는 [0] - 'system_basic' [1] 'system_setting_option' 입니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var winObj = Ext.getCmp('win_smc_device_set');

        component.on('devinforev', this.devinfoRequest);

        component.fireEvent('devinforev');

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                componentObj.stateful.setValue((deviceData[1].option.stateful['@chk_use'] === 'on') ? true : false);
                componentObj.multilevel.setValue((deviceData[1].option.multi['@chk_use'] === 'on') ? true : false);
                componentObj.timeout.setValue(deviceData[1].option.timeout);
                componentObj.connport.setValue(deviceData[1].option.policy_port);
                componentObj.sshport.setValue(deviceData[1].option.ssh_port);

                var bypassSize   = 0;
                var bypassArray  = [];

                for(var bypass in deviceData[1].option.bypass){

                    bypassSize++;

                }

                for(var i = 1; i < bypassSize + 1; i++){

                    var keyStr = '@bp' + i;

                    bypassArray.push(deviceData[1].option.bypass[keyStr] + i);

                }

                componentObj.bypass.setValue({	'bypass' : bypassArray	});

                componentObj.timezone.setValue(deviceData[0].time.zone / 60);

                componentObj.session.setValue(deviceData[1].option.max_session);
                componentObj.memory.setValue(deviceData[1].option.max_memory);

                componentObj.useexcess.setValue(deviceData[1].option.alarm);

            }

        }
        catch(err){

            console.log('시스템 기본 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onCmb_timezoneAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_system_basic_timezone',
            'fields' : [
                {	'name' : 'text'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {
                    text: '(GMT -11:00) Niue, Samoa, West',
                    value: -11
                },
                {
                    text: '(GMT -10:00) Hawaii, Tahiti, Tokelau',
                    value: -10
                },
                {
                    text: '(GMT -09:30) Marquesas',
                    value: -9.5
                },
                {
                    text: '(GMT -09:00) Alaska Standard, Gambier',
                    value: -9
                },
                {
                    text: '(GMT -08:00) Pacific Standard, Pacific Standard',
                    value: -8
                },
                {
                    text: '(GMT -07:00) Mountain Standard',
                    value: -7
                },
                {
                    text: '(GMT -06:00) Central Standard, Easter Is, Galapagos',
                    value: -6
                },
                {
                    text: '(GMT -05:00) Acre, Central Standard, Colombia, Eastern standard, Ecuador, Peru',
                    value: -5
                },
                {
                    text: '(GMT -04:00) Amazon, Atlantic, Bolivia, Chile, Fakland Is, Guyana, Paraguay, Venezuela',
                    value: -4
                },
                {
                    text: '(GMT -03:30) Newfoundland Standard',
                    value: -3.5
                },
                {
                    text: '(GMT -03:00) Argentine, Brazil, French Guiana, Pierre and Miquelon, Suriname, Uruguay, Western Greenland',
                    value: -3
                },
                {
                    text: '(GMT -02:00) Fernando de Noronha, South Georgia',
                    value: -2
                },
                {
                    text: '(GMT -01:00) Azores, Cape, Eastern Greenland',
                    value: -1
                },
                {
                    text: '(GMT -00:00) Coordinated Universal, Greenwich Mean, Western European',
                    value: 0
                },
                {
                    text: '(GMT  01:00) Central European, Western African',
                    value: 1
                },
                {
                    text: '(GMT  02:00) Central Afracan, Eastern European, Israel, South Africa',
                    value: 2
                },
                {
                    text: '(GMT  03:00) Arabia, Eastern African, Moscow',
                    value: 3
                },
                {
                    text: '(GMT  03:30) Iran',
                    value: 3.5
                },
                {
                    text: '(GMT  04:00) Aqtau, Armenia, Azerbaijan, Georgia, Gulf, Mauritius, Reunion, Samara, Seychelles',
                    value: 4
                },
                {
                    text: '(GMT  04:30) Afghanistan',
                    value: 4.5
                },
                {
                    text: '(GMT  05:00) Aqtobe, French Southern and Antarctic Lands, Indian Ocean Territory, Kirgizstan, Maldives, Pakistan, Tajikistan, Turkmenistan, Uzbekistan, Yekaterinburg',
                    value: 5
                },
                {
                    text: '(GMT  05:30) India',
                    value: 5.5
                },
                {
                    text: '(GMT  06:00) Alma-Ata, Bangladesh, Bhutan, Mawson, Novosibirsk, Sri Lanka',
                    value: 6
                },
                {
                    text: '(GMT  06:30) Cocos is, Myanmar',
                    value: 6.5
                },
                {
                    text: '(GMT  07:00) Christmas Is, Indochina, Java, Krasnoyarsk',
                    value: 7
                },
                {
                    text: '(GMT  08:00) Borneo, Brunei, China, Hongkong, Irkutsk, Malaysia, Philippines, Singapore, Ulaanbaatar, Western Standard',
                    value: 8
                },
                {
                    text: '(GMT  09:00) Korea, Japan, Jayapura, Palau, Yakutsk',
                    value: 9
                },
                {
                    text: '(GMT  09:30) Central Standard',
                    value: 9.5
                },
                {
                    text: '(GMT  10:00) Chamorro Standard, Dumont-d\'Urville, Eastern Standard, Papua New Guinea, Truk, Vladivostok',
                    value: 10
                },
                {
                    text: '(GMT  10:30) Load Howe Standard',
                    value: 10.5
                },
                {
                    text: '(GMT  11:00) Norfolk',
                    value: 11
                },
                {
                    text: '(GMT  12:00) Anadyr, Anadyr, Fiji, Gilbert Is, Marshall Is, Nauru, New Zealand, Petropavlovsk-Kamchatski, Tuvalu, Wake, Wallis and Futuna',
                    value: 12
                },
                {
                    text: '(GMT  13:00) Phoenix Is, Tonga',
                    value: 13
                },
                {
                    text: '(GMT  14:00) Line Is',
                    value: 14
                }
            ]

        }));

        component.setValue();
    },

    onNfd_sessionChange: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        component.sessioncurr.setText('( ' + addComma(Ext.getCmp('pnl_xtm_system_basic').sessiontotal * newValue / 100) + ' )');
    },

    onNfd_memoryChange: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        component.memorycurr.setText('( ' + addComma(Ext.getCmp('pnl_xtm_system_basic').memorytotal * newValue / 100) + ' MB )');
    },

    onCmb_useexcessAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_system_basic_uselimit',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '알람', 'value' : 1					},
                {	'name' : '알람 + 세션생성 제한', 'value' : 2	}
            ]
        }));

        component.setValue(1);
    },

    onPnl_xtm_system_basicBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj        = {};

        var stateful   = this.down('[itemId=ck_stateful]');
        var multilevel = this.down('[itemId=ck_multilevel]');
        var timeout    = this.down('[itemId=ctn_basic_timeout]').down('[itemId=nfd_timeout]');
        var connport   = this.down('[itemId=nfd_connport]');
        var sshport    = this.down('[itemId=nfd_sshport]');
        var bypass     = this.down('[itemId=ckg_bypass]');
        var timezone   = this.down('[itemId=cmb_timezone]');
        var serial     = this.down('[itemId=dpf_serial]');

        var fds_opt    = this.down('[itemId=fds_basic_optimization]');

        var limit_valid = fds_opt.down('[itemId=fpn_basic_limit]');

        var session    = limit_valid.down('[itemId=ctn_basic_sessionlimit]').down('[itemId=nfd_session]');

        var sessiontotal = limit_valid.down('[itemId=ctn_basic_sessionlimit]').down('[itemId=lab_total]');
        var sessioncurr  = limit_valid.down('[itemId=ctn_basic_sessionlimit]').down('[itemId=lab_current]');

        var memory     = limit_valid.down('[itemId=ctn_basic_memorylimit]').down('[itemId=nfd_memory]');
        var memorytotal  = limit_valid.down('[itemId=ctn_basic_memorylimit]').down('[itemId=lab_total]');
        var memorycurr   = limit_valid.down('[itemId=ctn_basic_memorylimit]').down('[itemId=lab_current]');

        var useexcess  = limit_valid.down('[itemId=ctn_basic_useexcess]').down('[itemId=cmb_useexcess]');

        return function(){

            obj.stateful   = stateful;
            obj.multilevel = multilevel;
            obj.timeout    = timeout;
            obj.connport   = connport;
            obj.sshport    = sshport;
            obj.bypass     = bypass;
            obj.timezone   = timezone;
            obj.serial     = serial;
            obj.session    = session;
            obj.sessiontotal = sessiontotal;
            obj.sessioncurr  = sessioncurr;

            obj.memory     = memory;
            obj.memorytotal  = memorytotal;
            obj.memorycurr = memorycurr;
            obj.useexcess  = useexcess;

            return obj;

        }();
    },

    devinfoRequest: function() {
        // devinfoRequest ===============================================================================================================================================================
        //
        // 일시 : 2014.07.10
        //
        // 설명 : 장비의 기본정보를 사용하여 사용률제한, 하드웨어 시리얼을 초기화합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var service = 'ftSMC',
            serchService = 'getDeviceStatusInfo',
            params = {

                cid : Ext.encode(Ext.getCmp('win_smc_device_set').deviceParams['@cid'])

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(deviceState){

                var sessiontotal   = parseInt(deviceState.smc_status.system_use.ses_info['@total']) * 1000;
                var sessioncurrent = parseInt(deviceState.smc_status.system_use.ses_info['@current']);

                var memorytotal    = parseInt(deviceState.smc_status.system_use.mem_info['@total']);
                var memorycurrent  = parseInt(deviceState.smc_status.system_use.mem_info['@current']);

                var sysBasicObj = Ext.getCmp('pnl_xtm_system_basic');

                sysBasicObj.sessiontotal = sessiontotal;
                sysBasicObj.memorytotal  = memorytotal;

                component.serial.setValue(deviceState.smc_status.gate_info.serial);

                component.session.setDisabled(false);

                component.memory.setDisabled(false);

                if(sessiontotal > 0){

                    component.sessiontotal.setText(addComma(sessiontotal) + ' 의');

                    component.session.setDisabled(false);

                    component.sessioncurr.setVisible(true);

                }

                if(memorytotal > 0){

                    component.memorytotal.setText(addComma(memorytotal) + 'MB 의');

                    component.memory.setDisabled(false);

                    component.memorycurr.setVisible(true);

                }

            }

        );
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.06.12
        //
        // 설명 : System option 설정을 저장합니다. 저장하는 부분은 system_basic = timezone 저장, system_setting_option = 그외의 설정 입니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 타임존 저장 ===================================================================================================================================================================

        deviceAllData.system_basic.time.zone          = component.timezone.getValue() * 60;
        deviceAllData.system_basic.time.sync['#text'] = 'time.bora.net';

        // 옵션 설정 저장 ================================================================================================================================================================

        deviceAllData.system_setting_option.option.stateful['@chk_use'] = (component.stateful.getValue() === true) ? "on" : "off";
        deviceAllData.system_setting_option.option.multi['@chk_use'] = (component.multilevel.getValue() === true) ? 'on' : 'off';
        deviceAllData.system_setting_option.option.timeout           = component.timeout.getValue();
        deviceAllData.system_setting_option.option.policy_port       = component.connport.getValue();
        deviceAllData.system_setting_option.option.ssh_port          = component.sshport.getValue();

        var bypassData = component.bypass.getValue().bypass;

        var bypassSize   = 0;
        var bypassArray  = [];

        for(var bypass in deviceAllData.system_setting_option.option.bypass){

            bypassSize++;

        }

        for(var i = 1; i < bypassSize + 1; i++){

            deviceAllData.system_setting_option.option.bypass['@bp' + i] = 'off';

        }

        if(bypassData !== undefined){

            Ext.each(bypassData, function(data){

                var keyStr = '@bp' + data.substring(2);

                deviceAllData.system_setting_option.option.bypass[keyStr] = 'on';

            });

        }

        deviceAllData.system_setting_option.option.max_session = component.session.getValue();
        deviceAllData.system_setting_option.option.max_memory = component.memory.getValue();
        deviceAllData.system_setting_option.option.alarm = component.useexcess.getValue();

        return true;
    }

});

Ext.define('SMC4ZEN.view.pnl_xtm_multi_system', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_multi_systemViewModel',
        'SMC4ZEN.view.ctn_multi_control',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    viewModel: {
        type: 'pnl_xtm_multi_system'
    },
    height: 680,
    id: 'pnl_xtm_multi_system',
    itemId: '',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '시스템',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_multi_systemAfterRender',
        beforeclose: 'onPnl_xtm_multi_systemBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        flex: 1,
                        itemId: 'fds_multisystem_option',
                        checkboxToggle: true,
                        title: 'Option',
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
                                itemId: 'ctn_multisystem_timeout',
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
                                value: 443
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
                                width: 600,
                                fieldLabel: '표준 시간대',
                                labelWidth: 150,
                                editable: false,
                                displayField: 'name',
                                valueField: 'value',
                                listeners: {
                                    afterrender: 'onCmb_timezoneAfterRender'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_multisystem_snmp',
                        checkboxToggle: true,
                        title: 'SNMP',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                border: false,
                                itemId: 'ctn_multisnmp_inputform',
                                margin: '0, 0, 10, 0',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_multisnmp_input',
                                        margin: '0, 0, 10, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                flex: 0.8,
                                                itemId: 'txf_community',
                                                margin: '0, 150, 0, 0',
                                                fieldLabel: '커뮤니티'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                flex: 1,
                                                itemId: 'ck_trap',
                                                fieldLabel: '',
                                                boxLabel: 'TRAP 주소',
                                                listeners: {
                                                    change: 'onCk_trapChange1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_multisnmp_input2',
                                        margin: '0, 0, 10, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                flex: 2,
                                                itemId: 'txf_etcinfo',
                                                margin: '0, 30, 0, 0',
                                                width: 340,
                                                fieldLabel: '기타 정보'
                                            },
                                            {
                                                xtype: 'radiogroup',
                                                disabled: true,
                                                itemId: 'rdg_iptype',
                                                margin: '0, 30, 0, 0',
                                                fieldLabel: '',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_ipv4',
                                                        margin: '0, 30, 0, 0',
                                                        name: 'iptype',
                                                        boxLabel: 'IPv4',
                                                        checked: true,
                                                        inputValue: 'v4'
                                                    },
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_ipv6',
                                                        name: 'iptype',
                                                        boxLabel: 'IPv6',
                                                        inputValue: 'v6'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    var component = Ext.getCmp('pnl_xtm_multi_system').componentStorage().iptype;

                                                    if(component.getValue().iptype === 'v4'){

                                                        var retValue = ValidIPAddress(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
                                                    else{

                                                        var retValue = ValidIPv6(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
                                                },
                                                flex: 1,
                                                disabled: true,
                                                itemId: 'txf_ipaddr',
                                                width: 250,
                                                fieldLabel: '',
                                                enableKeyEvents: true
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'ctn_multi_control',
                                itemId: 'ctn_multisnmp_control',
                                margin: '0, 0, 10, 0',
                                listeners: {
                                    afterrender: 'onCtn_multisnmp_controlAfterRender'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                itemId: 'gpn_multisnmp_list',
                                margin: '0, 0, 10, 0',
                                title: '',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return value.split(':')[0];
                                        },
                                        dataIndex: 'community',
                                        text: '커뮤니티',
                                        flex: 1.5
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return value.substring(value.split(':')[0].length + 1);
                                        },
                                        dataIndex: 'community',
                                        text: 'TRAP',
                                        flex: 1.5
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'location',
                                        text: '기타정보',
                                        flex: 2
                                    }
                                ],
                                listeners: {
                                    itemclick: 'onGpn_snmp_setItemClick1',
                                    render: 'onGpn_multisnmp_listRender'
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

    onCmb_timezoneAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_multi_timezone',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '(GMT -11:00) Niue, Samoa, West', 'value' : -11		},
                {	'name' : '(GMT -10:00) Hawaii, Tahiti, Tokelau', 'value' : -10	},
                {	'name' : '(GMT -09:30) Marquesas', 'value' : -9.5				},
                {	'name' : '(GMT -09:00) Alaska Standard, Gambier', 'value' : -9	},
                {
                    'name': '(GMT -08:00) Pacific Standard, Pacific Standard',
                    'value': -8
                },
                {
                    'name': '(GMT -07:00) Mountain Standard',
                    'value': -7
                },
                {
                    'name': '(GMT -06:00) Central Standard, Easter Is, Galapagos',
                    'value': -6
                },
                {
                    'name': '(GMT -05:00) Acre, Central Standard, Colombia, Eastern standard, Ecuador, Peru',
                    'value': -5
                },
                {
                    'name': '(GMT -04:00) Amazon, Atlantic, Bolivia, Chile, Fakland Is, Guyana, Paraguay, Venezuela',
                    'value': -4
                },
                {
                    'name': '(GMT -03:30) Newfoundland Standard',
                    'value': -3.5
                },
                {
                    'name': '(GMT -03:00) Argentine, Brazil, French Guiana, Pierre and Miquelon, Suriname, Uruguay, Western Greenland',
                    'value': -3
                },
                {
                    'name': '(GMT -02:00) Fernando de Noronha, South Georgia',
                    'value': -2
                },
                {
                    'name': '(GMT -01:00) Azores, Cape, Eastern Greenland',
                    'value': -1
                },
                {
                    'name': '(GMT -00:00) Coordinated Universal, Greenwich Mean, Western European',
                    'value': 0
                },
                {
                    'name': '(GMT  01:00) Central European, Western African',
                    'value': 1
                },
                {
                    'name': '(GMT  02:00) Central Afracan, Eastern European, Israel, South Africa',
                    'value': 2
                },
                {
                    'name': '(GMT  03:00) Arabia, Eastern African, Moscow',
                    'value': 3
                },
                {
                    'name': '(GMT  03:30) Iran',
                    'value': 3.5
                },
                {
                    'name': '(GMT  04:00) Aqtau, Armenia, Azerbaijan, Georgia, Gulf, Mauritius, Reunion, Samara, Seychelles',
                    'value': 4
                },
                {
                    'name': '(GMT  04:30) Afghanistan',
                    'value': 4.5
                },
                {
                    'name': '(GMT  05:00) Aqtobe, French Southern and Antarctic Lands, Indian Ocean Territory, Kirgizstan, Maldives, Pakistan, Tajikistan, Turkmenistan, Uzbekistan, Yekaterinburg',
                    'value': 5
                },
                {
                    'name': '(GMT  05:30) India',
                    'value': 5.5
                },
                {
                    'name': '(GMT  06:00) Alma-Ata, Bangladesh, Bhutan, Mawson, Novosibirsk, Sri Lanka',
                    'value': 6
                },
                {
                    'name': '(GMT  06:30) Cocos is, Myanmar',
                    'value': 6.5
                },
                {
                    'name': '(GMT  07:00) Christmas Is, Indochina, Java, Krasnoyarsk',
                    'value': 7
                },
                {
                    'name': '(GMT  08:00) Borneo, Brunei, China, Hongkong, Irkutsk, Malaysia, Philippines, Singapore, Ulaanbaatar, Western Standard',
                    'value': 8
                },
                {
                    'name': '(GMT  09:00) Korea, Japan, Jayapura, Palau, Yakutsk',
                    'value': 9
                },
                {
                    'name': '(GMT  09:30) Central Standard',
                    'value': 9.5
                },
                {
                    'name': '(GMT  10:00) Chamorro Standard, Dumont-d\'Urville, Eastern Standard, Papua New Guinea, Truk, Vladivostok',
                    'value': 10
                },
                {
                    'name': '(GMT  10:30) Load Howe Standard',
                    'value': 10.5
                },
                {
                    'name': '(GMT  11:00) Norfolk',
                    'value': 11
                },
                {
                    'name': '(GMT  12:00) Anadyr, Anadyr, Fiji, Gilbert Is, Marshall Is, Nauru, New Zealand, Petropavlovsk-Kamchatski, Tuvalu, Wake, Wallis and Futuna',
                    'value': 12
                },
                {
                    'name': '(GMT  13:00) Phoenix Is, Tonga',
                    'value': 13
                },
                {
                    'name': '(GMT  14:00) Line Is',
                    'value': 14
                }
            ]
        }));

        component.setValue(9);
    },

    onCk_trapChange1: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue){

            component.iptype.setDisabled(false);

            component.ipaddr.setDisabled(false);

        }
        else{

            component.iptype.setDisabled(true);

            component.ipaddr.setDisabled(true);

        }
    },

    onCtn_multisnmp_controlAfterRender: function(component, eOpts) {
        // onCtn_multisnmp_controlAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 편집의 시스템 데이터를 컨트롤하는 부분입니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().snmpCountCheck() || !me.validityCheck().snmpBlankCheck() ||
               !me.validityCheck().snmpValidCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj                 = {};

            if(!componentObj.trap.getValue()){

                obj.community = componentObj.community.getValue() + ':';

            }
            else{

                obj.community = componentObj.community.getValue() + ':' + componentObj.ipaddr.getValue();

            }

            obj.location            = componentObj.etcinfo.getValue();

            var setObj              = {};

            setObj['@chk_authtrap'] = (componentObj.trap.getValue() === true) ? "on" : "off";
            setObj['@chk_use']      = "on";
            setObj['@type']         = componentObj.iptype.getValue().iptype;

            obj.setting   = setObj;

            gridData_Add(componentObj.snmp_grid, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.snmp_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'SNMP 수정 에러',
                    msg : '선택된 SNMP 데이터가 없습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().snmpBlankCheck() || !me.validityCheck().snmpValidCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj                 = {};

            if(!componentObj.trap.getValue()){

                obj.community = componentObj.community.getValue() + ':';

            }
            else{

                obj.community = componentObj.community.getValue() + ':' + componentObj.ipaddr.getValue();

            }

            obj.location            = componentObj.etcinfo.getValue();

            var setObj              = {};

            setObj['@chk_authtrap'] = (componentObj.trap.getValue() === true) ? "on" : "off";
            setObj['@chk_use']      = "on";
            setObj['@type']         = componentObj.iptype.getValue().iptype;

            obj.setting   = setObj;

            selectionGrid_Mod(componentObj.snmp_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.snmp_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'SNMP 삭제 에러',
                    msg : '선택된 SNMP 데이터가 없습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.snmp_grid);

        });
    },

    onGpn_snmp_setItemClick1: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.community.setValue(record.data.community.split(':')[0]);
        component.trap.setValue((record.data.setting['@chk_authtrap'] === 'on') ? true : false);
        component.etcinfo.setValue(record.data.location);
        component.iptype.setValue({ 'iptype' : record.data.setting['@type']});
        component.ipaddr.setValue(record.data.community.substring(record.data.community.split(':')[0].length + 1));
    },

    onGpn_multisnmp_listRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            storeId: 'st_multisnmp_list',
            fields: [
                {
                    name: 'community'
                },
                {
                    name: 'location'
                },
                {
                    name: 'setting'
                }
            ]
        }));
    },

    onPnl_xtm_multi_systemAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_systemAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄편집 기능의 시스템 설정에 해당하는 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.initStore();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        componentObj.fds_option.checkboxCmp.setValue(false);
        componentObj.fds_snmp.checkboxCmp.setValue(false);

        componentObj.fds_option.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'system_option', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'system_option', false);

            }

        });

        componentObj.fds_snmp.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'system_snmp', true);

            }
            else{

                Ext.getStore('st_multisnmp_list').removeAll();

                Change_ApplyTarget(wndInstance.apply_target, 'system_snmp', false);

            }

        });

        // 시스템 옵션 데이터 초기화 ========================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'system_option')){

            componentObj.fds_option.checkboxCmp.setValue(true);

            componentObj.stateful.setValue((wndInstance.system_setting_option.option.stateful['@chk_use'] === 'on') ? true : false);
            componentObj.multilevel.setValue((wndInstance.system_setting_option.option.multi['@chk_use'] === 'on') ? true : false);
            componentObj.timeout.setValue(wndInstance.system_setting_option.option.timeout);
            componentObj.connport.setValue(wndInstance.system_setting_option.option.policy_port);
            componentObj.sshport.setValue(wndInstance.system_setting_option.option.ssh_port);

            var bypassSize   = 0;
            var bypassArray  = [];

            for(var bypass in wndInstance.system_setting_option.option.bypass){

                bypassSize++;

            }

            for(var i = 1; i < bypassSize + 1; i++){

                var keyStr = '@bp' + i;

                bypassArray.push(wndInstance.system_setting_option.option.bypass[keyStr] + i);

            }

            componentObj.bypass.setValue({	'bypass' : bypassArray	});

            componentObj.timezone.setValue(wndInstance.system_basic.time.zone / 60);

        }

        // SNMP 데이터 초기화 =============================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'system_snmp')){

            componentObj.fds_snmp.checkboxCmp.setValue(true);

            if(wndInstance.system_snmp){

                Ext.getStore('st_multisnmp_list').add(wndInstance.system_snmp.snmp);

            }

        }
    },

    onPnl_xtm_multi_systemBeforeClose: function(panel, eOpts) {
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

        var fds_option = this.down('[itemId=fds_multisystem_option]');
        var fds_snmp   = this.down('[itemId=fds_multisystem_snmp]');

        obj.fds_option = fds_option;
        obj.fds_snmp   = fds_snmp;

        obj.stateful   = fds_option.down('[itemId=ck_stateful]');
        obj.multilevel = fds_option.down('[itemId=ck_multilevel]');
        obj.timeout    = fds_option.down('[itemId=ctn_multisystem_timeout]').down('[itemId=nfd_timeout]');
        obj.connport   = fds_option.down('[itemId=nfd_connport]');
        obj.sshport    = fds_option.down('[itemId=nfd_sshport]');
        obj.bypass     = fds_option.down('[itemId=ckg_bypass]');
        obj.timezone   = fds_option.down('[itemId=cmb_timezone]');

        obj.community  = fds_snmp.down('[itemId=ctn_multisnmp_inputform]').down('[itemId=ctn_multisnmp_input]').down('[itemId=txf_community]');
        obj.trap       = fds_snmp.down('[itemId=ctn_multisnmp_inputform]').down('[itemId=ctn_multisnmp_input]').down('[itemId=ck_trap]');
        obj.etcinfo    = fds_snmp.down('[itemId=ctn_multisnmp_inputform]').down('[itemId=ctn_multisnmp_input2]').down('[itemId=txf_etcinfo]');
        obj.iptype     = fds_snmp.down('[itemId=ctn_multisnmp_inputform]').down('[itemId=ctn_multisnmp_input2]').down('[itemId=rdg_iptype]');
        obj.ipaddr     = fds_snmp.down('[itemId=ctn_multisnmp_inputform]').down('[itemId=ctn_multisnmp_input2]').down('[itemId=txf_ipaddr]');
        obj.snmp_grid  = fds_snmp.down('[itemId=gpn_multisnmp_list]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 일괄 편집의 SNMP 화면 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            snmpBlankCheck : function(){

                if(component.community.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '커뮤니티는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.ipaddr.getValue() === '' && component.trap.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            snmpCountCheck : function(){

                if(component.snmp_grid.getStore().count() >= 5){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SNMP는 최대 5개만 등록할 수 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            snmpValidCheck : function(type){

                if(!component.ipaddr.validate() && component.trap.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (type === 'v4') ? 'IP v4 형식에 맞지 않습니다.' : 'IP v6 형식에 맞지 않습니다.',
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
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 편집 시스템 설정을 임시 저장합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance  = Ext.getCmp('win_smc_device_multiset').deviceParam;

        if(getApplyTarget(wndInstance.apply_target, 'system_option')){

        // 타임존 저장 ====================================================================================================================================================================

            wndInstance.system_basic.time.zone          = componentObj.timezone.getValue() * 60;
            wndInstance.system_basic.time.sync['#text'] = 'time.bora.net';

        // 옵션 설정 저장 =================================================================================================================================================================

            wndInstance.system_setting_option.option.stateful['@chk_use'] = (componentObj.stateful.getValue() === true) ? "on" : "off";
            wndInstance.system_setting_option.option.multi['@chk_use'] = (componentObj.multilevel.getValue() === true) ? 'on' : 'off';
            wndInstance.system_setting_option.option.timeout           = componentObj.timeout.getValue();
            wndInstance.system_setting_option.option.policy_port       = componentObj.connport.getValue();
            wndInstance.system_setting_option.option.ssh_port          = componentObj.sshport.getValue();

            var bypassData = componentObj.bypass.getValue().bypass;

            var bypassSize   = 0;
            var bypassArray  = [];

            for(var bypass in wndInstance.system_setting_option.option.bypass){

                bypassSize++;

            }

            for(var i = 1; i < bypassSize + 1; i++){

                wndInstance.system_setting_option.option.bypass['@bp' + i] = 'off';

            }

            if(bypassData !== undefined){

                Ext.each(bypassData, function(data){

                    var keyStr = '@bp' + data.substring(2);

                    wndInstance.system_setting_option.option.bypass[keyStr] = 'on';

                });

            }

            console.log('저장되는 데이터 확인 -> ', wndInstance);

        }

        if(getApplyTarget(wndInstance.apply_target, 'system_snmp')){

            var snmpStore = Ext.getStore('st_multisnmp_list');

            var dataObj;

            if(snmpStore.count() <= 0){

                wndInstance.system_snmp = null;

                return true;

            }
            else{

                if(!wndInstance.system_snmp){

                    wndInstance.system_snmp = {};

                }

                dataObj = [];

                for(var i = 0; i < snmpStore.count(); i++){

                    dataObj.push(snmpStore.getAt(i).data);

                }

            }

            wndInstance.system_snmp.snmp = dataObj;

        }

        return true;
    },

    initStore: function() {
        var st_snmplist = Ext.getStore('st_multisnmp_list');

        st_snmplist.removeAll();

        this.down('[itemId=fds_multisystem_snmp]').down('[itemId=gpn_multisnmp_list]').bindStore(st_snmplist);
    }

});
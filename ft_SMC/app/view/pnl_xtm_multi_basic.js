
Ext.define('SMC.view.pnl_xtm_multi_basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_basic',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox'
    ],

    height: 680,
    id: 'pnl_xtm_multi_basic',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '기본 설정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_smc',
                    checkboxToggle: true,
                    title: 'SMC 서버',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            flex: 1,
                            border: false,
                            itemId: 'fpn_multibasic_smcvalid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '0, 0, 0, 50',
                                    itemId: 'ctn_multibasic_smcip',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '80%',
                                            itemId: 'txf_smcip',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '주 SMC IP',
                                            enableKeyEvents: true
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
                                            anchor: '80%',
                                            itemId: 'txf_smcip2',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '보조 SMC IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_multibasic_smcipbk',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '80%',
                                            itemId: 'txf_smcipbk',
                                            fieldLabel: '백업 SMC IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_corp',
                    checkboxToggle: true,
                    title: '법인 정보',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_groupinfo',
                            margin: '0, 0, 10, 60',
                            width: 270,
                            fieldLabel: '법인 구분',
                            value: 'NH_NLCF',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'st_basic_groupcode',
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_area',
                    checkboxToggle: true,
                    title: '지역 정보',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_area',
                            margin: '0, 0, 10, 60',
                            width: 270,
                            fieldLabel: '지역 구분',
                            editable: false,
                            displayField: 'area',
                            queryMode: 'local',
                            valueField: 'area',
                            listeners: {
                                afterrender: {
                                    fn: me.onCmb_areaAfterRender1,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_dns',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'DNS 설정',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_multibasic_dnsvalid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '0, 0, 0, 50',
                                    itemId: 'ctn_multibasic_dnsset',
                                    layout: 'anchor',
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
                                            anchor: '80%',
                                            itemId: 'txf_dns1',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '1차 DNS',
                                            enableKeyEvents: true
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
                                            anchor: '80%',
                                            itemId: 'txf_dns3',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '3차 DNS',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_multibasic_dnsset2',
                                    layout: 'anchor',
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
                                            anchor: '80%',
                                            itemId: 'txf_dns2',
                                            fieldLabel: '2차 DNS',
                                            enableKeyEvents: true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_autoup',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'AutoUp 사용',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_multibasic_autoupvalid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '0, 0, 0, 50',
                                    itemId: 'ctn_multibasic_autoup',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '80%',
                                            itemId: 'txf_ip',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: 'Server IP',
                                            enableKeyEvents: true
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
                                            anchor: '80%',
                                            itemId: 'nfd_port',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: 'Port'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_multibasic_autoup2',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = CheckNotNull(value);

                                                if(!retValue){

                                                    return true;

                                                }

                                                retValue = ValidMAC(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            anchor: '80%',
                                            itemId: 'txf_mackey',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: 'Mac Key'
                                        },
                                        {
                                            xtype: 'combobox',
                                            anchor: '80%',
                                            itemId: 'cmb_checkinterval',
                                            fieldLabel: 'Check Interval',
                                            value: 1,
                                            editable: false,
                                            store: [
                                                1,
                                                5,
                                                10,
                                                30,
                                                60,
                                                120,
                                                240,
                                                360,
                                                720,
                                                1440
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multibasic_rtm',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'RTM 정보 전송',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_multibasic_rtmvalid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '0, 0, 0, 50',
                                    itemId: 'ctn_multibasic_rtm',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_usertm',
                                            fieldLabel: '',
                                            boxLabel: 'RTM 사용'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '80%',
                                            itemId: 'txf_id',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: 'ID'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '80%',
                                            itemId: 'txf_passwd',
                                            fieldLabel: '비밀번호',
                                            inputType: 'password'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_multibasic_rtm2',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            itemId: 'ck_rtminfo',
                                            fieldLabel: '',
                                            boxLabel: 'RPM 정보 전송'
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
                                            anchor: '80%',
                                            itemId: 'txf_rtmip',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: 'RTM 서버 IP',
                                            enableKeyEvents: true
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
                    fn: me.onPnl_xtm_multi_basicAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_basicBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    /*
        일시 : 2015.01.19

        설명 : 지역정보 데이터를 콤보박스의 스토어에 초기화합니다.

        수정 :

        - (2015.01.19 김민수 : 지역정보 데이터 초기화 코드)
    */
    onCmb_areaAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            fields : [

                {	name : 'area'	}

            ],
            data : [

                {	'area' : '강원'	},
                {	'area' : '경기'	},
                {	'area' : '경남'	},
                {	'area' : '경북'	},
                {	'area' : '광주'	},
                {	'area' : '대구'	},
                {	'area' : '대전'	},
                {	'area' : '부산'	},
                {	'area' : '서울'	},
                {	'area' : '울산'	},
                {	'area' : '인천'	},
                {	'area' : '전남'	},
                {	'area' : '전북'	},
                {	'area' : '제주'	},
                {	'area' : '충남'	},
                {	'area' : '충북'	},
                {	'area' : '센터'	},
                {	'area' : '기타'	},
            ]

                }));

        component.setValue('기타');
    },

    onPnl_xtm_multi_basicAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_basicAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 장비 일괄편집 기본 설정화면의 초기화를 수행합니다.
        //
        // 파라미터 설명 :
        //
        // [메인 파라미터] 'applyDevice' : 선택된 장비에 대한 Record 정보입니다.,
        // [메인 파라미터] 'deviceParam' : 장비 초기 데이터입니다.
        //
        // apply_Target 값 :
        //
        // [0] SMC 설정 - apply_smc_ip
        // [1] DNS 설정 - apply_dns_addr
        // [2] AUTOUP 설정 - apply_autoup_info
        // [3] RTM 설정 - apply_rtm_info
        //
        // 수정 :
        //
        // - (2015.01.19 김민수 : [4] apply_corp_info, [5] apply_location_info 추가)
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        // 체크 이벤트 설정 ================================================================================================================================================================
        //
        // 설명 : 필드셋의 체크박스 이벤트를 설정합니다. 체크가 선택되어 있으면 메인 장비 초기데이터에서 apply_Target 속성에 해당하는 값이 true 로 변경됩니다.
        //
        // ==============================================================================================================================================================================

        componentObj.fds_smc.checkboxCmp.setValue(false);
        componentObj.fds_dns.checkboxCmp.setValue(false);

        // 2015.01.19 김민수 - 법인, 지역 정보 추가

        componentObj.fds_corp.checkboxCmp.setValue(false);
        componentObj.fds_area.checkboxCmp.setValue(false);

        componentObj.fds_autoup.checkboxCmp.setValue(false);
        componentObj.fds_rtm.checkboxCmp.setValue(false);

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 체크 이벤트 설정 ================================================================================================================================================================

        componentObj.fds_smc.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'smc_ip', true);

            }
            else{

                componentObj.smcip1.setValue('0.0.0.0');
                componentObj.smcip2.setValue('0.0.0.0');
                componentObj.smcip3.setValue('0.0.0.0');

                Change_ApplyTarget(wndInstance.apply_target, 'smc_ip', false);

            }

        });

        componentObj.fds_dns.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'dns_addr', true);

            }
            else{

                componentObj.dnsip1.setValue('');
                componentObj.dnsip2.setValue('');
                componentObj.dnsip3.setValue('');

                Change_ApplyTarget(wndInstance.apply_target, 'dns_addr', false);

            }

        });

        // 2015.01.19 법인, 지역 정보 이벤트 추가

        componentObj.fds_corp.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'group_info', true);

            }
            else{

                componentObj.corpinfo.setValue('NH_NLCF');

                Change_ApplyTarget(wndInstance.apply_target, 'group_info', false);

            }

        });

        componentObj.fds_area.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'location_info', true);

            }
            else{

                componentObj.areainfo.setValue('기타');

                Change_ApplyTarget(wndInstance.apply_target, 'location_info', false);

            }

        });

        componentObj.fds_autoup.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'autoup_info', true);

            }
            else{

                componentObj.autoupip.setValue('');
                componentObj.autoupport.setValue(null);
                componentObj.autoupmac.setValue('');
                componentObj.autoupinterval.setValue(1);

                Change_ApplyTarget(wndInstance.apply_target, 'autoup_info', false);

            }

        });

        componentObj.fds_rtm.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'rtm_info', true);

            }
            else{

                componentObj.usertm.setValue(false);
                componentObj.rtmid.setValue('');
                componentObj.rtmpw.setValue('');
                componentObj.rpm.setValue('');
                componentObj.rtmip.setValue('');

                Change_ApplyTarget(wndInstance.apply_target, 'rtm_info', false);

            }

        });

        // 데이터 불러오기 =================================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'smc_ip')){

            componentObj.fds_smc.checkboxCmp.setValue(true);

            componentObj.smcip1.setValue(wndInstance.center_setup.center.first_ip);
            componentObj.smcip2.setValue(wndInstance.center_setup.center.second_ip);
            componentObj.smcip3.setValue(wndInstance.center_setup.center.dr_ip);

        }

        if(getApplyTarget(wndInstance.apply_target, 'dns_addr')){

            componentObj.fds_dns.checkboxCmp.setValue(true);

            componentObj.dnsip1.setValue(wndInstance.network_interface.domain.main);
            componentObj.dnsip2.setValue(wndInstance.network_interface.domain.sub);
            componentObj.dnsip3.setValue(wndInstance.network_interface.domain.third);

        }

        // 2015.01.19 김민수 - 법인코드, 지역코드 추가

        if(getApplyTarget(wndInstance.apply_target, 'group_info')){

            componentObj.fds_corp.checkboxCmp.setValue(true);

            componentObj.corpinfo.setValue(wndInstance.group_code);

        }

        if(getApplyTarget(wndInstance.apply_target, 'location_info')){

            componentObj.fds_area.checkboxCmp.setValue(true);

            componentObj.areainfo.setValue(wndInstance.location);

        }

        if(getApplyTarget(wndInstance.apply_target, 'autoup_info')){

            componentObj.fds_autoup.checkboxCmp.setValue(true);

            componentObj.autoupip.setValue(wndInstance.system_autoup.autoup.ip);
            componentObj.autoupport.setValue(wndInstance.system_autoup.autoup.port);
            componentObj.autoupmac.setValue(wndInstance.system_autoup.autoup.mac);
            componentObj.autoupinterval.setValue(wndInstance.system_autoup.autoup.interval);

        }

        if(getApplyTarget(wndInstance.apply_target, 'rtm_info')){

            componentObj.fds_rtm.checkboxCmp.setValue(true);

            componentObj.usertm.setValue((wndInstance.log_setting.setting.rtm['@chk_use'] === 'on') ? true : false);
            componentObj.rtmid.setValue(wndInstance.log_setting.setting.rtm.id);
            componentObj.rtmpw.setValue(wndInstance.log_setting.setting.rtm.password);
            componentObj.rpm.setValue((wndInstance.log_setting.setting.rtm['@chk_rpm'] === 'on') ? true : false);
            componentObj.rtmip.setValue(wndInstance.log_setting.setting.rtm.server);

        }
    },

    onPnl_xtm_multi_basicBeforeClose: function(panel, eOpts) {
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

        var fds_smc = this.down('[itemId=fds_multibasic_smc]');
        var fds_dns = this.down('[itemId=fds_multibasic_dns]');
        var fds_corp = this.down('[itemId=fds_multibasic_corp]');
        var fds_area = this.down('[itemId=fds_multibasic_area]');
        var fds_autoup = this.down('[itemId=fds_multibasic_autoup]');
        var fds_rtm = this.down('[itemId=fds_multibasic_rtm]');

        var valid_smc = fds_smc.down('[itemId=fpn_multibasic_smcvalid]');
        var valid_dns = fds_dns.down('[itemId=fpn_multibasic_dnsvalid]');
        var valid_autoup = fds_autoup.down('[itemId=fpn_multibasic_autoupvalid]');
        var valid_rtm = fds_rtm.down('[itemId=fpn_multibasic_rtmvalid]');

        obj.fds_smc = fds_smc;
        obj.fds_dns = fds_dns;
        obj.fds_corp = fds_corp;
        obj.fds_area = fds_area;
        obj.fds_autoup = fds_autoup;
        obj.fds_rtm = fds_rtm;

        // SMC IP 정보 ====================================================================================================================================================================

        obj.smcip1 = valid_smc.down('[itemId=ctn_multibasic_smcip]').down('[itemId=txf_smcip]');
        obj.smcip2 = valid_smc.down('[itemId=ctn_multibasic_smcip]').down('[itemId=txf_smcip2]');
        obj.smcip3 = valid_smc.down('[itemId=ctn_multibasic_smcipbk]').down('[itemId=txf_smcipbk]');

        // DNS IP 정보 ====================================================================================================================================================================

        obj.dnsip1 = valid_dns.down('[itemId=ctn_multibasic_dnsset]').down('[itemId=txf_dns1]');
        obj.dnsip2 = valid_dns.down('[itemId=ctn_multibasic_dnsset2]').down('[itemId=txf_dns2]');
        obj.dnsip3 = valid_dns.down('[itemId=ctn_multibasic_dnsset]').down('[itemId=txf_dns3]');

        // 법인 정보 ======================================================================================================================================================================

        obj.corpinfo = fds_corp.down('[itemId=cmb_groupinfo]');

        // 지역 정보 ======================================================================================================================================================================

        obj.areainfo = fds_area.down('[itemId=cmb_area]');

        // Auto Up 정보 ===================================================================================================================================================================

        obj.autoupip = valid_autoup.down('[itemId=ctn_multibasic_autoup]').down('[itemId=txf_ip]');
        obj.autoupport = valid_autoup.down('[itemId=ctn_multibasic_autoup]').down('[itemId=nfd_port]');
        obj.autoupmac = valid_autoup.down('[itemId=ctn_multibasic_autoup2]').down('[itemId=txf_mackey]');
        obj.autoupinterval = valid_autoup.down('[itemId=ctn_multibasic_autoup2]').down('[itemId=cmb_checkinterval]');

        // RTM 정보 =======================================================================================================================================================================

        obj.usertm = valid_rtm.down('[itemId=ctn_multibasic_rtm]').down('[itemId=ck_usertm]');
        obj.rtmid = valid_rtm.down('[itemId=ctn_multibasic_rtm]').down('[itemId=txf_id]');
        obj.rtmpw = valid_rtm.down('[itemId=ctn_multibasic_rtm]').down('[itemId=txf_passwd]');
        obj.rpm   = valid_rtm.down('[itemId=ctn_multibasic_rtm2]').down('[itemId=ck_rtminfo]');
        obj.rtmip = valid_rtm.down('[itemId=ctn_multibasic_rtm2]').down('[itemId=txf_rtmip]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄편집 기본정보 화면의 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            basicBlankCheck : function(){

                if(component.fds_smc.checkboxCmp.getValue()){

                    if(component.smcip1.getValue() === '' || component.smcip1.getValue() === '0.0.0.0'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '주 SMC IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.fds_dns.checkboxCmp.getValue()){

                    if(component.dnsip1.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '1차 DNS는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.fds_autoup.checkboxCmp.getValue()){

                    if(component.autoupip.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.autoupport.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Port는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.autoupmac.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 주소는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.fds_rtm.checkboxCmp.getValue() && component.usertm.getValue()){

                    if(component.rtmid.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'ID는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR,
                            fn : function(){

                                component.rtmid.focus();

                            }

                        });

                        return false;

                    }

                    if(component.rtmpw.getValue() === '' && component.usertm.getValue()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '비밀번호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR,
                            fn : function(){

                                component.rtmpw.focus();

                            }

                        });

                        return false;

                    }

                    if(component.rtmip.getValue() === '' && component.usertm.getValue()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR,
                            fn : function(){

                                component.rtmip.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            basicValidateCheck : function(){

                if(component.usertm.getValue() && component.fds_smc.checkboxCmp.getValue()){

                    if(!component.smcip1.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.smcip2.getValue() !== '' && !component.smcip2.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.smcip3.getValue() !== '' &&!component.smcip3.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.usertm.getValue() && component.fds_dns.checkboxCmp.getValue()){

                    if(!component.dnsip1.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dnsip2.getValue() !== '' && !component.dnsip2.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.dnsip3.getValue() !== '' && !component.dnsip3.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.usertm.getValue() && component.fds_autoup.checkboxCmp.getValue()){

                    if(!component.autoupip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.autoupport.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '포트의 범위는 1 ~ 65535 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.autoupmac.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.usertm.getValue() && component.fds_rtm.checkboxCmp.getValue()){

                    if(!component.rtmip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 형식에 맞지 않습니다.',
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
        // saveData ======================================================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : 일괄편집 화면 중 기본 설정의 데이터를 임시적으로 보관합니다. 일괄편집 윈도우는 innerView 가 close 될때만 임시적으로 데이터를 보관합니다.
        //
        // 수정 :
        //
        // - (2015.01.19 김민수 : 법인정보, 지역정보 저장추가)
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        if(!this.validityCheck().basicBlankCheck() || !this.validityCheck().basicValidateCheck()){

            return false;

        }

        if(getApplyTarget(wndInstance.apply_target, 'smc_ip')){

            wndInstance.center_setup.center.first_ip  = componentObj.smcip1.getValue();
            wndInstance.center_setup.center.second_ip = componentObj.smcip2.getValue();
            wndInstance.center_setup.center.dr_ip     = componentObj.smcip3.getValue();

        }
        else{

            wndInstance.center_setup.center.first_ip = '0.0.0.0';
            wndInstance.center_setup.center.second_ip = '0.0.0.0';
            wndInstance.center_setup.center.dr_ip = '0.0.0.0';

        }

        if(getApplyTarget(wndInstance.apply_target, 'dns_addr')){

            wndInstance.network_interface.domain.main  = componentObj.dnsip1.getValue();
            wndInstance.network_interface.domain.sub   = componentObj.dnsip2.getValue();
            wndInstance.network_interface.domain.third = componentObj.dnsip3.getValue();

        }
        else{

            wndInstance.network_interface.domain.main = '';
            wndInstance.network_interface.domain.sub  = '';
            wndInstance.network_interface.domain.third = '';

        }

        // 2015.01.19 법인코드, 지역코드 추가

        if(getApplyTarget(wndInstance.apply_target, 'group_info')){

            wndInstance.group_code = componentObj.corpinfo.getValue();

        }
        else{

            wndInstance.group_code = 'NH_NLCF';

        }

        if(getApplyTarget(wndInstance.apply_target, 'location_info')){

            wndInstance.location  = componentObj.areainfo.getValue();

        }
        else{

            wndInstance.location = '기타';

        }

        if(getApplyTarget(wndInstance.apply_target, 'autoup_info')){

            wndInstance.system_autoup.autoup.ip   = componentObj.autoupip.getValue();
            wndInstance.system_autoup.autoup.port = componentObj.autoupport.getValue();
            wndInstance.system_autoup.autoup.mac  = componentObj.autoupmac.getValue();
            wndInstance.system_autoup.autoup.interval = componentObj.autoupinterval.getValue();

        }
        else{

            wndInstance.system_autoup.autoup.ip = null;
            wndInstance.system_autoup.autoup.port = null;
            wndInstance.system_autoup.autoup.mac = null;
            wndInstance.system_autoup.autoup.interval = null;
        }

        if(getApplyTarget(wndInstance.apply_target, 'rtm_info')){

            wndInstance.log_setting.setting.rtm['@chk_use'] = (componentObj.usertm.getValue() === true) ? 'on' : 'off';
            wndInstance.log_setting.setting.rtm.id          = componentObj.rtmid.getValue();
            wndInstance.log_setting.setting.rtm.password    = componentObj.rtmpw.getValue();
            wndInstance.log_setting.setting.rtm['@chk_rpm'] = (componentObj.rpm.getValue() === true) ? 'on' : 'off';
            wndInstance.log_setting.setting.rtm.server      = componentObj.rtmip.getValue();

        }
        else{

            wndInstance.log_setting.setting.rtm['@chk_use'] = 'off';
            wndInstance.log_setting.setting.rtm.id          = null;
            wndInstance.log_setting.setting.rtm.password    = null;
            wndInstance.log_setting.setting.rtm['@chk_rpm'] = 'off';
            wndInstance.log_setting.setting.rtm.server      = null;

        }

        return true;
    }

});
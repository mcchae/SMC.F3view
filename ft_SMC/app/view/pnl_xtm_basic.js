
Ext.define('SMC.view.pnl_xtm_basic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_basic',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number'
    ],

    deviceParams: '',
    height: 680,
    id: 'pnl_xtm_basic',
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
                    itemId: 'fds_basic_deviceinfo',
                    margin: '10, 0, 10, 0',
                    title: '장비 기본 정보',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_basic_devname',
                            margin: '5, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_devicename',
                                    maxWidth: 700,
                                    width: 700,
                                    fieldLabel: '장비명'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_basic_etcinfo',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_etcinfo',
                                    maxWidth: 700,
                                    width: 700,
                                    fieldLabel: '기타 정보'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_basic_groupinfo',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 0.3,
                                    itemId: 'cmb_groupinfo',
                                    margin: '0, 15, 0, 0',
                                    maxWidth: 230,
                                    fieldLabel: '법인 구분',
                                    value: 'NH_NLCF',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_basic_groupcode',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 0.3,
                                    itemId: 'cmb_area',
                                    margin: '0, 15, 0, 0',
                                    maxWidth: 210,
                                    fieldLabel: '지역 구분',
                                    labelWidth: 80,
                                    editable: false,
                                    displayField: 'area',
                                    queryMode: 'local',
                                    valueField: 'area',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onCmb_areaAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.3,
                                    itemId: 'txf_divisioncode',
                                    maxWidth: 230,
                                    fieldLabel: '장비 구분'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_basic_dnsset',
                    margin: '0, 0, 10, 0',
                    title: 'DNS 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_basic_dnsset1',
                            margin: '5, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
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
                                    flex: 1,
                                    itemId: 'txf_dns1',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 325,
                                    fieldLabel: '1차 DNS',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(retValue){

                                            retValue = validIPForm(value, 'v4');

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_dns2',
                                    maxWidth: 325,
                                    fieldLabel: '2차 DNS',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_basic_dnsset2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(retValue){

                                            retValue = validIPForm(value, 'v4');

                                            if(!retValue){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_dns3',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 325,
                                    fieldLabel: '3차 DNS',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_basic_margin',
                                    maxWidth: 325
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_basic_serverset',
                    title: '서버 설정',
                    items: [
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_basic_smcip',
                            margin: '0, 0, 10, 0',
                            title: 'SMC 서버',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_basic_smcip',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
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
                                            itemId: 'txf_smcip',
                                            margin: '0, 50, 0, 0',
                                            width: 300,
                                            fieldLabel: '주 SMC IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue;

                                                retValue = CheckNotNull(value);

                                                if(retValue){

                                                    retValue = validIPForm(value, 'v4');

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_smcip2',
                                            width: 300,
                                            fieldLabel: '보조 SMC IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_basic_smcipbk',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue;

                                                retValue = CheckNotNull(value);

                                                if(retValue){

                                                    retValue = validIPForm(value, 'v4');

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_smcipbk',
                                            margin: '0, 50, 0, 0',
                                            width: 300,
                                            fieldLabel: '백업 SMC IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_margin',
                                            width: 300
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_basic_autoup',
                            margin: '0, 0, 10, 0',
                            checkboxToggle: true,
                            title: 'AutoUp 사용',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '',
                                    itemId: 'ctn_basic_autoup1',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
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
                                            itemId: 'txf_ip',
                                            margin: '0, 50, 0, 0',
                                            maxWidth: 300,
                                            width: 300,
                                            fieldLabel: 'Server IP',
                                            value: '0.0.0.0',
                                            enableKeyEvents: true,
                                            listeners: {
                                                blur: {
                                                    fn: me.onTxf_ipBlur,
                                                    scope: me
                                                }
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
                                            maxWidth: 300,
                                            width: 300,
                                            fieldLabel: 'Port',
                                            value: 0
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_basic_autoup2',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_mackey',
                                            margin: '0, 50, 0, 0',
                                            maxWidth: 300,
                                            width: 300,
                                            fieldLabel: 'Mac Key'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_checkinterval',
                                            maxWidth: 300,
                                            width: 300,
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
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_basicAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_basicBeforeClose,
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
    onCmb_areaAfterRender: function(component, eOpts) {
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

    onTxf_ipBlur: function(component, e, eOpts) {
        // onTxf_ipBlur ==================================================================================================================================================================
        //
        // 일시 : 2015.01.06
        //
        // 설명 : 데이터가 없을 경우 자동으로 0.0.0.0을 컴포넌트에 설정합니다.
        //
        // 수정 :
        //
        // ===============================================================================================================================================================================

        if(component.getValue() === ''){

            component.setValue('0.0.0.0');

        }
    },

    onPnl_xtm_basicAfterRender: function(component, eOpts) {
        // onPnl_basic_setAfterRender ==================================================================================================================================================
        //
        // 일시 : 2014.07.15
        //
        // 설명 : 장비의 기본정보, 서버정보를 초기화 합니다.
        //
        // 수정 :
        //
        // (2014.09.13 김민수 - 그룹코드 추가 파라미터 9)
        // (2014.09.18 김민수 - RTM 화면 분리로 인한 주석처리 및 컴포넌트 삭제)
        // (2014.10.10 김민수 - device_code 파라미터 추가 10)
        // (2014.11.05 김민수 - 상태 정보 화면과 기본정보를 설정하는 화면 분리)
        // (2015.01.19 김민수 - 지역정보 추가)
        //
        // 파라미터 :
        // [0] -> cid
        // [1] -> groupcid
        // [2] -> name
        // [3] -> desc
        // [4] -> centerobj
        // [5] -> network_interface
        // [6] -> system_setting_option (현재 사용되지 않음)
        // [7] -> system_autoup
        // [8] -> log setting
        // [9] -> group_code
        // [10]-> device_code
        // [11]-> location
        //
        // =============================================================================================================================================================================

        var basicObj = this.deviceParams;

        var componentObj = this.componentStorage();

        componentObj.fds_autoup.checkboxCmp.setValue(true);

        componentObj.fds_autoup.checkboxCmp.on('change', function(component, newValue){

            if(newValue){

                componentObj.auto_inter.setValue(1);

            }

        });

        // 데이터 초기화 =================================================================================================================================================================

        try{

            if(basicObj[2]){

                componentObj.devicename.setValue(basicObj[2]);

            }

            if(basicObj[3]){

                componentObj.device_etc.setValue(basicObj[3]);

            }

            if(basicObj[4].center){

                componentObj.smcip.setValue(basicObj[4].center.first_ip);
                componentObj.smcip2.setValue(basicObj[4].center.second_ip);
                componentObj.smcipbk.setValue(basicObj[4].center.dr_ip);

            }

            if(basicObj[5]){

                componentObj.dns1.setValue(basicObj[5].domain.main);
                componentObj.dns2.setValue(basicObj[5].domain.sub);
                componentObj.dns3.setValue(basicObj[5].domain.third);

            }

            if(basicObj[7].autoup){

                if(basicObj[7].autoup.ip === null && basicObj[7].autoup.port === null && basicObj[7].autoup.mac === null){

                    componentObj.fds_autoup.checkboxCmp.setValue(false);

                }
                else{

                    componentObj.fds_autoup.checkboxCmp.setValue(true);
                }

                componentObj.auto_ip.setValue(basicObj[7].autoup.ip);
                componentObj.auto_port.setValue(basicObj[7].autoup.port);
                componentObj.auto_mackey.setValue(basicObj[7].autoup.mac);
                componentObj.auto_inter.setValue(basicObj[7].autoup.interval);

            }

            if(basicObj[9]){

                componentObj.device_group.setValue(basicObj[9]);

            }

            if(basicObj[10]){

                componentObj.devicecode.setValue(basicObj[10]);

            }

            if(basicObj[11]){

                componentObj.device_area.setValue(basicObj[11]);

            }

        }
        catch(err){

            console.log('SMC Basic 데이터를 초기화 하는 중에 catch 발생 :  ', err);

        }
    },

    onPnl_xtm_basicBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_basicBeforeClose ====================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 : 장비의 기본 정보 데이터를 저장하고 화면 상태를 변경합니다.
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
        // fieldset =====================================================================================================================================================================

        var fds_dnsset = this.down('[itemId=fds_basic_dnsset]');
        var fds_server = this.down('[itemId=fds_basic_serverset]');
        var fds_device = this.down('[itemId=fds_basic_deviceinfo]');

        var fds_smcip  = fds_server.down('[itemId=fds_basic_smcip]');
        var fds_autoup = fds_server.down('[itemId=fds_basic_autoup]');

        // basic set ====================================================================================================================================================================

        var devicename = fds_device.down('[itemId=txf_devicename]');
        var devicecode = fds_device.down('[itemId=txf_divisioncode]');
        var device_etc = fds_device.down('[itemId=txf_etcinfo]');
        var device_group = fds_device.down('[itemId=cmb_groupinfo]');
        var device_area = fds_device.down('[itemId=cmb_area]');

        var smcip      = fds_smcip.down('[itemId=txf_smcip]');
        var smcip2     = fds_smcip.down('[itemId=txf_smcip2]');
        var smcipbk    = fds_smcip.down('[itemId=txf_smcipbk]');

        var dns1       = fds_dnsset.down('[itemId=txf_dns1]');
        var dns2       = fds_dnsset.down('[itemId=txf_dns2]');
        var dns3       = fds_dnsset.down('[itemId=txf_dns3]');

        // autoup set ===================================================================================================================================================================

        var auto_ip   = fds_autoup.down('[itemId=ctn_basic_autoup1]').down('[itemId=txf_ip]');
        var auto_port = fds_autoup.down('[itemId=ctn_basic_autoup1]').down('[itemId=nfd_port]');
        var auto_mackey = fds_autoup.down('[itemId=ctn_basic_autoup2]').down('[itemId=txf_mackey]');
        var auto_inter  = fds_autoup.down('[itemId=ctn_basic_autoup2]').down('[itemId=cmb_checkinterval]');

        var obj = {};

        obj.fds_device = fds_device;
        obj.fds_dnsset = fds_dnsset;
        obj.fds_server = fds_server;

        obj.fds_smcip  = fds_smcip;
        obj.fds_autoup = fds_autoup;

        obj.devicename = devicename;
        obj.devicecode = devicecode;
        obj.device_etc = device_etc;
        obj.device_group = device_group;
        obj.device_area = device_area;

        obj.smcip      = smcip;
        obj.smcip2     = smcip2;
        obj.smcipbk    = smcipbk;

        obj.dns1       = dns1;
        obj.dns2       = dns2;
        obj.dns3       = dns3;

        obj.auto_ip    = auto_ip;
        obj.auto_port  = auto_port;
        obj.auto_mackey = auto_mackey;
        obj.auto_inter = auto_inter;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.07
        //
        // 설명 : 기본정보 화면의 유효성 검사를 수행합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            basicBlankCheck : function(){

                if(component.smcip.getValue() === '' || component.smcip.getValue() === '0.0.0.0'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '주 SMC IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.devicename.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '장비명은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.fds_autoup.checkboxCmp.getValue() && component.auto_ip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '서버 IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.fds_autoup.checkboxCmp.getValue() && component.auto_port.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Port는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.fds_autoup.checkboxCmp.getValue() && component.auto_mackey.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MAC 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            basicIpCheck : function(){

                if(component.dns1.getValue() !== '' && !component.dns1.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.dns2.getValue() !== '' && !component.dns2.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.dns3.getValue() !== '' && !component.dns3.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.smcip.getValue() !== '' && !component.smcip.validate()){

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

                if(component.smcipbk.getValue() !== '' && !component.smcipbk.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.auto_ip.getValue() !== '' && !component.auto_ip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            basicPortCheck : function(){

                if(!component.auto_port.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '포트의 범위는 1 ~ 65535 입니다.',
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
        // 일시 : 2014.07.08
        //
        // 설명 : XTM 기본정보를 저장합니다. 저장하는 과정에서 유효성 검사를 수행합니다.
        //
        // - 수정 (2014.10.10 김민수 device_code 저장 추가)
        // - 수정 (2014.12.20 김민수 autoup 필드셋에 체크가 되어있지 않은 경우 모든 값이 null로 설정되도록 수정)
        //
        // =============================================================================================================================================================================

        var deviceAllData  = Ext.getCmp('win_smc_device_set').deviceParams;

        var componentObj   = this.componentStorage();

        if(!this.validityCheck().basicBlankCheck() || !this.validityCheck().basicIpCheck() || !this.validityCheck().basicPortCheck()){

            return false;

        }

        deviceAllData.name = componentObj.devicename.getValue();
        deviceAllData.desc = componentObj.device_etc.getValue();

        deviceAllData.group_code = componentObj.device_group.getValue();
        deviceAllData.location = componentObj.device_area.getValue();

        deviceAllData.network_interface.domain.main  = componentObj.dns1.getValue();
        deviceAllData.network_interface.domain.sub   = componentObj.dns2.getValue();
        deviceAllData.network_interface.domain.third = componentObj.dns3.getValue();

        deviceAllData.center_setup.center.first_ip   = componentObj.smcip.getValue();
        deviceAllData.center_setup.center.second_ip  = componentObj.smcip2.getValue();
        deviceAllData.center_setup.center.dr_ip      = componentObj.smcipbk.getValue();

        var chk_autoup = componentObj.fds_autoup.checkboxCmp.getValue();

        deviceAllData.system_autoup.autoup.ip        = (chk_autoup) ? ((componentObj.auto_ip.getValue()     === '') ? null : componentObj.auto_ip.getValue()) : null;
        deviceAllData.system_autoup.autoup.port      = (chk_autoup) ? ((componentObj.auto_port.getValue()   === '') ? null : componentObj.auto_port.getValue()) : null ;
        deviceAllData.system_autoup.autoup.mac       = (chk_autoup) ? ((componentObj.auto_mackey.getValue() === '') ? null : componentObj.auto_mackey.getValue()) : null;
        deviceAllData.system_autoup.autoup.interval  = (chk_autoup) ? ((componentObj.auto_inter.getValue()  === '') ? null : componentObj.auto_inter.getValue()) : null;

        deviceAllData.device_code = componentObj.devicecode.getValue();

        return true;
    }

});
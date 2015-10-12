
Ext.define('SMC4ZEN.view.pnl_xtm_mgt_log', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_mgt_logViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_mgt_log'
    },
    height: 679,
    id: 'pnl_xtm_mgt_log',
    overflowY: 'auto',
    width: 877,
    bodyPadding: 10,
    title: '로그 설정',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_level',
            margin: '0, 0, 10, 0',
            title: '로그 레벨',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'cmb_system',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'System',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_network',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'Network',
                    value: 'Debug',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_vpn',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'IPSec VPN',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_nac',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'NAC',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_waf',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'WAF',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_av',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'AV / AS',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_dpi',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'DPI',
                    value: 'Debug',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_traffic',
                    margin: '10, 0, 10, 10',
                    fieldLabel: 'Traffic Anomaly',
                    value: 'Normal',
                    editable: false,
                    displayField: 'loglevel',
                    store: [
                        'NoLog',
                        'Debug',
                        'Information',
                        'Normal',
                        'Warning',
                        'Serious',
                        'Critical',
                        'user'
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_failset',
            margin: '0, 0, 10, 0',
            title: '로그 기능 불능시 수행 설정',
            layout: {
                type: 'hbox',
                defaultMargins: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            items: [
                {
                    xtype: 'radiogroup',
                    flex: 0.5,
                    itemId: 'rdg_faillog',
                    margin: '10, 0, 10, 0',
                    layout: 'anchor',
                    fieldLabel: '',
                    items: [
                        {
                            xtype: 'radiofield',
                            itemId: 'rd_stopsvc',
                            margin: '0, 0, 10, 0',
                            name: 'act',
                            boxLabel: '보안 서비스 중지',
                            checked: true,
                            inputValue: 'stop'
                        },
                        {
                            xtype: 'radiofield',
                            itemId: 'rd_rewrite',
                            name: 'act',
                            boxLabel: '오래된 로그 덮어 쓰기',
                            inputValue: 'overwrite'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_logset_percent',
                    margin: '10, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            validator: function(value) {
                                var retValue = LengthCheck(value, 10, 95);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'nfd_percent',
                            margin: '0, 10, 0, 0',
                            width: 70,
                            fieldLabel: ''
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: '%인 경우 동작'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_flow',
            margin: '0, 0, 10, 0',
            title: '로그 플로우',
            items: [
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'ck_flow',
                    fieldLabel: '',
                    boxLabel: 'TCP 플래그 로그'
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_hdd',
            margin: '0, 0, 10, 0',
            title: 'HDD 설정',
            items: [
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'ck_optimization',
                    fieldLabel: '',
                    boxLabel: '로그 최적화 사용안함 (로그 검색시 늦어질 수 있습니다.)'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'ck_nonsave',
                    fieldLabel: '',
                    boxLabel: 'HDD 로그 저장 사용 안함'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'ck_sessiondown',
                    fieldLabel: '',
                    boxLabel: 'HDD 에 세션 종료 로그 생성'
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_logset_alarm',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_alarm',
                            margin: '0, 100, 0, 0',
                            fieldLabel: '',
                            boxLabel: 'HDD 용량 알람 사용',
                            listeners: {
                                change: 'onCk_alarmChange'
                            }
                        },
                        {
                            xtype: 'radiogroup',
                            flex: 1,
                            disabled: true,
                            itemId: 'rdg_inputmod',
                            width: 400,
                            fieldLabel: '',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_byte',
                                    name: 'mod',
                                    boxLabel: 'Byte 입력',
                                    inputValue: 'byte'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 2147483646);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    disabled: true,
                                    itemId: 'nfd_byte',
                                    margin: '0, 10, 0, 0',
                                    width: 100,
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_percent',
                                    name: 'mod',
                                    boxLabel: 'Percent 입력',
                                    checked: true,
                                    inputValue: 'per'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 10, 94);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_percent',
                                    margin: '0, 10, 0, 0',
                                    width: 100,
                                    fieldLabel: '',
                                    value: 80
                                }
                            ],
                            listeners: {
                                change: 'onRdg_inputmodChange'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_backup',
            margin: '0, 0, 10, 0',
            checkboxToggle: true,
            title: '로그 백업 설정',
            items: [
                {
                    xtype: 'radiogroup',
                    itemId: 'rdg_selectftp',
                    fieldLabel: '',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'radiofield',
                            itemId: 'ck_sftp',
                            margin: '0, 200, 0, 0',
                            name: 'server',
                            boxLabel: 'SFTP',
                            checked: true,
                            inputValue: 'sftp'
                        },
                        {
                            xtype: 'radiofield',
                            itemId: 'ck_ftp',
                            name: 'server',
                            boxLabel: 'FTP',
                            inputValue: 'ftp'
                        }
                    ],
                    listeners: {
                        change: 'onRdg_selectftpChange'
                    }
                },
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'fpn_logset_valid',
                    margin: '0, 0, 10, 0',
                    bodyPadding: 10,
                    title: '',
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
                            anchor: '100%',
                            itemId: 'txf_ftpip',
                            maxWidth: 300,
                            fieldLabel: 'FTP Server IP',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'txf_id',
                            maxWidth: 300,
                            fieldLabel: 'ID'
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = passwordCheck(value);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            anchor: '100%',
                            disabled: true,
                            itemId: 'txf_passwd',
                            maxWidth: 300,
                            fieldLabel: 'Password',
                            inputType: 'password'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            itemId: 'txf_savepath',
                            margin: '0, 0, 10, 0',
                            maxWidth: 300,
                            width: 300,
                            fieldLabel: '저장 위치'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_logdata',
            margin: '0, 0, 10, 0',
            title: '로그 데이터 관리',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_logset_maintain',
                    title: '유지',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_day',
                            margin: '10, 10, 10, 0',
                            maxWidth: 150,
                            fieldLabel: '',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'value',
                            listeners: {
                                afterrender: 'onCmb_dayAfterRender'
                            }
                        },
                        {
                            xtype: 'label',
                            margin: '10, 0, 10, 0',
                            text: '동안 로그 데이터 유지'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_logset_compress',
                    title: '압축 및 백업',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_usecompress',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            boxLabel: '로그 압축 사용',
                            listeners: {
                                change: 'onCk_usecompressChange'
                            }
                        },
                        {
                            xtype: 'label',
                            margin: '0, 0, 10, 0',
                            text: '※ 03:00 에 로그압축이 실행되며 (S)FTP 백업 설정이 있으면 압축 후 백업 수행'
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            itemId: 'ctn_logset_compresstime',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_time',
                                    margin: '0, 10, 10, 0',
                                    maxWidth: 150,
                                    fieldLabel: '',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'value',
                                    listeners: {
                                        afterrender: 'onCmb_timeAfterRender'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '동안 압축 데이터 유지'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            disabled: true,
                            itemId: 'ck_backup',
                            fieldLabel: '',
                            boxLabel: '(S)FTP 백업 사용 *(S)FTP 백업 설정이 필요합니다.'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_tracker',
            margin: '0, 0, 10, 0',
            title: '트래픽 트래커',
            items: [
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    itemId: 'ck_use',
                    fieldLabel: '',
                    boxLabel: '사용'
                }
            ]
        },
        {
            xtype: 'fieldset',
            itemId: 'fds_logset_updatetime',
            title: '트래커 업데이트 시간',
            layout: {
                type: 'hbox',
                align: 'middle',
                defaultMargins: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'cmb_updatetime',
                    margin: '10, 10, 10, 0',
                    maxWidth: 100,
                    fieldLabel: '',
                    value: 5,
                    editable: false,
                    store: [
                        5,
                        15,
                        30,
                        60
                    ]
                },
                {
                    xtype: 'label',
                    margin: '10, 0, 10, 0',
                    text: '분 마다 업데이트'
                }
            ]
        },
        {
            xtype: 'fieldset',
            height: 200,
            itemId: 'fds_logset_workgroup',
            title: '업무 네트워크',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_logset_ip',
                    margin: '10, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = ValidRange(value);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            itemId: 'txf_ip',
                            margin: '0, 10, 0, 0',
                            width: 250,
                            fieldLabel: 'IP 입력',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_add',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '추 가',
                            listeners: {
                                click: 'onBt_addClick'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_mod',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '수 정',
                            listeners: {
                                click: 'onBt_modClick'
                            }
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'IP Range 로 입력 ex) 1.1.1.1-2.2.2.2'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_logset_ip',
                    margin: '0, 0, 10, 0',
                    title: '',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 360,
                            dataIndex: 'member',
                            text: 'IP Address',
                            flex: 2
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 200,
                            defaultWidth: 200,
                            align: 'center',
                            flex: 1,
                            items: [
                                {
                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                        var workgroupStore = Ext.getStore('st_logset_ip');

                                        workgroupStore.removeAt(rowIndex);
                                    },
                                    iconCls: 'ico_grid_row_delete'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        itemclick: 'onGpn_logset_ipItemClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_mgt_logAfterRender',
        beforeclose: 'onPnl_xtm_mgt_logBeforeClose'
    },

    onCk_alarmChange: function(field, newValue, oldValue, eOpts) {
        var selMode = field.up().down('[itemId=rdg_inputmod]');

        if(newValue){

            selMode.setDisabled(false);

        }
        else{

            selMode.setDisabled(true);

        }
    },

    onRdg_inputmodChange: function(field, newValue, oldValue, eOpts) {
        var txf_byte    = field.down('[itemId=nfd_byte]');
        var txf_percent = field.down('[itemId=nfd_percent]');

        if(newValue.mod === 'byte'){

            txf_byte.setDisabled(false);
            txf_percent.setDisabled(true);
            txf_percent.setValue(null);

        }
        else{

            txf_byte.setDisabled(true);
            txf_percent.setDisabled(false);
            txf_byte.setValue(null);

        }
    },

    onRdg_selectftpChange: function(field, newValue, oldValue, eOpts) {
        var txf_passwd = field.up().down('[itemId=fpn_logset_valid]').down('[itemId=txf_passwd]');

        if(newValue.server === 'sftp'){

            txf_passwd.setDisabled(true);

        }
        else{

            txf_passwd.setDisabled(false);

        }

    },

    onCmb_dayAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_logset_day',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '7일'			,	'value' : 7		       },
                {	'name' : '14일'			,	'value' : 14	       },
                {	'name' : '30일'			,	'value' : 30		   },
                {	'name' : '60일'			,	'value' : 60		   },
                {	'name' : '90일'			,	'value' : 90		   },
                {	'name' : '기간 제한 없음'	 ,	 'value' : "unlimit"	}
            ]
        }));

        component.setValue(7);
    },

    onCk_usecompressChange: function(field, newValue, oldValue, eOpts) {
        var ctntime   = field.up().down('[itemId=ctn_logset_compresstime]');
        var ck_backup = field.up().down('[itemId=ck_backup]');

        if(newValue){

            ctntime.setDisabled(false);
            ck_backup.setDisabled(false);

        }
        else{

            ctntime.setDisabled(true);
            ck_backup.setDisabled(true);

        }
    },

    onCmb_timeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_logset_zipdata',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '7일'			,	'value' : 7		       },
                {	'name' : '14일'			,	'value' : 14	       },
                {	'name' : '30일'			,	'value' : 30		   },
                {	'name' : '60일'			,	'value' : 60		   },
                {	'name' : '90일'			,	'value' : 90		   },
                {	'name' : '기간 제한 없음'	 ,	 'value' : "unlimit"	}
            ]
        }));

        component.setValue(7);
    },

    onBt_addClick: function(button, e, eOpts) {
        var mgtlogObj   = Ext.getCmp('pnl_xtm_mgt_log');

        var component   = mgtlogObj.componentStorage();

        var obj    = {};

        if(!mgtlogObj.validityCheck().workBlankCheck() ||
           !mgtlogObj.validityCheck().workValidCheck() ||
           !mgtlogObj.validityCheck().workDuplicationCheck(component.workgpnip.getValue(), 'add')){

            return;

        }

        obj.member = component.workgpnip.getValue();

        gridData_Add(component.workgpn_grid, obj);
    },

    onBt_modClick: function(button, e, eOpts) {
        var mgtlogObj = Ext.getCmp('pnl_xtm_mgt_log');

        var component = mgtlogObj.componentStorage();

        var obj = {};

        if(!mgtlogObj.validityCheck().workBlankCheck() ||
           !mgtlogObj.validityCheck().workValidCheck() ||
           !mgtlogObj.validityCheck().workDuplicationCheck(component.workgpnip.getValue(), 'add')){

            return;

        }

        obj.member = component.workgpnip.getValue();

        selectionGrid_Mod(component.workgpn_grid, obj);
    },

    onGpn_logset_ipItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.workgpnip.setValue(record.get('member'));
    },

    onPnl_xtm_mgt_logAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_logAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.06.20
        //
        // 설명 : 로그 설정을 컴포넌트에 설정합니다. 파라미터는 log_setting 입니다.
        //
        // ==============================================================================================================================================================================

        var networkStore = Ext.getStore('st_logset_ip');

        var componentObj = this.componentStorage();

        var deviceData   = component.deviceParams;

        this.initStore();

        // 백업 checkbox 이벤트 ===========================================================================================================================================================

        componentObj.fds_backup.checkboxCmp.on('change', function(component, value){

            if(!value){

                componentObj.fds_backup.down('[itemId=fpn_logset_valid]').getForm().reset();

            }

        });

        try{

            // 로그 레벨 초기화 ================================================================================================================================================================

            componentObj.levelsys.setValue(deviceData.setting.level.system['@type']);
            componentObj.levelnet.setValue(deviceData.setting.level.network['@type']);
            componentObj.levelvpn.setValue(deviceData.setting.level.ipsec['@type']);
            componentObj.levelnac.setValue(deviceData.setting.level.nac['@type']);
            componentObj.levelwaf.setValue(deviceData.setting.level.waf['@type']);
            componentObj.levelavs.setValue(deviceData.setting.level.avas['@type']);
            componentObj.leveldpi.setValue(deviceData.setting.level.dpi['@type']);
            componentObj.leveltraffic.setValue(deviceData.setting.level.anomaly['@type']);

        }
        catch(err){

            console.log('로그레벨 초기화 중 catch 발생 : ', err);

        }

        // 로그 기능 수행 불능시 설정 초기화 =================================================================================================================================================

        try{

            componentObj.faillog.setValue({	'act' : deviceData.setting.freeze['@type']	});
            componentObj.failpercent.setValue(deviceData.setting.freeze['#text']);

        }
        catch(err){

            console.log('로그기능 수행 불능시 데이터 초기화 중 catch 발생 : ', err);

        }
        // 로그 플로우 초기화 ==============================================================================================================================================================

        try{

            if(deviceData.setting.tcp)
                componentObj.flowchk.setValue((deviceData.setting.tcp['@chk_use'] === 'on') ? true : false);

        }
        catch(err){

            console.log('로그 플로우 데이터 초기화 중 catch 발생 : ', err);

        }

        // HDD 설정 ======================================================================================================================================================================

        try{

            if(deviceData.setting){

                componentObj.hddoptimization.setValue((deviceData.setting.optimization['@chk_use'] === 'on') ? true : false);
                componentObj.hddnonsave.setValue((deviceData.setting.hddsave['@chk_use'] === 'on') ? true : false);
                componentObj.hddsessiondown.setValue((deviceData.setting.session['@chk_use'] === 'on') ? true : false);
                componentObj.hddalram.setValue((deviceData.setting.save['@chk_use'] === 'on') ? true : false);

            }

        }
        catch(err){

            console.log('HDD 설정 데이터 초기화 중 catch 발생 : ', err);

        }

        // 알람 설정이 체크 되어있을 경우 ====================================================================================================================================================

        try{

            if(deviceData.setting.save['@chk_use'] === 'on'){

                componentObj.hddinputmod.setValue({	'mod' : deviceData.setting.save['@type']	});

                componentObj.hddbytevalue.setValue((deviceData.setting.save['@type'] === 'byte') ? deviceData.setting.save['@value'] : '');

                componentObj.hddpercentvalue.setValue((deviceData.setting.save['@type'] === 'per') ? deviceData.setting.save['@value'] : '');

            }

        }
        catch(err){

            console.log('알람 설정 체크 데이터 초기화 중 catch 발생 : ', err);

        }

        // 로그 백업 설정 =================================================================================================================================================================

        try{

            if(deviceData.ftp){

                componentObj.fds_backup.checkboxCmp.setValue((deviceData.ftp['@chk_use'] === 'on') ? true : false);

                componentObj.backupselectftp.setValue({	'server' : deviceData.ftp['@chk_type']	});
                componentObj.backupftpip.setValue(deviceData.ftp.ip);
                componentObj.backupid.setValue(deviceData.ftp.id);
                componentObj.backuppasswd.setValue(deviceData.ftp.password);
                componentObj.backupsavepath.setValue(deviceData.ftp.path);

            }

        }
        catch(err){

            console.log('로그 백업 데이터 초기화 중 catch 발생 : ', err);

        }

        // 로그 데이터 관리 ================================================================================================================================================================

        try{

            if(deviceData.setting.log_manage){

                componentObj.manageday.setValue(deviceData.setting.log_manage.plain_keep);
                componentObj.managecompress.setValue((deviceData.setting.log_manage.comp['@chk_use'] === 'on') ? true : false);
                componentObj.managetime.setValue(deviceData.setting.log_manage.comp['#text']);
                componentObj.managebackup.setValue((deviceData.setting.log_manage.comp['@backup_ftp'] === 'on') ? true : false);

            }

        }
        catch(err){

            console.log('로그 데이터 관리 초기화 중 catch 발생 : ', err);

        }

        // 트래커 ========================================================================================================================================================================

        try{

            if(deviceData.setting.log_manage)
                componentObj.trackeruse.setValue((deviceData.setting.log_manage.tracker['@chk_use'] === 'on') ? true : false);

        }
        catch(err){

            console.log('트래커 데이터 초기화 중 catch 발생 : ', err);

        }

        // 트래커 업데이트 =================================================================================================================================================================

        try{
            if(deviceData.setting.tracker)
                componentObj.updatetime.setValue(deviceData.setting.tracker.update);

        }
        catch(err){

            console.log('트래커 업데이트 초기화 중 catch 발생 : ', err);

        }

        // 업무 네트워크 ==================================================================================================================================================================

        if(deviceData.network_range){

            Ext.each(deviceData.network_range.member, function(networkData){

                networkStore.add({	'member' : networkData	});

            });

        }
    },

    onPnl_xtm_mgt_logBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj            = {};

        // 필드 저장 =============================================================================================================================

        var fds_level      = this.down('[itemId=fds_logset_level]');
        var fds_fail       = this.down('[itemId=fds_logset_failset]');
        var fds_hdd        = this.down('[itemId=fds_logset_hdd]');
        var fds_backup     = this.down('[itemId=fds_logset_backup]');

        var fds_manage     = this.down('[itemId=fds_logset_logdata]');

        var fds_maintain   = fds_manage.down('[itemId=fds_logset_maintain]');
        var fds_compress   = fds_manage.down('[itemId=fds_logset_compress]');

        var fds_tracker    = this.down('[itemId=fds_logset_tracker]');
        var fds_updatetime = this.down('[itemId=fds_logset_updatetime]');
        var fds_workgroup  = this.down('[itemId=fds_logset_workgroup]');

        // 로그 레벨 ============================================================================================================================

        var levelsys  = fds_level.down('[itemId=cmb_system]');
        var levelnet  = fds_level.down('[itemId=cmb_network]');
        var levelvpn  = fds_level.down('[itemId=cmb_vpn]');
        var levelnac  = fds_level.down('[itemId=cmb_nac]');
        var levelwaf  = fds_level.down('[itemId=cmb_waf]');
        var levelavs  = fds_level.down('[itemId=cmb_av]');
        var leveldpi  = fds_level.down('[itemId=cmb_dpi]');
        var leveltraffic  = fds_level.down('[itemId=cmb_traffic]');

        // 로그 실패 ============================================================================================================================

        var faillog   = fds_fail.down('[itemId=rdg_faillog]');
        var failpercent = fds_fail.down('[itemId=ctn_logset_percent]').down('[itemId=nfd_percent]');

        // 플로우 ==============================================================================================================================

        var flowchk   = this.down('[itemId=fds_logset_flow]').down('[itemId=ck_flow]');

        // 하드 디스크 ==========================================================================================================================

        var hddoptimization = fds_hdd.down('[itemId=ck_optimization]');
        var hddnonsave      = fds_hdd.down('[itemId=ck_nonsave]');
        var hddsessiondown  = fds_hdd.down('[itemId=ck_sessiondown]');
        var hddalram        = fds_hdd.down('[itemId=ctn_logset_alarm]').down('[itemId=ck_alarm]');
        var hddinputmod     = fds_hdd.down('[itemId=rdg_inputmod]');
        var hddbyte         = hddinputmod.down('[itemId=rd_byte]');
        var hddbytevalue    = hddinputmod.down('[itemId=nfd_byte]');
        var hddpercent      = hddinputmod.down('[itemId=rd_percent]');
        var hddpercentvalue = hddinputmod.down('[itemId=nfd_percent]');

        // 백업 설정 ===========================================================================================================================

        var backupselectftp = fds_backup.down('[itemId=rdg_selectftp]');
        var backupftpip     = fds_backup.down('[itemId=txf_ftpip]');
        var backupid        = fds_backup.down('[itemId=txf_id]');
        var backuppasswd    = fds_backup.down('[itemId=txf_passwd]');
        var backupsavepath  = fds_backup.down('[itemId=txf_savepath]');

        // 로그 데이터 관리 =====================================================================================================================

        var manageday       = fds_maintain.down('[itemId=cmb_day]');

        var managecompress  = fds_compress.down('[itemId=ck_usecompress]');
        var managetime      = fds_compress.down('[itemId=cmb_time]');
        var managebackup    = fds_compress.down('[itemId=ck_backup]');

        // 트래픽 트래커 ========================================================================================================================

        var trackeruse      = fds_tracker.down('[itemId=ck_use]');

        // 트래커 업데이트 시간 ==================================================================================================================

        var updatetime      = fds_updatetime.down('[itemId=cmb_updatetime]');

        // 업무 네트워크 ========================================================================================================================

        var workgpnip       = fds_workgroup.down('[itemId=txf_ip]');
        var workgpn_grid    = fds_workgroup.down('[itemId=gpn_logset_ip]');

        obj.levelsys = levelsys;
        obj.levelnet = levelnet;
        obj.levelvpn = levelvpn;
        obj.levelnac = levelnac;
        obj.levelwaf = levelwaf;
        obj.levelavs = levelavs;
        obj.leveldpi = leveldpi;
        obj.leveltraffic = leveltraffic;

        obj.faillog  = faillog;
        obj.failpercent = failpercent;

        obj.flowchk  = flowchk;

        obj.hddoptimization = hddoptimization;
        obj.hddnonsave      = hddnonsave;
        obj.hddsessiondown  = hddsessiondown;
        obj.hddalram        = hddalram;
        obj.hddinputmod     = hddinputmod;
        obj.hddbyte         = hddbyte;
        obj.hddbytevalue    = hddbytevalue;
        obj.hddpercent      = hddpercent;
        obj.hddpercentvalue = hddpercentvalue;

        obj.fds_backup      = fds_backup;

        obj.backupselectftp = backupselectftp;
        obj.backupftpip     = backupftpip;
        obj.backupid        = backupid;
        obj.backuppasswd    = backuppasswd;
        obj.backupsavepath  = backupsavepath;

        obj.manageday       = manageday;
        obj.managecompress  = managecompress;
        obj.managetime      = managetime;
        obj.managebackup    = managebackup;

        obj.trackeruse      = trackeruse;
        obj.updatetime      = updatetime;

        obj.workgpnip       = workgpnip;
        obj.workgpn_grid    = workgpn_grid;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 로그 전송의 유효성 검사를 진행합니다.
        //
        // 참고 : 로그 서버의 최대 갯수는 5개입니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

        // 로그기능 불능시 ================================================================================================================================================================

            failBlankCheck : function(){

                if(component.failpercent.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '퍼센트 입력은 필수사항 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },

            failPercentCheck : function(){

                if(!component.failpercent.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : ' Percent 범위는 10 ~ 95% 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },

        // HDD 설정 =====================================================================================================================================================================

            hddBlankCheck : function(){

                if(component.hddalram.getValue()){

                    if(component.hddbytevalue.getValue() === null && component.hddinputmod.getValue().mod === 'byte'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'HDD Byte는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.hddpercentvalue.getValue() === null && component.hddinputmod.getValue().mod === 'per'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'HDD Percent는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },

            hddValidCheck : function(){

                if(component.hddalram.getValue()){

                    if(!component.hddbytevalue.validate() && component.hddinputmod.getValue().mod === 'byte'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'HDD Byte의 범위는 0 ~ 2147483646 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.hddpercentvalue.validate() && component.hddinputmod.getValue().mod === 'per'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'HDD Percent의 범위는 1 ~ 94% 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },

        // 로그 백업 설정 ================================================================================================================================================================

            backupBlankCheck : function(){

                if(component.fds_backup.checkboxCmp.getValue()){

                    if(component.backupftpip.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'FTP Server IP 는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backupid.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'ID 는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backuppasswd.getValue() === '' && component.backupselectftp.getValue().server === 'ftp'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Password 는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backupsavepath.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '저장위치는 필수사항 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },

            backupValidCheck : function(){

                if(component.fds_backup.checkboxCmp.getValue()){

                    if(!component.backupftpip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },

        // 업무 네트워크 =================================================================================================================================================================

            workBlankCheck : function(){

                if(component.workgpnip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            workValidCheck : function(){

                if(!component.workgpnip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 Range 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            workDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'member', 'st_logset_ip')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 IP Range 가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _chkRange = component.workgpn_grid.getSelectionModel().getSelection()[0].get('member');

                    if(!duplicationItem(componentValue, 'member', 'st_logset_ip') && _chkRange !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 IP Range 가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 설명 : 로그 설정을 저장합니다. 전체 데이터에서 파라미터를 생성 또는 삭제 작업이 필요하기 때문에 장비 전체 데이터를 참조하여 저장합니다.
        //
        // ============================================================================================================================================================================

        var networkStore = Ext.getStore('st_logset_ip');

        var componentObj = this.componentStorage();

        var logsetData   = this.deviceParams;

        if(!this.validityCheck().failBlankCheck() || !this.validityCheck().failPercentCheck() || !this.validityCheck().hddBlankCheck() ||
           !this.validityCheck().hddValidCheck()  || !this.validityCheck().backupBlankCheck() || !this.validityCheck().backupValidCheck()){

            return false;

        }

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 로그 레벨 초기화 ==============================================================================================================================================================

        logsetData.setting.level.system['@type']  = componentObj.levelsys.getValue();
        logsetData.setting.level.network['@type'] = componentObj.levelnet.getValue();
        logsetData.setting.level.ipsec['@type']   = componentObj.levelvpn.getValue();
        logsetData.setting.level.nac['@type']     = componentObj.levelnac.getValue();
        logsetData.setting.level.waf['@type']     = componentObj.levelwaf.getValue();
        logsetData.setting.level.avas['@type']    = componentObj.levelavs.getValue();
        logsetData.setting.level.dpi['@type']     = componentObj.leveldpi.getValue();
        logsetData.setting.level.anomaly['@type'] = componentObj.leveltraffic.getValue();

        // 로그 기능 수행 불능시 설정 초기화 ===============================================================================================================================================

        logsetData.setting.freeze['@type'] = componentObj.faillog.getValue().act;
        logsetData.setting.freeze['#text'] = componentObj.failpercent.getValue();

        // 로그 플로우 초기화 ============================================================================================================================================================

        logsetData.setting.tcp['@chk_use'] = (componentObj.flowchk.getValue() === true) ? 'on' : 'off';

        // HDD 설정 ====================================================================================================================================================================

        logsetData.setting.optimization['@chk_use'] = (componentObj.hddoptimization.getValue() === true) ? 'on' : 'off';
        logsetData.setting.hddsave['@chk_use']      = (componentObj.hddnonsave.getValue()      === true) ? 'on' : 'off';
        logsetData.setting.session['@chk_use']      = (componentObj.hddsessiondown.getValue()  === true) ? 'on' : 'off';
        logsetData.setting.save['@chk_use']         = (componentObj.hddalram.getValue()        === true) ? 'on' : 'off';
        logsetData.setting.save['@type']            = (componentObj.hddalram.getValue()        === true) ? componentObj.hddinputmod.getValue().mod : '';
        logsetData.setting.save['@value']           = (componentObj.hddalram.getValue()        === true) ? (componentObj.hddinputmod.getValue().mod === 'byte') ? componentObj.hddbytevalue.getValue() :
                                                                                                            componentObj.hddpercentvalue.getValue() : '';

        // 로그 백업 설정 ===============================================================================================================================================================

        logsetData.ftp['@chk_use']                  = (componentObj.fds_backup.checkboxCmp.getValue() === true) ? 'on' : 'off';
        logsetData.ftp['@chk_type']                 = componentObj.backupselectftp.getValue().server;
        logsetData.ftp.ip                           = (componentObj.backupftpip.getValue() === '')  ? null : componentObj.backupftpip.getValue();
        logsetData.ftp.id                           = (componentObj.backupid.getValue() === '')     ? null : componentObj.backupid.getValue();
        logsetData.ftp.password                     = (componentObj.backuppasswd.getValue() === '') ? null : componentObj.backuppasswd.getValue();
        logsetData.ftp.path                         = (componentObj.backupsavepath.getValue() === '') ? null : componentObj.backupsavepath.getValue();

        // 로그 데이터 관리 =============================================================================================================================================================

        logsetData.setting.log_manage.plain_keep    = componentObj.manageday.getValue();
        logsetData.setting.log_manage.comp['@chk_use'] = (componentObj.managecompress.getValue() === true) ? 'on' : 'off';
        logsetData.setting.log_manage.comp['#text'] = componentObj.managetime.getValue();
        logsetData.setting.log_manage.comp['@backup_ftp'] = (componentObj.managebackup.getValue() === true) ? 'on' : 'off';

        // 트래커 =====================================================================================================================================================================

        logsetData.setting.log_manage.tracker['@chk_use'] = (componentObj.trackeruse.getValue() === true) ? 'on' : 'off';

        // 트래커 업데이트 ==============================================================================================================================================================

        logsetData.setting.tracker.update           = componentObj.updatetime.getValue();

        // 업무 네트워크 ================================================================================================================================================================

        var logipCount = networkStore.count();

        if(logipCount){

            if(!deviceAllData.log_setting.network_range){

                deviceAllData.log_setting.network_range = {};

            }

            if(logipCount === 1){

                deviceAllData.log_setting.network_range.member  = {};

                deviceAllData.log_setting.network_range.member = networkStore.getAt(0).get('member');

            }
            else{

                var rangeArray = [];

                for(var i = 0; i < logipCount; i++){

                    rangeArray.push(networkStore.getAt(i).get('member'));

                }

                deviceAllData.log_setting.network_range.member = rangeArray;

            }

        }
        else{

            if(deviceAllData.log_setting.network_range){

                delete deviceAllData.log_setting.network_range.member;

                deviceAllData.log_setting.network_range = null;

            }

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_level = Ext.getStore('st_logset_level');
        var st_network = Ext.getStore('st_logset_ip');

        st_network.removeAll();

        component.workgpn_grid.bindStore(st_network);
    }

});
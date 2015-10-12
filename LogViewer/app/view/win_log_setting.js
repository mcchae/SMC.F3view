
Ext.define('SMC.view.win_log_setting', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    border: false,
    height: 500,
    id: 'win_log_setting',
    width: 700,
    resizable: false,
    title: '설정',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    border: false,
                    height: 40,
                    itemId: 'pnl_log_setting_save',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            height: 24,
                            itemId: 'btn_log_setting_ok',
                            margin: '0 5 0 0',
                            width: 100,
                            iconCls: '',
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_log_setting_okClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            height: 24,
                            itemId: 'btn_log_setting_cancel',
                            margin: '0 0 0 5',
                            width: 100,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onBtn_log_setting_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    border: false,
                    itemId: 'tpn_log_setting',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_log_setting',
                            padding: '10 10 0 10',
                            title: '로그 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'con_log_setting',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            itemId: 'fs_log_setting_company',
                                            title: '서버 정보',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_company',
                                                    margin: '5 0 15 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txf_log_setting_company',
                                                            width: 270,
                                                            fieldLabel: '회사',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' '
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            width: 50
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txf_log_setting_version',
                                                            width: 270,
                                                            fieldLabel: '버전',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' '
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            hidden: true,
                                            itemId: 'fs_log_setting_level',
                                            margin: '10 10 0 10',
                                            width: 150,
                                            title: '로그 레벨',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_level_fw',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_log_setting_level_fwv4',
                                                            fieldLabel: '방화벽 로그',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 125,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_level_fwv4AfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_log_setting_level_fwv6',
                                                            fieldLabel: '방화벽 로그 (IPv6)',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 125,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_level_fwv6AfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_level_ips',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_log_setting_level_ipsv4',
                                                            fieldLabel: 'DPI 로그',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 125,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_level_ipsv4AfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_log_setting_level_ipsv6',
                                                            fieldLabel: 'DPI 로그 (IPv6)',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 125,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_level_ipsv6AfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_level_natpt',
                                                    margin: '5 0 10 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_log_setting_level_natpt',
                                                            margin: '',
                                                            fieldLabel: 'NAT-PT',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 125,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_level_natptAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            itemId: 'fs_log_setting_maintain',
                                            width: 150,
                                            title: '로그 데이터 관리',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_maintain',
                                                    margin: '5 0 15 0',
                                                    header: false,
                                                    title: 'My Panel',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_log_setting_maintain_days',
                                                            width: 270,
                                                            fieldLabel: '로그 데이터 유지기간 ',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 140,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_log_setting_maintain_daysAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            flex: 1,
                                            itemId: 'fs_log_setting_disabled',
                                            title: '로그 기능 불능시 수행 설정',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    itemId: 'pnl_log_setting_disabled',
                                                    margin: '5 0 15 0',
                                                    header: false,
                                                    title: 'My Panel',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'numberfield',
                                                            validator: function(value) {
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                var percent_length = LengthCheck(value, 10, 80);

                                                                if(!percent_length){
                                                                    return ValidLimit(10, 80);
                                                                }
                                                                return true;
                                                            },
                                                            id: 'txf_log_setting_disabled_percent',
                                                            margin: '0 0 0 20',
                                                            width: 60,
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            labelWidth: 0,
                                                            value: 90,
                                                            fieldStyle: 'text-align: right;',
                                                            maxText: ' ',
                                                            maxValue: 80,
                                                            minText: ' ',
                                                            minValue: 10,
                                                            listeners: {
                                                                errorchange: {
                                                                    fn: me.onTxf_log_setting_disabled_percentErrorChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            margin: '0 0 0 5',
                                                            width: 100,
                                                            text: '%인 경우'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            id: 'ck_log_setting_disabled_overwrite',
                                                            fieldLabel: '오래된 로그 덮어쓰기',
                                                            hideLabel: true,
                                                            boxLabel: '오래된 로그 덮어쓰기',
                                                            checked: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            itemId: 'fs_log_setting_server',
                                            width: 150,
                                            title: '다른 로그 서버로 전달',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    border: false,
                                                    header: false,
                                                    title: 'My Panel',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'ck_log_setting_server_relay_use',
                                                            margin: '0 0 0 20',
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            boxLabel: '사용 여부'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            itemId: 'pnl_log_setting_server_relay_host',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_log_setting_server_relay_host',
                                                                    width: 270,
                                                                    fieldLabel: 'host',
                                                                    labelAlign: 'right',
                                                                    labelPad: 10,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            itemId: 'pnl_log_setting_server_relay_port',
                                                            margin: '5 0 15 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_log_setting_server_relay_port',
                                                                    width: 270,
                                                                    fieldLabel: 'port',
                                                                    labelAlign: 'right',
                                                                    labelPad: 10,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    cls: 'fld_msg',
                                    itemId: 'fld_msg',
                                    maxHeight: 24
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_log_settingAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_filtering_setting',
                            title: '필터링 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                padding: 10
                            },
                            tabConfig: {
                                xtype: 'tab',
                                hidden: true
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_search_log_type1',
                                            width: 230,
                                            fieldLabel: '로그 종류',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 60,
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            valueField: 'value',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onId_combo_log_typeAfterRender1,
                                                    scope: me
                                                },
                                                change: {
                                                    fn: me.onCmb_search_log_typeChange1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            width: 230,
                                            fieldLabel: '필터 종류',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 60
                                        },
                                        {
                                            xtype: 'combobox',
                                            margin: '0 0 0 5',
                                            width: 60,
                                            fieldLabel: 'Label',
                                            hideLabel: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            margin: '0 0 0 5',
                                            width: 200,
                                            fieldLabel: 'Label',
                                            hideLabel: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 70,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 70,
                                            text: '수정'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 70,
                                            text: '삭제'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    margin: '5 0 0 0',
                                    title: 'My Grid Panel',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_user_setting',
                            padding: '10 10 0 10',
                            title: '관리자 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'fs_user_settting',
                                    padding: '',
                                    title: '관리자 설정'
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'con_user_setting_1',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(value === undefined){
                                                    return false;
                                                }

                                                if(!CheckNotNull(value)){
                                                    return get_msg('err_null');
                                                }

                                                if(!idCheck(value)){
                                                    return get_msg('err_id');
                                                }

                                                return true;
                                            },
                                            id: 'txf_user_setting_userid',
                                            margin: '0 0 0 5',
                                            width: 320,
                                            fieldLabel: '아이디',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_useridErrorChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'con_user_setting_2',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(value === undefined){
                                                    return false;
                                                }

                                                if(!CheckNotNull(value)){
                                                    return get_msg('err_null');
                                                }

                                                // if(!passwordCheck(value)){
                                                //     return get_msg('err_pw');
                                                // }

                                                //문자+숫자+특수문자 와 자리수 비교 (ux_valid.js에서 처리함)
                                                if(!passwordCheck(value)){ return get_msg('err_pw');}

                                                // 연속된 문자 또는 중복문자 체크 부분 ***
                                                var ret = passwordCheck2(value);
                                                if(ret === 1){ return get_msg('err_pw1');}
                                                if(ret === 2){ return get_msg('err_pw2');}

                                                // 사용자 정보 id/email/phone 정보가 비밀번호에 포함되는지 검사루틴 ***
                                                var userid = Ext.getCmp('txf_user_setting_userid').getValue();
                                                var email = Ext.getCmp('txf_user_setting_email').getValue();
                                                var phone = Ext.getCmp('txf_user_setting_phone').getValue();
                                                if(!passwordCheck3( userid, value)){ return get_msg('err_pw3');}
                                                if(!passwordCheck3( email, value)){ return get_msg('err_pw3');}
                                                if(!passwordCheck3( phone, value)){ return get_msg('err_pw3');}

                                                return true;
                                            },
                                            id: 'txf_user_setting_passwd',
                                            margin: '0 0 0 5',
                                            width: 320,
                                            fieldLabel: '비밀번호',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            inputType: 'password',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_passwdErrorChange,
                                                    scope: me
                                                },
                                                focus: {
                                                    fn: me.onTxf_user_setting_passwdFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(value === undefined){
                                                    return false;
                                                }

                                                if(!CheckNotNull(value)){
                                                    return get_msg('err_null');
                                                }

                                                // if(!passwordCheck(value)){
                                                //     return get_msg('err_pw');
                                                // }

                                                //문자+숫자+특수문자 와 자리수 비교 (ux_valid.js에서 처리함)
                                                if(!passwordCheck(value)){ return get_msg('err_pw');}

                                                // 연속된 문자 또는 중복문자 체크 부분 ***
                                                var ret = passwordCheck2(value);
                                                if(ret === 1){ return get_msg('err_pw1');}
                                                if(ret === 2){ return get_msg('err_pw2');}

                                                // 사용자 정보 id/email/phone 정보가 비밀번호에 포함되는지 검사루틴 ***
                                                var userid = Ext.getCmp('txf_user_setting_userid').getValue();
                                                var email = Ext.getCmp('txf_user_setting_email').getValue();
                                                var phone = Ext.getCmp('txf_user_setting_phone').getValue();
                                                if(!passwordCheck3( userid, value)){ return get_msg('err_pw3');}
                                                if(!passwordCheck3( email, value)){ return get_msg('err_pw3');}
                                                if(!passwordCheck3( phone, value)){ return get_msg('err_pw3');}

                                                return true;

                                            },
                                            id: 'txf_user_setting_passwd2',
                                            width: 320,
                                            fieldLabel: '비밀번호 확인',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            inputType: 'password',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_passwd2ErrorChange,
                                                    scope: me
                                                },
                                                focus: {
                                                    fn: me.onTxf_user_setting_passwd2Focus,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'con_user_setting_3',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {

                                                if(!CheckNotNull(value)){
                                                    return get_msg('err_null');
                                                }

                                                // if(parseInt(value) === 0){ return true; }

                                                // if(!LengthCheck(value, 7, 365)){ return ValidLimit(7, 365); }

                                                if(!LengthCheck(value, 7, 90)){ return ValidLimit(7, 90); }

                                                return true;
                                            },
                                            id: 'txf_user_setting_passdays',
                                            margin: '0 0 0 5',
                                            width: 320,
                                            fieldLabel: '비밀번호 유효기간',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            value: 90,
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_passdaysErrorChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'con_user_setting_4',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(!CheckNotNull(value)){
                                                    return true;
                                                }

                                                if(!ValidEmail(value)){
                                                    return get_msg('err_email');
                                                }

                                                return true;

                                            },
                                            id: 'txf_user_setting_email',
                                            margin: '0 0 0 5',
                                            width: 320,
                                            fieldLabel: 'E-Mail',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_emailErrorChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(!CheckNotNull(value)){ return true; }

                                                if(!ValidTel(value)){ return get_msg('err_tel');}

                                                return true;
                                            },
                                            id: 'txf_user_setting_phone',
                                            width: 320,
                                            fieldLabel: '연락처',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_phoneErrorChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    itemId: 'con_user_setting_5',
                                    margin: '5 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {

                                                if(value === ""){

                                                    return true;

                                                }else{

                                                    var _value = value.split(/, | |,/);

                                                    if(_value.length  > 2) return get_msg('err_ipCount_2');

                                                    if(!ValidTotalIp(_value)){ return get_msg('err_ip');}

                                                }

                                                return true;

                                            },
                                            id: 'txf_user_setting_trustedhost',
                                            margin: '0 0 0 5',
                                            width: 320,
                                            fieldLabel: 'Trusted Host',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 110,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTxf_user_setting_trustedhostErrorChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'mt_info',
                                            id: 'lab_mt_info',
                                            margin: '0 0 0 10',
                                            text: '\',\' 로 구분하여 2개까지 지정할 수 있습니다. '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'con_user_setting_6',
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'errorBox',
                                            id: 'lab_error_box'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btn_user_setting_add',
                                            width: 80,
                                            text: '추가',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_user_setting_addClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btn_user_setting_mod',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_user_setting_modClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btn_user_setting_del',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_user_setting_delClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    id: 'pnl_user_setting_user_list',
                                    margin: '5 0 10 0',
                                    autoScroll: true,
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'id_store_log_user',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'userid',
                                            text: '아이디',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 130,
                                            align: 'center',
                                            dataIndex: 'pass_days',
                                            text: '비밀번호 유효기간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 150,
                                            dataIndex: 'email',
                                            text: 'E-Mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 110,
                                            dataIndex: 'phone',
                                            text: '연락처',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            width: 150,
                                            dataIndex: 'trusted_host',
                                            text: 'Trusted Host',
                                            flex: 1
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.RowModel', {

                                    }),
                                    listeners: {
                                        selectionchange: {
                                            fn: me.onPnl_user_setting_user_listSelectionChange,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_log_setting_okClick: function(button, e, eOpts) {
        if(!Ext.getCmp('txf_log_setting_disabled_percent').validate()){
           return false;
        }

        //로그 설정 - 저장
        var _params = {
            'company': Ext.encode(Ext.getCmp('txf_log_setting_company').getValue()),
            'maintain_days': Ext.encode(Ext.getCmp('cmb_log_setting_maintain_days').getValue()),

            'disabled_percent':  Ext.encode(Ext.getCmp('txf_log_setting_disabled_percent').getValue()),
            'disabled_overwrite': Ext.encode(Ext.getCmp('ck_log_setting_disabled_overwrite').getValue()),

            'relay_use': Ext.encode(Ext.getCmp('ck_log_setting_server_relay_use').getValue()),
            'relay_host':  Ext.encode(Ext.getCmp('txf_log_setting_server_relay_host').getValue()),
            'relay_port': Ext.encode(Ext.getCmp('txf_log_setting_server_relay_port').getValue()),
            'company': Ext.encode(Ext.getCmp('txf_log_setting_company').getValue())
        };

        Ext.Ajax.request({
            url : 'api/FtIFMgr/setConfig',
            params : _params,
            method : 'POST',
            success : function(response){

                var result = Ext.decode(response.responseText);
                //console.log('log_setting_params ->', _params);

                Ext.getCmp('win_log_setting').destroy();
            }
        });
    },

    onBtn_log_setting_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_log_setting').destroy();
    },

    onCmb_log_setting_level_fwv4AfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"Debug"},
                {"value":"2", "name":"Information"},
                {"value":"3", "name":"Normal"},
                {"value":"4", "name":"Warning"},
                {"value":"5", "name":"Serious"},
                {"value":"6", "name":"Critical"}
            ]
        });

        component.bindStore(store);
        component.setValue('1');
    },

    onCmb_log_setting_level_fwv6AfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"Debug"},
                {"value":"2", "name":"Information"},
                {"value":"3", "name":"Normal"},
                {"value":"4", "name":"Warning"},
                {"value":"5", "name":"Serious"},
                {"value":"6", "name":"Critical"}
            ]
        });

        component.bindStore(store);
        component.setValue('1');
    },

    onCmb_log_setting_level_ipsv4AfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"Debug"},
                {"value":"2", "name":"Information"},
                {"value":"3", "name":"Normal"},
                {"value":"4", "name":"Warning"},
                {"value":"5", "name":"Serious"},
                {"value":"6", "name":"Critical"}
            ]
        });

        component.bindStore(store);
        component.setValue('1');
    },

    onCmb_log_setting_level_ipsv6AfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"Debug"},
                {"value":"2", "name":"Information"},
                {"value":"3", "name":"Normal"},
                {"value":"4", "name":"Warning"},
                {"value":"5", "name":"Serious"},
                {"value":"6", "name":"Critical"}
            ]
        });

        component.bindStore(store);
        component.setValue('1');
    },

    onCmb_log_setting_level_natptAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"Debug"},
                {"value":"2", "name":"Information"},
                {"value":"3", "name":"Normal"},
                {"value":"4", "name":"Warning"},
                {"value":"5", "name":"Serious"},
                {"value":"6", "name":"Critical"}
            ]
        });

        component.bindStore(store);
        component.setValue('1');
    },

    onCmb_log_setting_maintain_daysAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":7, "name":"7일"},
                {"value":14, "name":"14일"},
                {"value":30, "name":"30일"},
                {"value":60, "name":"60일"},
                {"value":90, "name":"90일"},
                {"value":0, "name":"기간제한없음"}
            ]
        });

        component.bindStore(store);
        component.setValue(30);
    },

    onTxf_log_setting_disabled_percentErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onPnl_log_settingAfterRender: function(component, eOpts) {

        Ext.Ajax.request(
            {
                url : 'api/FtIFMgr/getConfig',

                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

        //             console.log('getConfig:resObj ->', resObj.retval);

                    if(resObj.retcode)
                    {
                        Ext.getCmp('txf_log_setting_company').setValue(resObj.retval.company);
                        Ext.getCmp('cmb_log_setting_maintain_days').setValue(resObj.retval.maintain_days);

                        Ext.getCmp('txf_log_setting_disabled_percent').setValue(resObj.retval.disabled_percent);
                        Ext.getCmp('ck_log_setting_disabled_overwrite').setValue(resObj.retval.disabled_overwrite);


                        Ext.getCmp('ck_log_setting_server_relay_use').setValue(resObj.retval.relay_use);

                        Ext.getCmp('txf_log_setting_server_relay_host').setValue(resObj.retval.relay_host);
                        Ext.getCmp('txf_log_setting_server_relay_port').setValue(resObj.retval.relay_port);
                    }
                }
            }
        );

        Ext.Ajax.request(
            {
                url : 'api/FtIFMgr/getVersion',

                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    if(resObj.retcode)
                    {
                        Ext.getCmp('txf_log_setting_version').setValue(resObj.retval);
                    }
                }
            }
        );
    },

    onId_combo_log_typeAfterRender1: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"FW_V4", "name":"방화벽 로그"},
                {"value":"FW_V6", "name":"방화벽 로그 (IPv6)"},
                {"value":"NAT_PT", "name":"NAT-PT 로그"},
                {"value":"IPS_V4", "name":"DPI 로그"},
                {"value":"IPS_V6", "name":"DPI 로그 (IPv6)"}
            ]
        });

        component.bindStore(store);
        component.setValue('FW_V4');
    },

    onCmb_search_log_typeChange1: function(field, newValue, oldValue, eOpts) {
        var pnl_search_log = Ext.getCmp('pnl_log_view').down('#pnl_search_log');

        // 상세 조건 타입
        var pnl_search_log_detail_combo = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]');

        var cmb_search_log_detail_type = pnl_search_log_detail_combo.down('[itemId=cmb_search_log_detail_type]');

        var store_fw = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
        //         {"value":"natsip", "name":"NAT출발지주소"},
        //         {"value":"natsport", "name":"NAT출발지포트"},
        //         {"value":"natdip", "name":"NAT목적지주소"},
        //         {"value":"natdport", "name":"NAT목적지포트"},
                {"value":"protocol", "name":"프로토콜"},
                {"value":"uid", "name":"UID"}
        //         {"value":"userid", "name":"USER ID"},
        //         {"value":"appid", "name":"APP ID"},
        //         {"value":"description", "name":"정보"}
            ]
        });

        var store_nat = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
        //         {"value":"natsip", "name":"NAT출발지주소"},
        //         {"value":"natsport", "name":"NAT출발지포트"},
        //         {"value":"natdip", "name":"NAT목적지주소"},
        //         {"value":"natdport", "name":"NAT목적지포트"},
                {"value":"protocol", "name":"프로토콜"}
        //         {"value":"description", "name":"정보"}
            ]
        });

        var store_dpi = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"protocol", "name":"프로토콜"},
                {"value":"uid", "name":"UID"}
        //         {"value":"priority", "name":"위험도"},
        //         {"value":"patterngroup", "name":"패턴그룹"},
        //         {"value":"dpigroup", "name":"DPI그룹"},
        //         {"value":"fsid", "name":"FSID"},
        //         {"value":"description", "name":"정보"}
            ]
        });


        if(newValue === 'NAT_PT')
        {
            cmb_search_log_detail_type.bindStore(store_nat);
            cmb_search_log_detail_type.setValue("sip");
        }
        else if(newValue === 'IPS_V4' || newValue === 'IPS_V6')
        {
            cmb_search_log_detail_type.bindStore(store_dpi);
            cmb_search_log_detail_type.setValue("sip");
        }
        else //fw
        {
            cmb_search_log_detail_type.bindStore(store_fw);
            cmb_search_log_detail_type.setValue("sip");
        }
    },

    onPanelAfterRender: function(component, eOpts) {

        Ext.Ajax.request(
            {
                url : 'api/FtIFMgr/getUsers',

                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    //console.log('resObj ->', resObj.retval);

                    if(resObj.retcode)
                    {
                        var items = resObj.retval;
                        var records = [];

                        for(var i in items)
                        {
                            var trusted_host = '';

                            for(var j=0;j<items[i].trusted_hosts.length;j++)
                            {
                                if(trusted_host !== '')
                                    trusted_host += ',';

                                trusted_host += items[i].trusted_hosts[j];
                            }

                            records.push({

                                userid : items[i].userid,
                                passwd : items[i].md_passwd,
                                pass_days : items[i].pass_days,
                                email : items[i].email,
                                phone : items[i].phone,
                                trusted_host : trusted_host

        //                         authorization_set : false,
        //                         authorization_log : false,
        //                         authorization_mon : true,
        //                         role : items[i].role,
        //                         otp_check : items[i].otp_check

                            });

                        }

                        if(Ext.getCmp('pnl_user_setting_user_list'))
                        {
                            var store = Ext.getCmp('pnl_user_setting_user_list').getStore();

                            store.loadData(records);
                        }

                    }//result true
                }
            }
        );
    },

    onTxf_user_setting_useridErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_passwdErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_passwdFocus: function(component, e, eOpts) {

        if(component.value === '')
        {
            Ext.getCmp('txf_user_setting_passwd').setValue('');
            Ext.getCmp('txf_user_setting_passwd').focus();
        }
    },

    onTxf_user_setting_passwd2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_passwd2Focus: function(component, e, eOpts) {

        if(component.value === '')
        {
            Ext.getCmp('txf_user_setting_passwd2').setValue('');
            Ext.getCmp('txf_user_setting_passwd2').focus();
        }
    },

    onTxf_user_setting_passdaysErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_emailErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_phoneErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onTxf_user_setting_trustedhostErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "lab_error_box");
    },

    onBtn_user_setting_addClick: function(button, e, eOpts) {
        var userid = Ext.getCmp('txf_user_setting_userid');

        var passwd = Ext.getCmp('txf_user_setting_passwd');
        var passwd2 = Ext.getCmp('txf_user_setting_passwd2');

        var email = Ext.getCmp('txf_user_setting_email').getValue();
        var phone = Ext.getCmp('txf_user_setting_phone').getValue();
        var pass_days = Ext.getCmp('txf_user_setting_passdays').getValue();
        var trusted_host = Ext.getCmp('txf_user_setting_trustedhost').getValue();

        if( userid.getValue() === '' )
        {
            prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
            userid.focus();
            return false;
        }

        if( passwd.getValue() === '' )
        {
            prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
            passwd.focus();
            return false;
        }

        if( passwd2.getValue() === '' )
        {
            prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
            passwd2.focus();
            return false;
        }

        if( passwd.getValue() !== passwd2.getValue() ){

            prt_errMsg("비밀번호가 일치하지 않습니다.", "lab_error_box");
            passwd2.focus();
            return false;
        }

        //관리자 리스트에 추가
        if( userid.wasValid === true || passwd.wasValid === true || passwd2.wasValid === true )
        {
            var store = Ext.getCmp('pnl_user_setting_user_list').getStore();

            var user_list = store.data.items;

            for(var i=0;i<user_list.length;i++) {

                if(user_list[i].raw.userid === Ext.getCmp('txf_user_setting_userid').getValue())
                {
                    Ext.MessageBox.show({
                        title: "중복 확인",
                        msg: "중복된 아이디가 존재합니다.",
                        buttons: Ext.MessageBox.OK,
                        fn: function(buttonId) {
                            if (buttonId === "ok") {
                                Ext.getCmp('txf_user_setting_userid').focus();
                            }
                        }
                    });

                    return;
                }
            }

            var trusted_hosts = trusted_host.split(/, | |,/);

            if(trusted_hosts[0] === ""){

                trusted_hosts = [];
            }

            //관리자 설정 - 추가
            Ext.MessageBox.show({
                title: "관리자 추가",
                msg: "관리자를 추가하시겠습니까?",
                buttons: Ext.MessageBox.OKCANCEL,
                fn: function(buttonId) {
                    if (buttonId === "ok") {

                        var _params = {

                                orig_userid : Ext.encode(''),
                                userid : Ext.encode(userid.getValue()),
                                passwd : Ext.encode(passwd.getValue()),
                                pass_days : Ext.encode(pass_days),

                                email : Ext.encode(email),
                                phone : Ext.encode(phone)
                                //trusted_hosts : Ext.encode(trusted_hosts)
                                //                     authorization_set : Ext.encode(false),
                                //                     authorization_log : Ext.encode(false),
                                //                     authorization_mon : Ext.encode(true),
                                //                     role : Ext.encode(5),
                                //                     otp_check : Ext.encode(false)

                        };

                        //console.log('add_user_params ->', _params);

                        request_helper.xmlrpc_call_JsonP(
                            'FtIFMgr',
                            'modUser',
                            _params,
                            function(response){

                                var result = Ext.decode(response.responseText);
                                //console.log('add_user_params 2 ->', _params);

                                store.add({

                                    userid: userid.getValue(),
                                    passwd: passwd.getValue(),
                                    email: email,
                                    phone: phone,
                                    pass_days: pass_days
                                    //trusted_host: trusted_host

                                });

                            }

                        );
                    }
                }
            });
        }

    },

    onBtn_user_setting_modClick: function(button, e, eOpts) {

        var user_list = Ext.getCmp('pnl_user_setting_user_list');

        // 선택된 row 가 존재하면
        if (user_list.getSelectionModel().hasSelection()) {

            var row = user_list.getSelectionModel().getSelection()[0];

            //필수 항목 검사
            var userid = Ext.getCmp('txf_user_setting_userid');

            var passwd = Ext.getCmp('txf_user_setting_passwd');
            var passwd2 = Ext.getCmp('txf_user_setting_passwd2');

            var email = Ext.getCmp('txf_user_setting_email').getValue();
            var phone = Ext.getCmp('txf_user_setting_phone').getValue();
            var pass_days = Ext.getCmp('txf_user_setting_passdays').getValue();
            var trusted_host = Ext.getCmp('txf_user_setting_trustedhost').getValue();

            if(userid.getValue() === '')
            {
                prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
                userid.focus();
                return false;
            }

            if(passwd.getValue() === '')
            {
                prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
                passwd.focus();
                return false;
            }

            if(passwd2.getValue() === '')
            {
                prt_errMsg("필수 입력 항목입니다.", "lab_error_box");
                passwd2.focus();
                return false;
            }

            if( passwd.getValue() !== passwd2.getValue()){

                prt_errMsg("비밀번호가 일치하지 않습니다.", "lab_error_box");
                passwd2.focus();
                return false;
            }

            //관리자 리스트에 추가
            if( userid.wasValid === true || passwd.wasValid === true || passwd2.wasValid === true )
            {
                //ID, PW
                var orig_userid = 'None';

                orig_userid = row.get('userid');
                if(Ext.getCmp('txf_user_setting_passwd').getValue() === 'asdf!@#$12345678asdf!@#$1234567')
                {
                    passwd.setValue(row.get('md_passwd'));
                }

                var store = user_list.getStore();
                var index = store.indexOf(row);

                var trusted_hosts = trusted_host.split(/, | |,/);

                if(trusted_hosts[0] === ""){

                    trusted_hosts = [];
                }

                //관리자 설정 - 수정
                Ext.MessageBox.show({
                    title: "관리자 수정",
                    msg: "선택된 관리자를 수정하시겠습니까?",
                    buttons: Ext.MessageBox.OKCANCEL,
                    fn: function(buttonId) {
                        if (buttonId === "ok") {
                            var _params = {

                                orig_userid : Ext.encode(orig_userid),
                                userid : Ext.encode(userid.getValue()),
                                passwd : Ext.encode(passwd.getValue()),
                                pass_days : Ext.encode(pass_days),

                                email : Ext.encode(email),
                                phone : Ext.encode(phone)
                                //trusted_hosts : Ext.encode(trusted_hosts)
                                //                     authorization_set : Ext.encode(false),
                                //                     authorization_log : Ext.encode(false),
                                //                     authorization_mon : Ext.encode(true),
                                //                     role : Ext.encode(5),
                                //                     otp_check : Ext.encode(false)

                            };

                            //console.log('mod_user_params ->', _params);

                            request_helper.xmlrpc_call_JsonP(
                                'FtIFMgr',
                                'modUser',
                                _params,
                                function(response){

                                    var result = Ext.decode(response.responseText);
                                    //console.log('mod_user_params 2 ->', _params);

                                    var records = store.getAt(index);

                                    records.set("orig_userid", orig_userid);
                                    records.set("userid", userid.getValue());
                                    records.set("passwd", passwd.getValue());
                                    records.set("email", email);
                                    records.set("phone", phone);
                                    records.set("pass_days", pass_days);
                                    //records.set("trusted_host", trusted_host);
                                }
                            );
                        }
                    }
                });
            }//endif
        }//row selection
    },

    onBtn_user_setting_delClick: function(button, e, eOpts) {
        var user_list = Ext.getCmp('pnl_user_setting_user_list');

        var store = user_list.getStore();

        var selection = user_list.getSelectionModel().getSelection()[0];

        if (selection) {

            Ext.MessageBox.show({
                title: "관리자 삭제",
                msg: "선택된 관리자를 삭제하시겠습니까?",
                buttons: Ext.MessageBox.OKCANCEL,
                fn: function(buttonId) {
                    if (buttonId === "ok") {
                        var _params = {

                            userid : Ext.encode(selection.data.userid)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'FtIFMgr',
                            'delUser',
                            _params,
                            function(response){

                                //console.log('delete user 2 ->', selection);
                                store.remove(selection);
                            }

                        );
                    }
                }
            });
        }








    },

    onPnl_user_setting_user_listSelectionChange: function(model, selected, eOpts) {

        if(selected.length > 0)
        {
            Ext.getCmp('txf_user_setting_userid').setValue(selected[0].data.userid);
            Ext.getCmp('txf_user_setting_passwd').setValue(selected[0].data.passwd);
            Ext.getCmp('txf_user_setting_passwd2').setValue(selected[0].data.passwd);
            Ext.getCmp('txf_user_setting_passdays').setValue(selected[0].data.pass_days);

            Ext.getCmp('txf_user_setting_email').setValue(selected[0].data.email);
            Ext.getCmp('txf_user_setting_phone').setValue(selected[0].data.phone);
            Ext.getCmp('txf_user_setting_trustedhost').setValue(selected[0].data.trusted_host);
        }
    }

});
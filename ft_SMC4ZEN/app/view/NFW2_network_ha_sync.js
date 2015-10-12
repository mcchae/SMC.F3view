
Ext.define('SMC4ZEN.view.NFW2_network_ha_sync', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_sync',

    requires: [
        'SMC4ZEN.view.NFW2_network_ha_syncViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.Img',
        'Ext.button.Button',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_sync'
    },
    // cls: 'zen_body',
    id: 'NFW2_network_ha_sync',
    margin: '8 0 0 0',
    ui: 'footer',
    width: 900,
    defaultListenerScope: true,
    overflowY : 'auto',
    listeners: {
        destroy: 'onNFW2_network_ha_syncDestroy',
        afterrender: 'onPanelAfterRender',
        beforeclose: 'saveData'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            title: '동기화 설정',
            items: [
                {
                    xtype: 'fieldset',
                    id: 'sync_line_set',
                    items: [
                        {
                            xtype: 'container',
                            hidden: true,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'sync_line_chk1',
                                    margin: '0 0 0 10',
                                    fieldLabel: '사용',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    listeners: {
                                        change: 'onSync_line_chkChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'sync_line_con',
                            margin: '8 0 0 0',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'sync_line_inter',
                                    margin: '0 0 0 10',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var main = Ext.getCmp('NFW2_network_ha_sync');
                                                if(value !== true){
                                                    var dstip = ValidIPAddress(value);
                                                    var dstipv6 = ValidIPv6(value);
                                                    var nullChk = CheckNotNull(value);

                                                    main.ipv = "v4";

                                                    if(!nullChk){ return get_msg('err_null'); }
                                                    else if(!dstip){
                                                        if(!dstipv6){
                                                            return get_msg('err_ip');
                                                        }
                                                        main.ipv = "v6";
                                                    }
                                                }
                                                return true;
                                            },
                                            id: 'sync_line_ip',
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            maskRe: /[0-9.]/,
                                            bind: {
                                                fieldLabel: '{dest_ip}'
                                            },
                                            listeners: {
                                                errorchange: 'onSync_line_ipErrorChange',
                                                blur: 'onSync_line_ipBlur',
                                                focus: 'onSync_line_ipFocus',
                                                keydown: 'onSync_line_ipKeydown'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidMAC(value)){ return get_msg('err_form'); }
                                                }
                                                return true;
                                            },
                                            id: 'sync_line_mac',
                                            labelCls: 'lb_req',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 17,
                                            bind: {
                                                fieldLabel: '{dest_mac}'
                                            },
                                            listeners: {
                                                errorchange: 'onSync_line_macErrorChange',
                                                blur: 'onSync_line_macBlur',
                                                keydown: 'onSync_line_macKeydown'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onContainerBeforeRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    id: 'session_sync_set',
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            hidden: true,
                            id: 'session_chk_con',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'session_sync_chk1',
                                    margin: '0 0 0 10',
                                    fieldLabel: '사용',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    listeners: {
                                        change: 'onSession_sync_chkChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'session_sync_con',
                            margin: '0 0 5 0 ',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'session_sync_mode',
                                    margin: '8 0 10 10',
                                    width: 200,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_session_sync_list',
                                    valueField: 'mode',
                                    bind: {
                                        fieldLabel: '{mode}'
                                    },
                                    listeners: {
                                        afterrender: 'onSession_sync_modeAfterRender',
                                        change: 'onSession_sync_modeChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    hidden: true,
                                    id: 'session_label',
                                    margin: '11 0 0 5',
                                    text: '성능 최적화 동기화 방식'
                                },
                                {
                                    xtype: 'image',
                                    flex: 1,
                                    margin: '13 0 0 5',
                                    maxHeight: 15,
                                    maxWidth: 15,
                                    src: '../resources/images/b_help.png',
                                    listeners: {
                                        render: 'click'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'mt_info',
                                    hidden: true,
                                    id: 'session_mode_label',
                                    margin: '11 0 0 5'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onSession_sync_setBeforeRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    id: 'edit_sync_set',
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            hidden: true,
                            id: 'edit_chk_con',
                            margin: '0 0 8 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'edit_sync_chk1',
                                    margin: '0 0 0 10',
                                    fieldLabel: '사용',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    boxLabelAlign: 'before',
                                    listeners: {
                                        change: 'onEdit_sync_chkChange'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    hidden: true,
                                    id: 'btn_accept',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '즉시 실행',
                                    listeners: {
                                        click: 'onBtn_acceptClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'edit_sync_con',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'edit_sync_mode',
                                            margin: '0 0 0 10',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'store_config_sync_list',
                                            valueField: 'mode',
                                            bind: {
                                                fieldLabel: '{mode}'
                                            },
                                            listeners: {
                                                afterrender: 'onEdit_sync_modeAfterRender',
                                                change: 'onEdit_sync_modeChange'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    margin: '8 0 8 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'edit_sync_time_chk',
                                            fieldLabel: '실행 주기',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            listeners: {
                                                change: 'onEidt_sync_time_chkChange'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            disabled: true,
                                            id: 'edit_sync_date_con',
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'edit_sync_day',
                                                    margin: '0 0 0 5',
                                                    maxWidth: 100,
                                                    labelSeparator: ' ',
                                                    labelWidth: 30,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_ha_sync_day',
                                                    valueField: 'value'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    text: '일'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'edit_sync_hour',
                                                    margin: '0 0 0 5',
                                                    maxWidth: 100,
                                                    labelSeparator: ' ',
                                                    labelWidth: 30,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'hour',
                                                    queryMode: 'local',
                                                    store: 'store_ha_sync_hour',
                                                    valueField: 'hour'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    text: '시간'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'edit_sync_minute',
                                                    margin: '0 0 0 5',
                                                    maxWidth: 100,
                                                    labelSeparator: ' ',
                                                    labelWidth: 30,
                                                    msgTarget: 'none',
                                                    editable: false,
                                                    displayField: 'minute',
                                                    queryMode: 'local',
                                                    store: 'store_ha_sync_minute',
                                                    valueField: 'minute'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    text: '분'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    text: '남은 시간'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    hidden: true,
                                                    id: 'time_set',
                                                    margin: '3 0 0 5'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 10',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'btn_allchk',
                                            bind: {
                                                text: '{all_sel_desel}'
                                            },
                                            listeners: {
                                                click: 'onBtn_allchkClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'btn_allcancel',
                                            margin: '0 0 0 5',
                                            bind: {
                                                text: '{reset_op}'
                                            },
                                            listeners: {
                                                click: 'onBtn_allcancelClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'edit_sync_chk_con',
                                    margin: '8 0 10 20',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 115,
                                                    bind: {
                                                        text: '{fw}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'firewall_filter',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onFirewall_filterChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    width: 150,
                                                    bind: {
                                                        text: '{sec_policy}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'firewall_nat'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '3 0 0 5',
                                                    width: 100,
                                                    bind: {
                                                        text: '{nat_policy}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 115,
                                                    bind: {
                                                        text: '{ips}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ips_set'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{setting_ips}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 115,
                                                    bind: {
                                                        text: '{ipsec}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ipsec_set'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{setting_ipsec}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 115,
                                                    bind: {
                                                        text: '{log}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'log_log'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{setting_log}'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    hidden: true,
                                                    id: 'log_syslog',
                                                    width: 120,
                                                    labelSeparator: ' ',
                                                    boxLabel: 'SYSLOG 설정'
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    hidden: true,
                                                    id: 'log_alram',
                                                    boxLabel: '알람 설정'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onEdit_sync_setBeforeRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    id: 'log_sync_set',
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            hidden: true,
                            id: 'log_chk_con',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'log_sync_chk1',
                                    margin: '0 0 0 10',
                                    fieldLabel: '사용',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    listeners: {
                                        change: 'onLog_sync_chkChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'log_sync_con',
                            margin: '8 0 8 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'log_sync_mode',
                                    margin: '0 0 0 10',
                                    maxWidth: 300,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    value: 'MASTER-MASTER',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_log_sync_list',
                                    valueField: 'num',
                                    bind: {
                                        fieldLabel: '{mode}'
                                    },
                                    listeners: {
                                        afterrender: 'onLog_sync_modeAfterRender',
                                        change: 'onLog_sync_modeChange'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'log_sync_mm_con',
                                    margin: '8 0 10 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    margin: '0 0 0 10',
                                                    width: 125,
                                                    bind: {
                                                        text: '{device_name}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var sla_name = Ext.getCmp('log_sla_name');
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(sla_name.getValue() === value){ return get_msg('err_namedob');}
                                                        }
                                                        return true;
                                                    },
                                                    id: 'log_mas_name',
                                                    width: 350,
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    listeners: {
                                                        errorchange: 'onLog_mas_nameErrorChange',
                                                        blur: 'onLog_mas_nameBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    margin: '0 0 0 10',
                                                    width: 125,
                                                    bind: {
                                                        text: '{tar_device_name}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var mas_name = Ext.getCmp('log_mas_name');
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(mas_name.getValue() === value){ return get_msg('err_namedob');}
                                                        }
                                                        return true;
                                                    },
                                                    id: 'log_sla_name',
                                                    width: 350,
                                                    labelSeparator: ' ',
                                                    labelWidth: 150,
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    listeners: {
                                                        errorchange: 'onLog_sla_nameErrorChange',
                                                        blur: 'onLog_sla_nameBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '8 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 20',
                                                    maxWidth: 130,
                                                    width: 130,
                                                    bind: {
                                                        text: '{tar_device_port}'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '509'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    hidden: true,
                                    id: 'log_sync_ms_con',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'log_mas_radio',
                                                    checked: true,
                                                    listeners: {
                                                        change: 'onLog_mas_radioChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{setting_master}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'ms_sync_port_con',
                                            margin: '8 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 20',
                                                    width: 130,
                                                    bind: {
                                                        text: '{sync_port}'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '509'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'ms_mac_name_con',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    margin: '0 0 0 10',
                                                    width: 125,
                                                    bind: {
                                                        text: '{device_name_master}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var sla_name = Ext.getCmp('log_sla_mac_name');
                                                        var mas_chk = Ext.getCmp('log_mas_radio');
                                                        if(value !== true){
                                                            if(mas_chk.checked){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(sla_name.getValue() === value){ return get_msg('err_namedob');}
                                                            }
                                                        }
                                                        return true;
                                                    },
                                                    id: 'log_mas_mac_name',
                                                    width: 350,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    listeners: {
                                                        errorchange: 'onLog_mas_mac_nameErrorChange',
                                                        blur: 'onLog_mas_mac_nameBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            id: 'ms_sla_name_con',
                                            margin: '8 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    margin: '0 0 0 10',
                                                    width: 125,
                                                    bind: {
                                                        text: '{device_name_slave}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var mas_name = Ext.getCmp('log_mas_mac_name');
                                                        var mas_chk = Ext.getCmp('log_mas_radio');
                                                        if(value !== true){
                                                            if(mas_chk.checked){
                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                if(mas_name.getValue() === value){ return get_msg('err_namedob');}
                                                            }
                                                        }
                                                        return true;
                                                    },
                                                    id: 'log_sla_mac_name',
                                                    width: 350,
                                                    labelSeparator: ' ',
                                                    labelWidth: 150,
                                                    msgTarget: 'none',
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    listeners: {
                                                        errorchange: 'onLog_sla_mac_nameErrorChange',
                                                        blur: 'onLog_sla_mac_nameBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '8 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'log_sla_radio',
                                                    listeners: {
                                                        change: 'onLog_sla_radioChange'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{setting_slave}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            disabled: true,
                                            id: 'sla_sync_port_con',
                                            margin: '8 0 18 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 20',
                                                    width: 130,
                                                    bind: {
                                                        text: '{sync_port}'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '509'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        beforerender: 'onLog_sync_setBeforeRender'
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }//,
                // {
                //     xtype: 'button',
                //     cls: 'ft_confirm',
                //     iconCls: 'ft_confirm_icl',
                //     bind: {
                //         text: '{confirm}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick'
                //     }
                // },
                // {
                //     xtype: 'button',
                //     cls: 'ft_cancel',
                //     bind: {
                //         text: '{cancel}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick1'
                //     }
                // }
            ]
        }
    ],

    onNFW2_network_ha_syncDestroy: function(component, eOpts) {
        var me = this;
        //clearInterval(me.interval);
    },

    onSync_line_chkChange: function(field, newValue, oldValue, eOpts) {
        var session = Ext.getCmp("session_sync_set");
        var edit = Ext.getCmp("edit_sync_set");
        var log = Ext.getCmp("log_sync_set");
        var sync_con = Ext.getCmp('sync_line_con');
        var session_chk = Ext.getCmp('session_sync_chk');
        var edit_chk = Ext.getCmp('edit_sync_chk');
        var log_chk = Ext.getCmp('log_sync_chk');
        var time_chk = Ext.getCmp('edit_sync_time_chk');

        if(newValue){
            Ext.getCmp("session_chk_con").enable();
            Ext.getCmp("log_chk_con").enable();
            Ext.getCmp("edit_chk_con").enable();
            sync_con.enable();
            session.enable();
            edit.enable();
            log.enable();
        }
        else{
            Ext.getCmp("session_chk_con").disable();
            Ext.getCmp("edit_chk_con").disable();
            Ext.getCmp("log_chk_con").disable();
            sync_con.disable();
            session.disable();
            edit.disable();
            log.disable();
            Ext.getCmp("chk_radius").state = true;
            Ext.getCmp("chk_radius").moveHandle(true);
            session_chk.setValue(false);
            edit_chk.setValue(false);
            log_chk.setValue(false);
            time_chk.setValue(false);
        }
    },

    onSync_line_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSync_line_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('sync_line_ip').validateValue(true);
    },

    onSync_line_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onSync_line_ipKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onSync_line_macErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSync_line_macBlur: function(component, event, eOpts) {
        Ext.getCmp('sync_line_mac').validateValue(true);
    },

    onSync_line_macKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onContainerBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('line_sync'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'sync_line_use',
            style:'margin-left:765px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var session = Ext.getCmp("session_sync_set");
                    var edit = Ext.getCmp("edit_sync_set");
                    var log = Ext.getCmp("log_sync_set");
                    var sync_con = Ext.getCmp('sync_line_con');
                    var session_chk = Ext.getCmp('session_sync_chk');
                    var edit_chk = Ext.getCmp('edit_sync_chk');
                    var log_chk = Ext.getCmp('log_sync_chk');
                    var time_chk = Ext.getCmp('edit_sync_time_chk');

                    if(newValue){
                        Ext.getCmp("session_sync_chk").enable();
                        Ext.getCmp("log_sync_chk").enable();
                        Ext.getCmp("edit_sync_chk").enable();
                        sync_con.enable();
        //                 Ext.getCmp('session_sync_con').enable();
        //                 Ext.getCmp('edit_sync_con').enable();
        //                 Ext.getCmp('log_sync_con').enable();
        //                                 session.enable();
        //                                 edit.enable();
        //                                 log.enable();
                        session_chk.enable();
                        edit_chk.enable();
                        log_chk.enable();
                    }
                    else{
                        Ext.getCmp("session_sync_chk").disable();
                        Ext.getCmp("edit_sync_chk").disable();
                        Ext.getCmp("log_sync_chk").disable();
                                        sync_con.disable();
                        //                 session.disable();
                        //                 edit.disable();
                        Ext.getCmp('session_sync_con').disable();
                        Ext.getCmp('edit_sync_con').disable();
                        Ext.getCmp('log_sync_con').disable();
                        //                 log.setDisabled(true);
                        session_chk.state = false;
                        session_chk.moveHandle(false);
                        edit_chk.state = false;
                        edit_chk.moveHandle(false);
                        log_chk.state = false;
                        log_chk.moveHandle(false);
                        time_chk.setValue(false);
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onSession_sync_chkChange: function(field, newValue, oldValue, eOpts) {
        var sync_con = Ext.getCmp('session_sync_con');

        if(newValue){
            sync_con.enable();
            Ext.getCmp('session_sync_mode').setValue('2');
        }
        else{
            sync_con.disable();
        }
    },

    onSession_sync_modeAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('session_sync_mode').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('session_sync_mode').setValue(combo.items[0].data['mode']);
        }

        Ext.select("div.x-combo-list-item", true).on("mouseover", function() {
                console.log(1);
        });
    },

    onSession_sync_modeChange: function(field, newValue, oldValue, eOpts) {
        var session_label = Ext.getCmp('session_label');

        if(newValue === "2"){
            session_label.setText("성능 최적화 동기화 방식");
            Ext.getCmp('session_mode_label').hide();
        }
        else{
            session_label.setText("라우팅 지원 동기화 방식");
            Ext.getCmp('session_mode_label').hide();
        }
    },

    click: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            minWidth : 650,
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 650,
                    height : 150,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('rule_session_mode')+'</div><div class="list">'+__zen('l2')+' : '+__zen('perform_sync')+'<br>('+__zen('perform_sync_desc')+')</div><div class="list">'+__zen('l3')+' : '+__zen('routing_sync')+'<br>('+__zen('routing_sync_desc')+')</div>'
                }
            ]
        });
    },

    onSession_sync_setBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('session_sync'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'session_sync_chk',
            style:'margin-left:765px',
            resizeHandle: false,
            disabled:true,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var sync_con = Ext.getCmp('session_sync_con');

                    if(newValue){
                        sync_con.enable();
                        Ext.getCmp('session_sync_mode').setValue('2');
                    }
                    else{
                        sync_con.disable();
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onEdit_sync_chkChange: function(field, newValue, oldValue, eOpts) {
        var sync_con = Ext.getCmp('edit_sync_con');
        var accbtn = Ext.getCmp('btn_accept');

        if(newValue){
            sync_con.enable();
            accbtn.enable();
            Ext.getCmp('edit_sync_mode').setValue('master');
        }
        else{
            sync_con.disable();
            accbtn.disable();
        }
    },

    onBtn_acceptClick: function(button, e, eOpts) {

    },

    onEdit_sync_modeAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('edit_sync_mode').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('edit_sync_mode').setValue(combo.items[0].data['mode']);
        }
    },

    onEdit_sync_modeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "master"){
            Ext.getCmp('btn_allchk').enable(true);
            Ext.getCmp('btn_allcancel').enable(true);
            Ext.getCmp('edit_sync_chk_con').enable(true);
            Ext.getCmp('firewall_filter').setValue(true);
            Ext.getCmp('firewall_nat').setValue(false);
            Ext.getCmp('ips_set').setValue(false);
            Ext.getCmp('ipsec_set').setValue(false);
            Ext.getCmp('log_log').setValue(false);
            Ext.getCmp('log_syslog').setValue(false);
            Ext.getCmp('log_alram').setValue(false);
        }
        else if(newValue === "slave"){
            Ext.getCmp('btn_allchk').disable(true);
            Ext.getCmp('btn_allcancel').disable(true);
            Ext.getCmp('edit_sync_chk_con').disable(true);
            Ext.getCmp('firewall_filter').setValue(true);
            Ext.getCmp('firewall_nat').setValue(false);
            Ext.getCmp('ips_set').setValue(false);
            Ext.getCmp('ipsec_set').setValue(false);
            Ext.getCmp('log_log').setValue(false);
            Ext.getCmp('log_syslog').setValue(false);
            Ext.getCmp('log_alram').setValue(false);
        }
    },

    onEidt_sync_time_chkChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var sync_con = Ext.getCmp('edit_sync_date_con');

        if(newValue){ sync_con.enable(); }
        else{
            sync_con.disable();
            Ext.getCmp('edit_sync_day').reset();
            Ext.getCmp('edit_sync_hour').reset();
            Ext.getCmp('edit_sync_minute').reset();
            clearInterval(me.interval);
            me.checker = 0;
            Ext.getCmp('time_set').setText("");
        }
    },

    onBtn_allchkClick: function(button, e, eOpts) {
        var filter = Ext.getCmp('firewall_filter');
        var nat = Ext.getCmp('firewall_nat');
        var ips = Ext.getCmp('ips_set');
        var ipsec = Ext.getCmp('ipsec_set');
        var log = Ext.getCmp('log_log');
        var syslog = Ext.getCmp('log_syslog');
        var alram = Ext.getCmp('log_alram');

        if(!filter.checked || !nat.checked || !ips.checked || !ipsec.checked || !log.checked || !syslog.checked || !alram.checked){
            filter.setValue(true);
            nat.setValue(true);
            ips.setValue(true);
            ipsec.setValue(true);
            log.setValue(true);
            syslog.setValue(true);
            alram.setValue(true);
        }
        else{
            filter.setValue(false);
            nat.setValue(false);
            ips.setValue(false);
            ipsec.setValue(false);
            log.setValue(false);
            syslog.setValue(false);
            alram.setValue(false);
        }
    },

    onBtn_allcancelClick: function(button, e, eOpts) {
        var filter = Ext.getCmp('firewall_filter');
        var nat = Ext.getCmp('firewall_nat');
        var ips = Ext.getCmp('ips_set');
        var ipsec = Ext.getCmp('ipsec_set');
        var log = Ext.getCmp('log_log');
        var syslog = Ext.getCmp('log_syslog');
        var alram = Ext.getCmp('log_alram');

        filter.setValue(true);
        nat.setValue(false);
        ips.setValue(false);
        ipsec.setValue(false);
        log.setValue(false);
        syslog.setValue(false);
        alram.setValue(false);
    },

    onFirewall_filterChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){ field.setValue(true); }
        else{ field.setValue(true); }
    },

    onEdit_sync_setBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('setting_sync'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'edit_sync_chk',
            style:'margin-left:765px',
            resizeHandle: false,
            disabled:true,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var sync_con = Ext.getCmp('edit_sync_con');
                    var accbtn = Ext.getCmp('btn_accept');

                    if(newValue){
                        sync_con.enable();
        //                 accbtn.enable();
                        Ext.getCmp('edit_sync_mode').setValue('master');
                    }
                    else{
                        sync_con.disable();
        //                 accbtn.disable();
                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onLog_sync_chkChange: function(field, newValue, oldValue, eOpts) {
        var sync_con = Ext.getCmp('log_sync_con');
        var mm = Ext.getCmp('log_sync_mm_con');
        var ms = Ext.getCmp('log_sync_ms_con');
        var sync_mode = Ext.getCmp('log_sync_mode');

        if(newValue){
            if(sync_mode.getValue() === "1"){
                mm.show();
                ms.hide();
                Ext.getCmp('log_mas_name').reset();
                Ext.getCmp('log_sla_name').reset();
                Ext.getCmp('log_mas_mac_name').reset();
                Ext.getCmp('log_sla_mac_name').reset();
            }
            else{
                ms.show();
                mm.hide();
                Ext.getCmp('log_sync_mode').setValue('1');
                Ext.getCmp('log_mas_name').reset();
                Ext.getCmp('log_sla_name').reset();
                Ext.getCmp('log_mas_mac_name').reset();
                Ext.getCmp('log_sla_mac_name').reset();
            }
            sync_con.enable(); }
        else{
            ms.hide();
            mm.hide();
            sync_con.disable();
        }

    },

    onLog_sync_modeAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('log_sync_mode').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('log_sync_mode').setValue(combo.items[0].data['num']);
        }
    },

    onLog_sync_modeChange: function(field, newValue, oldValue, eOpts) {
        var mm = Ext.getCmp('log_sync_mm_con');
        var ms = Ext.getCmp('log_sync_ms_con');
        var log_sync = Ext.getCmp('log_sync_chk');

        if(log_sync.getValue() === true){
            if(newValue === "1"){
                mm.show();
                ms.hide();
            }
            else{
                ms.show();
                mm.hide();
            }
        }
    },

    onLog_mas_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLog_mas_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('log_mas_name').validateValue(true);
    },

    onLog_sla_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLog_sla_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('log_sla_name').validateValue(true);
    },

    onLog_mas_radioChange: function(field, newValue, oldValue, eOpts) {
        var mas_radio = Ext.getCmp('log_mas_radio');
        var sla_radio = Ext.getCmp('log_sla_radio');

        if(newValue){
            sla_radio.setValue(false);
            mas_radio.setValue(true);
            Ext.getCmp('ms_sync_port_con').enable(true);
            Ext.getCmp('ms_mac_name_con').enable(true);
            Ext.getCmp('ms_sla_name_con').enable(true);
        }
        else{
            sla_radio.setValue(true);
            mas_radio.setValue(false);
            Ext.getCmp('ms_sync_port_con').disable(true);
            Ext.getCmp('ms_mac_name_con').disable(true);
            Ext.getCmp('ms_sla_name_con').disable(true);
        }
    },

    onLog_mas_mac_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLog_mas_mac_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('log_mas_mac_name').validateValue(true);
    },

    onLog_sla_mac_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLog_sla_mac_nameBlur: function(component, event, eOpts) {
        Ext.getCmp('log_sla_mac_name').validateValue(true);
    },

    onLog_sla_radioChange: function(field, newValue, oldValue, eOpts) {
        var mas_radio = Ext.getCmp('log_mas_radio');
        var sla_radio = Ext.getCmp('log_sla_radio');

        if(newValue){
            sla_radio.setValue(true);
            mas_radio.setValue(false);
            Ext.getCmp('log_mas_mac_name').validateValue(true);
            Ext.getCmp('log_sla_mac_name').validateValue(true);
            Ext.getCmp('sla_sync_port_con').enable(true);
        }
        else{
            sla_radio.setValue(false);
            mas_radio.setValue(true);
            Ext.getCmp('sla_sync_port_con').disable(true);
        }
    },

    onLog_sync_setBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('log_sync'));

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'log_sync_chk',
            style:'margin-left:765px',
            resizeHandle: false,
            disabled:true,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var sync_con = Ext.getCmp('log_sync_con');
                    var mm = Ext.getCmp('log_sync_mm_con');
                    var ms = Ext.getCmp('log_sync_ms_con');
                    var sync_mode = Ext.getCmp('log_sync_mode');

                    if(newValue){
                        if(sync_mode.getValue() === "1"){
                            mm.show();
                            ms.hide();
                            Ext.getCmp('log_mas_name').reset();
                            Ext.getCmp('log_sla_name').reset();
                            Ext.getCmp('log_mas_mac_name').reset();
                            Ext.getCmp('log_sla_mac_name').reset();
                        }
                        else{
                            ms.show();
                            mm.hide();
                            Ext.getCmp('log_sync_mode').setValue('1');
                            Ext.getCmp('log_mas_name').reset();
                            Ext.getCmp('log_sla_name').reset();
                            Ext.getCmp('log_mas_mac_name').reset();
                            Ext.getCmp('log_sla_mac_name').reset();
                        }
                        sync_con.enable(); }
                    else{
                        ms.hide();
                        mm.show();
                        sync_con.disable();
                    }

                }
            }
        });

        component.legend.add(tbutton);
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        me.checker = 0;
        me.fieldInfo = makeZenTip();

        if(Object.keys(this.getViewModel().data.network_ha_sync).length  === 0){

            me.getViewModel().getData().network_ha_sync.line = {use: '0'};
            me.getViewModel().getData().network_ha_sync.session = {use: '0'};
            me.getViewModel().getData().network_ha_sync.config = {use: '0'};
            me.getViewModel().getData().network_ha_sync.log = {use: '0'};
        }

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'isCC',
        //     {},
        //     function(response){
        //         if(response === true){
        //             Ext.getCmp('edit_sync_set').hide();
        //             Ext.getCmp('log_sync_set').hide();
        //         }
        //         else{
        //             Ext.getCmp('edit_sync_set').show();
        //             Ext.getCmp('log_sync_set').show();
        //         }
        //     }
        // );

        var network_interface = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network;

        var response = setDevInterface(network_interface.ethernet,null,network_interface.bonding); 

        var _store = Ext.data.StoreManager.lookup('store_interface');

         _store.loadData(response);

         var combo = Ext.getCmp('sync_line_inter').getStore().data;

         if(combo.length > 0){
            Ext.getCmp('sync_line_inter').setValue(combo.items[0].data['name']);
        }

        Ext.getCmp('NFW2_network_ha_sync').get_ha_sync();
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var line_version;
        var line_use;
        var session_use;
        var config_use;
        var log_use;
        var time_use;
        var firewall_filter;
        var firewall_nat;
        var ips_set;
        var ipsec_set;
        var log_log;
        var log_syslog;
        var log_alram;

        var obj = {};

        if(Ext.getCmp('sync_line_use').getValue() === true){
            if(Ext.getCmp('sync_line_ip').isValid() === false){ Ext.getCmp('sync_line_ip').focus(); return false; }
            if(Ext.getCmp('sync_line_mac').isValid() === false){ Ext.getCmp('sync_line_mac').focus(); return false; }
        }

        if(Ext.getCmp('log_sync_chk').getValue() === true){
            if(Ext.getCmp('log_sync_mode').getValue() === "1"){
                if(Ext.getCmp('log_mas_name').isValid() === false){ Ext.getCmp('log_mas_name').focus(); return false; }
                if(Ext.getCmp('log_sla_name').isValid() === false){ Ext.getCmp('log_sla_name').focus(); return false; }
            }
            else{
                if(Ext.getCmp('log_mas_radio').getValue() === true){
                    if(Ext.getCmp('log_mas_mac_name').isValid() === false){ Ext.getCmp('log_mas_mac_name').focus(); return false; }
                    if(Ext.getCmp('log_sla_mac_name').isValid() === false){ Ext.getCmp('log_sla_mac_name').focus(); return false; }
                }
            }
        }

        if(me.ipv === "v4"){ line_version = "4"; }
        else if(me.ipv === "v6"){ line_version = "6"; }
        if(Ext.getCmp('sync_line_use').getValue() === true){ line_use = "1"; }
        else{ line_use = "0"; }
        if(Ext.getCmp('session_sync_chk').getValue() === true){ session_use = "1"; }
        else{ session_use = "0"; }
        if(Ext.getCmp('edit_sync_chk').getValue() === true){ config_use = "1"; }
        else{ config_use = "0"; }
        if(Ext.getCmp('edit_sync_time_chk').getValue() === true){ time_use = "on"; }
        else{ time_use = "off"; }
        if(Ext.getCmp('firewall_filter').getValue() === true){ firewall_filter = "on"; }
        else{ firewall_filter = "off"; }
        if(Ext.getCmp('firewall_nat').getValue() === true){ firewall_nat = "on"; }
        else{ firewall_nat = "off"; }
        if(Ext.getCmp('ips_set').checked){ ips_set = "on"; }
        else{ ips_set = "off"; }
        if(Ext.getCmp('ipsec_set').checked){ ipsec_set = "on"; }
        else{ ipsec_set = "off"; }
        if(Ext.getCmp('log_log').checked){ log_log = "on"; }
        else{ log_log = "off"; }
        if(Ext.getCmp('log_syslog').checked){ log_syslog = "on"; }
        else{ log_syslog = "off"; }
        if(Ext.getCmp('log_alram').checked){ log_alram = "on"; }
        else{ log_alram = "off"; }

        if(Ext.getCmp('log_sync_chk').getValue() === true){
            log_use = "1";
            if(Ext.getCmp('log_sync_mode').getValue() === "1"){
                obj.log = {
                    'use' : log_use,
                    'mode' : "mm",
                    'mname' : Ext.getCmp('log_mas_name').getValue(),
                    'sname' : Ext.getCmp('log_sla_name').getValue(),
                    'port' : "509"
                };
            }
            else if(Ext.getCmp('log_sync_mode').getValue() === "2"){
                if(Ext.getCmp('log_mas_radio').checked){
                    obj.log = {
                        'use' : log_use,
                        'mode' : "m",
                        'mname' : Ext.getCmp('log_mas_mac_name').getValue(),
                        'sname' : Ext.getCmp('log_sla_mac_name').getValue(),
                        'port' : "509"
                    };
                }
                else if(Ext.getCmp('log_sla_radio').checked){
                    obj.log = {
                        'use' : log_use,
                        'mode' : "s",
                        'port' : "509"
                    };
                    Ext.getCmp('log_mas_mac_name').reset();
                    Ext.getCmp('log_sla_mac_name').reset();
                }
            }
        }
        else if(Ext.getCmp('log_sync_chk').getValue() === false){
            log_use = "0";
            obj.log = { 'use' : log_use };
        }

        if(Ext.getCmp('sync_line_use').getValue() === true){
            obj.line = {
                'use' : line_use,
                'interface' : Ext.getCmp('sync_line_inter').getValue(),
                'ip' : Ext.getCmp('sync_line_ip').getValue(),
                'mac' : Ext.getCmp('sync_line_mac').getValue(),
                'ver' : line_version
            };
        }
        else{
            obj.line = {
                'use' : line_use
            };
        }

        if(Ext.getCmp('session_sync_chk').getValue() === true){
            obj.session = {
                'use' : session_use,
                'mode' : Ext.getCmp('session_sync_mode').getValue()
            };
        }
        else{
            obj.session = {
                'use' : session_use
            };
            Ext.getCmp('session_sync_mode').setValue("2");
        }

        if(Ext.getCmp('edit_sync_chk').getValue() === true){
            obj.config = {
                'use' : config_use,
                'mode' : Ext.getCmp('edit_sync_mode').getValue(),
                'cycle' : {
                    'use' : time_use,
                    'day' : Ext.getCmp('edit_sync_day').getValue(),
                    'time' : Ext.getCmp('edit_sync_hour').getValue(),
                    'min' : Ext.getCmp('edit_sync_minute').getValue(),
                    'init' : (Ext.getCmp('edit_sync_day').getValue() + "/" + Ext.getCmp('edit_sync_hour').getValue() + "/" + Ext.getCmp('edit_sync_minute').getValue())
                },
                'option' : {
                    'firewall' : {
                        'filter' : firewall_filter,
                        'nat' : firewall_nat
                    },
                    'ips' : {
                        'config' : ips_set
                    },
                    'ipsec' : {
                        'config' : ipsec_set
                    },
                    'log' : {
                        'conf' : log_log,
                        'syslog' : log_syslog,
                        'alram' : log_alram
                    }
                }
            };
        }
        else{
            obj.config = {
                'use' : config_use
            };
            Ext.getCmp('edit_sync_mode').setValue("master");
            Ext.getCmp('edit_sync_time_chk').setValue(false);
            Ext.getCmp('edit_sync_day').reset();
            Ext.getCmp('edit_sync_hour').reset();
            Ext.getCmp('edit_sync_minute').reset();
            Ext.getCmp('firewall_filter').setValue(true);
            Ext.getCmp('firewall_nat').setValue(false);
            Ext.getCmp('ips_set').setValue(false);
            Ext.getCmp('ipsec_set').setValue(false);
            Ext.getCmp('log_log').setValue(false);
            Ext.getCmp('log_syslog').setValue(false);
            Ext.getCmp('log_alram').setValue(false);
        }

        showLoadMask();

        var _params = {
            basename : Ext.encode('network_ha_sync'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                hideLoadMask();
                var _store = Ext.data.StoreManager.lookup('store_netwrok_ha_sync');
                if(response === true){
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg('msg_ok_add'),
                        width: 200,
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );

        var day;
        var hour;
        var min;

        if(Ext.getCmp('edit_sync_day').getValue() === null){ day = "0"; }
        else{ day = Ext.getCmp('edit_sync_day').getValue(); }
        if(Ext.getCmp('edit_sync_hour').getValue() === null){ hour = "0"; }
        else{ hour = Ext.getCmp('edit_sync_hour').getValue(); }
        if(Ext.getCmp('edit_sync_minute').getValue() === null){ min = "0"; }
        else{ min = Ext.getCmp('edit_sync_minute').getValue(); }

        if(day === "0" && hour === "0" && min === "0"){
            Ext.getCmp('time_set').hide();
            clearInterval(me.interval);
            me.checker = 0;
        }
        else{
            Ext.getCmp('time_set').setText(day + "일 " + hour + "시간 " + min + "분");
            Ext.getCmp('time_set').show();
            this.get_time_set();
        }

    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;
        Ext.getCmp('session_mode_label').hide();

        me.get_ha_sync();
    },

    saveData: function() {

        var me = this;
        var line_version;
        var line_use;
        var session_use;
        var config_use;
        var log_use;
        var time_use;
        var firewall_filter;
        var firewall_nat;
        var ips_set;
        var ipsec_set;
        var log_log;
        var log_syslog;
        var log_alram;

        var obj = {};

        if(Ext.getCmp('sync_line_use').getValue() === true){
            if(Ext.getCmp('sync_line_ip').isValid() === false){ Ext.getCmp('sync_line_ip').focus(); me.parentObj.viewState = false; return false; }
            if(Ext.getCmp('sync_line_mac').isValid() === false){ Ext.getCmp('sync_line_mac').focus(); me.parentObj.viewState = false; return false; }
        }

        if(Ext.getCmp('log_sync_chk').getValue() === true){
            if(Ext.getCmp('log_sync_mode').getValue() === "1"){
                if(Ext.getCmp('log_mas_name').isValid() === false){ Ext.getCmp('log_mas_name').focus(); me.parentObj.viewState = false; return false; }
                if(Ext.getCmp('log_sla_name').isValid() === false){ Ext.getCmp('log_sla_name').focus(); me.parentObj.viewState = false; return false; }
            }
            else{
                if(Ext.getCmp('log_mas_radio').getValue() === true){
                    if(Ext.getCmp('log_mas_mac_name').isValid() === false){ Ext.getCmp('log_mas_mac_name').focus(); me.parentObj.viewState = false; return false; }
                    if(Ext.getCmp('log_sla_mac_name').isValid() === false){ Ext.getCmp('log_sla_mac_name').focus(); me.parentObj.viewState = false; return false; }
                }
            }
        }

        if(me.ipv === "v4"){ line_version = "4"; }
        else if(me.ipv === "v6"){ line_version = "6"; }
        if(Ext.getCmp('sync_line_use').getValue() === true){ line_use = "1"; }
        else{ line_use = "0"; }
        if(Ext.getCmp('session_sync_chk').getValue() === true){ session_use = "1"; }
        else{ session_use = "0"; }
        if(Ext.getCmp('edit_sync_chk').getValue() === true){ config_use = "1"; }
        else{ config_use = "0"; }
        if(Ext.getCmp('edit_sync_time_chk').getValue() === true){ time_use = "on"; }
        else{ time_use = "off"; }
        if(Ext.getCmp('firewall_filter').getValue() === true){ firewall_filter = "on"; }
        else{ firewall_filter = "off"; }
        if(Ext.getCmp('firewall_nat').getValue() === true){ firewall_nat = "on"; }
        else{ firewall_nat = "off"; }
        if(Ext.getCmp('ips_set').checked){ ips_set = "on"; }
        else{ ips_set = "off"; }
        if(Ext.getCmp('ipsec_set').checked){ ipsec_set = "on"; }
        else{ ipsec_set = "off"; }
        if(Ext.getCmp('log_log').checked){ log_log = "on"; }
        else{ log_log = "off"; }
        if(Ext.getCmp('log_syslog').checked){ log_syslog = "on"; }
        else{ log_syslog = "off"; }
        if(Ext.getCmp('log_alram').checked){ log_alram = "on"; }
        else{ log_alram = "off"; }

        if(Ext.getCmp('log_sync_chk').getValue() === true){
            log_use = "1";
            if(Ext.getCmp('log_sync_mode').getValue() === "1"){
                obj.log = {
                    'use' : log_use,
                    'mode' : "mm",
                    'mname' : Ext.getCmp('log_mas_name').getValue(),
                    'sname' : Ext.getCmp('log_sla_name').getValue(),
                    'port' : "509"
                };
            }
            else if(Ext.getCmp('log_sync_mode').getValue() === "2"){
                if(Ext.getCmp('log_mas_radio').checked){
                    obj.log = {
                        'use' : log_use,
                        'mode' : "m",
                        'mname' : Ext.getCmp('log_mas_mac_name').getValue(),
                        'sname' : Ext.getCmp('log_sla_mac_name').getValue(),
                        'port' : "509"
                    };
                }
                else if(Ext.getCmp('log_sla_radio').checked){
                    obj.log = {
                        'use' : log_use,
                        'mode' : "s",
                        'port' : "509"
                    };
                    Ext.getCmp('log_mas_mac_name').reset();
                    Ext.getCmp('log_sla_mac_name').reset();
                }
            }
        }
        else if(Ext.getCmp('log_sync_chk').getValue() === false){
            log_use = "0";
            obj.log = { 'use' : log_use };
        }

        if(Ext.getCmp('sync_line_use').getValue() === true){
            obj.line = {
                'use' : line_use,
                'interface' : Ext.getCmp('sync_line_inter').getValue(),
                'ip' : Ext.getCmp('sync_line_ip').getValue(),
                'mac' : Ext.getCmp('sync_line_mac').getValue(),
                'ver' : line_version
            };
        }
        else{
            obj.line = {
                'use' : line_use
            };
        }

        if(Ext.getCmp('session_sync_chk').getValue() === true){
            obj.session = {
                'use' : session_use,
                'mode' : Ext.getCmp('session_sync_mode').getValue()
            };
        }
        else{
            obj.session = {
                'use' : session_use
            };
            Ext.getCmp('session_sync_mode').setValue("2");
        }

        if(Ext.getCmp('edit_sync_chk').getValue() === true){
            obj.config = {
                'use' : config_use,
                'mode' : Ext.getCmp('edit_sync_mode').getValue(),
                'cycle' : {
                    'use' : time_use,
                    'day' : Ext.getCmp('edit_sync_day').getValue(),
                    'time' : Ext.getCmp('edit_sync_hour').getValue(),
                    'min' : Ext.getCmp('edit_sync_minute').getValue(),
                    'init' : (Ext.getCmp('edit_sync_day').getValue() + "/" + Ext.getCmp('edit_sync_hour').getValue() + "/" + Ext.getCmp('edit_sync_minute').getValue())
                },
                'option' : {
                    'firewall' : {
                        'filter' : firewall_filter,
                        'nat' : firewall_nat
                    },
                    'ips' : {
                        'config' : ips_set
                    },
                    'ipsec' : {
                        'config' : ipsec_set
                    },
                    'log' : {
                        'conf' : log_log,
                        'syslog' : log_syslog,
                        'alram' : log_alram
                    }
                }
            };
        }
        else{
            obj.config = {
                'use' : config_use
            };
            Ext.getCmp('edit_sync_mode').setValue("master");
            Ext.getCmp('edit_sync_time_chk').setValue(false);
            Ext.getCmp('edit_sync_day').reset();
            Ext.getCmp('edit_sync_hour').reset();
            Ext.getCmp('edit_sync_minute').reset();
            Ext.getCmp('firewall_filter').setValue(true);
            Ext.getCmp('firewall_nat').setValue(false);
            Ext.getCmp('ips_set').setValue(false);
            Ext.getCmp('ipsec_set').setValue(false);
            Ext.getCmp('log_log').setValue(false);
            Ext.getCmp('log_syslog').setValue(false);
            Ext.getCmp('log_alram').setValue(false);
        }

        Ext.getCmp('win_zen_device_set').getViewModel().data.network_ha_sync = obj;

        console.log('me.getViewModel().data.network_ha_sync - ', me.getViewModel().data.network_ha_sync);

        var day;
        var hour;
        var min;

        if(Ext.getCmp('edit_sync_day').getValue() === null){ day = "0"; }
        else{ day = Ext.getCmp('edit_sync_day').getValue(); }
        if(Ext.getCmp('edit_sync_hour').getValue() === null){ hour = "0"; }
        else{ hour = Ext.getCmp('edit_sync_hour').getValue(); }
        if(Ext.getCmp('edit_sync_minute').getValue() === null){ min = "0"; }
        else{ min = Ext.getCmp('edit_sync_minute').getValue(); }

        if(day === "0" && hour === "0" && min === "0"){
            Ext.getCmp('time_set').hide();
            clearInterval(me.interval);
            me.checker = 0;
        }
        else{
            Ext.getCmp('time_set').setText(day + "일 " + hour + "시간 " + min + "분");
            Ext.getCmp('time_set').show();
            this.get_time_set();
        }

        me.parentObj.viewState = true;
        return true;

    },

    get_ha_sync: function() {
        var me = this;
        var records = [];

        response = me.getViewModel().data.network_ha_sync;

        if(response !== null){

            if(response.line.use === "1"){
                var session = Ext.getCmp("session_sync_set");
                var edit = Ext.getCmp("edit_sync_set");
                var log = Ext.getCmp("log_sync_set");
                var sync_con = Ext.getCmp('sync_line_con');
                Ext.getCmp("sync_line_use").state = true;
                Ext.getCmp("sync_line_use").moveHandle(true);
                Ext.getCmp("session_chk_con").enable();
                Ext.getCmp("log_chk_con").enable();
                Ext.getCmp("edit_chk_con").enable();
                var session_chk = Ext.getCmp('session_sync_chk');
                var edit_chk = Ext.getCmp('edit_sync_chk');
                var log_chk = Ext.getCmp('log_sync_chk');
                session_chk.enable();
                edit_chk.enable();
                log_chk.enable();
                sync_con.enable();
                session.enable();
                edit.enable();
                log.enable();

                Ext.getCmp('sync_line_inter').setValue(response.line.interface);
                Ext.getCmp('sync_line_ip').setValue(response.line.ip);
                Ext.getCmp('sync_line_mac').setValue(response.line.mac);
            }
            else{
                Ext.getCmp("sync_line_use").state = false;
                Ext.getCmp("sync_line_use").moveHandle(false);
            }
            if(response.session.use === "1"){
                Ext.getCmp("session_sync_chk").state = true;
                Ext.getCmp("session_sync_chk").moveHandle(true);
                Ext.getCmp('session_sync_con').enable();
                Ext.getCmp('session_sync_mode').setValue(response.session.mode);
            }
            else{
                Ext.getCmp("session_sync_chk").state = false;
                Ext.getCmp("session_sync_chk").moveHandle(false);
            }
            if(response.config.use === "1"){
                Ext.getCmp("edit_sync_chk").state = true;
                Ext.getCmp("edit_sync_chk").moveHandle(true);
                Ext.getCmp('edit_sync_con').enable();
                
                Ext.getCmp('edit_sync_mode').setValue(response.config.mode);
                if(response.config.option.firewall.filter === "on"){ Ext.getCmp('firewall_filter').setValue(true); }
                else{ Ext.getCmp('firewall_filter').setValue(false); }
                if(response.config.option.firewall.nat === "on"){ Ext.getCmp('firewall_nat').setValue(true); }
                else{ Ext.getCmp('firewall_nat').setValue(false); }
                if(response.config.option.ips.config === "on"){ Ext.getCmp('ips_set').setValue(true); }
                else{ Ext.getCmp('ips_set').setValue(false); }
                if(response.config.option.ipsec.config === "on"){ Ext.getCmp('ipsec_set').setValue(true); }
                else{ Ext.getCmp('ipsec_set').setValue(false); }
                if(response.config.option.log.conf === "on"){ Ext.getCmp('log_log').setValue(true); }
                else{ Ext.getCmp('log_log').setValue(false); }
                if(response.config.option.log.syslog === "on"){ Ext.getCmp('log_syslog').setValue(true); }
                else{ Ext.getCmp('log_syslog').setValue(false); }
                if(response.config.option.log.alram === "on"){ Ext.getCmp('log_alram').setValue(true); }
                else{ Ext.getCmp('log_alram').setValue(false); }
                if(response.config.cycle.use === "on"){

                    var init_date = [];
                    init_date = response.config.cycle.init.split("/");
                    for(var i in init_date){
                        if(init_date[i] === "null"){ init_date[i] = null; }
                    }
                    Ext.getCmp('edit_sync_day').setValue(init_date[0]);
                    Ext.getCmp('edit_sync_hour').setValue(init_date[1]);
                    Ext.getCmp('edit_sync_minute').setValue(init_date[2]);
                    var day;
                    var hour;
                    var min;
                    if(response.config.cycle.day === null){ day = "0"; }
                    else{ day = response.config.cycle.day; }
                    if(response.config.cycle.time === null){ hour = "0"; }
                    else{ hour = response.config.cycle.time; }
                    if(response.config.cycle.min === null){ min = "0"; }
                    else{ min = response.config.cycle.min; }
                    if(day === "0" && hour === "0" && min === "0"){
                        clearInterval(me.interval);
                        me.checker = 0;
                    }
                    else{
                        Ext.getCmp('time_set').setText(day + "일 " + hour + "시간 " + min + "분");
                        Ext.getCmp('time_set').show();
                    }
                }
            }
            else{
                Ext.getCmp("edit_sync_chk").state = false;
                Ext.getCmp("edit_sync_chk").moveHandle(false);
            }
            if(response.log.use === "1"){
                Ext.getCmp("log_sync_chk").state = true;
                Ext.getCmp("log_sync_chk").moveHandle(true);
                var sync_con = Ext.getCmp('log_sync_con');
                var mm = Ext.getCmp('log_sync_mm_con');
                var ms = Ext.getCmp('log_sync_ms_con');
                var sync_mode = Ext.getCmp('log_sync_mode');

                if(response.log.mode === "mm"){
                    Ext.getCmp('log_sync_mode').setValue("1");
                    Ext.getCmp('log_mas_name').setValue(response.log.mname);
                    Ext.getCmp('log_sla_name').setValue(response.log.sname);
                }
                else if(response.log.mode === "m"){
                    Ext.getCmp('log_sync_mode').setValue("2");
                    Ext.getCmp('log_mas_radio').setValue(true);
                    Ext.getCmp('log_mas_mac_name').setValue(response.log.mname);
                    Ext.getCmp('log_sla_mac_name').setValue(response.log.sname);
                }
                else if(response.log.mode === "s"){
                    Ext.getCmp('log_sync_mode').setValue("2");
                    Ext.getCmp('log_sla_radio').setValue(true);
                }

                if(sync_mode.getValue() === "1"){
                    mm.show();
                    ms.hide();
                }
                else{
                    ms.show();
                    mm.hide();
                    Ext.getCmp('log_sync_mode').setValue('1');
                }
                sync_con.enable();
            }
            else{
                Ext.getCmp("log_sync_chk").state = false;
                Ext.getCmp("log_sync_chk").moveHandle(false);
            }
        }
    },

    get_time_set: function() {
        var me = this;

        var obj = {};

        response = me.getViewModel.data.network_ha_sync;

        if(response !== null){
            if(response.config.use !== "0"){
                if(response.config.cycle.use !== "off"){
                    var minus_min;
                    var minus_hour;
                    var minus_day;

                    if(response.config.cycle.day === null){ day = "0"; }
                    else{ day = response.config.cycle.day; }
                    if(response.config.cycle.time === null){ hour = "0"; }
                    else{ hour = response.config.cycle.time; }
                    if(response.config.cycle.min === null){ min = "0"; }
                    else{ min = response.config.cycle.min; }
                    if(day === "0" && hour === "0" && min === "0"){  }
                    else{ Ext.getCmp('time_set').setText(day + "일 " + hour + "시간 " + min + "분");}

                    if(response.config.cycle.min !== "0"){
                        minus_min = String(response.config.cycle.min-"1");
                    }
                    else{ minus_min = "0"; }
                    if(response.config.cycle.time !== "0"){
                        minus_hour = String(response.config.cycle.time-"1");
                    }
                    else{ minus_hour = "0"; }
                    if(response.config.cycle.day !== "0"){
                        minus_day = String(response.config.cycle.day-"1");
                    }
                    else{ minus_day = "0"; }

                    if(min !== "0"){
                        obj.config = {
                            'cycle' : {
                                'use' : response.config.cycle.use,
                                'min' : String(minus_min),
                                'day' : response.config.cycle.day,
                                'time' : response.config.cycle.time,
                                'init' : response.config.cycle.init
                            },
                            'use' : response.config.use,
                            'mode' : response.config.mode,
                            'option' : {
                                'firewall' :{
                                    'filter' : response.config.option.firewall.filter,
                                    'nat' : response.config.option.firewall.nat
                                },
                                'ips' : {
                                    'config' : response.config.option.ips.config
                                },
                                'ipsec' : {
                                    'config' : response.config.option.ipsec.config
                                },
                                'log' : {
                                    'conf' : response.config.option.log.conf,
                                    'syslog' : response.config.option.log.syslog,
                                    'alram' : response.config.option.log.alram
                                }
                            }
                        };
                    }
                    else{
                        if(hour !== "0"){
                            obj.config = {
                                'cycle' : {
                                    'use' : response.config.cycle.use,
                                    'time' : String(minus_hour),
                                    'min' : "59",
                                    'day' : response.config.cycle.day,
                                    'init' : response.config.cycle.init
                                },
                                'use' : response.config.use,
                                'mode' : response.config.mode,
                                'option' : {
                                    'firewall' :{
                                        'filter' : response.config.option.firewall.filter,
                                        'nat' : response.config.option.firewall.nat
                                    },
                                    'ips' : {
                                        'config' : response.config.option.ips.config
                                    },
                                    'ipsec' : {
                                        'config' : response.config.option.ipsec.config
                                    },
                                    'log' : {
                                        'conf' : response.config.option.log.conf,
                                        'syslog' : response.config.option.log.syslog,
                                        'alram' : response.config.option.log.alram
                                    }
                                }
                            };
                        }
                        else{
                            if(day !== "0"){
                                obj.config = {
                                    'cycle' : {
                                        'use' : response.config.cycle.use,
                                        'day' : String(minus_day),
                                        'time' : "23",
                                        'min' : "59",
                                        'init' : response.config.cycle.init
                                    },
                                    'use' : response.config.use,
                                    'mode' : response.config.mode,
                                    'option' : {
                                        'firewall' :{
                                            'filter' : response.config.option.firewall.filter,
                                            'nat' : response.config.option.firewall.nat
                                        },
                                        'ips' : {
                                            'config' : response.config.option.ips.config
                                        },
                                        'ipsec' : {
                                            'config' : response.config.option.ipsec.config
                                        },
                                        'log' : {
                                            'conf' : response.config.option.log.conf,
                                            'syslog' : response.config.option.log.syslog,
                                            'alram' : response.config.option.log.alram
                                        }
                                    }
                                };
                            }
                            else{ Ext.getCmp('time_set').hide(); }
                        }
                    }
                }
                else{
                    obj.config = {
                        'cycle' : {
                            'use' : response.config.cycle.use,
                            'day' : null,
                            'time' : null,
                            'min' : null,
                            'init' : null
                        },
                        'use' : response.config.use,
                        'mode' : response.config.mode,
                        'option' : {
                            'firewall' :{
                                'filter' : response.config.option.firewall.filter,
                                'nat' : response.config.option.firewall.nat
                            },
                            'ips' : {
                                'config' : response.config.option.ips.config
                            },
                            'ipsec' : {
                                'config' : response.config.option.ipsec.config
                            },
                            'log' : {
                                'conf' : response.config.option.log.conf,
                                'syslog' : response.config.option.log.syslog,
                                'alram' : response.config.option.log.alram
                            }
                        }
                    };
                }
            }
            else{
                obj.config = {
                    'use' : response.config.use
                };
            }
            if(response.line.use !== "0"){
                obj.line = {
                    'use' : response.line.use,
                    'interface' : response.line.interface,
                    'ip' : response.line.ip,
                    'mac' : response.line.mac,
                    'ver' : response.line.ver
                };
            }
            else{
                obj.line = {
                    'use' : response.line.use
                };
            }
            if(response.session.use !== "0"){
                obj.session ={
                    'use' : response.session.use,
                    'mode' : response.session.mode
                };
            }
            else{
                obj.session = {
                    'use' : response.session.use
                };
            }
            if(response.log.use !== "0"){
                if(response.log.mode === "mm"){
                    obj.log = {
                        'use' : response.log.use,
                        'mode' : response.log.mode,
                        'mname' : response.log.mname,
                        'sname' : response.log.sname,
                        'port' : response.log.port
                    };
                }
                else if(response.log.mode === "m"){
                    obj.log = {
                        'use' : response.log.use,
                        'mode' : response.log.mode,
                        'mname' : response.log.mname,
                        'sname' : response.log.sname,
                        'port' : response.log.port
                    };
                }
                else{
                    obj.log = {
                        'use' : response.log.use,
                        'mode' : response.log.mode,
                        'port' : response.log.port
                    };
                }
            }
            else{
                obj.log = {
                    'use' : response.log.use
                };
            }

            if(day === "0" && hour === "0" && min === "0"){
                Ext.getCmp('edit_sync_time_chk').setValue(false);
                obj.config = {
                    'cycle' : {
                        'use' : "off",
                        'day' : null,
                        'time' : null,
                        'min' : null,
                        'init' : "null/null/null"
                    },
                    'use' : response.config.use,
                    'mode' : response.config.mode,
                    'option' : {
                        'firewall' :{
                            'filter' : response.config.option.firewall.filter,
                            'nat' : response.config.option.firewall.nat
                        },
                        'ips' : {
                            'config' : response.config.option.ips.config
                        },
                        'ipsec' : {
                            'config' : response.config.option.ipsec.config
                        },
                        'log' : {
                            'conf' : response.config.option.log.conf,
                            'syslog' : response.config.option.log.syslog,
                            'alram' : response.config.option.log.alram
                        }
                    }
                };
            }

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ha_sync = obj;
        }

        if(me.checker === 0){
            me.interval = setInterval(me.get_time_set, 60000);
            me.checker = 1;
        }
    }

});
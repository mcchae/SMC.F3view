
Ext.define('SMC.view.win_ipv6SPD', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.ux.form.field.BoxSelect'
    ],

    height: 700,
    width: 870,
    bodyPadding: 10,
    title: 'IPv6 필터링',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: 'fm',
                    bodyPadding: '',
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margins: '0 10 0 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            html: '<div class="fr_obj_tit">출발지</div>'
                                        },
                                        {
                                            xtype: 'comboboxselect',
                                            stacked: true,
                                            filterPickList: true,
                                            grow: true,
                                            growMax: 150,
                                            growMin: 150,
                                            labelTpl: '<div class="icm ic_p{otype}">{name}</div>',
                                            pinList: false,
                                            listConfig: {
                                                tpl: [
                                                    '<ul style="list-style:none;padding-left:5px"><tpl for=".">',
                                                    '<li role="option" class="'+Ext.baseCSSPrefix+'boundlist-item icm ic_p{otype}'+'"'+' style="padding-left:50px;">'+'{name}</li>',
                                                    '</tpl></ul>'
                                                ]
                                            },
                                            id: 'src',
                                            width: 270,
                                            labelSeparator: ' ',
                                            hideTrigger: true,
                                            displayField: 'name',
                                            multiSelect: true,
                                            queryCaching: false,
                                            store: 'store_ipv6_obj',
                                            valueField: 'cid',
                                            listeners: {
                                                beforequery: {
                                                    fn: me.onSrcBeforeQuery,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margins: '0 10 0 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            html: '<div class="fr_obj_tit">목적지</div>'
                                        },
                                        {
                                            xtype: 'comboboxselect',
                                            stacked: true,
                                            filterPickList: true,
                                            grow: true,
                                            growMax: 150,
                                            growMin: 150,
                                            pinList: false,
                                            listConfig: {
                                                tpl: [
                                                    '<ul style="list-style:none;padding-left:5px"><tpl for=".">',
                                                    '<li role="option" class="'+Ext.baseCSSPrefix+'boundlist-item icm ic_p{otype}'+'"'+' style="padding-left:50px;">'+'{name}</li>',
                                                    '</tpl></ul>'
                                                ]
                                            },
                                            labelTpl: '<div class="icm ic_p{otype}">{name}</div>',
                                            id: 'dest',
                                            width: 270,
                                            labelSeparator: ' ',
                                            hideTrigger: true,
                                            displayField: 'name',
                                            multiSelect: true,
                                            queryCaching: false,
                                            store: 'store_ipv6_obj',
                                            valueField: 'cid',
                                            listeners: {
                                                beforequery: {
                                                    fn: me.onDestBeforeQuery,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margins: '0 10 0 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            html: '<div class="fr_obj_tit">서비스</div>'
                                        },
                                        {
                                            xtype: 'comboboxselect',
                                            stacked: true,
                                            filterPickList: true,
                                            grow: true,
                                            growMax: 150,
                                            growMin: 150,
                                            pinList: false,
                                            listConfig: {
                                                tpl: [
                                                    '<ul style="list-style:none;padding-left:5px"><tpl for=".">',
                                                    '<li role="option" class="'+Ext.baseCSSPrefix+'boundlist-item icm ic_s{otype}'+'"'+' style="padding-left:50px;">'+'{name}</li>',
                                                    '</tpl></ul>'
                                                ]
                                            },
                                            labelTpl: '<div class="icm ic_s{otype}">{name}</div>',
                                            id: 'service',
                                            width: 270,
                                            labelSeparator: ' ',
                                            hideTrigger: true,
                                            displayField: 'name',
                                            multiSelect: true,
                                            queryCaching: false,
                                            store: 'store_svc_obj',
                                            valueField: 'cid'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '0 5 0 0',
                                    width: 100,
                                    text: '기본 설정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: '옵션 설정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'dv_basic',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'ct_num',
                                    padding: '',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){ return get_msg("err_null"); }
                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                return true;



                                            },
                                            id: 'num',
                                            width: 250,
                                            fieldLabel: '정책 순위',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: false,
                                            maxLength: 31,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onNameErrorChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            id: 'fld_range'
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_name',
                                            text: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'cross_spd',
                                            fieldLabel: '양방향 정책',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: 'action_g',
                                            width: 400,
                                            fieldLabel: '행위',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'ac_accept',
                                                    name: 'action',
                                                    boxLabel: 'Accept',
                                                    checked: true,
                                                    inputValue: 'Accept'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'ac_deny',
                                                    name: 'action',
                                                    boxLabel: 'Deny',
                                                    inputValue: 'Deny'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'ac_ipsec',
                                                    name: 'action',
                                                    boxLabel: 'IPSec',
                                                    inputValue: 'IPSec'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 10 0 '
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'loglevel',
                                            width: 250,
                                            fieldLabel: '로그',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            value: 'NoLog',
                                            editable: false,
                                            store: 'store_log_type',
                                            valueField: 'val',
                                            listeners: {
                                                change: {
                                                    fn: me.onLoglevelChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'checkboxgroup',
                                                    disabled: true,
                                                    hidden: true,
                                                    id: 'lv_option',
                                                    width: 550,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'lv_create',
                                                            boxLabel: '세션생성'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'lv_accept',
                                                            boxLabel: '패킷통과'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'lv_drop',
                                                            boxLabel: '패킷드랍'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'lv_close',
                                                            boxLabel: '세션종료'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            id: 'lv_abnormal',
                                                            boxLabel: '비정상 세션종료'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                                if(!LengthCheck(value, 0, 1000000)){ return ValidLimit(0, 1000000); }

                                                return true;
                                            },
                                            id: 'timeout',
                                            width: 200,
                                            fieldLabel: '타임아웃',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            value: 600,
                                            enableKeyEvents: true,
                                            enforceMaxLength: false,
                                            listeners: {
                                                errorchange: {
                                                    fn: me.onTimeoutErrorChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'err_timeout',
                                            text: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'dv_option',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            onTrigger2Click: function(args) {
                                                this.setValue(null);
                                            },
                                            trigger2Cls: 'x-form-clear-trigger',
                                            id: 'header',
                                            width: 400,
                                            fieldLabel: '헤더',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_object_ipv6header_list',
                                            valueField: '@cid',
                                            listeners: {
                                                beforequery: {
                                                    fn: me.onHeaderBeforeQuery,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            onTrigger2Click: function(args) {
                                                this.setValue(null);
                                            },
                                            trigger2Cls: 'x-form-clear-trigger',
                                            id: 'schedule',
                                            width: 400,
                                            fieldLabel: '스케쥴',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_object_schedule_list',
                                            valueField: '@cid',
                                            listeners: {
                                                beforequery: {
                                                    fn: me.onScheduleBeforeQuery,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            onTrigger2Click: function() {
                                                this.setValue(null);
                                            },
                                            trigger2Cls: 'x-form-clear-trigger',
                                            tpl: '<tpl for="."><div class="x-boundlist-item">[{option.type}]{name}</div></tpl>',
                                            id: 'qos',
                                            width: 400,
                                            fieldLabel: 'QoS',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'store_firewall_object_qos',
                                            valueField: '@cid',
                                            listeners: {
                                                beforequery: {
                                                    fn: me.onQosBeforeQuery,
                                                    scope: me
                                                },
                                                select: {
                                                    fn: me.onQosSelect,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            margins: '0 0 0 10',
                                            hidden: true,
                                            id: 'qos_prio',
                                            width: 170,
                                            fieldLabel: '우선순위',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            labelWidth: 80,
                                            value: 'middle',
                                            editable: false,
                                            store: {
                                                data: [
                                                    {
                                                        val: 'high',
                                                        text: '높음'
                                                    },
                                                    {
                                                        val: 'middle',
                                                        text: '중간'
                                                    },
                                                    {
                                                        val: 'low',
                                                        text: '낮음'
                                                    }
                                                ],
                                                fields: [
                                                    {
                                                        name: 'text'
                                                    },
                                                    {
                                                        name: 'val'
                                                    }
                                                ]
                                            },
                                            valueField: 'val'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'session',
                                                    width: 400,
                                                    fieldLabel: '세션제한',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_object_session_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onSessionBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'ddos',
                                                    width: 400,
                                                    fieldLabel: 'DDoS',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_ddos_profile_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onDdosBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'app',
                                                    width: 400,
                                                    fieldLabel: '어플리케이션',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_profile_application_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onAppBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            hidden: true,
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'http',
                                                    width: 400,
                                                    fieldLabel: 'HTTP 필터링',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_fw_profile_web_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onHttpBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'ips',
                                                    width: 400,
                                                    fieldLabel: 'IPS',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_ips_profile_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onIpsBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'anti_virus',
                                                    width: 400,
                                                    fieldLabel: '안티바이러스',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_antivirus_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onAnti_virusBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    onTrigger2Click: function() {
                                                        this.setValue(null);
                                                    },
                                                    trigger2Cls: 'x-form-clear-trigger',
                                                    id: 'anti_spam',
                                                    width: 400,
                                                    fieldLabel: '안티스팸',
                                                    labelCls: 'lb_sq',
                                                    labelSeparator: ' ',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_antispam_list',
                                                    valueField: '@cid',
                                                    listeners: {
                                                        beforequery: {
                                                            fn: me.onAnti_spamBeforeQuery,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'expire_use',
                                            fieldLabel: '정책 유효기간',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            listeners: {
                                                change: {
                                                    fn: me.onExpire_useChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            disabled: true,
                                            id: 'expire_date',
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            editable: false,
                                            format: 'Y-m-d',
                                            submitFormat: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'timefield',
                                            disabled: true,
                                            id: 'expire_time',
                                            width: 100,
                                            fieldLabel: '',
                                            labelSeparator: ' ',
                                            editable: false,
                                            format: 'H',
                                            increment: 60,
                                            submitFormat: 'H'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'desc',
                                            width: 500,
                                            fieldLabel: '메모',
                                            labelCls: 'lb_sq',
                                            labelSeparator: ' ',
                                            enforceMaxLength: true,
                                            maxLength: 127
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 30,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'err_msg'
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'container',
                            dock: 'bottom',
                            height: 24,
                            layout: {
                                type: 'hbox',
                                align: 'stretchmax',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.on_btn_confirm1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    width: 100,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.on_btn_cancel1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onSrcBeforeQuery: function(queryPlan, eOpts) {
         Ext.data.StoreManager.lookup('store_ipv6_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv6","ipv6_group"]));
    },

    onDestBeforeQuery: function(queryPlan, eOpts) {
        Ext.data.StoreManager.lookup('store_ipv6_obj').getProxy().setExtraParam("object_list",  Ext.encode(["ipv6","ipv6_group"]));
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('dv_basic').show();
        Ext.getCmp('dv_option').hide();
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('dv_basic').hide();
        Ext.getCmp('dv_option').show();
    },

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_name");
    },

    onLoglevelChange: function(field, newValue, oldValue, eOpts) {
        if(newValue==="NoLog"){ Ext.getCmp('lv_option').hide();}else{ Ext.getCmp('lv_option').show();}
        if(newValue==="user"){ Ext.getCmp('lv_option').setDisabled(false);}else{ Ext.getCmp('lv_option').setDisabled(true);}


        var ar_lv = Ext.getCmp('lv_option').items.items;

        for(var i=0;i<5;i++){
            ar_lv[i].setValue(false);
        }


        switch(newValue){
            case "Serious":	ar_lv[0].setValue(true);ar_lv[3].setValue(true); break;
            case "Warning":
            case "Normal":
            case "Information":
                for(var i=0;i<5;i++){
                ar_lv[i].setValue(true);
                }
                break;
            default:break;

        }
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "err_timeout");
    },

    onHeaderBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onScheduleBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onQosBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onQosSelect: function(combo, records, eOpts) {
        var qos_type = records[0].raw.option.type;

        if(qos_type==="prio"){Ext.getCmp('qos_prio').show();}
        else{	Ext.getCmp('qos_prio').hide();	}

    },

    onSessionBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onDdosBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onAppBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onHttpBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onIpsBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onAnti_virusBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onAnti_spamBeforeQuery: function(queryPlan, eOpts) {
        queryPlan.combo.store.getProxy().setExtraParam('search_info',Ext.encode([]));
    },

    onExpire_useChange: function(field, newValue, oldValue, eOpts) {
        if(newValue===true){
                Ext.getCmp("expire_date").setDisabled(false);
                Ext.getCmp("expire_time").setDisabled(false);

        }else{
        		Ext.getCmp("expire_date").setDisabled(true);
                Ext.getCmp("expire_time").setDisabled(true);
        }
    },

    on_btn_confirm1: function(button, e, eOpts) {
        this.set_fw_spd_ipv6();


    },

    on_btn_cancel1: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_fw_spd_ipv6();
    },

    init_fw_spd_ipv6: function(edit, uid) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            key : Ext.encode({'@uid':me.uid})
        };

        // if(me.license.ipsec !== "on"){   Ext.getCmp("ac_ipsec").hide();}
        // if(me.license.ips !== "on")	{   Ext.getCmp("ips").hide();}
        // if(me.license.as !== "on")	{   Ext.getCmp("anti_spam").hide();}
        // if(me.license.av !== "on")	{   Ext.getCmp("anti_virus").hide();}
        //if(me.license.fw !== "on")	{   Ext.getCmp("http").hide();Ext.getCmp("app").hide();}
        //if(me.license.ddos !== "on"){   Ext.getCmp("ddos").hide();}


        if(me.edit === "edit"){

            this.setTitle("IPv6 필터링 수정 - "+me.num);
            Ext.getCmp("ct_num").hide();

            request_helper.xmlrpc_call_JsonP('ftuctrl','getObject',_params,
                function(response){


                    var in_src = new Array();
                    for(var i=0; i<response.src.length; i++){
                        in_src[i]= response.src[i]["@otype"]+":"+response.src[i]["@cid"];
                    }

                    Ext.getCmp("src").setValue(in_src);

                    var in_dest = new Array();
                    for(var i=0; i<response.dest.length; i++){
                        in_dest[i]= response.dest[i]["@otype"]+":"+response.dest[i]["@cid"];
                    }


                    Ext.getCmp("dest").setValue(in_dest);

                    var in_svc = new Array();
                    for(var i=0; i<response.service.length; i++){
                        in_svc[i]= response.service[i]["@otype"]+":"+response.service[i]["@cid"];
                    }

                    Ext.getCmp("service").setValue(in_svc);


                    Ext.getCmp("cross_spd").setValue((response.etc["@cross_spd"]==="on")?true:false);
                    Ext.getCmp("loglevel").setValue(response.etc["@loglevel"]);
                    Ext.getCmp("timeout").setValue(response.etc["@timeout"]);

                    if(response.etc["@action"]==="Accept"){
                        Ext.getCmp("ac_accept").setValue(true);
                    }else if(response.etc["@action"]==="Deny"){
                        Ext.getCmp("ac_deny").setValue(true);
                     }else if(response.etc["@action"]==="IPSec"){
                        Ext.getCmp("ac_ipsec").setValue(true);
                    }

                    if(response.etc["@loglevel"]==="user"){
                        Ext.getCmp("lv_create").setValue((response.loglevel["@create"]==="on")?true:false);
                        Ext.getCmp("lv_accept").setValue((response.loglevel["@accept"]==="on")?true:false);
                        Ext.getCmp("lv_drop").setValue((response.loglevel["@drop"]==="on")?true:false);
                        Ext.getCmp("lv_close").setValue((response.loglevel["@close"]==="on")?true:false);
                        Ext.getCmp("lv_abnormal").setValue((response.loglevel["@abnormal"]==="on")?true:false);
                    }



                    Ext.getCmp("header").setValue(response.header["@cid"]);
                    Ext.getCmp("header").setRawValue(response.header["#text"]);
                    Ext.getCmp("schedule").setValue(response.schedule["@cid"]);
                    Ext.getCmp("schedule").setRawValue(response.schedule["#text"]);
                    Ext.getCmp("qos").setValue(response.resource.qos["@cid"]);
                    Ext.getCmp("qos").setRawValue(response.resource.qos["#text"]);
                    if(!(response.resource.qos.prio==="" ||response.resource.qos.prio===undefined)){Ext.getCmp("qos_prio").show();}

                    Ext.getCmp("session").setValue(response.resource.session["@cid"]);
                    Ext.getCmp("session").setRawValue(response.resource.session["#text"]);

                    /*Ext.getCmp("ddos").setValue(response.profile.ddos["@cid"]);
                    Ext.getCmp("ddos").setRawValue(response.profile.ddos["#text"]);
                    Ext.getCmp("app").setValue(response.profile.application["@cid"]);
                    Ext.getCmp("app").setRawValue(response.profile.application["#text"]);
                    Ext.getCmp("http").setValue(response.profile.http_filter["@cid"]);
                    Ext.getCmp("http").setRawValue(response.profile.http_filter["#text"]);*/
                    Ext.getCmp("ips").setValue(response.profile.ips["@cid"]);
                    Ext.getCmp("ips").setRawValue(response.profile.ips["#text"]);
                    Ext.getCmp("anti_virus").setValue(response.profile.anti_virus["@cid"]);
                    Ext.getCmp("anti_virus").setRawValue(response.profile.anti_virus["#text"]);
                    Ext.getCmp("anti_spam").setValue(response.profile.anti_spam["@cid"]);
                    Ext.getCmp("anti_spam").setRawValue(response.profile.anti_spam["#text"]);

                    Ext.getCmp("expire_use").setValue((response.expire["@chk_use"]==="on")?true:false);
                    Ext.getCmp("expire_date").setValue(response.expire["@date"]);
                    Ext.getCmp("expire_time").setValue(response.expire["@time"]);
                    Ext.getCmp("desc").setValue(response.desc);

                }
            );





        }else{
               this.setTitle("IPv6 필터링 추가");
               Ext.getCmp("num").setValue(me.total);
               Ext.getCmp("fld_range").setText(" (1 ~ " + (me.total) + ")");
        }
    },

    set_fw_spd_ipv6: function(edit, uid) {
        var me = this;
        var __tmptotal = Ext.data.StoreManager.lookup('store_spd_ipv6_list').getTotalCount();

        var obj = new Object();
        var rule = {};

        var ar_src = Ext.getCmp('src').displayTplData;
        var ar_dest = Ext.getCmp('dest').displayTplData;
        var ar_svc = Ext.getCmp('service').displayTplData;

        var cnt_src = ar_src.length;
        var cnt_dest = ar_dest.length;
        var cnt_service = ar_svc.length;


        var tmp_null = {"@cid" :"null", "@otype" : "Any",  "#text" : "Any"};

        rule["src"] = [];
        rule["dest"] = [];
        rule["service"] = [];



        if(cnt_src === 0){rule["src"].push(tmp_null);}else{
        for(var i=0; i<cnt_src; i++){

            obj = {
                    '@cid' : ar_src[i].cid.split(":")[1],
                    '@otype' :ar_src[i].otype,
                    '#text' : ar_src[i].name
                };

            rule["src"].push(obj);
        }
        }

        if(cnt_dest === 0){rule["dest"].push(tmp_null);}else{
        for(var i=0; i<cnt_dest; i++){

            obj = {
                    '@cid' : ar_dest[i].cid.split(":")[1],
                    '@otype' :ar_dest[i].otype,
                    '#text' : ar_dest[i].name
                };

            rule["dest"].push(obj);
        }
        }


        if(cnt_service === 0){rule["service"].push(tmp_null);}else{
        for(var i=0; i<cnt_service; i++){

            obj = {
                    '@cid' : ar_svc[i].cid.split(":")[1],
                    '@otype' :ar_svc[i].otype,
                    '#text' : ar_svc[i].name
                };

            rule["service"].push(obj);
        }
        }



        var update	=(me.edit === "edit")?true:false;

        if(update===false){

        var num = parseInt(Ext.getCmp('num').getValue());


        rule["@use"]		= "on";
        rule["@num"]		= (num > (__tmptotal))?__tmptotal:num;
        }else{
        rule["@uid"]		= parseInt(me.uid);
        }
        rule["desc"]		= Ext.getCmp('desc').getValue();


        rule["etc"] = {
            "@action" :Ext.getCmp('action_g').getValue().action,
            "@cross_spd" : (Ext.getCmp('cross_spd').getValue()===true)?"on":"off",
            "@timeout" : Ext.getCmp('timeout').getValue(),
            "@loglevel" : Ext.getCmp('loglevel').getValue()
        };


        if(Ext.getCmp('loglevel').getValue()==="user"){
            rule["loglevel"] = {
            "@create" :(Ext.getCmp('lv_create').getValue()===true)?"on":"off",
            "@accept" : (Ext.getCmp('lv_accept').getValue()===true)?"on":"off",
            "@drop" : (Ext.getCmp('lv_drop').getValue()===true)?"on":"off",
            "@close" : (Ext.getCmp('lv_close').getValue()===true)?"on":"off",
            "@abnormal" : (Ext.getCmp('lv_abnormal').getValue()===true)?"on":"off"
            };
        }else{
            rule["loglevel"] = {
            "@create" :"off",
            "@accept" :"off",
            "@drop" :"off",
            "@close":"off",
            "@abnormal" :"off"
        };

        }

        rule["header"] = {
            "@cid" :Ext.getCmp('header').getValue(),
            "#text" : Ext.getCmp('header').getRawValue()

        };


        rule["schedule"] = {
            "@cid" :Ext.getCmp('schedule').getValue(),
            "#text" : Ext.getCmp('schedule').getRawValue()

        };

        rule["resource"] = {

            "qos" :{

               "@cid" :Ext.getCmp('qos').getValue(),
                "#text" : Ext.getCmp('qos').getRawValue(),
                "prio" :(Ext.getCmp('qos_prio').hidden===false)?Ext.getCmp('qos_prio').getValue():""
            },

            "session" :{

               "@cid" :Ext.getCmp('session').getValue(),
                "#text" : Ext.getCmp('session').getRawValue()
            }

        };

        rule["profile"] = {

           /* "ddos" :{

                "@cid" :Ext.getCmp('ddos').getValue(),
                "#text" : Ext.getCmp('ddos').getRawValue()
            },

            "application" :{

                "@cid" :Ext.getCmp('app').getValue(),
                "#text" : Ext.getCmp('app').getRawValue()
            },

            "http_filter" :{

                "@cid" :Ext.getCmp('http').getValue(),
                "#text" : Ext.getCmp('http').getRawValue()
            },*/

            "ips" :{

                "@cid" :(Ext.getCmp("ips").hidden)?null:Ext.getCmp('ips').getValue(),
                "#text" : (Ext.getCmp("ips").hidden)?"":Ext.getCmp('ips').getRawValue()
            },

            "anti_virus" :{

               "@cid" :(Ext.getCmp("anti_virus").hidden)?null:Ext.getCmp('anti_virus').getValue(),
                "#text" : (Ext.getCmp("anti_virus").hidden)?"":Ext.getCmp('anti_virus').getRawValue()
            },

            "anti_spam" :{

               "@cid" :(Ext.getCmp("anti_spam").hidden)?null:Ext.getCmp('anti_spam').getValue(),
                "#text" : (Ext.getCmp("anti_spam").hidden)?"":Ext.getCmp('anti_spam').getRawValue()
            }

        };

        rule["expire"] = {

            "@chk_use":(Ext.getCmp('expire_use').getValue()===true)?"on":"off",
            "@date":Ext.getCmp('expire_date').getSubmitValue(),
            "@time":(Ext.getCmp('expire_time').getSubmitValue()===null)?"":Ext.getCmp('expire_time').getSubmitValue()

        };


        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            obj : Ext.encode(rule),
            id_info : Ext.encode({'fieldname':'@uid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(update),
            check_duplicate : Ext.encode(true)

        };


        var myMask = new Ext.LoadMask(Ext.get('fm'), {msg:"loading..."});
        myMask.show();

        request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
              function(response){

                  myMask.hide();


                  if(response.set_uid===0 && response.dup_uid_cnt > 0){


                      Ext.MessageBox.confirm("System Message",get_msg('conf_dobrule') + response.dup_uid_list,function(btn){
                            if(btn === "no"){
                                return false;
                            }else{
                                fn_dupset(false);

                            }
                      });
                  }else{
                      setalarmmsg(update);
                  }
              }
        );




        function fn_dupset(dupmode){


              _params.check_duplicate = Ext.encode(dupmode);

            request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,
              function(response){

                  setalarmmsg(update);
              }
            );


        }

        function setalarmmsg(update){
             if(update===true){

                           Ext.Msg.show({
                                title: 'System Message - SUCCESS',
                                msg: get_msg("msg_ok_edit"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                fn: setWinClose,
                                icon: Ext.window.MessageBox.INFO
                                });



                       }else{
                           Ext.Msg.show({
                                title: 'System Message - SUCCESS',
                                msg: get_msg("msg_ok_add"),
                                width: 300,
                                buttons: Ext.Msg.YESNO,
                                buttonText:{
                                yes: "계속 추가",
                                no: "닫기"
                                },
                                fn: me.setWinState_policy,
                                icon: Ext.window.MessageBox.INFO
                            });

                       }

              var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
              _store.load();

        }


    },

    setWinState_policy: function(btn) {
        if(btn==="no"){
                var win = Ext.WindowManager.getActive();
                if (win) {
                    win.close();
             }
             }else{
                Ext.getCmp("fm").getForm().reset();
        		Ext.ComponentQuery.query('label[cls="errorBox"]').forEach(function(cls){ cls.hide(); });
        		var __tmptotal = Ext.data.StoreManager.lookup('store_spd_ipv6_list').getTotalCount();
        		Ext.getCmp("num").setValue(__tmptotal+1);
                Ext.getCmp("fld_range").setText(" (1 ~ " + (__tmptotal+1) + ")");
        }
    }

});
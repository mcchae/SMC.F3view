
Ext.define('SMC4ZEN.view.NFW2_network_router_multicast', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_multicast',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_multicastViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.Tag',
        'Ext.button.Button',
        'Ext.button.Segmented',
        'Ext.XTemplate',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_router_multicast'
    },
    // cls: 'zen_body',
    id: 'NFW2_network_router_multicast',
    width: 900,
    defaultListenerScope: true,
    overflowY: 'auto',
    title : 'Multicast',
    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'fieldset',
                    listeners: {
                        beforerender: 'onFieldsetBeforeRender'
                    },
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'multicast_inter_con',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 155,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'tagfield',
                                    id: 'multicast_inter_tag',
                                    width: 330,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    listeners: {
                                        change: 'onMulticast_inter_tagChange'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    hidden: true,
                                    iconCls: 'icb_add',
                                    text: '인터페이스 추가',
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    validator: function(value) {
                                        if(Ext.getCmp("multicast_grid").getStore().data.length === 0){
                                            return get_msg('err_null');
                                        }

                                        return true;
                                    },
                                    hidden: true,
                                    id: 'multicast_interface',
                                    fieldLabel: '인터페이스',
                                    labelCls: 'lb_req',
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_interface',
                                    valueField: 'name',
                                    listeners: {
                                        errorchange: 'onMulticast_interfaceErrorChange',
                                        change: 'onMulticast_interfaceChange'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'interface_error',
                                    margin: '5 0 0 5'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'multicast_con',
                            margin: '5 0 0 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: 'rp_label',
                                            width: 155,
                                            bind: {
                                                text: '{operate_rp}'
                                            }
                                        },
                                        {
                                            xtype: 'segmentedbutton',
                                            cls: 'zen_seg',
                                            items: [
                                                {
                                                    id: 'multicast_btn_sta',
                                                    enableToggle: true,
                                                    bind: {
                                                        text: '{static_rp}'
                                                    },
                                                    listeners: {
                                                        click: 'onMulticast_btn_staClick'
                                                    }
                                                },
                                                {
                                                    id: 'multicast_btn_boot',
                                                    margin: '0 0 0 5',
                                                    bind: {
                                                        text: '{bootstrap_rp}'
                                                    },
                                                    listeners: {
                                                        click: 'onMulticast_btn_bootClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'multicast_sta_con',
                                    margin: '8 0 0 -10',
                                    items: [
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
                                                        if(value !== true){
                                                            var rp_add = ValidIPAddress(value);
                                                            var nullChk = CheckNotNull(value);

                                                            if(!nullChk){ return get_msg('err_null'); }
                                                            if(!rp_add){ return get_msg('err_ip'); }
                                                        }
                                                        return true;
                                                    },
                                                    id: 'multicast_rp_add',
                                                    labelCls: 'lb_req',
                                                    labelSeparator: ' ',
                                                    labelWidth: 150,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.]/,
                                                    bind: {
                                                        fieldLabel: '{rp_address}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onMulticast_rp_addErrorChange',
                                                        focus: 'onMulticast_rp_addFocus',
                                                        blur: 'onMulticast_rp_addBlur',
                                                        keydown: 'onMulticast_rp_addKeydown'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'multicast_boot_con',
                                    margin: '8 0 0 0',
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 155,
                                                    bind: {
                                                        text: '{bootstrap_prio}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        255,
                                                        null)
                                                    },
                                                    id: 'multicast_bt_num',
                                                    width: 80,
                                                    labelSeparator: ' ',
                                                    labelWidth: 150,
                                                    msgTarget: 'none',
                                                    value: '1',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        errorchange: 'onMulticast_bt_numErrorChange',
                                                        keydown: 'onMulticast_bt_numKeydown',
                                                        focus: 'onMulticast_bt_numFocus',
                                                        blur: 'onMulticast_bt_numBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{large_high}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 8 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 155,
                                                    bind: {
                                                        text: '{candidate_period}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        255,
                                                        null)
                                                    },
                                                    cls: 'inp_unit',
                                                    id: 'multicast_date_lt',
                                                    width: 120,
                                                    afterBodyEl: [
                                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                                    ],
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: '1',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        errorchange: 'onMulticast_date_ltErrorChange',
                                                        keydown: 'onMulticast_date_ltKeydown',
                                                        focus: 'onMulticast_date_ltFocus',
                                                        blur: 'onMulticast_date_ltBlur'
                                                    }
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
                                                    xtype: 'label',
                                                    cls: 'lb_req',
                                                    width: 155,
                                                    bind: {
                                                        text: '{candidate_prio}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value !== true){
                                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                            if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }
                                                        }

                                                        return true;
                                                    },
                                                    fieldInfo: {
                                                        txt: msg_tip_length(1,
                                                        255,
                                                        null)
                                                    },
                                                    id: 'multicast_date_num',
                                                    width: 80,
                                                    labelSeparator: ' ',
                                                    msgTarget: 'none',
                                                    value: '1',
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 3,
                                                    listeners: {
                                                        errorchange: 'onMulticast_date_numErrorChange',
                                                        keydown: 'onMulticast_date_numKeydown',
                                                        focus: 'onMulticast_date_numFocus',
                                                        blur: 'onMulticast_date_numBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    cls: 'mt_info',
                                                    margin: '3 0 0 5',
                                                    bind: {
                                                        text: '{lower_high}'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'multicast_rp_con',
                            margin: '8 0 0 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 150,
                                    bind: {
                                        text: '{multi_rp}'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'multicast_rp_on',
                                    width: 105,
                                    boxLabel: 'ON',
                                    listeners: {
                                        change: 'onMulticast_rp_onChange'
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    flex: 1,
                                    id: 'multicast_rp_off',
                                    boxLabel: 'OFF',
                                    checked: true,
                                    listeners: {
                                        change: 'onMulticast_rp_offChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'multicast_spt_con',
                            margin: '8 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 165,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_req',
                                            width: 155,
                                            bind: {
                                                text: '{spt_conversion}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            items: [
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
                                                                if(value !== true){
                                                                    var _value = removeComma(value);

                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 999999)){ return ValidLimit(1, addComma(999999)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                999999,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'multicast_reg_rate',
                                                            width: 300,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("kbps")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '5',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 7,
                                                            maxLengthText: ' ',
                                                            bind: {
                                                                fieldLabel: '{register_rate}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onMulticast_reg_rateErrorChange',
                                                                keydown: 'onMulticast_reg_rateKeydown',
                                                                focus: 'onMulticast_reg_rateFocus',
                                                                blur: 'onMulticast_reg_rateBlur',
                                                                change: 'onMulticast_reg_rateChange'
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
                                                                    var _value = removeComma(value);

                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 3600)){ return ValidLimit(1, addComma(3600)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                3600,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'multicast_reg_lt',
                                                            width: 300,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '20',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 5,
                                                            maxLengthText: ' ',
                                                            bind: {
                                                                fieldLabel: '{monitoring_period}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onMulticast_reg_ltErrorChange',
                                                                keydown: 'onMulticast_reg_ltKeydown',
                                                                focus: 'onMulticast_reg_ltFocus',
                                                                blur: 'onMulticast_reg_ltBlur',
                                                                change: 'onMulticast_reg_ltChange'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            items: [
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
                                                                if(value !== true){
                                                                    var _value = removeComma(value);

                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 999999)){ return ValidLimit(1, addComma(999999)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                999999,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'multicast_data_rate',
                                                            width: 300,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("kbps")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '5',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 7,
                                                            maxLengthText: ' ',
                                                            bind: {
                                                                fieldLabel: '{data_rate}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onMulticast_data_rateErrorChange',
                                                                keydown: 'onMulticast_data_rateKeydown',
                                                                focus: 'onMulticast_data_rateFocus',
                                                                blur: 'onMulticast_data_rateBlur',
                                                                change: 'onMulticast_data_rateChange'
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
                                                                    var _value = removeComma(value);

                                                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                                    if(!LengthCheck(_value, 1, 3600)){ return ValidLimit(1, addComma(3600)); }
                                                                }

                                                                return true;
                                                            },
                                                            fieldInfo: {
                                                                txt: msg_tip_length(1,
                                                                3600,
                                                                null)
                                                            },
                                                            cls: 'inp_unit',
                                                            id: 'multicast_data_lt',
                                                            width: 300,
                                                            afterBodyEl: [
                                                                '<div class="inp_after">{[__zen("sec")]}</div>'
                                                            ],
                                                            labelSeparator: ' ',
                                                            labelWidth: 120,
                                                            msgTarget: 'none',
                                                            value: '20',
                                                            enableKeyEvents: true,
                                                            enforceMaxLength: true,
                                                            maskRe: /[0-9]/,
                                                            maxLength: 5,
                                                            maxLengthText: ' ',
                                                            bind: {
                                                                fieldLabel: '{monitoring_period}'
                                                            },
                                                            listeners: {
                                                                errorchange: 'onMulticast_data_ltErrorChange',
                                                                keydown: 'onMulticast_data_ltKeydown',
                                                                focus: 'onMulticast_data_ltFocus',
                                                                blur: 'onMulticast_data_ltBlur',
                                                                change: 'onMulticast_data_ltChange'
                                                            }
                                                        }
                                                    ]
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
                    hidden: true,
                    id: 'multicast_inter_set_con',
                    margin: '8 0 0 10',
                    width: 347,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            id: 'multicast_grid',
                            maxHeight: 136,
                            scrollable: {
                                x: false,
                                y: true
                            },
                            width: 330,
                            header: false,
                            title: 'My Grid Panel',
                            allowDeselect: true,
                            disableSelection: true,
                            hideHeaders: true,
                            store: 'store_use_interface',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.tdCls = 'cell_combo';

                                        if(value === ""){ return 'Select'; }
                                        return value;
                                    },
                                    width: 285,
                                    dataIndex: 'name',
                                    editor: {
                                        xtype: 'combobox',
                                        baseCls: 'cell_combo',
                                        editable: false,
                                        emptyText: 'Select',
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_interface',
                                        valueField: 'name',
                                        listeners: {
                                            collapse: 'onComboboxCollapse',
                                            focus: 'onComboboxFocus',
                                            blur: 'onComboboxBlur',
                                            select: 'onComboboxSelect'
                                        }
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 45,
                                    align: 'center',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var grid = Ext.getCmp("multicast_grid").getStore().data;
                                                var store = Ext.data.StoreManager.lookup("store_interface");

                                                Ext.getCmp("multicast_grid").getStore().removeAt(rowIndex);

                                                Ext.getCmp('NFW2_network_router_multicast').chk_interface();
                                            },
                                            iconCls: 'icr_del'
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                markDirty: false
                            },
                            plugins: [
                                {
                                    ptype: 'cellediting',
                                    pluginId: 'multicast_plug',
                                    clicksToEdit: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_router_multicastAfterRender',
        beforeclose: 'saveData'
    },
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
                //     id: 'multicast_btn_ok',
                //     iconCls: 'ft_confirm_icl',
                //     bind: {
                //         text: '{confirm}'
                //     },
                //     listeners: {
                //         click: 'onMulticast_btn_okClick',
                //         blur: 'onMulticast_btn_okBlur'
                //     }
                // },
                // {
                //     xtype: 'button',
                //     cls: 'ft_cancel',
                //     id: 'multicast_btn_cancel',
                //     bind: {
                //         text: '{cancel}'
                //     },
                //     listeners: {
                //         click: 'onMulticast_btn_cancelClick'
                //     }
                // }
            ]
        }
    ],

    onFieldsetBeforeRender: function(component, eOpts) {
        component.setTitle(__zen('multicast'));

        var tbutton_checked = false;

        if(this.getViewModel().data.network_router_multicast.chk_use === 'on'){
            tbutton_checked = true;

            Ext.getCmp("multicast_con").enable();
            Ext.getCmp("multicast_rp_con").enable();
            Ext.getCmp("multicast_spt_con").enable();
            Ext.getCmp("multicast_inter_con").enable();
        }

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'multicast_chk_use',
            style:'margin-left:765px',
            resizeHandle: false,
            state: tbutton_checked,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var con = Ext.getCmp("multicast_con");
                    var rp_con = Ext.getCmp("multicast_rp_con");
                    var spt_con = Ext.getCmp("multicast_spt_con");
                    var inter_con = Ext.getCmp("multicast_inter_con");
                    var inter_set_con = Ext.getCmp("multicast_inter_set_con");

                    if(newValue){
                        con.enable();
                        rp_con.enable();
                        spt_con.enable();
                        inter_con.enable();
                        //                 inter_set_con.show();
                        //                 if(Ext.getCmp("multicast_grid").getStore().data.length !== 0){ Ext.getCmp('multicast_inter_set_con').show(); }
                        //                 else{ Ext.getCmp('multicast_inter_set_con').hide(); }
                    }
                    else{
                        con.disable();
                        rp_con.disable();
                        spt_con.disable();
                        inter_con.disable();
                        Ext.getCmp('multicast_inter_tag').setValue([]);
                        //                 inter_set_con.hide();
                        Ext.getCmp('multicast_btn_sta').toggle(true);
                        Ext.getCmp('multicast_btn_boot').toggle(false);
                        Ext.getCmp('multicast_sta_con').show();
                        Ext.getCmp('multicast_boot_con').hide();
                        Ext.getCmp('multicast_rp_add').reset();
                        Ext.getCmp('multicast_bt_num').reset();
                        Ext.getCmp('multicast_date_lt').reset();
                        Ext.getCmp('multicast_date_num').reset();
                        Ext.getCmp('multicast_rp_on').setValue(false);
                        Ext.getCmp('multicast_rp_off').setValue(true);
                        Ext.getCmp('multicast_reg_rate').reset();
                        Ext.getCmp('multicast_reg_lt').reset();
                        Ext.getCmp('multicast_data_rate').reset();
                        Ext.getCmp('multicast_data_lt').reset();
                        Ext.getCmp('multicast_interface').reset();
                        Ext.getCmp('multicast_inter_set_con').hide();
                        Ext.getCmp('multicast_grid').getStore().removeAll();
                        Ext.getCmp('NFW2_network_router_multicast').getViewModel().data.network_router_multicast.chk_use = "off";

                        var response_int = setDevInterface(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet);

                        var store_use = Ext.data.StoreManager.lookup('store_interface');
                        store_use.loadData(response_int);

                    }
                }
            }
        });

        component.legend.add(tbutton);
    },

    onMulticast_inter_tagChange: function(field, newValue, oldValue, eOpts) {
        var store = Ext.data.StoreManager.lookup('store_use_interface');
        var record = [];
        for(var i in newValue){
            record.push({
                'name' : newValue[i]
            });
        }

        store.loadData(record);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_router_multicast');
        var store = Ext.data.StoreManager.lookup('store_use_interface');
        var store2 = Ext.data.StoreManager.lookup('store_interface');
        Ext.getCmp('multicast_inter_set_con').show();

        for(var j in store.data.items){
            if(me.multicast_validation(store.data.items[j].data.name,j) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(me.multicast_validation(store.data.items[j].data.name,j));
                me.set_btn = true;
                Ext.getCmp('multicast_grid').getPlugin('multicast_plug').startEdit(Number(j), 0);
                return false;
            }
        }

        if(Ext.getCmp('NFW2_network_router_multicast').inter_max-1 < Ext.getCmp('multicast_grid').getStore().getCount()){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(Ext.getCmp('NFW2_network_router_multicast').inter_max));
            return false;
        }
        var record = {
            'name' : ''
        };

        store.add(record);
    },

    onMulticast_interfaceErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_interfaceChange: function(field, newValue, oldValue, eOpts) {
        if(newValue !== null){ Ext.getCmp('interface_error').hide(); }

        var me = this;

        var inter = Ext.getCmp("multicast_interface");

        var name = inter.getValue();

        if(name === null){
            return false;
        }

        Ext.getCmp("multicast_inter_set_con").show();

        var grid = Ext.getCmp("multicast_grid").getStore().data;

        for(var i=0; i<grid.length; i++){
            if(grid.items[i].data.name === name){
                return false;
            }
        }

        var obj = {
            'name': name
        };

        var _store = Ext.data.StoreManager.lookup("store_use_interface");
        _store.add(obj);

        if(Ext.getCmp("multicast_grid").getStore().data.length !== 0){ Ext.getCmp('multicast_interface').validateValue(true); }

        me.chk_interface();
    },

    onMulticast_btn_staClick: function(button, e, eOpts) {
        var btn_sta = Ext.getCmp('multicast_btn_sta');
        var btn_boot = Ext.getCmp('multicast_btn_boot');
        var sta = Ext.getCmp('multicast_sta_con');
        var boot = Ext.getCmp('multicast_boot_con');

        btn_sta.toggle(true);
        btn_boot.toggle(false);

        sta.show();
        boot.hide();

        Ext.getCmp('multicast_bt_num').reset();
        Ext.getCmp('multicast_date_lt').reset();
        Ext.getCmp('multicast_date_num').reset();
    },

    onMulticast_btn_bootClick: function(button, e, eOpts) {
        var btn_sta = Ext.getCmp('multicast_btn_sta');
        var btn_boot = Ext.getCmp('multicast_btn_boot');
        var sta = Ext.getCmp('multicast_sta_con');
        var boot = Ext.getCmp('multicast_boot_con');

        btn_sta.toggle(false);
        btn_boot.toggle(true);

        sta.hide();
        boot.show();

        Ext.getCmp('multicast_rp_add').reset();
    },

    onMulticast_rp_addErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_rp_addFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onMulticast_rp_addBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_rp_add').validateValue(true);
    },

    onMulticast_rp_addKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onMulticast_bt_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_bt_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_bt_numFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_bt_numBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_bt_num').validateValue(true);
    },

    onMulticast_date_ltErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_date_ltKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_date_ltFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_date_ltBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_date_lt').validateValue(true);
    },

    onMulticast_date_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_date_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_date_numFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_date_numBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_date_num').validateValue(true);
    },

    onMulticast_rp_onChange: function(field, newValue, oldValue, eOpts) {
        var rp_on = Ext.getCmp('multicast_rp_on');
        var rp_off = Ext.getCmp('multicast_rp_off');

        if(newValue){
            rp_off.setValue(false);
            rp_on.setValue(true);
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_multicast.multiRP = "on";
        }
        else{
            rp_on.setValue(false);
            rp_off.setValue(true);
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_multicast.multiRP = "off";
        }
    },

    onMulticast_rp_offChange: function(field, newValue, oldValue, eOpts) {
        var rp_on = Ext.getCmp('multicast_rp_on');
        var rp_off = Ext.getCmp('multicast_rp_off');

        if(newValue){
            rp_on.setValue(false);
            rp_off.setValue(true);
        }
        else{
            rp_off.setValue(false);
            rp_on.setValue(true);
        }
    },

    onMulticast_reg_rateErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_reg_rateKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_reg_rateFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_reg_rateBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_reg_rate').validateValue(true);
    },

    onMulticast_reg_rateChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onMulticast_reg_ltErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_reg_ltKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_reg_ltFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_reg_ltBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_reg_lt').validateValue(true);
    },

    onMulticast_reg_ltChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onMulticast_data_rateErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMulticast_data_rateKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_data_rateFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_data_rateBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_data_rate').validateValue(true);
    },

    onMulticast_data_rateChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onMulticast_data_ltErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);

    },

    onMulticast_data_ltKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onMulticast_data_ltFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onMulticast_data_ltBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('multicast_data_lt').validateValue(true);
    },

    onMulticast_data_ltChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onComboboxFocus: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_router_multicast');
        if(me.set_btn !== true){
            component.expand();
        }

    },

    onComboboxBlur: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_router_multicast');
        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onComboboxSelect: function(combo, record, eOpts) {
        Ext.getCmp('NFW2_network_router_multicast').chk_interface();
    },

    onNFW2_network_router_multicastAfterRender: function(component, eOpts) {
        var me = this;
        me.set_btn = false;
        me.set_inter = false;
        this.fieldInfo = makeZenTip();

        me.get_multicast();
    },

    onMulticast_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var store = Ext.getCmp('multicast_grid').getStore();

        if(Ext.getCmp('multicast_chk_use').getValue() === true){
            var chk_inter = Ext.getCmp('multicast_inter_tag').getValue();
            if(chk_inter.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_interneed'));
                me.set_inter = true;
                return false;
            }

            if(Ext.getCmp('multicast_btn_sta').pressed){
                if(Ext.getCmp('multicast_rp_add').isValid() === false){ Ext.getCmp('multicast_rp_add').focus(); return false; }
            }
            else if(Ext.getCmp('multicast_btn_boot').pressed){
                if(Ext.getCmp('multicast_bt_num').isValid() === false){ Ext.getCmp('multicast_bt_num').focus(); return false; }
                if(Ext.getCmp('multicast_date_lt').isValid() === false){ Ext.getCmp('multicast_date_lt').focus(); return false; }
                if(Ext.getCmp('multicast_date_num').isValid() === false){ Ext.getCmp('multicast_date_num').focus(); return false; }
            }
            if(Ext.getCmp('multicast_reg_rate').isValid() === false){ Ext.getCmp('multicast_reg_rate').focus(); return false; }
            if(Ext.getCmp('multicast_reg_lt').isValid() === false){ Ext.getCmp('multicast_reg_lt').focus(); return false; }
            if(Ext.getCmp('multicast_data_rate').isValid() === false){ Ext.getCmp('multicast_data_rate').focus(); return false; }
            if(Ext.getCmp('multicast_data_lt').isValid() === false){ Ext.getCmp('multicast_data_lt').focus(); return false; }
        }


        var obj = {};
        var chk_use;
        var multiRP;
        var action;
        var store = Ext.data.StoreManager.lookup('store_interface');
        var _store = Ext.data.StoreManager.lookup('store_use_interface');
        var interface = [];

        if(Ext.getCmp('multicast_chk_use').getValue() === true){ chk_use = "on"; }
        else{ chk_use = "off"; }
        if(Ext.getCmp('multicast_rp_on').checked){ multiRP = "on"; }
        else{ multiRP = "off"; }
        if(Ext.getCmp('multicast_btn_sta').pressed){ action = "static"; }
        else{ action = "bootstrap"; }

        for(var j in store.data.items){
            var chk_inter = false;
            for(var k in _store.data.items){
                if(store.data.items[j].data.name === _store.data.items[k].data.name){ chk_inter = true; }
            }

            if(!chk_inter){ interface.push(store.data.items[j].data.name); }
        }

        obj = {
            'chk_use' : chk_use,
            'action' : action,
            'bootstrap_priority' : Ext.getCmp('multicast_bt_num').getValue(),
            'candidate_cycle' : Ext.getCmp('multicast_date_lt').getValue(),
            'candidate_priority' : Ext.getCmp('multicast_date_num').getValue(),
            'static_address' : Ext.getCmp('multicast_rp_add').getValue(),
            'multiRP' : multiRP,
            'register_rate' : removeComma(Ext.getCmp('multicast_reg_rate').getValue()),
            'register_cycle' : removeComma(Ext.getCmp('multicast_reg_lt').getValue()),
            'data_rate' : removeComma(Ext.getCmp('multicast_data_rate').getValue()),
            'data_cycle' : removeComma(Ext.getCmp('multicast_data_lt').getValue()),
            'interface' : interface
        };

        showLoadMask();

        var _params = {
            basename : Ext.encode('network_router_multicast'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                hideLoadMask();
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
    },

    onMulticast_btn_okBlur: function(component, event, eOpts) {
        var me = Ext.getCmp('NFW2_network_router_multicast');
        if(me.set_inter === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_inter = false;
        }
    },

    onMulticast_btn_cancelClick: function(button, e, eOpts) {
        var me = this;
        me.get_multicast();


    },

    chk_interface: function() {
        var _store = Ext.data.StoreManager.lookup("store_use_interface");
        var store_int = Ext.getCmp("multicast_interface").getStore();
        var records = [];

        var response_int = setDevInterface(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet);
        var checker;

        for(var i in response_int){
            checker = 0;
            for(var j in _store.data.items){
                if(_store.data.items[j].data.name === response_int[i].name){ checker = 1; }
            }
            if(checker !== 1){
                records.push(response_int[i]);
            }
        }

        Ext.getCmp('multicast_interface').reset();
    },

    get_multicast: function() {
        var me = this;

        var response = me.getViewModel().data.network_router_multicast;
        console.log('response = ', response);

        if(response !== null){
            if(response.chk_use === "on"){
                Ext.getCmp("multicast_chk_use").state = true;
                Ext.getCmp("multicast_chk_use").moveHandle(true);
                Ext.getCmp("multicast_con").enable();
                Ext.getCmp("multicast_rp_con").enable();
                Ext.getCmp("multicast_spt_con").enable();
                Ext.getCmp("multicast_inter_con").enable();
                Ext.getCmp("multicast_inter_set_con").enable();

                Ext.getCmp('multicast_rp_add').setValue(response.static_address);
                Ext.getCmp('multicast_bt_num').setValue(response.bootstrap_priority);
                Ext.getCmp('multicast_date_lt').setValue(response.candidate_cycle);
                Ext.getCmp('multicast_date_num').setValue(response.candidate_priority);
                Ext.getCmp('multicast_reg_lt').setValue(response.register_cycle);
                Ext.getCmp('multicast_reg_rate').setValue(response.register_rate);
                Ext.getCmp('multicast_data_lt').setValue(response.data_cycle);
                Ext.getCmp('multicast_data_rate').setValue(response.data_rate);

                if(response.action === "static"){
                    Ext.getCmp('multicast_btn_sta').toggle(true);
                    Ext.getCmp('multicast_btn_boot').toggle(false);
                }
                else{
                    Ext.getCmp('multicast_btn_sta').toggle(false);
                    Ext.getCmp('multicast_btn_boot').toggle(true);
                }

                if(response.multiRP === "on"){
                    Ext.getCmp('multicast_rp_on').setValue(true);
                    Ext.getCmp('multicast_rp_off').setValue(false);
                }
                else{
                    Ext.getCmp('multicast_rp_on').setValue(false);
                    Ext.getCmp('multicast_rp_off').setValue(true);
                }

                Ext.getCmp('multicast_interface').setValue(null);

                var store = Ext.data.StoreManager.lookup('store_interface');
                var store2 = Ext.data.StoreManager.lookup('store_use_interface');
                var records = [];

                var records_use = [];

                var response_int = setDevInterface(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet);

                var checker;

                for(var i in response_int){
                    Ext.getCmp('NFW2_network_router_multicast').inter_max = response_int.length;
                    records.push(response_int[i]);

                    checker = 0;
                    for(var j in response['interface']){
                        if(response['interface'][j] === response_int[i].name){ checker = 1; }
                    }
                    if(checker !== 1){
                        records_use.push(response_int[i].name);
                    }
                }

                store.loadData(records);
                Ext.getCmp('multicast_inter_tag').setValue(records_use);

            }
            else{
                Ext.getCmp("multicast_chk_use").state = false;
                Ext.getCmp("multicast_chk_use").moveHandle(false);
                Ext.getCmp("multicast_con").disable();
                Ext.getCmp("multicast_rp_con").disable();
                Ext.getCmp("multicast_spt_con").disable();
                Ext.getCmp("multicast_inter_con").disable();
                Ext.getCmp("multicast_inter_set_con").disable();
                Ext.getCmp('multicast_inter_tag').setValue([]);

                Ext.getCmp('multicast_btn_sta').toggle(true);
                Ext.getCmp('multicast_btn_boot').toggle(false);
                Ext.getCmp('multicast_sta_con').show();
                Ext.getCmp('multicast_boot_con').hide();
                Ext.getCmp('multicast_rp_add').reset();
                Ext.getCmp('multicast_bt_num').reset();
                Ext.getCmp('multicast_date_lt').reset();
                Ext.getCmp('multicast_date_num').reset();
                Ext.getCmp('multicast_rp_on').setValue(false);
                Ext.getCmp('multicast_rp_off').setValue(true);
                Ext.getCmp('multicast_reg_rate').reset();
                Ext.getCmp('multicast_reg_lt').reset();
                Ext.getCmp('multicast_data_rate').reset();
                Ext.getCmp('multicast_data_lt').reset();
                Ext.getCmp('multicast_interface').reset();
                Ext.getCmp('multicast_inter_set_con').hide();
                Ext.getCmp('multicast_grid').getStore().removeAll();

                var store = Ext.data.StoreManager.lookup('store_interface');
                var store2 = Ext.data.StoreManager.lookup('store_use_interface');
                var records = [];
                var records_use = [];

                var response_int = setDevInterface(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet);

                for(var i in response_int){
                    records_use.push(response_int[i]);
                }

                store.loadData(records_use);
                store2.loadData(records);
            }

            if(Ext.getCmp('multicast_btn_sta').pressed){
                me.rp = 'static';
                Ext.getCmp('multicast_btn_sta').toggle(true);
                Ext.getCmp('multicast_sta_con').show();
                Ext.getCmp('multicast_boot_con').hide();
            }
            else if(Ext.getCmp('multicast_btn_boot').pressed){
                me.rp = 'bootstrap';
                Ext.getCmp('multicast_btn_boot').toggle(true);
                Ext.getCmp('multicast_sta_con').hide();
                Ext.getCmp('multicast_boot_con').show();
            }
            else{
                me.rp = 'static';
                Ext.getCmp('multicast_btn_sta').toggle(true);
                Ext.getCmp('multicast_sta_con').show();
                Ext.getCmp('multicast_boot_con').hide();
            }
        }
        else{
            if(Ext.getCmp('multicast_btn_sta').pressed){
                me.rp = 'static';
                Ext.getCmp('multicast_btn_sta').toggle(true);
                Ext.getCmp('multicast_sta_con').show();
                Ext.getCmp('multicast_boot_con').hide();
            }
            else if(Ext.getCmp('multicast_btn_boot').pressed){
                me.rp = 'bootstrap';
                Ext.getCmp('multicast_btn_boot').toggle(true);
                Ext.getCmp('multicast_sta_con').hide();
                Ext.getCmp('multicast_boot_con').show();
            }
            else{
                me.rp = 'static';
                Ext.getCmp('multicast_btn_sta').toggle(true);
                Ext.getCmp('multicast_sta_con').show();
                Ext.getCmp('multicast_boot_con').hide();
            }

            var records = [];
            var records_int = [];

            var response = Object.keys(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet); 

            var interface = [];

            if(response){
                for(var i in response){
                    records[i] = response[i];
                    records_int.push({
                         name : response[i]
                     });
                    interface.push(response.retval[i]);
                }

                var _store = Ext.data.StoreManager.lookup('store_interface');
                _store.loadData(records_int);
            }
        }

    },

    multicast_validation: function(value, index) {
        var store = Ext.getCmp('multicast_grid').getStore();
        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        for(var i in store.data.items){
            if(i !== index){
            if(store.data.items[i].data.name === value){ return get_msg('err_interdob'); }
            }
        }

        return true;
    },


    saveData: function(component, eOpts) {

        var me = this;
        var store = Ext.getCmp('multicast_grid').getStore();

        if(Ext.getCmp('multicast_chk_use').getValue() === true){
            var chk_inter = Ext.getCmp('multicast_inter_tag').getValue();
            if(chk_inter.length === 0){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_interneed'));
                component.parentObj.viewState = false;
                me.set_inter = true;
                return false;
            }

            if(Ext.getCmp('multicast_btn_sta').pressed){
                if(Ext.getCmp('multicast_rp_add').isValid() === false){ Ext.getCmp('multicast_rp_add').focus(); component.parentObj.viewState = false; return false; }
            }
            else if(Ext.getCmp('multicast_btn_boot').pressed){
                if(Ext.getCmp('multicast_bt_num').isValid() === false){ Ext.getCmp('multicast_bt_num').focus(); component.parentObj.viewState = false; return false; }
                if(Ext.getCmp('multicast_date_lt').isValid() === false){ Ext.getCmp('multicast_date_lt').focus(); component.parentObj.viewState = false; return false; }
                if(Ext.getCmp('multicast_date_num').isValid() === false){ Ext.getCmp('multicast_date_num').focus(); component.parentObj.viewState = false; return false; }
            }
            if(Ext.getCmp('multicast_reg_rate').isValid() === false){ Ext.getCmp('multicast_reg_rate').focus(); component.parentObj.viewState = false; return false; }
            if(Ext.getCmp('multicast_reg_lt').isValid() === false){ Ext.getCmp('multicast_reg_lt').focus(); component.parentObj.viewState = false; return false; }
            if(Ext.getCmp('multicast_data_rate').isValid() === false){ Ext.getCmp('multicast_data_rate').focus(); component.parentObj.viewState = false; return false; }
            if(Ext.getCmp('multicast_data_lt').isValid() === false){ Ext.getCmp('multicast_data_lt').focus(); component.parentObj.viewState = false; return false; }
        }


        var obj = {};
        var chk_use;
        var multiRP;
        var action;
        var store = Ext.data.StoreManager.lookup('store_interface');
        var _store = Ext.data.StoreManager.lookup('store_use_interface');
        var interface = [];

        if(Ext.getCmp('multicast_chk_use').getValue() === true){ chk_use = "on"; }
        else{ chk_use = "off"; }
        if(Ext.getCmp('multicast_rp_on').checked){ multiRP = "on"; }
        else{ multiRP = "off"; }
        if(Ext.getCmp('multicast_btn_sta').pressed){ action = "static"; }
        else{ action = "bootstrap"; }

        for(var j in store.data.items){
            var chk_inter = false;
            for(var k in _store.data.items){
                if(store.data.items[j].data.name === _store.data.items[k].data.name){ chk_inter = true; }
            }

            if(!chk_inter){ interface.push(store.data.items[j].data.name); }
        }

        obj = {
            'chk_use' : chk_use,
            'action' : action,
            'bootstrap_priority' : Ext.getCmp('multicast_bt_num').getValue(),
            'candidate_cycle' : Ext.getCmp('multicast_date_lt').getValue(),
            'candidate_priority' : Ext.getCmp('multicast_date_num').getValue(),
            'static_address' : Ext.getCmp('multicast_rp_add').getValue(),
            'multiRP' : multiRP,
            'register_rate' : removeComma(Ext.getCmp('multicast_reg_rate').getValue()),
            'register_cycle' : removeComma(Ext.getCmp('multicast_reg_lt').getValue()),
            'data_rate' : removeComma(Ext.getCmp('multicast_data_rate').getValue()),
            'data_cycle' : removeComma(Ext.getCmp('multicast_data_lt').getValue()),
            'interface' : interface
        };

        Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_multicast = obj;

        component.parentObj.viewState = true;

        return true;
    }

});
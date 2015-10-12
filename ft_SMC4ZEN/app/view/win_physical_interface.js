
Ext.define('SMC4ZEN.view.win_physical_interface', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_physical_interface',

    requires: [
        'SMC4ZEN.view.win_physical_interfaceViewModel',
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.XTemplate',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_physical_interface'
    },
    cls: 'zen_win',
    id: 'win_physical_interface',
    resizable: false,
    width: 700,
    layout: 'anchor',
    modal: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'form_physical_interface',
                        maxHeight: 600,
                        scrollable: {
                            x: false,
                            y: true
                        },
                        bodyPadding: 10,
                        items: [
                            {
                                xtype: 'tabpanel',
                                cls: 'zen_tab',
                                id: 'network_interface_tab',
                                activeTab: 0,
                                items: [
                                    {
                                        xtype: 'panel',
                                        cls: 'zen_tab_body',
                                        bind: {
                                            title: '{basic_info}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                frame: true,
                                                id: 'fs_basic',
                                                items: [
                                                    {
                                                        xtype: 'displayfield',
                                                        id: 'fd_netName',
                                                        margin: '8 0 0 0',
                                                        labelSeparator: ' ',
                                                        labelWidth: 150,
                                                        value: 'Display Field',
                                                        bind: {
                                                            fieldLabel: '{inter}'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        id: 'cb_mode',
                                                        margin: '8 0 0 0',
                                                        width: 250,
                                                        labelSeparator: ' ',
                                                        labelWidth: 145,
                                                        editable: false,
                                                        displayField: 'name',
                                                        store: 'store_networkMode',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{section}'
                                                        },
                                                        listeners: {
                                                            change: 'onCb_modeChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        margin: '0 0 0  -10',
                                                        layout: {
                                                            type: 'hbox',
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
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value !== true){
                                                                                if(!ValidNotKor(value)){ return get_msg(err_notkor); }
                                                                                if(!CheckNotNull(value)){ return get_msg(err_null); }
                                                                            }
                                                                            return true;
                                                                        },
                                                                        id: 'ft_id',
                                                                        margin: '8 0 0 -10',
                                                                        labelCls: 'lb_req',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 145,
                                                                        msgTarget: 'none',
                                                                        enableKeyEvents: true,
                                                                        bind: {
                                                                            fieldLabel: '{id2}'
                                                                        },
                                                                        listeners: {
                                                                            errorchange: 'onFt_mtuErrorChange2',
                                                                            blur: 'onFt_idBlur'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value !== true){
                                                                                if(!CheckNotNull(value)){ return get_msg(err_null); }
                                                                            }
                                                                            return true;
                                                                        },
                                                                        id: 'ft_pw',
                                                                        margin: '8 0 0 50',
                                                                        width: 250,
                                                                        labelCls: 'lb_req',
                                                                        labelSeparator: ' ',
                                                                        msgTarget: 'none',
                                                                        enableKeyEvents: true,
                                                                        bind: {
                                                                            fieldLabel: '{pwd2}'
                                                                        },
                                                                        listeners: {
                                                                            errorchange: 'onFt_mtu1ErrorChange1',
                                                                            blur: 'onFt_pwBlur'
                                                                        }
                                                                    }
                                                                ]
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
                                                                xtype: 'container',
                                                                flex: 1,
                                                                disabled: true,
                                                                id: 'ft_ipv4_con',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'lb_req',
                                                                        width: 160,
                                                                        bind: {
                                                                            text: '{ipv4_mask}'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            // if(!CheckNotNull(value)){ return get_msg(err_null); }
                                                                            if(value !== true){
                                                                                if(value === "") return true;

                                                                                var retValue = ValidNetMask(value);

                                                                                if(!retValue){ return get_error_msg('err_ipv4');  }
                                                                            }
                                                                            return true;
                                                                        },
                                                                        id: 'ft_ipv4',
                                                                        margin: '0 0 0 -10',
                                                                        width: 255,
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 145,
                                                                        msgTarget: 'none',
                                                                        value: 'Display Field',
                                                                        enableKeyEvents: true,
                                                                        maskRe: /[0-9.\/]/,
                                                                        listeners: {
                                                                            errorchange: 'onFt_ipv4ErrorChange',
                                                                            focus: 'onFt_ipv4Focus',
                                                                            blur: 'onFt_ipv4Blur',
                                                                            keydown: 'onFt_ipv4Keydown'
                                                                        }
                                                                    }
                                                                ]
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
                                                                xtype: 'container',
                                                                flex: 1,
                                                                disabled: true,
                                                                id: 'ft_ipv6_con',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        margin: '0 0 0 10',
                                                                        width: 150,
                                                                        bind: {
                                                                            text: '{ipv6_pre}'
                                                                        }
                                                                    },
                                                                    {
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value !== true){
                                                                                if(value === "") return true;

                                                                                var retValue = ValidPrefix(value);

                                                                                if(!retValue){ return get_error_msg('err_ipv4');  }
                                                                            }
                                                                            return true;
                                                                        },
                                                                        id: 'ft_ipv6',
                                                                        margin: '0 0 0 -10',
                                                                        width: 255,
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 145,
                                                                        msgTarget: 'none',
                                                                        value: 'Display Field',
                                                                        enableKeyEvents: true,
                                                                        listeners: {
                                                                            errorchange: 'onFt_ipv6ErrorChange',
                                                                            focus: 'onFt_ipv6Focus',
                                                                            blur: 'onFt_ipv6Blur',
                                                                            keydown: 'onFt_ipv6Keydown'
                                                                        }
                                                                    }
                                                                ]
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
                                                                xtype: 'combobox',
                                                                disabled: true,
                                                                id: 'cb_duplex',
                                                                width: 300,
                                                                labelSeparator: ' ',
                                                                labelWidth: 145,
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_networkDuplex',
                                                                valueField: 'value',
                                                                bind: {
                                                                    fieldLabel: '{duplex}'
                                                                },
                                                                listeners: {
                                                                    change: 'onCb_duplexChange'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'combobox',
                                                                disabled: true,
                                                                id: 'cb_speed',
                                                                margin: '0 0 0 50',
                                                                width: 220,
                                                                labelSeparator: ' ',
                                                                editable: false,
                                                                displayField: 'name',
                                                                store: 'store_networkSpeed',
                                                                valueField: 'value',
                                                                bind: {
                                                                    fieldLabel: '{speed2}'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        margin: '8 0 0 -10',
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

                                                                        if(!CheckNotNull(_value)){ return get_msg(err_null); }

                                                                        if(Ext.getCmp('cb_mode').getValue() === 'pppoe'){
                                                                            if(!LengthCheck(_value,"1","1492")) return ValidLimit("1","1,492");
                                                                        }
                                                                        else{
                                                                            if(!LengthCheck(_value,"1","1500")) return ValidLimit("1","1,500");
                                                                        }
                                                                    }
                                                                    return true;
                                                                },
                                                                fieldInfo: '입력범위 : 58 ~ 1,500',
                                                                disabled: true,
                                                                id: 'ft_mtu',
                                                                labelCls: 'lb_req',
                                                                labelSeparator: ' ',
                                                                labelWidth: 145,
                                                                msgTarget: 'none',
                                                                value: 'Display Field',
                                                                enableKeyEvents: true,
                                                                enforceMaxLength: true,
                                                                maxLength: 5,
                                                                maxLengthText: ' ',
                                                                bind: {
                                                                    fieldLabel: '{mtu}'
                                                                },
                                                                listeners: {
                                                                    keydown: 'onFt_mtuKeydown',
                                                                    errorchange: 'onFt_mtuErrorChange',
                                                                    focus: 'onFt_mtuFocus',
                                                                    blur: 'onFt_mtuBlur',
                                                                    change: 'onFt_mtuChange'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'textfield',
                                                                validator: function(value) {
                                                                    if(value !== true){
                                                                        var _value = removeComma(value);

                                                                        if(!CheckNotNull(_value)){ return get_msg(err_null); }

                                                                        if(_value < 576) return 'MSS 최소값은 576입니다.';

                                                                        var mtu = removeComma(Ext.getCmp('ft_mtu').getValue());

                                                                        if(parseInt(_value)+parseInt(40) > parseInt(mtu)) return 'MSS 최대값(MSS+40)은 MTU보다 클 수 없습니다.';
                                                                    }
                                                                    return true;
                                                                },
                                                                disabled: true,
                                                                id: 'ft_mss',
                                                                margin: '0 0 0 10',
                                                                width: 240,
                                                                labelCls: 'lb_req',
                                                                labelSeparator: ' ',
                                                                msgTarget: 'none',
                                                                enableKeyEvents: true,
                                                                enforceMaxLength: true,
                                                                maxLength: 5,
                                                                maxLengthText: ' ',
                                                                bind: {
                                                                    fieldLabel: '{mss}'
                                                                },
                                                                listeners: {
                                                                    keydown: 'onFt_mtu1Keydown',
                                                                    errorchange: 'onFt_mtu1ErrorChange',
                                                                    blur: 'onFt_mssBlur',
                                                                    change: 'onFt_mssChange'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        disabled: true,
                                                        id: 'cb_zone',
                                                        margin: '8 0 0 0',
                                                        width: 250,
                                                        labelSeparator: ' ',
                                                        labelWidth: 145,
                                                        editable: false,
                                                        displayField: 'name',
                                                        store: 'store_networkZone',
                                                        valueField: 'value',
                                                        bind: {
                                                            fieldLabel: '{zone}'
                                                        },
                                                        listeners: {
                                                            change: 'onCb_zoneChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        id: 'chk_multipath_con',
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
                                                                    text: '{multipath}'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                html: '<div id = "multipath"/>',
                                                                listeners: {
                                                                    render: 'onContainerRender'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        disabled: true,
                                                        hidden: true,
                                                        id: 'chk_multipath1',
                                                        margin: 5,
                                                        fieldLabel: 'Multipath허용',
                                                        labelCls: 'lb_sq',
                                                        labelSeparator: ' ',
                                                        labelWidth: 150
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(value !== true){
                                                                var _value = removeComma(value);
                                                                if(!LengthCheck(_value,"0","10000")) return ValidLimit("0","10,000");
                                                            }
                                                            return true;
                                                        },
                                                        fieldInfo: '입력범위 : 0 ~ 10,000',
                                                        cls: 'inp_unit',
                                                        disabled: true,
                                                        id: 'ft_qos',
                                                        margin: '8 0 10 0',
                                                        width: 270,
                                                        afterBodyEl: [
                                                            '<div class="inp_after">{[__zen("mbps")]}</div>'
                                                        ],
                                                        labelSeparator: ' ',
                                                        labelWidth: 145,
                                                        msgTarget: 'none',
                                                        enableKeyEvents: true,
                                                        enforceMaxLength: true,
                                                        maxLength: 6,
                                                        maxLengthText: ' ',
                                                        bind: {
                                                            fieldLabel: '{qos_bandwidth}'
                                                        },
                                                        listeners: {
                                                            keydown: 'onFt_mtuKeydown1',
                                                            errorchange: 'onFt_mtuErrorChange1',
                                                            focus: 'onFt_qosFocus',
                                                            blur: 'onFt_qosBlur',
                                                            change: 'onFt_qosChange'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        cls: 'zen_tab_body',
                                        id: 'fs_vip_tab',
                                        bind: {
                                            title: '{virtual_ip}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                frame: true,
                                                id: 'fs_ip',
                                                layout: {
                                                    type: 'vbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        items: [
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                id: 'phy_ipv4_btn',
                                                                margin: '8 0 0 10',
                                                                iconCls: 'icb_add',
                                                                bind: {
                                                                    text: '{add_ipv4_mask}'
                                                                },
                                                                listeners: {
                                                                    click: 'onButtonClick4'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'form',
                                                        flex: 1,
                                                        id: 'pnl_phy_ipv4',
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
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value === "") return true;

                                                                            var retValue = ValidNetMask(value);

                                                                            if(!retValue){
                                                                                return get_error_msg('err_ipv4');
                                                                            }

                                                                            return true;
                                                                        },
                                                                        margins: '5',
                                                                        hidden: true,
                                                                        id: 'ft_phy_ipv4',
                                                                        width: 400,
                                                                        fieldLabel: 'IPv4/Netmask',
                                                                        labelCls: 'lb_sq',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 150,
                                                                        msgTarget: 'none',
                                                                        enableKeyEvents: true,
                                                                        listeners: {
                                                                            errorchange: 'onFt_phy_ipv4ErrorChange'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        items: [
                                                            {
                                                                xtype: 'gridpanel',
                                                                hidden: true,
                                                                id: 'grid_phy_ipv4',
                                                                margin: '8 0 0 10',
                                                                width: 350,
                                                                allowDeselect: true,
                                                                disableSelection: true,
                                                                hideHeaders: true,
                                                                store: 'store_phy_ipv4',
                                                                columns: [
                                                                    {
                                                                        xtype: 'gridcolumn',
                                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                            metaData.tdCls = 'cell_text';

                                                                            return value;
                                                                        },
                                                                        width: 300,
                                                                        dataIndex: 'ip',
                                                                        text: 'String',
                                                                        editor: {
                                                                            xtype: 'textfield',
                                                                            baseCls: 'cell_text',
                                                                            enableKeyEvents: true,
                                                                            maskRe: /[0-9.\/]/,
                                                                            listeners: {
                                                                                blur: 'onTextfieldBlur',
                                                                                keydown: 'onTextfieldKeydown',
                                                                                focus: 'onTextfieldFocus'
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
                                                                                    Ext.getCmp('grid_phy_ipv4').getStore().removeAt(rowIndex, 1);

                                                                                    // if(Ext.getCmp('grid_phy_ipv4').getStore().data.length === 0){

                                                                                    //     Ext.getCmp('grid_phy_ipv4').hide();
                                                                                    // }
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
                                                                    Ext.create('Ext.grid.plugin.CellEditing', {
                                                                        pluginId: 'ipv4_plug',
                                                                        clicksToEdit: 1
                                                                    })
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        items: [
                                                            {
                                                                xtype: 'button',
                                                                cls: 'btn_b',
                                                                id: 'phy_ipv6_btn',
                                                                margin: '8 0 8 10',
                                                                iconCls: 'icb_add',
                                                                bind: {
                                                                    text: '{add_ipv6_pre}'
                                                                },
                                                                listeners: {
                                                                    click: 'onButtonClick511'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'form',
                                                        flex: 1,
                                                        id: 'pnl_phy_ipv6',
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
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value === "") return true;

                                                                            var retValue = ValidPrefix(value);

                                                                            if(!retValue){

                                                                                return get_error_msg('err_ipv4');

                                                                            }

                                                                            return true;
                                                                        },
                                                                        margins: '5',
                                                                        hidden: true,
                                                                        id: 'ft_phy_ipv6',
                                                                        width: 400,
                                                                        fieldLabel: 'IPv6/Prefix',
                                                                        labelCls: 'lb_sq',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 150,
                                                                        msgTarget: 'none',
                                                                        enableKeyEvents: true,
                                                                        listeners: {
                                                                            errorchange: 'onFt_phy_ipv6ErrorChange',
                                                                            keydown: 'onFt_phy_ipv6Keydown',
                                                                            focus: 'onFt_phy_ipv6Focus',
                                                                            blur: 'onFt_phy_ipv6Blur'
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                flex: 1,
                                                                items: [
                                                                    {
                                                                        xtype: 'label',
                                                                        cls: 'errorBox',
                                                                        hidden: true,
                                                                        id: 'errorBox4',
                                                                        margin: 5
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'gridpanel',
                                                        flex: 1,
                                                        hidden: true,
                                                        id: 'grid_phy_ipv6',
                                                        margin: '0 0 10 10',
                                                        maxWidth: 350,
                                                        width: 350,
                                                        allowDeselect: true,
                                                        disableSelection: true,
                                                        hideHeaders: true,
                                                        store: 'store_phy_ipv6',
                                                        columns: [
                                                            {
                                                                xtype: 'gridcolumn',
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.tdCls = 'cell_text';
                                                                    console.log(value);
                                                                    return value;
                                                                },
                                                                width: 300,
                                                                dataIndex: 'ip',
                                                                text: 'String',
                                                                editor: {
                                                                    xtype: 'textfield',
                                                                    baseCls: 'cell_text',
                                                                    listeners: {
                                                                        blur: 'onTextfieldBlur1'
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
                                                                            Ext.getCmp('grid_phy_ipv6').getStore().removeAt(rowIndex, 1);

                                                                            // if(Ext.getCmp('grid_phy_ipv6').getStore().data.length === 0){

                                                                            //     Ext.getCmp('grid_phy_ipv6').hide();
                                                                            // }
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
                                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                                pluginId: 'ipv6_plug',
                                                                clicksToEdit: 1
                                                            })
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        cls: 'zen_tab_body',
                                        id: 'fs_dhcp_server_tab',
                                        bind: {
                                            title: '{dhcp_server}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                frame: true,
                                                id: 'fs_dhcp',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        html: '<div id = "dhcp_server_con"/>',
                                                        listeners: {
                                                            render: 'onContainerRender1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        hidden: true,
                                                        id: 'chk_use1',
                                                        margin: 5,
                                                        fieldLabel: '사용',
                                                        labelCls: 'lb_sq',
                                                        labelSeparator: ' ',
                                                        labelWidth: 150,
                                                        listeners: {
                                                            change: 'onChk_useChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        disabled: true,
                                                        id: 'fs_dhcp_con',
                                                        margin: '8 0 0 0',
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
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        var _value = removeComma(value);
                                                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                                                                        if(!LengthCheck(_value,"60","7200")){ return ValidLimit("60",addComma(7200)); }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                fieldInfo: '입력범위 : 60 ~ 7,200',
                                                                                id: 'ft_time',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                enforceMaxLength: true,
                                                                                maskRe: /[0-9]/,
                                                                                maxLength: 5,
                                                                                maxLengthText: ' ',
                                                                                bind: {
                                                                                    fieldLabel: '{allocate_period}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_timeErrorChange',
                                                                                    focus: 'onFt_timeFocus',
                                                                                    blur: 'onFt_timeBlur',
                                                                                    change: 'onFt_timeChange',
                                                                                    keydown: 'onFt_timeKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        //     if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                                        if(value !== ""){
                                                                                            if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                        }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_ftp_name',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 140,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{tftp_server}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_ftp_nameErrorChange',
                                                                                    focus: 'onFt_ftp_nameFocus',
                                                                                    blur: 'onFt_ftp_nameBlur',
                                                                                    keydown: 'onFt_ftp_nameKeydown'
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
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                        if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                    }
                                                                                    return true;

                                                                                },
                                                                                id: 'ft_dns1',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{dns_primary}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_dns1ErrorChange',
                                                                                    focus: 'onFt_dns1Focus',
                                                                                    blur: 'onFt_dns1Blur',
                                                                                    keydown: 'onFt_dns1Keydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        //     if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                                                        if(value !== ""){
                                                                                            if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                        }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_dns2',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 140,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{dns_secondary}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_dns2ErrorChange',
                                                                                    focus: 'onFt_dns2Focus',
                                                                                    blur: 'onFt_dns2Blur',
                                                                                    keydown: 'onFt_dns2Keydown'
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
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                        if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_start_ip',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{start_point}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onTextfieldErrorChange',
                                                                                    focus: 'onFt_start_ipFocus',
                                                                                    blur: 'onFt_start_ipBlur',
                                                                                    keydown: 'onFt_start_ipKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                        if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_end_ip',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{end_point}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onTextfieldErrorChange1',
                                                                                    focus: 'onFt_end_ipFocus',
                                                                                    blur: 'onFt_end_ipBlur',
                                                                                    keydown: 'onFt_end_ipKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                xtype: 'container',
                                                                margin: '0 0 10 0',
                                                                layout: {
                                                                    type: 'hbox',
                                                                    align: 'stretch'
                                                                },
                                                                items: [
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                        if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4'); }
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_netmask',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{netmask}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_netmaskErrorChange',
                                                                                    focus: 'onFt_netmaskFocus',
                                                                                    blur: 'onFt_netmaskBlur',
                                                                                    keydown: 'onFt_netmaskKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        xtype: 'container',
                                                                        flex: 1,
                                                                        items: [
                                                                            {
                                                                                xtype: 'textfield',
                                                                                validator: function(value) {
                                                                                    if(value !== true){
                                                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                        if(!ValidIPAddress(value)){return get_error_msg('err_ipv4');}
                                                                                    }
                                                                                    return true;
                                                                                },
                                                                                id: 'ft_gateway',
                                                                                maxWidth: 300,
                                                                                width: 300,
                                                                                labelCls: 'lb_req',
                                                                                labelSeparator: ' ',
                                                                                labelWidth: 150,
                                                                                msgTarget: 'none',
                                                                                enableKeyEvents: true,
                                                                                bind: {
                                                                                    fieldLabel: '{default_gateway}'
                                                                                },
                                                                                listeners: {
                                                                                    errorchange: 'onFt_gatewayErrorChange',
                                                                                    focus: 'onFt_gatewayFocus',
                                                                                    blur: 'onFt_gatewayBlur',
                                                                                    keydown: 'onFt_gatewayKeydown'
                                                                                }
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onFs_dhcpRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        cls: 'zen_tab_body',
                                        id: 'fs_relay_tab',
                                        bind: {
                                            title: '{dhcp_relay}'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                frame: true,
                                                id: 'fs_relay',
                                                items: [
                                                    {
                                                        xtype: 'container',
                                                        html: '<div id="dhcp_relay_con"/>',
                                                        listeners: {
                                                            render: 'onContainerRender2'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'checkboxfield',
                                                        hidden: true,
                                                        id: 'chk_relay_use1',
                                                        margin: 5,
                                                        fieldLabel: '사용',
                                                        labelCls: 'lb_sq',
                                                        labelSeparator: ' ',
                                                        labelWidth: 150,
                                                        listeners: {
                                                            change: 'onChk_relay_useChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        disabled: true,
                                                        id: 'fs_relay_con',
                                                        margin: '8 0 10 0',
                                                        layout: {
                                                            type: 'hbox',
                                                            align: 'stretch'
                                                        },
                                                        items: [
                                                            {
                                                                xtype: 'container',
                                                                items: [
                                                                    {
                                                                        xtype: 'textfield',
                                                                        validator: function(value) {
                                                                            if(value !== true){
                                                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                                                if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4');}
                                                                            }
                                                                            return true;
                                                                        },
                                                                        id: 'ft_dhcp_server',
                                                                        margin: '8 0 0 0',
                                                                        labelCls: 'lb_req',
                                                                        labelSeparator: ' ',
                                                                        labelWidth: 150,
                                                                        msgTarget: 'none',
                                                                        enableKeyEvents: true,
                                                                        bind: {
                                                                            fieldLabel: '{dhcp_server_ip}'
                                                                        },
                                                                        listeners: {
                                                                            errorchange: 'onFt_dhcp_serverErrorChange',
                                                                            focus: 'onFt_dhcp_serverFocus',
                                                                            blur: 'onFt_dhcp_serverBlur'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ],
                                                listeners: {
                                                    render: 'onFs_relayRender'
                                                }
                                            }
                                        ]
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
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_confirm',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_cancel',
                                        bind: {
                                            text: '{cancel}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick3'
                                        }
                                    }
                                ]
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

    onCb_modeChange: function(field, newValue, oldValue, eOpts) {
        //구분이 none이면 입력값 초기화 및 disble 처리
        Ext.getCmp('fs_vip_tab').disable();
        Ext.getCmp('fs_dhcp_server_tab').disable();
        Ext.getCmp('fs_relay_tab').disable();

        if(newValue === "none"){
            Ext.getCmp('fs_vip_tab').disable();
            Ext.getCmp('fs_dhcp_server_tab').disable();
            Ext.getCmp('fs_relay_tab').disable();
            Ext.getCmp('ft_ipv4').setValue('');
            Ext.getCmp('ft_ipv6').setValue('');
            Ext.getCmp('cb_duplex').setValue('auto');
            Ext.getCmp('cb_speed').setValue('auto');
            Ext.getCmp('ft_mtu').setValue('1500');
            Ext.getCmp('cb_zone').setValue('external');
            Ext.getCmp("chk_multipath").state = false;
            Ext.getCmp("chk_multipath").moveHandle(false);
            Ext.getCmp('ft_qos').setValue('');
            Ext.getCmp("chk_use").state = false;
            Ext.getCmp("chk_use").moveHandle(false);
            Ext.getCmp("chk_relay_use").state = false;
            Ext.getCmp("chk_relay_use").moveHandle(false);

            Ext.getCmp('ft_id').reset();
            Ext.getCmp('ft_pw').reset();

            Ext.getCmp('ft_ipv4_con').disable();
            Ext.getCmp('ft_ipv6_con').disable();
            Ext.getCmp('cb_duplex').disable();
            Ext.getCmp('cb_speed').disable();
            Ext.getCmp('ft_mtu').disable();
            Ext.getCmp('ft_mss').disable();
            Ext.getCmp('cb_zone').disable();
            Ext.getCmp('chk_multipath_con').disable();
            Ext.getCmp('ft_qos').disable('');
            Ext.getCmp('chk_use').disable();
            Ext.getCmp('chk_relay_use').disable();
            Ext.getCmp('phy_ipv4_btn').disable();
            Ext.getCmp('phy_ipv6_btn').disable();
            Ext.getCmp('fs_dhcp_con').disable();
            Ext.getCmp('fs_relay_con').disable();
            Ext.getCmp('fs_ip').disable();
            Ext.getCmp('fs_dhcp').disable();
            Ext.getCmp('fs_relay').disable();

            //가상 IP 초기화
            if(Ext.getCmp('grid_phy_ipv4').getStore().data.length > 0){

                Ext.getCmp('grid_phy_ipv4').getStore().removeAll();

                Ext.getCmp('grid_phy_ipv4').hide();
            }

            if(Ext.getCmp('grid_phy_ipv6').getStore().data.length > 0){

                Ext.getCmp('grid_phy_ipv6').getStore().removeAll();

                Ext.getCmp('grid_phy_ipv6').hide();
            }

            //ip/pw 입력상자 숨김
            Ext.getCmp('ft_id').hide();
            Ext.getCmp('ft_pw').hide();


        }else if(newValue === "pppoe" || newValue === "dhcp"){
            Ext.getCmp('fs_relay_tab').enable();
            //pppoe dhcp 일 경우 ipv4 / ipv6 입력 불가
            Ext.getCmp('ft_ipv4_con').disable();
            Ext.getCmp('ft_ipv6_con').disable();

            Ext.getCmp('chk_use').disable();
            Ext.getCmp('chk_relay_use').enable();
            Ext.getCmp('phy_ipv4_btn').disable();
            Ext.getCmp('phy_ipv6_btn').disable();

            Ext.getCmp('cb_duplex').enable(	);
            //     Ext.getCmp('cb_speed').enable();
            Ext.getCmp('ft_mtu').enable();
            Ext.getCmp('ft_mss').enable();
            Ext.getCmp('cb_zone').enable();
            if(Ext.getCmp('cb_zone').getValue() === "internal"){ Ext.getCmp('chk_multipath_con').disable(); }
            else{ Ext.getCmp('chk_multipath_con').enable(); }
            Ext.getCmp('ft_qos').enable('');
            Ext.getCmp('fs_relay').enable();

            Ext.getCmp('ft_id').hide();
            Ext.getCmp('ft_pw').hide();

            Ext.getCmp('ft_ipv4').setValue("");
            Ext.getCmp('ft_ipv6').setValue("");

            Ext.getCmp('fs_dhcp_con').disable();
            Ext.getCmp('fs_relay_con').disable();

            Ext.getCmp("chk_use").state = false;
            Ext.getCmp("chk_use").moveHandle(false);
            Ext.getCmp("chk_relay_use").state = false;
            Ext.getCmp("chk_relay_use").moveHandle(false);

            Ext.getCmp('fs_ip').disable();
            Ext.getCmp('fs_dhcp').disable();
            Ext.getCmp('fs_relay').enable();

            //가상 IP 초기화
            if(Ext.getCmp('grid_phy_ipv4').getStore().data.length > 0){

                Ext.getCmp('grid_phy_ipv4').getStore().removeAll();

                Ext.getCmp('grid_phy_ipv4').hide();
            }

            if(Ext.getCmp('grid_phy_ipv6').getStore().data.length > 0){

                Ext.getCmp('grid_phy_ipv6').getStore().removeAll();

                Ext.getCmp('grid_phy_ipv6').hide();
            }

            if(newValue === "pppoe"){
                Ext.getCmp('ft_id').reset();
                Ext.getCmp('ft_pw').reset();

                Ext.getCmp('ft_id').show();
                Ext.getCmp('ft_pw').show();


                Ext.getCmp('ft_mtu').setValue('1492');

                Ext.getCmp('ft_mss').setValue('1452');

            }

        }else{
            Ext.getCmp('fs_vip_tab').enable();
            Ext.getCmp('fs_dhcp_server_tab').enable();
            Ext.getCmp('fs_relay_tab').enable();
            Ext.getCmp('ft_ipv4_con').enable();
            Ext.getCmp('ft_ipv6_con').enable();
            Ext.getCmp('cb_duplex').enable();
            //     Ext.getCmp('cb_speed').enable();
            Ext.getCmp('ft_mtu').enable();
            Ext.getCmp('ft_mss').enable();
            Ext.getCmp('cb_zone').enable();
            Ext.getCmp('chk_multipath_con').enable();
            Ext.getCmp('ft_qos').enable('');
            Ext.getCmp('chk_use').enable();
            Ext.getCmp('chk_relay_use').enable();
            Ext.getCmp('phy_ipv4_btn').enable();
            Ext.getCmp('phy_ipv6_btn').enable();
            Ext.getCmp('fs_dhcp').enable();
            Ext.getCmp('ft_id').hide();
            Ext.getCmp('ft_pw').hide();
            Ext.getCmp('fs_ip').enable();
            Ext.getCmp('fs_dhcp').enable();
            Ext.getCmp('fs_relay').enable();

            Ext.getCmp('ft_mtu').setValue('1500');

            Ext.getCmp('ft_mss').setValue('1460');

            if(Ext.getCmp('fd_netName').getValue() === "eth0"){

                Ext.getCmp('cb_zone').disable();

                Ext.getCmp('chk_multipath_con').disable();

                Ext.getCmp('cb_zone').setValue('internal');
            }

        }

    },

    onFt_mtuErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onFt_mtu1ErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onFt_ipv4ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_ipv4Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_ipv4Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_ipv4').validateValue(true);
    },

    onFt_ipv4Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_ipv6ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_ipv6Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_ipv6Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_ipv6').validateValue(true);
    },

    onFt_ipv6Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onCb_duplexChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "auto"){ Ext.getCmp('cb_speed').disable(); }
        else if(newValue === "full" || newValue === "half"){ Ext.getCmp('cb_speed').enable(); }
    },

    onFt_mtuKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_mtuErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_mtuFocus: function(component, event, eOpts) {
        if(Ext.getCmp('cb_mode').getValue() === 'pppoe'){
            component.fieldInfo = '입력범위 : 58 ~ 1,492';
        }
        else{
            component.fieldInfo = '입력범위 : 58 ~ 1,500';
        }

        // setTipFocus(this,component);
    },

    onFt_mtuBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_mtu').validateValue(true);
    },

    onFt_mtuChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_mtu1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_mtu1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_mssBlur: function(component, event, eOpts) {
        Ext.getCmp('ft_mss').validateValue(true);
    },

    onFt_mssChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onCb_zoneChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'internal'){

            Ext.getCmp('chk_multipath_con').disable();
        }else{

            Ext.getCmp('chk_multipath_con').enable();
        }
    },

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_multipath',
            renderTo:'multipath',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false
        });
    },

    onFt_mtuKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_mtuErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_qosFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_qosBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_qos').validateValue(true);
    },

    onFt_qosChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onButtonClick4: function(button, e, eOpts) {
        var record = {
            'ip' : ''
        };

        Ext.getCmp('grid_phy_ipv4').getStore().add(record);
        // var form = Ext.getCmp('pnl_phy_ipv4').getForm();

        // if(form.isValid() && Ext.getCmp('ft_phy_ipv4').getValue() !== ""){

        //     var ip = Ext.getCmp('ft_phy_ipv4').getValue();

        //     var data = {'ip' : ip};

        //     Ext.getCmp('grid_phy_ipv4').getStore().add(data);

            Ext.getCmp('grid_phy_ipv4').show();

        //     Ext.getCmp('ft_phy_ipv4').setValue('');

        // }

    },

    onFt_phy_ipv4ErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox');

        if (error) {
            errUI.setText(error, false);
            errUI.show();
        } else {
            errUI.hide();
        }

    },

    onTextfieldBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onButtonClick511: function(button, e, eOpts) {
        var record = {
            'ip' : ''
        };

        Ext.getCmp('grid_phy_ipv6').getStore().add(record);

        // var form = Ext.getCmp('pnl_phy_ipv6').getForm();

        // if(form.isValid() && Ext.getCmp('ft_phy_ipv6').getValue() !== ""){

        //     var ip = Ext.getCmp('ft_phy_ipv6').getValue();

        //     var data = {'ip' : ip};

        //     Ext.getCmp('grid_phy_ipv6').getStore().add(data);

            Ext.getCmp('grid_phy_ipv6').show();

        //     Ext.getCmp('ft_phy_ipv6').setValue('');

        // }



    },

    onFt_phy_ipv6ErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox');

        if (error) {
            errUI.setText(error, false);
            errUI.show();
        } else {
            errUI.hide();
        }

    },

    onFt_phy_ipv6Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_phy_ipv6Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_phy_ipv6Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onContainerRender1: function(component, eOpts) {
        Ext.getCmp('network_interface_tab').setActiveTab(2);
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_use',
            style:'margin-left:20px',
            renderTo:'dhcp_server_con',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){

                        Ext.getCmp('fs_dhcp_server_tab').enable();
                        Ext.getCmp('fs_relay_tab').disable();

                        if(Ext.getCmp('ft_time').getValue() === ""){

                            Ext.getCmp('ft_time').setValue("600");
                        }

                        Ext.getCmp('fs_dhcp_con').enable();

                    }else{
                        if(Ext.getCmp('cb_mode').getValue() === 'static'){
                            Ext.getCmp('fs_relay_tab').enable();
                        }
                        Ext.getCmp('fs_dhcp_con').disable();

                        Ext.getCmp('ft_time').setValue("");

                        Ext.getCmp('ft_ftp_name').setValue("");

                        Ext.getCmp('ft_dns1').setValue("");

                        Ext.getCmp('ft_dns2').setValue("");

                        Ext.getCmp('ft_start_ip').setValue("");

                        Ext.getCmp('ft_end_ip').setValue("");

                        Ext.getCmp('ft_netmask').setValue("");

                        Ext.getCmp('ft_gateway').setValue("");


                    }
                }
            }
        });

        Ext.getCmp('network_interface_tab').setActiveTab(0);
    },

    onChk_useChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){

            if(Ext.getCmp('ft_time').getValue() === ""){

                Ext.getCmp('ft_time').setValue("600");
            }


            Ext.getCmp('ft_time').enable();

            Ext.getCmp('ft_ftp_name').enable();

            Ext.getCmp('ft_dns1').enable();

            Ext.getCmp('ft_dns2').enable();

            Ext.getCmp('ft_start_ip').enable();

            Ext.getCmp('ft_end_ip').enable();

            Ext.getCmp('ft_netmask').enable();

            Ext.getCmp('ft_gateway').enable();


        }else{

            Ext.getCmp('ft_time').disable();

            Ext.getCmp('ft_ftp_name').disable();

            Ext.getCmp('ft_dns1').disable();

            Ext.getCmp('ft_dns2').disable();

            Ext.getCmp('ft_start_ip').disable();

            Ext.getCmp('ft_end_ip').disable();

            Ext.getCmp('ft_netmask').disable();

            Ext.getCmp('ft_gateway').disable();

            Ext.getCmp('ft_time').setValue("");

            Ext.getCmp('ft_ftp_name').setValue("");

            Ext.getCmp('ft_dns1').setValue("");

            Ext.getCmp('ft_dns2').setValue("");

            Ext.getCmp('ft_start_ip').setValue("");

            Ext.getCmp('ft_end_ip').setValue("");

            Ext.getCmp('ft_netmask').setValue("");

            Ext.getCmp('ft_gateway').setValue("");


        }
    },

    onFt_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_timeFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_timeBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_time').validateValue(true);
    },

    onFt_timeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_ftp_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_ftp_nameFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_ftp_nameBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_ftp_name').validateValue(true);
    },

    onFt_ftp_nameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_dns1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dns1Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_dns1Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_dns1').validateValue(true);
    },

    onFt_dns1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_dns2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dns2Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_dns2Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_dns2').validateValue(true);
    },

    onFt_dns2Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_start_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_start_ipBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_start_ip').validateValue(true);
    },

    onFt_start_ipKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_end_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_end_ipBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_end_ip').validateValue(true);
    },

    onFt_end_ipKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_netmaskErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_netmaskFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_netmaskBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_netmask').validateValue(true);
    },

    onFt_netmaskKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_gatewayErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_gatewayFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_gatewayBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_gateway').validateValue(true);
    },

    onFt_gatewayKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFs_dhcpRender: function(component, eOpts) {
        // Ext.getCmp('network_interface_tab').setActiveTab(2);
        // var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
        //     onText: '사용',
        //     offText: '사용안함',
        //     id:'chk_use',
        //     style:'margin-left:565px',
        //     resizeHandle: false,
        //     state: false,
        //     listeners: {
        //         change: function(field, newValue, oldValue, eOpts){
        //             if(newValue){

        //                 Ext.getCmp('fs_dhcp').expand();

        //                 if(Ext.getCmp('ft_time').getValue() === ""){

        //                     Ext.getCmp('ft_time').setValue("600");
        //                 }

        //                 Ext.getCmp('fs_dhcp_con').enable();
        // //                 Ext.getCmp('ft_time').enable();

        // //                 Ext.getCmp('ft_ftp_name').enable();

        // //                 Ext.getCmp('ft_dns1').enable();

        // //                 Ext.getCmp('ft_dns2').enable();

        // //                 Ext.getCmp('ft_start_ip').enable();

        // //                 Ext.getCmp('ft_end_ip').enable();

        // //                 Ext.getCmp('ft_netmask').enable();

        // //                 Ext.getCmp('ft_gateway').enable();


        //             }else{
        //                 Ext.getCmp('fs_dhcp_con').disable();

        //                 Ext.getCmp('fs_dhcp').collapse();
        // //                 Ext.getCmp('ft_time').disable();

        // //                 Ext.getCmp('ft_ftp_name').disable();

        // //                 Ext.getCmp('ft_dns1').disable();

        // //                 Ext.getCmp('ft_dns2').disable();

        // //                 Ext.getCmp('ft_start_ip').disable();

        // //                 Ext.getCmp('ft_end_ip').disable();

        // //                 Ext.getCmp('ft_netmask').disable();

        // //                 Ext.getCmp('ft_gateway').disable();

        //                 Ext.getCmp('ft_time').setValue("");

        //                 Ext.getCmp('ft_ftp_name').setValue("");

        //                 Ext.getCmp('ft_dns1').setValue("");

        //                 Ext.getCmp('ft_dns2').setValue("");

        //                 Ext.getCmp('ft_start_ip').setValue("");

        //                 Ext.getCmp('ft_end_ip').setValue("");

        //                 Ext.getCmp('ft_netmask').setValue("");

        //                 Ext.getCmp('ft_gateway').setValue("");


        //             }
        //         }
        //     }
        // });

        // component.legend.add(tbutton);
        // Ext.getCmp('network_interface_tab').setActiveTab(0);
    },

    onContainerRender2: function(component, eOpts) {
        Ext.getCmp('network_interface_tab').setActiveTab(3);
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_relay_use',
            style:'margin-left:20px',
            renderTo:'dhcp_relay_con',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){

                        Ext.getCmp('fs_dhcp_server_tab').disable();
                        Ext.getCmp('fs_relay_tab').enable();

                        Ext.getCmp('fs_relay_con').enable();

                    }else{
                        if(Ext.getCmp('cb_mode').getValue() === 'static'){
                            Ext.getCmp('fs_dhcp_server_tab').enable();
                        }

                        Ext.getCmp('fs_relay_con').disable();

                        Ext.getCmp('ft_dhcp_server').setValue('');

                    }
                }
            }
        });

        Ext.getCmp('network_interface_tab').setActiveTab(0);
    },

    onChk_relay_useChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){

            Ext.getCmp('ft_dhcp_server').enable();

        }else{

            Ext.getCmp('ft_dhcp_server').disable();

            Ext.getCmp('ft_dhcp_server').setValue('');
        }
    },

    onFt_dhcp_serverErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_dhcp_serverFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_dhcp_serverBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_dhcp_server').validateValue(true);
    },

    onFs_relayRender: function(component, eOpts) {
        // Ext.getCmp('network_interface_tab').setActiveTab(3);
        // var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
        //     onText: '사용',
        //     offText: '사용안함',
        //     id:'chk_relay_use',
        //     style:'margin-left:565px',
        //     resizeHandle: false,
        //     state: false,
        //     listeners: {
        //         change: function(field, newValue, oldValue, eOpts){
        //             if(newValue){
        //                 Ext.getCmp('fs_relay').expand();

        //                 Ext.getCmp('fs_relay_con').enable();

        //             }else{

        //                 Ext.getCmp('fs_relay_con').disable();

        //                 Ext.getCmp('ft_dhcp_server').setValue('');

        //                 Ext.getCmp('fs_relay').collapse();
        //             }
        //         }
        //     }
        // });

        // component.legend.add(tbutton);
        // Ext.getCmp('network_interface_tab').setActiveTab(0);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        //공통에만 적용
        // if(Ext.getCmp('NFW2_client').isCC === false){

        //멀티패스로 선언 가능한 인터페이스 개수 제한.
        if(Ext.getCmp('chk_multipath').state === true){
            if(Ext.getCmp('pnl_network_interface').multipath_cnt >= Ext.getCmp('pnl_network_interface').multipath_iface){
                Ext.getCmp('network_interface_tab').setActiveTab(0);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(set_multipath_limit(Ext.getCmp('pnl_network_interface').multipath_iface));

                //             Ext.getCmp('errorBox').setText('멀티패스 선언 가능한 인터페이스 개수는 "'+Ext.getCmp('pnl_network_interface').multipath_iface+'"개 입니다.', false);
                //             Ext.getCmp('errorBox').show();

                return false;
            }
        }
        // }

        if(Ext.getCmp('cb_mode').getValue() === 'static'){
            if(Ext.getCmp('ft_ipv4').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_ipv4').focus(); return false; }
            if(Ext.getCmp('ft_ipv6').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_ipv6').focus(); return false; }
            if(Ext.getCmp('ft_ipv4').getValue() === '' && Ext.getCmp('ft_ipv6').getValue() === ''){
                Ext.getCmp('network_interface_tab').setActiveTab(0);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(__zen('type_ip'));
                Ext.getCmp('ft_ipv4').focus();
                //         Ext.getCmp('errorBox').setText('IP를 입력해주세요.', false);
                //         Ext.getCmp('errorBox').show();

                return false;
            }
        }

        if(Ext.getCmp('cb_mode').getValue() === 'pppoe'){
            if(Ext.getCmp('ft_id').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_id').focus(); return false; }
            if(Ext.getCmp('ft_pw').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_pw').focus(); return false; }
            if(Ext.getCmp('ft_id').getValue() === ''){
                Ext.getCmp('network_interface_tab').setActiveTab(0);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(__zen('type_id'));
                Ext.getCmp('ft_id').focus();

                //         Ext.getCmp('errorBox').setText('id를 입력해주세요.', false);
                //         Ext.getCmp('errorBox').show();

                return false;
            }

            if(Ext.getCmp('ft_pw').getValue() === ''){
                Ext.getCmp('network_interface_tab').setActiveTab(0);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(__zen('type_pwd'));
                Ext.getCmp('ft_pw').focus();
                //         Ext.getCmp('errorBox').setText('password를 입력해주세요.', false);
                //         Ext.getCmp('errorBox').show();

                return false;
            }
        }

        if(Ext.getCmp('ft_mtu').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_mtu').focus(); return; }
        if(Ext.getCmp('ft_mss').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_mss').focus(); return; }
        if(Ext.getCmp('ft_qos').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(0); Ext.getCmp('ft_qos').focus(); return; }
        if(Ext.getCmp('chk_use').getValue() === true){
            if(Ext.getCmp('ft_time').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_time').focus(); return; }
            if(Ext.getCmp('ft_ftp_name').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_ftp_name').focus(); return; }
            if(Ext.getCmp('ft_dns1').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_dns1').focus(); return; }
            if(Ext.getCmp('ft_dns2').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_dns2').focus(); return; }
            if(Ext.getCmp('ft_start_ip').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_start_ip').focus(); return; }
            if(Ext.getCmp('ft_end_ip').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_end_ip').focus(); return; }
            if(Ext.getCmp('ft_netmask').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_netmask').focus(); return; }
            if(Ext.getCmp('ft_gateway').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(2); Ext.getCmp('ft_gateway').focus(); return; }
        }
        if(Ext.getCmp('chk_relay_use').getValue() === true){
            if(Ext.getCmp('ft_dhcp_server').isValid() === false){ Ext.getCmp('network_interface_tab').setActiveTab(3); Ext.getCmp('ft_dhcp_server').focus(); return; }
        }


        var mtu = removeComma(Ext.getCmp('ft_mtu').getValue());

        var mss = removeComma(Ext.getCmp('ft_mss').getValue());

        if(parseInt(mss)+parseInt(40) > parseInt(mtu)){
            Ext.getCmp('network_interface_tab').setActiveTab(0);
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(__zen('large_than_mtu'));
            Ext.getCmp('ft_mss').focus();

        }

        var net_info = new Object();

        net_info.name = Ext.getCmp('fd_netName').getValue();

        net_info.mode = Ext.getCmp('cb_mode').getValue();

        net_info.ipv4 = Ext.getCmp('ft_ipv4').getValue();

        if(Ext.getCmp('ft_ipv6').getValue() === ""){

            net_info.ipv6 = null;

        }else{

            net_info.ipv6 = Ext.getCmp('ft_ipv6').getValue();

        }

        net_info.duplex = Ext.getCmp('cb_duplex').getValue();

        net_info.speed = Ext.getCmp('cb_speed').getValue();

        net_info.mtu = removeComma(Ext.getCmp('ft_mtu').getValue());

        net_info.mss = removeComma(Ext.getCmp('ft_mss').getValue());

        net_info.zone = Ext.getCmp('cb_zone').getValue();

        net_info.multipath = Ext.getCmp('chk_multipath').getValue()?"on":"off";

        if(Ext.getCmp('ft_qos').getValue() === ""){

            net_info.qos = null;

        }else{

            net_info.qos = removeComma(Ext.getCmp('ft_qos').getValue());

        }

        if(Ext.getCmp('cb_mode').getValue() === 'pppoe'){

            net_info.id = Ext.getCmp('ft_id').getValue();

            net_info.password= Ext.getCmp('ft_pw').getValue();


        }else{

            net_info.id = null;

            net_info.password = null;

        }

        var vip_info = new Object();

        vip_info.ipv4 = new Object();

        var store = Ext.getCmp('grid_phy_ipv4').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_physical_interface').ipv4_validation(store.data.items[i].data.ip) !== true){
                Ext.getCmp('network_interface_tab').setActiveTab(1);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_physical_interface').ipv4_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_phy_ipv4').getPlugin('ipv4_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv4Range = [];

        if(Ext.getCmp('grid_phy_ipv4').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_phy_ipv4').getStore().data.length ; i++){

                ipv4Range[i] = Ext.getCmp('grid_phy_ipv4').getStore().data.items[i].data.ip;

            }

            vip_info.ipv4 = ipv4Range;

        }else{

            vip_info.ipv4 = null;
        }

        vip_info.ipv6 = new Object();

        var store = Ext.getCmp('grid_phy_ipv6').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_physical_interface').ipv6_validation(store.data.items[i].data.ip) !== true){
                Ext.getCmp('network_interface_tab').setActiveTab(1);
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_physical_interface').ipv6_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_phy_ipv6').getPlugin('ipv6_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv6Range = [];

        if(Ext.getCmp('grid_phy_ipv6').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_phy_ipv6').getStore().data.length ; i++){

                ipv6Range[i] = Ext.getCmp('grid_phy_ipv6').getStore().data.items[i].data.ip;

            }

            vip_info.ipv6 = ipv6Range;

        }else{

            vip_info.ipv6 = null;
        }

        var dhcp_svr_info = new Object();

        //'on'이면 하위 입력값 유효성 체크함, 'off'이면 하위 입력값 유효성 체크 않하고, 기본값으로 저장
        if(Ext.getCmp('chk_use').getValue() === true){

            dhcp_svr_info.use = "on";

            dhcp_svr_info.time = removeComma(Ext.getCmp('ft_time').getValue());

            dhcp_svr_info.ftp_name = Ext.getCmp('ft_ftp_name').getValue();

            dhcp_svr_info.start_ip = Ext.getCmp('ft_start_ip').getValue();

            dhcp_svr_info.end_ip = Ext.getCmp('ft_end_ip').getValue();

            dhcp_svr_info.dns1 = Ext.getCmp('ft_dns1').getValue();

            dhcp_svr_info.dns2 = Ext.getCmp('ft_dns2').getValue();

            dhcp_svr_info.netmask = Ext.getCmp('ft_netmask').getValue();

            dhcp_svr_info.gateway = Ext.getCmp('ft_gateway').getValue();

        }else{

            dhcp_svr_info.use = "off";

        }

        var dhcp_rly_info = new Object();

        //'on' 이면, 유효값 체크 & 저장, use='off' 이면 유효값 체크 & 저장 않함
        if(Ext.getCmp('chk_relay_use').getValue() === true){

            dhcp_rly_info.use = "on";

            dhcp_rly_info.dhcp_server = Ext.getCmp('ft_dhcp_server').getValue();

            //     dhcp_rly_info.ethernet = 'eth0';

        }else{

            dhcp_rly_info.use = "off";

            dhcp_rly_info.dhcp_server = null;

        }

        var _params = {

            net_info : Ext.encode(net_info),

            vip_info : Ext.encode(vip_info),

            dhcp_svr_info : Ext.encode(dhcp_svr_info),

            dhcp_rly_info : Ext.encode(dhcp_rly_info)


        };

        console.log('_params - ', _params);

        if(net_info){

            if(net_info.mode === "none"){
                net_info.mode = null;
            }
            if(net_info.ipv4 === ""){
                net_info.ipv4 = null;
            }
            if(net_info.ipv6 === ""){
                net_info.ipv6 = null;
            }
            if(net_info.mtu === ""){
                net_info.mtu = null;
            }

            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet[net_info.name]['default'] = net_info;
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet[net_info.name]['logical_network'] =null;
        }

        if(vip_info){

            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet[net_info.name]['virtual_ip'] = vip_info;
        }

        if(dhcp_svr_info){
            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_server.network.dhcp_server === null){
                Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_server.network.dhcp_server = {};
            }
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_server.network.dhcp_server[net_info.name] = dhcp_svr_info;
        }

        if(dhcp_rly_info){
            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay === null){
                Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay = {};
            }
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay[net_info.name] = dhcp_rly_info.use;
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay.dhcp_server = dhcp_rly_info.dhcp_server;
        }

        Ext.getCmp('pnl_network_interface').get_network_list();

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'set_network_ethernet',
        //     _params,
        //     function(response){

                if(me.edit !== "edit"){
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_add'),
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });

                }
                else{
                    Ext.Msg.show({
                        title: __weguardia,
                        width: 300,
                        msg: get_msg('msg_ok_edit'),
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }

        //         Ext.getCmp('pnl_network_interface').get_network_list();
        //     }


        // );

        // }
    },

    onButtonClick3: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        this.init_network_interface();
        this.fieldInfo = makeZenTip();
        // chk_zenauth(null);
        var me = this;


        me.setTitle(__zen('inter_set'));
    },

    init_network_interface: function() {
        Ext.getCmp('network_interface_tab').setActiveTab(3);
        Ext.getCmp('network_interface_tab').setActiveTab(2);
        Ext.getCmp('network_interface_tab').setActiveTab(1);
        Ext.getCmp('network_interface_tab').setActiveTab(0);

        var me = this;

        // var _params = {

        //     net_name : Ext.encode(me.net_name)

        // };
        var response = {};

        if(me.net_name.indexOf('eth') > -1){
                response = {
                    'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet[me.net_name]['default'], 
                    'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet[me.net_name]['virtual_ip']
                };
        }
        else if(me.net_name.indexOf('bond') > -1){
                response = {
                    'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding[me.net_name]['default'], 
                    'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding[me.net_name]['virtual_ip']
                };
        }
        else if(me.net_name.indexOf('br') > -1){
                response = {
                    'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge[me.net_name]['default'], 
                    'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge[me.net_name]['virtual_ip']
                };
        }
        else if(me.net_name.indexOf('vlan') > -1){
                response = {
                    'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan[me.net_name]['default'], 
                    'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan[me.net_name]['virtual_ip']
                };
        }

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_network_interface',
        //     _params,
        //     function(response){
                Ext.getCmp('fs_vip_tab').disable();
                Ext.getCmp('fs_dhcp_server_tab').disable();
                Ext.getCmp('fs_relay_tab').disable();
                //인터페이스
                Ext.getCmp('fd_netName').setValue(me.net_name);

                //구분
                if(response.net_info.mode === null){

                    var _store = Ext.data.StoreManager.lookup('store_networkMode');

                    _store.load(function(records, operation, success){

                        if(records.length > 0){

                            Ext.getCmp('cb_mode').setValue(records[0].data.value);

                            Ext.getCmp('cb_mode').setRawValue(records[0].data.name);

                        }

                    });

                }else{

                    Ext.getCmp('cb_mode').setValue(response.net_info.mode);
                }

                if(response.net_info.mode === 'pppoe'){
                    Ext.getCmp('fs_relay_tab').enable();
                    Ext.getCmp('fs_relay').enable();
                    Ext.getCmp('fs_relay_con').enable();
                    if(response.net_info.id === null){ Ext.getCmp('ft_id').reset(); }
                    else{ Ext.getCmp('ft_id').setValue(response.net_info.id); }

                    Ext.getCmp('ft_pw').setValue(response.net_info.password);

                }
                if(response.net_info.mode === 'dhcp'){
                    Ext.getCmp('fs_relay_tab').enable();
                    Ext.getCmp('fs_relay').enable();
                    Ext.getCmp('fs_relay_con').enable();
                }
                //IPv4
                Ext.getCmp('ft_ipv4').setValue(response.net_info.ipv4);

                //IPv6
                Ext.getCmp('ft_ipv6').setValue(response.net_info.ipv6);

                //Duplex
                Ext.getCmp('cb_duplex').setValue(response.net_info.duplex);

                //speed
                Ext.getCmp('cb_speed').setValue(response.net_info.speed);

                //mtu
                if(response.net_info.mtu === null){

                    Ext.getCmp('ft_mtu').setValue(1500);

                }else{

                    Ext.getCmp('ft_mtu').setValue(response.net_info.mtu);
                }

                //mss
                if(response.net_info.mss === ""){

                    Ext.getCmp('ft_mss').setValue(1460);

                }else{

                    Ext.getCmp('ft_mss').setValue(response.net_info.mss);
                }

                //zone
                Ext.getCmp('cb_zone').setValue(response.net_info.zone);


                if(response.net_info.zone === 'internal'){

                    Ext.getCmp('chk_multipath_con').disable();
                }else{

                    Ext.getCmp('chk_multipath_con').enable();
                }

                //multipath
                if(response.net_info.multipath === "on"){

                    Ext.getCmp("chk_multipath").state = true;
                    Ext.getCmp("chk_multipath").moveHandle(true);
                    //             Ext.getCmp('chk_multipath').setValue(true);

                }else{
                    Ext.getCmp("chk_multipath").state = false;
                    Ext.getCmp("chk_multipath").moveHandle(false);
                    //             Ext.getCmp('chk_multipath').setValue(false);

                }

                //qos
                Ext.getCmp('ft_qos').setValue(response.net_info.qos);

                //IPv4/Netmask
                Ext.getCmp('grid_phy_ipv4').getStore().removeAll();
                if(response.vip_info.ipv4 !== null){
                    //             Ext.getCmp('fs_ip').expand();
                    var ipv4 = [];

                    for(var i in response.vip_info.ipv4){

                        ipv4[i] = {'ip' : response.vip_info.ipv4[i]};

                    }

                    Ext.getCmp('grid_phy_ipv4').getStore().add(ipv4);

                    Ext.getCmp('grid_phy_ipv4').show();


                }

                //IPv6/Prefix
                Ext.getCmp('grid_phy_ipv6').getStore().removeAll();
                if(response.vip_info.ipv6 !== null){
                    //             Ext.getCmp('fs_ip').expand();
                    var ipv6 = [];

                    for(var i in response.vip_info.ipv6){

                        ipv6[i] = {'ip' : response.vip_info.ipv6[i]};

                    }

                    Ext.getCmp('grid_phy_ipv6').getStore().add(ipv6);

                    Ext.getCmp('grid_phy_ipv6').show();


                }

                if(Ext.getCmp('cb_mode').getValue() === 'none'){

                    Ext.getCmp('ft_ipv4_con').disable();
                    Ext.getCmp('ft_ipv6_con').disable();
                    Ext.getCmp('cb_duplex').disable();
                    Ext.getCmp('cb_speed').disable();
                    Ext.getCmp('ft_mtu').disable();
                    Ext.getCmp('ft_mss').disable();
                    Ext.getCmp('cb_zone').disable();
                    Ext.getCmp('chk_multipath_con').disable();
                    Ext.getCmp('chk_use').disable();
                    Ext.getCmp('chk_relay_use').disable();

                    Ext.getCmp('fs_ip').disable();
                }
                else if(Ext.getCmp('cb_mode').getValue() === 'static'){
                    if(me.net_name === "eth0"){

                        Ext.getCmp('cb_zone').disable();

                        Ext.getCmp('chk_multipath_con').disable();
                    }
                }
        //     }


        // );


        // var _params = {

        //     eth_name : Ext.encode(me.net_name)

        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_dhcp_server',
        //     _params,
        //     function(response){
            response = null;

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_server.network.dhcp_server)
                response = Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_server.network.dhcp_server;

                if(response){
                    Ext.getCmp("chk_use").state = false;
                    Ext.getCmp("chk_use").moveHandle(false);

                }else{
                    //사용
                    if(response.use === "off"){
                        Ext.getCmp("chk_use").state = false;
                        Ext.getCmp("chk_use").moveHandle(false);
        //                 Ext.getCmp('fs_dhcp_server_tab').enable();

                    }else{
                        Ext.getCmp("chk_use").state = true;
                        Ext.getCmp("chk_use").moveHandle(true);
                        Ext.getCmp('fs_dhcp_server_tab').enable();
                        Ext.getCmp('fs_relay_tab').disable();
                        //                 Ext.getCmp('fs_dhcp').expand();
                        Ext.getCmp('fs_dhcp_con').enable();
                        Ext.getCmp('ft_time').enable();

                        Ext.getCmp('ft_ftp_name').enable();

                        Ext.getCmp('ft_dns1').enable();

                        Ext.getCmp('ft_dns2').enable();

                        Ext.getCmp('ft_start_ip').enable();

                        Ext.getCmp('ft_end_ip').enable();

                        Ext.getCmp('ft_netmask').enable();

                        Ext.getCmp('ft_gateway').enable();

                    }

                    //할당시간
                    Ext.getCmp('ft_time').setValue(response.time);

                    //TFTP서버IP
                    Ext.getCmp('ft_ftp_name').setValue(response.ftp_name);

                    //기본 DNS
                    Ext.getCmp('ft_dns1').setValue(response.dns1);

                    //보조 DNS
                    Ext.getCmp('ft_dns2').setValue(response.dns2);

                    //할당 IP
                    Ext.getCmp('ft_start_ip').setValue(response.start_ip);

                    Ext.getCmp('ft_end_ip').setValue(response.end_ip);

                    //netmask
                    Ext.getCmp('ft_netmask').setValue(response.netmask);

                    //기본게이트웨이
                    Ext.getCmp('ft_gateway').setValue(response.gateway);
                }

                if(Ext.getCmp('cb_mode').getValue() === 'none'){

                    Ext.getCmp('fs_dhcp').disable();
                }


        //     }
        // );
            response = {'use': 'off', 'dhcp_server': null, 'dhcp_ethernet': null};

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay){
                response.use = Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay[me.net_name].use;
                response.dhcp_server = Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay.dhcp_server;
                response.dhcp_ethernet = Ext.getCmp('pnl_network_interface').getViewModel().data.network_dhcp_relay.network.dhcp_relay.dhcp_ethernet;
            }


        // var _params = {

        //     eth_name : Ext.encode(me.net_name)

        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_dhcp_relay',
        //     _params,
        //     function(response){
                //사용
                if(response.use === "off"){
                    Ext.getCmp("chk_relay_use").state = false;
                    Ext.getCmp("chk_relay_use").moveHandle(false);
        //             Ext.getCmp('fs_relay_tab').enable();
                    Ext.getCmp('fs_relay_con').disable();

                }else{
                    Ext.getCmp("chk_relay_use").state = true;
                    Ext.getCmp("chk_relay_use").moveHandle(true);
                    Ext.getCmp('fs_dhcp_server_tab').disable();
                    Ext.getCmp('fs_relay_tab').enable();
                    //             Ext.getCmp('fs_relay').expand();

                    Ext.getCmp('fs_relay_con').enable();

                }
                console.log(response);
                //DHCP서버IP
                Ext.getCmp('ft_dhcp_server').setValue(response.dhcp_server);

                if(Ext.getCmp('cb_mode').getValue() === 'none'){
                    Ext.getCmp('fs_relay').disable();
                }
        //     }
        // );
    },

    ipv4_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }
        var ip_mask = value.split('/');

        var dstip = ValidIPAddress(ip_mask[0]);
        var dstmask = ValidIPAddress(ip_mask[1]);
        var nullChk_ip = CheckNotNull(ip_mask[0]);
        var nullChk_mask = CheckNotNull(ip_mask[1]);

        if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
        if(!dstip){ return get_msg('err_ip'); }
        if(!dstmask){ return get_msg('err_form'); }

        return true;
    },

    ipv6_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }
        var ip_mask = value.split('/');

        var dstmask = ValidIPAddress(ip_mask[1]);
        var dstipv6 = ValidIPv6(ip_mask[0]);
        var nullChk_ip = CheckNotNull(ip_mask[0]);
        var nullChk_mask = CheckNotNull(ip_mask[1]);

        if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
        if(!dstipv6){ return get_msg('err_ip'); }
        if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }

        return true;
    }

});
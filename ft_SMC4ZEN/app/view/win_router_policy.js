
Ext.define('SMC4ZEN.view.win_router_policy', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_router_policy',

    requires: [
        'SMC4ZEN.view.win_router_policyViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_router_policy'
    },
    cls: 'zen_win',
    id: 'win_router_policy',
    scrollable: true,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    var _value = removeComma(value);

                                    if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                    if(!LengthCheck(_value, 1, 32755)){ return ValidLimit(1, addComma(32755)); }
                                }
                                return true;
                            },
                            fieldInfo: {
                                txt: msg_tip_length(1,
                                32755,
                                null)
                            },
                            id: 'win_num',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 180,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 6,
                            maxLengthText: ' ',
                            bind: {
                                fieldLabel: '{rank}'
                            },
                            listeners: {
                                errorchange: 'onWin_numErrorChange',
                                keydown: 'onWin_numKeydown',
                                blur: 'onWin_numBlur',
                                focus: 'onWin_numFocus',
                                change: 'onWin_numChange'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'srcip_v4_con',
                            width: 500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    margin: '0 0 0 10',
                                    width: 185,
                                    bind: {
                                        text: '{src_ipmask}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var policy = Ext.getCmp('NFW2_network_router_policy');

                                            var ip_mask = [];

                                            ip_mask = value.split('/');

                                            var srcip = ValidIPAddress(ip_mask[0]);
                                            var srcmask = ValidIPAddress(ip_mask[1]);
                                            var srcipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(policy.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!srcip){ return get_msg('err_ip'); }
                                                    if(!srcmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    if(!srcipv6 && !nullChk_ip){ return get_msg('err_null'); }
                                                    if(!nullChk_mask){ return get_msg('err_null'); }
                                                    if(!srcipv6){ return get_msg('err_ip'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }
                                                }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'win_srcip',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9.\/]/,
                                    listeners: {
                                        errorchange: 'onWin_srcipErrorChange',
                                        focus: 'onWin_srcipFocus',
                                        blur: 'onWin_srcipBlur',
                                        keydown: 'onWin_srcipKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'srcip_v6_con',
                            width: 500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    margin: '0 0 0 10',
                                    width: 185,
                                    bind: {
                                        text: '{src_ippre}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var policy = Ext.getCmp('NFW2_network_router_policy');

                                            var ip_mask = [];

                                            ip_mask = value.split('/');

                                            var srcip = ValidIPAddress(ip_mask[0]);
                                            var srcmask = ValidIPAddress(ip_mask[1]);
                                            var srcipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(policy.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!srcip){ return get_msg('err_ip'); }
                                                    if(!srcmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    if(!srcipv6 && !nullChk_ip){ return get_msg('err_null'); }
                                                    if(!nullChk_mask){ return get_msg('err_null'); }
                                                    if(!srcipv6){ return get_msg('err_ip'); }
                                                    if(ip_mask[1] === undefined){ return get_msg('err_form'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }
                                                }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'win_srcip_v6',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        errorchange: 'onWin_srcip_v6ErrorChange',
                                        focus: 'onWin_srcip_v6Focus',
                                        blur: 'onWin_srcip_v6Blur',
                                        keydown: 'onWin_srcip_v6Keydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'dstip_v4_con',
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
                                    width: 185,
                                    bind: {
                                        text: '{dest_ipmask}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var policy = Ext.getCmp('NFW2_network_router_policy');

                                            var ip_mask = [];

                                            ip_mask = value.split('/');

                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(policy.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstip){ return get_msg('err_ip'); }
                                                    if(!dstmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    if(!dstipv6 && !nullChk_ip){ return get_msg('err_null'); }
                                                    if(!nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstipv6){ return get_msg('err_ip'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }
                                                }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'win_dstip',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9.\/]/,
                                    listeners: {
                                        errorchange: 'onWin_dstipErrorChange',
                                        focus: 'onWin_dstipFocus',
                                        blur: 'onWin_dstipBlur',
                                        keydown: 'onWin_dstipKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'dstip_v6_con',
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
                                    width: 185,
                                    bind: {
                                        text: '{dest_ippre}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var policy = Ext.getCmp('NFW2_network_router_policy');

                                            var ip_mask = [];

                                            ip_mask = value.split('/');

                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(policy.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstip){ return get_msg('err_ip'); }
                                                    if(!dstmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    if(!dstipv6 && !nullChk_ip){ return get_msg('err_null'); }
                                                    if(!nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstipv6){ return get_msg('err_ip'); }
                                                    if(ip_mask[1] === undefined){ return get_msg('err_form'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }
                                                }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'win_dstip_v6',
                                    width: 250,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        errorchange: 'onWin_dstip_v6ErrorChange',
                                        focus: 'onWin_dstip_v6Focus',
                                        blur: 'onWin_dstip_v6Blur',
                                        keydown: 'onWin_dstip_v6Keydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    var policy = Ext.getCmp('NFW2_network_router_policy');

                                    var dstip = ValidIPAddress(value);
                                    var dstipv6 = ValidIPv6(value);
                                    var nullChk = CheckNotNull(value);

                                    if(value !== ""){
                                        if(policy.ipv === 'v4'){
                                            if(!dstip && !nullChk){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_form'); }
                                        }
                                        else{
                                            if(!dstipv6 && !nullChk){ return get_msg('err_null'); }
                                            if(!dstipv6){ return get_msg('err_form'); }
                                        }
                                    }
                                    else{
                                        if(!CheckNotNull(value)){ return get_msg('err_null');}
                                    }
                                }
                                return true;
                            },
                            id: 'win_gate',
                            margin: '8 0 0 0',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 180,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{gateway}'
                            },
                            listeners: {
                                errorchange: 'onWin_gateErrorChange',
                                focus: 'onWin_gateFocus',
                                blur: 'onWin_gateBlur',
                                keydown: 'onWin_gateKeydown',
                                change: 'onWin_gateChange'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_interface',
                            margin: '8 0 8 10',
                            labelSeparator: ' ',
                            labelWidth: 180,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            },
                            listeners: {
                                afterrender: 'onWin_interfaceAfterRender'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: 'win_desc',
                            margin: '8 0 10 10',
                            labelSeparator: ' ',
                            labelWidth: 180,
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 63,
                            bind: {
                                fieldLabel: '{desc}'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onFormAfterRender'
            }
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
                    id: 'win_btn_ok',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onWin_btn_okClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'win_btn_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onWin_btn_cancelClick'
                    }
                }
            ]
        }
    ],

    onWin_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_numBlur: function(component, event, eOpts) {
        Ext.getCmp('win_num').validateValue(true);
        // setTipBlur(this,component);
    },

    onWin_numFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onWin_numChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_srcipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_srcipFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_srcip').getValue() === "0.0.0.0/0.0.0.0"){
                Ext.getCmp('win_srcip').setValue("");
                Ext.getCmp('win_srcip').validateValue(true);
            }
            else if(Ext.getCmp('win_srcip').getValue() === "0:0:0:0:0:0:0:0/0"){
                Ext.getCmp('win_srcip').setValue("");
                Ext.getCmp('win_srcip').validateValue(true);
            }
        }

        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onWin_srcipBlur: function(component, event, eOpts) {
        var parent = Ext.getCmp('NFW2_network_router_policy');
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(parent.ipv === "v4"){
                if(Ext.getCmp('win_srcip').getValue() === ""){
                    Ext.getCmp('win_srcip').setValue("0.0.0.0/0.0.0.0");
                }
            }
            else{
                if(Ext.getCmp('win_srcip').getValue() === ""){
                    Ext.getCmp('win_srcip').setValue("0:0:0:0:0:0:0:0/0");
                }
            }
        }

        // setTipBlur(this,component);
        Ext.getCmp('win_srcip').validateValue(true);

    },

    onWin_srcipKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_srcip_v6ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_srcip_v6Focus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_srcip_v6').getValue() === "0:0:0:0:0:0:0:0/0"){
                Ext.getCmp('win_srcip_v6').setValue("");
                Ext.getCmp('win_scrip_v6').validateValue(true);
            }
        }

        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onWin_srcip_v6Blur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_srcip_v6').getValue() === ""){
                Ext.getCmp('win_srcip_v6').setValue("0:0:0:0:0:0:0:0/0");
            }
        }

        // setTipBlur(this,component);
        Ext.getCmp('win_srcip_v6').validateValue(true);
    },

    onWin_srcip_v6Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_dstipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_dstipFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_dstip').getValue() === "0.0.0.0/0.0.0.0"){
                Ext.getCmp('win_dstip').setValue("");
                Ext.getCmp('win_dstip').validateValue(true);
            }
            else if(Ext.getCmp('win_dstip').getValue() === "0:0:0:0:0:0:0:0/0"){
                Ext.getCmp('win_dstip').setValue("");
                Ext.getCmp('win_dst_ip').validateValue(true);
            }
        }

        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onWin_dstipBlur: function(component, event, eOpts) {
        var parent = Ext.getCmp('NFW2_network_router_policy');
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(parent.ipv === "v4"){
                if(Ext.getCmp('win_dstip').getValue() === ""){
                    Ext.getCmp('win_dstip').setValue("0.0.0.0/0.0.0.0");
                }
            }
            else{
                if(Ext.getCmp('win_dstip').getValue() === ""){
                    Ext.getCmp('win_dstip').setValue("0:0:0:0:0:0:0:0/0");
                }
            }
        }

        // setTipBlur(this,component);
        Ext.getCmp('win_dstip').validateValue(true);
    },

    onWin_dstipKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_dstip_v6ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_dstip_v6Focus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_dstip_v6').getValue() === "0.0.0.0/0.0.0.0"){
                Ext.getCmp('win_dstip_v6').setValue("");
                Ext.getCmp('win_dstip_v6').validateValue(true);
            }
            else if(Ext.getCmp('win_dstip_v6').getValue() === "0:0:0:0:0:0:0:0/0"){
                Ext.getCmp('win_dstip_v6').setValue("");
                Ext.getCmp('win_dstip_v6').validateValue(true);
            }
        }

        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onWin_dstip_v6Blur: function(component, event, eOpts) {
        var parent = Ext.getCmp('NFW2_network_router_policy');
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(parent.ipv === "v4"){
                if(Ext.getCmp('win_dstip_v6').getValue() === ""){
                    Ext.getCmp('win_dstip_v6').setValue("0.0.0.0/0.0.0.0");
                }
            }
            else{
                if(Ext.getCmp('win_dstip_v6').getValue() === ""){
                    Ext.getCmp('win_dstip_v6').setValue("0:0:0:0:0:0:0:0/0");
                }
            }
        }

        // setTipBlur(this,component);
        Ext.getCmp('win_dstip_v6').validateValue(true);
    },

    onWin_dstip_v6Keydown: function(textfield, e, eOpts) {

    },

    onWin_gateErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_gateFocus: function(component, event, eOpts) {
        var me = this;

        // if(me.edit === 'edit'){}
        // else{
        //     if(Ext.getCmp('win_gate').getValue() === "0.0.0.0"){
        //         Ext.getCmp('win_gate').setValue("");
        //     }
        //     else if(Ext.getCmp('win_gate').getValue() === "0:0:0:0:0:0:0:0"){
        //         Ext.getCmp('win_gate').setValue("");
        //     }
        // }

        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onWin_gateBlur: function(component, event, eOpts) {
        var parent = Ext.getCmp('NFW2_network_router_policy');
        var me = this;

        // if(me.edit === 'edit'){}
        // else{
        //     if(parent.ipv === "v4"){
        //         if(Ext.getCmp('win_gate').getValue() === ""){
        //             Ext.getCmp('win_gate').setValue("0.0.0.0");
        //         }
        //     }
        //     else{
        //         if(Ext.getCmp('win_gate').getValue() === ""){
        //             Ext.getCmp('win_gate').setValue("0:0:0:0:0:0:0:0");
        //         }
        //     }
        // }

        // setTipBlur(this,component);
        Ext.getCmp('win_gate').validateValue(true);
    },

    onWin_gateKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onWin_gateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        if(me.edit_fir === true){
            me.edit_fir = false;
            return false;
        }

        if(field.isValid() === true){
            var value_set = newValue.split('.');
            // var _params = {
            //     basename : Ext.encode("network_interface")
            // };

            // request_helper.xmlrpc_call_JsonP(
            //     'ftuctrl',
            //     'getObjects',
            //     _params,

                // function(response){
                    var chk_interface = [0,""];
                    var ethernet = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet;
                    for(var i in ethernet){
                        if(ethernet[i].default.ipv4 !== null){
                            var temp = ethernet[i].default.ipv4.split('/');
                            var ip_set = temp[0].split('.');

                            if(ip_set[0] === value_set[0] && ip_set[1] === value_set[1] && ip_set[2] === value_set[2] && ip_set[3] === value_set[3]){
                                chk_interface = [1,i];
                            }
                            else if(ip_set[0] === value_set[0] && ip_set[1] === value_set[1] && ip_set[2] === value_set[2]){
                                if(chk_interface[0] !== 1){
                                    chk_interface = [2,i];
                                }
                            }
                            else if(ip_set[0] === value_set[0] && ip_set[1] === value_set[1]){
                                if(chk_interface[0] !== 1 && chk_interface[0] !== 2){
                                    chk_interface = [3,i];
                                }
                            }
                            else if(ip_set[0] === value_set[0]){
                                if(chk_interface[0] !== 1 && chk_interface[0] !== 2 && chk_interface[0] !== 3){
                                    chk_interface = [4,i];
                                }
                            }
                            else{
                                if(chk_interface[0] !== 1 && chk_interface[0] !== 2 && chk_interface[0] !== 3 && chk_interface[0] !== 4){
                                    chk_interface = [5,i];
                                }
                            }
                        }
                    }

                    Ext.getCmp('win_interface').setValue(chk_interface[1]);
            //     }
            // );
        }
    },

    onWin_interfaceAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('win_interface').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('win_interface').setValue(combo.items[0].data['name']);
        }
    },

    onFormAfterRender: function(component, eOpts) {
        this.fieldInfo = makeZenTip();
        // chk_zenauth(null);
        var srcip = Ext.getCmp('win_srcip');
        var dstip = Ext.getCmp('win_dstip');
        var src_v4_con = Ext.getCmp('srcip_v4_con');
        var src_v6_con = Ext.getCmp('srcip_v6_con');
        var dst_v4_con = Ext.getCmp('dstip_v4_con');
        var dst_v6_con = Ext.getCmp('dstip_v6_con');
        var parent = Ext.getCmp('NFW2_network_router_policy');
        var me = this;

        if(this.edit === "edit"){
            me.edit_fir = true;
            me.setTitle(__zen('edit_router_policy'));

            if(parent.ipv === 'v4'){
                src_v4_con.show();
                dst_v4_con.show();
                src_v6_con.hide();
                dst_v6_con.hide();
            }
            else if(parent.ipv === 'v6'){
                src_v4_con.hide();
                dst_v4_con.hide();
                src_v6_con.show();
                dst_v6_con.show();
            }

        //     showLoadMask();
        //     var _params = {
        //         basename : Ext.encode("network_router_policy"),
        //         key : Ext.encode({'_id' : me.record.data.id})
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'getObject',
        //         _params,

        //         function(data){
        //             hideLoadMask();

        var data = me.record.data;

                    Ext.getCmp('win_interface').setValue(data.interface);
                    // if(parent.ipv === 'v4'){
                    //     Ext.getCmp('win_dstip').setValue(data.route_ip + "/" + data.route_mask);
                    //     Ext.getCmp('win_srcip').setValue(data.policy_ip + "/" + data.policy_mask);
                    // }
                    // else if(parent.ipv === 'v6'){
                    //     Ext.getCmp('win_dstip_v6').setValue(data.route_ip + "/" + data.route_mask);
                    //     Ext.getCmp('win_srcip_v6').setValue(data.policy_ip + "/" + data.policy_mask);
                    // }
                    if(parent.ipv === 'v4'){
                        Ext.getCmp('win_dstip').setValue(data.dst_ipmask);
                        Ext.getCmp('win_srcip').setValue(data.src_ipmask);
                    }
                    else if(parent.ipv === 'v6'){
                        Ext.getCmp('win_dstip_v6').setValue(data.dst_ipmask);
                        Ext.getCmp('win_srcip_v6').setValue(data.src_ipmask);
                    }
                    Ext.getCmp('win_gate').setValue(data.gateway);
                    Ext.getCmp('win_desc').setValue(data.desc);
                    Ext.getCmp('win_num').setValue(data.prio_num);
                    me.cid = data._id;
        //         }
        //     );
        }
        else{
            me.setTitle(__zen('add_router_policy'));
            if(parent.ipv === 'v4'){
                src_v4_con.show();
                dst_v4_con.show();
                src_v6_con.hide();
                dst_v6_con.hide();
                Ext.getCmp('win_srcip').setValue("0.0.0.0/0.0.0.0");
                Ext.getCmp('win_srcip').validateValue(true);
                Ext.getCmp('win_dstip').setValue("0.0.0.0/0.0.0.0");
                Ext.getCmp('win_dstip').validateValue(true);
                //         Ext.getCmp('win_gate').setValue("0.0.0.0");
            }
            else if(parent.ipv === 'v6'){
                src_v4_con.hide();
                dst_v4_con.hide();
                src_v6_con.show();
                dst_v6_con.show();
                Ext.getCmp('win_srcip_v6').setValue("0:0:0:0:0:0:0:0/0");
                Ext.getCmp('win_srcip_v6').validateValue(true);
                Ext.getCmp('win_dstip_v6').setValue("0:0:0:0:0:0:0:0/0");
                Ext.getCmp('win_dstip_v6').validateValue(true);
                //         Ext.getCmp('win_gate').setValue("0:0:0:0:0:0:0:0");
            }

        }
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var policy = Ext.getCmp('NFW2_network_router_policy');
        var version;
        var store = Ext.data.StoreManager.lookup('store_router_policy_list');

        if(policy.ipv === 'v4'){ version = 'v4'; }
        else if(policy.ipv === 'v6'){ version = 'v6'; }

        if(Ext.getCmp('win_num').isValid() === false){ Ext.getCmp('win_num').focus(); return false; }
        if(policy.ipv === 'v4'){
            if(Ext.getCmp('win_srcip').isValid() === false){ Ext.getCmp('win_srcip').focus(); return false; }
            if(Ext.getCmp('win_dstip').isValid() === false){ Ext.getCmp('win_dstip').focus(); return false; }
        }
        else{
            if(Ext.getCmp('win_srcip_v6').isValid() === false){ Ext.getCmp('win_srcip_v6').focus(); return false; }
            if(Ext.getCmp('win_dstip_v6').isValid() === false){ Ext.getCmp('win_dstip_v6').focus(); return false; }
        }
        if(Ext.getCmp('win_gate').isValid() === false){ Ext.getCmp('win_gate').focus(); return false; }

        var dstip_mask = [];
        var srcip_mask = [];

        if(policy.ipv === 'v4'){
            dstip_mask = Ext.getCmp('win_dstip').getValue().split('/');
            srcip_mask = Ext.getCmp('win_srcip').getValue().split('/');
        }
        else{
            dstip_mask = Ext.getCmp('win_dstip_v6').getValue().split('/');
            srcip_mask = Ext.getCmp('win_srcip_v6').getValue().split('/');
        }

        var obj = {};

        obj = {
            'num': store.getCount() + 1,
            'interface' : Ext.getCmp('win_interface').getValue(),
            'desc' : Ext.getCmp('win_desc').getValue(),
            'use' : 'on',
            'version' : version,
            'gateway' : Ext.getCmp('win_gate').getValue(),
            'src_ipmask': srcip_mask[0] + "/" + srcip_mask[1],
            'dst_ipmask': dstip_mask[0] + "/" + dstip_mask[1],
            'prio_num' : removeComma(Ext.getCmp('win_num').getValue()),
            'lastupdate': null,

        };

        if(me.edit === "edit"){
            obj['id'] = me.cid;
        }

        if(me.edit !== "edit"){
            for( var i in store.data.items){
                //         if(store.data.items[i].data['interface'] === obj['interface']){
                if(store.data.items[i].data.dst_ipmask === obj.dst_ipmask && store.data.items[i].data.src_ipmask === obj.src_ipmask && 
                    store.data.items[i].data.metric === obj.metric && store.data.items[i].data.gateway === obj.gateway){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_configdob'));
                    me.set_btn = true;
                    return false;
                }
                //         }
            }
        }
        else{
            for( var i in store.data.items){
                //         if(store.data.items[i].data['interface'] === obj['interface']){
                if(store.data.items[i].data.dst_ipmask === obj.dst_ipmask && store.data.items[i].data.src_ipmask === obj.src_ipmask && 
                    store.data.items[i].data.metric === obj.metric && store.data.items[i].data.gateway === obj.gateway){
                    if(store.data.items[i].data.id !== me.record.data.id){
                        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                        err_fl.addCls('ic_msg_err');
                        err_fl.update(get_msg('err_configdob'));
                        me.set_btn = true;
                        return false;
                    }
                }
                //         }
            }
        }

        var update = (me.edit==="edit")?true:false;
        var grid_store = Ext.getCmp('policy_grid').getStore();

        if(update){

            grid_store.each(function(record, idx){
                if(me.record.data.id === record.data.id){

                    Ext.each(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_policy, function(record2, idx){

                        if(record2.route_ip === record.data.dst_ipmask.split('/')[0] && record2.route_mask === record.data.dst_ipmask.split('/')[1] && 
                            record2.policy_ip === record.data.src_ipmask.split('/')[0] && record2.policy_mask === record.data.src_ipmask.split('/')[1] && 
                            record2.gateway === record.data.gateway && record2.prio_num === record.data.prio_num &&
                             record2.version === record.data.version){

                            record2.use = obj.use;
                            record2.prio_num = obj.prio_num;
                            record2.route_ip = obj.dst_ipmask.split('/')[0];
                            record2.route_mask = obj.dst_ipmask.split('/')[1];
                            record2.policy_ip = obj.src_ipmask.split('/')[0];
                            record2.policy_mask = obj.src_ipmask.split('/')[1];
                            record2.version = obj.version;
                            record2.interface = obj.interface;
                            record2.gateway = obj.gateway;
                            record2.desc = obj.desc;

                            record.data.use = obj.use;
                            record.data.prio_num = obj.prio_num;
                            record.data.dst_ipmask = obj.dst_ipmask;
                            record.data.src_ipmask = obj.src_ipmask;
                            record.data.version = obj.version;
                            record.data.interface = obj.interface;
                            record.data.gateway = obj.gateway;
                            record.data.desc = obj.desc;
                            record.commit();
                            return false;
                        }
                    });

                    return false;
                }
            });
        }
        else{

            grid_store.add(obj);

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_policy.push({
                "use" : obj.use,
                "prio_num" : obj.prio_num,
                "route_ip" : obj.dst_ipmask.split('/')[0],
                "route_mask" : obj.dst_ipmask.split('/')[1],
                "policy_ip" : obj.src_ipmask.split('/')[0],
                "policy_mask" : obj.src_ipmask.split('/')[1],
                "version" : obj.version,
                "interface" : obj.interface,
                "gateway" : obj.gateway,
                "desc" : obj.desc
            });
        }

        // showLoadMask();

        // var _params = {
        //     basename : Ext.encode('network_router_policy'),
        //     obj : Ext.encode(obj),
        //     update : Ext.encode(update)
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'setListTypeObj',
        //     _params,
        //     function(response){
        //         hideLoadMask();
        //         var _store = Ext.data.StoreManager.lookup('store_router_policy_list');
        //         policy.get_store();
        //     }
        // );

        if(me.edit !== "edit"){
            Ext.Msg.show({
                title: __weguardia,
                msg: get_msg("msg_ok_add"),
                width: 300,
                buttons: Ext.Msg.YESNO,
                buttonText:{
                    yes: __zen('add_plus'),
                    no: __zen('close')
                },
                fn: me.set_win,
                icon: Ext.window.MessageBox.INFO
            });

        }
        else{
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('msg_ok_edit'),
                buttons: Ext.Msg.OK,
                fn:setWinClose,
                icon: Ext.window.MessageBox.INFO
            });
        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    set_win: function(btn) {
        if(btn === "yes"){
        }
        else{
            Ext.getCmp('win_router_policy').close();
        }
    }

});
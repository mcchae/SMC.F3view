
Ext.define('SMC4ZEN.view.win_router_static', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_router_static',

    requires: [
        'SMC4ZEN.view.win_router_staticViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_router_static'
    },
    cls: 'zen_win',
    id: 'win_router_static',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
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
                    items: [
                        {
                            xtype: 'container',
                            id: 'dstip_v4_con',
                            margin: '8 0 0 0',
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
                                        text: '{dest_ipmask}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var main = Ext.getCmp('NFW2_network_router_static');
                                        var me = Ext.getCmp('win_router_static');

                                        var ip_mask = [];

                                        if(value !== true){
                                            ip_mask = value.split('/');

                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(main.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstip){ return get_msg('err_ip'); }
                                                    if(!dstmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstipv6){ return get_msg('err_ip'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,128)){ return ValidLimit(0, 32); }
                                                }

                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                            var store = Ext.data.StoreManager.lookup('store_router_static_list');
                                            var chk_ip = 0;
                                            var chk_mask = 0;
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
                                        text: '{dest_ippre}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var main = Ext.getCmp('NFW2_network_router_static');
                                        var me = Ext.getCmp('win_router_static');

                                        var ip_mask = [];

                                        if(value !== true){
                                            ip_mask = value.split('/');


                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(main.ipv === 'v4'){
                                                    if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!dstip){ return get_msg('err_ip'); }
                                                    if(!dstmask){ return get_msg('err_form'); }
                                                }
                                                else{
                                                    //             if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                    if(!ValidNum(ip_mask[1])){ return get_msg('err_form'); }
                                                    if(ip_mask[1] === undefined){ return get_msg('err_form'); }
                                                    if(!LengthCheck(ip_mask[1], 0 ,128)){ return ValidLimit(0, 128); }
                                                }
                                            }
                                            else{
                                                if(!CheckNotNull(value)){ return get_msg('err_null');}
                                            }
                                            var store = Ext.data.StoreManager.lookup('store_router_static_list');
                                            var chk_ip = 0;
                                            var chk_mask = 0;


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
                                var main = Ext.getCmp('NFW2_network_router_static');
                                var me = Ext.getCmp('win_router_static');

                                if(value !== true){
                                    var dstip = ValidIPAddress(value);
                                    var dstipv6 = ValidIPv6(value);
                                    var nullChk = CheckNotNull(value);
                                    if(value !== ""){
                                        if(main.ipv === 'v4'){
                                            if(!dstip && !nullChk){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_form'); }
                                            if(value === "0.0.0.0"){ return get_msg('err_valid'); }
                                        }
                                        else{
                                            if(!dstipv6 && !nullChk){ return get_msg('err_null'); }
                                            if(!dstipv6){ return get_msg('err_form'); }
                                            if(value === "0:0:0:0:0:0:0"){ return get_msg('err_valid'); }
                                        }
                                    }
                                    else{
                                        if(!CheckNotNull(value)){ return get_msg('err_null');}
                                    }
                                    var store = Ext.data.StoreManager.lookup('store_router_static_list');
                                    var chk = 0;

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
                            validator: function(value) {
                                var me = Ext.getCmp('win_router_static');

                                if(value !== true){
                                    if(value !== ""){
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!LengthCheck(value, 1, 16)){ return ValidLimit(1, 16); }
                                    }
                                    else{
                                        if(!CheckNotNull(value)){ return get_msg('err_null');}
                                    }
                                }
                                var store = Ext.data.StoreManager.lookup('store_router_static_list');
                                var chk = 0;

                                // if(me.edit !== "edit"){
                                //     for(var i in store.data.items){
                                //         if(value === store.data.items[i].data.metric){ return get_msg('err_configdob'); }
                                //     }
                                // }
                                // else{
                                //     for(var i in store.data.items){
                                //         if(value === store.data.items[i].data.metric){ chk++; }
                                //     }
                                //     if(me.data.data.metric === value){ chk--; }

                                //     if(chk > 0){ return get_msg('err_configdob'); }
                                // }

                                return true;
                            },
                            fieldInfo: {
                                txt: msg_tip_length(1,
                                16,
                                null)
                            },
                            id: 'win_metric',
                            margin: '8 0 0 0',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 180,
                            msgTarget: 'none',
                            value: '1',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 2,
                            bind: {
                                fieldLabel: '{metric}'
                            },
                            listeners: {
                                errorchange: 'onWin_metricErrorChange',
                                keydown: 'onWin_metricKeydown',
                                focus: 'onWin_metricFocus',
                                blur: 'onWin_metricBlur'
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
                        click: 'onWin_btn_okClick',
                        blur: 'onWin_btn_okBlur'
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
                Ext.getCmp('win_dstip').validateValue(true);
            }
        }

        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_dstipBlur: function(component, event, eOpts) {
        var main = Ext.getCmp('NFW2_network_router_static');
        var me = this;

        if(main.ipv === "v4"){
            if(Ext.getCmp('win_dstip').getValue() === ""){
                Ext.getCmp('win_dstip').setValue("0.0.0.0/0.0.0.0");
            }
        }
        else{
            if(Ext.getCmp('win_dstip_v6').getValue() === ""){
                Ext.getCmp('win_dstip_v6').setValue("0:0:0:0:0:0:0:0/0");
            }
        }

        setTipBlur(this,component);
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
        setTipFocus(this,component);
    },

    onWin_dstip_v6Blur: function(component, event, eOpts) {
        var main = Ext.getCmp('NFW2_network_router_static');
        var me = this;

        if(main.ipv === "v4"){
            if(Ext.getCmp('win_dstip').getValue() === ""){
                Ext.getCmp('win_dstip').setValue("0.0.0.0/0.0.0.0");
            }
        }
        else{
            if(Ext.getCmp('win_dstip_v6').getValue() === ""){
                Ext.getCmp('win_dstip_v6').setValue("0:0:0:0:0:0:0:0/0");
            }
        }
        setTipBlur(this,component);
        Ext.getCmp('win_dstip_v6').validateValue(true);
    },

    onWin_dstip_v6Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
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
        setTipFocus(this,component);
    },

    onWin_gateBlur: function(component, event, eOpts) {
        var main = Ext.getCmp('NFW2_network_router_static');
        var me = this;

        // if(main.ipv === "v4"){
        //     if(Ext.getCmp('win_gate').getValue() === ""){
        //         Ext.getCmp('win_gate').setValue("0.0.0.0");
        //     }
        // }
        // else{
        //     if(Ext.getCmp('win_gate').getValue() === ""){
        //         Ext.getCmp('win_gate').setValue("0:0:0:0:0:0:0:0");
        //     }
        // }
        setTipBlur(this,component);
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
        //     var _params = {
        //         basename : Ext.encode("network_interface")
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'getObjects',
        //         _params,

        //         function(response){
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
        var inter = Ext.getCmp('win_interface').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("win_interface").setValue(inter.items[0].data['name']);
        }
    },

    onWin_metricErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onWin_metricKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_metricFocus: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            Ext.getCmp('win_metric').setValue("");
        }

        setTipFocus(this,component);
    },

    onWin_metricBlur: function(component, event, eOpts) {
        var me = this;

        if(me.edit === 'edit'){}
        else{
            if(Ext.getCmp('win_metric').getValue() === ""){
                Ext.getCmp('win_metric').setValue("1");
            }
        }
        setTipBlur(this,component);
        Ext.getCmp('win_metric').validateValue(true);
    },

    onFormAfterRender: function(component, eOpts) {
        var dstip = Ext.getCmp('win_dstip');
        var dst_v4_con = Ext.getCmp('dstip_v4_con');
        var dst_v6_con = Ext.getCmp('dstip_v6_con');
        var main = Ext.getCmp('NFW2_network_router_static');
        var tbl = Ext.getCmp("static_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();
        this.set_btn = false;
        this.fieldInfo = makeZenTip();
        // chk_zenauth(null);
        var me = this;

        if(this.edit === "edit"){

            me.edit_fir = true;

            me.setTitle(__zen('edit_router_static') + " - " + me.index);

            if(main.ipv === 'v4'){
                dst_v4_con.show();
                dst_v6_con.hide();
            }
            else if(main.ipv === 'v6'){
                dst_v4_con.hide();
                dst_v6_con.show();
            }

        //     showLoadMask();

        //     var _params = {
        //         basename : Ext.encode("network_router_static"),
        //         key : Ext.encode({'_id' : me.record.data.id})
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'getObject',
        //         _params,

        var data = me.record.data;

        //         function(data){
        //             hideLoadMask();
                    Ext.getCmp('win_interface').setValue(data.interface);
                    // main.chk_interface(data.interface);
                    // main.get_store();

                    if(main.ipv === 'v4'){
                        Ext.getCmp('win_dstip').setValue(data.route_ip + "/" + data.route_mask);
                        Ext.getCmp('win_dstip').validateValue(true);
                    }
                    else{
                        Ext.getCmp('win_dstip_v6').setValue(data.route_ip + "/" + data.route_mask);
                        Ext.getCmp('win_dstip_v6').validateValue(true);
                    }
                    Ext.getCmp('win_gate').setValue(data.gateway);
                    Ext.getCmp('win_gate').validateValue(true);
                    Ext.getCmp('win_desc').setValue(data.desc);
                    Ext.getCmp('win_desc').validateValue(true);
                    Ext.getCmp('win_metric').setValue(data.metric);
                    Ext.getCmp('win_metric').validateValue(true);
                    me.cid = data._id;
        //         }
        //     );
        }
        else{
            me.setTitle(__zen('add_router_static'));
            if(main.ipv === 'v4'){
                dst_v4_con.show();
                dst_v6_con.hide();
                Ext.getCmp('win_dstip').setValue("0.0.0.0/0.0.0.0");
                Ext.getCmp('win_dstip').validateValue(true);
                //         Ext.getCmp('win_gate').setValue("0.0.0.0");
                Ext.getCmp('win_gate').validateValue(true);
            }
            else if(main.ipv === 'v6'){
                dst_v4_con.hide();
                dst_v6_con.show();
                Ext.getCmp('win_dstip_v6').setValue("0:0:0:0:0:0:0:0/0");
                Ext.getCmp('win_dstip_v6').validateValue(true);
                //         Ext.getCmp('win_gate').setValue("0:0:0:0:0:0:0:0");
                Ext.getCmp('win_gate').validateValue(true);
            }

        }
    },

    onWin_btn_okClick: function(button, e, eOpts) {
        var me = this;
        var main = Ext.getCmp('NFW2_network_router_static');
        var store = Ext.data.StoreManager.lookup('store_router_static_list');
        var version;

        if(main.ipv === 'v4'){ version = 'v4'; }
        else if(main.ipv === 'v6'){ version = 'v6'; }

        if(main.ipv === 'v4'){
            if(Ext.getCmp('win_dstip').isValid() === false){ Ext.getCmp('win_dstip').focus(); return false; }
        }
        else{
            if(Ext.getCmp('win_dstip_v6').isValid() === false){ Ext.getCmp('win_dstip_v6').focus(); return false; }
        }
        if(Ext.getCmp('win_gate').isValid() === false){ Ext.getCmp('win_gate').focus(); return false; }
        if(Ext.getCmp('win_metric').isValid() === false){ Ext.getCmp('win_metric').focus(); return false; }

        var ip_mask = [];

        if(main.ipv === 'v4'){
            ip_mask = Ext.getCmp('win_dstip').getValue().split('/');
        }
        else{ ip_mask = Ext.getCmp('win_dstip_v6').getValue().split('/'); }

        var obj = {};

        obj = {
            'interface' : Ext.getCmp('win_interface').getValue(),
            'desc' : Ext.getCmp('win_desc').getValue(),
            'use' : 'on',
            'version' : version,
            'gateway' : Ext.getCmp('win_gate').getValue(),
            'route_ip' : ip_mask[0],
            'route_mask' : ip_mask[1],
            'metric' : Ext.getCmp('win_metric').getValue(),
            'dst_ipmask' : ip_mask[0] + "/" + ip_mask[1],
            'lastupdate': null,
        };

        if(me.edit !== "edit"){
            for( var i in store.data.items){
                var store_ipmask = store.data.items[i].data.dst_ipmask.split('/');
                //         if(store.data.items[i].data['interface'] === obj['interface']){
                if(store_ipmask[0] === obj.route_ip && store_ipmask[1] === obj.route_mask && store.data.items[i].data.metric === obj.metric && 
                    store.data.items[i].data.gateway === obj.gateway){
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
                var store_ipmask = store.data.items[i].data.dst_ipmask.split('/');
                //         if(store.data.items[i].data['interface'] === obj['interface']){
                if(store_ipmask[0] === obj.route_ip && store_ipmask[1] === obj.route_mask && store.data.items[i].data.metric === obj.metric && 
                    store.data.items[i].data.gateway === obj.gateway){
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

        if(me.edit === "edit"){
            obj['id'] = me.cid;
        }

        var update = (me.edit==="edit")?true:false;
        var grid_store = Ext.getCmp('static_grid').getStore();

        console.log('obj - ', obj);

        if(update){

            grid_store.each(function(record, idx){

                if(me.record.data.id === record.data.id){

                    Ext.each(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_static, function(record2, idx){

                        if(record2.route_ip === record.data.route_ip && record2.route_mask === record.data.route_mask && record2.metric === record.data.metric && 
                            record2.gateway === record.data.gateway){

                            record2.use = obj.use;
                            record2.route_ip = obj.route_ip;
                            record2.route_mask = obj.route_mask;
                            record2.metric = obj.metric;
                            record2.version = obj.version;
                            record2.interface = obj.interface;
                            record2.gateway = obj.gateway;
                            record2.desc = obj.desc;

                            record.data.use = obj.use;
                            record.data.route_ip = obj.route_ip;
                            record.data.route_mask = obj.route_mask;
                            record.data.metric = obj.metric;
                            record.data.version = obj.version;
                            record.data.interface = obj.interface;
                            record.data.gateway = obj.gateway;
                            record.data.desc = obj.desc;
                            record.data.dst_ipmask = obj.route_ip + "/" + obj.route_mask;
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

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_static.push({
                "use" : obj.use,
                "route_ip" : obj.route_ip,
                "route_mask" : obj.route_mask,
                "metric" : obj.metric,
                "version" : obj.version,
                "interface" : obj.interface,
                "gateway" : obj.gateway,
                "desc" : obj.desc
            });
        }

        // showLoadMask();

        // var _params = {
        //     basename : Ext.encode('network_router_static'),
        //     obj : Ext.encode(obj),
        //     update : Ext.encode(update)
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'setListTypeObj',
        //     _params,
        //     function(response){
        //         hideLoadMask();
        //         var _store = Ext.data.StoreManager.lookup('store_router_static_list');
        //         //         main.chk_interface("");
        //         main.get_store();
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
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });
        }
    },

    onWin_btn_okBlur: function(component, event, eOpts) {
        var me = this;
        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onWin_btn_cancelClick: function(button, e, eOpts) {
        this.close();
    },

    set_win: function(btn) {
        if(btn === "yes"){
        }
        else{
            Ext.getCmp('win_router_static').close();
        }
    }

});
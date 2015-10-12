
Ext.define('SMC4ZEN.view.win_snmp', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_snmp',

    requires: [
        'SMC4ZEN.view.win_snmpViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_snmp'
    },
    cls: 'zen_win',
    id: 'win_snmp',
    scrollable: true,
    width: 600,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            border: false,
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            titleCollapse: false,
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
                            cls: 'x-field x-form-item-label x-form-item-label-default ',
                            width: 165,
                            bind: {
                                text: '{snmp_type}'
                            }
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'snmp_typeG',
                            items: [
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    text: 'SNMPv2',
                                    value: 'snmpv2',
                                    listeners: {
                                        toggle: 'onButtonToggle1'
                                    }
                                },
                                {
                                    text: 'SNMPv3',
                                    value: 'snmpv3',
                                    listeners: {
                                        toggle: 'onButtonToggle'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'x-field x-form-item-label x-form-item-label-default ',
                            width: 165,
                            bind: {
                                text: '{ip_type}'
                            }
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            id: 'ip_typeG',
                            items: [
                                {
                                    enableToggle: true,
                                    pressed: true,
                                    text: 'IPv4',
                                    value: 'ipv4',
                                    listeners: {
                                        toggle: 'onButtonToggle2'
                                    }
                                },
                                {
                                    text: 'IPv6',
                                    value: 'ipv6'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value === true){ return true; }
                        var retValue1 = CheckNotNull(value);

                        if(!retValue1){ return get_msg(err_null); }

                        return true;
                    },
                    cls: 'lb_req',
                    id: 'community',
                    margin: '0 0 10 0',
                    width: 430,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    msgTarget: 'none',
                    enforceMaxLength: true,
                    maxLength: 32,
                    bind: {
                        fieldLabel: '{community}'
                    },
                    listeners: {
                        errorchange: 'onCommunityErrorChange',
                        blur: 'onCommunityBlur'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value === true){ return true; }
                        var retValue1 = CheckNotNull(value);

                        if(!retValue1){ return get_msg(err_null); }

                        return true;
                    },
                    cls: 'lb_req',
                    hidden: true,
                    id: 'user_name',
                    margin: '0 0 10 0',
                    width: 430,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    msgTarget: 'none',
                    enforceMaxLength: true,
                    maxLength: 32,
                    bind: {
                        fieldLabel: '{user_name}'
                    },
                    listeners: {
                        errorchange: 'onUser_nameErrorChange',
                        blur: 'onUser_nameBlur'
                    }
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        if(value === true){ return true; }
                        var retValue1 = ValidIPAddress(value);
                        var retValue2 = ValidIPv6(value);

                        if(value.length > 0){

                            if(Ext.getCmp('ip_typeG').getValue() === "ipv4"){
                                if(!retValue1){ return get_msg("err_ip"); }
                            }else{
                                if(!retValue2){ return get_msg("err_ip"); }
                            }

                        }

                        return true;
                    },
                    id: 'trap_ip',
                    margin: '0 0 10 0',
                    width: 430,
                    labelSeparator: ' ',
                    labelWidth: 150,
                    msgTarget: 'none',
                    bind: {
                        fieldLabel: '{trap_address}'
                    },
                    listeners: {
                        errorchange: 'onTrap_ipErrorChange',
                        focus: 'onTrap_ipFocus',
                        blur: 'onTrap_ipBlur'
                    }
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'snmpv3G',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'auth_algo',
                            margin: '0 0 10 0',
                            width: 430,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            editable: false,
                            store: 'store_auth_algo',
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{auth_algorithm}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                var retValue1 = LengthCheck2(value,8,16);

                                if(Ext.getCmp('snmp_typeG').getValue() === "snmpv3"){

                                    if(!retValue1){ return ValidMinMax(__zen('auth_pwd'),8,16,2); }

                                }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'auth_pass',
                            margin: '0 0 10 0',
                            width: 430,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            inputType: 'password',
                            bind: {
                                fieldLabel: '{auth_pwd}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange',
                                blur: 'onAuth_passBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'privacy_algo',
                            margin: '0 0 10 0',
                            width: 430,
                            labelSeparator: ' ',
                            labelWidth: 150,
                            editable: false,
                            store: 'store_privacy_algo',
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{pwd_algorithm}'
                            },
                            listeners: {
                                change: 'onPrivacy_algoChange'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'privacy_passG',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        var retValue1 = LengthCheck2(value,8,16);

                                        if(Ext.getCmp('snmp_typeG').getValue() === "snmpv3" && Ext.getCmp('privacy_algo').getValue() !== 'none'){

                                            if(!retValue1){ return ValidMinMax(__zen('secret_pwd'),8,16,2); }

                                        }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'privacy_pass',
                                    margin: '0 0 10 0',
                                    width: 430,
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    bind: {
                                        fieldLabel: '{secret_pwd}'
                                    },
                                    listeners: {
                                        errorchange: 'onPrivacy_passErrorChange',
                                        blur: 'onPrivacy_passBlur'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'btn_Group2',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btn_pop_prev',
                            width: 30,
                            text: '<',
                            listeners: {
                                click: 'on_btn_pop_prev'
                            }
                        },
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'btn_pop_next',
                            margin: '0 5 0 5',
                            width: 30,
                            text: '>',
                            listeners: {
                                click: 'on_btn_pop_next'
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
                        click: 'onButtonClick1'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],
    listeners: {

        afterrender: 'onWin_snmpAfterRender'

    },

    onButtonToggle1: function(button, pressed, eOpts) {

        if(pressed){

            var store = Ext.getCmp('system_snmp_list').getStore();
            var totalv2 = 0;
            var totalv3 = 0;

            store.each(function(r){

                if(r.get('snmp_type') === 'snmpv2') {

                    totalv2++;

                }

                if(r.get('snmp_type') === 'snmpv3') {

                    totalv3++;

                }

            });


            if(this.stype === 'snmpv3' && totalv2 >= 5){

                Ext.Msg.show({
                    title: 'System Message',
                    msg: get_msg("err_snmpcnt"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                Ext.getCmp("snmpv3").setValue(true);

            }
            else{

                Ext.getCmp("community").show();
                Ext.getCmp("user_name").hide();
                Ext.getCmp("snmpv3G").hide();
            }

            Ext.getCmp('community').reset();
            Ext.getCmp('user_name').reset();

        }

    },

    onButtonToggle: function(button, pressed, eOpts) {

        if(pressed){

            var store = Ext.getCmp('system_snmp_list').getStore();
            var totalv2 = 0;
            var totalv3 = 0;

            store.each(function(r){

                if(r.get('snmp_type') === 'snmpv2') {

                    totalv2++;

                }

                if(r.get('snmp_type') === 'snmpv3') {

                    totalv3++;

                }

            });

            if(this.stype === 'snmpv2' && totalv3 >= 1){

                Ext.Msg.show({
                    title: 'System Message',
                    msg: get_msg("err_snmpcnt"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

                Ext.getCmp("snmpv2").setValue(true);

            }
            else{

                Ext.getCmp("community").hide();
                Ext.getCmp("user_name").show();
                Ext.getCmp("snmpv3G").show();
                Ext.getCmp("auth_algo").setValue("md5");
                Ext.getCmp("privacy_algo").setValue("des");

            }

            Ext.getCmp('community').reset();
            Ext.getCmp('user_name').reset();

        }

    },

    onButtonToggle2: function(button, pressed, eOpts) {

        Ext.getCmp('trap_ip').reset();

    },

    onCommunityErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error, null);

    },

    onCommunityBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    onUser_nameErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error, null);

    },

    onUser_nameBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    onTrap_ipErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error, null);

    },

    onTrap_ipFocus: function(component, event, eOpts) {

        var str = disp_help_ip('4s');

        setTipFocus(this,component);
        component.fieldInfo = str;
        
    },

    onTrap_ipBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error, null);

    },

    onAuth_passBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    onPrivacy_algoChange: function(field, newValue, oldValue, eOpts) {

        if(Ext.getCmp("privacy_algo").getValue() === "none"){

            Ext.getCmp("privacy_passG").disable();

        }else{

            Ext.getCmp("privacy_passG").enable();

        }

    },

    onPrivacy_passErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error, null);

    },

    onPrivacy_passBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    on_btn_pop_prev: function(button, e, eOpts) {

        var tbl = Ext.getCmp("systm_snmp_list");
        var store = tbl.getStore();
        var prevcid = store.getAt(this.idx - 1).get('sid');

    },

    onButtonClick1: function(button, e, eOpts) {
        
        var me = this;
        var system_snmp = {};
        var st_snmplist = Ext.data.StoreManager.lookup('store_system_snmp_list');

        if(Ext.getCmp("snmp_typeG").getValue() === "snmpv2"){

            if(!Ext.getCmp("community").isValid()){ 

                Ext.getCmp("community").focus(); 

                return false; 

            }

            snmp_type = "snmpv2";
            

        }else{

            if(!Ext.getCmp("user_name").isValid()){ 

                Ext.getCmp("user_name").focus(); 

                return false; 

            }

            snmp_type = "snmpv3";

        }

        system_snmp.ip_type = Ext.getCmp("ip_typeG").getValue();
        system_snmp.trap_ip = Ext.getCmp("trap_ip").getValue();
        system_snmp.snmp_type = snmp_type;

        system_snmp.community = (snmp_type === 'snmpv2') ? Ext.getCmp("community").getValue() : null;

        system_snmp.user_name = (snmp_type === 'snmpv3') ? Ext.getCmp("user_name").getValue() : null;
        system_snmp.auth_algo = (snmp_type === 'snmpv3') ? Ext.getCmp("auth_algo").getValue() : null;
        system_snmp.auth_pass = (snmp_type === 'snmpv3') ? Ext.getCmp("auth_pass").getValue() : null;
        system_snmp.privacy_algo = (snmp_type === 'snmpv3') ? Ext.getCmp("privacy_algo").getValue() : null;
        system_snmp.privacy_pass = (snmp_type === 'snmpv3') ? Ext.getCmp("privacy_pass").getValue() : null;

        var str = ['trap_ip','auth_pass','privacy_pass'];
        var valid_id = new Array(str.length);

        for(var i = 0; i < str.length; i++){

            valid_id[i] = Ext.getCmp(str[i]);

            if(!valid_id[i].isValid()){ 

                Ext.getCmp(str[i]).focus(); 

                return false; 

            }

        }

        if(me.edit === "edit"){

            system_snmp.sid = me.record.sid;

            me.record.set(system_snmp);
            me.record.commit();

        }
        else{

            var totalv2 = 0;
            var totalv3 = 0;
            var dat_snmplist = st_snmplist.getData();

            for(var i = 0, max = dat_snmplist.items.length; i < max; i++){

                if(dat_snmplist.items[i].get('snmp_type') === 'snmpv2'){

                    totalv2++;

                }
                else{

                    totalv3++;

                }

            }

            if(snmp_type === 'snmpv2' && totalv2 >= 5){

                Ext.Msg.show({
                    title: 'WeGuardia™ ZEN',
                    msg: get_msg("err_snmpcnt"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });

                return false;
                
            }

            if(snmp_type === 'snmpv3' && totalv3 >= 1){

                Ext.Msg.show({
                    title: 'WeGuardia™ ZEN',
                    msg: get_msg("err_snmpcnt"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });

                return false;

            }

            st_snmplist.add(system_snmp);

        }

        me.close();

    },

    onButtonClick: function(button, e, eOpts) {

        this.close();

    },

    onWin_snmpAfterRender: function(component, eOpts) {
        
        var me = this;

        me.fieldInfo = makeZenTip();

        // chk_zenauth(null);

        if(me.edit === "edit"){

            me.setTitle(__zen('snmp_edit') + " - " + me.record.get('num'));

            if(me.record.get('ip_type') === "ipv4"){

                Ext.getCmp("ip_typeG").setValue("ipv4");

            }
            else{

                Ext.getCmp("ip_typeG").setValue("ipv6");

            }

            Ext.getCmp("trap_ip").setValue(me.record.get('trap_ip'));

            if(me.record.get('snmp_type') === "snmpv2"){

                Ext.getCmp("snmp_typeG").setValue("snmpv2");
                Ext.getCmp("community").setValue(me.record.get('community'));

            }
            else{

                Ext.getCmp("snmp_typeG").setValue("snmpv3");
                Ext.getCmp("user_name").setValue(me.record.get('user_name'));
                Ext.getCmp("auth_algo").setValue(me.record.get('auth_algo'));
                Ext.getCmp("auth_pass").setValue(me.record.get('auth_pass'));
                Ext.getCmp("privacy_algo").setValue(me.record.get('privacy_algo'));
                Ext.getCmp("privacy_pass").setValue(me.record.get('privacy_pass'));

            }

        }
        else{

            me.setTitle(__zen('snmp_add'));

        }

    }

});
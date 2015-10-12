
Ext.define('SMC4ZEN.view.win_ha_l2', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ha_l2',

    requires: [
        'SMC4ZEN.view.win_ha_l2ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ha_l2'
    },
    cls: 'zen_win',
    id: 'NFW2_la_win',
    scrollable: true,
    width: 550,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 10 0',
                    minWidth: 500,
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'inter',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'eth0',
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
                            id: 'c_n_vrrp',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'checker_type',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    value: 'none',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_l2_type',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{checker_type}'
                                    },
                                    listeners: {
                                        change: 'onChecker_typeChange'
                                    }
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
                                            width: 125,
                                            bind: {
                                                text: '{target_ip}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                return true;
                                            },
                                            id: 'target_ip',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: 'onTarget_ipErrorChange',
                                                blur: 'onTarget_ipBlur',
                                                focus: 'onTarget_ipFocus'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'con_mac',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_req',
                                            width: 125,
                                            bind: {
                                                text: '{backup_mac}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidMAC(value)){ return ValidIP('Mac'); }
                                                }
                                                return true;
                                            },
                                            id: 'backup_mac',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: 'onBackup_macErrorChange',
                                                blur: 'onBackup_macBlur'
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
                                            width: 125,
                                            bind: {
                                                text: '{check_period}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '',
                                            cls: 'inp_unit',
                                            id: 'period',
                                            width: 120,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '1',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 2,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onPeriodErrorChange',
                                                keydown: 'onPeriodKeydown',
                                                focus: 'onPeriodFocus',
                                                blur: 'onPeriodBlur'
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
                                            width: 125,
                                            bind: {
                                                text: '{timeout}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '',
                                            cls: 'inp_unit',
                                            id: 'timeout',
                                            width: 120,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen(\'times\')]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '3',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 2,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onTimeoutErrorChange',
                                                keydown: 'onTimeoutKeydown',
                                                focus: 'onTimeoutFocus',
                                                blur: 'onTimeoutBlur'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            cls: 'mt_info',
                                            bind: {
                                                text: '{ha_info1}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'c_vrrp',
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
                                            width: 125,
                                            bind: {
                                                text: '{virtual_ip}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                }
                                                return true;
                                            },
                                            id: 'virtual_ip',
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            listeners: {
                                                errorchange: 'onVirtual_ipErrorChange',
                                                focus: 'onVirtual_ipFocus',
                                                blur: 'onVirtual_ipBlur'
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
                                            width: 125,
                                            bind: {
                                                text: '{priority_level}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 254)){ return ValidLimit(1, 254); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '입력범위 : 1 ~ 254',
                                            id: 'priority',
                                            width: 80,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onPriorityErrorChange',
                                                keydown: 'onPriorityKeydown',
                                                focus: 'onPriorityFocus',
                                                blur: 'onPriorityBlur'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'c_boost',
                                    margin: '8 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'lb_req',
                                            width: 125,
                                            text: 'Boost up'
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 0, 100)){ return ValidLimit(0, 100); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '입력범위 : 0 ~ 100',
                                            id: 'boostup',
                                            width: 80,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            value: '0',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onBoostupErrorChange',
                                                keydown: 'onBoostupKeydown',
                                                focus: 'onBoostupFocus',
                                                blur: 'onBoostupBlur'
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
                                            width: 125,
                                            bind: {
                                                text: '{trans_cycle}'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value !== true){
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                                    if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }
                                                }
                                                return true;
                                            },
                                            fieldInfo: '',
                                            cls: 'inp_unit',
                                            id: 'chk_period',
                                            width: 120,
                                            afterBodyEl: [
                                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                            ],
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onChk_periodErrorChange',
                                                keydown: 'onChk_periodKeydown',
                                                focus: 'onChk_periodErrorChange1',
                                                blur: 'onChk_periodBlur'
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
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
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
                    itemId: 'fld_msg1'
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

    onChecker_typeChange: function(field, newValue, oldValue, eOpts) {
        var config = Ext.getCmp("config");
        var mac = Ext.getCmp("con_mac");

        mac.hide();

        if(config.getValue() === "Active(Main)"){
            if(newValue === "proxy" || newValue === "report_serial_status"){
                mac.show();
            }
        }else{
            if(newValue === "proxy" || newValue === "proxy2"){
                mac.show();
            }
        }
    },

    onTarget_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTarget_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('target_ip').validateValue(true);
    },

    onTarget_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onBackup_macErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onBackup_macBlur: function(component, event, eOpts) {
        Ext.getCmp('backup_mac').validateValue(true);
    },

    onPeriodErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onPeriodKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPeriodFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 20';
        setTipFocus(this,component);
    },

    onPeriodBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('period').validateValue(true);
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTimeoutFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 50';
        setTipFocus(this,component);
    },

    onTimeoutBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('timeout').validateValue(true);
    },

    onVirtual_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onVirtual_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onVirtual_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('virtual_ip').validateValue(true);
    },

    onPriorityErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onPriorityKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPriorityFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 254';
        setTipFocus(this,component);
    },

    onPriorityBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('priority').validateValue(true);
    },

    onBoostupErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onBoostupKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onBoostupFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 100';
        setTipFocus(this,component);
    },

    onBoostupBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('boostup').validateValue(true);
    },

    onChk_periodErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onChk_periodKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onChk_periodErrorChange1: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 255';
        setTipFocus(this,component);
    },

    onChk_periodBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('chk_period').validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        this.fieldInfo = makeZenTip();
        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var router = Ext.getCmp("chk_router");

        var period = Ext.getCmp("chk_period");
        var priority = Ext.getCmp("priority");

        var type = Ext.getCmp("type");
        var _store = Ext.data.StoreManager.lookup("store_l2_type");

        _store.removeAll();

        var c_n_vrrp = Ext.getCmp("c_n_vrrp");
        var c_vrrp = Ext.getCmp("c_vrrp");
        var c_boost = Ext.getCmp("c_boost");

        var obj = [
            { "name":__zen('general'), "val":"none" },
            { "name":__zen('monitoring_route'), "val":"linelb" },
            { "name":__zen('line_backup'), "val":"standby" }
        ];

        if(config.getValue() === "Active(Main)"){
            if(router.getValue() === true){
                obj.push({ "name":__zen('router_backup'), "val":"proxy" });
            }
            obj.push({ "name":__zen('monitoring_sub_device'), "val":"report_serial_status" });
        }else{
            var ar = { "name":__zen('main_device_backup'), "val":"proxy" };
            obj.push(ar);
            if(router.getValue() === true){
                ar = { "name":__zen('router_backup'), "val":"proxy2" };
                obj.push(ar);
            }
        }

        _store.add(obj);
        Ext.getCmp("checker_type").setValue("none");

        if(compose.getRawValue() === "Active-Standby"){
            if(config.getRawValue() === "Standby(Sub)"){
                c_boost.show();
            }else{
                c_boost.hide();
            }

            if(way.getRawValue() === "VRRP"){
                c_vrrp.show();
                c_n_vrrp.hide();
                period.setValue("2");

                if(config.getRawValue() === "Standby(Sub)"){
                    priority.setValue("80");
                }else{
                    priority.setValue("100");
                }
            }else{
                c_vrrp.hide();
                c_n_vrrp.show();
                period.setValue("1");
            }
        }else{
            c_n_vrrp.show();
            c_vrrp.hide();
            c_boost.hide();
            period.setValue("1");
        }

        if(me.edit === "edit"){
            this.init_ha_l2();
        }else{
            this.setTitle(__zen('l2_add'));
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");
        var group_num = Ext.getCmp("group_num");
        var chk_router = Ext.getCmp("chk_router");

        var inter = Ext.getCmp("inter");

        var type = Ext.getCmp("checker_type");
        var target_ip = Ext.getCmp("target_ip");
        var backup_mac = Ext.getCmp("backup_mac");
        var period = Ext.getCmp("period");
        var timeout = Ext.getCmp("timeout");

        var virtual_ip = Ext.getCmp("virtual_ip");
        var priority = Ext.getCmp("priority");
        var boostup = Ext.getCmp("boostup");
        var chk_period = Ext.getCmp("chk_period");

        if(compose.getValue() === "Active-Active"){
            if(target_ip.isValid()===false){ target_ip.focus(); return false; }
            if(period.isValid()===false){ period.focus(); return false; }
            if(timeout.isValid()===false){ timeout.focus(); return false; }
        }else{

            if(way.getValue() === "Proxy"){
                if(target_ip.isValid()===false){ target_ip.focus(); return false; }
                if(period.isValid()===false){ period.focus(); return false; }
                if(timeout.isValid()===false){ timeout.focus(); return false; }
            }else{
                if(priority.isValid()===false){ priority.focus(); return false; }
                if(chk_period.isValid()===false){ chk_period.focus(); return false; }
                if(virtual_ip.isValid()===false){ virtual_ip.focus(); return false; }
                if(config.getValue() === "Standby(Sub)"){
                    if(boostup.isValid()===false){ boostup.focus(); return false; }
                }
            }
        }

        if(config.getValue() === "Active(Main)"){
            if(type.getValue() === "proxy" || type.getValue() === "report_serial_status"){

                if(backup_mac.isValid()===false){ backup_mac.focus(); return false; }
            }
        }else{
            if(type.getValue() === "proxy" || type.getValue() === "proxy"){

                if(backup_mac.isValid()===false){ backup_mac.focus(); return false; }
            }
        }

        var c_nvrrp = Ext.getCmp("c_n_vrrp");
        var c_vrrp = Ext.getCmp("c_vrrp");

        var list = {
            'interface': inter.getValue(),
            'target_ip': (c_nvrrp.hidden)?null:target_ip.getValue(),
            'type': (c_nvrrp.hidden)?null:type.getValue(),
            'virtual_ip': (c_vrrp.hidden)?null:virtual_ip.getValue(),
            'priority': (c_vrrp.hidden)?null:priority.getValue(),
            'boost_up': (Ext.getCmp("c_boost").hidden)?null:boostup.getValue(),
            'period': (c_vrrp.hidden)?period.getValue():chk_period.getValue(),
            'timeout': (c_nvrrp.hidden)?null:timeout.getValue(),
            'mac': (Ext.getCmp("con_mac").hidden)?null:backup_mac.getValue(),
            'cid': me.cid
        };

        var obj = {
            'branch_mode' : {
                'compose' : compose.getValue(),
                'config' : config.getValue(),
                'way' : (way.hidden)?null:way.getValue(),
                'use_router_backup': (chk_router.getValue())?"on":"off",
                'group_num' : (Ext.getCmp("c_group_n").hidden)?null:group_num.getValue()
            },
            'checker' : list
        };

        var update_flag = (me.edit==="edit")?true:false;

        var checker_xpath = '';

        if(obj['branch_mode']['compose'].toLowerCase() === 'active-active' && obj['branch_mode']['config'].toLowerCase() === 'active(main)'){
            obj['branch_mode']['way'] = '';
            checker_xpath = 'aa_main_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-active' && obj['branch_mode']['config'].toLowerCase() === 'active(sub)'){
            obj['branch_mode']['way'] = '';
            checker_xpath = 'aa_sub_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'active(main)' &&
            obj['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_main_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'standby(sub)' &&
            obj['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_sub_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'active(main)' &&
            obj['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_main';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'standby(sub)' && 
            obj['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_sub'
        }
        else{
            checker_xpath = '';
        }

        if(update_flag === true){

            Ext.each(Ext.getCmp('NFW2_network_ha_l2').getViewModel().data.ha_branch_script[checker_xpath], function(record, idx){
                if(record['interface'] === obj['checker']['interface']){
                    record = obj['checker'];
                    return false;
                }
            });

            Ext.Msg.show({
                title: __weguardia,
                msg: get_msg("msg_ok_edit"),
                width: 300,
                buttons: Ext.Msg.OK,
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });

            me.get_ha_branch_list();
            
        }else{

            var duplicate_check = true;

            Ext.each(Ext.getCmp('NFW2_network_ha_l2').getViewModel().data.ha_branch_script[checker_xpath], function(record, idx){
                if(record['interface'] === obj['checker']['interface']){
                    prt_errMsg(err_dup(__zen('inter'),2),'fld_msg1');
                    inter.focus();
                    duplicate_check = false;
                    return false;
                }
            });

            if(duplicate_check){
                Ext.getCmp('NFW2_network_ha_l2').getViewModel().data.ha_branch_script[checker_xpath].push(obj['checker']);

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.YESNO,
                    buttonText:{
                        yes: __zen('add_plus'),
                        no: __zen('close')
                    },
                    fn: setWinState,
                    icon: Ext.window.MessageBox.INFO
                });

                me.get_ha_branch_list();
            }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_ha_l2: function() {
        var me = this;

        var tbl = Ext.getCmp("grid_list");
        var grid_chk = tbl.getSelectionModel().getSelection();

        this.setTitle(__zen('l2_edit')+" - "+grid_chk[0].data.inter);

        var compose = Ext.getCmp("compose");
        var config = Ext.getCmp("config");
        var way = Ext.getCmp("way");

        var type = Ext.getCmp("checker_type");

        var obj = {
            'branch_mode': {
                'compose': compose.getValue(),
                'config': config.getValue(),
                'way': way.getValue()
            },
            'checker': {
                'interface': grid_chk[0].data.inter,
                'type': grid_chk[0].data.type
            }
        };

        var checker_xpath = '';

        if(obj['branch_mode']['compose'].toLowerCase() === 'active-active' && obj['branch_mode']['config'].toLowerCase() === 'active(main)'){
            obj['branch_mode']['way'] = '';
            checker_xpath = 'aa_main_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-active' && obj['branch_mode']['config'].toLowerCase() === 'active(sub)'){
            obj['branch_mode']['way'] = '';
            checker_xpath = 'aa_sub_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'active(main)' && 
            obj['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_main_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'standby(sub)' &&
            obj['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_sub_checkers';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'active(main)' && 
            obj['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_main';
        }
        else if(obj['branch_mode']['compose'].toLowerCase() === 'active-standby' && obj['branch_mode']['config'].toLowerCase() === 'standby(sub)' && 
            obj['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_sub'
        }
        else{
            checker_xpath = '';
        }

        var response;

        var saved_list = Ext.getCmp('NFW2_network_ha_l2').getViewModel().data.ha_branch_script[checker_xpath];

        if(obj['branch_mode']['way'].lower() == 'vrrp'){
            for(var i in saved_list){
                if(saved_list[i]['interface'] === obj['checker']['interface']){
                    response = saved_list[i]['interface'];
                    break;
                }
            }
        }
        else{
            for(var i in saved_list){
                if(saved_list[i]['interface'] === obj['checker']['interface'] && saved_list[i]['type'] == obj['checker']['type']){
                    response = saved_list[i]['interface'];
                    break;
                }
            }
        }

        var inter = Ext.getCmp("inter");
        var type = Ext.getCmp("checker_type");
        var target_ip = Ext.getCmp("target_ip");
        var mac = Ext.getCmp("backup_mac");
        var period = Ext.getCmp("period");
        var timeout = Ext.getCmp("timeout");

        var virtual_ip = Ext.getCmp("virtual_ip");
        var priority = Ext.getCmp("priority");
        var boostup = Ext.getCmp("boostup");

        inter.setValue(response['interface']);

        if(way.getValue() === "VRRP"){
            var period = Ext.getCmp("chk_period");

            virtual_ip.setValue(response.virtual_ip);
            priority.setValue(response.priority);
            boostup.setValue(response.boost_up);
            period.setValue(response.period);
        }else{
            type.setValue(response.type);
            target_ip.setValue(response.target_ip);

            if(config.getValue() === "Active(Main)"){
                if(response.type === "proxy" || response.type === "report_serial_status"){
                    mac.setValue(response.mac);
                }
            }else{
                if(response.type === "proxy" || response.type === "proxy2"){
                    mac.setValue(response.mac);
                }
            }
            period.setValue(response.period);
            timeout.setValue(response.timeout);
        }


        me.cid = response.cid;
    },

    get_ha_branch_list: function() {
        var me = this;

        var _params = '';

        var _store = Ext.data.StoreManager.lookup("store_ha_branch_list");

        var win = Ext.getCmp("NFW2_network_ha_l2");

        _store.removeAll();

        var response = win.getViewModel().data.ha_branch_script;

        win.compose = response.branch_mode.compose;
        win.way = (response.branch_mode.way)?response.branch_mode.way:"Proxy";
        win.config = response.branch_mode.config;
        win.router = response.branch_mode.use_router_backup;
        win.group_num = response.branch_mode.group_num;

        Ext.getCmp("compose").setValue(response.branch_mode.compose);
        Ext.getCmp("config").setValue(response.branch_mode.config);

        if(response.branch_mode.compose === "Active-Standby"){
            Ext.getCmp("way").setValue(response.branch_mode.way);
            if(response.branch_mode.way === "VRRP"){

            }else{
                if(response.branch_mode.use_router_backup === "on"){
                    Ext.getCmp("chk_router").state = true;
                    Ext.getCmp("chk_router").moveHandle(true);
                }else{
                    Ext.getCmp("chk_router").state = false;
                    Ext.getCmp("chk_router").moveHandle(false);
                }
            }
        }else{
            if(response.branch_mode.use_router_backup === "on"){
                Ext.getCmp("chk_router").state = true;
                Ext.getCmp("chk_router").moveHandle(true);
            }else{
                Ext.getCmp("chk_router").state = false;
                Ext.getCmp("chk_router").moveHandle(false);
            }
        }

        var _store = Ext.data.StoreManager.lookup("store_ha_branch_list");

        var checker_xpath = '';

        if(response['branch_mode']['compose'].toLowerCase() === 'active-active' && response['branch_mode']['config'].toLowerCase() === 'active(main)'){
            response['branch_mode']['way'] = '';
            checker_xpath = 'aa_main_checkers';
        }
        else if(response['branch_mode']['compose'].toLowerCase() === 'active-active' && response['branch_mode']['config'].toLowerCase() === 'active(sub)'){
            response['branch_mode']['way'] = '';
            checker_xpath = 'aa_sub_checkers';
        }
        else if(response['branch_mode']['compose'].toLowerCase() === 'active-standby' && response['branch_mode']['config'].toLowerCase() === 'active(main)' &&
            response['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_main_checkers';
        }
        else if(response['branch_mode']['compose'].toLowerCase() === 'active-standby' && response['branch_mode']['config'].toLowerCase() === 'standby(sub)' &&
            response['branch_mode']['way'].toLowerCase() === 'proxy'){
            checker_xpath = 'as_sub_checkers';
        }
        else if(response['branch_mode']['compose'].toLowerCase() === 'active-standby' && response['branch_mode']['config'].toLowerCase() === 'active(main)' &&
            response['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_main';
        }
        else if(response['branch_mode']['compose'].toLowerCase() === 'active-standby' && response['branch_mode']['config'].toLowerCase() === 'standby(sub)' && 
            response['branch_mode']['way'].toLowerCase() === 'vrrp'){
            checker_xpath = 'vrrp_sub'
        }
        else{
            checker_xpath = '';
        }


        var checkers = response[checker_xpath];

        var ar_c = new Array();

        for(var i=0; i<checkers.length; i++){
            var obj = {
                'inter': checkers[i].interface,
                'type': checkers[i].type,
                'target_ip': checkers[i].target_ip,
                'timeout': checkers[i].timeout,
                'period': checkers[i].period,
                'mac': checkers[i].mac,
                'virtual_ip': checkers[i].virtual_ip,
                'priority': checkers[i].priority,
                'boostup': checkers[i].boost_up,
                'group_num': checkers[i].group_num,
                'cid': checkers[i].cid
            };
            ar_c.push(obj);
        }

        var data = ar_c;
        _store.add(data);;
    }

});
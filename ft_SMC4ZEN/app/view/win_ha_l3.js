
Ext.define('SMC4ZEN.view.win_ha_l3', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ha_l3',

    requires: [
        'SMC4ZEN.view.win_ha_l3ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ha_l3'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 520,
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
                    minWidth: 470,
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
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    id: 'vr_a_ip_lb',
                                    width: 125,
                                    bind: {
                                        text: '{active_virtual_ip}'
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
                                    id: 'virtual_a_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onVirtual_a_ipErrorChange',
                                        focus: 'onVirtual_a_ipFocus',
                                        blur: 'onVirtual_a_ipBlur'
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
                                    id: 'mac_ip_lb',
                                    width: 125,
                                    bind: {
                                        text: '{l3_device_ip}'
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
                                    id: 'machine_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onMachine_ipErrorChange',
                                        focus: 'onMachine_ipFocus',
                                        blur: 'onMachine_ipBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'con_backup',
                            margin: '8 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    id: 'vr_b_ip_lb',
                                    width: 125,
                                    bind: {
                                        text: '{backup_virtual_ip}'
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
                                    id: 'virtual_b_ip',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onVirtual_b_ipErrorChange',
                                        focus: 'onVirtual_b_ipFocus',
                                        blur: 'onVirtual_b_ipBlur'
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
                                    id: 'ms_b_ip_lb',
                                    width: 125,
                                    bind: {
                                        text: '{backup_device_ip}'
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
                                    id: 'master_b_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onMaser_b_ipErrorChange',
                                        focus: 'onMaster_b_ipFocus',
                                        blur: 'onMaster_b_ipBlur'
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

    onVirtual_a_ipErrorChange: function(labelable, error, eOpts) {

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

    onVirtual_a_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onVirtual_a_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('virtual_a_ip').validateValue(true);
    },

    onMachine_ipErrorChange: function(labelable, error, eOpts) {
        
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

    onMachine_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onMachine_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('machine_ip').validateValue(true);
    },

    onVirtual_b_ipErrorChange: function(labelable, error, eOpts) {
        
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

    onVirtual_b_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onVirtual_b_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('virtual_b_ip').validateValue(true);
    },

    onMaser_b_ipErrorChange: function(labelable, error, eOpts) {
        
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

    onMaster_b_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onMaster_b_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('master_b_ip').validateValue(true);
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

        if(!ValidNumKeydown(code)){

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

        if(!ValidNumKeydown(code)){

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

    onWindowAfterRender: function(component, eOpts) {

        var me = this;
        var ethinfo = me.parentObj.getViewModel().getData().network_interface.network;
        var config = Ext.getCmp("config");
        var compose = Ext.getCmp("compose");
        var ethStore = Ext.data.StoreManager.lookup('store_interface');

        me.fieldInfo = makeZenTip();
        
        // 0. store interface init

        console.log('Eth data -> ', setDevInterface(ethinfo.ethernet, ethinfo.bridge, ethinfo.bonding));

        ethStore.loadData(setDevInterface(ethinfo.ethernet, ethinfo.bridge, ethinfo.bonding));

        if(me.edit === "edit"){

            me.init_ha_l3();

        }
        else{

            me.setTitle(__zen('l3_add'));

        }            

        if(compose.getValue() === "Active-Standby"){

            Ext.getCmp("con_backup").hide();

        }

        if(config.getValue() === "Active(Master)"){

            Ext.getCmp("ms_b_ip_lb").setText(__zen('backup_device_ip'));
            Ext.getCmp("vr_a_ip_lb").setText(__zen('active_virtual_ip'));

        }
        else{

            Ext.getCmp("ms_b_ip_lb").setText(__zen('master_device_ip'));

            if(compose.getValue() === "Active-Standby"){

                Ext.getCmp("vr_a_ip_lb").setText(__zen('backup_virtual_ip'));
            }

        }

    },

    onButtonClick1: function(button, e, eOpts) {
       
        var me = this;

        var way = Ext.getCmp("way");
        var config = Ext.getCmp("config");
        var compose = Ext.getCmp("compose");
        var group_n = Ext.getCmp("group_n");

        var inter = Ext.getCmp("inter");
        var period = Ext.getCmp("period");
        var timeout = Ext.getCmp("timeout");
        var machine_ip = Ext.getCmp("machine_ip");
        var master_b_ip = Ext.getCmp("master_b_ip");
        var virtual_a_ip = Ext.getCmp("virtual_a_ip");
        var virtual_b_ip = Ext.getCmp("virtual_b_ip");

        var st_haheadlist = Ext.data.StoreManager.lookup("store_ha_head_list");
        
        var obj = {};

        if(!virtual_a_ip.isValid()){ 

            virtual_a_ip.focus(); 

            return false; 

        }

        if(!machine_ip.isValid()){ 

            machine_ip.focus(); 

            return false; 

        }
        
        if(compose.getValue() === "Active-Active"){

            if(!virtual_b_ip.isValid()){ 

                virtual_b_ip.focus(); 

                return false; 

            }

        }

        if(!master_b_ip.isValid()){ 

            master_b_ip.focus(); 

            return false; 

        }

        if(!period.isValid()){ 

            period.focus(); 

            return false; 

        }

        if(!timeout.isValid()){ 

            timeout.focus(); 

            return false; 

        }

        var period = String(Number(period.getValue()));
        var timeout = String(Number(timeout.getValue()));

        if(compose.getValue() === "Active-Active"){

            var ao = {};

            ao.inter = inter.getValue();
            ao.period = period;
            ao.timeout = timeout;
            ao.machine_ip = machine_ip.getValue();
            ao.master_b_ip = master_b_ip.getValue();
            ao.virtual_a_ip = virtual_a_ip.getValue();
            ao.virtual_b_ip = virtual_b_ip.getValue();

        }
        else{

            var ao = {};

            ao.inter = inter.getValue();
            ao.period = period;
            ao.timeout = timeout;
            ao.machine_ip = machine_ip.getValue();
            ao.master_b_ip = master_b_ip.getValue();
            ao.virtual_a_ip = virtual_a_ip.getValue();

        }

        if(me.edit === "edit"){

            me.record.set(ao);
            me.record.commit();

        }
        else{

            var rowCount = st_haheadlist.count();

            ao.group_num = ((rowCount * 2) + Number(me.group_num)).toString() + ', ' + ((rowCount * 2) + Number(me.group_num) + 1).toString();

            st_haheadlist.add(ao);

        }

        me.close();

    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_ha_l3: function() {

        var me = this;
        var record = me.record;

        var compose = Ext.getCmp("compose");
        var gpn_halist = Ext.getCmp("grid_list");
        var gpn_selectlist = gpn_halist.getSelection();

        this.setTitle(__zen('l3_edit')+" - "+ gpn_selectlist[0].get('inter'));

        var inter = Ext.getCmp("inter");
        var period = Ext.getCmp("period");
        var timeout = Ext.getCmp("timeout");
        var machine_ip = Ext.getCmp("machine_ip");
        var master_b_ip = Ext.getCmp("master_b_ip");
        var virtual_a_ip = Ext.getCmp("virtual_a_ip");
        var virtual_b_ip = Ext.getCmp("virtual_b_ip");
        
        inter.setValue(record.get('inter'));

        if(compose.getValue() === "Active-Active"){

            master_b_ip.setValue(record.get('master_b_ip'));
            virtual_a_ip.setValue(record.get('virtual_a_ip'));
            virtual_b_ip.setValue(record.get('virtual_b_ip'));

        }
        else{

            master_b_ip.setValue(record.get('master_b_ip'));
            virtual_a_ip.setValue(record.get('virtual_a_ip'));

        }

        period.setValue(record.get('period'));
        timeout.setValue(record.get('timeout'));
        machine_ip.setValue(record.get('machine_ip'));

    }

});
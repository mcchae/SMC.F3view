
Ext.define('SMC4ZEN.view.win_multipath_line', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_multipath_line',

    requires: [
        'SMC4ZEN.view.win_multipath_lineViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_multipath_line'
    },
    cls: 'zen_win',
    id: 'win_multipath_line',
    width: 500,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'combobox',
                            validator: function(value) {
                                if(value !== true){
                                    if(Ext.getCmp('win_multipath_inter').getStore().getCount() === 0){ return get_msg('err_pathset'); }
                                }
                                return true;
                            },
                            id: 'win_multipath_inter',
                            margin: '8 0 0 0',
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            emptyText: 'Select',
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            },
                            listeners: {
                                errorchange: 'onWin_multipath_interErrorChange',
                                focus: 'onWin_multipath_interFocus',
                                blur: 'onWin_multipath_interBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'win_multipath_time_con',
                            margin: '8 0 0 10',
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
                                        text: '{monitor_period}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var _value = removeComma(value);

                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(_value, 60, 3600)){ return ValidLimit(60, addComma(3600)); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(60,
                                        3600,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    id: 'win_multipath_time',
                                    width: 120,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    maxLengthText: ' ',
                                    listeners: {
                                        errorchange: 'onWin_multipath_timeErrorChange',
                                        focus: 'onWin_multipath_timeFocus',
                                        blur: 'onWin_multipath_timeBlur',
                                        change: 'onWin_multipath_timeChange',
                                        keydown: 'onWin_multipath_timeKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_multipath_band_con',
                            margin: '8 0 0 10',
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
                                        text: '{limit_band}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var _value = removeComma(value);

                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(_value, 1, 1000000)){ return ValidLimit(1, addComma(1000000)); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        1000000,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    id: 'win_multipath_band',
                                    width: 150,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("kbps")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 9,
                                    maxLengthText: ' ',
                                    listeners: {
                                        errorchange: 'onWin_multipath_bandErrorChange1',
                                        focus: 'onWin_multipath_bandFocus1',
                                        blur: 'onWin_multipath_bandBlur1',
                                        change: 'onWin_multipath_bandChange',
                                        keydown: 'onWin_multipath_bandKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'win_multipath_limit_con',
                            margin: '8 0 0 10',
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
                                        text: '{limit_down}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(value, 2, 20)){ return ValidLimit(2, 20); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(2,
                                        20,
                                        null)
                                    },
                                    id: 'win_multipath_limit',
                                    width: 80,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        errorchange: 'onWin_multipath_bandErrorChange',
                                        focus: 'onWin_multipath_bandFocus',
                                        blur: 'onWin_multipath_bandBlur',
                                        keydown: 'onWin_multipath_limitKeydown'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_multipath_action',
                            margin: '8 0 8 10',
                            width: 350,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        name: __zen('detect'),
                                        value: '1'
                                    },
                                    {
                                        name: __zen('inter_down'),
                                        value: '2'
                                    }
                                ],
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'value'
                                    }
                                ]
                            },
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{action}'
                            },
                            listeners: {
                                afterrender: 'onWin_multipath_actionAfterRender',
                                change: 'onWin_multipath_actionChange'
                            }
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'multipath_down_con',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 135
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var _value = removeComma(value);

                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                            if(!LengthCheck(_value, 10, 86400)){ return ValidLimit(10, 86400); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(10,
                                        86400,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    id: 'win_multipath_down',
                                    width: 120,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    value: 60,
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    maxLengthText: ' ',
                                    listeners: {
                                        errorchange: 'onWin_multipath_downErrorChange',
                                        focus: 'onWin_multipath_downFocus',
                                        blur: 'onWin_multipath_downBlur',
                                        change: 'onWin_multipath_downChange',
                                        keydown: 'onWin_multipath_downKeydown'
                                    }
                                }
                            ]
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
                    itemId: 'fld_msg3'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_multipath_lineAfterRender'
    },

    onWin_multipath_interErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_multipath_interFocus: function(component, event, eOpts) {
        if(Ext.getCmp('win_multipath_inter').getStore().getCount() === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_pathset'));
        }
    },

    onWin_multipath_interBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

        Ext.getCmp('win_multipath_inter').validateValue(true);
    },

    onWin_multipath_timeErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_multipath_timeFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_multipath_timeBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_multipath_time').validateValue(true);
    },

    onWin_multipath_timeChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_multipath_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_multipath_bandErrorChange1: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_multipath_bandFocus1: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_multipath_bandBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_multipath_band').validateValue(true);
    },

    onWin_multipath_bandChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_multipath_bandKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_multipath_bandErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_multipath_bandFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_multipath_bandBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_multipath_limit').validateValue(true);
    },

    onWin_multipath_limitKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onWin_multipath_actionAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('win_multipath_action').getStore().data;

        if(inter.length > 0){
            Ext.getCmp("win_multipath_action").setValue(inter.items[0].data['value']);
        }
    },

    onWin_multipath_actionChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "1"){
            Ext.getCmp('multipath_down_con').hide();
            Ext.getCmp('win_multipath_down').setValue(60);
        }
        else{ Ext.getCmp('multipath_down_con').show(); }
    },

    onWin_multipath_downErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_multipath_downFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_multipath_downBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('win_multipath_down').validateValue(true);
    },

    onWin_multipath_downChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onWin_multipath_downKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_multipath_line');
        var store_chk = Ext.getCmp('grid_multipath_checker').getStore();
        var store_load = Ext.getCmp('grid_multipath_upload').getStore();

        if(Ext.getCmp('win_multipath_inter').isValid() === false){
            Ext.getCmp('win_multipath_inter').focus();

            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg3"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_pathset'));
            me.set_btn = true;

            return false;
        }

        if(me.mode === "checker"){
            if(Ext.getCmp('win_multipath_time').isValid() === false){ Ext.getCmp('win_multipath_time').focus(); return false; }
            if(Ext.getCmp('win_multipath_limit').isValid() === false){ Ext.getCmp('win_multipath_limit').focus(); return false; }
            if(Ext.getCmp('win_multipath_action').getValue() === "2"){
                if(Ext.getCmp('win_multipath_down').isValid() === false){ Ext.getCmp('win_multipath_down').focus(); return false; }
            }

            var record1 = {
                'inter' : Ext.getCmp('win_multipath_inter').getValue(),
                'time' : removeComma(Ext.getCmp('win_multipath_time').getValue()),
                'limit' : Ext.getCmp('win_multipath_limit').getValue(),
                'action' : Ext.getCmp('win_multipath_action').getValue(),
                'downtime' : Ext.getCmp('win_multipath_down').getValue()
            };
        }
        else{
            if(Ext.getCmp('win_multipath_band').isValid() === false){ Ext.getCmp('win_multipath_band').focus(); return false; }
            if(Ext.getCmp('win_multipath_action').getValue() === "2"){
                if(Ext.getCmp('win_multipath_down').isValid() === false){ Ext.getCmp('win_multipath_down').focus(); return false; }
            }

            var record2 = {
                'inter' : Ext.getCmp('win_multipath_inter').getValue(),
                'bandwidth' : removeComma(Ext.getCmp('win_multipath_band').getValue()),
                'action' : Ext.getCmp('win_multipath_action').getValue(),
                'downtime' : Ext.getCmp('win_multipath_down').getValue()
            };
        }

        if(me.edit === "edit"){
            if(me.mode === "checker"){
                store_chk.removeAt(me.index, 1);
                store_chk.insert(me.index, record1);
            }
            else{
                store_load.removeAt(me.index, 1);
                store_load.insert(me.index, record2);
            }
        }
        else{
            if(me.mode === "checker"){
                store_chk.add(record1);
            }
            else{
                store_load.add(record2);
            }
        }

        this.close();
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_multipath_lineAfterRender: function(component, eOpts) {
        this.fieldInfo = makeZenTip();
        var me = this;
        // chk_zenauth(null);
        me.set_btn = false;
        if(me.mode === "checker"){
            Ext.getCmp('win_multipath_time_con').show();
            Ext.getCmp('win_multipath_band_con').hide();
            Ext.getCmp('win_multipath_limit_con').show();

        }
        else{
            Ext.getCmp('win_multipath_time_con').hide();
            Ext.getCmp('win_multipath_band_con').show();
            Ext.getCmp('win_multipath_limit_con').hide();
        }

        if(me.edit === "edit"){
            me.setTitle(__zen("edit_line_manager"));
        }
        else{
            me.setTitle(__zen("add_line_manager"));
        }

        response = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface;

                var store = Ext.getCmp('win_multipath_inter').getStore();
                var record = [];

                for(var i in response.network.ethernet){
                    if(response.network.ethernet[i]['default'].multipath === "on"){ record.push({ 'name' : i }); }
                }

                if(me.mode === "checker"){
                    var chk_store = Ext.getCmp('grid_multipath_checker').getStore();

                    for(var j in chk_store.data.items){
                        for(var l in record){
                            if(me.edit === "edit"){
                                if(me.record.data.inter !== record[l].name){
                                    if(chk_store.data.items[j].data.inter === record[l].name){ record.splice(l, 1); }
                                }
                            }
                            else{
                                if(chk_store.data.items[j].data.inter === record[l].name){ record.splice(l, 1); }
                            }
                        }
                    }
                }
                else{
                    var load_store = Ext.getCmp('grid_multipath_upload').getStore();

                    for(var k in load_store.data.items){
                        for(var m in record){
                            if(me.edit === "edit"){
                                if(me.record.data.inter !== record[m].name){
                                    if(load_store.data.items[k].data.inter === record[m].name){ record.splice(m, 1); }
                                }
                            }
                            else{
                                if(load_store.data.items[k].data.inter === record[m].name){ record.splice(m, 1); }
                            }
                        }
                    }
                }

                store.loadData(record);

                var inter = Ext.getCmp('win_multipath_inter').getStore().data;

                if(inter.length > 0){
                    Ext.getCmp("win_multipath_inter").setValue(inter.items[0].data['name']);
                }

                if(me.edit === "edit"){
                    if(me.mode === "checker"){
                        Ext.getCmp('win_multipath_time').setValue(me.record.data.time);
                        Ext.getCmp('win_multipath_limit').setValue(me.record.data.limit);
                        Ext.getCmp('win_multipath_inter').setValue(me.record.data.inter);
                        Ext.getCmp('win_multipath_action').setValue(me.record.data.action);
                        if(me.record.data.downtime === ""){ Ext.getCmp('win_multipath_down').setValue(60); }
                        else{ Ext.getCmp('win_multipath_down').setValue(me.record.data.downtime); }
                    }
                    else{
                        Ext.getCmp('win_multipath_band').setValue(me.record.data.bandwidth);
                        Ext.getCmp('win_multipath_inter').setValue(me.record.data.inter);
                        Ext.getCmp('win_multipath_action').setValue(me.record.data.action);
                        if(me.record.data.downtime === ""){ Ext.getCmp('win_multipath_down').setValue(60); }
                        else{ Ext.getCmp('win_multipath_down').setValue(me.record.data.downtime); }
                    }
                }
                else{
                    Ext.getCmp('win_multipath_down').setValue(60);
                    Ext.getCmp('win_multipath_time').setValue(60);
                    Ext.getCmp('win_multipath_limit').setValue(5);
                    Ext.getCmp('win_multipath_band').setValue(5000);
                }

        //     }
        // );

    }

});
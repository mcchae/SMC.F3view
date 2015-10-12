
Ext.define('SMC4ZEN.view.win_router_vrrp', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_router_vrrp',

    requires: [
        'SMC4ZEN.view.win_router_vrrpViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_router_vrrp'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 500,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return value; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'vid',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 3,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{group_id}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange',
                                keydown: 'onTextfieldKeydown',
                                focus: 'onVidFocus',
                                blur: 'onVidBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'interface',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'eth1',
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
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return value; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 1, 254)){ return ValidLimit(1, 254); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'priority',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            value: '100',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 3,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{priority_level}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange1',
                                keydown: 'onTextfieldKeydown1',
                                focus: 'onPriorityFocus',
                                blur: 'onPriorityBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return value; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidNum(value)){ return get_msg('err_form'); }
                                if(!LengthCheck(value, 1, 255)){ return ValidLimit(1, 255); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: [
                                'lb_req',
                                'inp_unit'
                            ],
                            id: 'period',
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                            ],
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 3,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{period}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange2',
                                keydown: 'onTextfieldKeydown2',
                                focus: 'onPeriodFocus',
                                blur: 'onPeriodBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return value; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'vip',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            bind: {
                                fieldLabel: '{group_ip}'
                            },
                            listeners: {
                                errorchange: 'onVipErrorChange',
                                focus: 'onVipFocus',
                                blur: 'onVipBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'mode',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'master',
                            editable: false,
                            displayField: 'name',
                            store: 'store_vrrp_failover',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{operate_mode}'
                            },
                            listeners: {
                                change: 'onModeChange'
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'c_boostup',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value) || value === true){ return true; }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 0, 100)){ return ValidLimit(0, 100); }

                                        var pri = Ext.getCmp("priority").getValue();
                                        if(Number(pri)+Number(value) > 255){
                                            return get_msg('err_vrrp_pb');
                                        }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 'boostup',
                                    fieldLabel: 'Boost Up',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    value: 0,
                                    fieldStyle: 'text-align: right',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 3,
                                    minLength: 1,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange3',
                                        keydown: 'onTextfieldKeydown3',
                                        focus: 'onBoostupFocus',
                                        blur: 'onBoostupBlur'
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

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onVidFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 255';
        // setTipFocus(this,component);
    },

    onVidBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown1: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPriorityFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 254';
        // setTipFocus(this,component);
    },

    onPriorityBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown2: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPeriodFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 255';
        // setTipFocus(this,component);
    },

    onPeriodBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        component.validateValue(true);
    },

    onVipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onVipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onVipBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        component.validateValue(true);
    },

    onModeChange: function(field, newValue, oldValue, eOpts) {
        var boost = Ext.getCmp("c_boostup");

        if(newValue === "backup"){
            boost.enable();
        }else{
            boost.disable();
            Ext.getCmp("boostup").setValue("0");
        }
    },

    onTextfieldErrorChange3: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown3: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onBoostupFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'0 ~ 100';
        // setTipFocus(this,component);
        if(component.getValue()==="0"){
            component.setValue("");
        }
    },

    onBoostupBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        // chk_zenauth(null);

        if(me.edit === "edit"){

            var record = me.record.data;

            me.setTitle(__zen('vrrp_edit')+" - "+record.num);
            Ext.getCmp("vid").setValue(record.vid);
            Ext.getCmp("interface").setValue(record.setting['interface']);
            Ext.getCmp("priority").setValue(record.priority);
            Ext.getCmp("period").setValue(record.period);

            Ext.getCmp("vip").setValue(record.vip);
            Ext.getCmp("mode").setValue(record.setting.mode);

            if(record.setting.mode === "backup"){

                Ext.getCmp("boostup").setValue(record.boostup);
            }

        }else{
            me.setTitle(__zen('vrrp_add'));
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var vid = Ext.getCmp("vid");
        var inter = Ext.getCmp("interface");
        var priority = Ext.getCmp("priority");
        var period = Ext.getCmp("period");

        var vip = Ext.getCmp("vip");
        var mode = Ext.getCmp("mode");
        var boostup = Ext.getCmp("boostup");

        var vrrp_info = {};
        var type = "";

        if(vid.isValid()===false){ vid.focus(); return false; }
        vrrp_info.vid = String(vid.getValue());

        vrrp_info.setting = {
            interface : inter.getValue(),
            mode : mode.getValue()
        };

        if(priority.isValid()===false){ priority.focus(); return false; }
        vrrp_info.priority = String(priority.getValue());

        if(period.isValid()===false){ period.focus(); return false; }
        vrrp_info.period = String(period.getValue());

        if(vip.isValid()===false){ vip.focus(); return false; }
        vrrp_info.vip = vip.getValue();

        if(mode.getValue() === "backup"){
            if(boostup.isValid()===false){ boostup.focus(); return false; }
            vrrp_info.boostup = Number(boostup.getValue());
        }

        prt_errMsg(null,null);

        var update;
        if(me.edit === "edit"){
            update = true;
            vrrp_info.cid = me.record.data.cid;
        }else{
            update = false;
        }

        var _params = {
            vrrp_info : Ext.encode(vrrp_info),
            update_flag : Ext.encode(update)
        };

        console.log('vrrp_info - ', vrrp_info);
        if(update){
            Ext.getStore('store_network_router_vrrp_list').each(function(data, idx){

                if(data.data.id === Ext.getCmp('tbl_list').getSelectionModel().getSelection()[0].data.id){

                        data.data.period = vrrp_info.period;
                        data.data.priority = vrrp_info.priority;
                        data.data.setting = vrrp_info.setting;
                        data.data.vid = vrrp_info.vid;
                        data.data.vip = vrrp_info.vip;
                        data.commit();
                        return false;
                }
            });
        }
        else{
            Ext.getStore('store_network_router_vrrp_list').add(vrrp_info);
        }

        me.close();
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    }

});
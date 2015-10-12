
Ext.define('SMC4ZEN.view.win_router_checker', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_router_checker',

    requires: [
        'SMC4ZEN.view.win_router_checkerViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.form.Label',
        'Ext.form.field.Radio',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_router_checker'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 700,
    modal: true,
    defaultListenerScope: true,
    overflowY: 'auto',
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
                    minWidth: 620,
                    items: [
                        {
                            xtype: 'container',
                            minWidth: 620,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value===true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!_valid(value)){ return get_msg('err_form'); }

                                        return true;

                                        function _valid(value){

                                            return (/^[a-zA-Z0-9`~!@#$%^&*()-_=+,<.>;:'"/?[|\]]*$/).test(value)? true:false;
                                        }
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 'name',
                                    width: 300,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 15,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{tag_name}'
                                    },
                                    listeners: {
                                        errorchange: 'onNameErrorChange',
                                        blur: 'onNameBlur',
                                        focus: 'onNameFocus'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    hidden: true,
                                    id: 'e_name',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'inter',
                            width: 300,
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
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidIPAddress(value) && !ValidIPv6(value)){ return get_msg('err_ip'); }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'ip',
                                    width: 300,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    bind: {
                                        fieldLabel: '{target_ip}'
                                    },
                                    listeners: {
                                        errorchange: 'onIpErrorChange',
                                        focus: 'onIpFocus',
                                        blur: 'onIpBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    cls: 'inp_unit',
                                    id: 'period',
                                    width: 220,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    value: '1',
                                    editable: false,
                                    displayField: 'sec',
                                    store: 'store_checker_period',
                                    valueField: 'sec',
                                    bind: {
                                        fieldLabel: '{trans_cycle}'
                                    }
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
                                    cls: 'x-form-item-label x-form-item-label-default  x-unselectable lb_req',
                                    style: 'display:inline-block; height:20px',
                                    width: 125,
                                    bind: {
                                        text: '{decision_method}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'r_cont',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
                                                    name: 'type',
                                                    checked: true,
                                                    inputValue: 'cont',
                                                    listeners: {
                                                        change: 'onR_contChange',
                                                        beforerender: 'onR_contBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }

                                                        return true;
                                                    },
                                                    id: 'con_fail',
                                                    width: 80,
                                                    fieldLabel: '',
                                                    msgTarget: 'none',
                                                    value: 3,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    minLength: 1,
                                                    listeners: {
                                                        errorchange: 'onTextfieldErrorChange',
                                                        keydown: 'onTextfieldKeydown',
                                                        focus: 'onCon_failFocus',
                                                        blur: 'onCon_failBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 15',
                                                    bind: {
                                                        text: '{checker_info3}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'r_non',
                                                    fieldLabel: 'Label',
                                                    hideLabel: true,
                                                    name: 'type',
                                                    inputValue: 'non',
                                                    listeners: {
                                                        change: 'onR_nonChange',
                                                        beforerender: 'onR_nonBeforeRender'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    disabled: true,
                                                    id: 'non_pool',
                                                    width: 80,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    minLength: 1,
                                                    listeners: {
                                                        errorchange: 'onNon_poolErrorChange',
                                                        keydown: 'onNon_poolKeydown',
                                                        focus: 'onNon_poolFocus',
                                                        blur: 'onNon_poolBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 15',
                                                    bind: {
                                                        text: '{checker_info5}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }

                                                        return true;
                                                    },
                                                    fieldInfo: '입력범위 : 1 ~ 50',
                                                    disabled: true,
                                                    id: 'non_fail',
                                                    width: 80,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 2,
                                                    minLength: 1,
                                                    listeners: {
                                                        errorchange: 'onNon_failErrorChange',
                                                        keydown: 'onNon_failKeydown',
                                                        focus: 'onNon_failFocus',
                                                        blur: 'onNon_failBlur'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 0 0 15',
                                                    bind: {
                                                        text: '{checker_info6}'
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
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'action',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    value: 'None',
                                    editable: false,
                                    displayField: 'val',
                                    store: 'store_checker_action',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{operate_mode}'
                                    },
                                    listeners: {
                                        change: 'onActionChange'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    disabled: true,
                                    id: 'con_mac',
                                    margin: '0 0 0 125',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === true){ return true; }

                                                if(!ValidMAC(value)){ return ValidIP("MAC"); }

                                                return true;
                                            },
                                            id: 'mac',
                                            width: 350,
                                            fieldLabel: 'Proxy MAC',
                                            labelSeparator: ' ',
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            listeners: {
                                                errorchange: 'onMacErrorChange',
                                                blur: 'onMacBlur'
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

    onNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNameBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onNameFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('checker_info1');
        setTipFocus(this,component);
    },

    onIpErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIpFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onIpBlur: function(component, event, eOpts) {

        component.validateValue(true);setTipBlur(this,component);
    },

    onR_contChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            this.chg_type("cont");
        }
    },

    onR_contBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('checker_info2');
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onCon_failFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 50';
        setTipFocus(this,component);
    },

    onCon_failBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_nonChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            this.chg_type("non");
        }
    },

    onR_nonBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('checker_info4');
    },

    onNon_poolErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNon_poolKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onNon_poolFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 50';
        setTipFocus(this,component);
    },

    onNon_poolBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNon_failErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNon_failKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onNon_failFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 50';
        setTipFocus(this,component);
    },

    onNon_failBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onActionChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp("mac").reset();

        if(newValue === "Proxy" || newValue === "Proxy2"){
            Ext.getCmp("con_mac").enable();
        }else{
            Ext.getCmp("con_mac").disable();
        }
    },

    onMacErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onMacBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.fieldInfo = makeZenTip();

        // chk_zenauth(null);

        if(me.edit === "edit"){

            var record = me.record.data;

            me.setTitle(__zen('checker_edit')+" - "+record.num);

            Ext.getCmp("name").setValue(record.name);
            Ext.getCmp("inter").setValue(record['interface']);
            Ext.getCmp("ip").setValue(record.ip);
            Ext.getCmp("period").setValue(record.period);

            if(record.setting.type === "cont"){
                Ext.getCmp("r_cont").setValue(true);
                Ext.getCmp("con_fail").setValue(record.fail);
            }else{
                Ext.getCmp("r_non").setValue(true);
                Ext.getCmp("non_pool").setValue(record.pool);
                Ext.getCmp("non_fail").setValue(record.fail);
            }

            Ext.getCmp("action").setValue(record.setting.action);
            if(record.setting.action === "Proxy" || record.setting.action === "Proxy2"){
                Ext.getCmp("mac").setValue(record.mac);
            }
        }else{
            me.setTitle(__zen('checker_add'));
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var name = Ext.getCmp("name");
        var inter = Ext.getCmp("inter");
        var ip = Ext.getCmp("ip");
        var period = Ext.getCmp("period");

        var r_cont = Ext.getCmp("r_cont");
        var con_fail = Ext.getCmp("con_fail");
        var r_non = Ext.getCmp("r_non");
        var non_pool = Ext.getCmp("non_pool");
        var non_fail = Ext.getCmp("non_fail");

        var action = Ext.getCmp("action");
        var mac = Ext.getCmp("mac");

        var checker_info = {};
        var type = "";

        if(name.isValid()===false){ name.focus(); return false; }
        checker_info.name = name.getValue();
        if(ip.isValid()===false){ ip.focus(); return false; }
        checker_info.ip = ip.getValue();
        checker_info['interface'] = inter.getValue();
        checker_info.period = period.getValue();

        if(r_cont.getValue()){
            if(con_fail.isValid()===false){ con_fail.focus(); return false; }
            type = "cont";
            checker_info.fail = con_fail.getValue();
        }
        if(r_non.getValue()){
            if(non_pool.isValid()===false){ non_pool.focus(); return false; }
            if(non_fail.isValid()===false){ non_fail.focus(); return false; }
            type = "non";
            checker_info.pool = non_pool.getValue();
            checker_info.fail = non_fail.getValue();
        }

        if(action.getValue()==="Proxy" || action.getValue()==="Proxy2"){
            if(mac.isValid()===false){return false;}
            checker_info.mac = mac.getValue();
        }

        prt_errMsg(null,null);

        if(me.edit === "edit"){
            checker_info.cid = me.record.data.cid;
        }

        checker_info.setting = {
            type : type,
            action : action.getValue()
        };

        var update = (me.edit==="edit")?true:false;

        var _params = {
            checker_info : Ext.encode(checker_info),
            update_flag : Ext.encode(update)
        };

        if(update){
            Ext.getStore('store_network_router_checker_list').each(function(data, idx){

                if(data.data.id === Ext.getCmp('tbl_checker').getSelectionModel().getSelection()[0].data.id){

                        data.data.fail = checker_info.fail;
                        data.data.interface = checker_info.interface;
                        data.data.ip = checker_info.ip;
                        data.data.name = checker_info.name;
                        data.data.period = checker_info.period;
                        data.data.setting = checker_info.setting;
                        data.commit();
                        return false;
                }
            });
        }
        else{
            Ext.getStore('store_network_router_checker_list').add(checker_info);
        }

        this.close();
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    chg_type: function(value) {
        var con_fail = Ext.getCmp("con_fail");
        var non_pool = Ext.getCmp("non_pool");
        var non_fail = Ext.getCmp("non_fail");

        if(value==="cont"){
            con_fail.setDisabled(false);
            non_pool.setDisabled(true);
            non_fail.setDisabled(true);
            con_fail.setValue("3");
            non_pool.setValue("");
            non_fail.setValue("");
        }else if(value === "reset"){
            con_fail.setDisabled(true);
            non_pool.setDisabled(true);
            non_fail.setDisabled(true);
            con_fail.setValue("");
            non_pool.setValue("");
            non_fail.setValue("");
        }else{
            con_fail.setDisabled(true);
            non_pool.setDisabled(false);
            non_fail.setDisabled(false);
            con_fail.setValue("");
            non_pool.setValue("5");
            non_fail.setValue("3");
        }
    }

});
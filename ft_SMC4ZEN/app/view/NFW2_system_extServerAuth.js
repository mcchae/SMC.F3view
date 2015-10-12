
Ext.define('SMC4ZEN.view.NFW2_system_extServerAuth', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_extserverauth',

    requires: [
        'SMC4ZEN.view.NFW2_system_extServerAuthViewModel',
        'Ext.form.field.ComboBox',
        'Ext.form.Panel',
        'Ext.panel.Tool',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_extserverauth'
    },
    //cls: 'zen_body',
    id: 'NFW2_auth',
    overflowY : 'auto',
    title : '외부서버인증',
    bodyPadding : 5,
    defaultListenerScope: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            //cls: 'fld_info_box',
            items: [
                {
                    xtype: 'combobox',
                    id: 'access',
                    labelSeparator: ' ',
                    editable: false,
                    emptyText: 'Select',
                    displayField: 'name',
                    store: 'store_serverauth',
                    valueField: 'val',
                    margin : '5 0 5 0',
                    bind: {
                        fieldLabel: '{auth_method}',
                        value : '{system_external_access.nac.access}'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    flex : 1,
                    id: 'form_sys_radius',
                    bodyPadding: 5,
                    title: 'RADIUS',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_radius',
                            listeners: {
                                change: 'onToolChange'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'r_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}',
                                                        value : '{system_external_access.nac.radius.ip}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_ipErrorChange',
                                                        focus: 'onR_ipFocus',
                                                        blur: 'onR_ipBlur'
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
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'r_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{shared_pwd}',
                                                        value : '{system_external_access.nac.radius.password}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_pwErrorChange',
                                                        keydown: 'onR_pwKeydown',
                                                        blur: 'onR_pwBlur'
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
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1025, 65536)){ return ValidLimit(1025, 65536); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    cls: 'lb_req',
                                                    id: 'r_auth',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1812',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{auth_port}',
                                                        value : '{system_external_access.nac.radius.auth_port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_authErrorChange',
                                                        keydown: 'onR_authKeydown',
                                                        focus: 'onR_authFocus',
                                                        blur: 'onR_authBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!LengthCheck(value, 1025, 65536)){ return ValidLimit(1025, 65536); }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    cls: 'lb_req',
                                                    id: 'r_account',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    value: '1813',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9.]/,
                                                    maxLength: 5,
                                                    bind: {
                                                        fieldLabel: '{account_port}',
                                                        value : '{system_external_access.nac.radius.account_port}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onR_accountErrorChange',
                                                        keydown: 'onR_accountKeydown',
                                                        focus: 'onR_accountFocus',
                                                        blur: 'onR_accountBlur'
                                                    }
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
                    xtype: 'form',
                    flex : 1,
                    id: 'form_sys_tacacs',
                    bodyPadding: 10,
                    title: 'TACACS+',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_tacacs',
                            listeners: {
                                change: 'onToolChange1'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
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
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 't_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}',
                                                        value : '{system_external_access.nac.tacacs.ip}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onT_ipErrorChange',
                                                        focus: 'onT_ipFocus',
                                                        blur: 'onT_ipBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 't_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{shared_pwd}',
                                                        value : '{system_external_access.nac.tacacs.password}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onT_pwErrorChange',
                                                        keydown: 'onT_pwKeydown',
                                                        blur: 'onT_pwBlur'
                                                    }
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
                    xtype: 'form',
                    flex : 1,
                    id: 'form_sys_ldap',
                    bodyPadding: 10,
                    title: 'LDAP',
                    tools: [
                        {
                            xtype: 'toggleslide',
                            onText: {
                                txt: __zen('toggle_on')
                            },
                            offText: {
                                txt: __zen('toggle_off')
                            },
                            resizeHandle: false,
                            state: false,
                            id: 'chk_ldap',
                            listeners: {
                                change: 'onToolChange2'
                            }
                        }
                    ],
                    items: [
                        {
                            xtype: 'container',
                            disabled: true,
                            items: [
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
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'l_ip',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    bind: {
                                                        fieldLabel: '{server_address}',
                                                        value : '{system_external_access.nac.ldap.ip}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onL_ipErrorChange',
                                                        focus: 'onL_ipFocus',
                                                        blur: 'onL_ipBlur'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === true){ return true; }
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                        return true;
                                                    },
                                                    cls: 'lb_req',
                                                    id: 'l_base_dn',
                                                    labelSeparator: ' ',
                                                    labelWidth: 120,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    bind: {
                                                        fieldLabel: '{base_dn}',
                                                        value : '{system_external_access.nac.ldap.base}'
                                                    },
                                                    listeners: {
                                                        errorchange: 'onL_basic_dnErrorChange',
                                                        keydown: 'onL_basic_dnKeydown',
                                                        blur: 'onL_base_dnBlur'
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
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'l_bind_dn',
                                                    labelSeparator: ' ',
                                                    labelWidth: 130,
                                                    msgTarget: 'none',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 63,
                                                    bind: {
                                                        fieldLabel: '{bind_dn}',
                                                        value : '{system_external_access.nac.ldap.binddn}'
                                                    },
                                                    listeners: {
                                                        keydown: 'onL_bind_dnKeydown'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'l_pw',
                                                    labelSeparator: ' ',
                                                    labelWidth: 130,
                                                    msgTarget: 'none',
                                                    inputType: 'password',
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 31,
                                                    bind: {
                                                        fieldLabel: '{bind_pwd}',
                                                        value : '{system_external_access.nac.ldap.bindpw}'
                                                    },
                                                    listeners: {
                                                        keydown: 'onL_pwKeydown'
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
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    onToolChange: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ 

            c.setDisabled(_state);

        });

    },

    onR_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onR_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_pwKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onR_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onR_authErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_authKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onR_authFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1025 ~ 65536';
        setTipFocus(this,component);
    },

    onR_authBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onR_accountErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onR_accountKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onR_accountFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1025 ~ 65536';
        setTipFocus(this,component);
    },

    onR_accountBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onToolChange1: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
    },

    onT_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onT_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onT_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onT_pwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onT_pwKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onT_pwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onToolChange2: function(tool, state) {
        var _panel = tool.up('panel');
        var _state = (state===true)?false:true;

        _panel.query('container:not(header)').forEach(function(c){ c.setDisabled(_state);});
    },

    onL_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onL_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onL_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onL_basic_dnErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onL_basic_dnKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onL_base_dnBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onL_bind_dnKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(code === 32){
            e.stopEvent();
        }
    },

    onL_pwKeydown: function(textfield, e, eOpts) {
        
        var code = e.getCharCode();

        if(code === 32){

            e.stopEvent();

        }

    },

    onPanelAfterRender: function(component, eOpts) {

        var me = this;

        me.fieldInfo = makeZenTip();

        me.init_extserverauth();

    },

    init_extserverauth: function() {

        var me = this;
        var vm = me.getViewModel();
        var extServer = vm.getData().system_external_access;

        if(extServer){

            var nac = extServer.nac;
            
            var radius = nac.radius;
            var tacacs = nac.tacacs;
            var ldap = nac.ldap;

            if(nac.access){

                Ext.getCmp("access").setValue(nac.access);

            }

            // Radius 설정

            if(radius["@chk_use"] === "on"){
                Ext.getCmp("chk_radius").state = true;
                Ext.getCmp("chk_radius").moveHandle(true);
                Ext.getCmp("chk_radius").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                Ext.getCmp("r_ip").setValue(radius.ip);
                Ext.getCmp("r_pw").setValue(radius.password);
                Ext.getCmp("r_auth").setValue(radius.auth_port);
                Ext.getCmp("r_account").setValue(radius.account_port);
            }
            else{
                Ext.getCmp("chk_radius").state = false;
                Ext.getCmp("chk_radius").moveHandle(false);
                Ext.getCmp("chk_radius").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                Ext.getCmp("r_ip").reset();
                Ext.getCmp("r_pw").reset();
                Ext.getCmp("r_auth").reset();
                Ext.getCmp("r_account").reset();
            }

            // TACACS 설정

            if(tacacs["@chk_use"] === "on"){
                Ext.getCmp("chk_tacacs").state = true;
                Ext.getCmp("chk_tacacs").moveHandle(true);
                Ext.getCmp("chk_tacacs").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                Ext.getCmp("t_ip").setValue(tacacs.ip);
                Ext.getCmp("t_pw").setValue(tacacs.password);
            }
            else{
                Ext.getCmp("chk_tacacs").state = false;
                Ext.getCmp("chk_tacacs").moveHandle(false);
                Ext.getCmp("chk_tacacs").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                Ext.getCmp("t_ip").reset();
                Ext.getCmp("t_pw").reset();
            }

            // LDAP 설정

            if(ldap["@chk_use"] === "on"){ 
                Ext.getCmp("chk_ldap").state = true;
                Ext.getCmp("chk_ldap").moveHandle(true);
                Ext.getCmp("chk_ldap").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(false);});
                Ext.getCmp("l_ip").setValue(ldap.ip);
                Ext.getCmp("l_base_dn").setValue(ldap.base);
                Ext.getCmp("l_bind_dn").setValue(ldap.binddn);
                Ext.getCmp("l_pw").setValue(ldap.bindpw);
            }
            else{
                Ext.getCmp("chk_ldap").state = false;
                Ext.getCmp("chk_ldap").moveHandle(false);
                Ext.getCmp("chk_ldap").up('panel').query('container:not(header)').forEach(function(c){ c.setDisabled(true);});
                Ext.getCmp("l_ip").reset();
                Ext.getCmp("l_base_dn").reset();
                Ext.getCmp("l_bind_dn").reset();
                Ext.getCmp("l_pw").reset();
            }
        }
        else{
            Ext.getCmp("fm").getForm().reset();
        }
    },

    getExternal: function(type) {
        // var _params = {
        //     type: Ext.encode(type)
        // };

        // showLoadMask();

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getExternalServerStatus',
        //     _params,
        //     function(response){

        //         hideLoadMask();

        //         if(response){
        //             Ext.Msg.alert(__weguardia,__zen('extauth_msg2'));
        //         }else{
        //             Ext.Msg.alert(__weguardia,__zen('extauth_msg3'));
        //         }
        //     }
        // );
    },
    saveData : function(component, eOpts){

        // 토글 슬라이드 상태저장

        var me = this;
        var vm = me.getViewModel();

        if(!Ext.getCmp('form_sys_radius').isValid()){

            me.parentObj.viewState = false;

            return false;

        }

        if(!Ext.getCmp('form_sys_tacacs').isValid()){
            
            me.parentObj.viewState = false;

            return false;

        }

        if(!Ext.getCmp('form_sys_ldap').isValid()){
            
            me.parentObj.viewState = false;

            return false;

        }

        vm.set('use_radius', (Ext.getCmp("chk_radius").state === true) ? 'on' : 'off');
        vm.set('use_tacacs', (Ext.getCmp("chk_tacacs").state === true) ? 'on' : 'off');
        vm.set('use_ldap', (Ext.getCmp("chk_ldap").state === true) ? 'on' : 'off');

        me.parentObj.viewState = true;

        return true;

    }

});
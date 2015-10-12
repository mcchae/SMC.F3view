
Ext.define('SMC4ZEN.view.win_admin_config', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_admin_config',

    requires: [
        'SMC4ZEN.view.win_admin_configViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.XTemplate',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    config: {
        obj_d: {
            data: '',
            root_count: 0,
            sub_count: 0
        },
        limitCount: 5
    },

    viewModel: {
        type: 'win_admin_config'
    },
    cls: 'zen_win',
    height: 400,
    id: 'win_admin_config',
    width: 850,
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'form_admin',
            bodyPadding: 20,
            items: [
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!idCheck(value)){ return get_msg('err_id');}

                                return true;
                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'ft_id',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 31,
                            bind: {
                                fieldLabel: '{id}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange11',
                                blur: 'onFt_idBlur',
                                keyup: 'onFt_idKeyup',
                                focus: 'onFt_idFocus'
                            }
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
                                        if(value === true){ return true; }

                                        var me = Ext.getCmp('win_admin_config');
                                        if(me.obj_d.data.md_passwd === value){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!admin_passwordCheck(value)){ return get_msg('err_ad_pw');}
                                        if(admin_passwordCheck2(value) === 1){ return get_msg('err_pw_lang1'); }
                                        if(admin_passwordCheck2(value) === 2){ return get_msg('err_pw_lang2'); }

                                        if(!admin_passwordCheck3(Ext.getCmp("ft_id").getValue(),value)){ return get_msg('err_pw_id'); }
                                        if(!admin_passwordCheck3(Ext.getCmp("ft_email").getValue(),value)){ return get_msg('err_pw_email'); }
                                        if(!admin_passwordCheck3(Ext.getCmp("ft_phone").getValue(),value)){ return get_msg('err_pw_tel'); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 'ft_pw1',
                                    labelSeparator: ' ',
                                    labelWidth: 160,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 128,
                                    bind: {
                                        fieldLabel: '{pwd}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1',
                                        blur: 'onFt_pw1Blur',
                                        focus: 'onFt_pw1Focus'
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

                                        var me = Ext.getCmp('win_admin_config');
                                        if(me.obj_d.data.md_passwd === value){ return true; }
                                        if(Ext.getCmp("ft_pw1").getValue() !== value){ return get_msg('err_pwCompare'); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 'ft_pw2',
                                    labelSeparator: ' ',
                                    labelWidth: 140,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maxLength: 128,
                                    bind: {
                                        fieldLabel: '{pwd_confirm}'
                                    },
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange2',
                                        blur: 'onFt_pw2Blur',
                                        focus: 'onFt_pw2Focus'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                //if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(parseInt(value) === 0){ return true; }
                                if(!LengthCheck(value, 7, 90)){ return ValidLimit(7, 90); }

                                return true;


                            },
                            fieldInfo: '',
                            cls: 'inp_unit',
                            id: 'ft_pass_days',
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'day\')]}</div>'
                            ],
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            maskRe: /[0-9.]/,
                            bind: {
                                fieldLabel: '{pwd_period}'
                            },
                            listeners: {
                                keydown: 'onTextfieldKeydown3',
                                errorchange: 'onTextfieldErrorChange3',
                                focus: 'onFt_pass_daysFocus',
                                blur: 'onFt_pass_daysBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            cls: 'lb_req',
                            width: 420,
                            labelSeparator: ' ',
                            labelWidth: 145,
                            bind: {
                                fieldLabel: '{access_authority}'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_config',
                                    listeners: {
                                        change: 'onChk_configChange',
                                        beforerender: 'onChk_configBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_log',
                                    listeners: {
                                        beforerender: 'onChk_logBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_monitor',
                                    listeners: {
                                        beforerender: 'onChk_monitorBeforeRender'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value) || value === true){ Ext.getCmp('chk_email_check').disable(); return true; }
                                if(!CheckNotNull(value)){
                                    if(!Ext.getCmp('chk_email_check').disabled){ Ext.getCmp('chk_email_check').disable(); }
                                    //return get_msg('err_null');
                                }

                                if(!ValidEmail(value)){
                                    if(!Ext.getCmp('chk_email_check').disabled){ Ext.getCmp('chk_email_check').disable(); }
                                    return get_msg('err_email');
                                }

                                if(Ext.getCmp('chk_email_check').disabled){ Ext.getCmp('chk_email_check').enable(); }

                                return true;
                            },
                            id: 'ft_email',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{re_email}'
                            },
                            listeners: {
                                keydown: 'onTextfieldKeydown4',
                                errorchange: 'onTextfieldErrorChange4',
                                blur: 'onFt_emailBlur'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            disabled: true,
                            id: 'chk_email_check',
                            margin: '0 0 0 5',
                            listeners: {
                                beforerender: 'onChk_email_checkBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_otp',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            bind: {
                                fieldLabel: '{use_otp}'
                            },
                            listeners: {
                                beforerender: 'onChk_otpBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value) || value === true){ return true; }
                                if(!ValidTel(value)){ return get_msg('err_tel');}

                                return true;


                            },
                            id: 'ft_phone',
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{contact_num}'
                            },
                            listeners: {
                                keydown: 'onTextfieldKeydown5',
                                errorchange: 'onTextfieldErrorChange5',
                                blur: 'onFt_phoneBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'cont_trustedHost',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp('win_admin_config');

                                if(value === "" || value === true){ return true; }

                                var _value = value.split(/, | |,/);

                                if(_value.length  > 20) return get_msg('err_ipCount_20');

                                if(!ValidTotalIp(_value)){ return get_msg('err_ip');}

                                return true;
                            },
                            fieldInfo: '',
                            id: 'ft_trusted_hosts',
                            width: 500,
                            labelSeparator: ' ',
                            labelWidth: 160,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{trusted_network}'
                            },
                            listeners: {
                                errorchange: 'onTextfieldErrorChange6',
                                blur: 'onFt_trusted_hostsBlur',
                                focus: 'onFt_trusted_hostsFocus'
                            }
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
            margin : '5, 0, 5, 0',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    //cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    //cls: 'ft_confirm',
                    width : 100,
                    margin : '0, 5, 0, 0',
                    //iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    //cls: 'ft_cancel',
                    width : 100,
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

    onTextfieldErrorChange11: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_idBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onFt_idKeyup: function(textfield, e, eOpts) {
        var me = Ext.getCmp('win_admin_config');

        if(Ext.getCmp('ft_id').isValid()){

            me.check_id = '';

            var txt_id = Ext.getCmp('ft_id').getValue();

            var _params = {
                basename : Ext.encode('mgtable_users')
            };

            me.check_id = '';
            prt_errMsg(null,'fld_msg');

            if(me.edit === "edit" && me.obj_d.data.id === txt_id){
                check_id = txt_id;
                return false;
            }

            // request_helper.xmlrpc_call_JsonP(
            //     'ftuctrl',
            //     'getObjects',
            //     _params,
            //     function(response){

            //         var o = 0;
            //         for(var i in response.list){

            //             if(txt_id === response.list[i].userid){
            //                 prt_errMsg(null,'fld_msg');
            //                 me.check_id = 'error';
            //                 prt_errMsg(get_msg('err_iddob'), "fld_msg");//txt_id + '은(는) ' +
            //                 return;
            //             }else{
            //                 o++;
            //             }
            //         }

            //         if(response.list.length === o){
            //             me.check_id = txt_id;
            //         }
            //     }
            // );
        }

    },

    onFt_idFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_id');
        setTipFocus(this,component);
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_pw1Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onFt_pw1Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_pwd');
        setTipFocus(this,component);
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_pw2Blur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this,component);
    },

    onFt_pw2Focus: function(component, event, eOpts) {
        component.fieldInfo = __zen('character_tip_pwd');
        setTipFocus(this,component);
    },

    onTextfieldKeydown3: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange3: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_pass_daysFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'7 ~ 90'+__zen('input_range_info');
        setTipFocus(this,component);
    },

    onFt_pass_daysBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onChk_configChange: function(field, newValue, oldValue, eOpts) {
        if(newValue)
        {
            Ext.getCmp('chk_monitor').setValue(true);
            Ext.getCmp('chk_monitor').setReadOnly(true);
        }
        else
        {
            Ext.getCmp('chk_monitor').setReadOnly(false);
        }
    },

    onChk_configBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('set');
    },

    onChk_logBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('log');
    },

    onChk_monitorBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('monitor');
    },

    onTextfieldKeydown4: function(textfield, e, eOpts) {

    },

    onTextfieldErrorChange4: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_emailBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onChk_email_checkBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('receiving_log_alarm_mail');
    },

    onChk_otpBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use');
    },

    onTextfieldKeydown5: function(textfield, e, eOpts) {

    },

    onTextfieldErrorChange5: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_phoneBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onTextfieldErrorChange6: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg");
    },

    onFt_trusted_hostsBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onFt_trusted_hostsFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWindowAfterRender: function(component, eOpts) {
        
        var me = this;
        
        me.fieldInfo = makeZenTip();

        // chk_zenauth(null);

        me.limitCount = 20;
        Ext.getCmp('ft_trusted_hosts').fieldInfo = __zen('admin_info1');
        Ext.getCmp('cont_trustedHost').show();
        Ext.getCmp('chk_email_check').show();
        Ext.getCmp('ft_pass_days').setValue(0);
        Ext.getCmp('chk_config').setValue(true);

        if(component.edit === "edit"){

            if(me.obj_d.get('role') === "Admin"){

                var _params = {
                    'userid': Ext.encode(me.obj_d.get('id'))
                };

                // Password 유효기간 일자 계산

                // request_helper.xmlrpc_call_JsonP(
                //     'ftuctrl',
                //     'get_passwd_remain_ts',
                //     _params,
                //     function(response){
                //         var res = response;

                //         var nowdate = null;
                //         var afterdate = null;
                //         var remaindate = null;

                //         if(res > 0){
                //             nowdate = new Date();
                //             afterdate = new Date();
                //             afterdate.setSeconds(res);
                //             deftimestamp = afterdate.getTime() - nowdate.getTime();

                //             remaindate = parseInt(deftimestamp/1000/60/60/24);

                //             if(remaindate <= 14){
                //                 Ext.Msg.show({
                //                     'title' : __weguardia,
                //                     'msg' : msg_admin_pwd(1,me.obj_d.data.id,remaindate),
                //                     'buttons' : Ext.Msg.OK
                //                 });
                //             }
                //         }else if(res < 0){
                //             Ext.Msg.show({
                //                 'title' : __weguardia,
                //                 'msg' : msg_admin_pwd(2,me.obj_d.data.id),
                //                 'buttons' : Ext.Msg.OK
                //             });
                //         }
                //     }
                // );
            }

            component.getObject();

        }
        else{

            me.setTitle(__zen('admin_set_add'));

        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _pw1 = Ext.getCmp('ft_pw1').getValue();
        var _pw2 = Ext.getCmp('ft_pw2').getValue();

        if(me.check_id === 'error'){
            prt_errMsg(get_msg('err_iddob'), "fld_msg");//Ext.getCmp('ft_id').getValue() + '은(는) ' +
            Ext.getCmp('ft_id').focus();
            return false;
        }

        if(!Ext.getCmp("ft_id").isValid()){ Ext.getCmp("ft_id").focus(); return false; }
        if(!Ext.getCmp("ft_pw1").isValid()){ Ext.getCmp("ft_pw1").focus(); return false; }
        if(!Ext.getCmp("ft_pw2").isValid()){ Ext.getCmp("ft_pw2").focus(); return false; }
        if(_pw1 !== _pw2){ prt_errMsg(err_pwCompare, "fld_msg"); return false; }
        if(!Ext.getCmp("ft_pass_days").isValid()){ Ext.getCmp("ft_pass_days").focus(); return false; }
        if(!Ext.getCmp("ft_email").isValid()){ Ext.getCmp("ft_email").focus(); return false; }
        if(!Ext.getCmp("ft_phone").isValid()){ Ext.getCmp("ft_phone").focus(); return false; }
        if(!Ext.getCmp("ft_trusted_hosts").isValid()){ Ext.getCmp("ft_trusted_hosts").focus(); return false; }

        if(Ext.getCmp('form_admin').getForm().isValid()){

            var _userid = Ext.getCmp('ft_id').getValue();
            var _passwd = Ext.getCmp('ft_pw1').getValue();
            var _pass_days = Ext.getCmp('ft_pass_days').getValue();

            if(_pass_days === "") _pass_days = 0;

            var _email = Ext.getCmp('ft_email').getValue();
            var _email_check = false;

            if(Ext.getCmp('chk_email_check').hidden){
                _email_check = true;
            }else if(!Ext.getCmp('chk_email_check').disabled){
                _email_check = Ext.getCmp('chk_email_check').getValue();
            }

            var _phone = Ext.getCmp('ft_phone').getValue();
            var _trusted_hosts = Ext.getCmp('ft_trusted_hosts').getValue().split(/, | |,/);

            if(_trusted_hosts[0] === ""){
                _trusted_hosts = [];
            }

            var _authorization_set = Ext.getCmp('chk_config').getValue();
            var _authorization_log = Ext.getCmp('chk_log').getValue();
            var _authorization_mon = Ext.getCmp('chk_monitor').getValue();
            var _otp_check = Ext.getCmp('chk_otp').getValue();

            var _role = me.obj_d.data.role;
            var _role = (_role === 'Super')?1:20;

            var isEdit = (me.edit === 'edit')?true:false;

            if(!_authorization_set && !_authorization_log && !_authorization_mon){
                Ext.MessageBox.alert(__weguardia, __zen('admin_info2'));
                return false;
            }

            if(isEdit){

                var _params = {
                    orig_userid : Ext.encode(me.obj_d.data.id),
                    userid : Ext.encode(_userid),
                    passwd : Ext.encode(_passwd),
                    pass_days : Ext.encode(parseInt(_pass_days)),
                    authorization_set : Ext.encode(_authorization_set),
                    authorization_log : Ext.encode(_authorization_log),
                    authorization_mon : Ext.encode(_authorization_mon),
                    email : Ext.encode(_email),
                    email_check : Ext.encode(_email_check),
                    phone : Ext.encode(_phone),
                    trusted_hosts : Ext.encode(_trusted_hosts),
                    role : Ext.encode(_role),
                    otp_check : Ext.encode(_otp_check),
                    save_check : Ext.encode(true)
                };

                // 아래 코드는 SMC4ZEN 에서는 더 이상 사용하지 않습니다.

                // request_helper.xmlrpc_call_JsonP(
                //     'ftuctrl',
                //     'modUser',
                //     _params,
                //     function(response){

                //         Ext.getCmp('NFW2_system_admin_adminConfig').getUsersList();
                //         me.close();
                //     }

                // );

            }else{

                /*
                        


                */

                /*

                var _params = {
                    userid : Ext.encode(_userid),
                    passwd : Ext.encode(_passwd),
                    pass_days : Ext.encode(parseInt(_pass_days)),
                    authorization_set : Ext.encode(_authorization_set),
                    authorization_log : Ext.encode(_authorization_log),
                    authorization_mon : Ext.encode(_authorization_mon),
                    email : Ext.encode(_email),
                    email_check : Ext.encode(_email_check),
                    phone : Ext.encode(_phone),
                    trusted_hosts : Ext.encode(_trusted_hosts),
                    otp_check : Ext.encode(_otp_check)
                };

                */

                

                // 아래 코드는 SMC4ZEN 에서는 더 이상 사용하지 않습니다.

                // request_helper.xmlrpc_call_JsonP(
                //     'ftuctrl',
                //     'addUser',
                //     _params,
                //     function(response){

                //         Ext.getCmp('NFW2_system_admin_adminConfig').getUsersList();
                //         me.close();
                //     }

                // );

            }
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        me.close();
    },

    getObject: function() {
        var me = this;

        me.setTitle(__zen('admin_set_edit')+" - "+me.num);

        Ext.getCmp('ft_id').setValue(me.obj_d.get('id'));
        Ext.getCmp('ft_pass_days').setValue(me.obj_d.get('pwExpiryDate'));

        if(me.obj_d.data.config === "on")
            Ext.getCmp('chk_config').setValue(true);
        else
            Ext.getCmp('chk_config').setValue(false);

        if(me.obj_d.data.log === "on")
            Ext.getCmp('chk_log').setValue(true);
        else
            Ext.getCmp('chk_log').setValue(false);

        if(me.obj_d.data.monitor === "on")
            Ext.getCmp('chk_monitor').setValue(true);
        else
            Ext.getCmp('chk_monitor').setValue(false);

        Ext.getCmp('ft_email').setValue(me.obj_d.data.email);

        if(me.obj_d.data.email_check === "on"){
            Ext.getCmp('chk_email_check').enable();
            Ext.getCmp('chk_email_check').setValue(true);
        }else{
            Ext.getCmp('chk_email_check').disable();
            Ext.getCmp('chk_email_check').setValue(false);
        }

        Ext.getCmp('ft_phone').setValue(me.obj_d.data.tel);
        Ext.getCmp('ft_pw1').setValue(me.obj_d.data.md_passwd);
        Ext.getCmp('ft_pw2').setValue(me.obj_d.data.md_passwd);

        if(me.obj_d.data.otp === "true")
            Ext.getCmp('chk_otp').setValue(true);
        else
            Ext.getCmp('chk_otp').setValue(false);

        Ext.getCmp('ft_trusted_hosts').setValue(me.obj_d.data.host);

        if(me.obj_d.data.role === "Super"){
            Ext.getCmp('chk_otp').disable();
            Ext.getCmp('chk_config').disable();
            Ext.getCmp('chk_log').disable();
            Ext.getCmp('chk_monitor').disable();
        }else{
            Ext.getCmp('chk_otp').enable();
            Ext.getCmp('chk_config').enable();
            Ext.getCmp('chk_log').enable();
            Ext.getCmp('chk_monitor').enable();
        }
    }

});
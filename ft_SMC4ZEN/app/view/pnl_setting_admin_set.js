
Ext.define('SMC4ZEN.view.pnl_setting_admin_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_setting_admin_set',

    requires: [
        'SMC4ZEN.view.pnl_setting_admin_setViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
    ],

    config: {
        obj_d: {
            data: '',
            root_count: 0,
            sub_count: 0
        }
    },

    viewModel: {
        type: 'pnl_setting_admin_set'
    },
    height: 350,
    id: 'pnl_setting_admin_set',
    scrollable: true,
    width: 850,
    title: '관리자 설정',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            border: false,
            id: 'form_admin',
            bodyPadding: 10,
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
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        if(!idCheck(value)){ return get_msg('err_id');}

                                        return true;
                                    },
                                    id: 'ft_id',
                                    margin: 10,
                                    fieldLabel: '아이디',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 140,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange11'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: 'ft_duplicateCheck',
                                    margin: 10,
                                    text: '중복확인',
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'errorIdBox',
                                    margin: 10
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    hidden: true,
                                    id: 'okIdBox',
                                    margin: 10
                                }
                            ]
                        }
                    ]
                },
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
                                        var me = Ext.getCmp('pnl_setting_admin_set');

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
                                    id: 'ft_pw1',
                                    margin: 10,
                                    fieldLabel: '비밀번호',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 140,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange1'
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
                                        var me = Ext.getCmp('pnl_setting_admin_set');

                                        if(me.obj_d.data.md_passwd === value){ return true; }

                                        if(me.obj_d.data.md_passwd === value){ return true; }
                                        if(Ext.getCmp("ft_pw1").getValue() !== value){ return get_msg('err_pwCompare'); }

                                        return true;
                                    },
                                    id: 'ft_pw2',
                                    margin: 10,
                                    fieldLabel: '비밀번호 확인',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    inputType: 'password',
                                    enableKeyEvents: true,
                                    listeners: {
                                        errorchange: 'onTextfieldErrorChange2'
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
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        if(!LengthCheck(value, 7, 90)){ return ValidLimit(7, 90); }

                                        return true;


                                    },
                                    id: 'ft_pass_days',
                                    margin: 10,
                                    fieldLabel: '비밀번호 유효기간',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 140,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: 'onTextfieldKeydown3',
                                        errorchange: 'onTextfieldErrorChange3'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '15 -5',
                                    text: '일'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    baseCls: 'lb_sq',
                                    margin: 10,
                                    maxWidth: 120,
                                    width: 120,
                                    text: '접근 권한'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_config',
                                    margin: '0 -5',
                                    boxLabel: '설정',
                                    listeners: {
                                        change: 'onChk_configChange'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    hidden: true,
                                    id: 'chk_log',
                                    margin: '10 50',
                                    boxLabel: '로그'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_monitor',
                                    margin: '0 0 0 20',
                                    boxLabel: '모니터'
                                }
                            ]
                        }
                    ]
                },
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
                                        if(!CheckNotNull(value)){ return true; }

                                        if(!ValidEmail(value)){ return get_msg('err_email');}

                                        return true;
                                    },
                                    id: 'ft_email',
                                    margin: 10,
                                    fieldLabel: '받는 E-Mail',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 140,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: 'onTextfieldKeydown4',
                                        errorchange: 'onTextfieldErrorChange4'
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
                                        if(!CheckNotNull(value)){ return true; }

                                        if(!ValidTel(value)){ return get_msg('err_tel');}

                                        return true;


                                    },
                                    id: 'ft_phone',
                                    margin: 10,
                                    fieldLabel: '연락처',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: 'onTextfieldKeydown5',
                                        errorchange: 'onTextfieldErrorChange5'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    disabled: true,
                    hidden: true,
                    items: [
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_otp',
                            margin: 10,
                            fieldLabel: 'OPT 사용 여부',
                            labelCls: 'lb_sq',
                            labelSeparator: ' ',
                            labelWidth: 140,
                            boxLabel: '사용'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'lb_sq',
                            margin: '10 5 10 10',
                            width: 140,
                            text: 'Trusted Host'
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === ""){

                                    return true;

                                }else{

                                    var _value = value.split(/, | |,/);

                                    if(_value.length  > 5) return get_msg('err_ipCount');

                                    if(!ValidTotalIp(_value)){ return get_msg('err_ip');}

                                }

                                return true;




                            },
                            id: 'ft_trusted_hosts',
                            margin: '10 10 10 0',
                            width: 360,
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            listeners: {
                                errorchange: 'onTextfieldErrorChange6'
                            }
                        },
                        {
                            xtype: 'label',
                            cls: 'mt_info',
                            margin: 15,
                            text: '\',\' 로 구분하여 5개까지 지정할수 있습니다.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'errorBox',
                                    margin: 10
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            margin: 10,
                            maxWidth: 100,
                            text: '확인',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            margin: 10,
                            maxWidth: 100,
                            text: '취소',
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_setting_admin_setAfterRender'
    },

    onTextfieldErrorChange11: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp('pnl_setting_admin_set');

        if(Ext.getCmp('ft_id').validate()){

            me.check_id = '';

            var txt_id = Ext.getCmp('ft_id').getValue();

            var _params = {

            };

            me.setLoading(true);

            request_helper.xmlrpc_call_JsonP(
                'ftSMC',
                'getUsers',
                _params,
                function(response){

                    me.setLoading(false);

                    for(var i in response){

                        if(txt_id === response[i].userid){

                            Ext.getCmp('okIdBox').hide();
                            me.check_id = 'error';
                            prt_errMsg(txt_id + '은(는) ' + get_msg('err_iddob'), "errorIdBox");
                            return;
                        }
                    }

                    if(me.check_id === ''){
                        Ext.getCmp('errorIdBox').hide();
                        me.check_id = txt_id;
                        prt_errMsg(txt_id + '은(는) ' + get_msg('msg_ok_iddob'), "okIdBox");
                    }
                }


            );
        }




    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onTextfieldErrorChange2: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onTextfieldKeydown3: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTextfieldErrorChange3: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
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

    onTextfieldKeydown4: function(textfield, e, eOpts) {

    },

    onTextfieldErrorChange4: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onTextfieldKeydown5: function(textfield, e, eOpts) {

    },

    onTextfieldErrorChange5: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onTextfieldErrorChange6: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _pw1 = Ext.getCmp('ft_pw1').getValue();

        var _pw2 = Ext.getCmp('ft_pw2').getValue();

        if(me.check_id === '' || me.check_id === 'error')
        {
            return false;
        }

        if(_pw1 !== _pw2){

            prt_errMsg(err_pwCompare, "errorBox");
            return false;

        }
        if(Ext.getCmp('form_admin').getForm().isValid()){

            var _userid = Ext.getCmp('ft_id').getValue();

            var _passwd = Ext.getCmp('ft_pw1').getValue();

            var _pass_days = Ext.getCmp('ft_pass_days').getValue();

            var _email = Ext.getCmp('ft_email').getValue();

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

            if(_role === 'Super'){

                _role = 1;

            }else{

                _role = 5;
            }

            var isEdit = me.edit === 'edit'? true:false;

            if(!_authorization_set && !_authorization_log && !_authorization_mon){

                alertMessage('접근권한 설정을 해주세요.');
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
                    phone : Ext.encode(_phone),
                    trusted_hosts : Ext.encode(_trusted_hosts),
                    role : Ext.encode(_role),
                    otp_check : Ext.encode(_otp_check)

                };

                Ext.getCmp('form_admin').setLoading(true);

                request_helper.xmlrpc_call_JsonP(
                    'ftSMC',
                    'modUser',
                    _params,
                    function(response){

                        Ext.getCmp('form_admin').setLoading(false);

                        if(response)
                        {
                            Ext.getCmp('pnl_setting_admin').getUsersList();

                            me.close();
                        }
                    }

                );

            }else{

                if((me.check_id === null || typeof me.check_id === 'undefined' || me.check_id !== Ext.getCmp('ft_id').getValue())){

                    alertMessage('아이디 중복확인을 해주세요.', Ext.getCmp('ft_id'));
                    return false;
                }

                var _params = {

                    userid : Ext.encode(_userid),
                    passwd : Ext.encode(_passwd),
                    pass_days : Ext.encode(parseInt(_pass_days)),
                    authorization_set : Ext.encode(_authorization_set),
                    authorization_log : Ext.encode(_authorization_log),
                    authorization_mon : Ext.encode(_authorization_mon),
                    email : Ext.encode(_email),
                    phone : Ext.encode(_phone),
                    trusted_hosts : Ext.encode(_trusted_hosts),
                    otp_check : Ext.encode(_otp_check)

                };

                Ext.getCmp('form_admin').setLoading(true);

                request_helper.xmlrpc_call_JsonP(
                    'ftSMC',
                    'addUser',
                    _params,
                    function(response){

                        Ext.getCmp('form_admin').setLoading(false);

                        if(response)
                        {
                            Ext.getCmp('pnl_setting_admin').getUsersList();

                            me.close();
                        }
                    }

                );

            }
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        me.close();
    },

    onPnl_setting_admin_setAfterRender: function(component, eOpts) {
        Ext.getCmp('ft_pass_days').setValue(90);
        Ext.getCmp('chk_config').setValue(true);
        Ext.getCmp('chk_log').setValue(true);
        Ext.getCmp('chk_monitor').setValue(true);

        if(component.edit === "edit")
        {
            component.getObject();
        }
    },

    getObject: function() {
        var me = this;

        me.setTitle("관리자 설정 수정");

        Ext.getCmp('ft_duplicateCheck').hide();
        Ext.getCmp('ft_id').setValue(me.obj_d.data.id);

        Ext.getCmp('ft_pass_days').setValue(me.obj_d.data.pwExpiryDate);

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
        Ext.getCmp('ft_phone').setValue(me.obj_d.data.tel);

        Ext.getCmp('ft_pw1').setValue(me.obj_d.data.md_passwd);

        Ext.getCmp('ft_pw2').setValue(me.obj_d.data.md_passwd);

        Ext.getCmp('ft_trusted_hosts').setValue(me.obj_d.data.host);

        if(me.obj_d.data.role === "Super"){

            Ext.getCmp('chk_otp').enable();

            Ext.getCmp('chk_config').disable();

            Ext.getCmp('chk_log').disable();

            Ext.getCmp('chk_monitor').disable();

        }else{

            Ext.getCmp('chk_otp').disable();

            Ext.getCmp('chk_config').enable();

            Ext.getCmp('chk_log').enable();

            Ext.getCmp('chk_monitor').enable();
        }
    }

});
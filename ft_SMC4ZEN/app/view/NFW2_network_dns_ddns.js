
Ext.define('SMC4ZEN.view.NFW2_network_dns_ddns', {
    extend: 'Ext.form.Panel',
    alias: 'widget.nfw2_network_dns_ddns',

    requires: [
        'SMC4ZEN.view.NFW2_network_dns_ddnsViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    config: {
        accessUserInfo: {
            //선택된 메뉴의 정보를 담는 객체
            init: function(){
            	var me = this;
                me.sessionInfo = '';
               
        	}
        }
    },

    viewModel: {
        type: 'nfw2_network_dns_ddns'
    },
    // cls: 'zen_body',
    id: 'pnl_mainView',
    width: 900,
    defaultListenerScope: true,
    overflowY: 'auto',
    title : 'DDNS',
    bodyPadding: 5,
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
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
                                    margin: '0 0 0 10',
                                    width: 190,
                                    bind: {
                                        text: '{dynamic_dns}'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    html: '<div id="chk_ddsn"/>'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            hidden: true,
                            id: 'chk_ddsnEnable1',
                            margin: 10,
                            fieldLabel: 'Dynamic DNS 서비스 사용',
                            labelSeparator: ' ',
                            labelWidth: 200,
                            boxLabel: '사용',
                            listeners: {
                                change: 'onCheckboxfieldChange'
                            }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            disabled: true,
                            id: 'cb_svcServer',
                            margin: '8 0 0 0',
                            maxWidth: 340,
                            labelSeparator: ' ',
                            labelWidth: 155,
                            editable: false,
                            displayField: 'name',
                            store: 'store_serviceServer',
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{service_provide}'
                            },
                            listeners: {
                                change: 'onCb_svcServerChange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }
                                return true;

                            },
                            anchor: '100%',
                            disabled: true,
                            id: 'txt_hostName',
                            margin: '8 0 0 0',
                            maxWidth: 350,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{host_name}'
                            },
                            listeners: {
                                errorchange: 'onTxt_hostNameErrorChange',
                                blur: 'onTxt_hostNameBlur',
                                keydown: 'onTxt_hostNameKeydown'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }
                                return true;

                            },
                            anchor: '100%',
                            disabled: true,
                            id: 'txt_userName',
                            margin: '8 0 0 0',
                            maxWidth: 350,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            bind: {
                                fieldLabel: '{user_name}'
                            },
                            listeners: {
                                errorchange: 'onTxt_userNameErrorChange',
                                blur: 'onTxt_userNameBlur',
                                keydown: 'onTxt_userNameKeydown'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }
                                return true;

                            },
                            anchor: '100%',
                            disabled: true,
                            id: 'txt_password',
                            margin: '8 0 0 0',
                            maxWidth: 350,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            inputType: 'password',
                            bind: {
                                fieldLabel: '{pwd}'
                            },
                            listeners: {
                                errorchange: 'onTxt_passwordErrorChange',
                                blur: 'onTxt_passwordBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }
                                return true;

                            },
                            anchor: '100%',
                            disabled: true,
                            id: 'txt_userHash',
                            margin: '8 0 0 0',
                            maxWidth: 350,
                            labelCls: 'lb_req',
                            labelSeparator: ' ',
                            labelWidth: 150,
                            msgTarget: 'none',
                            bind: {
                                fieldLabel: '{user_hash}'
                            },
                            listeners: {
                                errorchange: 'onTxt_userHashErrorChange',
                                keydown: 'onTxt_userHashKeydown',
                                blur: 'onTxt_userHashBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            id: 'txt_updatePeriod_con',
                            margin: '8 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 160,
                                    bind: {
                                        text: '{renewal_period}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var _value = removeComma(value);

                                            if(!CheckNotNull(_value)){ return get_msg('err_null'); }

                                            var retValue1 = LengthCheck(_value,60,7200);

                                            if(!retValue1){ return ValidLimit('60','7200'); }
                                        }
                                        return true;


                                    },
                                    fieldInfo: '입력범위 : 60 ~ 7,200',
                                    flex: 1,
                                    cls: 'inp_unit',
                                    id: 'txt_updatePeriod',
                                    maxWidth: 150,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 150,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    maxLengthText: ' ',
                                    listeners: {
                                        errorchange: 'onTxt_updatePeriodErrorChange',
                                        keydown: 'onTxt_updatePeriodKeydown',
                                        blur: 'onTxt_updatePeriodBlur',
                                        focus: 'onTxt_updatePeriodFocus',
                                        change: 'onTxt_updatePeriodChange'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onPanelAfterRender1',
                render: 'onPanelRender'
            }
        }
    ],
    listeners: {
        beforeclose: 'saveData'
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
                }//,
                // {
                //     xtype: 'button',
                //     cls: 'ft_confirm',
                //     iconCls: 'ft_confirm_icl',
                //     bind: {
                //         text: '{confirm}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick2'
                //     }
                // },
                // {
                //     xtype: 'button',
                //     cls: 'ft_cancel',
                //     bind: {
                //         text: '{cancel}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick3'
                //     }
                // }
            ]
        }
    ],

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {

        if(newValue === true){

            Ext.getCmp('cb_svcServer').enable();

            Ext.getCmp('txt_hostName').enable();

            Ext.getCmp('txt_userName').enable();

            Ext.getCmp('txt_password').enable();

            Ext.getCmp('txt_userHash').enable();

            Ext.getCmp('txt_updatePeriod').enable();

            Ext.getCmp('txt_updatePeriod').setValue("600");

        }else{

            Ext.getCmp('cb_svcServer').disable();

            Ext.getCmp('txt_hostName').disable();

            Ext.getCmp('txt_userName').disable();

            Ext.getCmp('txt_password').disable();

            Ext.getCmp('txt_userHash').disable();

            Ext.getCmp('txt_updatePeriod').disable();

            Ext.getCmp('txt_updatePeriod').setValue("");

        }
    },

    onCb_svcServerChange: function(field, newValue, oldValue, eOpts) {
        this.fn_ddns_init();

        if(newValue === 'dyndns.org'){

            Ext.getCmp('txt_hostName').show();

            Ext.getCmp('txt_userName').show();

            Ext.getCmp('txt_password').show();

            Ext.getCmp('txt_updatePeriod').show();
            Ext.getCmp('txt_updatePeriod').setValue("600");


        }else if(newValue === 'no-ip.com'){

            Ext.getCmp('txt_hostName').show();

            Ext.getCmp('txt_userName').show();

            Ext.getCmp('txt_password').show();

            Ext.getCmp('txt_updatePeriod').show();
            Ext.getCmp('txt_updatePeriod').setValue("600");


        }else if(newValue === 'freedns.afraid.org'){

            Ext.getCmp('txt_hostName').show();

            Ext.getCmp('txt_userHash').show();

            Ext.getCmp('txt_updatePeriod').show();
            Ext.getCmp('txt_updatePeriod').setValue("600");

        }

    },

    onTxt_hostNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTxt_hostNameBlur: function(component, event, eOpts) {
        Ext.getCmp('txt_hostName').validateValue(true);
    },

    onTxt_hostNameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTxt_userNameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTxt_userNameBlur: function(component, event, eOpts) {
        Ext.getCmp('txt_userName').validateValue(true);
    },

    onTxt_userNameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTxt_passwordErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTxt_passwordBlur: function(component, event, eOpts) {
        Ext.getCmp('txt_password').validateValue(true);
    },

    onTxt_userHashErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTxt_userHashKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8){
            e.stopEvent();
        }
    },

    onTxt_userHashBlur: function(component, event, eOpts) {
        Ext.getCmp('txt_userHash').validateValue(true);
    },

    onTxt_updatePeriodErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTxt_updatePeriodKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8){
            e.stopEvent();
        }
    },

    onTxt_updatePeriodBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('txt_updatePeriod').validateValue(true);
    },

    onTxt_updatePeriodFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onTxt_updatePeriodChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onPanelAfterRender1: function(component, eOpts) {

        this.fieldInfo = makeZenTip();

        console.log('getViewModel - ', this.getViewModel());
        this.init_ddns();
    },

    onPanelRender: function(component, eOpts) {

        var tbutton_checked = false;

        if(this.getViewModel().data.network_ddns.network.ddns.setting['@check_use'] === 'on'){
            tbutton_checked = true;

            Ext.getCmp('cb_svcServer').enable();

            Ext.getCmp('txt_hostName').enable();

            Ext.getCmp('txt_userName').enable();

            Ext.getCmp('txt_password').enable();

            Ext.getCmp('txt_userHash').enable();

            Ext.getCmp('txt_updatePeriod_con').enable();
        }

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_ddsnEnable',
            renderTo:'chk_ddsn',
            style:'margin-left:70px',
            resizeHandle: false,
            state: tbutton_checked,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){

                    if(newValue === true){

                        Ext.getCmp('cb_svcServer').enable();

                        Ext.getCmp('txt_hostName').enable();

                        Ext.getCmp('txt_userName').enable();

                        Ext.getCmp('txt_password').enable();

                        Ext.getCmp('txt_userHash').enable();

                        Ext.getCmp('txt_updatePeriod_con').enable();

                        Ext.getCmp('txt_updatePeriod').setValue("600");

                    }else{

                        Ext.getCmp('cb_svcServer').disable();

                        Ext.getCmp('txt_hostName').disable();

                        Ext.getCmp('txt_userName').disable();

                        Ext.getCmp('txt_password').disable();

                        Ext.getCmp('txt_userHash').disable();

                        Ext.getCmp('txt_updatePeriod_con').disable();

                        Ext.getCmp('txt_updatePeriod').setValue("");

                    }
                }
            }
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var ddnsEnable = Ext.getCmp('chk_ddsnEnable').getValue();
        var server = Ext.getCmp('cb_svcServer').getValue();


        if(Ext.getCmp('chk_ddsnEnable').getValue() === true){
            if(Ext.getCmp('txt_hostName').isValid() === false){ Ext.getCmp('txt_hostName').focus(); return false; }

            if(Ext.getCmp('cb_svcServer').getValue() === 'freedns.afraid.org'){
                if(Ext.getCmp('txt_userHash').isValid() === false){ Ext.getCmp('txt_userHash').focus(); return false; }
            }
            else{
                if(Ext.getCmp('txt_userName').isValid() === false){ Ext.getCmp('txt_userName').focus(); return false; }
                if(Ext.getCmp('txt_password').isValid() === false){ Ext.getCmp('txt_password').focus(); return false; }
            }

            if(Ext.getCmp('txt_updatePeriod').isValid() === false){ Ext.getCmp('txt_updatePeriod').focus(); return false; }
        }

        //"on"
        if(ddnsEnable === true){

            if(server === "dyndns.org"){

                var _params = {
                    ddns_enable : Ext.encode("on"), //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : Ext.encode("dyndns.org"), //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.encode(Ext.getCmp('txt_hostName').getValue()),	//최대 31 글자 이내 입력 할 것
                    update_period : Ext.encode(parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue()))), //60 ~ 7200 (초) 아니면 에러 리턴
                    username : Ext.encode(Ext.getCmp('txt_userName').getValue()),	//최대 31 글자 이내 입력 할 것
                    passwd : Ext.encode(Ext.getCmp('txt_password').getValue())	//최대 15 글자 이내 입력 할 것
                };



            }else if(server === "no-ip.com"){

                var _params = {
                    ddns_enable : Ext.encode("on"), //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : Ext.encode("no-ip.com"), //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.encode(Ext.getCmp('txt_hostName').getValue()),	//최대 31 글자 이내 입력 할 것
                    update_period : Ext.encode(parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue()))), //60 ~ 7200 (초) 아니면 에러 리턴
                    username : Ext.encode(Ext.getCmp('txt_userName').getValue()),	//최대 31 글자 이내 입력 할 것
                    passwd : Ext.encode(Ext.getCmp('txt_password').getValue())	//최대 15 글자 이내 입력 할 것
                };

            }else if(server === "freedns.afraid.org"){

                var _params = {
                    ddns_enable : Ext.encode("on"), //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : Ext.encode("freedns.afraid.org"), //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.encode(Ext.getCmp('txt_hostName').getValue()),	//최대 31 글자 이내 입력 할 것
                    update_period : Ext.encode(parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue()))), //60 ~ 7200 (초) 아니면 에러 리턴
                    userhash : Ext.encode(Ext.getCmp('txt_userHash').getValue())	//최대 31 글자 이내 입력 할 것

                };

            }else{

                console.log("Not svc_server selected");

            }




            //"off
        }else{

            var _params = {
                ddns_enable : Ext.encode("off"), //사용하면 "on", 사용하지 않으면 "off" (공통)
                svc_server : Ext.encode(Ext.getCmp('cb_svcServer').getValue()), //dyndns.org, no-ip.com, freedns.afraid.org
                host : Ext.encode(Ext.getCmp('txt_hostName').getValue()),	//최대 31 글자 이내 입력 할 것
                update_period : Ext.encode(parseInt(Ext.getCmp('txt_updatePeriod').getValue())), //60 ~ 7200 (초) 아니면 에러 리턴
                userhash : Ext.encode(Ext.getCmp('txt_userHash').getValue())	//최대 31 글자 이내 입력 할 것

                //host : Ext.encode(null),	//최대 31 글자 이내 입력 할 것
                //update_period : Ext.encode(null), //60 ~ 7200 (초) 아니면 에러 리턴
                //userhash : Ext.encode(null)	//최대 31 글자 이내 입력 할 것
            };

        }

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'set_network_ddns',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg('msg_ok_add'),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });

            }
        );
    },

    onButtonClick3: function(button, e, eOpts) {
        this.init_ddns();
    },

    fn_ddns_init: function() {
        /*

        @ description : DDNS 입력값 초기화 함수

        @ since : 2014.03.31

        @ author : EMS Team / youngmin shin (ymshin@future.co.kr)

        @ update date :

        @ update content :

        */


        Ext.getCmp('txt_hostName').hide(true);
        Ext.getCmp('txt_userName').hide(true);
        Ext.getCmp('txt_password').hide(true);
        Ext.getCmp('txt_userHash').hide(true);
        Ext.getCmp('txt_updatePeriod').hide(true);

        Ext.getCmp('txt_hostName').reset();
        Ext.getCmp('txt_userName').reset();
        Ext.getCmp('txt_password').reset();
        Ext.getCmp('txt_userHash').reset();
        Ext.getCmp('txt_updatePeriod').reset();
    },

    init_ddns: function() {
        /*

        @ description : DDNS 초기 세팅 함수

        @ since : 2014.03.31

        @ author : EMS Team / youngmin shin (ymshin@future.co.kr)

        @ update date :

        @ update content :

        */
        var me = this;
        var _params = {};
        var response = me.getViewModel().data.network_ddns.network.ddns;

                if(response.setting["@check_use"] === "on"){

                    Ext.getCmp("chk_ddsnEnable").state = true;
                    Ext.getCmp("chk_ddsnEnable").moveHandle(true);

                    Ext.getCmp('cb_svcServer').enable();

                    Ext.getCmp('txt_hostName').enable();

                    Ext.getCmp('txt_userName').enable();

                    Ext.getCmp('txt_password').enable();

                    Ext.getCmp('txt_userHash').enable();

                    Ext.getCmp('txt_updatePeriod_con').enable();

                    Ext.getCmp('txt_updatePeriod').setValue("600");

                    Ext.getCmp('cb_svcServer').setValue(response.server);

                    Ext.getCmp('txt_hostName').setValue(response.host);

                    Ext.getCmp('txt_userName').setValue(response.name);

                    Ext.getCmp('txt_password').setValue(response.password);

                    Ext.getCmp('txt_userHash').setValue(response.freedns_hash);


                    //서버가 'freedns.afraid.org' 일 경우에는 갱신주기가 'freedns_time' 에 저장
                    //다른 서버일 경우에는 'cycle' 에 저장
                    if(response.server === 'freedns.afraid.org'){

                        Ext.getCmp('txt_updatePeriod').setValue(response.freedns_time);

                    }else{

                        Ext.getCmp('txt_updatePeriod').setValue(response.cycle);

                    }

                }else{

                    Ext.getCmp("chk_ddsnEnable").state = false;
                    Ext.getCmp("chk_ddsnEnable").moveHandle(false);

                    Ext.getCmp('cb_svcServer').disable();

                    Ext.getCmp('txt_hostName').disable();

                    Ext.getCmp('txt_userName').disable();

                    Ext.getCmp('txt_password').disable();

                    Ext.getCmp('txt_userHash').disable();

                    Ext.getCmp('txt_updatePeriod_con').disable();

                    Ext.getCmp('txt_updatePeriod').setValue("");

                    Ext.suspendLayouts();

                    Ext.getCmp('cb_svcServer').setValue('dyndns.org');

                    Ext.getCmp('txt_hostName').show();

                    Ext.getCmp('txt_userName').show();

                    Ext.getCmp('txt_password').show();

                    Ext.getCmp('txt_updatePeriod').show();

                    Ext.resumeLayouts(true);

                }
    },

    saveData: function() {

        var ddnsEnable = Ext.getCmp('chk_ddsnEnable').getValue();
        var server = Ext.getCmp('cb_svcServer').getValue();

        if(Ext.getCmp('chk_ddsnEnable').getValue() === true){
            if(Ext.getCmp('txt_hostName').isValid() === false){ Ext.getCmp('txt_hostName').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }

            if(Ext.getCmp('cb_svcServer').getValue() === 'freedns.afraid.org'){
                if(Ext.getCmp('txt_userHash').isValid() === false){ Ext.getCmp('txt_userHash').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
            }
            else{
                if(Ext.getCmp('txt_userName').isValid() === false){ Ext.getCmp('txt_userName').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
                if(Ext.getCmp('txt_password').isValid() === false){ Ext.getCmp('txt_password').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
            }

            if(Ext.getCmp('txt_updatePeriod').isValid() === false){ Ext.getCmp('txt_updatePeriod').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
        }

        //"on"
        if(ddnsEnable === true){

            if(server === "dyndns.org"){

                var _params = {
                    ddns_enable : "on", //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : "dyndns.org", //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.getCmp('txt_hostName').getValue(),   //최대 31 글자 이내 입력 할 것
                    update_period : parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue())), //60 ~ 7200 (초) 아니면 에러 리턴
                    username : Ext.getCmp('txt_userName').getValue(),   //최대 31 글자 이내 입력 할 것
                    passwd : Ext.getCmp('txt_password').getValue()  //최대 15 글자 이내 입력 할 것
                };

                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.setting['@check_use'] = _params.ddns_enable;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.server = _params.svc_server;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.host = _params.host;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.cycle = _params.update_period;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.name = _params.username;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.password = _params.passwd;

            }else if(server === "no-ip.com"){

                var _params = {
                    ddns_enable : "on", //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : "no-ip.com", //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.getCmp('txt_hostName').getValue(),   //최대 31 글자 이내 입력 할 것
                    update_period : parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue())), //60 ~ 7200 (초) 아니면 에러 리턴
                    username : Ext.getCmp('txt_userName').getValue(),   //최대 31 글자 이내 입력 할 것
                    passwd : Ext.getCmp('txt_password').getValue()  //최대 15 글자 이내 입력 할 것
                };

                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.setting['@check_use'] = _params.ddns_enable;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.server = _params.svc_server;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.host = _params.host;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.cycle = _params.update_period;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.name = _params.username;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.password = _params.passwd;

            }else if(server === "freedns.afraid.org"){

                var _params = {
                    ddns_enable : Ext.encode("on"), //사용하면 "on", 사용하지 않으면 "off" (공통)
                    svc_server : Ext.encode("freedns.afraid.org"), //dyndns.org, no-ip.com, freedns.afraid.org
                    host : Ext.encode(Ext.getCmp('txt_hostName').getValue()),   //최대 31 글자 이내 입력 할 것
                    update_period : Ext.encode(parseInt(removeComma(Ext.getCmp('txt_updatePeriod').getValue()))), //60 ~ 7200 (초) 아니면 에러 리턴
                    userhash : Ext.encode(Ext.getCmp('txt_userHash').getValue())    //최대 31 글자 이내 입력 할 것

                };

                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.setting['@check_use'] = _params.ddns_enable;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.server = _params.svc_server;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.host = _params.host;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.cycle = _params.update_period;
                Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.freedns_hash = _params.userhash;

            }else{

                console.log("Not svc_server selected");
            }

            //"off
        }else{

            var _params = {
                ddns_enable : "off", //사용하면 "on", 사용하지 않으면 "off" (공통)
                svc_server : Ext.getCmp('cb_svcServer').getValue(), //dyndns.org, no-ip.com, freedns.afraid.org
                host : Ext.getCmp('txt_hostName').getValue(),   //최대 31 글자 이내 입력 할 것
                update_period : parseInt(Ext.getCmp('txt_updatePeriod').getValue()), //60 ~ 7200 (초) 아니면 에러 리턴
                userhash : Ext.getCmp('txt_userHash').getValue()    //최대 31 글자 이내 입력 할 것

                //host : Ext.encode(null),  //최대 31 글자 이내 입력 할 것
                //update_period : Ext.encode(null), //60 ~ 7200 (초) 아니면 에러 리턴
                //userhash : Ext.encode(null)   //최대 31 글자 이내 입력 할 것
            };

            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.setting['@check_use'] = _params.ddns_enable;
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.server = _params.svc_server;
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.host = _params.host;
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.cycle = _params.update_period;
            Ext.getCmp('win_zen_device_set').getViewModel().data.network_ddns.network.ddns.freedns_hash = _params.userhash;

        }

        console.log(Ext.getCmp('win_zen_device_set').getViewModel().data);

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});
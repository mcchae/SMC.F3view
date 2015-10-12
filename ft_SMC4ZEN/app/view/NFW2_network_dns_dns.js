
Ext.define('SMC4ZEN.view.NFW2_network_dns_dns', {
    extend: 'Ext.form.Panel',
    alias: 'widget.nfw2_network_dns_dns',

    requires: [
        'SMC4ZEN.view.NFW2_network_dns_dnsViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
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
        type: 'nfw2_network_dns_dns'
    },
    // cls: 'zen_body',
    id: 'pnl_mainView',
    width: 500,
    defaultListenerScope: true,
    overflowY: 'auto',
    title : 'DNS',
    items: [
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'form',
                    id: 'form_dns',
                    margin: '5 5 5 5',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(value === ""){return true;}

                                            var retValue = ValidIPAddress(value);

                                            var retValue2 = ValidIPv6(value);


                                            if(retValue || retValue2){

                                                return true;

                                            }else{

                                                return get_error_msg('err_ip');
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'dns1',
                                    margin: '8 0 8 0',
                                    width: 300,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[a-fA-F0-9.:]/,
                                    bind: {
                                        fieldLabel: '{dns_server_fir}',
                                        value: '{network_dns.domain.main}'
                                    },
                                    listeners: {
                                        errorchange: 'onDns1ErrorChange',
                                        focus: 'onDns1Focus',
                                        blur: 'onDns1Blur',
                                        keydown: 'onDns1Keydown'
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
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(value === ""){return true;}

                                            var retValue = ValidIPAddress(value);

                                            var retValue2 = ValidIPv6(value);


                                            if(retValue || retValue2){

                                                return true;

                                            }else{

                                                return get_error_msg('err_ip');
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'dns2',
                                    margin: '8 0 8 0',
                                    width: 300,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[a-fA-F0-9.:]/,
                                    bind: {
                                        fieldLabel: '{dns_server_sec}',
                                        value: '{network_dns.domain.sub}'
                                    },
                                    listeners: {
                                        errorchange: 'onDns2ErrorChange',
                                        focus: 'onDns2Focus',
                                        blur: 'onDns2Blur',
                                        keydown: 'onDns2Keydown'
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
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(value === ""){return true;}

                                            var retValue = ValidIPAddress(value);

                                            var retValue2 = ValidIPv6(value);


                                            if(retValue || retValue2){

                                                return true;

                                            }else{

                                                return get_error_msg('err_ip');
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'dns3',
                                    margin: '8 0 10 0',
                                    width: 300,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[a-fA-F0-9.:]/,
                                    bind: {
                                        fieldLabel: '{dns_server_thi}',
                                        value: '{network_dns.domain.third}'
                                    },
                                    listeners: {
                                        errorchange: 'onDns3ErrorChange',
                                        focus: 'onDns3Focus',
                                        blur: 'onDns3Blur',
                                        keydown: 'onDns3Keydown'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onPanelAfterRender',
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
                //         click: 'onButtonClick1',
                //         blur: 'onButtonBlur'
                //     }
                // },
                // {
                //     xtype: 'button',
                //     cls: 'ft_cancel',
                //     bind: {
                //         text: '{cancel}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick'
                //     }
                // }
            ]
        }
    ],

    onDns1ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDns1Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onDns1Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('dns1').validateValue(true);
    },

    onDns1Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onDns2ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDns2Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onDns2Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('dns2').validateValue(true);
    },

    onDns2Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onDns3ErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDns3Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onDns3Blur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('dns3').validateValue(true);
    },

    onDns3Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;

        console.log('getViewModel - ', me.getViewModel());

        this.fieldInfo = makeZenTip();
        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_network_dns',
        //     {},
        //     function(response){
        //         hideLoadMask();

                // Ext.getCmp('dns1').setValue(response.main);

                // Ext.getCmp('dns2').setValue(response.sub);

                // Ext.getCmp('dns3').setValue(response.third);

        //     }
        // );
    },

    onButtonClick1: function(button, e, eOpts) {
        var form = Ext.getCmp('form_dns');

        if(Ext.getCmp('dns1').isValid()=== false){ Ext.getCmp('dns1').focus(); return false; }
        if(Ext.getCmp('dns2').isValid()=== false){ Ext.getCmp('dns2').focus(); return false; }
        if(Ext.getCmp('dns3').isValid()=== false){ Ext.getCmp('dns3').focus(); return false; }


        var dns1 = Ext.getCmp('dns1').getValue();

        var dns2 = Ext.getCmp('dns2').getValue();

        var dns3 = Ext.getCmp('dns3').getValue();

        var domain_info = {};


        if(dns1 !== ''){

            domain_info.main = dns1;

        }
        else{
            domain_info.main = null;
        }
        if(dns2 !== ''){

            domain_info.sub = dns2;

        }
        else{
            domain_info.sub = null;
        }

        if(dns3 !== ''){

            domain_info.third = dns3;

        }
        else{
            domain_info.third = null;
        }

        var obj = {"domain" : domain_info};
        // if(dns1 === "" && dns2 === "" && dns3 === ""){

        //     var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        //     err_fl.addCls('ic_msg_err');
        //     err_fl.update('하나의 값은 입력되어야 합니다.');
        //     return false;

        // }else{

        var _params = {

            basename : Ext.encode('network_dns'),
            obj : Ext.encode(obj)

        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
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

        // }
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onButtonClick: function(button, e, eOpts) {
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_network_dns',
            {},
            function(response){

                Ext.getCmp('dns1').setValue(response.main);

                Ext.getCmp('dns2').setValue(response.sub);

                Ext.getCmp('dns3').setValue(response.third);

            }
        );
    },

    saveData: function() {

        if(Ext.getCmp('dns1').isValid()=== false){ Ext.getCmp('dns1').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
        if(Ext.getCmp('dns2').isValid()=== false){ Ext.getCmp('dns2').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }
        if(Ext.getCmp('dns3').isValid()=== false){ Ext.getCmp('dns3').focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});
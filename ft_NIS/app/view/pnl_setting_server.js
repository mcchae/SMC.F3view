
Ext.define('SMC.view.pnl_setting_server', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_server',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    id: 'pnl_setting_server',
    autoScroll: true,
    layout: 'vbox',
    bodyPadding: 20,
    title: '환경 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: '제품 정보',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_serialNumber',
                            margin: 6,
                            width: 600,
                            fieldLabel: '일련번호'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_company',
                            margin: 6,
                            width: 600,
                            fieldLabel: '회사'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '주 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_priPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_priPrivateIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Private IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '보조 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_secPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_secPrivateIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Private IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '백업 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_drPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '로그 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_logPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_logPrivateIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Private IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'APT 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_aptPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'datefield',
                            hidden: true,
                            itemId: 'dtf_aptFromDt',
                            margin: 6,
                            width: 600,
                            fieldLabel: '시작일',
                            enableKeyEvents: true,
                            editable: false,
                            format: 'Y-m-d',
                            submitFormat: 'Ymd'
                        },
                        {
                            xtype: 'datefield',
                            hidden: true,
                            itemId: 'dtf_aptToDt',
                            margin: 6,
                            width: 600,
                            fieldLabel: '종료일',
                            editable: false,
                            format: 'Y-m-d',
                            submitFormat: 'Ymd'
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var me = Ext.getCmp('pnl_setting_server');

                                        if(typeof me.down('numberfield[itemId="nfd_timeVal"]').getValue() !== "number")
                                        {
                                            return false;
                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    disabled: true,
                                    itemId: 'nfd_timeVal',
                                    margin: 6,
                                    fieldLabel: '주기(초)',
                                    value: 60,
                                    maxValue: 86400,
                                    minValue: 0
                                },
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    itemId: 'chk_timeVal',
                                    margin: 6,
                                    fieldLabel: '사용',
                                    labelWidth: 40,
                                    listeners: {
                                        change: {
                                            fn: me.onChk_timeValChange,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'WIPS 서버',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){ return true; }

                                if(!validIPForm(value, 'v4')){ return false; }
                                return true;
                            },
                            itemId: 'txf_wipsPublicIP',
                            margin: 6,
                            width: 600,
                            fieldLabel: 'Public IP',
                            value: '0.0.0.0',
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    width: 635,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                Ext.getCmp('pnl_setting_server').saveData();
                            },
                            margin: 1,
                            width: 100,
                            text: '저장'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_setting_serverAfterRender,
                    scope: me
                },
                show: {
                    fn: me.onPnl_setting_serverShow,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onChk_timeValChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('pnl_setting_server');

        if(newValue)
        {
            me.down('numberfield[itemId="nfd_timeVal"]').enable();
        }
        else
        {
            me.down('numberfield[itemId="nfd_timeVal"]').disable();
        }
    },

    onPnl_setting_serverAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });

        component.loadData();
    },

    onPnl_setting_serverShow: function(component, eOpts) {
        component.loadData();
    },

    loadData: function() {
        var me = this;

        var _svc = 'ftSMC',
            _func = 'getSvrSetting',
            _params = {};

        me.down('datefield[itemId="dtf_aptFromDt"]').setValue(new Date());
        me.down('datefield[itemId="dtf_aptToDt"]').setValue(new Date());

        me.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                me.setLoading(false);

                me.svrSetting_object = response;

                console.log('getSvrSetting response - ', response);

                if(response.serialnumber && me.down('textfield[itemId="txf_serialNumber"]'))
                {
                    me.down('textfield[itemId="txf_serialNumber"]').setValue(response.serialnumber);
                    me.down('textfield[itemId="txf_serialNumber"]').readOnly = true;
                }

                if(response.company && me.down('textfield[itemId="txf_company"]'))
                {
                    me.down('textfield[itemId="txf_company"]').setValue(response.company);
                }

                if(response.svr_ip)
                {
                    if(response.svr_ip.primary && me.down('textfield[itemId="txf_priPublicIP"]') &&
                      me.down('textfield[itemId="txf_priPrivateIP"]'))
                    {
                        me.down('textfield[itemId="txf_priPublicIP"]').setValue(response.svr_ip.primary['public']);
                        me.down('textfield[itemId="txf_priPrivateIP"]').setValue(response.svr_ip.primary['private']);
                    }

                    if(response.svr_ip.secondary && me.down('textfield[itemId="txf_secPublicIP"]') &&
                      me.down('textfield[itemId="txf_secPrivateIP"]'))
                    {
                        me.down('textfield[itemId="txf_secPublicIP"]').setValue(response.svr_ip.secondary['public']);
                        me.down('textfield[itemId="txf_secPrivateIP"]').setValue(response.svr_ip.secondary['private']);
                    }

                    if(response.svr_ip.dr && me.down('textfield[itemId="txf_drPublicIP"]'))
                    {
                        me.down('textfield[itemId="txf_drPublicIP"]').setValue(response.svr_ip.dr);
                    }
                }

                if(response.logsvr_ip && me.down('textfield[itemId="txf_logPublicIP"]') &&
                  me.down('textfield[itemId="txf_logPrivateIP"]'))
                {
                    me.down('textfield[itemId="txf_logPublicIP"]').setValue(response.logsvr_ip['public']);
                    me.down('textfield[itemId="txf_logPrivateIP"]').setValue(response.logsvr_ip['private']);
                }

                if(response.apt)
                {
                    if(response.apt.apt_svr_ip && me.down('textfield[itemId="txf_aptPublicIP"]'))
                    {
                        me.down('textfield[itemId="txf_aptPublicIP"]').setValue(response.apt.apt_svr_ip);
                    }

        //             if(response.apt.fromdt && response.apt.todt && me.down('datefield[itemId="dtf_aptFromDt"]') &&
        //               me.down('datefield[itemId="dtf_aptToDt"]'))
        //             {
        //                 me.down('datefield[itemId="dtf_aptFromDt"]').setValue(Ext.Date.parse(response.apt.fromdt, "Ymd"));
        //                 me.down('datefield[itemId="dtf_aptToDt"]').setValue(Ext.Date.parse(response.apt.todt, "Ymd"));
        //             }
                    if(response.apt.timeVal && me.down('numberfield[itemId="nfd_timeVal"]'))
                    {
                        me.down('numberfield[itemId="nfd_timeVal"]').setValue(response.apt.timeVal);
                    }

                    if(response.apt.check === "on" && me.down('checkbox[itemId="chk_timeVal"]'))
                    {
                        me.down('checkbox[itemId="chk_timeVal"]').setValue(true);
                    }
                }

                if(response.wips_svr_ip && me.down('textfield[itemId="txf_wipsPublicIP"]'))
                {
                    me.down('textfield[itemId="txf_wipsPublicIP"]').setValue(response.wips_svr_ip);
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        me.svrSetting_object.company = me.down('textfield[itemId="txf_company"]').getValue();

        if(me.down('textfield[itemId="txf_priPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_priPublicIP"]').validate())
            {
                me.svrSetting_object.svr_ip.primary['public'] = me.down('textfield[itemId="txf_priPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_priPublicIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.svr_ip.primary['public'] = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_priPrivateIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_priPrivateIP"]').validate())
            {
                me.svrSetting_object.svr_ip.primary['private'] = me.down('textfield[itemId="txf_priPrivateIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_priPrivateIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.svr_ip.primary['private'] = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_secPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_secPublicIP"]').validate())
            {
                me.svrSetting_object.svr_ip.secondary['public'] = me.down('textfield[itemId="txf_secPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_secPublicIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.svr_ip.secondary['public'] = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_secPrivateIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_secPrivateIP"]').validate())
            {
                me.svrSetting_object.svr_ip.secondary['private'] = me.down('textfield[itemId="txf_secPrivateIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_secPrivateIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.svr_ip.secondary['private'] = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_drPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_drPublicIP"]').validate())
            {
                me.svrSetting_object.svr_ip.dr = me.down('textfield[itemId="txf_drPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_drPublicIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.svr_ip.dr = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_logPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_logPublicIP"]').validate())
            {
                me.svrSetting_object.logsvr_ip['public'] = me.down('textfield[itemId="txf_logPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_logPublicIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.logsvr_ip['public'] = '0.0.0.0';
        }


        if(me.down('textfield[itemId="txf_logPrivateIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_logPrivateIP"]').validate())
            {
                me.svrSetting_object.logsvr_ip['private'] = me.down('textfield[itemId="txf_logPrivateIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_logPrivateIP"]'));
                return false;
            }
        }
        else
        {
            me.svrSetting_object.logsvr_ip['private'] = '0.0.0.0';
        }

        me.svrSetting_object.apt = {};
        me.svrSetting_object.apt.apt_svr_ip = '';

        if(me.down('textfield[itemId="txf_aptPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_aptPublicIP"]').validate())
            {
                me.svrSetting_object.apt.apt_svr_ip = me.down('textfield[itemId="txf_aptPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_aptPublicIP"]'));
                return false;
            }
        }

        if(me.down('checkbox[itemId="chk_timeVal"]').checked)
        {
            me.svrSetting_object.apt.check = "on";
        }
        else
        {
            me.svrSetting_object.apt.check = "off";
        }

        if(me.down('numberfield[itemId="nfd_timeVal"]').getValue())
        {
            if(me.down('numberfield[itemId="nfd_timeVal"]').validate())
            {
                me.svrSetting_object.apt.timeVal = me.down('numberfield[itemId="nfd_timeVal"]').getValue();
            }
            else
            {
                alertMessage('60 ~ 86400까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dpd_period"]'));
                return false;
            }
        }

        // if(me.down('datefield[itemId="dtf_aptFromDt"]').getSubmitValue())
        // {
        //      me.svrSetting_object.apt.fromdt = me.down('datefield[itemId="dtf_aptFromDt"]').getSubmitValue();
        // }

        // if(me.down('datefield[itemId="dtf_aptToDt"]').getSubmitValue())
        // {
        //      me.svrSetting_object.apt.todt = me.down('datefield[itemId="dtf_aptToDt"]').getSubmitValue();
        // }

        // if(new Date(me.svrSetting_object.apt.fromdt) > new Date(me.svrSetting_object.apt.todt))
        // {
        //     alertMessage('시작 날짜가 종료 날짜보다 늦은 날짜로 설정 될 수 없습니다.');
        //     return false;
        // }

        if(me.down('textfield[itemId="txf_wipsPublicIP"]').getValue())
        {
            if(me.down('textfield[itemId="txf_wipsPublicIP"]').validate())
            {
                me.svrSetting_object.wips_svr_ip = me.down('textfield[itemId="txf_wipsPublicIP"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_wipsPublicIP"]'));
                return false;
            }
        }

        console.log(me.svrSetting_object);

        me.setLoading(true);

        var _svc = 'ftSMC',
            _func = 'setSvrSetting',
            _params = {
                setting: Ext.encode(me.svrSetting_object)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                me.setLoading(false);

                alertMessage('저장되었습니다.');

            }
        );
    }

});
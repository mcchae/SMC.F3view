
Ext.define('SMC4ZEN.view.pnl_setting_server', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_server',

    requires: [
        'SMC4ZEN.view.pnl_setting_serverViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_setting_server'
    },
    id: 'pnl_setting_server',
    scrollable: true,
    layout: 'vbox',
    bodyPadding: 20,
    title: '환경 설정',
    defaultListenerScope: true,

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
            hidden: true,
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
        afterrender: 'onPnl_setting_serverAfterRender',
        show: 'onPnl_setting_serverShow'
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

        //         if(response.apt_svr_ip && me.down('textfield[itemId="txf_aptPublicIP"]'))
        //         {
        //             me.down('textfield[itemId="txf_aptPublicIP"]').setValue(response.apt_svr_ip);
        //         }
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

        // if(me.down('textfield[itemId="txf_aptPublicIP"]').getValue())
        // {
        //     if(me.down('textfield[itemId="txf_aptPublicIP"]').validate())
        //     {
        //         me.svrSetting_object.apt_svr_ip = me.down('textfield[itemId="txf_aptPublicIP"]').getValue();
        //     }
        //     else
        //     {
        //         alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_aptPublicIP"]'));
        //         return false;
        //     }
        // }

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
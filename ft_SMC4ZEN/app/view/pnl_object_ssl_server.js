
Ext.define('SMC4ZEN.view.pnl_object_ssl_server', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_ssl_server',

    requires: [
        'SMC4ZEN.view.pnl_object_ssl_serverViewModel',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_object_ssl_server'
    },
    border: false,
    height: 400,
    itemId: 'pnl_object_ssl_server',
    minHeight: 400,
    minWidth: 700,
    resizable: true,
    width: 700,
    bodyPadding: '0 10 10 10',
    constrainHeader: true,
    title: '접근 서버',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_ssl_server',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '10 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(!CheckNotNull(value)){return false; }
                                return true;
                            },
                            flex: 0.2,
                            itemId: 'txf_objectName',
                            margin: '0 10 0 0 ',
                            fieldLabel: '객체명',
                            labelAlign: 'top',
                            msgTarget: 'none'
                        },
                        {
                            xtype: 'textfield',
                            flex: 0.4,
                            itemId: 'txf_objectDesc',
                            fieldLabel: '기타 설명',
                            labelAlign: 'top'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    padding: 20,
                    title: '접근 서버',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: 20,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return true; }

                                        if(!ValidIPAddress(value)){return false; }
                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_ipAddress',
                                    fieldLabel: 'IP 주소',
                                    labelWidth: 60,
                                    msgTarget: 'none',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: 20,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return true; }

                                        if(!ValidIPAddress(value)){return false; }
                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_netMask',
                                    fieldLabel: '넷마스크',
                                    labelWidth: 60,
                                    msgTarget: 'none',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_ssl_server"]').saveData();
                            },
                            margin: '1 10 1 0',
                            width: 100,
                            text: '저장'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_ssl_server"]').destroy();
                            },
                            margin: 1,
                            width: 100,
                            text: '취소'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_object_ssl_serverAfterRender',
        beforedestroy: 'onPnl_object_ssl_serverBeforeDestroy'
    },

    onPnl_object_ssl_serverAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ssl_serverBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        me.object = record;

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('textfield[itemId="txf_ipAddress"]').setValue(record.ip);
        me.down('textfield[itemId="txf_netMask"]').setValue(record.netmask);

        me.show();
    },

    saveData: function() {
        var me = this;

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
        {
            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
            {
                me.object.ip = me.down('textfield[itemId="txf_ipAddress"]').getValue();
            }
        }
        else
        {
            me.object.ip = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_netMask"]').getValue())
        {
            if(me.down('textfield[itemId="txf_netMask"]').validate())
            {
                me.object.netmask = me.down('textfield[itemId="txf_netMask"]').getValue();
            }
        }
        else
        {
            me.object.netmask = '0.0.0.0';
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    if((_func === 'addObject') && response)
                    {
                        me.object['@cid'] = response;
                    }

                    if(typeof me.closeEvent === 'function'){
                        me.closeEvent();
                    }

                    me.destroy();
                }
            }
        );
    }

});

Ext.define('SMC.view.pnl_object_waf', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Action',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_waf',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: 'WAF',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_waf',
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
                            title: 'WAF',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center',
                                padding: 10
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.8,
                                    margin: '0 20 0 0',
                                    layout: {
                                        type: 'vbox',
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
                                            itemId: 'txf_ipAddress',
                                            margin: '0 0 10 0',
                                            fieldLabel: '서버 IP',
                                            labelWidth: 80,
                                            msgTarget: 'none',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }
                                                return true;
                                            },
                                            itemId: 'txf_domain',
                                            margin: '0 0 10 0',
                                            fieldLabel: '도메인 이름',
                                            labelWidth: 80,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 1,
                                            itemId: 'chk_wa',
                                            fieldLabel: '웹 가속 사용',
                                            labelWidth: 80
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 10 0 0',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    itemId: 'nfd_port',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: '포트',
                                                    labelWidth: 30,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 0.9,
                                                    itemId: 'gpn_port',
                                                    margin: '0 0 0 35',
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    store: 'st_Waf_Port',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 133,
                                                            dataIndex: 'port',
                                                            text: '포트번호',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            width: 30,
                                                            align: 'center',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        view.up('window[itemId="pnl_object_waf"]').down('gridpanel[itemId="gpn_port"]').getStore().removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    listeners: {
                                                        select: {
                                                            fn: me.onGpn_portSelect,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.85,
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_waf"]');

                                                        var port_store = me.down('gridpanel[itemId="gpn_port"]').getStore();
                                                        var port_number = me.down('numberfield[itemId="nfd_port"]').getValue();

                                                        if(port_number)
                                                        {
                                                            if(!LengthCheckFloat(port_number,1,65535))
                                                            {
                                                                alertMessage('포트는 1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_port"]'));
                                                                return false;
                                                            }

                                                            for(var i=0; i<port_store.getCount(); i++)
                                                            {
                                                                if(port_number === port_store.data.items[i].data.port)
                                                                {
                                                                    alertMessage('같은 포트가 이미 있습니다.', me.down('numberfield[itemId="nfd_port"]'));
                                                                    return false;
                                                                }
                                                            }

                                                            port_store.add({
                                                                'port': port_number
                                                            });
                                                        }
                                                        else
                                                        {
                                                            alertMessage('필수 입력 항목입니다.', me.down('numberfield[itemId="nfd_port"]'));
                                                            return false;
                                                        }

                                                    },
                                                    flex: 1,
                                                    margin: '0 10 0 0',
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_waf"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_port"]').getSelectionModel().getSelection()[0];
                                                        var port_store = me.down('gridpanel[itemId="gpn_port"]').getStore();

                                                        delObject(select_record, 'port', port_store);
                                                    },
                                                    flex: 1,
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        }
                                    ]
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
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_waf"]').saveData();
                                    },
                                    margin: '0 20 0 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_waf"]').destroy();
                                    },
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_wafAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_wafBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_portSelect: function(rowmodel, record, index, eOpts) {
        this.down('numberfield[itemId="nfd_port"]').setValue(record.data.port);
    },

    onPnl_object_wafAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_wafBeforeDestroy: function(component, eOpts) {
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

        me.down('gridpanel[itemId="gpn_port"]').getStore().removeAll();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('textfield[itemId="txf_ipAddress"]').setValue(record.ip);
        me.down('textfield[itemId="txf_domain"]').setValue(record.domain);

        if(!record.wa)
        {
            record.wa = {
                '@chk_use': "off"
            };
        }

        if(record.wa['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="chk_wa"]').setValue(true);
        }
        else
        {
            me.down('checkbox[itemId="chk_wa"]').setValue(false);
        }

        if(typeof record.port === 'string')
        {
            var port_array = record.port.split(',');

            for(var i=0; i<port_array.length; i++)
            {
                me.down('gridpanel[itemId="gpn_port"]').getStore().add({
                    'port': Number(port_array[i])
                });
            }
        }
        else if(typeof record.port === 'number')
        {
            me.down('gridpanel[itemId="gpn_port"]').getStore().add({
                'port': record.port
            });
        }

        me.object = record;

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

        if(me.down('textfield[itemId="txf_domain"]').validate())
        {
            me.object.domain = me.down('textfield[itemId="txf_domain"]').getValue();
        }
        else
        {
            alertMessage('도메인 이름을 입력하시오.', me.down('textfield[itemId="txf_domain"]'));
            return false;
        }

        if(me.down('checkbox[itemId="chk_wa"]').getValue())
        {
            me.object.wa['@chk_use'] = 'on';
        }
        else
        {
            me.object.wa['@chk_use'] = 'off';
        }

        if(me.down('gridpanel[itemId="gpn_port"]').getStore().getCount() > 0)
        {
            if(me.down('gridpanel[itemId="gpn_port"]').getStore().getCount() === 1)
            {
                me.object.port = Number(me.down('gridpanel[itemId="gpn_port"]').getStore().data.items[0].data.port);
            }
            else
            {
                var port_string = '';

                me.down('gridpanel[itemId="gpn_port"]').getStore().each(function(record, idx){

                    if(idx === me.down('gridpanel[itemId="gpn_port"]').getStore().getCount() - 1)
                    {
                        port_string += record.data.port;
                    }
                    else
                    {
                        port_string += record.data.port + ',';
                    }
                });

                me.object.port = port_string;
            }
        }
        else
        {
            alertMessage('한개 이상의 포트가 있어야 합니다.', me.down('numberfield[itemId="nfd_port"]'));
            return false;
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
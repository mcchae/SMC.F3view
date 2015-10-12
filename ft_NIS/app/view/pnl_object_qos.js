
Ext.define('SMC.view.pnl_object_qos', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_qos',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: 'QoS',
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
                    itemId: 'ctn_qos',
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
                                    labelAlign: 'top'
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
                            title: 'QoS 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: 10,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,0.1,10000)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_min_bps',
                                            fieldLabel: '최소 보장 대역폭',
                                            labelWidth: 120,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            text: '( 0.1 ~ 10000 Mbps )'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: 10,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,0.1,10000)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_max_bps',
                                            fieldLabel: '최대 제한 대역폭',
                                            labelWidth: 120,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            text: '( 0.1 ~ 10000 Mbps )'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: 10,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_interface',
                                            fieldLabel: '인터페이스',
                                            labelWidth: 120,
                                            msgTarget: 'none',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'st_Object_Interface',
                                            valueField: 'name'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    margin: 10,
                                    text: '( 8P이상에서는 선택한 인터페이스와 관계없이 동작합니다. )'
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
                                        button.up('window[itemId="pnl_object_qos"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_qos"]').destroy();
                                    },
                                    margin: 2,
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
                    fn: me.onPnl_object_qosAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_qosBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_qosAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_qosBeforeDestroy: function(component, eOpts) {
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
        var tree = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];
        var interface_cid;

        Ext.each(tree.getRootNode().childNodes, function(child){
           if(child.raw.gtype === 'obj_ip')
           {
               Ext.each(child.childNodes, function(child2){
                   if(child2.raw.gtype === 'obj_ip_eth')
                   {
                       interface_cid = child2.raw.cid;
                       return false;
                   }
               });
               return false;
           }
        });

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('numberfield[itemId="nfd_min_bps"]').setValue(record.bandwidth.min);
        me.down('numberfield[itemId="nfd_max_bps"]').setValue(record.bandwidth.max);

        me.object = record;

        if(interface_cid)
        {
            var _svc = 'ftSMC',
                _func = 'getObjectList',
                _params = {
                    g_cid : Ext.encode(interface_cid),
                    isRecursive : Ext.encode(true)
                };


            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    var cmb_interface = me.down('combobox[itemId="cmb_interface"]');

                    cmb_interface.getStore().loadData(response.result);

                    if(record['interface'])
                    {
                        cmb_interface.getStore().each(function(data, idx){

                            if(data.data.name === record['interface'])
                            {
                                cmb_interface.select(cmb_interface.getStore().getAt(idx));
                                return false;
                            }
                        });
                    }
                    else
                    {
                        cmb_interface.select(cmb_interface.getStore().getAt(0));
                    }
                });
        }

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
            alertMessage('오브젝트 이름을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
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

        if(me.down('numberfield[itemId="nfd_min_bps"]').getValue())
        {
            if(me.down('numberfield[itemId="nfd_min_bps"]').validate())
            {
                me.object.bandwidth.min = me.down('numberfield[itemId="nfd_min_bps"]').getValue();
            }
            else
            {
                alertMessage('유효하지 않은 값입니다.', me.down('numberfield[itemId="nfd_min_bps"]'));
                return false;
            }
        }
        else
        {
            alertMessage('필수 입력 항목입니다.', me.down('numberfield[itemId="nfd_min_bps"]'));
            return false;
        }

        if(me.down('numberfield[itemId="nfd_max_bps"]').getValue())
        {
            if(me.down('numberfield[itemId="nfd_max_bps"]').validate())
            {
                me.object.bandwidth.max = me.down('numberfield[itemId="nfd_max_bps"]').getValue();
            }
            else
            {
                alertMessage('유효하지 않은 값입니다.', me.down('numberfield[itemId="nfd_max_bps"]'));
                return false;
            }
        }
        else
        {
            alertMessage('필수 입력 항목입니다.', me.down('numberfield[itemId="nfd_max_bps"]'));
            return false;
        }

        me.object['interface'] = me.down('combobox[itemId="cmb_interface"]').getValue();

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
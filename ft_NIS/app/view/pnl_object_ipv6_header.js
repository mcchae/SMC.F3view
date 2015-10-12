
Ext.define('SMC.view.pnl_object_ipv6_header', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_ipv6_header',
    minHeight: 400,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: 'IPv6 헤더',
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
                    itemId: 'ctn_ipv6_header',
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
                            title: 'IPv6 헤더',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 0.5,
                                            itemId: 'ck_hop',
                                            margin: 10,
                                            boxLabel: '홉바이 홉 헤더'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 1,
                                            itemId: 'ck_dest',
                                            margin: 10,
                                            boxLabel: '목적지 옵션 헤더'
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
                                            xtype: 'checkboxfield',
                                            flex: 0.5,
                                            itemId: 'ck_ah',
                                            margin: 10,
                                            boxLabel: '인증 헤더'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 1,
                                            itemId: 'ck_esp',
                                            margin: 10,
                                            boxLabel: 'ESP 헤더'
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
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    checkbox.up('window[itemId="pnl_object_ipv6_header"]').down('numberfield[itemId="nfd_fragment"]').show();
                                                }
                                                else
                                                {
                                                    checkbox.up('window[itemId="pnl_object_ipv6_header"]').down('numberfield[itemId="nfd_fragment"]').hide();
                                                }
                                            },
                                            flex: 0.5,
                                            itemId: 'ck_fragment',
                                            margin: 10,
                                            boxLabel: '프래그먼트 헤더'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,0,2147483646)){return false; }
                                                return true;
                                            },
                                            flex: 0.5,
                                            hidden: true,
                                            itemId: 'nfd_fragment',
                                            margin: 10,
                                            fieldLabel: '패킷 최소 크기',
                                            labelWidth: 90,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.5
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
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    checkbox.up('window[itemId="pnl_object_ipv6_header"]').down('container[itemId="ctn_route"]').show();
                                                }
                                                else
                                                {
                                                    checkbox.up('window[itemId="pnl_object_ipv6_header"]').down('container[itemId="ctn_route"]').hide();
                                                }
                                            },
                                            flex: 0.5,
                                            itemId: 'ck_route',
                                            margin: 10,
                                            boxLabel: '라우팅 헤더'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'ctn_route',
                                            margin: 10,
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_route',
                                                    margin: 1,
                                                    fieldLabel: 'IPv6 목록',
                                                    labelWidth: 90,
                                                    msgTarget: 'none',
                                                    readOnly: true
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
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                Ext.create('SMC.view.pnl_object_select').loadData('obj_ip');
                                                            },
                                                            flex: 0.5,
                                                            margin: '1 10 1 10',
                                                            maxWidth: 100,
                                                            text: '설정'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                button.up('window[itemId="pnl_object_ipv6_header"]').object.route.member = {
                                                                    '@cid': "AAAAAAAAAAAAAAAAAAAAAA==",
                                                                    '@otype': "single"
                                                                };

                                                                button.up('window[itemId="pnl_object_ipv6_header"]').down('textfield[itemId="txf_route"]').setValue();
                                                            },
                                                            flex: 0.5,
                                                            margin: '1 ',
                                                            maxWidth: 100,
                                                            text: '삭제'
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
                                        button.up('window[itemId="pnl_object_ipv6_header"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipv6_header"]').destroy();
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
                afterrender: {
                    fn: me.onPnl_object_ipv6_headerAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ipv6_headerBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_ipv6_headerAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ipv6_headerBeforeDestroy: function(component, eOpts) {
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

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        if(record.setting['@chk_hop'] === "on")
        {
            me.down('checkbox[itemId="ck_hop"]').setValue(true);
        }
        if(record.setting['@chk_dest'] === "on")
        {
            me.down('checkbox[itemId="ck_dest"]').setValue(true);
        }
        if(record.setting['@chk_esp'] === "on")
        {
            me.down('checkbox[itemId="ck_esp"]').setValue(true);
        }
        if(record.setting['@chk_ah'] === "on")
        {
            me.down('checkbox[itemId="ck_ah"]').setValue(true);
        }

        if(record.fragment['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_fragment"]').setValue(true);
            me.down('numberfield[itemId="nfd_fragment"]').setValue(record.fragment['#text']);
            me.down('numberfield[itemId="nfd_fragment"]').show();
        }

        if(record.route['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_route"]').setValue(true);
            me.down('textfield[itemId="txf_route"]').setValue(record.route.member['#text']);
            me.down('container[itemId="ctn_route"]').show();
        }

        if(!record.route.member)
        {
            record.route.member = {
                '#text': null,
                '@cid': null,
                '@otype': null
            };
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

        if(me.down('checkbox[itemId="ck_hop"]').getValue())
        {
            me.object.setting['@chk_hop'] = "on";
        }
        else
        {
            me.object.setting['@chk_hop'] = "off";
        }

        if(me.down('checkbox[itemId="ck_dest"]').getValue())
        {
            me.object.setting['@chk_dest'] = "on";
        }
        else
        {
            me.object.setting['@chk_dest'] = "off";
        }

        if(me.down('checkbox[itemId="ck_esp"]').getValue())
        {
            me.object.setting['@chk_esp'] = "on";
        }
        else
        {
            me.object.setting['@chk_esp'] = "off";
        }

        if(me.down('checkbox[itemId="ck_ah"]').getValue())
        {
            me.object.setting['@chk_ah'] = "on";
        }
        else
        {
            me.object.setting['@chk_ah'] = "off";
        }

        if(me.down('checkbox[itemId="ck_fragment"]').getValue())
        {
            me.object.fragment['@chk_use'] = "on";

            if(me.down('numberfield[itemId="nfd_fragment"]').validate())
            {
                me.object.fragment['#text'] = me.down('numberfield[itemId="nfd_fragment"]').getValue();
            }
            else
            {
                alertMessage('0 ~ 2147483646 사이의 정수를 입력하시오.', me.down('numberfield[itemId="nfd_fragment"]'));
                return false;
            }
        }
        else
        {
            me.object.fragment['@chk_use'] = "off";
            me.object.fragment['#text'] = 0;
        }

        if(me.down('checkbox[itemId="ck_route"]').getValue())
        {
            me.object.route['@chk_use'] = "on";
            if(!me.object.route.member['#text'])
            {
                alertMessage('IPv6 객체를 선택하시오.');
                return false;
            }
        }
        else
        {
            me.object.route['@chk_use'] = "off";
            me.object.route.member = {
                '@cid': "00000000000000000000000000000000"
            };
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
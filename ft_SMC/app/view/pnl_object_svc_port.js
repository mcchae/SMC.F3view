
Ext.define('SMC.view.pnl_object_svc_port', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_svc_port',
    minHeight: 400,
    minWidth: 720,
    width: 720,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: '서비스 포트',
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
                    itemId: 'ctn_svc_port',
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
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 0.2,
                                    itemId: 'cmb_protocol',
                                    margin: '0 10 0 0',
                                    fieldLabel: '프로토콜 타입',
                                    labelWidth: 90,
                                    editable: false,
                                    displayField: 'type',
                                    queryMode: 'local',
                                    store: 'st_ProtocolType',
                                    valueField: 'type',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_protocolChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.4,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked === true)
                                                {
                                                    checkbox.up('window[itemId="pnl_object_svc_port"]').down('numberfield[itemId="nfd_timeout"]').enable();
                                                }
                                                else
                                                {
                                                    checkbox.up('window[itemId="pnl_object_svc_port"]').down('numberfield[itemId="nfd_timeout"]').disable();
                                                }
                                            },
                                            itemId: 'ck_timeout',
                                            width: 85,
                                            labelWidth: 120,
                                            boxLabel: '타임아웃'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!LengthCheck(value,0,1000000)){return false; }
                                                return true;
                                            },
                                            flex: 0.5,
                                            disabled: true,
                                            itemId: 'nfd_timeout',
                                            margin: '',
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.8
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 0.75,
                                    itemId: 'fs_service_port',
                                    title: '서비스 포트 설정',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margins: '10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: '출발지 포트 : '
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_source_start',
                                                    labelWidth: 80,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 10 0 10',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_source_end',
                                                    labelWidth: 20,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margins: '10',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: '목적지 포트 : '
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dest_start',
                                                    labelWidth: 80,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 10 0 10',
                                                    text: '~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dest_end',
                                                    labelSeparator: '~',
                                                    labelWidth: 20,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            margins: '10',
                                            itemId: 'ck_ftp',
                                            boxLabel: 'FTP'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 0.75,
                                    hidden: true,
                                    itemId: 'fs_icmp_type',
                                    padding: 10,
                                    title: 'ICMP Type',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            itemId: 'rdg_icmp',
                                            columns: 3,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    name: 'icmp',
                                                    boxLabel: 'Any',
                                                    checked: true,
                                                    inputValue: 'Any'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'echo-request',
                                                    inputValue: 'echo-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'echo-reply',
                                                    inputValue: 'echo-reply'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmp',
                                                    boxLabel: 'destination-unreachable',
                                                    inputValue: 'destination-unreachable'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'source-quench',
                                                    inputValue: 'source-quench'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'redirect',
                                                    inputValue: 'redirect'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmp',
                                                    boxLabel: 'router-advertisement',
                                                    inputValue: 'router-advertisement'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'router-solicitation',
                                                    inputValue: 'router-solicitation'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'time-exceeded',
                                                    inputValue: 'time-exceeded'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'timestamp-reply',
                                                    inputValue: 'timestamp-reply'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmp',
                                                    boxLabel: 'address-mask-request',
                                                    inputValue: 'address-mask-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmp',
                                                    boxLabel: 'timestamp-request',
                                                    inputValue: 'timestamp-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmp',
                                                    boxLabel: 'address-mask-reply',
                                                    inputValue: 'address-mask-reply'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 0.75,
                                    hidden: true,
                                    itemId: 'fs_icmpv6_type',
                                    padding: 10,
                                    title: 'ICMPv6 Type',
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            itemId: 'rdg_icmpv6',
                                            columns: 3,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    name: 'icmpv6',
                                                    boxLabel: 'Any',
                                                    checked: true,
                                                    inputValue: 'Any'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 190,
                                                    name: 'icmpv6',
                                                    boxLabel: 'destination-unreachable',
                                                    inputValue: 'destination-unreachable'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmpv6',
                                                    boxLabel: 'packet-too-big',
                                                    inputValue: 'packet-too-big'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'time-exceeded',
                                                    inputValue: 'time-exceeded'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'parameter-problem',
                                                    inputValue: 'parameter-problem'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'echo-request',
                                                    inputValue: 'echo-request'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'echo-reply',
                                                    inputValue: 'echo-reply'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 190,
                                                    name: 'icmpv6',
                                                    boxLabel: 'multicast-listener-report',
                                                    inputValue: 'multicast-listener-report'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 200,
                                                    name: 'icmpv6',
                                                    boxLabel: 'multicast-listener-done',
                                                    inputValue: 'multicast-listener-done'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'redirect',
                                                    inputValue: 'redirect'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 150,
                                                    name: 'icmpv6',
                                                    boxLabel: 'router-renumbering',
                                                    inputValue: 'router-renumbering'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 220,
                                                    name: 'icmpv6',
                                                    boxLabel: 'icmp-node-information-query',
                                                    inputValue: 'icmp-node-information-query'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    margin: 5,
                                                    width: 240,
                                                    name: 'icmpv6',
                                                    boxLabel: 'icmp-node-information-response',
                                                    inputValue: 'icmp-node-information-response'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.75,
                                    hidden: true,
                                    itemId: 'ctn_service_port'
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
                                        button.up('window[itemId="pnl_object_svc_port"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_svc_port"]').destroy();
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
                    fn: me.onPnl_object_svc_portAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_svc_portBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_protocolChange: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_svc_port"]');

        switch(newValue)
        {
            case "TCP":
                me.down('fieldset[itemId="fs_icmp_type"]').hide();
                me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                me.down('container[itemId="ctn_service_port"]').hide();
                me.down('fieldset[itemId="fs_service_port"]').show();
                me.down('checkbox[itemId="ck_ftp"]').show();
                me.down('checkbox[itemId="ck_timeout"]').enable();

                if(me.down('checkbox[itemId="ck_timeout"]').checked)
                {
                    me.down('numberfield[itemId="nfd_timeout"]').enable();
                }
                else
                {
                    me.down('numberfield[itemId="nfd_timeout"]').disable();
                }

                break;
            case "UDP":
                me.down('fieldset[itemId="fs_icmp_type"]').hide();
                me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                me.down('container[itemId="ctn_service_port"]').hide();
                me.down('fieldset[itemId="fs_service_port"]').show();
                me.down('checkbox[itemId="ck_ftp"]').hide();
                me.down('checkbox[itemId="ck_timeout"]').enable();

                if(me.down('checkbox[itemId="ck_timeout"]').checked)
                {
                    me.down('numberfield[itemId="nfd_timeout"]').enable();
                }
                else
                {
                    me.down('numberfield[itemId="nfd_timeout"]').disable();
                }

                break;
            case "ICMP":
                me.down('fieldset[itemId="fs_service_port"]').hide();
                me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                me.down('container[itemId="ctn_service_port"]').hide();
                me.down('fieldset[itemId="fs_icmp_type"]').show();
                me.down('checkbox[itemId="ck_timeout"]').disable();
                me.down('checkbox[itemId="ck_timeout"]').setValue(false);
                me.down('numberfield[itemId="nfd_timeout"]').disable();
                break;
            case "ICMPv6":
                me.down('fieldset[itemId="fs_service_port"]').hide();
                me.down('container[itemId="ctn_service_port"]').hide();
                me.down('fieldset[itemId="fs_icmp_type"]').hide();
                me.down('fieldset[itemId="fs_icmpv6_type"]').show();
                me.down('checkbox[itemId="ck_timeout"]').disable();
                me.down('checkbox[itemId="ck_timeout"]').setValue(false);
                me.down('numberfield[itemId="nfd_timeout"]').disable();
                break;
            default :
                me.down('fieldset[itemId="fs_service_port"]').hide();
                me.down('fieldset[itemId="fs_icmp_type"]').hide();
                me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                me.down('container[itemId="ctn_service_port"]').show();
                me.down('checkbox[itemId="ck_timeout"]').enable();

                if(me.down('checkbox[itemId="ck_timeout"]').checked)
                {
                    me.down('numberfield[itemId="nfd_timeout"]').enable();
                }
                else
                {
                    me.down('numberfield[itemId="nfd_timeout"]').disable();
                }

                break;
        }
    },

    onPnl_object_svc_portAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
            }
        });
    },

    onPnl_object_svc_portBeforeDestroy: function(component, eOpts) {
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

        var protocol_store = me.down('combobox[itemId="cmb_protocol"]').getStore();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('numberfield[itemId="nfd_source_start"]').setValue(record.source.start);
        me.down('numberfield[itemId="nfd_source_end"]').setValue(record.source.end);
        me.down('numberfield[itemId="nfd_dest_start"]').setValue(record.dest.start);
        me.down('numberfield[itemId="nfd_dest_end"]').setValue(record.dest.end);

        me.down('numberfield[itemId="nfd_timeout"]').setValue(record.timeout['#text']);

        me.down('radiogroup[itemId="rdg_icmp"]').setValue({'icmp' : record.protocol['@icmp']});

        me.down('radiogroup[itemId="rdg_icmpv6"]').setValue({'icmpv6' : record.protocol['@icmp']});

        if(record.protocol['@ftp'] === "on")
            me.down('checkbox[itemId="ck_ftp"]').setValue(true);

        if(record.timeout['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_timeout"]').setValue(true);
        }
        else
        {
            me.down('numberfield[itemId="nfd_timeout"]').disable();
        }

        if(me.down('checkbox[itemId="ck_timeout"]').checked)
        {
            me.down('numberfield[itemId="nfd_timeout"]').enable();
        }
        else
        {
            me.down('numberfield[itemId="nfd_timeout"]').disable();
        }

        protocol_store.each(function(data, idx){

            if(data.data.type === record.protocol['@type'])
            {
                me.down('combobox[itemId="cmb_protocol"]').select(protocol_store.getAt(idx));

                switch(data.data.type)
                {
                    case "TCP":
                        me.down('fieldset[itemId="fs_icmp_type"]').hide();
                        me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                        me.down('container[itemId="ctn_service_port"]').hide();
                        me.down('fieldset[itemId="fs_service_port"]').show();
                        me.down('checkbox[itemId="ck_ftp"]').show();
                        me.down('checkbox[itemId="ck_timeout"]').enable();
                        break;
                    case "UDP":
                        me.down('fieldset[itemId="fs_icmp_type"]').hide();
                        me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                        me.down('container[itemId="ctn_service_port"]').hide();
                        me.down('fieldset[itemId="fs_service_port"]').show();
                        me.down('checkbox[itemId="ck_ftp"]').hide();
                        me.down('checkbox[itemId="ck_timeout"]').enable();
                        break;
                    case "ICMP":
                        me.down('fieldset[itemId="fs_service_port"]').hide();
                        me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                        me.down('container[itemId="ctn_service_port"]').hide();
                        me.down('fieldset[itemId="fs_icmp_type"]').show();
                        me.down('checkbox[itemId="ck_timeout"]').disable();
                        me.down('numberfield[itemId="nfd_timeout"]').disable();
                        break;
                   case "ICMPv6":
                        me.down('fieldset[itemId="fs_service_port"]').hide();
                        me.down('container[itemId="ctn_service_port"]').hide();
                        me.down('fieldset[itemId="fs_icmp_type"]').hide();
                        me.down('fieldset[itemId="fs_icmpv6_type"]').show();
                        me.down('checkbox[itemId="ck_timeout"]').disable();
                        me.down('numberfield[itemId="nfd_timeout"]').disable();
                        break;
                   default :
                        me.down('fieldset[itemId="fs_service_port"]').hide();
                        me.down('fieldset[itemId="fs_icmp_type"]').hide();
                        me.down('fieldset[itemId="fs_icmpv6_type"]').hide();
                        me.down('container[itemId="ctn_service_port"]').show();
                        me.down('checkbox[itemId="ck_timeout"]').enable();

                        if(me.down('checkbox[itemId="ck_timeout"]').checked)
                        {
                            me.down('numberfield[itemId="nfd_timeout"]').enable();
                        }
                        else
                        {
                            me.down('numberfield[itemId="nfd_timeout"]').disable();
                        }

                        break;
                }
                return false;
            }
        });

        me.object = record;

        me.show();

        if(record._locked){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '해당 객체는 ' + record._locked + '에서</br> 사용중인 객체이므로 수정할 수 없습니다.',
                buttons : Ext.Msg.OK,
                alwaysOnTop : true,
                icon : Ext.Msg.INFO

            });

            me.setTitle(me.title + ' [읽기 전용]');

            me.down('button[itemId="btn_save"]').disable();
        }
    },

    saveData: function() {
        var me = this;

        var object_source_start = me.down('numberfield[itemId="nfd_source_start"]');
        var object_source_end = me.down('numberfield[itemId="nfd_source_end"]');
        var object_dest_start = me.down('numberfield[itemId="nfd_dest_start"]');
        var object_dest_end = me.down('numberfield[itemId="nfd_dest_end"]');

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

        me.object.protocol['@type'] = me.down('combobox[itemId="cmb_protocol"]').getValue();

        if(me.down('checkbox[itemId="ck_timeout"]').checked)
        {
            me.object.timeout["@chk_use"] = "on";

            if(me.down('numberfield[itemId="nfd_timeout"]').validate())
            {
                me.object.timeout["#text"] = me.down('numberfield[itemId="nfd_timeout"]').getValue();
            }
            else
            {
                alertMessage('타임아웃 값을 0 ~ 1000000 사이의 정수로 입력하시오.', me.down('numberfield[itemId="nfd_timeout"]'));
                return false;
            }
        }
        else
        {
            me.object.timeout["@chk_use"] = "off";
            me.object.timeout["#text"] = 600;
        }

        switch(me.object.protocol['@type'])
        {
            case "TCP":
            case "UDP":

                if(me.down('checkbox[itemId="ck_ftp"]').checked)
                {
                    me.object.protocol['@ftp'] =  "on";
                }
                else
                {
                    me.object.protocol['@ftp'] =  "off";
                }

                if(object_source_start.validate())
                {
                    if(object_source_end.validate())
                    {
                        if(object_source_start.getValue() > object_source_end.getValue())
                        {
                            alertMessage('포트번호가 올바르지 않습니다.');
                            return false;
                        }
                        else
                        {
                            me.object.source.start = object_source_start.getValue();
                            me.object.source.end = object_source_end.getValue();
                        }
                    }
                    else
                    {
                        alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', object_source_end);
                        return false;
                    }
                }
                else
                {
                    alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', object_source_start);
                    return false;
                }

                if(object_dest_start.validate())
                {
                    if(object_dest_end.validate())
                    {
                        if(object_dest_start.getValue() > object_dest_end.getValue())
                        {
                            alertMessage('포트번호가 올바르지 않습니다.');
                            return false;
                        }
                        else
                        {
                            me.object.dest.start = object_dest_start.getValue();
                            me.object.dest.end = object_dest_end.getValue();
                        }
                    }
                    else
                    {
                        alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', object_dest_end);
                        return false;
                    }

                    me.object.dest.start = object_dest_start.getValue();
                }
                else
                {
                    alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', object_dest_start);
                    return false;
                }

                me.object.protocol['@icmp'] = 'Any';
                break;
            case "ICMP":
                me.object.source.start = 1;
                me.object.source.end = 65535;
                me.object.dest.start = 1;
                me.object.dest.end = 65535;
                me.object.protocol['@icmp'] = me.down('radiogroup[itemId="rdg_icmp"]').getChecked()[0].inputValue;
                break;
            case "ICMPv6":
                switch(me.down('radiogroup[itemId="rdg_icmpv6"]').getChecked()[0].inputValue)
                {
                    case "Any":
                        me.object.source.start = 0;
                        me.object.source.end = 0;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "destination-unreachable":
                        me.object.source.start = 1;
                        me.object.source.end = 1;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "packet-too-big":
                        me.object.source.start = 2;
                        me.object.source.end = 2;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "time-exceeded":
                        me.object.source.start = 3;
                        me.object.source.end = 3;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "parameter-problem":
                        me.object.source.start = 4;
                        me.object.source.end = 4;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "echo-request":
                        me.object.source.start = 128;
                        me.object.source.end = 128;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "echo-reply":
                        me.object.source.start = 129;
                        me.object.source.end = 129;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "multicast-listener-query":
                        me.object.source.start = 130;
                        me.object.source.end = 130;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "multicast-listener-report":
                        me.object.source.start = 131;
                        me.object.source.end = 131;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "multicast-listener-done":
                        me.object.source.start = 132;
                        me.object.source.end = 132;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "redirect":
                        me.object.source.start = 137;
                        me.object.source.end = 137;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "router-renumbering":
                        me.object.source.start = 138;
                        me.object.source.end = 138;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "icmp-node-information-query":
                        me.object.source.start = 139;
                        me.object.source.end = 139;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                    case "icmp-node-information-response":
                        me.object.source.start = 140;
                        me.object.source.end = 140;
                        me.object.dest.start = 0;
                        me.object.dest.end = 0;
                        break;
                }
                me.object.protocol['@icmp'] = me.down('radiogroup[itemId="rdg_icmpv6"]').getChecked()[0].inputValue;
                break;
            default :
                me.object.source.start = 1;
                me.object.source.end = 65535;
                me.object.dest.start = 1;
                me.object.dest.end = 65535;
                me.object.protocol['@icmp'] = 'Any';
                break;
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
            'chkDuplicateObject',
            {obj : Ext.encode(me.object)},
            function(response){

                if(response === true){
                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '중복되는 객체명이 존재합니다. 저장하시겠습니까?',
                        buttonText: {
                            ok     : "저장",
                            cancel : "취소"
                        },

                        buttons : Ext.Msg.OKCANCEL,
                        alwaysOnTop : true,
                        icon : Ext.Msg.INFO,
                        fn: function(buttonId) {

                            if (buttonId === "ok") {
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
                        }
                    });
                }
                else{
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
            }
        );
    }

});
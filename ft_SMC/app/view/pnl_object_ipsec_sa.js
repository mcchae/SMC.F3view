
Ext.define('SMC.view.pnl_object_ipsec_sa', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    border: false,
    height: 450,
    itemId: 'pnl_object_ipsec_sa',
    minHeight: 450,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: 'IPSEC SA 설정',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: ''
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_ipsec_sa',
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
                            flex: 0.8,
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    title: '옵션',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            itemId: 'rdg_replay',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'Replay Protection',
                                            labelWidth: 120,
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_replay_on',
                                                    name: 'replay',
                                                    boxLabel: 'On'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_replay_off',
                                                    name: 'replay',
                                                    boxLabel: 'Off',
                                                    checked: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_time',
                                            margin: 5,
                                            fieldLabel: 'Life Time (Hour) ',
                                            labelWidth: 120,
                                            editable: false,
                                            displayField: 'time',
                                            queryMode: 'local',
                                            store: 'st_IPSec_LifeTime',
                                            valueField: 'time'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_pfs',
                                            margin: 5,
                                            boxLabel: 'Perfect Forward Security',
                                            listeners: {
                                                change: {
                                                    fn: me.onCk_pfsChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            disabled: true,
                                            itemId: 'cmb_group',
                                            margin: 5,
                                            fieldLabel: '키 교환그룹',
                                            labelWidth: 120,
                                            editable: false,
                                            displayField: 'group',
                                            queryMode: 'local',
                                            store: 'st_IPSec_KeyGroup',
                                            valueField: 'group'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    height: 152,
                                    margin: '0 0 0 0',
                                    title: 'IPSEC SA',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_mode',
                                            margin: 5,
                                            fieldLabel: 'Mode',
                                            labelWidth: 90,
                                            editable: false,
                                            displayField: 'mode',
                                            queryMode: 'local',
                                            store: 'st_IPSec_Mode',
                                            valueField: 'mode'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_protocol',
                                            margin: 5,
                                            fieldLabel: '암호 프로토콜',
                                            labelWidth: 90,
                                            editable: false,
                                            displayField: 'protocol',
                                            queryMode: 'local',
                                            store: 'st_IPSec_Protocol',
                                            valueField: 'protocol',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_protocolChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            margin: 5,
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    disabled: true,
                                                    itemId: 'cmb_encryption',
                                                    margin: '0 5 0 0',
                                                    fieldLabel: '암호 알고리즘',
                                                    labelWidth: 90,
                                                    editable: false,
                                                    displayField: 'encryption',
                                                    queryMode: 'local',
                                                    store: 'st_IPSec_Encryption',
                                                    valueField: 'encryption',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onCmb_encryptionChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    disabled: true,
                                                    itemId: 'txf_encryption_input',
                                                    msgTarget: 'none'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: 5,
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    itemId: 'cmb_auth',
                                                    margin: '0 5 0 0',
                                                    fieldLabel: '인증 알고리즘',
                                                    labelWidth: 90,
                                                    editable: false,
                                                    displayField: 'auth',
                                                    queryMode: 'local',
                                                    store: 'st_IPSec_Auth',
                                                    valueField: 'auth',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onCmb_authChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 0.5,
                                                    disabled: true,
                                                    itemId: 'txf_auth_input',
                                                    msgTarget: 'none'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.5,
                            title: '기타 설정',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: 5,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = CheckNotNull(value);

                                                if(!retValue){return true; }

                                                retValue = value.match('-');

                                                if(retValue){ return false; }

                                                retValue = validIPForm(value, 'v4');

                                                if(!retValue)
                                                {
                                                    if(value.match('/'))
                                                    {
                                                        retValue = ValidIPv6(value.split('/')[0]);
                                                    }
                                                    else
                                                    {
                                                        retValue = ValidIPv6(value);
                                                    }

                                                    if(!retValue){ return false; }
                                                }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_local',
                                            margin: 5,
                                            fieldLabel: 'Local ID',
                                            labelWidth: 80,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.7,
                                            itemId: 'cmb_local_proto',
                                            margin: 5,
                                            fieldLabel: '프로토콜',
                                            labelWidth: 60,
                                            displayField: 'proto',
                                            queryMode: 'local',
                                            store: 'st_IPSec_LocalProtocol',
                                            valueField: 'proto'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!LengthCheckFloat(value,0,65535)){return false; }
                                                return true;
                                            },
                                            flex: 0.5,
                                            itemId: 'nfd_local_port',
                                            margin: 5,
                                            fieldLabel: '포트',
                                            labelWidth: 40,
                                            msgTarget: 'none'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: 5,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = CheckNotNull(value);

                                                if(!retValue){return true; }

                                                retValue = value.match('-');

                                                if(retValue){ return false; }

                                                retValue = validIPForm(value, 'v4');

                                                if(!retValue)
                                                {
                                                    if(value.match('/'))
                                                    {
                                                        retValue = ValidIPv6(value.split('/')[0]);
                                                    }
                                                    else
                                                    {
                                                        retValue = ValidIPv6(value);
                                                    }

                                                    if(!retValue){ return false; }
                                                }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_remote',
                                            margin: 5,
                                            fieldLabel: 'Remote ID',
                                            labelWidth: 80,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.7,
                                            itemId: 'cmb_remote_proto',
                                            margin: 5,
                                            fieldLabel: '프로토콜',
                                            labelWidth: 60,
                                            displayField: 'proto',
                                            queryMode: 'local',
                                            store: 'st_IPSec_RemoteProtocol',
                                            valueField: 'proto'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!LengthCheckFloat(value,0,65535)){return false; }
                                                return true;
                                            },
                                            flex: 0.5,
                                            itemId: 'nfd_remote_port',
                                            margin: 5,
                                            fieldLabel: '포트',
                                            labelWidth: 40,
                                            msgTarget: 'none'
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
                                        button.up('window[itemId="pnl_object_ipsec_sa"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipsec_sa"]').destroy();
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
                    fn: me.onPnl_object_ipsec_saAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ipsec_saBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCk_pfsChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === true)
        {
            field.up().down('combobox[itemId="cmb_group"]').enable();
        }
        else
        {
            field.up().down('combobox[itemId="cmb_group"]').disable();
        }
    },

    onCmb_protocolChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        if(newValue === "AH")
        {
            me.down('combobox[itemId="cmb_encryption"]').disable();
            me.down('textfield[itemId="txf_encryption_input"]').disable();
        }
        else
        {
            me.down('combobox[itemId="cmb_encryption"]').enable();
            if(me.down('combobox[itemId="cmb_encryption"]').getValue() === '직접입력')
            {
                me.down('textfield[itemId="txf_encryption_input"]').enable();
            }
            else
            {
                me.down('textfield[itemId="txf_encryption_input"]').disable();
            }
        }
    },

    onCmb_encryptionChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "직접입력")
        {
            this.down('textfield[itemId="txf_encryption_input"]').enable();
        }
        else
        {
            this.down('textfield[itemId="txf_encryption_input"]').disable();
        }
    },

    onCmb_authChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "직접입력")
        {
            this.down('textfield[itemId="txf_auth_input"]').enable();
        }
        else
        {
            this.down('textfield[itemId="txf_auth_input"]').disable();
        }
    },

    onPnl_object_ipsec_saAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
            }
        });
    },

    onPnl_object_ipsec_saBeforeDestroy: function(component, eOpts) {
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

        if(record['@cid'] === record['@groupcid'])
        {
            me.down('textfield[itemId="txf_objectName"]').setReadOnly(true);
            me.down('button[itemId="btn_save"]').disable();
        }

        if(record.phase2['@replay'] === "on")
        {
            me.down('radiogroup[itemId="rdg_replay"]').items.items[0].setValue(true);
        }
        else
        {
            me.down('radiogroup[itemId="rdg_replay"]').items.items[1].setValue(true);
        }

        me.down('combobox[itemId="cmb_time"]').getStore().each(function(data, idx){

            if(data.data.time === record.phase2['@time'])
            {
                me.down('combobox[itemId="cmb_time"]').select(me.down('combobox[itemId="cmb_time"]').getStore().getAt(idx));
                return false;
            }
        });

        if(record.phase2['@chk_pfs'] === "on")
        {
            me.down('checkbox[itemId="ck_pfs"]').setValue(true);
        }
        else
        {
            me.down('checkbox[itemId="ck_pfs"]').setValue(false);
            me.down('combobox[itemId="cmb_group"]').disable();
        }

        me.down('combobox[itemId="cmb_group"]').getStore().each(function(data, idx){

            if(data.data.group === record.phase2['@group'])
            {
                me.down('combobox[itemId="cmb_group"]').select(me.down('combobox[itemId="cmb_group"]').getStore().getAt(idx));
                return false;
            }
        });

        me.down('combobox[itemId="cmb_mode"]').getStore().each(function(data, idx){

            if(data.data.mode === record.phase2['@mode'])
            {
                me.down('combobox[itemId="cmb_mode"]').select(me.down('combobox[itemId="cmb_mode"]').getStore().getAt(idx));
                return false;
            }
        });

        if(record.phase2['@protocol'] === "AH")
        {
            me.down('combobox[itemId="cmb_encryption"]').disable();
        }
        else if(record.phase2['@protocol'] === "ESP")
        {
            me.down('combobox[itemId="cmb_encryption"]').enable();
        }

        me.down('combobox[itemId="cmb_protocol"]').getStore().each(function(data, idx){

            if(data.data.protocol === record.phase2['@protocol'])
            {
                me.down('combobox[itemId="cmb_protocol"]').select(me.down('combobox[itemId="cmb_protocol"]').getStore().getAt(idx));

                if(me.down('combobox[itemId="cmb_protocol"]').getValue() === 'ESP')
                {
                    me.down('combobox[itemId="cmb_encryption"]').enable();
                }

                return false;
            }
        });

        me.down('combobox[itemId="cmb_encryption"]').getStore().each(function(data, idx){

            if(data.data.encryption === record.phase2['@encryption'])
            {
                me.down('combobox[itemId="cmb_encryption"]').select(me.down('combobox[itemId="cmb_encryption"]').getStore().getAt(idx));
                return false;
            }
            else if(idx === me.down('combobox[itemId="cmb_encryption"]').getStore().getCount() - 1)
            {
                if(me.down('combobox[itemId="cmb_protocol"]').getValue() === 'ESP')
                {
                    me.down('textfield[itemId="txf_encryption_input"]').enable();
                }
                me.down('textfield[itemId="txf_encryption_input"]').setValue(record.phase2['@encryption']);
                me.down('combobox[itemId="cmb_encryption"]').select(me.down('combobox[itemId="cmb_encryption"]').getStore().getAt(idx));
            }
        });

        me.down('combobox[itemId="cmb_auth"]').getStore().each(function(data, idx){

            if(!record.phase2['@auth'] && data.data.auth === 'NULL')
            {
                me.down('combobox[itemId="cmb_auth"]').select(me.down('combobox[itemId="cmb_auth"]').getStore().getAt(idx));
                return false;
            }
            else if(data.data.auth === record.phase2['@auth'])
            {
                me.down('combobox[itemId="cmb_auth"]').select(me.down('combobox[itemId="cmb_auth"]').getStore().getAt(idx));
                return false;
            }
            else if(idx === me.down('combobox[itemId="cmb_auth"]').getStore().getCount() - 1)
            {
                me.down('textfield[itemId="txf_auth_input"]').enable();
                me.down('textfield[itemId="txf_auth_input"]').setValue(record.phase2['@auth']);
                me.down('combobox[itemId="cmb_auth"]').select(me.down('combobox[itemId="cmb_auth"]').getStore().getAt(idx));
            }
        });

        me.down('textfield[itemId="txf_local"]').setValue(record.local['#text']);
        me.down('numberfield[itemId="nfd_local_port"]').setValue(record.local['@port']);
        me.down('textfield[itemId="txf_remote"]').setValue(record.remote['#text']);
        me.down('numberfield[itemId="nfd_remote_port"]').setValue(record.remote['@port']);

        me.down('combobox[itemId="cmb_local_proto"]').getStore().each(function(data, idx){

            if(data.data.proto === record.local['@proto'])
            {
                me.down('combobox[itemId="cmb_local_proto"]').select(me.down('combobox[itemId="cmb_local_proto"]').getStore().getAt(idx));
                return false;
            }

            if(idx === me.down('combobox[itemId="cmb_local_proto"]').getStore().getCount() -1)
            {
                me.down('combobox[itemId="cmb_local_proto"]').setValue(record.local['@proto']);
            }
        });

        me.down('combobox[itemId="cmb_remote_proto"]').getStore().each(function(data, idx){

            if(data.data.proto === record.remote['@proto'])
            {
                me.down('combobox[itemId="cmb_remote_proto"]').select(me.down('combobox[itemId="cmb_remote_proto"]').getStore().getAt(idx));
                return false;
            }

            if(idx === me.down('combobox[itemId="cmb_remote_proto"]').getStore().getCount() -1)
            {
                me.down('combobox[itemId="cmb_remote_proto"]').setValue(record.remote['@proto']);
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

        if(me.down('radiogroup[itemId="rdg_replay"]').getChecked()[0].itemId === "rd_replay_on")
        {
            me.object.phase2['@replay'] = "on";
        }
        else if(me.down('radiogroup[itemId="rdg_replay"]').getChecked()[0].itemId === "rd_replay_off")
        {
            me.object.phase2['@replay'] = "off";
        }

        me.object.phase2['@time'] = me.down('combobox[itemId="cmb_time"]').getValue();

        if(me.down('checkbox[itemId="ck_pfs"]').checked)
        {
            me.object.phase2['@chk_pfs'] = "on";
            me.object.phase2['@group'] = me.down('combobox[itemId="cmb_group"]').getValue();
        }
        else
        {
            me.object.phase2['@chk_pfs'] = "off";
        }

        me.object.phase2['@mode'] = me.down('combobox[itemId="cmb_mode"]').getValue();

        me.object.phase2['@protocol'] = me.down('combobox[itemId="cmb_protocol"]').getValue();

        if(me.down('combobox[itemId="cmb_encryption"]').getValue() === "직접입력")
        {
            if(me.down('textfield[itemId="txf_encryption_input"]').getValue())
                me.object.phase2['@encryption'] = me.down('textfield[itemId="txf_encryption_input"]').getValue();
            else
                me.object.phase2['@encryption'] = 'NULL_ENC';
        }
        else
        {
            me.object.phase2['@encryption'] = me.down('combobox[itemId="cmb_encryption"]').getValue();
        }

        if(me.down('combobox[itemId="cmb_auth"]').getValue() === "직접입력")
        {
            me.object.phase2['@auth'] = me.down('textfield[itemId="txf_auth_input"]').getValue();

            if(me.down('textfield[itemId="txf_auth_input"]').getValue())
                me.object.phase2['@auth'] = me.down('textfield[itemId="txf_auth_input"]').getValue();
            else
                me.object.phase2['@auth'] = null;
        }
        else if(me.down('combobox[itemId="cmb_auth"]').getValue() === 'NULL')
        {
            me.object.phase2['@auth'] = null;
        }
        else
        {
            me.object.phase2['@auth'] = me.down('combobox[itemId="cmb_auth"]').getValue();
        }

        if(!me.down('textfield[itemId="txf_local"]').getValue() && me.down('textfield[itemId="txf_remote"]').getValue())
        {
            alertMessage('Local ID 설정이 필요합니다.', me.down('textfield[itemId="txf_local"]'));
            return false;
        }

        if((me.down('textfield[itemId="txf_local"]').getValue() || me.down('numberfield[itemId="nfd_local_port"]').getValue()) &&
           !me.down('combobox[itemId="cmb_local_proto"]').getValue())
        {
            alertMessage('프로토콜 설정이 잘못되었습니다.', me.down('combobox[itemId="cmb_local_proto"]'));
            return false;
        }
        else if(!me.down('combobox[itemId="cmb_local_proto"]').getValue() && me.down('numberfield[itemId="nfd_local_port"]').getValue())
        {
            alertMessage('프로토콜을 먼저 설정하시오.', me.down('combobox[itemId="cmb_local_proto"]'));
            return false;
        }
        else if(!me.down('textfield[itemId="txf_local"]').getValue() && me.down('combobox[itemId="cmb_local_proto"]').getValue() &&
                me.down('numberfield[itemId="nfd_local_port"]').getValue())
        {
            alertMessage('Local ID 설정이 필요합니다.', me.down('textfield[itemId="txf_local"]'));
            return false;
        }
        else if(!me.down('textfield[itemId="txf_local"]').getValue() && !me.down('combobox[itemId="cmb_local_proto"]').getValue() &&
               !me.down('numberfield[itemId="nfd_local_port"]').getValue())
        {
            delete me.object.local['#text'];
            me.object.local['@port'] = '';
            me.object.local['@proto'] = '';
        }
        else
        {
            if(me.down('numberfield[itemId="nfd_local_port"]').getValue())
            {
                if(me.down('numberfield[itemId="nfd_local_port"]').validate())
                {
                    me.object.local['@port'] = me.down('numberfield[itemId="nfd_local_port"]').getValue();
                }
                else
                {
                    alertMessage('0 ~ 65535까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_local_port"]'));
                    return false;
                }
            }
            else
            {
                me.object.local['@port'] = '';
            }

            if(me.down('textfield[itemId="txf_local"]').getValue())
            {
                if(me.down('textfield[itemId="txf_local"]').validate())
                {
                    me.object.local['#text'] = me.down('textfield[itemId="txf_local"]').getValue();
                }
                else
                {
                    alertMessage('IP주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_local"]'));
                    return false;
                }
            }

            if(me.down('combobox[itemId="cmb_local_proto"]').getValue())
            {
                var number_check = true;

                me.down('combobox[itemId="cmb_local_proto"]').getStore().each(function(record , idx){

                    if(me.down('combobox[itemId="cmb_local_proto"]').getValue() === record.data.proto)
                    {
                        number_check = false;
                        return false;
                    }
                });

                if(number_check)
                {
                    var num_proto = Number(me.down('combobox[itemId="cmb_local_proto"]').getValue());
                    var num_check = ValidNum(num_proto);

                    if(num_check)
                    {
                        me.object.local['@proto'] = Number(me.down('combobox[itemId="cmb_local_proto"]').getValue());
                    }
                    else
                    {
                        me.object.local['@proto'] = me.down('combobox[itemId="cmb_local_proto"]').getValue();
                    }
                }
                else
                {
                    me.object.local['@proto'] = me.down('combobox[itemId="cmb_local_proto"]').getValue();
                }
            }
            else
            {
                me.object.local['@proto'] = '';
            }
        }

        if(me.down('textfield[itemId="txf_local"]').getValue() && !me.down('textfield[itemId="txf_remote"]').getValue())
        {
            alertMessage('Remote ID 설정이 필요합니다.', me.down('textfield[itemId="txf_remote"]'));
            return false;
        }

        if(!me.down('combobox[itemId="cmb_remote_proto"]').getValue() && me.down('numberfield[itemId="nfd_remote_port"]').getValue())
        {
            alertMessage('프로토콜을 설정하시오.', me.down('combobox[itemId="cmb_remote_proto"]'));
            return false;
        }
        else if(!me.down('textfield[itemId="txf_remote"]').getValue() && me.down('combobox[itemId="cmb_remote_proto"]').getValue() &&
                me.down('numberfield[itemId="nfd_remote_port"]').getValue())
        {
            alertMessage('Remote ID 설정이 필요합니다.', me.down('textfield[itemId="txf_remote"]'));
            return false;
        }
        else if(!me.down('textfield[itemId="txf_remote"]').getValue() && !me.down('combobox[itemId="cmb_remote_proto"]').getValue() &&
               !me.down('numberfield[itemId="nfd_remote_port"]').getValue())
        {
            delete me.object.remote['#text'];
            me.object.remote['@port'] = '';
            me.object.remote['@proto'] = '';
        }
        else
        {
            if(me.down('numberfield[itemId="nfd_remote_port"]').getValue())
            {
                if(me.down('numberfield[itemId="nfd_remote_port"]').validate())
                {
                    me.object.remote['@port'] = me.down('numberfield[itemId="nfd_remote_port"]').getValue();
                }
                else
                {
                    alertMessage('0 ~ 65535까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_remote_port"]'));
                    return false;
                }
            }
            else
            {
                me.object.remote['@port'] = '';
            }

            if(me.down('textfield[itemId="txf_remote"]').getValue())
            {
                if(me.down('textfield[itemId="txf_remote"]').validate())
                {
                    me.object.remote['#text'] = me.down('textfield[itemId="txf_remote"]').getValue();
                }
                else
                {
                    alertMessage('IP주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_remote"]'));
                    return false;
                }
            }

            var number_check = true;

            if(me.down('combobox[itemId="cmb_remote_proto"]').getValue())
            {
                me.down('combobox[itemId="cmb_remote_proto"]').getStore().each(function(record, idx){

                    if(me.down('combobox[itemId="cmb_remote_proto"]').getValue() === record.data.proto)
                    {
                        number_check = false;
                        return false;
                    }
                });

                if(number_check)
                {
                    var num_proto = Number(me.down('combobox[itemId="cmb_remote_proto"]').getValue());
                    var num_check = ValidNum(num_proto);
                    if(num_check)
                    {
                        var length_check = LengthCheck(num_proto, 0, 255);
                        if(length_check)
                        {
                            me.object.remote['@proto'] = Number(me.down('combobox[itemId="cmb_remote_proto"]').getValue());
                        }
                        else
                        {
                            alertMessage('0 ~ 255까지의 정수만 입력이 가능합니다.', me.down('combobox[itemId="cmb_remote_proto"]'));
                            return false;
                        }
                    }
                    else
                    {
                        alertMessage('프로토콜 설정이 잘못되었습니다.',me.down('combobox[itemId="cmb_remote_proto"]'));
                        return false;
                    }
                }
                else
                {
                    me.object.remote['@proto'] = me.down('combobox[itemId="cmb_remote_proto"]').getValue();
                }
            }
            else
            {
                me.object.remote['@proto'] = '';
            }

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
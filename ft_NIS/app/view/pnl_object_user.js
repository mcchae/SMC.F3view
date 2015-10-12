
Ext.define('SMC.view.pnl_object_user', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_user',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: '사용자',
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
                    itemId: 'ctn_user',
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
                                        var retValue = CheckNotNull(value);

                                        if(!retValue){return false; }
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
                            title: '사용자',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
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
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!LengthCheck2(value,4,32)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_id',
                                            margin: '0 40 0 0',
                                            fieldLabel: '아이디',
                                            labelWidth: 90,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_authtype',
                                            fieldLabel: '인증방식',
                                            labelWidth: 90,
                                            editable: false,
                                            displayField: 'authtype',
                                            store: 'st_User_AuthType',
                                            valueField: 'authtypeValue'
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
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(me.object.password === value){ return true; }

                                                if(!validUserPassword(value)){ return false; }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_password',
                                            margin: '0 40 0 0',
                                            fieldLabel: '비밀번호',
                                            labelWidth: 90,
                                            msgTarget: 'none',
                                            inputType: 'password'
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(me.object.password === value){ return true; }

                                                if(!validUserPassword(value)){ return false; }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_password_confirm',
                                            fieldLabel: '비밀번호 확인',
                                            labelWidth: 90,
                                            msgTarget: 'none',
                                            inputType: 'password'
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
                                            xtype: 'textfield',
                                            flex: 1,
                                            itemId: 'txf_group',
                                            margin: '0 40 0 0',
                                            fieldLabel: '접근 서버그룹',
                                            labelWidth: 90,
                                            readOnly: true
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
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        Ext.create('SMC.view.pnl_object_select').loadData('obj_ssl_svr_group');
                                                    },
                                                    margin: 1,
                                                    width: 100,
                                                    text: '선택'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '1 0 1 20',
                                                    text: '※ SSL 접근 서버그룹'
                                                }
                                            ]
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
                                            itemId: 'cmb_mode',
                                            margin: '0 40 0 0',
                                            fieldLabel: '접근 제한',
                                            labelWidth: 90,
                                            editable: false,
                                            displayField: 'mode',
                                            store: 'st_User_Mode',
                                            valueField: 'modeValue'
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
                                        button.up('window[itemId="pnl_object_user"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_user"]').destroy();
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
                    fn: me.onPnl_object_userAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_userBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_userAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_userBeforeDestroy: function(component, eOpts) {
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

        var object_authtype = me.down('combobox[itemId="cmb_authtype"]');
        var object_mode = me.down('combobox[itemId="cmb_mode"]');
        var authtype_store = object_authtype.getStore();
        var mode_store = object_mode.getStore();

        me.object = record;

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('textfield[itemId="txf_id"]').setValue(record.id);
        me.down('textfield[itemId="txf_password"]').setValue(record.password);
        me.down('textfield[itemId="txf_password_confirm"]').setValue(record.password);

        if(record.group)
        {
            if(record.group['#text'] !== 'Any')
            {
                me.down('textfield[itemId="txf_group"]').setValue(record.group['#text']);
            }
        }

        authtype_store.each(function(data, idx){

            if(data.data.authtypeValue === record.setting['@authtype'])
            {
                object_authtype.select(authtype_store.getAt(idx));
                return false;
            }
        });

        mode_store.each(function(data, idx){

            if(data.data.modeValue === record.setting['@mode'])
            {
                object_mode.select(mode_store.getAt(idx));
                return false;
            }
        });

        me.show();
    },

    saveData: function() {
        var me = this;

        var object_id = me.down('textfield[itemId="txf_id"]');
        var object_password = me.down('textfield[itemId="txf_password"]');
        var object_password_confirm = me.down('textfield[itemId="txf_password_confirm"]');

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

        if(!object_id.getValue())
        {
            alertMessage('아이디를 입력하시오.', object_id);
            return false;
        }
        else if(!object_id.validate())
        {
            alertMessage('아이디는 4글자 이상 32글자 이하로 하셔야 합니다.', object_id);
            return false;
        }

        me.object.id = object_id.getValue();

        if(!object_password.getValue())
        {
            alertMessage('비밀번호를 입력하시오.', object_password);
            return false;
        }
        else if(object_password.getValue().length < 9 || object_password.getValue().length > 128)
        {
            alertMessage('비밀번호는 9글자 이상 128글자 이하로 하셔야 합니다.', object_password);
            return false;
        }
        else if(!object_password.validate())
        {
            alertMessage('비밀번호는 숫자+영문자+특수문자 조합으로 되어 있어야 합니다.', object_password);
            return false;
        }
        else if(object_password.getValue() !== object_password_confirm.getValue())
        {
            alertMessage('같은 비밀번호를 입력하시오.', object_password_confirm);
            return false;
        }

        me.object.password = object_password.getValue();

        me.object.setting['@authtype'] = me.down('combobox[itemId="cmb_authtype"]').getValue();
        me.object.setting['@mode'] = me.down('combobox[itemId="cmb_mode"]').getValue();

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
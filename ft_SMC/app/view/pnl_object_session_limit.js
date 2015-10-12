
Ext.define('SMC.view.pnl_object_session_limit', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_session_limit',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: '세션 제한',
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
                    itemId: 'ctn_session_limit',
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
                            xtype: 'fieldset',
                            flex: 1,
                            padding: 20,
                            title: '세션 제한',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'rdg_action',
                                    margin: 20,
                                    width: 400,
                                    fieldLabel: '동작모드',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_action0',
                                            name: 'action',
                                            boxLabel: '신규 세션/초',
                                            checked: true,
                                            inputValue: '0'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_action1',
                                            name: 'action',
                                            boxLabel: '사용자별 동시세션',
                                            inputValue: '1'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_action2',
                                            name: 'action',
                                            boxLabel: '세션별 사용량 제한',
                                            inputValue: '2'
                                        }
                                    ],
                                    listeners: {
                                        change: {
                                            fn: me.onRdg_actionChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_session_allow',
                                    margin: 20,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!LengthCheckFloat(value,10,10000)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_session_limit',
                                            fieldLabel: '허용 세션 수',
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            text: '( 입력범위 : 10 ~ 10000 )'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    itemId: 'ctn_session_deny',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '20 20 10 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!LengthCheckFloat(value,1,100000000)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_session_send',
                                                    fieldLabel: '제한크기 : 송신',
                                                    labelSeparator: '신',
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '0 0 0 20',
                                                    text: 'Kbyte'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '10 20 10 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!LengthCheckFloat(value,1,100000000)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_session_receive',
                                                    fieldLabel: '제한크기 : 수신',
                                                    labelSeparator: '신',
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    margin: '0 0 0 20',
                                                    text: 'Kbyte'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            margin: '0 0 0 85',
                                            text: '( 입력범위 : 1 ~ 100,000,000 )'
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
                                        button.up('window[itemId="pnl_object_session_limit"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_session_limit"]').destroy();
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
                    fn: me.onPnl_object_session_limitAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_session_limitBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onRdg_actionChange: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_session_limit"]');

        switch(newValue.action)
        {
            case '0':
            case '1':
                me.down('container[itemId="ctn_session_allow"]').show();
                me.down('container[itemId="ctn_session_deny"]').hide();
                break;
            case '2':
                me.down('container[itemId="ctn_session_allow"]').hide();
                me.down('container[itemId="ctn_session_deny"]').show();
                break;
        }
    },

    onPnl_object_session_limitAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
            }
        });
    },

    onPnl_object_session_limitBeforeDestroy: function(component, eOpts) {
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

        me.down('numberfield[itemId="nfd_session_limit"]').setValue(record.limit);
        me.down('numberfield[itemId="nfd_session_send"]').setValue(record.send);
        me.down('numberfield[itemId="nfd_session_receive"]').setValue(record.receive);

        switch(record.action)
        {
            case 0:
                me.down('container[itemId="ctn_session_allow"]').show();
                me.down('container[itemId="ctn_session_deny"]').hide();
                me.down('radiogroup[itemId="rdg_action"]').items.items[0].setValue(true);
                break;
            case 1:
                me.down('container[itemId="ctn_session_allow"]').show();
                me.down('container[itemId="ctn_session_deny"]').hide();
                me.down('radiogroup[itemId="rdg_action"]').items.items[1].setValue(true);
                break;
            case 2:
                me.down('container[itemId="ctn_session_allow"]').hide();
                me.down('container[itemId="ctn_session_deny"]').show();
                me.down('radiogroup[itemId="rdg_action"]').items.items[2].setValue(true);
                break;
        }

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

        var object_limit = me.down('numberfield[itemId="nfd_session_limit"]');
        var object_send = me.down('numberfield[itemId="nfd_session_send"]');
        var object_receive = me.down('numberfield[itemId="nfd_session_receive"]');

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

        me.object.action =  parseInt(me.down('radiogroup[itemId="rdg_action"]').getChecked()[0].inputValue);

        switch(me.object.action)
        {
            case 0:
            case 1:
                if(object_limit.getValue())
                {
                    if(object_limit.validate())
                    {
                        me.object.limit = object_limit.getValue();
                    }
                    else
                    {
                        alertMessage('유효하지 않은 값입니다.', object_limit);
                        return false;
                    }
                }
                else
                {
                    alertMessage('필수 입력 항목입니다.', object_limit);
                    return false;
                }

                break;
            case 2:
                if(object_send.getValue())
                {
                    if(object_send.validate())
                    {
                        me.object.send = object_send.getValue();
                    }
                    else
                    {
                        alertMessage('유효하지 않은 값입니다.', object_send);
                        return false;
                    }
                }
                else
                {
                    alertMessage('필수 입력 항목입니다.', object_send);
                    return false;
                }

                if(object_receive.getValue())
                {
                    if(object_receive.validate())
                    {
                        me.object.receive = object_receive.getValue();
                    }
                    else
                    {
                        alertMessage('유효하지 않은 값입니다.', object_receive);
                        return false;
                    }
                }
                else
                {
                    alertMessage('필수 입력 항목입니다.', object_receive);
                    return false;
                }

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
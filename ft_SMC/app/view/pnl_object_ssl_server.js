
Ext.define('SMC.view.pnl_object_ssl_server', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_ssl_server',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: '접근 서버',
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
                                            itemId: 'txf_ipAddress',
                                            fieldLabel: 'IP 주소',
                                            labelWidth: 60,
                                            msgTarget: 'none',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'container'
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
                                            itemId: 'txf_netMask',
                                            fieldLabel: '넷마스크',
                                            labelWidth: 60,
                                            msgTarget: 'none',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'container'
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
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
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
                afterrender: {
                    fn: me.onPnl_object_ssl_serverAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ssl_serverBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_ssl_serverAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
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

        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
        {
            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
            {
                me.object.ip = me.down('textfield[itemId="txf_ipAddress"]').getValue();
            }
            else
            {
                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                return false;
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
            else
            {
                alertMessage('넷마스크가 올바르지 않습니다.', me.down('textfield[itemId="txf_netMask"]'));
                return false;
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
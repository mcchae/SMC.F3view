
Ext.define('AUS.view.win_aus_config', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    height: 180,
    id: 'win_aus_config',
    width: 300,
    resizable: false,
    layout: 'fit',
    title: '환경 설정',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    margin: 5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txf_conf_mac_key',
                            fieldLabel: '인증키(MAC Key)',
                            labelWidth: 120
                        },
                        {
                            xtype: 'numberfield',
                            id: 'txf_conf_port',
                            fieldLabel: '통신포트',
                            labelWidth: 120
                        },
                        {
                            xtype: 'numberfield',
                            id: 'txf_conf_interval',
                            fieldLabel: '갱신주기',
                            labelWidth: 120
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 10
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_conf_ok',
                                    width: 80,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_conf_okClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_conf_cancel',
                                    width: 80,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_conf_cancelClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_aus_configAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_conf_okClick: function(button, e, eOpts) {
        key = Ext.getCmp('txf_conf_mac_key').getValue();
        port = Ext.getCmp('txf_conf_port').getValue();
        interval = Ext.getCmp('txf_conf_interval').getValue();

        if (key === '')
        {
            Ext.MessageBox.show({ title: '환경설정', msg: '인증키는 필수 입력 항목입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( 1 > port || port > 65535)
        {
            Ext.MessageBox.show({ title: '환경설정', msg: '포트 번호는 1 ~ 65535 사이의 정수만 입력이 가능 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( 1 > interval || interval > 60)
        {
            Ext.MessageBox.show({ title: '환경설정', msg: '갱신 주기는 1 ~ 60 사이의 정수만 입력이 가능 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }


        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetConfig',
                params : {
                    key : Ext.encode(key),
                    port : Ext.encode(port),
                    interval : Ext.encode(interval)
                },
                success : function(res_data)
                {
                    Ext.getCmp('win_aus_config').close();
                }
            }
        );


    },

    onBtn_conf_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_aus_config').close();
    },

    onWin_aus_configAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftAUS/GetConfig',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    Ext.getCmp('txf_conf_mac_key').setValue(resObj.key);
                    Ext.getCmp('txf_conf_port').setValue(resObj.port);
                    Ext.getCmp('txf_conf_interval').setValue(resObj.interval);
                }
            }
        );

    }

});
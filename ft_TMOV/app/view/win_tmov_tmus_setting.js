
Ext.define('TMOV.view.win_tmov_tmus_setting', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.button.Button'
    ],

    height: 205,
    id: 'win_tmov_tmus_setting',
    width: 452,
    constrainHeader: true,
    title: 'TMUS 설정',
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
                    xtype: 'fieldset',
                    margin: 10,
                    title: 'TMUS 설정',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txf_tmus_ip',
                            width: 300,
                            fieldLabel: 'TMUS 서버 주소',
                            labelWidth: 120
                        },
                        {
                            xtype: 'numberfield',
                            id: 'txf_tmus_port',
                            width: 300,
                            fieldLabel: '포트 번호',
                            labelWidth: 120,
                            maxValue: 65535,
                            minValue: 1
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    id: 'txf_tmus_server_renew',
                                    width: 300,
                                    fieldLabel: '갱신 주기',
                                    labelWidth: 120,
                                    maxValue: 24,
                                    minValue: 1
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_tmus_server_syn_run',
                                    width: 80,
                                    text: '즉시 갱신',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmus_server_syn_runClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 4
                        },
                        {
                            xtype: 'container',
                            height: 5
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id: 'btn_tmus_ok',
                            width: 80,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_tmus_okClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            id: 'btn_tmus_cancel',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onBtn_tmus_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_tmus_settingBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmus_server_syn_runClick: function(button, e, eOpts) {
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"서버팜 정보 갱신 중..."});
        myMask.show();

        Ext.getCmp('win_tmov_tmus_setting').disable();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SyncServerFarmsInfomation',
                params :
                {
                    host : Ext.encode(Ext.getCmp('txf_tmus_ip').getValue()),
                    port : Ext.encode(Ext.getCmp('txf_tmus_port').getValue())
                },
                success : function(res_data)
                {
                    Ext.getCmp('win_tmov_tmus_setting').enable();
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);

                    if(resObj === false)
                    {
                        Ext.MessageBox.show({ title : '서버팜 갱신 실패', msg : '서버팜 정보 갱신에 실패 하였습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                        return;
                    }

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetGroup',
                            params : {
                                user : Ext.encode(Ext.getCmp('main').user)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                Ext.getCmp('tpn_tmov_tree').setRootNode(resObj);
                                Ext.getCmp('tpn_tmov_tree').getSelectionModel().select(0);

                                Ext.getCmp('main').doComponentLayout();
                                Ext.MessageBox.show({ title : '서버팜 정보 갱신', msg : '서버팜 정보를 갱신 하였습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.INFO });
                                return;
                            }
                        }
                    );
                },
                failure : function(result, request)
                {
                    Ext.getCmp('win_tmov_tmus_setting').enable();
                    myMask.destroy();

                    Ext.MessageBox.show({ title : '서버팜 갱신 실패', msg : 'TMUS에 접속 할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                    return;
                }
            }
        );
    },

    onWindowAfterRender: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');

        if (pnl_tmov_main !== undefined)
        {
            clearInterval(pnl_tmov_main.timer);
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetTMUSConfig',
                success : function(res_data)
                {
                    var res = JSON.parse(res_data.responseText);

                    Ext.getCmp('txf_tmus_ip').setValue(res.ip);
                    Ext.getCmp('txf_tmus_port').setValue(res.port);

                    Ext.getCmp('txf_tmus_server_renew').setValue(res.sync_range);
                    component.config = res;
                }
            }
        );


    },

    onBtn_tmus_okClick: function(button, e, eOpts) {
        var config = Ext.getCmp('win_tmov_tmus_setting').config;
        config.ip = Ext.getCmp('txf_tmus_ip').getValue();
        config.port = Ext.getCmp('txf_tmus_port').getValue();
        config.sync_range = Ext.getCmp('txf_tmus_server_renew').getValue();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SetTMUSConfig',
                params : {
                    config : Ext.encode(config)
                },
                success : function(res_data)
                {
                    Ext.getCmp('win_tmov_tmus_setting').close();
                }
            }
        );
    },

    onBtn_tmus_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_tmus_setting').close();
    },

    onWin_tmov_tmus_settingBeforeDestroy: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');
        if (pnl_tmov_main !== undefined)
        {
            pnl_tmov_main.timer_tick();
        }
    }

});
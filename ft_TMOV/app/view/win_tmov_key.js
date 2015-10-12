
Ext.define('TMOV.view.win_tmov_key', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 130,
    id: 'win_tmov_key',
    width: 329,
    title: '인증 키',

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
                    flex: 1
                },
                {
                    xtype: 'container',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txf_tmov_key',
                            maxWidth: 260,
                            fieldLabel: '인증 키',
                            labelAlign: 'right',
                            labelWidth: 80
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1
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
                            id: 'btn_tmov_key_ok',
                            width: 80,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_tmov_key_okClick,
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
                            id: 'btn_tmov_key_cancel',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onBtn_tmov_key_cancelClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_keyAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_keyBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_key_okClick: function(button, e, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/ModifyKey',
                params : {
                    _id : Ext.encode(Ext.getCmp('win_tmov_key').item._id),
                    key : Ext.encode(Ext.getCmp('txf_tmov_key').getValue())
                },
                success : function(res_data)
                {

                    var treeview = Ext.getCmp('tpn_tmov_tree');
                    var selectedItem = treeview.getSelectionModel().getSelection();

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetDevices',
                            params : {
                                server_farm : Ext.encode(selectedItem[0].raw.server_farm),
                                user : Ext.encode(Ext.getCmp('main').user)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_tmov_device').loadData(resObj);
                            }
                        }
                    );

                    Ext.getCmp('win_tmov_key').close();
                }
            }
        );

    },

    onBtn_tmov_key_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_key').close();
    },

    onWin_tmov_keyAfterRender: function(component, eOpts) {
        clearInterval(Ext.getCmp('pnl_tmov_main').timer);

        item = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw;
        component.item = item;
        Ext.getCmp('txf_tmov_key').setValue(item.key);
    },

    onWin_tmov_keyBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('pnl_tmov_main').timer_tick();
    }

});
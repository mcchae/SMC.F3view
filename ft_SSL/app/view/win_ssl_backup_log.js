
Ext.define('SSL.view.win_ssl_backup_log', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Radio',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem'
    ],

    height: 150,
    id: 'win_ssl_backup_log',
    width: 306,
    title: '리포트 백업',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    margin: '6 6 6 6',
                    items: [
                        {
                            xtype: 'radiofield',
                            anchor: '100%',
                            id: 'rdo_ssl_none_backup',
                            name: 'backup',
                            boxLabel: '백업 사용하지 않음',
                            checked: true
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'rdo_ssl_use_backup',
                                    name: 'backup',
                                    boxLabel: '백업 기간 설정 :'
                                },
                                {
                                    xtype: 'container',
                                    width: 6
                                },
                                {
                                    xtype: 'cycle',
                                    id: 'menu_ssl_log_backup',
                                    width: 100,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        id: 'mn_ssl_log_backup',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '7',
                                                text: '일주일'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '30',
                                                text: '한달'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '60',
                                                text: '두달'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: '90',
                                                text: '세달'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 12
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
                                    id: 'btn_ssl_log_backup_ok',
                                    width: 80,
                                    text: '확인',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_ssl_log_backup_okClick,
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
                                    id: 'btn_ssl_log_backup_cancel',
                                    width: 80,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_ssl_log_backup_cancelClick,
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
                            height: 6
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_ssl_backup_logAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_ssl_log_backup_okClick: function(button, e, eOpts) {
        var config = Ext.getCmp('win_ssl_backup_log').config;
        var use = Ext.getCmp('rdo_ssl_use_backup').getValue();

        if (use === false)
        {
            config.use = false;
            config.period = '';
            config.last_backup = '';
        }
        else
        {
            config.use = true;
            config.period = Ext.getCmp('menu_ssl_log_backup').activeItem.stateId;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/ModifyConfig',
                params : {
                    'config' : Ext.encode(config)
                },
                success : function(res_data)
                {
                    Ext.getCmp('win_ssl_backup_log').close();
                }
            }
        );


    },

    onBtn_ssl_log_backup_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_ssl_backup_log').close();
    },

    onWin_ssl_backup_logAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetConfig',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    component.config = resObj;

                    if (resObj.use === true)
                    {
                        Ext.getCmp('rdo_ssl_use_backup').setValue(true);

                        if (resObj.period === "30")
                            Ext.getCmp('menu_ssl_log_backup').setActiveItem(Ext.getCmp('menu_ssl_log_backup').menu.items.items[1]);

                        if (resObj.period === "60")
                            Ext.getCmp('menu_ssl_log_backup').setActiveItem(Ext.getCmp('menu_ssl_log_backup').menu.items.items[2]);

                        if (resObj.period === "90")
                            Ext.getCmp('menu_ssl_log_backup').setActiveItem(Ext.getCmp('menu_ssl_log_backup').menu.items.items[3]);

                    }
                }
            }
        );
    }

});
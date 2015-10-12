
Ext.define('TMOV.view.main_view', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.form.Label',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View'
    ],

    id: 'main_view',
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    alive_check: function(user_id) {
                        var component = Ext.getCmp('main');

                        Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/Alive_check',
                            params : {
                                user_id : Ext.encode(component.user.userid),
                                code : component.user.code
                            },
                            success : function(res_data)
                            {

                            }
                        }
                        );

                        if (component.user.level === 0)
                        {
                            var user_info = component.user.userid + ' (최상위 관리자)';
                        }
                        else
                        {
                            var user_info = component.user.userid + '( ' + component.user.etc + ')';
                        }

                        Ext.getCmp('txf_tmov_login_info').setValue(user_info);


                        component.timer = function()
                        {
                            Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/Alive_check',
                                params : {
                                    user_id : Ext.encode(component.user.userid),
                                    code : component.user.code
                                },
                                success : function(res_data)
                                {
                                    var resObj = JSON.parse(res_data.responseText);
                                    if (resObj === false)
                                    {
                                        clearInterval(Ext.getCmp('main').timer);
                                        title = Ext.getCmp('pnl_tmov_header');
                                        title.height = 0;

                                        Ext.getCmp('tpn_tmov_tree').hide();
                                        Ext.getCmp('tpn_tmov_extension').hide();


                                        if (Ext.getCmp('win_tmov_server_list') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_server_list').close();
                                        }

                                        if (Ext.getCmp('win_tmov_policy_setting') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_policy_setting').close();
                                        }

                                        if (Ext.getCmp('win_tmov_policy_select') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_policy_select').close();
                                        }

                                        if (Ext.getCmp('win_tmov_detail') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_detail').close();
                                        }

                                        if (Ext.getCmp('win_tmov_device') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_device').close();
                                        }

                                        if (Ext.getCmp('win_tmov_extension') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_extension').close();
                                        }

                                        if (Ext.getCmp('win_tmov_manager') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_manager').close();
                                        }

                                        if (Ext.getCmp('win_tmov_send_policy') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_send_policy').close();
                                        }

                                        if (Ext.getCmp('win_tmov_user_setting') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_user_setting').close();
                                        }

                                        if (Ext.getCmp('win_tmov_agent') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_agent').close();
                                        }

                                        if (Ext.getCmp('win_tmov_pattern') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_pattern').close();
                                        }

                                        if (Ext.getCmp('win_tmov_user_send') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_user_send').close();
                                        }

                                        if (Ext.getCmp('win_tmov_upgrade') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_upgrade').close();
                                        }

                                        if (Ext.getCmp('win_tmov_user_policy') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_user_policy').close();
                                        }

                                        if (Ext.getCmp('win_tmov_tmus_setting') !== undefined)
                                        {
                                            Ext.getCmp('win_tmov_tmus_setting').close();
                                        }

                                        Ext.getCmp('btn_tmov_monitor').toggle(true);

                                        Ext.getCmp('pnl_tmov_working').removeAll();
                                        Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_login'));
                                        Ext.getCmp('main').doComponentLayout();
                                    }
                                }
                            }
                            );

                        };

                        component.timer = setInterval(component.timer, 3000);

                    },
                    border: false,
                    height: 250,
                    id: 'main',
                    width: 400,
                    layout: 'border',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'north',
                            border: false,
                            height: 76,
                            id: 'pnl_tmov_header',
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'container',
                                    region: 'north',
                                    height: 46,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: 10
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
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    style: 'font-size : 23px;color:white;font-weight:bold;',
                                                    text: 'WeGuardia™ TMSMC'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            width: 400,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    height: 150,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            flex: 1,
                                                            id: 'txf_tmov_login_info',
                                                            fieldLabel: '관리자 정보',
                                                            labelAlign: 'right',
                                                            labelStyle: 'color:white;font-size: 12px;font-weight: bold;',
                                                            fieldStyle: 'color:white;font-size: 12px;font-weight: bold;'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    border: false,
                                                    id: 'btn_tmov_logout',
                                                    width: 60,
                                                    text: '로그아웃',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_tmov_logoutClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    region: 'south',
                                    height: 30,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_monitor',
                                            margin: '0 0 3 5',
                                            width: 60,
                                            enableToggle: true,
                                            pressed: true,
                                            text: '모니터',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_monitorClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_extension',
                                            margin: '0 0 3 5',
                                            width: 60,
                                            enableToggle: true,
                                            text: '확장자',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_extensionClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_spd',
                                            margin: '0 0 3 5',
                                            width: 80,
                                            enableToggle: true,
                                            text: '사용자 정책',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_spdClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_server_list',
                                            margin: '0 0 3 5',
                                            width: 60,
                                            enableToggle: true,
                                            text: '서버 팜',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_server_listClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_event_log',
                                            margin: '0 0 3 5',
                                            width: 60,
                                            enableToggle: true,
                                            text: '감사로그',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_event_logClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 50,
                                            id: 'btn_tmov_log',
                                            margin: '0 0 3 5',
                                            width: 60,
                                            enableToggle: true,
                                            text: '로그',
                                            toggleGroup: 'menu',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_logClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 64,
                                            id: 'btn_tmov_tmus_setting',
                                            margin: '0 0 3 5',
                                            width: 80,
                                            text: 'TMUS 설정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_tmus_settingClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 64,
                                            id: 'btn_tmov_pattern_setting',
                                            margin: '0 0 3 5',
                                            width: 70,
                                            text: '패턴 버전',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_pattern_settingClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 64,
                                            id: 'btn_tmov_agent_setting',
                                            margin: '0 0 3 5',
                                            width: 90,
                                            text: '에이전트 버전',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_agent_settingClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            height: 64,
                                            id: 'btn_tmov_tmm_setting',
                                            margin: '0 0 3 5',
                                            width: 80,
                                            text: 'TMM 버전',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_tmm_settingClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'treepanel',
                            region: 'west',
                            split: true,
                            border: false,
                            hidden: true,
                            id: 'tpn_tmov_tree',
                            minWidth: 100,
                            width: 280,
                            collapsible: true,
                            title: '서버팜 목록',
                            viewConfig: {

                            },
                            listeners: {
                                itemclick: {
                                    fn: me.onTpn_tmov_treeItemClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'treepanel',
                            region: 'west',
                            split: true,
                            border: false,
                            hidden: true,
                            id: 'tpn_tmov_extension',
                            width: 280,
                            collapsible: true,
                            title: '확장자 그룹',
                            viewConfig: {

                            },
                            listeners: {
                                itemclick: {
                                    fn: me.onTpn_tmov_extensionItemClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            region: 'center',
                            border: false,
                            id: 'pnl_tmov_working',
                            layout: 'fit',
                            header: false
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onMainAfterRender,
                            scope: me
                        },
                        beforedestroy: {
                            fn: me.onMainBeforeDestroy,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_tmov_logoutClick: function(button, e, eOpts) {
        clearInterval(Ext.getCmp('main').timer);

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/Logout',
                params : {
                    user_id : Ext.encode(Ext.getCmp('main').user.userid)
                },
                success : function(res_data)
                {

                }
            }
        );

        if (Ext.getCmp('win_tmov_server_list') !== undefined)
        {
            Ext.getCmp('win_tmov_server_list').close();
        }

        if (Ext.getCmp('win_tmov_policy_setting') !== undefined)
        {
            Ext.getCmp('win_tmov_policy_setting').close();
        }

        if (Ext.getCmp('win_tmov_policy_select') !== undefined)
        {
            Ext.getCmp('win_tmov_policy_select').close();
        }

        if (Ext.getCmp('win_tmov_detail') !== undefined)
        {
            Ext.getCmp('win_tmov_detail').close();
        }

        if (Ext.getCmp('win_tmov_device') !== undefined)
        {
            Ext.getCmp('win_tmov_device').close();
        }

        if (Ext.getCmp('win_tmov_extension') !== undefined)
        {
            Ext.getCmp('win_tmov_extension').close();
        }

        if (Ext.getCmp('win_tmov_manager') !== undefined)
        {
            Ext.getCmp('win_tmov_manager').close();
        }

        if (Ext.getCmp('win_tmov_send_policy') !== undefined)
        {
            Ext.getCmp('win_tmov_send_policy').close();
        }

        if (Ext.getCmp('win_tmov_user_setting') !== undefined)
        {
            Ext.getCmp('win_tmov_user_setting').close();
        }

        if (Ext.getCmp('win_tmov_agent') !== undefined)
        {
            Ext.getCmp('win_tmov_agent').close();
        }

        if (Ext.getCmp('win_tmov_pattern') !== undefined)
        {
            Ext.getCmp('win_tmov_pattern').close();
        }

        if (Ext.getCmp('win_tmov_user_send') !== undefined)
        {
            Ext.getCmp('win_tmov_user_send').close();
        }

        if (Ext.getCmp('win_tmov_upgrade') !== undefined)
        {
            Ext.getCmp('win_tmov_upgrade').close();
        }

        if (Ext.getCmp('win_tmov_user_policy') !== undefined)
        {
            Ext.getCmp('win_tmov_user_policy').close();
        }

        if (Ext.getCmp('win_tmov_tmus_setting') !== undefined)
        {
            Ext.getCmp('win_tmov_tmus_setting').close();
        }

        Ext.getCmp('btn_tmov_monitor').toggle(true);

        title = Ext.getCmp('pnl_tmov_header');
        title.height = 0;

        Ext.getCmp('tpn_tmov_tree').hide();
        Ext.getCmp('tpn_tmov_extension').hide();

        Ext.getCmp('pnl_tmov_working').removeAll();
        Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_login'));

        Ext.getCmp('main').doComponentLayout();

    },

    onBtn_tmov_monitorClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('tpn_tmov_tree').show();
            Ext.getCmp('tpn_tmov_extension').hide();
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_main'));
        }
    },

    onBtn_tmov_extensionClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('tpn_tmov_extension').show();
            Ext.getCmp('tpn_tmov_tree').hide();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_extension'));
        }
    },

    onBtn_tmov_spdClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('tpn_tmov_tree').show();
            Ext.getCmp('tpn_tmov_extension').hide();
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_user_policy'));
        }
    },

    onBtn_tmov_server_listClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('tpn_tmov_tree').show();
            Ext.getCmp('tpn_tmov_extension').hide();
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_server_list'));
        }
    },

    onBtn_tmov_event_logClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('tpn_tmov_tree').show();
            Ext.getCmp('tpn_tmov_extension').hide();
            Ext.getCmp('tpn_tmov_tree').hide();
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_event_log'));
        }
    },

    onBtn_tmov_logClick: function(button, e, eOpts) {
        if(button.pressed === false)
        {
            button.toggle();
        }
        else
        {
            Ext.getCmp('tpn_tmov_tree').hide();
            Ext.getCmp('tpn_tmov_extension').hide();
            Ext.getCmp('pnl_tmov_working').removeAll();
            Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_log'));
        }
    },

    onBtn_tmov_tmus_settingClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_tmus_setting').show().center();

    },

    onBtn_tmov_pattern_settingClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_pattern_config',{
            isSelect : false
        }).show().center();

    },

    onBtn_tmov_agent_settingClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_agent_config',{
            isSelect : false
        }).show().center();

    },

    onBtn_tmov_tmm_settingClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_tmm_config',{
            isSelect : false
        }).show().center();

    },

    onTpn_tmov_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('btn_tmov_monitor').pressed === true)
        {
            Ext.getCmp('gpn_tmov_main').isSearch = false;

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetDevices',
                    params : {
                        server_farm : Ext.encode(record.raw.server_farm),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_tmov_device').loadData(resObj);
                    }
                }
            );
        }

        if (Ext.getCmp('btn_tmov_spd').pressed === true)
        {
            Ext.getStore('st_tmov_user_policy').getProxy().extraParams = {
                query : Ext.encode({'server_farm' : record.raw.server_farm}),
                user : Ext.encode(Ext.getCmp('main').user)
            };


            Ext.getStore('st_tmov_user_policy').loadPage(1);
        }


        if (Ext.getCmp('btn_tmov_server_list').pressed === true)
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetServerList',
                    params : {
                        server_farm : Ext.encode(record.raw.server_farm),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res)
                    {
                        var retVal = JSON.parse(res.responseText);
                        Ext.getStore('st_tmov_server_list').loadData(retVal);
                    }
                }
            );

        }

    },

    onTpn_tmov_extensionItemClick: function(dataview, record, item, index, e, eOpts) {
        var store = Ext.getStore('st_tmov_extension');
        var gpn_tmov_extension_view = Ext.getCmp('gpn_tmov_extension_view');

        Ext.getCmp('gpn_tmov_extension_view').isSearch = false;

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtension',
                params : {
                    group_name : Ext.encode(record.raw.text)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    store.loadData(resObj);
                    gpn_tmov_extension_view.reconfigure(store);
                }
            }
        );

    },

    onMainAfterRender: function(component, eOpts) {
        title = Ext.getCmp('pnl_tmov_header');
        title.height = 0;

        Ext.getCmp('pnl_tmov_working').add(Ext.create('TMOV.view.pnl_tmov_login'));
    },

    onMainBeforeDestroy: function(component, eOpts) {
        clearInterval(component.timer);
        clearInterval(component.ha_timer);

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/Logout',
                params : {
                    user_id : Ext.encode(Ext.getCmp('main').user_id)
                },
                success : function(res_data)
                {
                }
            }
        );
    }

});
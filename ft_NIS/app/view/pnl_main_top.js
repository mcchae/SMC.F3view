
Ext.define('SMC.view.pnl_main_top', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    height: 50,
    id: 'pnl_main_top',
    width: 1024,
    layout: 'border',
    header: false,
    manageHeight: false,
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    region: 'west',
                    cls: 'top_smc_logo',
                    id: 'cont_SMC_logo',
                    minWidth: 250,
                    width: 300
                },
                {
                    xtype: 'container',
                    flex: 3,
                    region: 'west',
                    maxWidth: 450,
                    width: 150,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margins: '0',
                            border: '',
                            cls: 'smc_top_device',
                            height: 60,
                            id: 'btn_SMC_main_Device',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_DeviceClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_policies',
                            height: 60,
                            id: 'btn_SMC_main_policies',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_policiesClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_objects',
                            height: 60,
                            id: 'btn_SMC_main_Objects',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_ObjectsClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_apt',
                            height: 60,
                            id: 'btn_SMC_main_Apt',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_ObjectsClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_wips',
                            height: 60,
                            id: 'btn_SMC_main_Wips',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_ObjectsClick11,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_objects',
                            height: 60,
                            hidden: true,
                            id: 'btn_SMC_main_Vms',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_VmsClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_config',
                            height: 60,
                            id: 'btn_SMC_main_Config',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_ConfigClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_monitor',
                            height: 60,
                            hidden: true,
                            id: 'btn_SMC_main_monitor',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_monitorClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '0',
                            cls: 'smc_top_log',
                            height: 60,
                            hidden: true,
                            id: 'btn_SMC_main_Log',
                            style: 'border:0',
                            width: 73,
                            shadow: false,
                            allowDepress: false,
                            iconAlign: 'top',
                            iconCls: '',
                            text: '',
                            listeners: {
                                click: {
                                    fn: me.onBtn_SMC_main_LogClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    region: 'east',
                    hidden: true,
                    width: 150,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',
                            margin: '0 10 0 0',
                            text: '대시보드',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            text: '서버 모니터',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'east',
                    hidden: true,
                    minWidth: 100,
                    width: 100,
                    layout: 'border',
                    items: [
                        {
                            xtype: 'label',
                            region: 'center',
                            itemId: 'empty',
                            maxHeight: 30,
                            minWidth: 150,
                            text: ''
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'east',
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
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            itemId: 'login_company',
                                            maxHeight: 30,
                                            style: {
                                                'font-weight': 'bold',
                                                'font-size': 14,
                                                color: 'white'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 5 0 5',
                                            style: {
                                                'font-weight': 'bold',
                                                'font-size': 14,
                                                color: 'white'
                                            },
                                            text: '/'
                                        },
                                        {
                                            xtype: 'label',
                                            itemId: 'login_id',
                                            margin: '0 10 0 0',
                                            maxHeight: 30,
                                            style: {
                                                'font-weight': 'bold',
                                                'font-size': 14,
                                                color: 'white'
                                            },
                                            text: ''
                                        },
                                        {
                                            xtype: 'label',
                                            itemId: 'login_info',
                                            margin: '0 10 0 0',
                                            maxHeight: 30,
                                            style: {
                                                color: 'white'
                                            },
                                            text: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: 'logout',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_SMC_main_DeviceClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_smc_device_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_policiesClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        //var _west = Ext.getCmp('cont_SMC_main_west');
        var _center = Ext.getCmp('cont_SMC_main_center');

        //_west.removeAll(true);
        _center.removeAll(true);
        //_west.add(Ext.create('SMC.view.pnl_policy_group',{}));
        _center.add(Ext.create('SMC.view.pnl_policy_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_ObjectsClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        //var _west = Ext.getCmp('cont_SMC_main_west');
        var _center = Ext.getCmp('cont_SMC_main_center');

        //_west.removeAll(true);
        _center.removeAll(true);

        //_west.add(Ext.create('SMC.view.trpn_objectMenu',{}));
        _center.add(Ext.create('SMC.view.pnl_object_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_ObjectsClick1: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        //var _west = Ext.getCmp('cont_SMC_main_west');
        var _center = Ext.getCmp('cont_SMC_main_center');

        //_west.removeAll(true);
        _center.removeAll(true);

        //_west.add(Ext.create('SMC.view.trpn_objectMenu',{}));
        _center.add(Ext.create('SMC.view.pnl_apt_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_ObjectsClick11: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        //var _west = Ext.getCmp('cont_SMC_main_west');
        var _center = Ext.getCmp('cont_SMC_main_center');

        //_west.removeAll(true);
        _center.removeAll(true);

        //_west.add(Ext.create('SMC.view.trpn_objectMenu',{}));
        _center.add(Ext.create('SMC.view.pnl_wips_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_VmsClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_vms_main',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_ConfigClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_setting_view',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_monitorClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_rtm_main',{}));

        this.button_toggle(button);
    },

    onBtn_SMC_main_LogClick: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_log_view',{}));

        this.button_toggle(button);
    },

    onButtonClick1: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_dash_main',{}));

        this.button_toggle(button);
    },

    onButtonClick2: function(button, e, eOpts) {
        var _main = Ext.getCmp('vp_SMC_mainView');
        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_mon_main',{}));

        this.button_toggle(button);
    },

    onButtonClick: function(button, e, eOpts) {
        var main = Ext.getCmp('vp_SMC_mainView');

        main.logout(true);
    },

    show_view: function(_ct_itemid) {
        var me = this;

        var _center = Ext.getCmp('cont_SMC_main_center');

        _center.removeAll(true);
        _center.add(Ext.create('SMC.view.pnl_smc_device_view',{}));

        var _cmp = me.query('panel[itemId=' + _ct_itemid + ']');

        if(_cmp){

            var _pnl = _cmp[0];

            if(_pnl.ishidden()){}

        }
        else{

            _center.add(Ext.create('SMC.view.pnl_smc_device_view',{ 'itemid' : _ct_itemid }));

        }
    },

    button_toggle: function(button) {
        Ext.each(Ext.ComponentQuery.query('panel[id="pnl_main_top"] > container > button'), function(button_data, idx){

            if(button_data === button){

                if(button_data.pressed === false){

                    button.toggle();

                }

            }
            else if(button_data.pressed === true){

                button_data.toggle();

            }

        });
    }

});
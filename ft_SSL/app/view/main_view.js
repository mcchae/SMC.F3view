
Ext.define('SSL.view.main_view', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.panel.Panel',
        'Ext.button.Button'
    ],

    itemId: 'main_view',
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    id: 'main_panel',
                    itemId: 'main_panel',
                    layout: 'border',
                    header: false,
                    items: [
                        {
                            xtype: 'panel',
                            region: 'north',
                            border: false,
                            height: 50,
                            id: 'title_panel',
                            itemId: 'title_panel',
                            layout: 'border',
                            collapsed: false,
                            collapsible: false,
                            header: false,
                            items: [
                                {
                                    xtype: 'container',
                                    region: 'west',
                                    cls: 'ssl_logo',
                                    width: 305,
                                    shadow: false
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    region: 'center',
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'menu_monitor',
                                            height: 50,
                                            width: 70,
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'menu_report',
                                            height: 50,
                                            width: 70,
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'menu_manager',
                                            height: 50,
                                            width: 70,
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick3,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    region: 'east',
                                    width: 70,
                                    shadow: false,
                                    items: [
                                        {
                                            xtype: 'button',
                                            border: false,
                                            cls: 'menu_logout',
                                            height: 50,
                                            width: 70,
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            region: 'center',
                            border: false,
                            id: 'working_panel',
                            itemId: 'working_panel',
                            layout: 'fit',
                            header: false
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onMain_panelAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('working_panel').removeAll();
        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_devices'));
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('working_panel').removeAll();
        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_log'));
    },

    onButtonClick3: function(button, e, eOpts) {
        Ext.getCmp('working_panel').removeAll();
        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_user'));
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.getCmp('title_panel').height = 0;
        Ext.getCmp('working_panel').removeAll();
        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_login'));

        Ext.getCmp('main_panel').doComponentLayout();
    },

    onMain_panelAfterRender: function(component, eOpts) {
        title = Ext.getCmp('title_panel');
        title.height = 0;

        Ext.getCmp('working_panel').add(Ext.create('SSL.view.pnl_ssl_login'));
    }

});
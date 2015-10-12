
Ext.define('SMC4ZEN.view.ctn_smc_mainmenu', {
    extend: 'Ext.container.Container',

    requires: [
        'SMC4ZEN.view.ctn_smc_mainmenuViewModel',
        'SMC4ZEN.view.ctn_smc_mainmenuViewController',
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    controller: 'ctn_smc_mainmenu',
    viewModel: {
        type: 'ctn_smc_mainmenu'
    },
    height: 60,
    id: 'ctn_smc_mainmenu',

    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items: [
        {
            xtype: 'container',
            cls: 'smc_mainmenu_logo',
            height: 35,
            itemId: 'ctn_smc_logo',
            margin: '0, 10, 0, 0',
            width: 280
        },
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_smc_menu',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'bt_smc_zen',
                    cls: 'smc_mainmenu_zen',
                    height: 51,
                    itemId: 'bt_smc_dash',
                    margin: '0, 5, 0, 0',
                    width: 66,
                    allowDepress: false,
                    text: 'DASH',
                    listeners: {
                        click: 'onBt_smc_dashClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'bt_smc_zen',
                    cls: 'smc_mainmenu_zen',
                    height: 51,
                    itemId: 'bt_smc_zen',
                    margin: '0, 5, 0, 0',
                    width: 66,
                    enableToggle: true,
                    pressed: true,
                    text: 'ZEN',
                    listeners: {
                        click: 'onBt_smc_zenClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'bt_smc_xtm',
                    cls: 'smc_mainmenu_xtm',
                    height: 51,
                    itemId: 'bt_smc_xtm',
                    margin: '0, 5, 0, 0',
                    width: 66,
                    enableToggle: true,
                    text: 'XTM',
                    listeners: {
                        click: 'onBt_smc_xtmClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'bt_smc_config',
                    cls: 'smc_mainmenu_xtm',
                    height: 51,
                    itemId: 'bt_smc_config',
                    margin: '0, 5, 0, 0',
                    width: 66,
                    enableToggle: true,
                    text: 'CONF',
                    listeners: {
                        click: 'onBt_smc_configClick'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_smc_account',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'bt_smc_logout',
                    cls: 'smc_mainmenu_logout',
                    height: 51,
                    itemId: 'bt_smc_logout',
                    margin: '0, 5, 0, 0',
                    width: 66,
                    text: 'OUT',
                    listeners: {
                        click: 'onBt_smc_logoutClick'
                    }
                }
            ]
        }
    ]

});

Ext.define('SMC4ZEN.view.pnl_setting_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_view',

    requires: [
        'SMC4ZEN.view.pnl_setting_viewViewModel',
        'SMC4ZEN.view.trpn_settingMenu',
        'SMC4ZEN.view.pnl_setting_server',
        'SMC4ZEN.view.pnl_setting_admin',
        'SMC4ZEN.view.pnl_setting_config_backup',
        'SMC4ZEN.view.pnl_setting_audit',
        'SMC4ZEN.view.pnl_setting_report',
        'Ext.tree.Panel'
    ],

    viewModel: {
        type: 'pnl_setting_view'
    },
    id: 'pnl_setting_view',

    layout: {
        type: 'border',
        regionWeights: {
            north: 20,
            south: 10,
            center: 0,
            west: -10,
            east: -20
        }
    },
    items: [
        {
            xtype: 'trpn_settingMenu',
            region: 'west',
            split: true
        },
        {
            xtype: 'pnl_setting_server',
            region: 'center'
        },
        {
            xtype: 'pnl_setting_admin',
            region: 'center'
        },
        {
            xtype: 'pnl_setting_config_backup',
            region: 'center'
        },
        {
            xtype: 'pnl_setting_audit',
            region: 'center'
        },
        {
            xtype: 'pnl_setting_report',
            region: 'center'
        }
    ]

});
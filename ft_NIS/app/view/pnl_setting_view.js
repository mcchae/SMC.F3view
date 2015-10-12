
Ext.define('SMC.view.pnl_setting_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_view',

    requires: [
        'SMC.view.trpn_settingMenu',
        'SMC.view.pnl_setting_server',
        'SMC.view.pnl_setting_admin',
        'SMC.view.pnl_setting_config_backup',
        'SMC.view.pnl_setting_audit',
        'SMC.view.pnl_setting_report',
        'Ext.tree.Panel'
    ],

    border: 2,
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

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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

        me.callParent(arguments);
    }

});
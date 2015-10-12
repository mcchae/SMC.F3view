
Ext.define('SMC4ZEN.view.pnl_object_view', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_object_view',

    requires: [
        'SMC4ZEN.view.pnl_object_viewViewModel',
        'SMC4ZEN.view.trpn_objectMenu',
        'SMC4ZEN.view.pnl_objectList',
        'Ext.tree.Panel'
    ],

    viewModel: {
        type: 'pnl_object_view'
    },
    id: 'pnl_object_view',

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
            xtype: 'trpn_objectMenu',
            region: 'west',
            split: true
        },
        {
            xtype: 'pnl_objectList',
            region: 'center'
        }
    ]

});
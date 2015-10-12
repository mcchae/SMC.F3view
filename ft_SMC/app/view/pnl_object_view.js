
Ext.define('SMC.view.pnl_object_view', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC.view.trpn_objectMenu',
        'SMC.view.pnl_objectList',
        'Ext.tree.Panel'
    ],

    border: 2,

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

        me.callParent(arguments);
    }

});
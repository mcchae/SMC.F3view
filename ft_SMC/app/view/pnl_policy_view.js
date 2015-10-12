
Ext.define('SMC.view.pnl_policy_view', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC.view.pnl_policy_group',
        'Ext.tab.Panel'
    ],

    height: 806,
    width: 1820,
    collapseDirection: 'top',
    collapseFirst: false,
    collapsed: false,
    collapsible: false,
    title: '',
    titleCollapse: true,

    layout: {
        type: 'border',
        regionWeights: {
            north: 0,
            south: 10,
            center: 70,
            west: 40,
            east: -20
        }
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                split: true,
                bodyPadding: 0
            },
            items: [
                {
                    xtype: 'pnl_policy_group2',
                    minWidth: 50,
                    collapsed: false,
                    region: 'west'
                },
                {
                    xtype: 'tabpanel',
                    region: 'center',
                    itemId: 'tab_spds',
                    closable: true,
                    collapseFirst: false,
                    title: '정책 목록',
                    titleCollapse: true,
                    listeners: {
                        beforeclose: {
                            fn: me.onTab_spdsBeforeClose,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onTab_spdsBeforeClose: function(panel, eOpts) {
        panel.removeAll();

        return false;
    }

});
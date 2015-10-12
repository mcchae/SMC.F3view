
Ext.define('SMC.view.pnl_smc_device_tree_view', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.smc_device_tree',

    requires: [
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop'
    ],

    id: 'pnl_smc_device_tree_view',
    width: 250,
    title: 'XTM',
    hideHeaders: true,
    animate: true,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                itemId: 'trv_smc_device_view',
                preserveScrollOnRefresh: true,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                        allowContainerDrops: true,
                        containerScroll: true,
                        ddGroup: 'groupDevice'
                    })
                ]
            }
        });

        me.callParent(arguments);
    }

});
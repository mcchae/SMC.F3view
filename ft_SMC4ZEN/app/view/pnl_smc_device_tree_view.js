
Ext.define('SMC4ZEN.view.pnl_smc_device_tree_view', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.smc_device_tree',

    requires: [
        'SMC4ZEN.view.pnl_smc_device_tree_viewViewModel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop'
    ],

    viewModel: {
        type: 'pnl_smc_device_tree_view'
    },
    id: 'pnl_smc_device_tree_view',
    width: 250,
    title: 'XTM',
    hideHeaders: true,
    animate: true,
    useArrows: true,

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
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
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    }

});
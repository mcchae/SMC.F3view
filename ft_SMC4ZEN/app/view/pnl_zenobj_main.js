
Ext.define('SMC4ZEN.view.pnl_zenobj_main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_zenobj_main',

    requires: [
        'SMC4ZEN.view.pnl_zenobj_mainViewModel',
        'SMC4ZEN.view.pnl_zenobj_mainViewController',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop'
    ],

    controller: 'pnl_zenobj_main',
    viewModel: {
        type: 'pnl_zenobj_main'
    },
    itemId: 'pnl_zenobj_main',
    layout: 'border',
    title: '',

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            itemId: 'pnl_zenobj_west',
            width: 250,
            animCollapse: true,
            collapsible: true,
            title: 'ZEN 객체 메뉴',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'treepanel',
                    flex: 1,
                    reference: 'zen_commobj_group',
                    itemId: 'pnl_zenobj_group',
                    width: 250,
                    animCollapse: true,
                    title: '',
                    rootVisible: false,
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'treeviewdragdrop'
                            }
                        ]
                    },
                    listeners: {
                        afterrender: 'onPnl_zenobj_groupAfterRender',
                        select: 'onPnl_zenobj_groupSelect'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            reference: 'zen_commobj_center',
            itemId: 'pnl_zenobj_center',
            layout: 'fit',
            title: ''
        }
    ]

});
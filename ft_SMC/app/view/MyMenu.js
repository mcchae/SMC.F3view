
Ext.define('SMC.view.MyMenu', {
    extend: 'Ext.menu.Menu',

    requires: [
        'Ext.menu.Item',
        'Ext.menu.Menu'
    ],

    width: 120,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'Menu Item'
                },
                {
                    xtype: 'menuitem',
                    text: 'Menu Item'
                },
                {
                    xtype: 'menuitem',
                    text: 'Menu Item',
                    menu: {
                        xtype: 'menu',
                        width: 120,
                        items: [
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            },
                            {
                                xtype: 'menuitem',
                                text: 'Menu Item'
                            }
                        ]
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});
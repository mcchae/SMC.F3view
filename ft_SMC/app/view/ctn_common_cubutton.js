
Ext.define('SMC.view.ctn_common_cubutton', {
    extend: 'Ext.container.Container',
    alias: 'widget.ctn_common_cubutton1',

    requires: [
        'Ext.button.Button'
    ],

    itemId: 'ctn_common_cubutton',

    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'end'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_add',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '추 가'
                },
                {
                    xtype: 'button',
                    margins: '0, 5, 0, 0',
                    itemId: 'bt_mod',
                    width: 100,
                    text: '수 정'
                }
            ]
        });

        me.callParent(arguments);
    }

});
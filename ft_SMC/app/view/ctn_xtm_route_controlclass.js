
Ext.define('SMC.view.ctn_xtm_route_controlclass', {
    extend: 'Ext.container.Container',
    alias: 'widget.ctn_xtm_route_controlclass',

    requires: [
        'Ext.button.Button'
    ],

    itemId: 'ctn_xtm_route_controlclass',
    margin: '0, 0, 5, 0',
    padding: 10,

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'end'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_add',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '추 가'
                },
                {
                    xtype: 'button',
                    itemId: 'bt_mod',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '수 정'
                },
                {
                    xtype: 'button',
                    itemId: 'bt_del',
                    width: 100,
                    text: '삭제'
                }
            ]
        });

        me.callParent(arguments);
    }

});

Ext.define('SMC4ZEN.view.ctn_multi_control', {
    extend: 'Ext.container.Container',
    alias: 'widget.ctn_multi_control',

    requires: [
        'Ext.button.Button'
    ],

    itemId: 'ctn_bridge_control',

    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'end'
    },
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
            itemId: 'bt_mod',
            margin: '0, 5, 0, 0',
            width: 100,
            text: '수 정'
        },
        {
            xtype: 'button',
            itemId: 'bt_del',
            width: 100,
            text: '삭 제'
        }
    ]

});
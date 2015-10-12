
Ext.define('SMC4ZEN.view.tool_smc_object_control', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.smc_object_control',

    requires: [
        'SMC4ZEN.view.tool_smc_object_controlViewModel',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'smc_object_control'
    },
    itemId: 'tool_smc_object_control',
    width: 400,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'button',
            disabled: true,
            itemId: 'addObject',
            width: 100,
            text: '객체 등록'
        },
        {
            xtype: 'button',
            disabled: true,
            itemId: 'modObject',
            width: 100,
            text: '객체 수정'
        },
        {
            xtype: 'button',
            disabled: true,
            itemId: 'delObject',
            width: 100,
            text: '객체 삭제'
        }
    ]

});
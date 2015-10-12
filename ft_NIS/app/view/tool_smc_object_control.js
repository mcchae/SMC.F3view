
Ext.define('SMC.view.tool_smc_object_control', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.smc_object_control',

    requires: [
        'Ext.button.Button'
    ],

    itemId: 'tool_smc_object_control',
    width: 400,

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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

        me.callParent(arguments);
    }

});
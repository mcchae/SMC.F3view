
Ext.define('SMC4ZEN.view.pnl_migration_result', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_migration_result',

    requires: [
        'SMC4ZEN.view.pnl_migration_resultViewModel',
        'Ext.form.field.TextArea',
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_migration_result'
    },
    border: false,
    height: 600,
    itemId: 'pnl_migration_result',
    minHeight: 600,
    minWidth: 450,
    resizable: true,
    scrollable: true,
    width: 450,
    constrainHeader: true,
    title: '마이그레이션 결과',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'textareafield',
            flex: 1,
            itemId: 'txa_migration',
            margin: '20 20 10 20',
            readOnly: true
        },
        {
            xtype: 'container',
            margin: '0 20 10 20',
            width: 635,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        button.up('window[itemId="pnl_migration_result"]').destroy();
                    },
                    width: 100,
                    text: '확인'
                }
            ]
        }
    ],

    loadData: function(record) {
        var me = this;

        me.down('textarea[itemId="txa_migration"]').setValue(record);

        me.show();
    }

});
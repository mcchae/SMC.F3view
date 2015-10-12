
Ext.define('SMC.view.pnl_migration_result', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.TextArea',
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_migration_result',
    minHeight: 600,
    minWidth: 450,
    width: 450,
    autoScroll: true,
    resizable: true,
    constrainHeader: true,
    title: '마이그레이션 결과',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
            ]
        });

        me.callParent(arguments);
    },

    loadData: function(record) {
        var me = this;

        me.down('textarea[itemId="txa_migration"]').setValue(record);

        me.show();
    }

});
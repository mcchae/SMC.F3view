
Ext.define('SSL.view.MyWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox'
    ],

    height: 354,
    width: 460,
    title: '검색조건',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 10
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'combobox',
                            width: 220,
                            fieldLabel: '분류',
                            labelWidth: 60
                        },
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'textfield',
                            width: 200
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});
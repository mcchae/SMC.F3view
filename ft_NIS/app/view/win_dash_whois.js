
Ext.define('SMC.view.win_dash_whois', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.TextArea'
    ],

    height: 567,
    width: 860,
    autoScroll: true,
    layout: 'fit',
    title: 'whois',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textareafield',
                    id: 'txt_dash_whois'
                }
            ]
        });

        me.callParent(arguments);
    }

});

Ext.define('SMC.store.st_SettingAuditUser', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SettingAuditUser',
            fields: [
                {
                    name: 'option_text'
                },
                {
                    name: 'option_value'
                }
            ]
        }, cfg)]);
    }
});
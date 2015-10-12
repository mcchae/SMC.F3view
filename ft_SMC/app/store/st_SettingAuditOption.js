
Ext.define('SMC.store.st_SettingAuditOption', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SettingAuditOption',
            fields: [
                {
                    name: 'option'
                }
            ]
        }, cfg)]);
    }
});
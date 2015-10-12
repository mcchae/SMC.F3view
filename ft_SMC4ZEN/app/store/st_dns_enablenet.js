
Ext.define('SMC4ZEN.store.st_dns_enablenet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dns_enablenet',
            fields: [
                {
                    name: 'ip'
                },
                {
                    name: 'netmask'
                }
            ]
        }, cfg)]);
    }
});
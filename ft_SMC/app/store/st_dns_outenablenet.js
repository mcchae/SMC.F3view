
Ext.define('SMC.store.st_dns_outenablenet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dns_outenablenet',
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
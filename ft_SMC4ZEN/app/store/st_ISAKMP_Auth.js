
Ext.define('SMC4ZEN.store.st_ISAKMP_Auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_Auth',
            data: [
                {
                    auth: 'SHA1'
                },
                {
                    auth: 'SHA256'
                }
            ],
            fields: [
                {
                    name: 'auth'
                }
            ]
        }, cfg)]);
    }
});
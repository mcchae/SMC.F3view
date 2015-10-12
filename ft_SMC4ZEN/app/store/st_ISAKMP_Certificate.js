
Ext.define('SMC4ZEN.store.st_ISAKMP_Certificate', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_Certificate',
            data: [
                {
                    certificate: 'FSCenter'
                }
            ],
            fields: [
                {
                    name: 'certificate'
                }
            ]
        }, cfg)]);
    }
});
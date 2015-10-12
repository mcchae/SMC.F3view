
Ext.define('SMC.store.st_ISAKMP_Certificate', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
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

Ext.define('SMC.store.st_ISAKMP_IDType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_IDType',
            data: [
                {
                    type: 'ID_FQDN(2)'
                },
                {
                    type: 'ID_USER_FQDN(3)'
                },
                {
                    type: 'ID_IKE_ID(11)'
                }
            ],
            fields: [
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_IPSec_Gate_Isakmp_sa', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_Gate_Isakmp_sa',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '_id'
                },
                {
                    name: '_kind'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
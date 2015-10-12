
Ext.define('SMC.store.st_ISAKMP_IPSec', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_IPSec',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                },
                {
                    name: 'kind'
                }
            ]
        }, cfg)]);
    }
});
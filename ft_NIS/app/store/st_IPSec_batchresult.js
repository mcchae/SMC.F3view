
Ext.define('SMC.store.st_IPSec_batchresult', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_batchresult',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'errorType'
                }
            ]
        }, cfg)]);
    }
});
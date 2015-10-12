
Ext.define('SMC.store.st_common_alldeveth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_common_alldeveth',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
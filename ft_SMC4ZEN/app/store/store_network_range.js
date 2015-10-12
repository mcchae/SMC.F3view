
Ext.define('SMC4ZEN.store.store_network_range', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_network_range',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});
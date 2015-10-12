
Ext.define('SMC4ZEN.store.store_l2_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l2_type',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
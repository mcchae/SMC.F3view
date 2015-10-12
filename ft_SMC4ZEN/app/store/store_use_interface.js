
Ext.define('SMC4ZEN.store.store_use_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_use_interface',
            autoLoad: false,
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
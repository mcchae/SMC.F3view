
Ext.define('SMC4ZEN.store.store_rollback_appimg', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_rollback_appimg',
            autoLoad: false,
            fields: [
                {
                    name: 'value'
                },
                {
                    convert: function(v, rec) {
                        return rec.data.value.substring(0,4) + "-" + rec.data.value.substring(5,7) + "-" + rec.data.value.substring(8,10) + " " + rec.data.value.substring(11,13) + ":" +rec.data.value.substring(14,16);
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
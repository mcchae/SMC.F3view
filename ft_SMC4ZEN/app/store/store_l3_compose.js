
Ext.define('SMC4ZEN.store.store_l3_compose', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l3_compose',
            autoLoad: true,
            data: [
                {
                    val: 'Active-Active'
                },
                {
                    val: 'Active-Standby'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
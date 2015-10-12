
Ext.define('SMC4ZEN.store.store_split_zone', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_split_zone',
            data: [
                {
                    name: 'Internal',
                    val: 'internal'
                },
                {
                    name: 'External',
                    val: 'external'
                }
            ],
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
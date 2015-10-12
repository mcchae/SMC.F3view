
Ext.define('SMC4ZEN.store.store_split_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_split_type',
            data: [
                {
                    name: 'NS'
                },
                {
                    name: 'HOST'
                },
                {
                    name: 'MX'
                },
                {
                    name: 'ALIAS'
                }
            ],
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
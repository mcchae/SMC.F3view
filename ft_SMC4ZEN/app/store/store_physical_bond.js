
Ext.define('SMC4ZEN.store.store_physical_bond', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_physical_bond',
            data: [
                {
                    name: 'Group1'
                },
                {
                    name: 'Group2'
                },
                {
                    name: 'Group3'
                },
                {
                    name: 'Group4'
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
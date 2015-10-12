
Ext.define('SMC4ZEN.store.store_physical_link', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_physical_link',
            data: [
                {
                    name: 'Pack1'
                },
                {
                    name: 'Pack2'
                },
                {
                    name: 'Pack3'
                },
                {
                    name: 'Pack4'
                },
                {
                    name: 'Pack5'
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
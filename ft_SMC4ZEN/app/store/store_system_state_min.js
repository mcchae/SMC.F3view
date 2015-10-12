
Ext.define('SMC4ZEN.store.store_system_state_min', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_state_min',
            data: [
                {
                    val: '00'
                },
                {
                    val: '10'
                },
                {
                    val: '20'
                },
                {
                    val: '30'
                },
                {
                    val: '40'
                },
                {
                    val: '50'
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
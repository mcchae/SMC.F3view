
Ext.define('SMC4ZEN.store.store_l2_config_a', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l2_config_a',
            autoLoad: true,
            data: [
                {
                    val: 'Active(Main)'
                },
                {
                    val: 'Active(Sub)'
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
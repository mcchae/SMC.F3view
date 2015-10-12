
Ext.define('SMC4ZEN.store.store_l2_config_s', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l2_config_s',
            data: [
                {
                    val: 'Active(Main)'
                },
                {
                    val: 'Standby(Sub)'
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
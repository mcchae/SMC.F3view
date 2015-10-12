
Ext.define('SMC4ZEN.store.store_l3_config_s', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l3_config_s',
            data: [
                {
                    val: 'Active(Master)'
                },
                {
                    val: 'Standby(Backup)'
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
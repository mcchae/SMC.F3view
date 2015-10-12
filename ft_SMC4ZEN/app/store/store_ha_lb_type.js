
Ext.define('SMC4ZEN.store.store_ha_lb_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_lb_type',
            autoLoad: true,
            data: [
                {
                    val: 'Any'
                },
                {
                    val: 'Single'
                },
                {
                    val: 'Range'
                },
                {
                    val: 'Netmask'
                },
                {
                    val: 'Odd'
                },
                {
                    val: 'Even'
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

Ext.define('SMC4ZEN.store.store_l2_way_s', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l2_way_s',
            data: [
                {
                    val: 'Proxy'
                },
                {
                    val: 'VRRP'
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
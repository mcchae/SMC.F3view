
Ext.define('SMC4ZEN.store.store_vip_ipv4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_vip_ipv4',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});
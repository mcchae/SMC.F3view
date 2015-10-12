
Ext.define('SMC4ZEN.store.store_phy_ipv6', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_phy_ipv6',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});
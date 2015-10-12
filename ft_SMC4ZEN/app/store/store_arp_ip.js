
Ext.define('SMC4ZEN.store.store_arp_ip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_arp_ip',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});
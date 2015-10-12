
Ext.define('SMC.store.st_vpn_destination', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_destination',
            fields: [
                {
                    name: 'dest_ip'
                },
                {
                    name: 'tunnel_ip'
                }
            ]
        }, cfg)]);
    }
});
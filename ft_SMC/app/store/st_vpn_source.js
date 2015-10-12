
Ext.define('SMC.store.st_vpn_source', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_source',
            fields: [
                {
                    name: 'src_ip'
                },
                {
                    name: 'tunnel_ip'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_route_multicast_ethlist', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_multicast_ethlist',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
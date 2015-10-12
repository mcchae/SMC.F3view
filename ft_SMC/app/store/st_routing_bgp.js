
Ext.define('SMC.store.st_routing_bgp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_routing_bgp',
            fields: [
                {
                    name: 'distance'
                },
                {
                    name: 'endaddr'
                },
                {
                    name: 'flags'
                },
                {
                    name: 'gateway'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'metric'
                },
                {
                    name: 'uptime'
                }
            ]
        }, cfg)]);
    }
});
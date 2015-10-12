
Ext.define('SMC4ZEN.store.st_routing_static', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_routing_static',
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

Ext.define('SMC.store.st_route_static_ipv4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_static_ipv4',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@use'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'metric'
                },
                {
                    name: 'interface'
                },
                {
                    name: '@num'
                },
                {
                    name: 'policy'
                },
                {
                    name: 'gateway'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_route_policy_ipv6', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_policy_ipv6',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'policy'
                },
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_route_policy_ipv4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_policy_ipv4',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'policy'
                }
            ]
        }, cfg)]);
    }
});
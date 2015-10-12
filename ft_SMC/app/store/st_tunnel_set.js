
Ext.define('SMC.store.st_tunnel_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tunnel_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num'
                },
                {
                    name: 'index'
                },
                {
                    name: 'local'
                },
                {
                    name: 'remote'
                },
                {
                    name: 'ttl'
                }
            ]
        }, cfg)]);
    }
});
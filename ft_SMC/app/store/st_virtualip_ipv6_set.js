
Ext.define('SMC.store.st_virtualip_ipv6_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_virtualip_ipv6_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'prefix'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SSL.store.st_ssl_ipv6header', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_ipv6header',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'list'
                },
                {
                    name: 'name'
                },
                {
                    name: 'num'
                }
            ]
        }, cfg)]);
    }
});
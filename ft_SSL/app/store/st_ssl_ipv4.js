
Ext.define('SSL.store.st_ssl_ipv4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_ipv4',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'ip'
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
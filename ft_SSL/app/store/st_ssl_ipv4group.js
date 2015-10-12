
Ext.define('SSL.store.st_ssl_ipv4group', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_ipv4group',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'member_name'
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
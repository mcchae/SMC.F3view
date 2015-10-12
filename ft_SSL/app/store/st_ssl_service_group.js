
Ext.define('SSL.store.st_ssl_service_group', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_service_group',
            fields: [
                {
                    name: 'cid'
                },
                {
                    name: 'num'
                },
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});
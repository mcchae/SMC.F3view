
Ext.define('SSL.store.st_ssl_service_port', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_service_port',
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
                    name: 'protocol'
                },
                {
                    name: 'option'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});
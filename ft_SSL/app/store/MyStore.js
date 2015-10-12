
Ext.define('SSL.store.MyStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_auth_log',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'type'
                },
                {
                    name: 'login'
                },
                {
                    name: 'remote_ip'
                },
                {
                    name: 'virtual_ip'
                }
            ]
        }, cfg)]);
    }
});
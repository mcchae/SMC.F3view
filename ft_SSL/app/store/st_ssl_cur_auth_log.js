
Ext.define('SSL.store.st_ssl_cur_auth_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_cur_auth_log',
            fields: [
                {
                    name: 'timevalue'
                },
                {
                    name: 'server_ip'
                },
                {
                    name: 'logintype'
                },
                {
                    name: 'login'
                },
                {
                    name: 'code'
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
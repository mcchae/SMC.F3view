
Ext.define('SSL.store.st_ssl_curlog', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_curlog',
            fields: [
                {
                    name: 'timevalue'
                },
                {
                    name: 'server_ip'
                },
                {
                    name: 'login'
                },
                {
                    name: 'remote_ip'
                },
                {
                    name: 'virtual_ip'
                },
                {
                    name: 'logintype'
                },
                {
                    name: 'code'
                }
            ]
        }, cfg)]);
    }
});
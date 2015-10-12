
Ext.define('SSL.store.st_ssl_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'st_ssl_log',
            pageSize: 50,
            fields: [
                {
                    name: 'timevalue'
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
                },
                {
                    name: 'server_ip'
                }
            ],
            proxy: {
                type: 'jsonp',
                startParam: 'offset',
                url: 'api/ftSSL/GetLog',
                reader: {
                    type: 'json',
                    root: 'retval.data',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
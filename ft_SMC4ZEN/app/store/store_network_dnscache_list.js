
Ext.define('SMC4ZEN.store.store_network_dnscache_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_network_dnscache_list',
            fields: [
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: '_id'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'chk_use'
                },
                {
                    name: 'netmask'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('dns_cache')//'sort_list': Ext.encode([['@num',1]])
                },
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
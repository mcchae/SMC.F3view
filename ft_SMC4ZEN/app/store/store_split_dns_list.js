
Ext.define('SMC4ZEN.store.store_split_dns_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_split_dns_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('splitdns_list'),
                    sort_list: Ext.encode([
                        [
                            '_num',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'zone'
                },
                {
                    name: 'chk_use'
                },
                {
                    name: 'dname'
                },
                {
                    name: 'hname'
                },
                {
                    name: 'field'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'ttl'
                },
                {
                    name: 'ptr'
                },
                {
                    name: '_id'
                }
            ]
        }, cfg)]);
    }
});
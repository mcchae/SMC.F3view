
Ext.define('SMC4ZEN.store.store_tunnel_set_list', {
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
            storeId: 'store_tunnel_set_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'v6'
                },
                {
                    name: 'v4'
                },
                {
                    name: 'sit_v6'
                },
                {
                    name: 'ttl'
                },
                {
                    name: 'sit_name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_tunnel_isatap_list', {
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
            storeId: 'store_tunnel_isatap_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'prefix'
                },
                {
                    name: 'name'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ttl'
                }
            ]
        }, cfg)]);
    }
});
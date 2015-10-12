
Ext.define('SMC4ZEN.store.store_system_certificate_list', {
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
            storeId: 'store_system_certificate_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'subject'
                },
                {
                    name: 'issuer'
                },
                {
                    name: 'expire_date'
                },
                {
                    name: 'cert_name'
                },
                {
                    name: 'key_name'
                },
                {
                    name: 'type'
                },
                {
                    name: 'id'
                },
                {
                    name: 'cnt'
                }
            ]
        }, cfg)]);
    }
});
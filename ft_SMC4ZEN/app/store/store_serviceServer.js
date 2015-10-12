
Ext.define('SMC4ZEN.store.store_serviceServer', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_serviceServer',
            data: [
                {
                    value: 'dyndns.org',
                    name: 'dyndns.org'
                },
                {
                    value: 'no-ip.com',
                    name: 'no-ip.com'
                },
                {
                    value: 'freedns.afraid.org',
                    name: 'freedns.afraid.org'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_networkDuplex', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_networkDuplex',
            data: [
                {
                    value: 'auto',
                    name: 'Auto'
                },
                {
                    value: 'full',
                    name: 'Full'
                },
                {
                    value: 'half',
                    name: 'Half'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_networkSpeed', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_networkSpeed',
            data: [
                {
                    value: 'auto',
                    name: 'Auto'
                },
                {
                    value: '10',
                    name: '10Mbps'
                },
                {
                    value: '100',
                    name: '100Mbps'
                },
                {
                    value: '1000',
                    name: '1Gbps'
                },
                {
                    value: '10000',
                    name: '10Gbps'
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
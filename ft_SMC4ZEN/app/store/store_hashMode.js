
Ext.define('SMC4ZEN.store.store_hashMode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_hashMode',
            data: [
                {
                    value: '0',
                    name: 'layer2'
                },
                {
                    value: '1',
                    name: 'layer3'
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
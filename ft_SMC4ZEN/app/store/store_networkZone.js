
Ext.define('SMC4ZEN.store.store_networkZone', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_networkZone',
            data: [
                {
                    value: 'internal',
                    name: 'Internal'
                },
                {
                    value: 'external',
                    name: 'External'
                },
                {
                    value: 'dmz',
                    name: 'DMZ'
                },
                {
                    value: 'pan',
                    name: 'PAN'
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
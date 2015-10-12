
Ext.define('SMC4ZEN.store.store_ha_sync_hour', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_sync_hour',
            autoLoad: true,
            data: [
                {
                    hour: '1'
                },
                {
                    hour: '2'
                },
                {
                    hour: '3'
                },
                {
                    hour: '4'
                },
                {
                    hour: '5'
                },
                {
                    hour: '6'
                },
                {
                    hour: '7'
                },
                {
                    hour: '8'
                },
                {
                    hour: '9'
                },
                {
                    hour: '10'
                },
                {
                    hour: '11'
                },
                {
                    hour: '12'
                },
                {
                    hour: '13'
                },
                {
                    hour: '14'
                },
                {
                    hour: '15'
                },
                {
                    hour: '16'
                },
                {
                    hour: '17'
                },
                {
                    hour: '18'
                },
                {
                    hour: '19'
                },
                {
                    hour: '20'
                },
                {
                    hour: '21'
                },
                {
                    hour: '22'
                },
                {
                    hour: '23'
                },
                {
                    hour: '24'
                }
            ],
            fields: [
                {
                    name: 'hour'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_ha_sync_minute', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_sync_minute',
            autoLoad: true,
            data: [
                {
                    minute: '1'
                },
                {
                    minute: '2'
                },
                {
                    minute: '3'
                },
                {
                    minute: '4'
                },
                {
                    minute: '5'
                },
                {
                    minute: '6'
                },
                {
                    minute: '7'
                },
                {
                    minute: '8'
                },
                {
                    minute: '9'
                },
                {
                    minute: '10'
                },
                {
                    minute: '11'
                },
                {
                    minute: '12'
                },
                {
                    minute: '13'
                },
                {
                    minute: '14'
                },
                {
                    minute: '15'
                },
                {
                    minute: '16'
                },
                {
                    minute: '17'
                },
                {
                    minute: '18'
                },
                {
                    minute: '19'
                },
                {
                    minute: '20'
                },
                {
                    minute: '21'
                },
                {
                    minute: '22'
                },
                {
                    minute: '23'
                },
                {
                    minute: '24'
                },
                {
                    minute: '25'
                },
                {
                    minute: '26'
                },
                {
                    minute: '27'
                },
                {
                    minute: '28'
                },
                {
                    minute: '29'
                },
                {
                    minute: '30'
                },
                {
                    minute: '31'
                },
                {
                    minute: '32'
                },
                {
                    minute: '33'
                },
                {
                    minute: '34'
                },
                {
                    minute: '35'
                },
                {
                    minute: '36'
                },
                {
                    minute: '37'
                },
                {
                    minute: '38'
                },
                {
                    minute: '39'
                },
                {
                    minute: '40'
                },
                {
                    minute: '41'
                },
                {
                    minute: '42'
                },
                {
                    minute: '43'
                },
                {
                    minute: '44'
                },
                {
                    minute: '45'
                },
                {
                    minute: '46'
                },
                {
                    minute: '47'
                },
                {
                    minute: '48'
                },
                {
                    minute: '49'
                },
                {
                    minute: '50'
                },
                {
                    minute: '51'
                },
                {
                    minute: '52'
                },
                {
                    minute: '53'
                },
                {
                    minute: '54'
                },
                {
                    minute: '55'
                },
                {
                    minute: '56'
                },
                {
                    minute: '57'
                },
                {
                    minute: '58'
                },
                {
                    minute: '59'
                },
                {
                    minute: '60'
                }
            ],
            fields: [
                {
                    name: 'minute'
                }
            ]
        }, cfg)]);
    }
});
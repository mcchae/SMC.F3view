
Ext.define('SMC4ZEN.store.st_ISAKMP_Time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_Time',
            data: [
                {
                    time: 8
                },
                {
                    time: 16
                },
                {
                    time: 24
                }
            ],
            fields: [
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
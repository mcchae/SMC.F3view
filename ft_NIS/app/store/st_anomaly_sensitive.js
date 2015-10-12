
Ext.define('SMC.store.st_anomaly_sensitive', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_anomaly_sensitive',
            data: [
                {
                    name: 'Low',
                    value: 'Low'
                },
                {
                    name: 'Normal',
                    value: 'Normal'
                },
                {
                    name: 'High',
                    value: 'High'
                },
                
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
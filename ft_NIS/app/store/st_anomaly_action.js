
Ext.define('SMC.store.st_anomaly_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_anomaly_action',
            data: [
                {
                    name: '차단',
                    value: 'drop'
                },
                {
                    name: '탐지',
                    value: 'alert'
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
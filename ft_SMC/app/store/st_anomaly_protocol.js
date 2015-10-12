
Ext.define('SMC.store.st_anomaly_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_anomaly_protocol',
            data: [
                {
                    name: '모든 프로토콜',
                    value: 'Any'
                },
                {
                    name: 'TCP',
                    value: 'TCP'
                },
                {
                    name: 'UDP',
                    value: 'UDP'
                },
                {
                    name: 'ICMP',
                    value: 'ICMP'
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

Ext.define('SMC.store.st_mon_system', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_mon_system',
            fields: [
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'swap'
                },
                {
                    name: 'disk'
                },
                {
                    name: 'process'
                },
                {
                    name: 'time'
                },
                {
                    name: 'net_bytes_sent'
                },
                {
                    name: 'net_bytes_recv'
                },
                {
                    name: 'net_packets_sent'
                },
                {
                    name: 'net_packets_recv'
                }
            ]
        }, cfg)]);
    }
});
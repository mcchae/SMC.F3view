
Ext.define('SMC.store.st_tracker_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_protocol',
            data: [
                {
                    name: 'IP',
                    value: 0
                },
                {
                    name: 'ICMP',
                    value: 1
                },
                {
                    name: 'IGMP',
                    value: 2
                },
                {
                    name: 'IPIP',
                    value: 4
                },
                {
                    name: 'TCP',
                    value: 6
                },
                {
                    name: 'UDP',
                    value: 17
                },
                {
                    name: 'ESP',
                    value: 50
                },
                {
                    name: 'AH',
                    value: 51
                },
                {
                    name: 'ICMPv6',
                    value: 58
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
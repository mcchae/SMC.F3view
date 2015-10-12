
Ext.define('SMC.store.store_rtm_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_rtm_protocol',
            data: [
                {
                    protocol: 'All'
                },
                {
                    protocol: 'ICMP'
                },
                {
                    protocol: 'IGMP'
                },
                {
                    protocol: 'TCP'
                },
                {
                    protocol: 'UDP'
                },
                {
                    protocol: 'GRE'
                },
                {
                    protocol: 'ESP'
                },
                {
                    protocol: 'AH'
                },
                {
                    protocol: 'ICMPv6'
                }
            ],
            fields: [
                {
                    name: 'protocol'
                }
            ]
        }, cfg)]);
    }
});
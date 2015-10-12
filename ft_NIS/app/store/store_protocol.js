
Ext.define('SMC.store.store_protocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_protocol',
            data: [
                {
                    name: 'TCP',
                    val: 'tcp'
                },
                {
                    name: 'UDP',
                    val: 'udp'
                },
                {
                    name: 'ICMP',
                    val: 'icmp'
                },
                {
                    name: 'IGMP',
                    val: 'igmp'
                },
                {
                    name: 'AH',
                    val: 'ah'
                },
                {
                    name: 'ESP',
                    val: 'esp'
                },
                {
                    name: 'GRE',
                    val: 'gre'
                },
                {
                    name: 'ICMPv6',
                    val: 'icmpv6'
                },
                {
                    name: 'EIGRP',
                    val: 'eigrp'
                },
                {
                    name: 'OSPF',
                    val: 'ospf'
                },
                {
                    name: 'RIP',
                    val: 'rip'
                },
                {
                    name: 'ISIS',
                    val: 'isis'
                },
                {
                    name: 'PIM',
                    val: 'pim'
                },
                {
                    name: 'IGRP',
                    val: 'igrp'
                },
                {
                    name: 'RSVP',
                    val: 'rsvp'
                },
                {
                    name: 'RTP',
                    val: 'rtp'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
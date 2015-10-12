
Ext.define('SMC.store.st_ProtocolType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ProtocolType',
            data: [
                {
                    type: 'TCP'
                },
                {
                    type: 'UDP'
                },
                {
                    type: 'ICMP'
                },
                {
                    type: 'IGMP'
                },
                {
                    type: 'AH'
                },
                {
                    type: 'ESP'
                },
                {
                    type: 'GRE'
                },
                {
                    type: 'ICMPv6'
                },
                {
                    type: 'EIGRP'
                },
                {
                    type: 'OSPF'
                },
                {
                    type: 'RIP'
                },
                {
                    type: 'ISIS'
                },
                {
                    type: 'PIM'
                },
                {
                    type: 'IGRP'
                },
                {
                    type: 'RSVP'
                },
                
            ],
            fields: [
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});
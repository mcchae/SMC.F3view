
Ext.define('SMC.store.st_rtm_detail', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'st_rtm_detail',
            fields: [
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'network'
                },
                {
                    name: 'time'
                },
                {
                    name: 'eth0_inbytes'
                },
                {
                    name: 'eth0_outbytes'
                },
                {
                    name: 'eth0_dropbytes'
                },
                {
                    name: 'eth1_inbytes'
                },
                {
                    name: 'eth1_outbytes'
                },
                {
                    name: 'eth1_dropbytes'
                },
                {
                    name: 'eth2_inbytes'
                },
                {
                    name: 'eth2_outbytes'
                },
                {
                    name: 'eth2_dropbytes'
                },
                {
                    name: 'eth3_inbytes'
                },
                {
                    name: 'eth3_outbytes'
                },
                {
                    name: 'eth3_dropbytes'
                },
                {
                    name: 'eth4_inbytes'
                },
                {
                    name: 'eth4_outbytes'
                },
                {
                    name: 'eth4_dropbytes'
                },
                {
                    name: 'eth5_inbytes'
                },
                {
                    name: 'eth5_outbytes'
                },
                {
                    name: 'eth5_dropbytes'
                },
                {
                    name: 'eth6_inbytes'
                },
                {
                    name: 'eth6_outbytes'
                },
                {
                    name: 'eth6_dropbytes'
                },
                {
                    name: 'eth7_inbytes'
                },
                {
                    name: 'eth7_outbytes'
                },
                {
                    name: 'eth7_dropbytes'
                }
            ]
        }, cfg)]);
    }
});
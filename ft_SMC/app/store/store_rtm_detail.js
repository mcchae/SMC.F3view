
Ext.define('SMC.store.store_rtm_detail', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_rtm_detail',
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
                    name: 'eth0_inbyte'
                },
                {
                    name: 'eth0_outbyte'
                },
                {
                    name: 'eth0_dropbyte'
                },
                {
                    name: 'eth1_inbyte'
                },
                {
                    name: 'eth1_outbyte'
                },
                {
                    name: 'eth1_dropbyte'
                },
                {
                    name: 'eth2_inbyte'
                },
                {
                    name: 'eth2_outbyte'
                },
                {
                    name: 'eth2_dropbyte'
                },
                {
                    name: 'eth3_inbyte'
                },
                {
                    name: 'eth3_outbyte'
                },
                {
                    name: 'eth3_dropbyte'
                },
                {
                    name: 'eth4_inbyte'
                },
                {
                    name: 'eth4_outbyte'
                },
                {
                    name: 'eth4_dropbyte'
                },
                {
                    name: 'eth5_inbyte'
                },
                {
                    name: 'eth5_outbyte'
                },
                {
                    name: 'eth5_dropbyte'
                },
                {
                    name: 'eth6_inbyte'
                },
                {
                    name: 'eth6_outbyte'
                },
                {
                    name: 'eth6_dropbyte'
                },
                {
                    name: 'eth7_inbyte'
                },
                {
                    name: 'eth7_outbyte'
                },
                {
                    name: 'eth7_dropbyte'
                }
            ]
        }, cfg)]);
    }
});
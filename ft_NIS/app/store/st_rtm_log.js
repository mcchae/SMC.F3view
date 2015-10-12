
Ext.define('SMC.store.st_rtm_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            urlinfo: {
                isproxy: true,
                svcname: 'ftRTM',
                funcname: 'SeekDetailGateInfo'
            },
            autoLoad: false,
            storeId: 'st_rtm_log',
            fields: [
                {
                    name: 'eth'
                },
                {
                    name: 'Length'
                },
                {
                    name: 'src_ip1'
                },
                {
                    name: 'src_nat_ip'
                },
                {
                    name: 'dst_ip1'
                },
                {
                    name: 'dst_nat_ip'
                },
                {
                    name: 'protocol'
                },
                {
                    name: 'src_nat_port'
                },
                {
                    name: 'dst_nat_port'
                },
                {
                    name: 'action'
                },
                {
                    name: 'nat_uid'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'payload'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});
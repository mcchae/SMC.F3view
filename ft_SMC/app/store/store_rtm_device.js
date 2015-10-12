
Ext.define('SMC.store.store_rtm_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_rtm_device',
            fields: [
                {
                    name: 'gate_ip'
                },
                {
                    name: 'rd_version'
                },
                {
                    name: 'fw_version'
                },
                {
                    name: 'all_drop_packets'
                },
                {
                    name: 'all_input_packets'
                },
                {
                    name: 'state'
                },
                {
                    name: 'cpu_util'
                },
                {
                    name: 'cpu_max'
                },
                {
                    name: 'cpu_maxtime'
                },
                {
                    name: 'mem_util'
                },
                {
                    name: 'mem_max'
                },
                {
                    name: 'mem_maxtime'
                },
                {
                    name: 'net_util'
                },
                {
                    name: 'net_max'
                },
                {
                    name: 'net_maxtime'
                },
                {
                    name: 'operation_time'
                },
                {
                    name: 'sessions'
                },
                {
                    name: 'name'
                },
                {
                    name: 'eth'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'drop_count'
                },
                {
                    name: 'detect_count'
                },
                {
                    name: 'rpm'
                },
                {
                    name: 'except_msg'
                },
                {
                    name: 'etc'
                },
                {
                    name: 'checker'
                },
                {
                    name: 'power'
                },
                {
                    name: 'activation'
                },
                {
                    name: 'port_line_normal'
                }
            ]
        }, cfg)]);
    }
});
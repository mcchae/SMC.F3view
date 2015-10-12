
Ext.define('SMC.store.st_rtm_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_device',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'state'
                },
                {
                    name: 'ha'
                },
                {
                    name: 'gate_ip'
                },
                {
                    name: 'all_input_packets'
                },
                {
                    name: 'all_drop_packets'
                },
                {
                    name: 'sessions'
                },
                {
                    name: 'eth'
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
                    name: 'fw_version'
                },
                {
                    name: 'rd_version'
                },
                {
                    name: 'crc_packets'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'detect_count'
                },
                {
                    name: 'drop_count'
                },
                {
                    name: 'operation_time'
                },
                {
                    name: 'reboot_count'
                },
                {
                    name: 'linkdown_count'
                },
                {
                    name: 'except_msg'
                },
                {
                    name: 'rpm'
                },
                {
                    name: 'activation'
                },
                {
                    name: 'port_line_normal'
                },
                {
                    name: 'checker'
                },
                {
                    name: 'inkbps'
                },
                {
                    name: 'outkbps'
                }
            ]
        }, cfg)]);
    }
});
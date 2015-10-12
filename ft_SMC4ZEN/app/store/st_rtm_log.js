
Ext.define('SMC4ZEN.store.st_rtm_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    config: {
        urlinfo: {
            isproxy: true,
            svcname: 'ftRTM',
            funcname: 'SeekDetailGateInfo'
        }
    },

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_log',
            autoLoad: false,
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
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
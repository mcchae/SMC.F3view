
Ext.define('SMC.store.st_sendpolicy_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_sendpolicy_list',
            trailingBufferZone: 200,
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '_id'
                },
                {
                    name: '_kind'
                },
                {
                    name: '_last_who'
                },
                {
                    name: '_ref_cnt'
                },
                {
                    name: 'failover_state'
                },
                {
                    name: 'ha_state'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'ip2'
                },
                {
                    name: 'model'
                },
                {
                    name: 'name'
                },
                {
                    name: 'pause_state'
                },
                {
                    name: 'port_http'
                },
                {
                    name: 'port_ssh'
                },
                {
                    name: 'revision'
                },
                {
                    name: 'run_state'
                },
                {
                    name: 'serailnumber'
                },
                {
                    name: 'version'
                },
                {
                    name: 'spd_state'
                },
                {
                    name: 'spd_result'
                },
                {
                    name: '_last_ts'
                },
                {
                    name: 'spdinfo'
                },
                {
                    name: 'vpninfo'
                },
                {
                    convert: function(v, rec) {
                        return (rec.data.spd_state === 2) ? rec.raw.spd_progress.process + '%' : POLICY_STATUS[Number(rec.data.spd_state)];
                    },
                    name: 'spd_progress',
                    sortType: 'asUCString'
                },
                {
                    name: 'desc'
                }
            ],
            listeners: {
                add: {
                    fn: me.onStoreAdd,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onStoreAdd: function(store, records, index, eOpts) {

    }

});
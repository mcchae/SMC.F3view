
Ext.define('SMC4ZEN.store.st_smc_device_list', {
    extend: 'Ext.data.Store',
    alias: 'store.smc_device_list',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 50,
            storeId: 'st_smc_device_list',
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
                    name: '_last_ts'
                },
                {
                    name: 'spdinfo'
                },
                {
                    name: 'vpninfo'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_ipm_network_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipm_network_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'action'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'cycle'
                },
                {
                    name: 'count'
                },
                {
                    name: 'scan_id'
                },
                {
                    name: 'cycle_chk'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_ipm_host_list', {
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
            storeId: 'store_ipm_host_list',
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
                    name: 'mac'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@chk_use'
                },
                {
                    name: 'schedule'
                },
                {
                    name: 'name'
                },
                {
                    name: 'action'
                },
                {
                    name: 'network_manager'
                }
            ]
        }, cfg)]);
    }
});
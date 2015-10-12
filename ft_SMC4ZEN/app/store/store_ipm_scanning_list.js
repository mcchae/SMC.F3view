
Ext.define('SMC4ZEN.store.store_ipm_scanning_list', {
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
            storeId: 'store_ipm_scanning_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'id'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'cycle'
                },
                {
                    name: 'count'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'cycle_chk'
                }
            ]
        }, cfg)]);
    }
});
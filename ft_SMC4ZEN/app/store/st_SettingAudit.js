
Ext.define('SMC4ZEN.store.st_SettingAudit', {
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
            pageSize: 50,
            storeId: 'st_SettingAudit',
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getEventLog/',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.results',
                    totalProperty: 'retval.totalCount'
                }
            },
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'error'
                },
                {
                    name: 'event'
                },
                {
                    name: 'level'
                },
                {
                    name: 'ts'
                },
                {
                    name: 'user'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'details'
                },
                {
                    defaultValue: {
                        name: null
                    },
                    name: 'object'
                }
            ]
        }, cfg)]);
    }
});
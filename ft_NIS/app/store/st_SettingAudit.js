
Ext.define('SMC.store.st_SettingAudit', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SettingAudit',
            pageSize: 50,
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getEventLog/',
                reader: {
                    type: 'json',
                    root: 'retval.results',
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
                    name: 'object'
                }
            ]
        }, cfg)]);
    }
});
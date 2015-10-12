
Ext.define('SMC4ZEN.store.st_SettingAuditReport', {
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
            storeId: 'st_SettingAuditReport',
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getAuditReports/',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'ts'
                },
                {
                    name: 'type'
                },
                {
                    name: 'name'
                },
                {
                    name: 'url'
                }
            ]
        }, cfg)]);
    }
});
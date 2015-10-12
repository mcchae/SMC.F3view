
Ext.define('SMC.store.st_SettingAuditReport', {
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
            storeId: 'st_SettingAuditReport',
            pageSize: 50,
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getAuditReports/',
                reader: {
                    type: 'json',
                    root: 'retval'
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
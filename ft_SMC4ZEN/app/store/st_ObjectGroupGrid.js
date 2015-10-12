
Ext.define('SMC4ZEN.store.st_ObjectGroupGrid', {
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
            pageSize: 100,
            storeId: 'st_ObjectGroupGrid',
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getObjectList/',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.result',
                    totalProperty: 'retval.totalCount'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@cid'
                },
                {
                    name: '_kind'
                }
            ]
        }, cfg)]);
    }
});
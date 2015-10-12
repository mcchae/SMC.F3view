
Ext.define('SMC.store.st_ObjectGrid', {
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
            storeId: 'st_ObjectGrid',
            pageSize: 100,
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getObjectList/',
                reader: {
                    type: 'json',
                    root: 'retval.result',
                    totalProperty: 'retval.totalCount'
                }
            },
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '_id'
                },
                {
                    name: '_kind'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
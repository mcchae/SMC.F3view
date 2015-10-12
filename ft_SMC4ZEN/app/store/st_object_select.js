
Ext.define('SMC4ZEN.store.st_object_select', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            pageSize: 100,
            storeId: 'st_object_select',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: '_kind'
                }
            ],
            proxy: {
                type: 'jsonp',
                url: 'api/ftSMC/getObjectList/',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.result',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
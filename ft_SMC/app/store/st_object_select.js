
Ext.define('SMC.store.st_object_select', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_object_select',
            pageSize: 100,
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
                    root: 'retval.result',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
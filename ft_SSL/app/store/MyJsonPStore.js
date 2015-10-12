
Ext.define('SSL.store.MyJsonPStore', {
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
            storeId: 'st_ObjectGroupGrid',
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
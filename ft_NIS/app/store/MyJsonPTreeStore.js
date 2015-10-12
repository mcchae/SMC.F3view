
Ext.define('SMC.store.MyJsonPTreeStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPTreeStore',
            proxy: {
                type: 'jsonp',
                url: 'https://10.31.10.1:45000/api/ftLOG/getUIGroup',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'text'
                }
            ]
        }, cfg)]);
    }
});
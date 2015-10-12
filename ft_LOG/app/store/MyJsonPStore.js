
Ext.define('MyApp.store.MyJsonPStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPStore',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});

Ext.define('MyApp.store.store1', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store1',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
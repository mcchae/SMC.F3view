
Ext.define('SMC.store.id_store_log_event', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            snapshot: 'node',
            storeId: 'id_store_log_event',
            root: 'rootNode',
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});
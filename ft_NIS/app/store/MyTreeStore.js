
Ext.define('SMC.store.MyTreeStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyTreeStore',
            proxy: {
                type: 'ajax',
                url: 'file:///home/toor/F3work/F3/smc2/log/SMCEvent.xml',
                reader: {
                    type: 'json',
                    root: 'EventMap',
                    record: 'event'
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
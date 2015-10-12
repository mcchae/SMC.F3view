
Ext.define('SSL.store.st_ssl_restore_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_restore_log',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'time'
                },
                {
                    name: 'size'
                }
            ]
        }, cfg)]);
    }
});
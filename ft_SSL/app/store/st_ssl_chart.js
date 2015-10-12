
Ext.define('SSL.store.st_ssl_chart', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_chart',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'count'
                }
            ]
        }, cfg)]);
    }
});
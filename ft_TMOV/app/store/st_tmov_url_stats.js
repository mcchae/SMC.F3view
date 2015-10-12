
Ext.define('TMOV.store.st_tmov_url_stats', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_url_stats',
            fields: [
                {
                    name: 'x'
                },
                {
                    name: 'y'
                }
            ]
        }, cfg)]);
    }
});
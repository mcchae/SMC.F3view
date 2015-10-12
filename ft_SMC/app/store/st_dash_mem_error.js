
Ext.define('SMC.store.st_dash_mem_error', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_mem_error',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'count'
                }
            ]
        }, cfg)]);
    }
});
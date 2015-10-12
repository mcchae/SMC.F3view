
Ext.define('SMC.store.st_basic_memory', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_memory',
            fields: [
                {
                    name: '@total'
                },
                {
                    name: '@current'
                }
            ]
        }, cfg)]);
    }
});
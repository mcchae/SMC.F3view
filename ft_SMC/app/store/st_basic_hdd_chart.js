
Ext.define('SMC.store.st_basic_hdd_chart', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_hdd_chart',
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
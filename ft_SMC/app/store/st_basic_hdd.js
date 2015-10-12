
Ext.define('SMC.store.st_basic_hdd', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_hdd',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'current'
                },
                {
                    name: 'name'
                },
                {
                    name: 'total'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_etc_bandwidth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_etc_bandwidth',
            fields: [
                {
                    name: '@limit'
                },
                {
                    name: '@name'
                },
                {
                    name: '@time'
                },
                {
                    name: '@type'
                }
            ]
        }, cfg)]);
    }
});
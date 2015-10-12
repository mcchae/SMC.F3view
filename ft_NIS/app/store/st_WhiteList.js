
Ext.define('SMC.store.st_WhiteList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_WhiteList',
            fields: [
                {
                    name: 'date'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});
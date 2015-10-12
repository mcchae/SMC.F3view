
Ext.define('SMC4ZEN.store.st_BlackList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_BlackList',
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

Ext.define('SMC.store.st_etc_eth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_etc_eth',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
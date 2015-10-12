
Ext.define('SMC.store.id_store_log_xtm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'id_store_log_xtm',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});
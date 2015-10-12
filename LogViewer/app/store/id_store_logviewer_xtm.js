
Ext.define('SMC.store.id_store_logviewer_xtm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'id_store_logviewer_xtm',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                }
            ],
            sorters: {
                property: 'name'
            }
        }, cfg)]);
    }
});
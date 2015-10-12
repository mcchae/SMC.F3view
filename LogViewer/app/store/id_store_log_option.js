
Ext.define('SMC.store.id_store_log_option', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'id_store_log_option',
            fields: [
                {
                    name: 'option'
                },
                {
                    name: 'type'
                },
                {
                    name: 'typename'
                },
                {
                    name: 'value'
                },
                {
                    name: 'subtype'
                }
            ]
        }, cfg)]);
    }
});
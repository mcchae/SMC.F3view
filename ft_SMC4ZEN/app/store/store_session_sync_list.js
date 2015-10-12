
Ext.define('SMC4ZEN.store.store_session_sync_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_session_sync_list',
            data: [
                {
                    name: 'L2',
                    mode: '2'
                },
                {
                    name: 'L3',
                    mode: '3'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'mode'
                }
            ]
        }, cfg)]);
    }
});
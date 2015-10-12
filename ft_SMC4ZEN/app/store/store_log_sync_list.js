
Ext.define('SMC4ZEN.store.store_log_sync_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_sync_list',
            data: [
                {
                    name: 'Master-Master',
                    num: '1'
                },
                {
                    name: 'Master-Slave',
                    num: '2'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'num'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_config_sync_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_config_sync_list',
            autoLoad: true,
            data: [
                {
                    name: 'Master',
                    mode: 'master'
                },
                {
                    name: 'Slave',
                    mode: 'slave'
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
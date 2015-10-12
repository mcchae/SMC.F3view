
Ext.define('SMC4ZEN.store.st_ha_headoffice_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_headoffice_set',
            listeners: {
                add: {
                    fn: me.onStoreAdd,
                    scope: me
                }
            },
            fields: [
                {
                    name: 'bridge'
                },
                {
                    name: 'head_mode'
                },
                {
                    name: 'master_backup'
                }
            ]
        }, cfg)]);
    },

    onStoreAdd: function(store, records, index, eOpts) {
        var mbStore = Ext.getStore('st_ha_master_backup_set');
        var bgStore = Ext.getStore('st_ha_bridge_set');

        bgStore.add(records[index].data.bridge);
        mbStore.add(records[index].data.master_backup);
    }

});
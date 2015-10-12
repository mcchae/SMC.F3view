
Ext.define('SMC4ZEN.store.st_system_manager_accset', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_manager_accset',
            fields: [
                {
                    name: 'access'
                },
                {
                    name: 'esm'
                },
                {
                    name: 'ssh'
                }
            ],
            listeners: {
                add: {
                    fn: me.onStoreAdd,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onStoreAdd: function(store, records, index, eOpts) {
        var component = Ext.getCmp('pnl_xtm_system_manager').componentStorage();

        component.accnum.setValue(records[index].data.access.user);
        component.limit.setValue(records[index].data.access.limit);
        component.machanism.setValue(records[index].data.access.certificate);
    }

});
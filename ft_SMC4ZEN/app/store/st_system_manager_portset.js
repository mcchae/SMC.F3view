
Ext.define('SMC4ZEN.store.st_system_manager_portset', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_manager_portset',
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'useport'
                }
            ]
        }, cfg)]);
    }
});
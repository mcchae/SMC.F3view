
Ext.define('SMC4ZEN.store.st_ha_bridge_grid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_bridge_grid',
            fields: [
                {
                    name: 'info'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'name'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'timeout'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_ha_link_grid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_link_grid',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
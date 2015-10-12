
Ext.define('SMC.store.st_ha_bond_grid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_bond_grid',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_bonding_primary', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_primary',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
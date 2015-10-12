
Ext.define('SMC4ZEN.store.store_bonding_primary', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'store_bonding_primary',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});
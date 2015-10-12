
Ext.define('SMC.store.st_bonding_primary', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
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
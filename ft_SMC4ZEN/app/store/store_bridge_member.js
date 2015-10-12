
Ext.define('SMC4ZEN.store.store_bridge_member', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_bridge_member',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});
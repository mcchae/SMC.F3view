
Ext.define('SMC4ZEN.store.st_multiset_logip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_multiset_logip',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_common_multieth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_common_multieth',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
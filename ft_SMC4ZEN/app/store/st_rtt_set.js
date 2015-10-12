
Ext.define('SMC4ZEN.store.st_rtt_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtt_set',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});
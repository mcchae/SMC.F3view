
Ext.define('SMC.store.st_rtt_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
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
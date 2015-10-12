
Ext.define('SMC.store.st_multiset_standard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_multiset_standard',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'format'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});
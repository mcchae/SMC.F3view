
Ext.define('SMC.store.st_multisnmp_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_multisnmp_list',
            fields: [
                {
                    name: 'community'
                },
                {
                    name: 'location'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
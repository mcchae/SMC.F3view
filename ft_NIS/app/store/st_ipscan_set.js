
Ext.define('SMC.store.st_ipscan_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipscan_set',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'cycle'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});
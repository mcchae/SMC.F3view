
Ext.define('SMC.store.st_policy_vlan', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_policy_vlan',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'filtering'
                },
                {
                    name: '@id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'vlan'
                }
            ]
        }, cfg)]);
    }
});
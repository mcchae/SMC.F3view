
Ext.define('SMC.store.st_vlan_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vlan_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '@num'
                },
                {
                    name: '@tag'
                },
                {
                    name: '@zone'
                },
                {
                    name: 'desc'
                },
                {
                    name: '@id'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'name'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
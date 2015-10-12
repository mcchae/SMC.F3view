
Ext.define('SMC.store.st_bridge_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bridge_set',
            fields: [
                {
                    name: '@chk_stp'
                },
                {
                    name: '@cid'
                },
                {
                    name: '@count'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '@learning_time'
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
                    name: 'interface'
                },
                {
                    name: 'member'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
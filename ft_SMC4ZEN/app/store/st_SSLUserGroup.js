
Ext.define('SMC4ZEN.store.st_SSLUserGroup', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SSLUserGroup',
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
                    name: 'group'
                },
                {
                    name: '@id'
                },
                {
                    name: 'name'
                },
                {
                    name: 'password'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
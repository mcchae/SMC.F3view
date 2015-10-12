
Ext.define('SMC.store.st_alg_userlist', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_alg_userlist',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@action'
                },
                {
                    name: '@type'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SSL.store.st_ssl_user', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_user',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'password'
                },
                {
                    name: '@id'
                },
                {
                    name: 'email'
                },
                {
                    name: 'phone'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});
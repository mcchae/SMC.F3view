
Ext.define('SMC.store.st_UserList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_usersList',
            fields: [
                {
                    name: 'num'
                },
                {
                    name: 'id'
                },
                {
                    name: 'pwExpiryDate'
                },
                {
                    name: 'config'
                },
                {
                    name: 'log'
                },
                {
                    name: 'monitor'
                },
                {
                    name: 'email'
                },
                {
                    name: 'email_check'
                },
                {
                    name: 'tel'
                },
                {
                    name: 'host'
                },
                {
                    name: 'role'
                },
                {
                    name: 'otp'
                },
                {
                    name: 'md_passwd'
                },
                {
                    name: 'passwdLimitedDate'
                },
                {
                    name: 'is_denied'
                }
            ]
        }, cfg)]);
    }
});
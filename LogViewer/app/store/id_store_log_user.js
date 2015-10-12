
Ext.define('SMC.store.id_store_log_user', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'id_store_log_user',
            fields: [
                {
                    defaultValue: 'None',
                    name: 'orig_userid'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'orig_passwd'
                },
                {
                    name: 'passwd'
                },
                {
                    name: 'pass_days'
                },
                {
                    name: 'email'
                },
                {
                    name: 'phone'
                },
                {
                    name: 'trusted_host'
                },
                {
                    defaultValue: false,
                    name: 'authorization_set'
                },
                {
                    defaultValue: false,
                    name: 'authorization_log'
                },
                {
                    defaultValue: true,
                    name: 'authorization_mon'
                },
                {
                    defaultValue: 5,
                    name: 'role'
                },
                {
                    defaultValue: false,
                    name: 'otp_check'
                }
            ]
        }, cfg)]);
    }
});
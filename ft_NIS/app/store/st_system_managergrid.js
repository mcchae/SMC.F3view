
Ext.define('SMC.store.st_system_managergrid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_managergrid',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num'
                },
                {
                    name: 'expire_date'
                },
                {
                    name: 'host'
                },
                {
                    name: '@id'
                },
                {
                    name: 'mail'
                },
                {
                    name: 'password'
                },
                {
                    name: 'phone'
                },
                {
                    name: 'send_maila'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
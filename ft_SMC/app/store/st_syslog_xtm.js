
Ext.define('SMC.store.st_syslog_xtm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_syslog_xtm',
            data: [
                {
                    server: 'Log Server'
                },
                {
                    server: 'SMC Server'
                }
            ],
            fields: [
                {
                    name: 'server'
                }
            ]
        }, cfg)]);
    }
});
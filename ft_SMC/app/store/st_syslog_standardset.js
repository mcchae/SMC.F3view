
Ext.define('SMC.store.st_syslog_standardset', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_syslog_standardset',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'format'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});
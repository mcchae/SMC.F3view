
Ext.define('SMC.store.st_syslog_format', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_syslog_format',
            data: [
                {
                    format: 'Standard'
                },
                {
                    format: 'WELF'
                }
            ],
            fields: [
                {
                    name: 'format'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_rtm_event', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_event',
            fields: [
                {
                    name: 'log_type'
                },
                {
                    name: 'day'
                },
                {
                    name: 'time'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'content'
                }
            ]
        }, cfg)]);
    }
});
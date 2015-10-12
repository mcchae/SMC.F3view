
Ext.define('SMC.store.st_ScheduleTime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ScheduleTime',
            fields: [
                {
                    name: 'start'
                },
                {
                    name: 'end'
                }
            ]
        }, cfg)]);
    }
});
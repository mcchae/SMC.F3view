
Ext.define('SMC.store.st_SchedulePeriod', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SchedulePeriod',
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

Ext.define('SMC.store.st_tracker_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_list',
            fields: [
                {
                    name: 'desc'
                },
                {
                    name: 'option'
                },
                {
                    name: 'setting'
                },
                {
                    name: 'show_count'
                },
                {
                    name: 'time'
                },
                {
                    name: 'time_chart'
                }
            ]
        }, cfg)]);
    }
});
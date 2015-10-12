
Ext.define('SMC.store.st_tracker_guard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_guard',
            data: [
                {
                    name: 'ALL',
                    value: 0
                },
                {
                    name: 'Internal',
                    value: 1
                },
                {
                    name: 'External',
                    value: 2
                },
                {
                    name: 'DMZ',
                    value: 3
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
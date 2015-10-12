
Ext.define('SMC.store.st_tracker_work', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_work',
            data: [
                {
                    name: '업무 + 비업무',
                    value: 0
                },
                {
                    name: '업무',
                    value: 1
                },
                {
                    name: '비업무',
                    value: 2
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
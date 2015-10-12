
Ext.define('SMC.store.st_report_time', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_report_time',
            data: [
                {
                    name: '전일',
                    value: 0
                },
                {
                    name: '당일',
                    value: 1
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
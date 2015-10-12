
Ext.define('SMC.store.st_report_create', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_report_create',
            data: [
                {
                    name: '주기 생성',
                    value: 0
                },
                {
                    name: '범위 생성',
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
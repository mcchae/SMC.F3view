
Ext.define('SMC.store.st_logset_day', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_logset_day',
            data: [
                {
                    name: '7일',
                    value: 7
                },
                {
                    name: '14일',
                    value: 14
                },
                {
                    name: '30일',
                    value: 30
                },
                {
                    name: '60일',
                    value: 60
                },
                {
                    name: '90일',
                    value: 90
                },
                {
                    name: '기간 제한 없음',
                    value: 'unlimit'
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
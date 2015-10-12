
Ext.define('SMC4ZEN.store.store_weeks', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_weeks',
            data: [
                {
                    value: 'mon',
                    name: '월요일'
                },
                {
                    value: 'tue',
                    name: '화요일'
                },
                {
                    value: 'wed',
                    name: '수요일'
                },
                {
                    value: 'thu',
                    name: '목요일'
                },
                {
                    value: 'fri',
                    name: '금요일'
                },
                {
                    value: 'sta',
                    name: '토요일'
                },
                {
                    value: 'sun',
                    name: '일요일'
                },
                {
                    value: 'every',
                    name: '매일'
                },
                
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
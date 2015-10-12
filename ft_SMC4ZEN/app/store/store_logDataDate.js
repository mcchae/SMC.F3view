
Ext.define('SMC4ZEN.store.store_logDataDate', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logDataDate',
            data: [
                {
                    value: '7',
                    name: '7일'
                },
                {
                    value: '14',
                    name: '14일'
                },
                {
                    value: '30',
                    name: '30일'
                },
                {
                    value: '60',
                    name: '60일'
                },
                {
                    value: '90',
                    name: '90일'
                },
                {
                    value: 'unlimited',
                    name: '기한제한없음'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.value === 'unlimited'){
                            return __zen('unlimited');
                        }else{
                            return rec.data.value+__zen('day');
                        }
                    },
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
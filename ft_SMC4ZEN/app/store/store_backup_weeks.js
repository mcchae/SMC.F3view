
Ext.define('SMC4ZEN.store.store_backup_weeks', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_backup_weeks',
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
                    convert: function(v, rec) {
                        if(rec.data.value === "mon"){ return __zen('day_mon'); }
                        if(rec.data.value === "tue"){ return __zen('day_tue'); }
                        if(rec.data.value === "wed"){ return __zen('day_wed'); }
                        if(rec.data.value === "thu"){ return __zen('day_thu'); }
                        if(rec.data.value === "fri"){ return __zen('day_fri'); }
                        if(rec.data.value === "sat"){ return __zen('day_sat'); }
                        if(rec.data.value === "sun"){ return __zen('day_sun'); }
                        else{ return __zen('day_all'); }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
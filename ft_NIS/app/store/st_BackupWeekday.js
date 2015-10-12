
Ext.define('SMC.store.st_BackupWeekday', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_BackupWeekday',
            data: [
                {
                    weekday_text: '일요일',
                    weekday_value: 0
                },
                {
                    weekday_text: '월요일',
                    weekday_value: 1
                },
                {
                    weekday_text: '화요일',
                    weekday_value: 2
                },
                {
                    weekday_text: '수요일',
                    weekday_value: 3
                },
                {
                    weekday_text: '목요일',
                    weekday_value: 4
                },
                {
                    weekday_text: '금요일',
                    weekday_value: 5
                },
                {
                    weekday_text: '토요일',
                    weekday_value: 6
                },
                
            ],
            fields: [
                {
                    name: 'weekday_text'
                },
                {
                    name: 'weekday_value'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_SettingPeriod', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SettingPeriod',
            data: [
                {
                    period_text: '일간',
                    period_value: 'day'
                },
                {
                    period_text: '주간',
                    period_value: 'week'
                },
                {
                    period_text: '월간',
                    period_value: 'month'
                }
            ],
            fields: [
                {
                    name: 'period_text'
                },
                {
                    name: 'period_value'
                }
            ]
        }, cfg)]);
    }
});
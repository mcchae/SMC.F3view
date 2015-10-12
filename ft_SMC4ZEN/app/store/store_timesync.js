
Ext.define('SMC4ZEN.store.store_timesync', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_timesync',
            data: [
                {
                    text: '시스템 시간 직접 설정',
                    value: 'static'
                },
                {
                    text: '시간 서버와 동기화',
                    value: 'sync'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
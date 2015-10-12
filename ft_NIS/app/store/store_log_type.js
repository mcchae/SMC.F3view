
Ext.define('SMC.store.store_log_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_log_type',
            data: [
                {
                    val: 'Critical',
                    text: '[1] - Critical'
                },
                {
                    val: 'Serious',
                    text: '[2] - Serious'
                },
                {
                    val: 'Warning',
                    text: '[3] - Warning'
                },
                {
                    val: 'Normal',
                    text: '[4] - Normal'
                },
                {
                    val: 'Information',
                    text: '[5] - Information'
                },
                {
                    val: 'NoLog',
                    text: 'NoLog'
                },
                {
                    val: 'user',
                    text: '사용자정의'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
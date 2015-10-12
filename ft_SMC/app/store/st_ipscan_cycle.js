
Ext.define('SMC.store.st_ipscan_cycle', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipscan_cycle',
            data: [
                {
                    name: '5분',
                    value: 5
                },
                {
                    name: '10분',
                    value: 10
                },
                {
                    name: '30분',
                    value: 30
                },
                {
                    name: '1시간',
                    value: 60
                },
                {
                    name: '사용자 입력',
                    value: 'user'
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
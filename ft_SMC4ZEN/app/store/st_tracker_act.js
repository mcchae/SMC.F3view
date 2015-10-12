
Ext.define('SMC4ZEN.store.st_tracker_act', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_act',
            data: [
                {
                    name: '통과',
                    value: 5
                },
                {
                    name: '- 정상 종료',
                    value: 0
                },
                {
                    name: '- 비정상 종료 ESTABLISH 전',
                    value: 1
                },
                {
                    name: '- 비정상 종료 ESTABLISH 후',
                    value: 2
                },
                {
                    name: '차단',
                    value: 6
                },
                {
                    name: '- 룰에 의한 차단',
                    value: 3
                },
                {
                    name: '- 비정상 차단',
                    value: 4
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
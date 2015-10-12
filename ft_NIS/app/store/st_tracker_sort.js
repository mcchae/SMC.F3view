
Ext.define('SMC.store.st_tracker_sort', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_sort',
            data: [
                {
                    name: '누적 패킷',
                    value: 'packet'
                },
                {
                    name: '전체 누적 사용량',
                    value: 'bytes'
                },
                {
                    name: 'Tx',
                    value: 'out_bytes'
                },
                {
                    name: 'Rx',
                    value: 'in_bytes'
                },
                {
                    name: '누적 세션',
                    value: 'session'
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
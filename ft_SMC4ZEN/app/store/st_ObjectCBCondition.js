
Ext.define('SMC4ZEN.store.st_ObjectCBCondition', {
    extend: 'Ext.data.Store',
    alias: 'store.st_ObjectCBCondition',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ObjectCBCondition',
            data: [
                {
                    cond_id: 'oName',
                    cond_text: '객체명'
                },
                {
                    cond_id: 'IPaddr',
                    cond_text: 'IP 주소'
                },
                {
                    cond_id: 'srcPort',
                    cond_text: '출발지 포트'
                },
                {
                    cond_id: 'dstPort',
                    cond_text: '도착지 포트'
                }
            ],
            fields: [
                {
                    name: 'cond_id'
                },
                {
                    name: 'cond_text'
                }
            ]
        }, cfg)]);
    }
});
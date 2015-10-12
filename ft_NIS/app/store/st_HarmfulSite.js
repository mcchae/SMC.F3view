
Ext.define('SMC.store.st_HarmfulSite', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_HarmfulSite',
            data: [
                {
                    nude: '0 : 노출 없음',
                    violence: '0 : 폭력 없음',
                    sex: '0 : 성행위 없음',
                    language: '0 : 비속어 없음',
                    num: 0
                },
                {
                    nude: '1 : 노출 복장',
                    violence: '1 : 격투	',
                    sex: '1 : 격렬한 키스',
                    language: '1 : 일상 비속어',
                    num: 1
                },
                {
                    nude: '2 : 부분 노출',
                    violence: '2 : 상해',
                    sex: '2 : 착의 상태의 성적 접촉',
                    language: '2 : 거친 비속어',
                    num: 2
                },
                {
                    nude: '3 : 전신 노출',
                    violence: '3 : 살해',
                    sex: '3 : 노골적이지 않은 성행위',
                    language: '3 : 심한 비속어',
                    num: 3
                },
                {
                    nude: '4 : 성기 노출',
                    violence: '4 : 잔인한 살해',
                    sex: '4 : 성범죄 또는 노골적인 성행위',
                    language: '4 : 노골적이고 외설적인 비속어',
                    num: 4
                }
            ],
            fields: [
                {
                    name: 'nude'
                },
                {
                    name: 'violence'
                },
                {
                    name: 'sex'
                },
                {
                    name: 'language'
                },
                {
                    name: 'num'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_URL_Group', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_URL_Group',
            data: [
                {
                    group: '게임'
                },
                {
                    group: '증권'
                },
                {
                    group: '인터넷신문'
                },
                {
                    group: '인터넷방송'
                },
                {
                    group: '이메일'
                },
                {
                    group: '웹 하드'
                },
                {
                    group: 'P2P'
                },
                {
                    group: '사용자 정의 그룹'
                }
            ],
            fields: [
                {
                    name: 'group'
                }
            ]
        }, cfg)]);
    }
});
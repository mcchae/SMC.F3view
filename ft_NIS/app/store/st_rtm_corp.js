
Ext.define('SMC.store.st_rtm_corp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_corp',
            data: [
                {
                    corp: '농협은행',
                    code: 'NH_BANK'
                },
                {
                    corp: '농협중앙회',
                    code: 'NH_NACF'
                },
                {
                    corp: '농축협',
                    code: 'NH_NLCF'
                },
                {
                    corp: '기타',
                    code: 'NH_ETC'
                }
            ],
            fields: [
                {
                    name: 'corp'
                },
                {
                    name: 'code'
                }
            ]
        }, cfg)]);
    }
});
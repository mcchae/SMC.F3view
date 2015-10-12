
Ext.define('SMC.store.st_basic_groupcode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_groupcode',
            data: [
                {
                    name: '농축협',
                    value: 'NH_NLCF'
                },
                {
                    name: '중앙회',
                    value: 'NH_NACF'
                },
                {
                    name: '농협은행',
                    value: 'NH_BANK'
                },
                {
                    name: '기타',
                    value: 'NH_ETC'
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
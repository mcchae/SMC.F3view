
Ext.define('SMC4ZEN.store.st_policy_filter', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_policy_filter',
            data: [
                {
                    period: 1,
                    periodtext: '정책 1순위',
                    '#text': '',
                    '@cid': ''
                },
                {
                    period: 2,
                    periodtext: '정책 2순위',
                    '#text': '',
                    '@cid': ''
                },
                {
                    period: 3,
                    periodtext: '정책 3순위',
                    '#text': '',
                    '@cid': ''
                }
            ],
            fields: [
                {
                    name: 'period'
                },
                {
                    name: 'periodtext'
                },
                {
                    name: '#text'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});
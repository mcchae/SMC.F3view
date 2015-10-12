
Ext.define('SMC.store.st_spam_rule', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_spam_rule',
            data: [
                {
                    name: '송신자 허용',
                    value: 'Whitelist_sender'
                },
                {
                    name: '수신자 허용',
                    value: 'Whitelist_recipient'
                },
                {
                    name: '제목 허용',
                    value: 'Whitelist_subject'
                },
                {
                    name: '송신자 차단',
                    value: 'sender'
                },
                {
                    name: '수신자 차단',
                    value: 'recipient'
                },
                {
                    name: '제목 차단',
                    value: 'subject'
                },
                {
                    name: '내용 차단',
                    value: 'content'
                },
                {
                    name: '본문 URI 차단',
                    value: 'URI'
                },
                {
                    name: 'rawbody 차단',
                    value: 'rawbody'
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
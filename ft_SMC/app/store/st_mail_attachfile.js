
Ext.define('SMC.store.st_mail_attachfile', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_mail_attachfile',
            data: [
                {
                    name: '제거하지 않음',
                    value: false
                },
                {
                    name: '모두 제거',
                    value: true
                },
                
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
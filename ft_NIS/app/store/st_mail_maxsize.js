
Ext.define('SMC.store.st_mail_maxsize', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_mail_maxsize',
            data: [
                {
                    name: '제한하지 않음',
                    value: false
                },
                {
                    name: '제한함',
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
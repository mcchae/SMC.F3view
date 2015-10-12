
Ext.define('SMC4ZEN.store.st_ISAKMP_Encryption', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ISAKMP_Encryption',
            data: [
                {
                    encryption: '3DES'
                },
                {
                    encryption: 'AES128'
                },
                {
                    encryption: 'AES256'
                },
                {
                    encryption: 'SEED'
                }
            ],
            fields: [
                {
                    name: 'encryption'
                }
            ]
        }, cfg)]);
    }
});
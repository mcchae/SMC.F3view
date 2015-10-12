
Ext.define('SMC4ZEN.store.st_IPSec_Encryption', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_Encryption',
            data: [
                {
                    encryption: '3DES'
                },
                {
                    encryption: 'SEED'
                },
                {
                    encryption: 'AES128'
                },
                {
                    encryption: 'AES256'
                },
                {
                    encryption: 'ARIA128'
                },
                {
                    encryption: 'ARIA192'
                },
                {
                    encryption: 'ARIA256'
                },
                {
                    encryption: 'NULL_ENC'
                },
                {
                    encryption: '직접입력'
                },
                
            ],
            fields: [
                {
                    name: 'encryption'
                }
            ]
        }, cfg)]);
    }
});
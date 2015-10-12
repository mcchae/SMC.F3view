
Ext.define('SMC.store.st_IPSec_Auth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_Auth',
            data: [
                {
                    auth: 'SHA1'
                },
                {
                    auth: 'SHA256'
                },
                {
                    auth: 'HAS160'
                },
                {
                    auth: 'NULL'
                },
                {
                    auth: '직접입력'
                }
            ],
            fields: [
                {
                    name: 'auth'
                }
            ]
        }, cfg)]);
    }
});
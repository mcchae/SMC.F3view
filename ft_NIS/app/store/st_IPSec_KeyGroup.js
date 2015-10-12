
Ext.define('SMC.store.st_IPSec_KeyGroup', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_KeyGroup',
            data: [
                {
                    group: 'MODP768'
                },
                {
                    group: 'MODP1024'
                },
                {
                    group: 'MODP1536'
                },
                {
                    group: 'MODP2048'
                },
                {
                    group: 'MODP3072'
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

Ext.define('SMC.store.st_alg_useract', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_alg_useract',
            data: [
                {
                    name: 'Accept',
                    value: 'accept'
                },
                {
                    name: 'Deny',
                    value: 'deny'
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
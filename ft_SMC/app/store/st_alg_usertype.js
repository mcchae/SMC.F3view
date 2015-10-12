
Ext.define('SMC.store.st_alg_usertype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_alg_usertype',
            data: [
                {
                    name: 'ID',
                    value: 'id'
                },
                {
                    name: 'IP',
                    value: 'ip'
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
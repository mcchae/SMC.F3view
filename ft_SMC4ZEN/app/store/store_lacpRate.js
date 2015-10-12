
Ext.define('SMC4ZEN.store.store_lacpRate', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_lacpRate',
            data: [
                {
                    value: '0',
                    name: 'slow'
                },
                {
                    value: '1',
                    name: 'fast'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
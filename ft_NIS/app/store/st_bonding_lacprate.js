
Ext.define('SMC.store.st_bonding_lacprate', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_lacprate',
            data: [
                {
                    name: 'Slow',
                    value: 0
                },
                {
                    name: 'Fast',
                    value: 1
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
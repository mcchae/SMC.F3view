
Ext.define('SMC.store.st_ha_act', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_act',
            data: [
                {
                    act: 'accept'
                },
                {
                    act: 'redirect'
                }
            ],
            fields: [
                {
                    name: 'act'
                }
            ]
        }, cfg)]);
    }
});
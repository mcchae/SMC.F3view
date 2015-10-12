
Ext.define('SMC4ZEN.store.store_ha_lb_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_lb_action',
            autoLoad: true,
            data: [
                {
                    val: 'Accept'
                },
                {
                    val: 'Redirect'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
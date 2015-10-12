
Ext.define('SMC4ZEN.store.store_ha_lb_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_lb_list',
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'source'
                },
                {
                    name: 'dest'
                },
                {
                    name: 'action'
                },
                {
                    name: 's_type'
                },
                {
                    name: 'd_type'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});
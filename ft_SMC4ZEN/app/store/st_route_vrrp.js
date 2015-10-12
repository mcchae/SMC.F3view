
Ext.define('SMC4ZEN.store.st_route_vrrp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_vrrp',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'boostup'
                },
                {
                    name: 'period'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'setting'
                },
                {
                    name: 'vid'
                },
                {
                    name: 'vip'
                }
            ]
        }, cfg)]);
    }
});
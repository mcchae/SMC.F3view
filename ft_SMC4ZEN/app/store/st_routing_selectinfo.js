
Ext.define('SMC4ZEN.store.st_routing_selectinfo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_routing_selectinfo',
            data: [
                {
                    name: 'All Routing Tables	',
                    value: 'all'
                },
                {
                    name: 'Static				',
                    value: 'static'
                },
                {
                    name: 'RIP					',
                    value: 'rip'
                },
                {
                    name: 'OSPF					',
                    value: 'ospf'
                },
                {
                    name: 'BGP					',
                    value: 'bgp'
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
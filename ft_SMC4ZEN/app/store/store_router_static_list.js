
Ext.define('SMC4ZEN.store.store_router_static_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_router_static_list',
            // proxy: {
            //     type: 'jsonp',
            //     extraParams: {
            //         basename: 'network_router_static'
            //     },
            //     url: '/api/ftuctrl/getObjects',
            //     reader: {
            //         type: 'json',
            //         rootProperty: 'retval.list',
            //         totalProperty: 'retval.total'
            //     }
            // },
            fields: [
                {
                    name: 'interface'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'use'
                },
                {
                    name: 'metric',
                    sortType: 'asInt'
                },
                {
                    name: 'version'
                },
                {
                    name: 'gateway'
                },
                {
                    name: 'route_ip'
                },
                {
                    name: 'route_mask'
                },
                {
                    name: 'dst_ipmask'
                },
                {
                    name: 'id'
                },
                {
                    name: 'num',
                    sortType: 'asInt'
                }
            ]
        }, cfg)]);
    }
});
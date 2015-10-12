
Ext.define('SMC4ZEN.store.store_router_policy_list', {
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
            storeId: 'store_router_policy_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: 'network_router_policy'
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'prio_num',
                    sortType: 'asInt'
                },
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
                    name: 'version'
                },
                {
                    name: 'gateway'
                },
                {
                    name: 'policy_ip'
                },
                {
                    name: 'policy_mask'
                },
                {
                    name: 'route_ip'
                },
                {
                    name: 'route_mask'
                },
                {
                    name: 'src_ipmask'
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
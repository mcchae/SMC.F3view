
Ext.define('SMC4ZEN.store.store_network_router_checker_list', {
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
            storeId: 'store_network_router_checker_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    type: Ext.encode('checker')
                },
                url: '/api/ftuctrl/get_network_router_list',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    name: 'num',
                    sortType: 'asInt'
                },
                {
                    name: 'name'
                },
                {
                    name: 'setting',
                    sortType: 'asInt'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'period'
                },
                {
                    name: 'pool'
                },
                {
                    name: 'fail'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});
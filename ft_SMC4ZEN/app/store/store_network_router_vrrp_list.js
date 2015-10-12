
Ext.define('SMC4ZEN.store.store_network_router_vrrp_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_network_router_vrrp_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    type: Ext.encode('vrrp')
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
                    name: 'setting'
                },
                {
                    type: 'int',
                    name: 'priority'
                },
                {
                    type: 'int',
                    name: 'period'
                },
                {
                    name: 'vip'
                },
                {
                    type: 'int',
                    name: 'boostup'
                },
                {
                    name: 'vid'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'MyField10'
                }
            ]
        }, cfg)]);
    }
});
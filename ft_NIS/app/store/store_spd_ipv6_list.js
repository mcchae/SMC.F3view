
Ext.define('SMC.store.store_spd_ipv6_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_spd_ipv6_list',
            pageSize: 100,
            fields: [
                {
                    name: '@num',
                    type: 'int'
                },
                {
                    name: '@uid'
                },
                {
                    name: '@use'
                },
                {
                    name: 'desc'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'src'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,0);
                    },
                    name: 'dest'
                },
                {
                    convert: function(v, rec) {
                        return disp_obj(v,1);
                    },
                    name: 'service'
                },
                {
                    name: 'etc'
                },
                {
                    name: 'schedule'
                },
                {
                    name: 'header'
                },
                {
                    name: 'resource'
                },
                {
                    name: 'session'
                },
                {
                    name: 'profile'
                },
                {
                    name: 'expire'
                },
                {
                    name: 'lasthit'
                }
            ],
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('firewall_filter_ipv6'),
                    sort_list: Ext.encode([
                        [
                            '@num',
                            1
                        ]
                    ])
                },
                url: '/api/ftSMCl/getPolicyList',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            }
        }, cfg)]);
    }
});
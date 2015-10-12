
Ext.define('SMC4ZEN.store.store_multi_line_select_list', {
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
            storeId: 'store_multi_line_select_list',
            data: [
                {
                    multipath_type: '0',
                    path_type: 'Round-Robin'
                },
                {
                    multipath_type: '1',
                    path_type: '출발지 기준'
                },
                {
                    multipath_type: '2',
                    path_type: '목적지 기준'
                },
                {
                    multipath_type: '3',
                    path_type: '출발지+목적지 기준'
                },
                {
                    multipath_type: '4',
                    path_type: '네트워크 기준'
                },
                {
                    multipath_type: '5',
                    path_type: '대역폭 기반'
                }
            ],
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'multipath_type'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.multipath_type === '0'){ return __zen('round_robin'); }
                        if(rec.data.multipath_type === '1'){ return __zen('src_base'); }
                        if(rec.data.multipath_type === '2'){ return __zen('dest_base'); }
                        if(rec.data.multipath_type === '3'){ return __zen('src_dest_base'); }
                        if(rec.data.multipath_type === '4'){ return __zen('network_base'); }
                        else{ return "대역폭 기반"; }
                    },
                    name: 'path_type'
                }
            ]
        }, cfg)]);
    }
});
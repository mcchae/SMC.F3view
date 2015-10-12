
Ext.define('SMC4ZEN.store.store_network_multipath_list', {
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
            storeId: 'store_network_multipath_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json',
                    root: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: 'multipath_type'
                },
                {
                    name: 'line_timeout'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'src_type'
                },
                {
                    name: 'src_ip'
                },
                {
                    name: 'dst_type'
                },
                {
                    name: 'dst_ip'
                },
                {
                    name: '_id'
                },
                {
                    name: 'num'
                },
                {
                    name: 'src_version'
                },
                {
                    name: 'dst_version'
                }
            ]
        }, cfg)]);
    }
});
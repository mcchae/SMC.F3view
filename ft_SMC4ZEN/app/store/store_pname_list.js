
Ext.define('SMC4ZEN.store.store_pname_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'store_pname_list',
            // proxy: {
            //     type: 'jsonp',
                //url: '/api/ftuctrl/get_pname_list',
            //     reader: {
            //         type: 'json',
            //         root: 'retval'
            //     }
            // },
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
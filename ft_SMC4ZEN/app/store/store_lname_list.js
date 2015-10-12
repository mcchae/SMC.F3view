
Ext.define('SMC4ZEN.store.store_lname_list', {
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
            storeId: 'store_lname_list',
            // proxy: {
            //     type: 'jsonp',
                //url: '/api/ftuctrl/get_lname_list',
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
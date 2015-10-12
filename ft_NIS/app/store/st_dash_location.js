
Ext.define('SMC.store.st_dash_location', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_location',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'branch'
                },
                {
                    name: 'normal'
                },
                {
                    name: 'line_error'
                },
                {
                    name: 'no_response'
                }
            ]
        }, cfg)]);
    }
});
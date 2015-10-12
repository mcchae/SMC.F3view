
Ext.define('SMC.store.st_dash_state', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_state',
            fields: [
                {
                    name: 'line_error'
                },
                {
                    name: 'normal'
                },
                {
                    name: 'no_response'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'session'
                },
                {
                    name: 'count'
                }
            ]
        }, cfg)]);
    }
});
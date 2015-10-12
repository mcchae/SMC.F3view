
Ext.define('SMC.store.st_dash_port', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_port_top',
            fields: [
                {
                    name: 'port'
                },
                {
                    name: 'bps'
                },
                {
                    name: 'pps'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SSL.store.st_ssl_dashboard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_dashboard',
            fields: [
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'disk'
                },
                {
                    name: 'rx'
                },
                {
                    name: 'tx'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SSL.store.st_ssl_dev_dashboard', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_dev_dashboard',
            fields: [
                {
                    name: 'time'
                },
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
                }
            ]
        }, cfg)]);
    }
});
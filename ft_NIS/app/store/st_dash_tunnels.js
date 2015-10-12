
Ext.define('SMC.store.st_dash_tunnels', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_tunnels',
            fields: [
                {
                    name: 'location'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'sessions'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'time'
                },
                {
                    name: 'corp'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_dash_memory', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_memory',
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
                    name: 'corp'
                },
                {
                    name: 'etc'
                },
                {
                    name: 'key'
                },
                {
                    name: 'port_line_normal'
                }
            ]
        }, cfg)]);
    }
});
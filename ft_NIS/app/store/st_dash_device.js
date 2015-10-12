
Ext.define('SMC.store.st_dash_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_device',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'gate_ip'
                },
                {
                    name: 'cpu_util'
                },
                {
                    name: 'mem_util'
                },
                {
                    name: 'inkbps'
                },
                {
                    name: 'outkbps'
                },
                {
                    name: 'sessions'
                },
                {
                    name: 'tunnels'
                }
            ]
        }, cfg)]);
    }
});
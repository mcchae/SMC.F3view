
Ext.define('SMC.store.st_dash_config', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_config',
            fields: [
                {
                    name: 'model'
                },
                {
                    name: 'cpu_util'
                },
                {
                    name: 'mem_util'
                },
                {
                    name: 'session'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'code'
                }
            ]
        }, cfg)]);
    }
});
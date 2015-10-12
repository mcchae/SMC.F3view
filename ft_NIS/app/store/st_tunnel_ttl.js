
Ext.define('SMC.store.st_tunnel_ttl', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tunnel_ttl',
            data: [
                {
                    name: 'Default',
                    value: 128
                },
                {
                    name: 'Manual',
                    value: 'manual'
                },
                
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
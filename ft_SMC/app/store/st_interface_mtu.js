
Ext.define('SMC.store.st_interface_mtu', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_mtu',
            data: [
                {
                    mtu: 'Default'
                },
                {
                    mtu: 1000
                },
                {
                    mtu: 1200
                },
                {
                    mtu: 1280
                },
                {
                    mtu: 1400
                },
                {
                    mtu: 1440
                },
                {
                    mtu: 1448
                },
                {
                    mtu: 1456
                },
                {
                    mtu: 1464
                },
                {
                    mtu: 1472
                },
                {
                    mtu: 1480
                },
                {
                    mtu: 1488
                }
            ],
            fields: [
                {
                    name: 'mtu'
                }
            ]
        }, cfg)]);
    }
});
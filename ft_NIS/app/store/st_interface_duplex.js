
Ext.define('SMC.store.st_interface_duplex', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_duplex',
            data: [
                {
                    duplex: 'Auto'
                },
                {
                    duplex: 'Full'
                },
                {
                    duplex: 'Half'
                }
            ],
            fields: [
                {
                    name: 'duplex'
                }
            ]
        }, cfg)]);
    }
});
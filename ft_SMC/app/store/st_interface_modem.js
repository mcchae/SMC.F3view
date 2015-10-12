
Ext.define('SMC.store.st_interface_modem', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_modem',
            data: [
                {
                    modem: 'None'
                },
                {
                    modem: 'Samsung'
                },
                {
                    modem: 'Hyundai'
                }
            ],
            fields: [
                {
                    name: 'modem'
                }
            ]
        }, cfg)]);
    }
});
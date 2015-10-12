
Ext.define('SMC.store.st_interface_speed', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_speed',
            data: [
                {
                    speed: 'Auto'
                },
                {
                    speed: '10MBps'
                },
                {
                    speed: '100MBps'
                },
                {
                    speed: '1GBps'
                },
                {
                    speed: '10GBps'
                }
            ],
            fields: [
                {
                    name: 'speed'
                }
            ]
        }, cfg)]);
    }
});
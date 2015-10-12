
Ext.define('SMC.store.st_tracker_type', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_type',
            data: [
                {
                    name: '방화벽',
                    value: 'fw'
                },
                {
                    name: 'VPN',
                    value: 'vpn'
                },
                {
                    name: 'DPI',
                    value: 'dpi'
                }
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
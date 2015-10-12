
Ext.define('SMC4ZEN.store.store_networkMode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_networkMode',
            data: [
                {
                    value: 'none',
                    name: 'None'
                },
                {
                    value: 'static',
                    name: 'Static'
                },
                {
                    value: 'dhcp',
                    name: 'DHCP'
                },
                {
                    value: 'pppoe',
                    name: 'PPPoE'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_interfaceKind', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_interfaceKind',
            data: [
                {
                    value: 'bridge',
                    name: 'Bridge'
                },
                {
                    value: 'bonding',
                    name: 'Bonding'
                },
                {
                    value: 'vlan',
                    name: 'VLAN'
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
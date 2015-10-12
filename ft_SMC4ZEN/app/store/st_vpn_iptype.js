
Ext.define('SMC4ZEN.store.st_vpn_iptype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_iptype',
            data: [
                {
                    name: 'Single',
                    value: 'single'
                },
                {
                    name: 'Range',
                    value: 'range'
                },
                {
                    name: 'Netmask',
                    value: 'netmask'
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

Ext.define('SMC4ZEN.store.st_vpn_primary', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_primary',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: '@version'
                }
            ]
        }, cfg)]);
    }
});
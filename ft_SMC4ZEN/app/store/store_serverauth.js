
Ext.define('SMC4ZEN.store.store_serverauth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_serverauth',
            data: [
                {
                    name: 'Local',
                    val: 'local'
                },
                {
                    name: 'RADIUS',
                    val: 'radius'
                },
                {
                    name: 'TACACS+',
                    val: 'tacacs'
                },
                {
                    name: 'LDAP',
                    val: 'ldap'
                }
            ],
            fields: [
                {
                    name: 'val'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_vpn_backup', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_backup',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: 'MyField336'
                }
            ]
        }, cfg)]);
    }
});
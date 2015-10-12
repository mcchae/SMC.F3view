
Ext.define('SMC.store.st_dhcp_assign', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dhcp_assign',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});
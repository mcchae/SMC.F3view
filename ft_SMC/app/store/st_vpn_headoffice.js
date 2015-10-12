
Ext.define('SMC.store.st_vpn_headoffice', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_headoffice',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});
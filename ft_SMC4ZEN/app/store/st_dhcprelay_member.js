
Ext.define('SMC4ZEN.store.st_dhcprelay_member', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dhcprelay_member',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});
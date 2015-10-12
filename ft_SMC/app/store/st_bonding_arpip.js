
Ext.define('SMC.store.st_bonding_arpip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_arpip',
            fields: [
                {
                    name: 'arp'
                }
            ]
        }, cfg)]);
    }
});
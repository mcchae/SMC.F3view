
Ext.define('SMC.store.st_portscan_destinationip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_portscan_destinationip',
            fields: [
                {
                    name: 'ip'
                },
                {
                    name: 'netmask'
                }
            ]
        }, cfg)]);
    }
});
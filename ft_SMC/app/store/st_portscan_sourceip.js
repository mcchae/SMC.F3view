
Ext.define('SMC.store.st_portscan_sourceip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_portscan_sourceip',
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
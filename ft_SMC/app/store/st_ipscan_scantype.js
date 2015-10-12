
Ext.define('SMC.store.st_ipscan_scantype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipscan_scantype',
            data: [
                {
                    type: 'ARP'
                },
                {
                    type: 'ICMP'
                }
            ],
            fields: [
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});
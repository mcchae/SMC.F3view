
Ext.define('SMC.store.st_additional_arp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_additional_arp',
            fields: [
                {
                    name: 'device'
                },
                {
                    name: 'flags'
                },
                {
                    name: 'hw_mac'
                },
                {
                    name: 'hw_type'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'mask'
                }
            ]
        }, cfg)]);
    }
});
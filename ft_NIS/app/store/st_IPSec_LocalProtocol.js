
Ext.define('SMC.store.st_IPSec_LocalProtocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_LocalProtocol',
            data: [
                {
                    proto: 'Any'
                },
                {
                    proto: 'TCP'
                },
                {
                    proto: 'UDP'
                },
                {
                    proto: 'ICMP'
                },
                {
                    proto: 'GRE'
                }
            ],
            fields: [
                {
                    name: 'proto'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_IPSec_RemoteProtocol', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_RemoteProtocol',
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
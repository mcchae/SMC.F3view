
Ext.define('SMC.store.st_RPCPtoyocolType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_RPCPtoyocolType',
            data: [
                {
                    type: 'TCP'
                },
                {
                    type: 'UDP'
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
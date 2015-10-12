
Ext.define('SMC4ZEN.store.st_RPCPtoyocolType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
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
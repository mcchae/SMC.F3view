
Ext.define('SMC.store.st_RPCList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_RPCList',
            fields: [
                {
                    name: 'rpc'
                }
            ]
        }, cfg)]);
    }
});
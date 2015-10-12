
Ext.define('SMC.store.st_policy_vlaneth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_policy_vlaneth',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
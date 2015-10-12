
Ext.define('SMC.store.st_policy_rule_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_policy_rule_list',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                }
            ]
        }, cfg)]);
    }
});
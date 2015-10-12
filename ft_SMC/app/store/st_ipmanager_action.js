
Ext.define('SMC.store.st_ipmanager_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipmanager_action',
            data: [
                {
                    action: 'Accept'
                },
                {
                    action: 'Deny'
                }
            ],
            fields: [
                {
                    name: 'action'
                }
            ]
        }, cfg)]);
    }
});
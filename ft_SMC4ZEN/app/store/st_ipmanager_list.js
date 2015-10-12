
Ext.define('SMC4ZEN.store.st_ipmanager_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipmanager_list',
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
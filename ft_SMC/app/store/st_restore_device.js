
Ext.define('SMC.store.st_restore_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_restore_device',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '_id'
                },
                {
                    name: '_kind'
                },
                {
                    name: '_ts'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
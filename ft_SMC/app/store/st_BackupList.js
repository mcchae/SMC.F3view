
Ext.define('SMC.store.st_BackupList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_b',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
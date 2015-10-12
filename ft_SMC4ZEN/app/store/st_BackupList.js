
Ext.define('SMC4ZEN.store.st_BackupList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
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
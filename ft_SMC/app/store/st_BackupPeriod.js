
Ext.define('SMC.store.st_BackupPeriod', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_BackupPeriod',
            data: [
                {
                    type_text: 'daily',
                    type_value: 'daily'
                },
                {
                    type_text: 'weekly',
                    type_value: 'weekly'
                }
            ],
            fields: [
                {
                    name: 'type_text'
                },
                {
                    name: 'type_value'
                }
            ]
        }, cfg)]);
    }
});
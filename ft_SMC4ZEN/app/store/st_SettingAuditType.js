
Ext.define('SMC4ZEN.store.st_SettingAuditType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SettingAuditType',
            data: [
                {
                    type_text: '관리자ID',
                    type_value: 0
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
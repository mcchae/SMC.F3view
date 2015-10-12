
Ext.define('SMC4ZEN.store.st_system_snmp_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_snmp_set',
            fields: [
                {
                    name: 'community'
                },
                {
                    name: 'location'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
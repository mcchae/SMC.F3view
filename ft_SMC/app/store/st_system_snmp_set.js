
Ext.define('SMC.store.st_system_snmp_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
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
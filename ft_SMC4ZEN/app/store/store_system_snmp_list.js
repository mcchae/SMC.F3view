
Ext.define('SMC4ZEN.store.store_system_snmp_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Integer'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_system_snmp_list',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                url: '/api/ftuctrl/get_system_snmp_list',
                reader: {
                    type: 'json',
                    rootProperty: 'retval'
                }
            },
            fields: [
                {
                    type: 'int',
                    name: 'num'
                },
                {
                    name: 'ip_type'
                },
                {
                    name: 'community'
                },
                {
                    name: 'trap_use'
                },
                {
                    name: 'trap_ip'
                },
                {
                    name: 'auth_algo'
                },
                {
                    name: 'privacy_algo'
                },
                {
                    name: 'sid'
                },
                {
                    name: 'user_name'
                },
                {
                    name: 'snmp_type'
                },
                {
                    name: 'snmp_use'
                }
            ]
        }, cfg)]);
    }
});
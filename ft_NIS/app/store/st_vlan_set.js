
Ext.define('SMC.store.st_vlan_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Memory',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vlan_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '@num'
                },
                {
                    name: '@tag'
                },
                {
                    name: '@zone'
                },
                {
                    name: 'desc'
                },
                {
                    mapping: 'vlan.id',
                    name: '@id',
                    type: 'int'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'name'
                },
                {
                    name: 'setting'
                },
                {
                    name: 'id'
                }
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'vlan'
                }
            }
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_ha_head_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_head_list',
            fields: [
                {
                    name: 'inter'
                },
                {
                    name: 'virtual_a_ip'
                },
                {
                    name: 'machine_ip'
                },
                {
                    name: 'virtual_b_ip'
                },
                {
                    name: 'master_b_ip'
                },
                {
                    name: 'period'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'group_num'
                }
            ]
        }, cfg)]);
    }
});
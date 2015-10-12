
Ext.define('SMC4ZEN.store.store_ha_branch_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ha_branch_list',
            fields: [
                {
                    name: 'inter'
                },
                {
                    name: 'type'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'period'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'virtual_ip'
                },
                {
                    name: 'priority'
                },
                {
                    name: 'boostup'
                },
                {
                    name: 'group_num'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});
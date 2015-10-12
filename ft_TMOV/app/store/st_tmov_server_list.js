
Ext.define('TMOV.store.st_tmov_server_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_server_list',
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'main_inner_ip'
                },
                {
                    name: 'sub_inner_ip'
                },
                {
                    name: 'main_outer_ip'
                },
                {
                    name: 'sub_outer_ip'
                },
                {
                    name: 'inner_policy'
                },
                {
                    name: 'outer_policy'
                },
                {
                    name: 'inner_state'
                },
                {
                    name: 'outer_state'
                },
                {
                    name: 'inner_agent'
                },
                {
                    name: 'outer_agent'
                },
                {
                    name: 'inner_pattern'
                },
                {
                    name: 'outer_pattern'
                },
                {
                    name: 'inner_tmm'
                },
                {
                    name: 'outer_tmm'
                },
                {
                    name: 'cr_date'
                },
                {
                    name: 'md_date'
                },
                {
                    name: 'fnl_edt_usr'
                }
            ]
        }, cfg)]);
    }
});
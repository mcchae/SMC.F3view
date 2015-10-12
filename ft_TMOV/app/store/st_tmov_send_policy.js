
Ext.define('TMOV.store.st_tmov_send_policy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_send_policy',
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'main_inner_ip'
                },
                {
                    name: 'main_outer_ip'
                },
                {
                    name: 'inner_state'
                },
                {
                    name: 'outer_state'
                },
                {
                    name: 'result'
                },
                {
                    name: 'inner_policy'
                },
                {
                    name: 'outer_policy'
                }
            ]
        }, cfg)]);
    }
});
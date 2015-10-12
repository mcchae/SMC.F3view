
Ext.define('TMOV.store.st_tmov_send_tmm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_send_tmm',
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
                    name: 'inner_tmm'
                },
                {
                    name: 'outer_tmm'
                },
                {
                    name: 'state'
                },
                {
                    name: 'result'
                }
            ]
        }, cfg)]);
    }
});
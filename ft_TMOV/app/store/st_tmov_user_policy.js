
Ext.define('TMOV.store.st_tmov_user_policy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_user_policy',
            pageSize: 50,
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'court_name'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'surname'
                },
                {
                    name: 'employytype'
                },
                {
                    name: 'inner_state'
                },
                {
                    name: 'outer_state'
                },
                {
                    name: 'inner_policy'
                },
                {
                    name: 'outer_policy'
                },
                {
                    name: 'cr_date'
                },
                {
                    name: 'md_date'
                },
                {
                    name: '_id'
                },
                {
                    name: 'fnl_edt_usr'
                },
                {
                    name: 'vm_use'
                }
            ],
            proxy: {
                type: 'jsonp',
                url: 'api/ftTMOV/GetUserPolicy',
                reader: {
                    type: 'json',
                    root: 'retval.data',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
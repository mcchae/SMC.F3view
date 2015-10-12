
Ext.define('TMOV.store.st_tmov_user_send', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_user_send',
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'court_name'
                },
                {
                    name: 'surname'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'fail'
                },
                {
                    name: 'success'
                },
                {
                    name: 'state'
                }
            ]
        }, cfg)]);
    }
});
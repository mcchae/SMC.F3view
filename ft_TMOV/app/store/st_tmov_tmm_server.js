
Ext.define('TMOV.store.st_tmov_tmm_server', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_tmm_server',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'reg_dtm'
                }
            ]
        }, cfg)]);
    }
});
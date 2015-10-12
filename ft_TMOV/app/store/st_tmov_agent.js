
Ext.define('TMOV.store.st_tmov_agent', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_agent',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'version'
                },
                {
                    name: 'type'
                },
                {
                    name: 'reg_dtm'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});
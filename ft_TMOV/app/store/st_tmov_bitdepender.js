
Ext.define('TMOV.store.st_tmov_bitdepender', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_bitdepender',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'version'
                },
                {
                    name: 'signature'
                },
                {
                    name: 'cr_dtm'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});
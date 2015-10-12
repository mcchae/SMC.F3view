
Ext.define('TMOV.store.st_tmov_extension_window', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_extension_window',
            fields: [
                {
                    name: 'parent'
                },
                {
                    name: 'group_name'
                },
                {
                    name: 'ext_name'
                },
                {
                    name: 'ext_cmt'
                },
                {
                    name: 'ref_cnm'
                },
                {
                    name: 'cr_dtm'
                },
                {
                    name: 'fnl_edt_dtm'
                }
            ]
        }, cfg)]);
    }
});
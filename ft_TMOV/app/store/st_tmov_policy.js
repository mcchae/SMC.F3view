
Ext.define('TMOV.store.st_tmov_policy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_policy',
            fields: [
                {
                    name: 'parent'
                },
                {
                    name: 'name'
                },
                {
                    name: 'alw_fl_sz'
                },
                {
                    name: 'dwi_lmt_cnt'
                },
                {
                    name: 'plc_vld_perd'
                },
                {
                    name: 'auto_logout_tm'
                },
                {
                    name: 'owy_yn'
                },
                {
                    name: 'extension'
                },
                {
                    name: 'extension_name'
                },
                {
                    name: 'cr_dtm'
                },
                {
                    name: 'fnl_edt_dtm'
                },
                {
                    name: 'fnl_edt_usr'
                }
            ]
        }, cfg)]);
    }
});
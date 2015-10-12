
Ext.define('TMOV.store.st_tmov_file_log', {
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
            autoLoad: false,
            storeId: 'st_tmov_file_log',
            pageSize: 50,
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'emp_no'
                },
                {
                    name: 'filesize'
                },
                {
                    name: 'surname'
                },
                {
                    name: 'court_name'
                },
                {
                    name: 'employytype'
                },
                {
                    name: 'rgt_dtm_ts'
                },
                {
                    name: 'dat_trf_clss_cd'
                },
                {
                    name: 'dat_trf_nm'
                },
                {
                    name: 'grp_cf_val'
                },
                {
                    name: 'dat_trf_stcd_nm'
                }
            ],
            proxy: {
                type: 'jsonp',
                url: 'api/ftTMOV/GetFileLog',
                reader: {
                    type: 'json',
                    root: 'retval.data',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});

Ext.define('TMOV.store.st_tmov_agent_log', {
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
            storeId: 'st_tmov_agent_log',
            pageSize: 50,
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'usr_login_id'
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
                    name: 'dat_trf_clss_cd'
                },
                {
                    name: 'fnl_acs_ts'
                }
            ],
            proxy: {
                type: 'jsonp',
                url: 'api/ftTMOV/GetAgentLog',
                reader: {
                    type: 'json',
                    root: 'retval.data',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
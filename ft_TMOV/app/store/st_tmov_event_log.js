
Ext.define('TMOV.store.st_tmov_event_log', {
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
            storeId: 'st_tmov_event_log',
            pageSize: 50,
            fields: [
                {
                    name: 'cr_dtm'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'logtype'
                },
                {
                    name: 'subtype'
                },
                {
                    name: 'content'
                },
                {
                    name: 'name'
                }
            ],
            proxy: {
                type: 'jsonp',
                url: 'api/ftTMOV/GetEventLog',
                reader: {
                    type: 'json',
                    root: 'retval.data',
                    totalProperty: 'retval.totalCount'
                }
            }
        }, cfg)]);
    }
});
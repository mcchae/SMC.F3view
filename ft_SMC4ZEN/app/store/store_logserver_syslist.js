
Ext.define('SMC4ZEN.store.store_logserver_syslist', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logserver_syslist',
            autoLoad: false,
            proxy: {
                type: 'jsonp',
                extraParams: {
                    basename: Ext.encode('syslog_setting'),
                    cond: Ext.encode({
                        _kind: 'syslog'
                    }),
                    sort_list: Ext.encode([
                        [
                            '_num',
                            1
                        ]
                    ])
                },
                url: '/api/ftuctrl/getObjects',
                reader: {
                    type: 'json',
                    rootProperty: 'retval.list',
                    totalProperty: 'retval.total'
                }
            },
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'ip'
                },
                {
                    name: '_num',
                    sortType: 'asInt'
                },
                {
                    name: 'port'
                },
                {
                    name: 'chk_enc'
                }
            ],
            listeners: {
                load: {
                    fn: me.onJsonpstoreLoad,
                    scope: me
                }
            }
        }, cfg)]);
    },

    onJsonpstoreLoad: function(store, records, successful, eOpts) {
        var _store = Ext.data.StoreManager.lookup("store_logserver_syslist");

        var record = [];
        for(var i=0; i<_store.data.length; i++){
            var data = _store.data.items[i].data;
            data._num = i+1;
            record.push(data);
        }

        _store.loadData(record);
    }

});
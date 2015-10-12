
Ext.define('AUS.store.st_aus_log', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_aus_log',
            fields: [
                {
                    name: 'msg'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'time'
                },
                {
                    name: 'cid'
                }
            ]
        }, cfg)]);
    }
});
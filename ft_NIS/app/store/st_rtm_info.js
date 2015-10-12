
Ext.define('SMC.store.st_rtm_info', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_info',
            fields: [
                {
                    name: 'inpackets'
                },
                {
                    name: 'outpackets'
                },
                {
                    name: 'droppackets'
                },
                {
                    name: 'inbytes'
                },
                {
                    name: 'outbytes'
                },
                {
                    name: 'dropbytes'
                },
                {
                    name: 'util'
                },
                {
                    name: 'num'
                },
                {
                    name: 'network'
                },
                {
                    name: 'bytes'
                },
                {
                    name: 'bandwidth'
                }
            ]
        }, cfg)]);
    }
});
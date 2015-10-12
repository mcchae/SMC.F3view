
Ext.define('TMOV.store.st_tmov_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_device',
            fields: [
                {
                    name: 'server_name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'state'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'disk'
                },
                {
                    name: 'process'
                },
                {
                    name: 'ha'
                },
                {
                    name: 'user_count'
                },
                {
                    name: 'file_count'
                },
                {
                    name: 'daemon_count'
                },
                {
                    name: 'inPackets'
                },
                {
                    name: 'outPackets'
                },
                {
                    name: 'dropPackets'
                },
                {
                    name: 'ave'
                }
            ]
        }, cfg)]);
    }
});
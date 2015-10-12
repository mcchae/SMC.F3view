
Ext.define('TMOV.store.st_tmov_detail', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_detail',
            fields: [
                {
                    name: 'cpu'
                },
                {
                    name: 'ave_cpu'
                },
                {
                    name: 'disk'
                },
                {
                    name: 'ave_disk'
                },
                {
                    name: 'memory'
                },
                {
                    name: 'ave_memory'
                },
                {
                    name: 'file'
                },
                {
                    name: 'all_file'
                },
                {
                    name: 'user'
                },
                {
                    name: 'all_user'
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
                    name: 'ave_inPackets'
                },
                {
                    name: 'ave_outPackets'
                },
                {
                    name: 'ave_dropPackets'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
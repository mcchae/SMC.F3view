
Ext.define('SMC.store.st_mon_process', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_mon_process',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'pid'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'mem'
                },
                {
                    name: 'io_read_count'
                },
                {
                    name: 'io_write_count'
                },
                {
                    name: 'io_read_bytes'
                },
                {
                    name: 'io_write_bytes'
                },
                {
                    name: 'cmd'
                }
            ]
        }, cfg)]);
    }
});
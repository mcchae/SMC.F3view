
Ext.define('AUS.store.st_xtm_mips_ramdisk', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_xtm_mips_ramdisk',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'file_type'
                },
                {
                    name: 'version'
                },
                {
                    name: 'cpu_type'
                },
                {
                    name: 'time'
                },
                {
                    name: 'fsid'
                },
                {
                    name: '_id'
                }
            ]
        }, cfg)]);
    }
});
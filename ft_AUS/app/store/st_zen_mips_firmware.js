
Ext.define('AUS.store.st_zen_mips_firmware', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_zen_mips_firmware',
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
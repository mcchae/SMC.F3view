
Ext.define('SMC.store.st_upgrade_selectfile', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_upgrade_selectfile',
            fields: [
                {
                    name: '_id'
                },
                {
                    name: 'file_type'
                },
                {
                    name: 'file_name'
                },
                {
                    name: 'version'
                },
                {
                    name: 'cpu_type'
                },
                {
                    name: 'file_path'
                }
            ]
        }, cfg)]);
    }
});
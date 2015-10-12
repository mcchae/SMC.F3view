
Ext.define('SMC.store.st_upgrade_devlist', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_upgrade_devlist',
            groupField: '@cid',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '_id'
                },
                {
                    name: 'file_name'
                },
                {
                    name: 'file_type'
                },
                {
                    name: 'ih_type'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'name'
                },
                {
                    name: 'process'
                },
                {
                    convert: function(v, rec) {
                        console.log('Convert upgrade state str');
                        return DEVICE_COMMON_CONST.DEV_UPGRADE_STAT[v];
                    },
                    name: 'state'
                },
                {
                    name: 'ts'
                }
            ]
        }, cfg)]);
    }
});
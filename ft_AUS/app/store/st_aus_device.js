
Ext.define('AUS.store.st_aus_device', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_aus_device',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'model_type'
                },
                {
                    name: 'cpu_type'
                },
                {
                    name: 'fw_version'
                },
                {
                    name: 'rd_version'
                },
                {
                    name: 'img_version'
                },
                {
                    name: 'do_version'
                },
                {
                    name: 'port'
                },
                {
                    name: 'boot_count'
                },
                {
                    name: 'serial'
                },
                {
                    name: 'time'
                },
                {
                    name: 'state'
                },
                {
                    name: 'msg'
                },
                {
                    name: 'fw_use'
                },
                {
                    name: 'rd_use'
                },
                {
                    name: 'img_use'
                },
                {
                    name: 'do_use'
                },
                {
                    name: 'reboot_use'
                },
                {
                    name: 'all_use'
                }
            ]
        }, cfg)]);
    }
});
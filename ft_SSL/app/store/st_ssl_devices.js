
Ext.define('SSL.store.st_ssl_devices', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_devices',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'ip'
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
                    name: 'rx'
                },
                {
                    name: 'tx'
                },
                {
                    name: 'fw_version'
                },
                {
                    name: 'rd_version'
                },
                {
                    name: 'tunnels'
                },
                {
                    name: 'connect'
                },
                {
                    name: 'interface_ip'
                },
                {
                    name: 'interface_use'
                },
                {
                    name: 'admin_id'
                },
                {
                    name: 'parent'
                }
            ]
        }, cfg)]);
    }
});
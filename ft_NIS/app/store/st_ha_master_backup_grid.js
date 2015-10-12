
Ext.define('SMC.store.st_ha_master_backup_grid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_master_backup_grid',
            fields: [
                {
                    name: 'info'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'name'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'timeout'
                },
                {
                    name: 'virtual_ip'
                }
            ]
        }, cfg)]);
    }
});
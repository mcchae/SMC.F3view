
Ext.define('SMC.store.st_upgrade_dev', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_upgrade_dev',
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
                    name: 'spd_state'
                },
                {
                    name: 'percent'
                }
            ]
        }, cfg)]);
    }
});
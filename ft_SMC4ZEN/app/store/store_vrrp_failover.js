
Ext.define('SMC4ZEN.store.store_vrrp_failover', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_vrrp_failover',
            autoLoad: true,
            data: [
                {
                    name: 'Master',
                    val: 'master'
                },
                {
                    name: 'Backup',
                    val: 'backup'
                },
                {
                    name: 'None',
                    val: 'none'
                }
            ],
            fields: [
                {
                    name: 'val'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
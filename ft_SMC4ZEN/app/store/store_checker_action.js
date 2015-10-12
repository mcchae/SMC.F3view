
Ext.define('SMC4ZEN.store.store_checker_action', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_checker_action',
            data: [
                {
                    val: 'None'
                },
                {
                    val: 'LineLB'
                },
                {
                    val: 'Proxy'
                },
                {
                    val: 'Proxy2'
                },
                {
                    val: 'Standby'
                },
                {
                    val: 'Serial-Backup'
                },
                {
                    val: 'Route'
                }
            ],
            fields: [
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_portscan_extention', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_portscan_extention',
            fields: [
                {
                    name: '@action'
                },
                {
                    name: '@drop_type'
                },
                {
                    name: '@scan_type'
                },
                {
                    name: '@time'
                },
                {
                    name: '@use'
                }
            ]
        }, cfg)]);
    }
});
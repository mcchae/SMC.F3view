
Ext.define('SMC4ZEN.store.st_interface_grid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_grid',
            fields: [
                {
                    name: 'adsl'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'name'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
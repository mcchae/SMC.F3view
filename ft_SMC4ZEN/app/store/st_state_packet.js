
Ext.define('SMC4ZEN.store.st_state_packet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_state_packet',
            fields: [
                {
                    name: '@b64'
                },
                {
                    name: '@b128'
                },
                {
                    name: '@b256'
                },
                {
                    name: '@b512'
                },
                {
                    name: '@b1024'
                },
                {
                    name: '@b1500'
                }
            ]
        }, cfg)]);
    }
});
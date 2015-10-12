
Ext.define('SMC.store.st_basic_packet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_packet',
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
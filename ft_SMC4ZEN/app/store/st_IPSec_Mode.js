
Ext.define('SMC4ZEN.store.st_IPSec_Mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_Mode',
            data: [
                {
                    mode: 'Tunnel'
                },
                {
                    mode: 'Transport'
                }
            ],
            fields: [
                {
                    name: 'mode'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_rtm_checkbandwidth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_checkbandwidth',
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
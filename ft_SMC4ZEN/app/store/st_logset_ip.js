
Ext.define('SMC4ZEN.store.st_logset_ip', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_logset_ip',
            fields: [
                {
                    name: 'member'
                }
            ]
        }, cfg)]);
    }
});
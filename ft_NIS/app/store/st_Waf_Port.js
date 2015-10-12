
Ext.define('SMC.store.st_Waf_Port', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_Waf_Port',
            fields: [
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_dash_nslookup', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_nslookup',
            fields: [
                {
                    name: 'ip'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_dash_whois', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_whois',
            fields: [
                {
                    name: 'content'
                }
            ]
        }, cfg)]);
    }
});
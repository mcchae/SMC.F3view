
Ext.define('SMC.store.st_dash_corp4', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_corp4',
            fields: [
                {
                    name: 'time'
                },
                {
                    name: 'inkbps'
                },
                {
                    name: 'outkbps'
                }
            ]
        }, cfg)]);
    }
});
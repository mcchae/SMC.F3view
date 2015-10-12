
Ext.define('SMC.store.st_dash_internet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_internet',
            fields: [
                {
                    name: 'inkbps'
                },
                {
                    name: 'outkbps'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
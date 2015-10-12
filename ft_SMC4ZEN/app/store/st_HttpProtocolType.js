
Ext.define('SMC4ZEN.store.st_HttpProtocolType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_HttpProtocolType',
            data: [
                {
                    name: 'TCP'
                }
            ],
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
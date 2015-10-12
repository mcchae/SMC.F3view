
Ext.define('SMC.store.st_Object_Interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_Object_Interface',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_ObjectSelectGrid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ObjectSelectGrid',
            fields: [
                {
                    name: '@name'
                },
                {
                    name: '#text'
                },
                {
                    name: 'kind'
                }
            ]
        }, cfg)]);
    }
});
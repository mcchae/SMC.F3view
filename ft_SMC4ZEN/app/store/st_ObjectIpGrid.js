
Ext.define('SMC4ZEN.store.st_ObjectIpGrid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ObjectIpGrid',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: '@version'
                },
                {
                    name: '_start'
                },
                {
                    name: '_end'
                }
            ]
        }, cfg)]);
    }
});
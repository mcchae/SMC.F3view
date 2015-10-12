
Ext.define('SMC.store.st_ObjectLink_Policy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ObjectLink_Policy',
            fields: [
                {
                    name: 'text'
                },
                {
                    name: '_kind'
                },
                {
                    name: 'cid'
                },
                {
                    name: 'updated'
                },
                {
                    name: 'modifier'
                }
            ],
            sorters: {
                direction: 'DESC',
                property: 'updated'
            }
        }, cfg)]);
    }
});
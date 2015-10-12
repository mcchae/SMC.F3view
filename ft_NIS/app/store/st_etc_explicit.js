
Ext.define('SMC.store.st_etc_explicit', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_etc_explicit',
            fields: [
                {
                    name: 'dst'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'src'
                }
            ]
        }, cfg)]);
    }
});
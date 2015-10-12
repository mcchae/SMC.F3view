
Ext.define('SMC.store.st_additional_arptable', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_additional_arptable',
            fields: [
                {
                    name: 'MyField469'
                },
                {
                    name: 'MyField470'
                },
                {
                    name: 'MyField471'
                },
                {
                    name: 'MyField472'
                },
                {
                    name: 'MyField473'
                }
            ]
        }, cfg)]);
    }
});
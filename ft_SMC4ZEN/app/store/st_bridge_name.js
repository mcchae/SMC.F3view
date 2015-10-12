
Ext.define('SMC4ZEN.store.st_bridge_name', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bridge_name',
            data: [
                {
                    br: 'br0'
                },
                {
                    br: 'br1'
                },
                {
                    br: 'br2'
                },
                {
                    br: 'br3'
                },
                {
                    br: 'br4'
                },
                {
                    br: 'br5'
                },
                {
                    br: 'br6'
                },
                {
                    br: 'br7'
                },
                {
                    br: 'br8'
                },
                {
                    br: 'br9'
                }
            ],
            fields: [
                {
                    name: 'br'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC.store.st_ha_branchmain_destgrid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_branchmain_destgrid',
            fields: [
                {
                    name: 'action'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'number'
                }
            ]
        }, cfg)]);
    }
});
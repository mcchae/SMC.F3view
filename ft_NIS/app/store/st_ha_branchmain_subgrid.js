
Ext.define('SMC.store.st_ha_branchmain_subgrid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_branchmain_subgrid',
            fields: [
                {
                    name: 'info'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'name'
                },
                {
                    name: 'period'
                },
                {
                    name: 'target_ip'
                },
                {
                    name: 'timeout'
                }
            ]
        }, cfg)]);
    }
});
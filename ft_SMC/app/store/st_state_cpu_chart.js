
Ext.define('SMC.store.st_state_cpu_chart', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_state_cpu_chart',
            fields: [
                {
                    name: 'cpu_info'
                }
            ]
        }, cfg)]);
    }
});
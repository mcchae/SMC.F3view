
Ext.define('SMC.store.st_rtm_obstacle', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'st_rtm_obstacle',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'gate_ip'
                },
                {
                    name: 'occur'
                },
                {
                    name: 'pass'
                },
                {
                    name: 'state'
                }
            ]
        }, cfg)]);
    }
});
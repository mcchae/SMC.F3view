
Ext.define('SMC.store.st_rtm_version', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'st_rtm_version',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'fw_version'
                },
                {
                    name: 'rd_version'
                },
                {
                    name: 'gate_ip'
                },
                {
                    name: 'state'
                }
            ]
        }, cfg)]);
    }
});
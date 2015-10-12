
Ext.define('SMC4ZEN.store.st_state_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_state_interface',
            fields: [
                {
                    name: '@name'
                },
                {
                    name: 'advertised'
                },
                {
                    name: 'coli'
                },
                {
                    name: 'error'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'ip_mode'
                },
                {
                    name: 'link'
                },
                {
                    name: 'mac_addr'
                },
                {
                    name: 'port'
                }
            ]
        }, cfg)]);
    }
});
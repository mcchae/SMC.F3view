
Ext.define('SMC.store.st_basic_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_basic_interface',
            fields: [
                {
                    name: '@name'
                },
                {
                    name: 'advertised'
                },
                {
                    name: 'colli'
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
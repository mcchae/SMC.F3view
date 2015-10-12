
Ext.define('SMC.store.st_alg_telnet', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_alg_telnet',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'action'
                },
                {
                    name: 'download'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'limit'
                },
                {
                    name: 'port'
                },
                {
                    name: 'public_ip'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'user'
                }
            ]
        }, cfg)]);
    }
});
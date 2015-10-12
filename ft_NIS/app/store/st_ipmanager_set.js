
Ext.define('SMC.store.st_ipmanager_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ipmanager_set',
            fields: [
                {
                    name: '@chk_mac'
                },
                {
                    name: '@num'
                },
                {
                    name: 'action'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'mac'
                }
            ]
        }, cfg)]);
    }
});
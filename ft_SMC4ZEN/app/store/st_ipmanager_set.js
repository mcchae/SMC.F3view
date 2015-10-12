
Ext.define('SMC4ZEN.store.st_ipmanager_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
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
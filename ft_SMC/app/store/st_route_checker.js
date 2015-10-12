
Ext.define('SMC.store.st_route_checker', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_checker',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'decision'
                },
                {
                    name: 'fail'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'mac'
                },
                {
                    name: 'name'
                },
                {
                    name: 'period'
                },
                {
                    name: 'pool'
                },
                {
                    name: 'setting'
                }
            ]
        }, cfg)]);
    }
});
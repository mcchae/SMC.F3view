
Ext.define('SMC.store.st_SSLServerGroup', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_SSLServerGroup',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@name'
                },
                {
                    name: 'iconCls'
                }
            ]
        }, cfg)]);
    }
});
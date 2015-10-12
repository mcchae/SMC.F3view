
Ext.define('SMC.store.st_dash_session_top', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_session_top',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'sessions'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_ssl_usrgroups', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ssl_usrgroups',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@cid'
                }
            ]
        }, cfg)]);
    }
});
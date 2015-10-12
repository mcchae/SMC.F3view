
Ext.define('SMC.store.st_dash_noresponse', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dash_noresponse',
            fields: [
                {
                    name: 'location'
                },
                {
                    name: 'name'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'time'
                },
                {
                    name: 'corp'
                },
                {
                    name: 'etc'
                },
                {
                    name: 'key'
                }
            ]
        }, cfg)]);
    }
});
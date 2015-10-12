
Ext.define('SMC4ZEN.store.st_User_AuthType', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_User_AuthType',
            data: [
                {
                    authtype: 'Local',
                    authtypeValue: 'local'
                },
                {
                    authtype: 'Radius',
                    authtypeValue: 'radius'
                }
            ],
            fields: [
                {
                    name: 'authtype'
                },
                {
                    name: 'authtypeValue'
                }
            ]
        }, cfg)]);
    }
});
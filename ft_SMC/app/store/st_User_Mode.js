
Ext.define('SMC.store.st_User_Mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_User_Mode',
            data: [
                {
                    mode: '허용',
                    modeValue: 'allow'
                },
                {
                    mode: '차단',
                    modeValue: 'deny'
                }
            ],
            fields: [
                {
                    name: 'mode'
                },
                {
                    name: 'modeValue'
                }
            ]
        }, cfg)]);
    }
});
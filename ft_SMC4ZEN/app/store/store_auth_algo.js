
Ext.define('SMC4ZEN.store.store_auth_algo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_auth_algo',
            data: [
                {
                    text: 'MD5',
                    value: 'md5'
                },
                {
                    text: 'SHA1',
                    value: 'sha1'
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.store_privacy_algo', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_privacy_algo',
            data: [
                {
                    text: 'None',
                    value: 'none'
                },
                {
                    text: 'DES',
                    value: 'des'
                },
                {
                    text: 'AES128',
                    value: 'aes128'
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
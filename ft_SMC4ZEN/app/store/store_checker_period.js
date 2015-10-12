
Ext.define('SMC4ZEN.store.store_checker_period', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_checker_period',
            data: [
                {
                    sec: '1'
                },
                {
                    sec: '3'
                },
                {
                    sec: '5'
                },
                {
                    sec: '10'
                }
            ],
            fields: [
                {
                    name: 'sec'
                }
            ]
        }, cfg)]);
    }
});
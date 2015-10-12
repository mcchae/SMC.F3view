
Ext.define('TMOV.store.st_tmov_signature', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_signature',
            fields: [
                {
                    name: 'st_offset'
                },
                {
                    name: 'chk_len'
                },
                {
                    name: 'signature'
                }
            ]
        }, cfg)]);
    }
});
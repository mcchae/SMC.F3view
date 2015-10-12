
Ext.define('SMC.store.st_spam_rblserver', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_spam_rblserver',
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
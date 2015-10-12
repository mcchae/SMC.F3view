
Ext.define('TMOV.store.st_tmov_upgrade', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_upgrade',
            fields: [
                {
                    name: 'type'
                },
                {
                    name: 'cpu'
                },
                {
                    name: 'version'
                },
                {
                    name: 'filename'
                }
            ]
        }, cfg)]);
    }
});
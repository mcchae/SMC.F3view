
Ext.define('SMC.store.st_multiipsec_backup_dr3', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_multiipsec_backup_dr3',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: '@version'
                }
            ]
        }, cfg)]);
    }
});
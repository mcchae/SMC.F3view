
Ext.define('SMC4ZEN.store.st_report_reportlist', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_report_reportlist',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '@num'
                },
                {
                    name: '@use'
                },
                {
                    name: 'create'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'email'
                },
                {
                    name: 'name'
                },
                {
                    name: 'storage'
                },
                {
                    name: 'system'
                },
                {
                    name: 'tracker'
                }
            ]
        }, cfg)]);
    }
});
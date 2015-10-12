
Ext.define('TMOV.store.st_tmov_extension_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_extension_list',
            fields: [
                {
                    name: 'group_name'
                },
                {
                    name: 'parent'
                },
                {
                    name: 'ext_name'
                },
                {
                    name: 'ext_cmt'
                }
            ]
        }, cfg)]);
    }
});
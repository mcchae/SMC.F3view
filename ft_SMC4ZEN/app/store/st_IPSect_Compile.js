
Ext.define('SMC4ZEN.store.st_IPSect_Compile', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field',
        'Ext.util.Sorter'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSect_Compile',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: '@use'
                },
                {
                    name: '_id'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'isakmpsa'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'group'
                },
                {
                    name: 'uuid'
                },
                {
                    name: 'temp_id'
                },
                {
                    name: 'temp_cid'
                },
                {
                    name: 'temp_ip'
                },
                {
                    name: 'temp_isakmpsa'
                },
                {
                    name: 'temp_interface'
                }
            ],
            sorters: {
                property: 'temp_ip'
            }
        }, cfg)]);
    }
});
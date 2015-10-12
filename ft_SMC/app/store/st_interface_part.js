
Ext.define('SMC.store.st_interface_part', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_interface_part',
            data: [
                {
                    part: 'Internal'
                },
                {
                    part: 'DMZ'
                },
                {
                    part: 'External'
                }
            ],
            fields: [
                {
                    name: 'part'
                }
            ]
        }, cfg)]);
    }
});
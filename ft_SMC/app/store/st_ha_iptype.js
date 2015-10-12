
Ext.define('SMC.store.st_ha_iptype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_iptype',
            data: [
                {
                    type: 'single'
                },
                {
                    type: 'range'
                },
                {
                    type: 'netmask'
                },
                {
                    type: 'odd'
                },
                {
                    type: 'even'
                }
            ],
            fields: [
                {
                    name: 'type'
                }
            ]
        }, cfg)]);
    }
});
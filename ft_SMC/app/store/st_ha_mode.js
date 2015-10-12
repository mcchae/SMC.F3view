
Ext.define('SMC.store.st_ha_mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_mode',
            data: [
                {
                    mode: 'primary'
                },
                {
                    mode: 'backup'
                },
                {
                    mode: 'ha-link'
                }
            ],
            fields: [
                {
                    name: 'mode'
                }
            ]
        }, cfg)]);
    }
});
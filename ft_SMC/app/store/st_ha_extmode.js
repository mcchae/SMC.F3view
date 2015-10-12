
Ext.define('SMC.store.st_ha_extmode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_ha_extmode',
            data: [
                {
                    mode: 'none'
                },
                {
                    mode: 'linelb'
                },
                {
                    mode: 'standby'
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
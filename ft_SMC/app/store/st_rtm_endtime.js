
Ext.define('SMC.store.st_rtm_endtime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_endtime',
            fields: [
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
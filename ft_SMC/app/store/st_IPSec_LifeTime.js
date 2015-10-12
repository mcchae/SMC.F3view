
Ext.define('SMC.store.st_IPSec_LifeTime', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_LifeTime',
            data: [
                {
                    time: 1
                },
                {
                    time: 2
                },
                {
                    time: 4
                },
                {
                    time: 8
                },
                {
                    time: 16
                },
                {
                    time: 24
                }
            ],
            fields: [
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
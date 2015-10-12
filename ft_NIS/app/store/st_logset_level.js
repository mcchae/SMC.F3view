
Ext.define('SMC.store.st_logset_level', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_logset_level',
            data: [
                {
                    loglevel: 'NoLog'
                },
                {
                    loglevel: 'Debug'
                },
                {
                    loglevel: 'Information'
                },
                {
                    loglevel: 'Normal'
                },
                {
                    loglevel: 'Warning'
                },
                {
                    loglevel: 'Serious'
                },
                {
                    loglevel: 'Critical'
                },
                {
                    loglevel: 'user'
                }
            ],
            fields: [
                {
                    name: 'loglevel'
                }
            ]
        }, cfg)]);
    }
});
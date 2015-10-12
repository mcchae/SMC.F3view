
Ext.define('SMC.store.st_route_checker_mode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_route_checker_mode',
            data: [
                {
                    runmode: 'None'
                },
                {
                    runmode: 'LineLB'
                },
                {
                    runmode: 'Proxy'
                },
                {
                    runmode: 'Proxy2'
                },
                {
                    runmode: 'standby'
                }
            ],
            fields: [
                {
                    name: 'runmode'
                }
            ]
        }, cfg)]);
    }
});
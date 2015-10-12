
Ext.define('SMC.store.st_portscan_blocktype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_portscan_blocktype',
            data: [
                {
                    name: '① Protocol, 출발지 IP, Port 차단 (1 : N)',
                    value: 1
                },
                {
                    name: '② Protocol, 목적지 IP, Port 차단 (N : 1)',
                    value: 2
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
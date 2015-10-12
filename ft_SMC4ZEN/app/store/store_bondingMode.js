
Ext.define('SMC4ZEN.store.store_bondingMode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_bondingMode',
            data: [
                {
                    value: '0',
                    name: 'Round Robin'
                },
                {
                    value: '1',
                    name: 'Active Backup'
                },
                {
                    value: '2',
                    name: 'Balance XOR'
                },
                {
                    value: '3',
                    name: 'Broadcast'
                },
                {
                    value: '4',
                    name: '802.3ad'
                },
                {
                    value: '5',
                    name: 'Balance TLB'
                },
                {
                    value: '6',
                    name: 'Balance ALB'
                }
            ],
            fields: [
                {
                    name: 'value'
                },
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
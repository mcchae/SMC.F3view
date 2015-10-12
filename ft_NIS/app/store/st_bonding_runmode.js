
Ext.define('SMC.store.st_bonding_runmode', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_runmode',
            data: [
                {
                    name: 'Round Robin',
                    mode: 0
                },
                {
                    name: 'Active Backup',
                    mode: 1
                },
                {
                    name: 'Balance XOR',
                    mode: 2
                },
                {
                    name: 'Broadcast',
                    mode: 3
                },
                {
                    name: '802.3ad',
                    mode: 4
                },
                {
                    name: 'Balance TLB',
                    mode: 5
                },
                {
                    name: 'Balance ALB',
                    mode: 6
                },
                
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'mode'
                }
            ]
        }, cfg)]);
    }
});
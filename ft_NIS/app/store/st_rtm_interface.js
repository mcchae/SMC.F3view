
Ext.define('SMC.store.st_rtm_interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_interface',
            data: [
                {
                    eth: 'eth0',
                    inputValue: 1
                },
                {
                    eth: 'eth1',
                    inputValue: 2
                },
                {
                    eth: 'eth2',
                    inputValue: 4
                },
                {
                    eth: 'eth3',
                    inputValue: 8
                },
                {
                    eth: 'eth4',
                    inputValue: 16
                },
                {
                    eth: 'eth5',
                    inputValue: 32
                },
                {
                    eth: 'eth6',
                    inputValue: 64
                },
                {
                    eth: 'eth7',
                    inputValue: 128
                },
                
            ],
            fields: [
                {
                    name: 'eth'
                },
                {
                    name: 'inputValue'
                }
            ]
        }, cfg)]);
    }
});
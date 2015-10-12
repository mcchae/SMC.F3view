
Ext.define('SMC4ZEN.store.st_common_alleth', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_common_alleth',
            data: [
                {
                    eth: 'eth0'
                },
                {
                    eth: 'eth1'
                },
                {
                    eth: 'eth2'
                },
                {
                    eth: 'eth3'
                },
                {
                    eth: 'eth4'
                },
                {
                    eth: 'eth5'
                },
                {
                    eth: 'eth6'
                },
                {
                    eth: 'eth7'
                },
                {
                    eth: 'eth8'
                },
                {
                    eth: 'eth9'
                },
                {
                    eth: 'eth10'
                },
                {
                    eth: 'eth11'
                },
                {
                    eth: 'eth12'
                },
                {
                    eth: 'eth13'
                },
                {
                    eth: 'eth14'
                },
                {
                    eth: 'eth15'
                },
                {
                    eth: 'eth16'
                },
                {
                    eth: 'eth17'
                },
                {
                    eth: 'eth18'
                },
                {
                    eth: 'eth19'
                },
                {
                    eth: 'eth20'
                },
                {
                    eth: 'eth21'
                },
                {
                    eth: 'eth22'
                },
                {
                    eth: 'eth23'
                },
                {
                    eth: 'eth24'
                },
                {
                    eth: 'eth25'
                }
            ],
            fields: [
                {
                    name: 'eth'
                }
            ]
        }, cfg)]);
    }
});
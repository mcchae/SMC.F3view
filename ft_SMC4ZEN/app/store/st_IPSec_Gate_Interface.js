
Ext.define('SMC4ZEN.store.st_IPSec_Gate_Interface', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_IPSec_Gate_Interface',
            data: [
                {
                    '#text': 'Any'
                },
                {
                    '#text': 'eth0'
                },
                {
                    '#text': 'eth1'
                },
                {
                    '#text': 'eth2'
                },
                {
                    '#text': 'eth3'
                },
                {
                    '#text': 'eth4'
                },
                {
                    '#text': 'eth5'
                },
                {
                    '#text': 'eth6'
                },
                {
                    '#text': 'eth7'
                },
                {
                    '#text': 'eth8'
                },
                {
                    '#text': 'eth9'
                },
                {
                    '#text': 'eth10'
                },
                {
                    '#text': 'eth11'
                },
                {
                    '#text': 'eth12'
                },
                {
                    '#text': 'eth13'
                },
                {
                    '#text': 'eth14'
                },
                {
                    '#text': 'eth15'
                },
                {
                    '#text': 'eth16'
                },
                {
                    '#text': 'eth17'
                },
                {
                    '#text': 'eth18'
                },
                {
                    '#text': 'eth19'
                },
                {
                    '#text': 'eth20'
                },
                {
                    '#text': 'eth21'
                },
                {
                    '#text': 'eth22'
                },
                {
                    '#text': 'eth23'
                },
                {
                    '#text': 'eth24'
                },
                {
                    '#text': 'eth25'
                }
            ],
            fields: [
                {
                    name: '#text'
                }
            ]
        }, cfg)]);
    }
});
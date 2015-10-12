
Ext.define('SMC.store.st_vpn_policy', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_vpn_policy',
            data: [
                {
                    key: 'ipsec_peer',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'ipsec_host',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'ssl_usr ',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                }
            ],
            fields: [
                {
                    name: 'key'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
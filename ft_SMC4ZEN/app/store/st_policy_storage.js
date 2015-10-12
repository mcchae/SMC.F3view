
Ext.define('SMC4ZEN.store.st_policy_storage', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_policy_storage',
            data: [
                {
                    key: 'spd_ipv4_filter_1',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ipv4_filter_2',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ipv4_filter',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ipv4_nat',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ipv6_filter',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ipv6_nat',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_ips_pattern',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'svc_url',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'spd_whiteblack',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'vlan_setting',
                    value: {
                        
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
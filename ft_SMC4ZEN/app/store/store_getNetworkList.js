
Ext.define('SMC4ZEN.store.store_getNetworkList', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_getNetworkList',
            fields: [
                {
                    name: 'num'
                },
                {
                    name: 'net_name'
                },
                {
                    name: 'type'
                },
                {
                    name: 'net_info'
                },
                {
                    name: 'duplex'
                },
                {
                    name: 'zone'
                },
                {
                    name: 'member'
                },
                {
                    name: 'virtual_ip'
                },
                {
                    name: 'multipath'
                },
                {
                    name: 'dhcp'
                },
                {
                    name: 'etc'
                }
            ]
        }, cfg)]);
    }
});
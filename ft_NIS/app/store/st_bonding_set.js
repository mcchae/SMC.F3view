
Ext.define('SMC.store.st_bonding_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@groupcid'
                },
                {
                    name: '@num'
                },
                {
                    name: 'actionmode'
                },
                {
                    name: 'arp'
                },
                {
                    name: 'hash'
                },
                {
                    name: 'iface'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'lacp'
                },
                {
                    name: 'mode'
                },
                {
                    name: 'monitor'
                },
                {
                    name: 'name'
                },
                {
                    name: 'primary'
                }
            ]
        }, cfg)]);
    }
});
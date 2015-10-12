
Ext.define('SMC4ZEN.store.st_dhcpserver_set', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_dhcpserver_set',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num'
                },
                {
                    name: '@use'
                },
                {
                    name: 'daddr'
                },
                {
                    name: 'domain1'
                },
                {
                    name: 'domain2'
                },
                {
                    name: 'gateway'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'netmask'
                },
                {
                    name: 'saddr'
                },
                {
                    name: 'tftp'
                },
                {
                    name: 'time'
                }
            ]
        }, cfg)]);
    }
});
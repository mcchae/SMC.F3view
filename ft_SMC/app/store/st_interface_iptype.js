
Ext.define('SMC.store.st_interface_iptype', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st',
            data: [
                {
                    name: 'None',
                    value: null
                },
                {
                    name: 'Static',
                    value: 'Static'
                },
                {
                    name: 'DHCP',
                    value: 'DHCP'
                },
                {
                    name: 'PPPoE',
                    value: 'PPPoE'
                },
                {
                    name: 'HSDPA/LTE',
                    value: 'HSDPA/LTE'
                }
            ],
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'value'
                }
            ]
        }, cfg)]);
    }
});
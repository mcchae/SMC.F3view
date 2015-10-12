
Ext.define('SMC.store.st_smc_device_serchcond', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_smc_device_serchcond',
            data: [
                {
                    name: '장비명',
                    value: 'name'
                },
                {
                    name: 'IP 주소',
                    value: 'ip'
                },
                {
                    name: '보안정책',
                    value: 'policy'
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
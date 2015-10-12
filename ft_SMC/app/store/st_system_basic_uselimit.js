
Ext.define('SMC.store.st_system_basic_uselimit', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_system_basic_uselimit',
            data: [
                {
                    name: '알람',
                    value: 1
                },
                {
                    name: '알람 + 세션생성 제한',
                    value: 2
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

Ext.define('SMC4ZEN.store.store_logserver_xtm', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_logserver_xtm',
            data: [
                {
                    name: '독립로그서버 사용',
                    val: 'off'
                },
                {
                    name: 'SMC 로그서버 사용',
                    val: 'on'
                }
            ],
            fields: [
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'off'){
                            return __zen('use_in_log_server');
                        }else{
                            return __zen('use_smc_log_server');
                        }
                    },
                    name: 'name'
                },
                {
                    name: 'val'
                }
            ]
        }, cfg)]);
    }
});
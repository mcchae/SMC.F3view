
Ext.define('SMC4ZEN.store.store_l3_way_a', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l3_way_a',
            autoLoad: true,
            data: [
                {
                    name: 'HA 상태 동기',
                    val: 'Keep Synchronous'
                },
                {
                    name: 'HA 상태 비 동기',
                    val: 'Keep Asynchronous'
                }
            ],
            fields: [
                {
                    name: 'val'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'Keep Synchronous'){
                            return __zen('ha_keep_sync');
                        }else{
                            return __zen('ha_keep_asyn');
                        }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
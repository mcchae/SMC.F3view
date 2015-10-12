
Ext.define('SMC4ZEN.store.store_l3_way_s', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_l3_way_s',
            data: [
                {
                    name: '설정 상태 유지',
                    val: 'Keep Setting'
                },
                {
                    name: '변경 상태 유지',
                    val: 'Keep Changing'
                }
            ],
            fields: [
                {
                    name: 'val'
                },
                {
                    convert: function(v, rec) {
                        if(rec.data.val === 'Keep Setting'){
                            return __zen('keep_setting');
                        }else{
                            return __zen('keep_changing');
                        }
                    },
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
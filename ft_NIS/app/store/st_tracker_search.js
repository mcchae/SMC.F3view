
Ext.define('SMC.store.st_tracker_search', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tracker_search',
            data: [
                {
                    name: '출발지',
                    value: 'sipv4'
                },
                {
                    name: '목적지',
                    value: 'dipv4'
                },
                {
                    name: '서비스',
                    value: 'service'
                },
                {
                    name: '정책',
                    value: 'uid'
                },
                {
                    name: '국가코드',
                    value: 'country'
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
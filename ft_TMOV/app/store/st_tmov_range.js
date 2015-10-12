
Ext.define('TMOV.store.st_tmov_range', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_tmov_range',
            data: [
                {
                    text: '10분',
                    index: 0
                },
                {
                    text: '1시간',
                    index: 1
                },
                {
                    text: '하루',
                    index: 2
                },
                {
                    text: '일주일',
                    index: 3
                },
                {
                    text: '한달',
                    index: 4
                }
            ],
            fields: [
                {
                    name: 'text'
                },
                {
                    name: 'index'
                }
            ]
        }, cfg)]);
    }
});
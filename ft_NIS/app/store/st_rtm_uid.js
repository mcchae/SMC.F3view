
Ext.define('SMC.store.st_rtm_uid', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_rtm_uid',
            data: [
                {
                    uid: 'All'
                },
                {
                    uid: '필터링 UID'
                },
                {
                    uid: 'NAT UID'
                }
            ],
            fields: [
                {
                    name: 'uid'
                }
            ]
        }, cfg)]);
    }
});
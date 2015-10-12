
Ext.define('SMC4ZEN.store.st_alg_ftp', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_alg_ftp',
            fields: [
                {
                    name: '@num'
                },
                {
                    name: 'action'
                },
                {
                    name: 'advertised_ftp_ip'
                },
                {
                    name: 'argument'
                },
                {
                    name: 'command'
                },
                {
                    name: 'download'
                },
                {
                    name: 'extension'
                },
                {
                    name: 'ftp_ip'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'max_user'
                },
                {
                    name: 'port'
                },
                {
                    name: 'size'
                },
                {
                    name: 'upload'
                },
                {
                    name: 'user_list'
                }
            ]
        }, cfg)]);
    }
});

Ext.define('SMC4ZEN.store.st_RPC', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_RPC',
            data: [
                {
                    rpc: 'portmapper',
                    rpcValue: 100000
                },
                {
                    rpc: 'rstatd',
                    rpcValue: 100001
                },
                {
                    rpc: 'rusersd',
                    rpcValue: 100002
                },
                {
                    rpc: 'nfs',
                    rpcValue: 100003
                },
                {
                    rpc: 'ypserv',
                    rpcValue: 100004
                },
                {
                    rpc: 'mountd',
                    rpcValue: 100005
                },
                {
                    rpc: 'ypbind',
                    rpcValue: 100007
                },
                {
                    rpc: 'walld',
                    rpcValue: 100008
                },
                {
                    rpc: 'yppasswdd',
                    rpcValue: 100009
                },
                {
                    rpc: 'etherstatd',
                    rpcValue: 100010
                },
                {
                    rpc: 'rquotad',
                    rpcValue: 100011
                },
                {
                    rpc: 'sprayd',
                    rpcValue: 100012
                },
                {
                    rpc: 'mapper_3270',
                    rpcValue: 100013
                },
                {
                    rpc: 'rje_mapper',
                    rpcValue: 100014
                },
                {
                    rpc: 'selection_svc',
                    rpcValue: 100015
                },
                {
                    rpc: 'database_svc',
                    rpcValue: 100016
                },
                {
                    rpc: 'rexd',
                    rpcValue: 100017
                },
                {
                    rpc: 'alis',
                    rpcValue: 100018
                },
                {
                    rpc: 'sched',
                    rpcValue: 100019
                },
                {
                    rpc: 'llockmgr',
                    rpcValue: 100020
                },
                {
                    rpc: 'nlockmgr',
                    rpcValue: 100021
                },
                {
                    rpc: 'x25_inr',
                    rpcValue: 100022
                },
                {
                    rpc: 'statmon',
                    rpcValue: 100023
                },
                {
                    rpc: 'status',
                    rpcValue: 100024
                },
                {
                    rpc: 'bootparam',
                    rpcValue: 100026
                },
                {
                    rpc: 'ypupdated',
                    rpcValue: 100028
                },
                {
                    rpc: 'keyserv',
                    rpcValue: 100029
                },
                {
                    rpc: 'sunlink_mapper',
                    rpcValue: 100033
                },
                {
                    rpc: 'tfsd',
                    rpcValue: 100037
                },
                {
                    rpc: 'nsed',
                    rpcValue: 100038
                },
                {
                    rpc: 'nsemntd',
                    rpcValue: 100039
                },
                {
                    rpc: 'showfhd',
                    rpcValue: 100043
                }
            ],
            fields: [
                {
                    name: 'rpc'
                },
                {
                    name: 'rpcValue'
                }
            ]
        }, cfg)]);
    }
});
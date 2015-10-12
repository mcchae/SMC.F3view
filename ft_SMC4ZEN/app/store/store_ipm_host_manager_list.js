
Ext.define('SMC4ZEN.store.store_ipm_host_manager_list', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.JsonP',
        'Ext.data.reader.Json',
        'Ext.data.field.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'store_ipm_host_manager_list',
            proxy: {
                type: 'jsonp',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'action'
                },
                {
                    convert: function(v, rec) {

                        var action;
                        
                        if(rec.data.action === "accept"){ action = __zen('detect'); }
                        else{ action = __zen('deny'); }

                        return "["+__zen('obj_name')+"]"+rec.data.name + ", " + "[" +__zen('inter') + "]" + rec.data.interface + ", " + "["+__zen('network')+"]"+rec.data.ip + ", " + "[" + action + "]";
                    },
                    name: 'total'
                }
            ]
        }, cfg)]);
    }
});
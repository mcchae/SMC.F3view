
Ext.define('SMC.store.st_bonding_name', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_bonding_name',
            data: [
                {
                    name: 'bond0'
                },
                {
                    name: 'bond1'
                },
                {
                    name: 'bond2'
                },
                {
                    name: 'bond3'
                },
                {
                    name: 'bond4'
                },
                {
                    name: 'bond5'
                },
                {
                    name: 'bond6'
                },
                {
                    name: 'bond7'
                },
                {
                    name: 'bond8'
                },
                {
                    name: 'bond9'
                }
            ],
            fields: [
                {
                    name: 'name'
                }
            ]
        }, cfg)]);
    }
});
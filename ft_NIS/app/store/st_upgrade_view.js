
Ext.define('SMC.store.st_upgrade_view', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'st_upgrade_view',
            data: [
                {
                    name: 'All	   ',
                    value: 'all'
                },
                {
                    name: 'Firmware ',
                    value: 'firmware'
                },
                {
                    name: 'RamDisk  ',
                    value: 'ramdisk'
                },
                {
                    name: 'AppImg   ',
                    value: 'appimg'
                },
                {
                    name: 'DO       ',
                    value: 'do'
                },
                {
                    name: 'KISCOM DB    ',
                    value: 'kiscomdb'
                },
                {
                    name: 'Virus Pattern',
                    value: 'virus'
                },
                {
                    name: 'Agent    ',
                    value: 'agent'
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
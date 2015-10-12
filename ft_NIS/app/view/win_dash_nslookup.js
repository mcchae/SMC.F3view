
Ext.define('SMC.view.win_dash_nslookup', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 518,
    width: 383,
    title: 'nslookup',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    header: false,
                    titleCollapse: false,
                    hideHeaders: true,
                    store: 'st_dash_nslookup',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 300,
                            dataIndex: 'ip',
                            text: 'host'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});

Ext.define('SMC.view.win_dash_port', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    height: 400,
    id: 'win_dash_port',
    width: 640,
    layout: 'fit',
    title: '서비스 TOP10',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    header: false,
                    store: 'st_dash_port',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'port',
                            text: '서비스'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'bps',
                            text: '트래픽(BPS)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'pps',
                            text: '트래픽(PPS)'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_portAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_portDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_dash_portAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);
    },

    onWin_dash_portDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);
    }

});
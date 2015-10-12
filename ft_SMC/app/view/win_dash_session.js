
Ext.define('SMC.view.win_dash_session', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    height: 400,
    id: 'win_dash_session',
    width: 640,
    layout: 'fit',
    title: '세션 TOP10',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    header: false,
                    store: 'st_dash_session_top',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'name',
                            text: '이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'sessions',
                            text: '세션(수)'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_sessionAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_sessionDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_dash_sessionAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);
    },

    onWin_dash_sessionDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);
    }

});
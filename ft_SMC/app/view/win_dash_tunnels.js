
Ext.define('SMC.view.win_dash_tunnels', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 600,
    id: 'win_dash_tunnels',
    width: 1400,
    layout: 'fit',
    title: '장애현황 - 터널장애',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_dash_tunnels',
                    store: 'st_dash_tunnels',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'location',
                            text: '지역'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'name',
                            text: '장비명'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'ip',
                            text: 'IP 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'cpu',
                            text: 'CPU 사용(%)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'memory',
                            text: '메모리 사용(%)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'sessions',
                            text: '세션(수)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'tunnels',
                            text: '터널(수)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'time',
                            text: '장애시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value === 'NH_BANK')
                                {
                                    return '농협은행';
                                }

                                if (value === 'NH_NACF')
                                {
                                    return '농협중앙회';
                                }

                                if (value === 'NH_NLCF')
                                {
                                    return '농축협';
                                }

                                if (value === 'ETC')
                                {
                                    return '기타';
                                }
                            },
                            dataIndex: 'corp',
                            text: '법인'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 260,
                            dataIndex: 'etc',
                            text: '기타정보'
                        }
                    ],
                    viewConfig: {
                        id: 'grv_dash_tunnels'
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_tunnelsAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_tunnelsDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_dash_tunnelsAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);

        Ext.Ajax.request(
            {
                url : 'api/ftDashboard/SeekLineErrorList',
                method : 'GET',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_dash_tunnels').loadData(resObj);
                }
            });

    },

    onWin_dash_tunnelsDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);
    }

});
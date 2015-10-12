
Ext.define('SMC.view.win_dash_sessions', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.grid.View',
        'Ext.grid.plugin.CellEditing'
    ],

    height: 600,
    id: 'win_dash_sessions',
    width: 1400,
    layout: 'fit',
    title: '경고현황 - 세션이상',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_dash_sessions',
                    store: 'st_dash_sessions',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'location',
                            text: '지역'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.port_line_normal === false)
                                metaData.tdCls = 'ico_2u_alert';
                                else
                                metaData.tdCls = 'ico_2u';

                                return value;
                            },
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
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value > 89)
                                metaData.tdCls = 'ico_level5';

                                else if (value > 69)
                                metaData.tdCls = 'ico_level4';

                                else if (value > 49)
                                metaData.tdCls = 'ico_level3';

                                else if (value > 29)
                                metaData.tdCls = 'ico_level2';

                                else if (value > 9)
                                metaData.tdCls = 'ico_level1';

                                else if (value >= 0)
                                metaData.tdCls = 'ico_level0';



                                return value + '%';
                            },
                            width: 120,
                            dataIndex: 'cpu',
                            text: 'CPU 사용(%)'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value > 89)
                                metaData.tdCls = 'ico_level5';

                                else if (value > 69)
                                metaData.tdCls = 'ico_level4';

                                else if (value > 49)
                                metaData.tdCls = 'ico_level3';

                                else if (value > 29)
                                metaData.tdCls = 'ico_level2';

                                else if (value > 9)
                                metaData.tdCls = 'ico_level1';

                                else if (value >= 0)
                                metaData.tdCls = 'ico_level0';



                                return value + '%';
                            },
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
                            text: '기타정보',
                            editor: {
                                xtype: 'textfield'
                            }
                        }
                    ],
                    viewConfig: {
                        id: 'grv_dash_sessions'
                    },
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {

                        })
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_sessionsAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_sessionsDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_dash_sessionsAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);

        Ext.Ajax.request(
            {
                url : 'api/ftDashboard/SeekSystemError',
                params :
                        {
                            systype : 2
                        },
                method : 'GET',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_dash_sessions').loadData(resObj);
                }
            });

    },

    onWin_dash_sessionsDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);



        var store = Ext.getStore('st_dash_sessions');
        store.sync();

        var key = [];
        var etc = [];

        for (var i in store.data.items)
        {
            key.push(store.data.items[i].data.key);
            etc.push(store.data.items[i].data.etc);
        }

        Ext.Ajax.request(
            {
                url : 'api/ftDashboard/SaveEtc',
                params :
                {
                    key : Ext.encode(key),
                    etc : Ext.encode(etc)
                },
                success : function(res_data)
                {
                }
            });

    }

});
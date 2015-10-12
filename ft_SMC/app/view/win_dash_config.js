
Ext.define('SMC.view.win_dash_config', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.form.field.Number',
        'Ext.grid.plugin.CellEditing',
        'Ext.button.Button'
    ],

    height: 580,
    id: 'win_dash_config',
    width: 530,
    title: '임계치 설정',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_configAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_configDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    border: false,
                    height: 510,
                    id: 'gpn_dash_config',
                    store: 'st_dash_config',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'model',
                            text: '모델명'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'cpu_util',
                            text: 'CPU 임계치',
                            editor: {
                                xtype: 'numberfield',
                                maxValue: 100,
                                minValue: 0
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'mem_util',
                            text: '메모리 임계치',
                            editor: {
                                xtype: 'numberfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'session',
                            text: '세션 임계치',
                            editor: {
                                xtype: 'numberfield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'tunnels',
                            text: '터널 임계치',
                            editor: {
                                xtype: 'numberfield'
                            }
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {

                        })
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 160
                        },
                        {
                            xtype: 'button',
                            height: 24,
                            width: 100,
                            text: '적용',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 20
                        },
                        {
                            xtype: 'button',
                            height: 24,
                            width: 100,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 12
                }
            ]
        });

        me.callParent(arguments);
    },

    onWin_dash_configAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);

        Ext.Ajax.request(
            {
                url : 'api/ftDashboard/SeekConfig',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_dash_config').loadData(resObj);
                }
            });
    },

    onButtonClick: function(button, e, eOpts) {
        store = Ext.getStore('st_dash_config');
        store.sync();

        var model = [];
        var cpu = [];
        var mem = [];
        var session = [];
        var tunnels = [];

        for (var i in store.data.items)
        {
            model.push(store.data.items[i].data.code);
            cpu.push(store.data.items[i].data.cpu_util);
            mem.push(store.data.items[i].data.mem_util);
            session.push(store.data.items[i].data.session);
            tunnels.push(store.data.items[i].data.tunnels);
        }

        Ext.Ajax.request(
            {
                url : 'api/ftDashboard/SaveConfig',
                params :
                {
                    model : Ext.encode(model),
                    cpu : Ext.encode(cpu),
                    memory : Ext.encode(mem),
                    session : Ext.encode(session),
                    tunnels : Ext.encode(tunnels)
                },
                success : function(res_data)
                {
                }
            });


        Ext.getCmp('win_dash_config').destroy();
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.getCmp('win_dash_config').destroy();
    },

    onWin_dash_configDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);
    }

});
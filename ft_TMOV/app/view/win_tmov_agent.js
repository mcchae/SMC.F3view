
Ext.define('TMOV.view.win_tmov_agent', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Radio',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.form.field.Display',
        'Ext.selection.CheckboxModel'
    ],

    height: 372,
    id: 'win_tmov_agent',
    width: 1000,
    layout: 'fit',
    constrainHeader: true,
    title: '에이전트 업데이트',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_agent_view',
                    header: false,
                    store: 'st_tmov_send_agent',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            hidden: true,
                                            id: 'rdb_agent_inner',
                                            fieldLabel: '망 구분',
                                            labelWidth: 70,
                                            name: 'type',
                                            boxLabel: '내부',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            hidden: true,
                                            id: 'rdb_agent_outer',
                                            margin: '0 0 0 20',
                                            name: 'type',
                                            boxLabel: '외부'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_agent_version',
                                            margin: '0 0 0 30',
                                            fieldLabel: '에이전트 버전'
                                        },
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            id: 'txf_agent_filename',
                                            margin: '0 0 0 30',
                                            fieldLabel: '에이전트 버전'
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '선택',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdb_agent_apply',
                                            fieldLabel: '적용 여부',
                                            labelAlign: 'right',
                                            name: 'agent',
                                            boxLabel: '즉시 적용',
                                            checked: true
                                        },
                                        {
                                            xtype: 'container',
                                            width: 20
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdb_agent_upload',
                                            labelAlign: 'right',
                                            name: 'agent',
                                            boxLabel: '업로드만'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            id: 'txf_agent_count',
                                            fieldLabel: '전체 장비 수'
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '전송',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '닫기',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('win_tmov_agent').isInner === true)
                                {
                                    if (record.raw.inner_state === 1)
                                    {
                                        metaData.style = 'color:#0054FF;';
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        metaData.style = 'color:#FF0000;';
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 1)
                                    {
                                        metaData.style = 'color:#0054FF;';
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        metaData.style = 'color:#FF0000;';
                                    }
                                }

                                return value;
                            },
                            width: 120,
                            dataIndex: 'name',
                            text: '서버 팜 이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.inner_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.inner_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            id: 'col_agent_inner_ip',
                            width: 130,
                            dataIndex: 'main_inner_ip',
                            text: '내부 연계서버 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.outer_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.outer_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            id: 'col_agent_outer_ip',
                            width: 130,
                            dataIndex: 'main_outer_ip',
                            text: '외부 연계서버 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.inner_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.inner_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            id: 'col_agent_inner_version',
                            width: 130,
                            dataIndex: 'inner_agent',
                            text: '내부 에이전트 버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.outer_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.outer_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            id: 'col_agent_outer_version',
                            width: 130,
                            dataIndex: 'outer_agent',
                            text: '외부 에이전트 버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.inner_state === 0)
                                {
                                    return '전송완료';
                                }

                                if (record.raw.inner_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                    return '전송대기';
                                }

                                if (record.raw.inner_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                    return '전송실패';
                                }
                            },
                            id: 'col_agent_inner_state',
                            width: 100,
                            dataIndex: 'inner_state',
                            text: '전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.outer_state === 0)
                                {
                                    return '전송완료';
                                }

                                if (record.raw.outer_state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                    return '전송대기';
                                }

                                if (record.raw.outer_state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                    return '전송실패';
                                }
                            },
                            id: 'col_agent_outer_state',
                            width: 100,
                            dataIndex: 'outer_state',
                            text: '전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('win_tmov_agent').isInner === true)
                                {
                                    if (record.raw.inner_state === 1)
                                    {
                                        metaData.style = 'color:#0054FF;';
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        metaData.style = 'color:#FF0000;';
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 1)
                                    {
                                        metaData.style = 'color:#0054FF;';
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        metaData.style = 'color:#FF0000;';
                                    }
                                }

                                return value;
                            },
                            dataIndex: 'result',
                            text: '정보',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_agentAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_agentBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_agent_config',{
            isSelect : true
        }).show().center();

    },

    onButtonClick1: function(button, e, eOpts) {
        if (Ext.getCmp('txf_agent_version').getValue() === '')
        {
            Ext.MessageBox.show({ title: '전송 실패', msg: '에이전트를 선택 하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        items = Ext.getCmp('gpn_agent_view').getSelectionModel().getSelection();

        var servers = [];
        for (var i in items)
        {
            servers.push(items[i].raw);
        }

        var kind = 'I';
        if (Ext.getCmp('rdb_agent_inner').getValue() === true)
        {
            kind = 'I';
        }
        else
        {
            kind = 'O';
        }

        apply = Ext.getCmp('rdb_agent_apply').getValue();

        var version = Ext.getCmp('txf_agent_version').getValue();

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"에이전트 전송 중..."});
        myMask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SendAgent',
                params : {
                    server_list : Ext.encode(servers),
                    kind : Ext.encode(kind),
                    version : Ext.encode(version),
                    agent_apply : Ext.encode(apply)
                },
                success : function(res_data)
                {
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);
                    console.log(resObj);

                    var svr_store = Ext.getStore('st_tmov_send_agent');
                    var svrs = [];

                    for (var i in svr_store.data.items)
                    {
                        svrs.push(svr_store.data.items[i].raw);
                    }

                    svr_store.loadData([]);

                    for (i in svrs)
                    {
                        for (var k in resObj)
                        {
                            if (svrs[i]._id === resObj[k]._id)
                            {
                                if (kind === 'I')
                                {
                                    svrs[i].inner_state = resObj[k].inner_state;
                                    svrs[i].inner_agent = resObj[k].inner_agent;
                                }
                                else
                                {
                                    svrs[i].outer_state = resObj[k].outer_state;
                                    svrs[i].outer_agent = resObj[k].outer_agent;
                                }

                                svrs[i].result = resObj[k].result;
                            }
                        }
                    }

                    svr_store.loadData(svrs);
                    Ext.getCmp('gpn_agent_view').getSelectionModel().selectAll();
                    Ext.getCmp('gpn_agent_view').getView().focusRow(0);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_agent').close();
    },

    onWin_tmov_agentAfterRender: function(component, eOpts) {
        if (component.isInner === true)
        {
            selectedItems = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection();

            Ext.getCmp('col_agent_outer_ip').hide();
            Ext.getCmp('col_agent_outer_version').hide();
            Ext.getCmp('col_agent_outer_state').hide();
        }
        else
        {
            selectedItems = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('rdb_agent_outer').setValue(true);

            Ext.getCmp('col_agent_inner_ip').hide();
            Ext.getCmp('col_agent_inner_version').hide();
            Ext.getCmp('col_agent_inner_state').hide();
        }

        console.log(selectedItems);

        Ext.getStore('st_tmov_send_agent').loadData(selectedItems);
        Ext.getCmp('txf_agent_count').setValue(selectedItems.length);
        Ext.getCmp('gpn_agent_view').getSelectionModel().selectAll();
        Ext.getCmp('gpn_agent_view').getView().focusRow(0);


    },

    onWin_tmov_agentBeforeDestroy: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetServerList',
                params : {
                    parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                    user : Ext.encode(Ext.getCmp('main').user)
                },
                success : function(res)
                {
                    var retVal = JSON.parse(res.responseText);
                    Ext.getStore('st_tmov_server_list').loadData(retVal);
                }
            }
        );
    }

});

Ext.define('TMOV.view.win_tmov_pattern', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Radio',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    height: 372,
    id: 'win_tmov_pattern',
    width: 1000,
    layout: 'fit',
    constrainHeader: true,
    title: '바이러스 패턴 업데이트',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_virus_pattern',
                    header: false,
                    store: 'st_tmov_send_pattern',
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
                                            id: 'rdb_pattern_inner',
                                            fieldLabel: '망 구분',
                                            labelWidth: 70,
                                            name: 'pattern',
                                            boxLabel: '내부',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            hidden: true,
                                            id: 'rdb_pattern_outer',
                                            margin: '0 0 0 20',
                                            name: 'pattern',
                                            boxLabel: '외부'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_virus_pattern_version',
                                            margin: '0 0 0 30',
                                            width: 240,
                                            fieldLabel: '패턴 버전',
                                            labelWidth: 80,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            hidden: true,
                                            id: 'txf_virus_pattern_filename',
                                            fieldLabel: 'Label'
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 10',
                                            width: 100,
                                            text: '패턴 선택',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
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
                                if (Ext.getCmp('win_tmov_pattern').isInner === true)
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
                            width: 200,
                            dataIndex: 'server_name',
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
                            id: 'col_pattern_inner_ip',
                            width: 160,
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
                            id: 'col_pattern_outer_ip',
                            width: 160,
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
                            id: 'col_pattern_inner_version',
                            width: 160,
                            dataIndex: 'inner_pattern',
                            text: '내부 패턴 버전'
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
                            id: 'col_pattern_outer_version',
                            width: 160,
                            dataIndex: 'outer_pattern',
                            text: '외부 패턴 버전'
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
                            id: 'col_pattern_inner_state',
                            width: 160,
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
                            id: 'col_pattern_outer_state',
                            width: 160,
                            dataIndex: 'outer_state',
                            text: '전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('win_tmov_pattern').isInner === true)
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
                    fn: me.onWin_tmov_patternAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_patternBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_pattern_config',{
            isSelect : true
        }).show().center();

    },

    onButtonClick1: function(button, e, eOpts) {
        if (Ext.getCmp('txf_virus_pattern_version').getValue() === '')
        {
            Ext.MessageBox.show({ title: '전송 실패', msg: '패턴을 선택 하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        items = Ext.getCmp('gpn_virus_pattern').getSelectionModel().getSelection();

        var servers = [];
        for (var i in items)
        {
            servers.push(items[i].raw);
        }

        var kind = 'I';
        if (Ext.getCmp('rdb_pattern_inner').getValue() === true)
        {
            kind = 'I';
        }
        else
        {
            kind = 'O';
        }

        var version = Ext.getCmp('txf_virus_pattern_version').getValue();

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"패턴 전송 중..."});
        myMask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SendVaccine',
                params : {
                    server_list : Ext.encode(servers),
                    kind : Ext.encode(kind),
                    version : Ext.encode(version)
                },
                success : function(res_data)
                {
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);

                    var svr_store = Ext.getStore('st_tmov_send_pattern');
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
                                    svrs[i].inner_pattern = resObj[k].inner_pattern;
                                }
                                else
                                {
                                    svrs[i].outer_state = resObj[k].outer_state;
                                    svrs[i].outer_pattern = resObj[k].outer_pattern;
                                }

                                svrs[i].result = resObj[k].result;
                            }
                        }
                    }

                    svr_store.loadData(svrs);

                    Ext.getCmp('gpn_virus_pattern').getSelectionModel().selectAll();
                    Ext.getCmp('gpn_virus_pattern').getView().focusRow(0);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_pattern').close();
    },

    onWin_tmov_patternAfterRender: function(component, eOpts) {
        if (component.isInner === true)
        {
            selectedItems = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('col_pattern_outer_ip').hide();
            Ext.getCmp('col_pattern_outer_version').hide();
            Ext.getCmp('col_pattern_outer_state').hide();
        }
        else
        {
            Ext.getCmp('rdb_pattern_outer').setValue(true);
            selectedItems = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('col_pattern_inner_ip').hide();
            Ext.getCmp('col_pattern_inner_version').hide();
            Ext.getCmp('col_pattern_inner_state').hide();
        }

        Ext.getStore('st_tmov_send_pattern').loadData(selectedItems);
        Ext.getCmp('gpn_virus_pattern').getSelectionModel().selectAll();
        Ext.getCmp('gpn_virus_pattern').getView().focusRow(0);
    },

    onWin_tmov_patternBeforeDestroy: function(component, eOpts) {
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
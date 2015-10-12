
Ext.define('TMOV.view.win_tmov_tmm', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    height: 372,
    id: 'win_tmov_tmm',
    width: 1000,
    layout: 'fit',
    constrainHeader: true,
    title: 'TMM 업데이트',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_tmm_update',
                    header: false,
                    store: 'st_tmov_send_tmm',
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
                                            xtype: 'textfield',
                                            id: 'txf_tmm_update_version',
                                            fieldLabel: '업데이트 버전',
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '파일 선택',
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
                                if (Ext.getCmp('win_tmov_tmm').isInner === true)
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
                            id: 'col_tmm_inner_ip',
                            width: 200,
                            dataIndex: 'main_inner_ip',
                            text: '내부 서버 주소'
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
                            id: 'col_tmm_outer_ip',
                            width: 200,
                            dataIndex: 'main_outer_ip',
                            text: '외부 서버 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value === 0)
                                {
                                    return '전송완료';
                                }

                                if (value === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                    return '전송대기';
                                }

                                if (value === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                    return '전송실패';
                                }
                            },
                            id: 'col_tmm_state',
                            dataIndex: 'state',
                            text: '전송 상태',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('win_tmov_tmm').isInner === true)
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
                            id: 'col_tmm_result',
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
                    fn: me.onWin_tmov_pattern1AfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_tmm_config',{
            isSelect : true
        }).show().center();

    },

    onButtonClick1: function(button, e, eOpts) {
        if (Ext.getCmp('txf_tmm_update_version').getValue() === '')
        {
            Ext.MessageBox.show({ title: '전송 실패', msg: '업데이트 버전을 선택 하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        items = Ext.getCmp('gpn_tmm_update').getSelectionModel().getSelection();

        var servers = [];
        for (var i in items)
        {
            servers.push(items[i].raw);
        }


        var kind = 'I';

        if (Ext.getCmp('win_tmov_tmm').isInner === true)
        {
            kind = 'I';
        }
        else
        {
            kind = 'O';
        }

        var version = Ext.getCmp('txf_tmm_update_version').getValue();

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"업데이트 파일 전송 중..."});
        myMask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SendTMMUpdate',
                params : {
                    server_list : Ext.encode(servers),
                    kind : Ext.encode(kind),
                    version : Ext.encode(version)
                },
                success : function(res_data)
                {
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);
                    console.log(resObj);

                    var svr_store = Ext.getStore('st_tmov_send_tmm');
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
                                    svrs[i].inner_tmm = resObj[k].inner_tmm;
                                }
                                else
                                {
                                    svrs[i].outer_tmm = resObj[k].outer_tmm;
                                }

                                svrs[i].name = resObj[k].name;
                                svrs[i].state = resObj[k].state;
                                svrs[i].result = resObj[k].result;
                            }
                        }
                    }

                    svr_store.loadData(svrs);
                    Ext.getCmp('gpn_tmm_update').getSelectionModel().selectAll();
                    Ext.getCmp('gpn_tmm_update').getView().focusRow(0);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_tmm').close();
    },

    onWin_tmov_pattern1AfterRender: function(component, eOpts) {
        if (component.isInner === true)
        {
            selectedItems = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('col_tmm_outer_ip').hide();
        }
        else
        {
            selectedItems = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('col_tmm_inner_ip').hide();
        }

        Ext.getStore('st_tmov_send_tmm').loadData(selectedItems);
        Ext.getCmp('gpn_tmm_update').getSelectionModel().selectAll();
        Ext.getCmp('gpn_tmm_update').getView().focusRow(0);
    }

});
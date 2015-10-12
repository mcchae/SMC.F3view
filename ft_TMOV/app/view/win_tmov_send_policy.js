
Ext.define('TMOV.view.win_tmov_send_policy', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Radio',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.form.field.Display',
        'Ext.button.Button'
    ],

    height: 372,
    id: 'win_tmov_send_policy',
    width: 1000,
    constrainHeader: true,
    title: '정책 전송',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'gpn_tmov_send_policy',
                    header: false,
                    title: 'My Grid Panel',
                    store: 'st_tmov_send_policy',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            hidden: true,
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
                                            id: 'rdb_send_device_inner',
                                            fieldLabel: '망 구분',
                                            labelWidth: 60,
                                            name: 'server_send_type',
                                            boxLabel: '내부',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdb_send_device_outer',
                                            margin: '0 0 0 30',
                                            name: 'server_send_type',
                                            boxLabel: '외부'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
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
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                return value;
                            },
                            width: 180,
                            dataIndex: 'server_name',
                            text: '서버팜 이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                return value;
                            },
                            id: 'col_send_policy_inner_ip',
                            width: 140,
                            dataIndex: 'main_inner_ip',
                            text: '내부 서버 IP 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                return value;
                            },
                            id: 'col_send_policy_outer_ip',
                            width: 140,
                            dataIndex: 'main_outer_ip',
                            text: '외부 서버 IP 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                if (value === 0)
                                {
                                    return '전송완료';
                                }

                                if (value === 1)
                                {
                                    return '전송대기';
                                }

                                if (value === 2)
                                {
                                    return '전송실패';
                                }
                            },
                            id: 'col_send_policy_inner_state',
                            width: 120,
                            dataIndex: 'inner_state',
                            text: '내부 전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                if (value === 0)
                                {
                                    return '전송완료';
                                }

                                if (value === 1)
                                {
                                    return '전송대기';
                                }

                                if (value === 2)
                                {
                                    return '전송실패';
                                }
                            },
                            id: 'col_send_policy_outer_state',
                            width: 120,
                            dataIndex: 'outer_state',
                            text: '외부 전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
                                {
                                    if (record.raw.inner_state === 0)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.inner_state === 1)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.inner_state === 2)
                                    {
                                        if (record.raw.inner_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }
                                else
                                {
                                    if (record.raw.outer_state === 0)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;';
                                        }
                                    }

                                    if (record.raw.outer_state === 1)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#0054FF;';
                                        }
                                    }

                                    if (record.raw.outer_state === 2)
                                    {
                                        if (record.raw.outer_policy.expired === true)
                                        {
                                            metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                        }
                                        else
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }
                                    }
                                }

                                return value;
                            },
                            dataIndex: 'result',
                            text: '결과',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                },
                {
                    xtype: 'container',
                    padding: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'txf_send_policy_count',
                            width: 180,
                            fieldLabel: '전체 장비 수',
                            labelAlign: 'right',
                            labelPad: 10,
                            labelWidth: 80
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            id: 'btn_send_policy',
                            width: 80,
                            text: '전송',
                            listeners: {
                                click: {
                                    fn: me.onBtn_send_policyClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            id: 'btn_close_send_policy',
                            width: 80,
                            text: '닫기',
                            listeners: {
                                click: {
                                    fn: me.onBtn_close_send_policyClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_send_policyAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_send_policyBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_send_policyClick: function(button, e, eOpts) {
        items = Ext.getCmp('gpn_tmov_send_policy').getSelectionModel().getSelection();
        var servers = [];
        for (var i in items)
        {
            servers.push(items[i].raw);
        }

        var kind = 'I';
        if (Ext.getCmp('rdb_send_device_inner').getValue() === true)
        {
            kind = 'I';
        }
        else
        {
            kind = 'O';
        }

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"서버팜 정책 전송 중..."});
        myMask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SendServerPolicy',
                params : {
                    server_list : Ext.encode(servers),
                    kind : Ext.encode(kind)
                },
                success : function(res_data)
                {
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);

                    var svr_store = Ext.getStore('st_tmov_send_policy');
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
                                    svrs[i].inner_state = resObj[k].inner_state;
                                else
                                    svrs[i].outer_state = resObj[k].outer_state;

                                svrs[i].result = resObj[k].result;
                            }
                        }
                    }

                    svr_store.loadData(svrs);
                    Ext.getCmp('gpn_tmov_send_policy').getSelectionModel().selectAll();
                    Ext.getCmp('gpn_tmov_send_policy').getView().focusRow(0);
                }
            }
        );
    },

    onBtn_close_send_policyClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_send_policy').close();
    },

    onWin_tmov_send_policyAfterRender: function(component, eOpts) {
        if (component.isInner === true)
        {
            selectedItems = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('col_send_policy_outer_ip').hide();
            Ext.getCmp('col_send_policy_outer_state').hide();
        }
        else
        {
            selectedItems = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection();
            Ext.getCmp('rdb_send_device_outer').setValue(true);
            Ext.getCmp('col_send_policy_inner_ip').hide();
            Ext.getCmp('col_send_policy_inner_state').hide();
        }

        Ext.getStore('st_tmov_send_policy').loadData(selectedItems);
        Ext.getCmp('txf_send_policy_count').setValue(selectedItems.length);
        Ext.getCmp('gpn_tmov_send_policy').getSelectionModel().selectAll();
        Ext.getCmp('gpn_tmov_send_policy').getView().focusRow(0);
    },

    onWin_tmov_send_policyBeforeDestroy: function(component, eOpts) {
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

Ext.define('TMOV.view.win_tmov_user_send', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Radio',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.grid.column.Column',
        'Ext.selection.CheckboxModel'
    ],

    height: 372,
    id: 'win_tmov_user_send',
    width: 1200,
    layout: 'fit',
    constrainHeader: true,
    title: '사용자 정책 전송',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_user_send_policy',
                    store: 'st_tmov_user_send',
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
                                            id: 'rdb_user_send_inner',
                                            fieldLabel: '망 구분',
                                            labelWidth: 60,
                                            name: 'user_type',
                                            boxLabel: '내부',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdb_user_send_outer',
                                            margin: '0 0 0 30',
                                            name: 'user_type',
                                            boxLabel: '외부'
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
                                    width: 100,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'txf_user_send_count',
                                            fieldLabel: '전체 사용자 수',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
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
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            width: 140,
                            dataIndex: 'server_name',
                            text: '지역 서버팜'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            width: 120,
                            dataIndex: 'court_name',
                            text: '법원'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            dataIndex: 'userid',
                            text: '아이디'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            dataIndex: 'surname',
                            text: '이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 0)
                                {
                                    metaData.style = 'color:#0054FF;';
                                    return '전송완료';
                                }

                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                    return '전송대기';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                    return '전송실패';
                                }

                                return value;
                            },
                            dataIndex: 'state',
                            text: '전송 상태'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            width: 300,
                            dataIndex: 'success',
                            text: '전송 성공 서버 팜'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.raw.state === 1)
                                {
                                    metaData.style = 'color:#0054FF;';
                                }

                                if (record.raw.state === 2)
                                {
                                    metaData.style = 'color:#FF0000;';
                                }

                                return value;
                            },
                            width: 290,
                            dataIndex: 'fail',
                            text: '전송 실패 서버 팜'
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        ignoreRightMouseSelection: true
                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_user_sendAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_user_sendBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        items = Ext.getCmp('gpn_user_send_policy').getSelectionModel().getSelection();
        var users = [];
        for (var i in items)
        {
            users.push(items[i].raw);
        }

        var kind = 'I';
        if (Ext.getCmp('rdb_user_send_inner').getValue() === true)
        {
            kind = 'I';
        }
        else
        {
            kind = 'O';
        }

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"사용자 정책 전송 중..."});
        myMask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/SendUserPolicy',
                params : {
                    users : Ext.encode(users),
                    kind : Ext.encode(kind)
                },
                success : function(res_data)
                {
                    myMask.destroy();

                    var resObj = JSON.parse(res_data.responseText);

                    var temp = Ext.getStore('st_tmov_user_send');
                    var users = [];

                    for (var i in temp.data.items)
                    {
                        users.push(temp.data.items[i].raw);
                    }

                    Ext.getStore('st_tmov_user_send').loadData([]);

                    for (i in users)
                    {
                        for (var k in resObj)
                        {
                            if (users[i].userid === resObj[k].userid)
                            {
                                users[i].state = resObj[k].state;
                                users[i].success = resObj[k].success;
                                users[i].fail = resObj[k].fail;
                            }
                        }
                    }

                    Ext.getStore('st_tmov_user_send').loadData(users);
                    Ext.getCmp('gpn_user_send_policy').getSelectionModel().selectAll();
                    Ext.getCmp('gpn_user_send_policy').getView().focusRow(0);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_user_send').close();
    },

    onWin_tmov_user_sendAfterRender: function(component, eOpts) {
        var selectedItems = '';

        if (component.isInner === true)
        {
            selectedItems = Ext.getCmp('gpn_inner_user_policy').getSelectionModel().getSelection();
        }
        else
        {
            selectedItems = Ext.getCmp('gpn_outer_user_policy').getSelectionModel().getSelection();
            Ext.getCmp('rdb_user_send_outer').setValue(true);
        }

        Ext.getStore('st_tmov_user_send').loadData(selectedItems);
        Ext.getCmp('gpn_user_send_policy').getSelectionModel().selectAll();
        Ext.getCmp('txf_user_send_count').setValue(selectedItems.length);
        Ext.getCmp('gpn_user_send_policy').getView().focusRow(0);
    },

    onWin_tmov_user_sendBeforeDestroy: function(component, eOpts) {
        Ext.getStore('st_tmov_user_policy').load();
    }

});
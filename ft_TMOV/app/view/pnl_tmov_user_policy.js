
Ext.define('TMOV.view.pnl_tmov_user_policy', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.form.field.ComboBox',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    border: false,
    id: 'pnl_tmov_user_policy',
    title: '사용자 목록',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmov_user_policyAfterRender,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    border: false,
                    id: 'tpn_tmov_user_policy',
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'fit',
                            title: '외부',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    border: false,
                                    id: 'gpn_outer_user_policy',
                                    header: false,
                                    store: 'st_tmov_user_policy',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: 'btn_outer_user_policy_setting',
                                                                    width: 80,
                                                                    text: '설정',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_outer_user_policy_settingClick,
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
                                                                    id: 'btn_outer_user_policy_send_policy',
                                                                    width: 80,
                                                                    text: '정책 전송',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_outer_user_policy_send_policyClick,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    width: 10
                                                                },
                                                                {
                                                                    xtype: 'exporterbutton',
                                                                    type: 'outer_user',
                                                                    tree: '',
                                                                    format: 'excel',
                                                                    width: 80,
                                                                    text: '엑셀로 저장'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_outer_user_policy_server',
                                                                    width: 200,
                                                                    fieldLabel: '서버팜',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_outer_user_policy_court',
                                                                    width: 200,
                                                                    fieldLabel: '법원',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_outer_user_policy_id',
                                                                    width: 200,
                                                                    fieldLabel: '아이디',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_outer_user_policy_name',
                                                                    width: 200,
                                                                    fieldLabel: '이름',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: 'btn_outer_user_policy_search',
                                                                    margin: '0 0 0 10',
                                                                    width: 80,
                                                                    text: '검색',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_outer_user_policy_searchClick,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '5 0 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'cmb_outer_user_policy_each',
                                                                    width: 230,
                                                                    fieldLabel: '개별 적용 여부',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 90,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_outer_user_policy_eachAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'cmb_outer_user_policy_expire',
                                                                    margin: '0 90 0 0',
                                                                    width: 240,
                                                                    fieldLabel: '정책 만료 여부',
                                                                    labelAlign: 'right',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_outer_user_policy_expireAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'pagingtoolbar',
                                            dock: 'bottom',
                                            width: 360,
                                            afterPageText: '전체 페이지 {0}',
                                            beforePageText: '페이지',
                                            displayInfo: true,
                                            displayMsg: '현재 페이지 사용자 : {0} - {1} 전체 사용자 : {2}',
                                            emptyMsg: '사용자가 없습니다.',
                                            firstText: '첫 페이지',
                                            inputItemWidth: 60,
                                            lastText: '마지막 페이지',
                                            nextText: '다음 페이지',
                                            prevText: '이전 페이지',
                                            refreshText: '새로고침',
                                            store: 'st_tmov_user_policy'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 180,
                                            dataIndex: 'server_name',
                                            text: '지역 서버팜'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 180,
                                            dataIndex: 'court_name',
                                            text: '법원'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 120,
                                            dataIndex: 'userid',
                                            text: '아이디'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 120,
                                            dataIndex: 'surname',
                                            text: '이름'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 140,
                                            dataIndex: 'employytype',
                                            text: '직책'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                if (value === true)
                                                {
                                                    return '예';
                                                }
                                                else
                                                {
                                                    return '아니오';
                                                }
                                            },
                                            width: 120,
                                            dataIndex: 'vm_use',
                                            text: 'VM 사용 여부'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.outer_state === 0)
                                                {
                                                    if (record.raw.outer_policy.expired === true)
                                                    {
                                                        metaData.style = 'background-color:#BDBDBD;';
                                                    }

                                                    return '전송완료';
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

                                                    return '전송대기';
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

                                                    return '전송실패';
                                                }
                                            },
                                            width: 140,
                                            dataIndex: 'outer_state',
                                            tdCls: 'ID',
                                            text: '전송상태'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 160,
                                            dataIndex: 'md_date',
                                            text: '수정 시간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 160,
                                            dataIndex: 'fnl_edt_usr',
                                            text: '관리자'
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_outer_user_policyItemDblClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'fit',
                            title: '내부',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    border: false,
                                    id: 'gpn_inner_user_policy',
                                    header: false,
                                    store: 'st_tmov_user_policy',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    id: 'btn_inner_user_policy_setting',
                                                                    width: 80,
                                                                    text: '설정',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_inner_user_policy_settingClick,
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
                                                                    id: 'btn_inner_user_policy_send_policy',
                                                                    width: 80,
                                                                    text: '정책 전송',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_inner_user_policy_send_policyClick,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    width: 10
                                                                },
                                                                {
                                                                    xtype: 'exporterbutton',
                                                                    format: 'excel',
                                                                    type: 'inner_user',
                                                                    tree: '',
                                                                    width: 80,
                                                                    text: '엑셀로 저장'
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_inner_user_policy_server',
                                                                    width: 200,
                                                                    fieldLabel: '서버팜',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_inner_user_policy_court',
                                                                    width: 200,
                                                                    fieldLabel: '법원',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_inner_user_policy_id',
                                                                    width: 200,
                                                                    fieldLabel: '아이디',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    id: 'txf_inner_user_policy_name',
                                                                    width: 200,
                                                                    fieldLabel: '이름',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 60
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    id: 'btn_inner_user_policy_search',
                                                                    margin: '0 0 0 10',
                                                                    width: 80,
                                                                    text: '검색',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onBtn_inner_user_policy_searchClick,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '5 0 0 0',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    flex: 1
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'cmb_inner_user_policy_each',
                                                                    width: 230,
                                                                    fieldLabel: '개별 적용 여부',
                                                                    labelAlign: 'right',
                                                                    labelWidth: 90,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_policy_search_each_applyAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'cmb_inner_user_policy_expired',
                                                                    width: 240,
                                                                    fieldLabel: '정책 만료 여부',
                                                                    labelAlign: 'right',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_policy_search_policy_expireAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'container',
                                                                    width: 90
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'pagingtoolbar',
                                            dock: 'bottom',
                                            width: 360,
                                            afterPageText: '전체 페이지 {0}',
                                            beforePageText: '페이지',
                                            displayInfo: true,
                                            displayMsg: '현재 페이지 사용자 : {0} - {1} 전체 사용자 : {2}',
                                            emptyMsg: '사용자가 없습니다.',
                                            firstText: '첫 페이지',
                                            inputItemWidth: 60,
                                            lastText: '마지막 페이지',
                                            nextText: '다음 페이지',
                                            prevText: '이전 페이지',
                                            refreshText: '새로고침',
                                            store: 'st_tmov_user_policy'
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 180,
                                            dataIndex: 'server_name',
                                            text: '지역 서버팜'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 180,
                                            dataIndex: 'court_name',
                                            text: '법원'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 120,
                                            dataIndex: 'userid',
                                            text: '아이디'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 120,
                                            dataIndex: 'surname',
                                            text: '이름'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 140,
                                            dataIndex: 'employytype',
                                            text: '직책'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                if (value === true)
                                                {
                                                    return '예';
                                                }
                                                else
                                                {
                                                    return '아니오';
                                                }
                                            },
                                            width: 120,
                                            dataIndex: 'vm_use',
                                            text: 'VM 사용 여부'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value === 0)
                                                {
                                                    if (record.raw.inner_policy.expired === true)
                                                    {
                                                        metaData.style = 'background-color:#BDBDBD;';
                                                    }

                                                    return '전송완료';
                                                }

                                                if (value === 1)
                                                {
                                                    if (record.raw.inner_policy.expired === true)
                                                    {
                                                        metaData.style = 'background-color:#BDBDBD;color:#0054FF;';
                                                    }
                                                    else
                                                    {
                                                        metaData.style = 'color:#0054FF;';
                                                    }

                                                    return '전송대기';
                                                }

                                                if (value === 2)
                                                {
                                                    if (record.raw.inner_policy.expired === true)
                                                    {
                                                        metaData.style = 'background-color:#BDBDBD;color:#FF0000;';
                                                    }
                                                    else
                                                    {
                                                        metaData.style = 'color:#FF0000;';
                                                    }
                                                    return '전송실패';
                                                }
                                            },
                                            width: 140,
                                            dataIndex: 'inner_state',
                                            tdCls: 'ID',
                                            text: '전송상태'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 160,
                                            dataIndex: 'md_date',
                                            text: '수정 시간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
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

                                                return value;
                                            },
                                            width: 160,
                                            dataIndex: 'fnl_edt_usr',
                                            text: '관리자'
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_inner_user_policyItemDblClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_tmov_user_policyAfterRender: function(component, eOpts) {
        var record = Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0];

        Ext.getStore('st_tmov_user_policy').getProxy().extraParams = {
            query : Ext.encode({'server_farm' : record.raw.server_farm}),
            user : Ext.encode(Ext.getCmp('main').user)
        };

        Ext.getStore('st_tmov_user_policy').loadPage(1);
    },

    onBtn_outer_user_policy_settingClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_outer_user_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '모니터링 관리자는 사용자 정책 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '사용자 정책을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_policy_setting', {
            isInner : false
        }).show();

    },

    onBtn_outer_user_policy_send_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_outer_user_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '모니터링 관리자는 정책 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '전송할 사용자 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_user_send', {
            isInner : false
        }).show().center();
    },

    onBtn_outer_user_policy_searchClick: function(button, e, eOpts) {
        var server = Ext.getCmp('txf_outer_user_policy_server').getValue();
        var court = Ext.getCmp('txf_outer_user_policy_court').getValue();
        var userid = Ext.getCmp('txf_outer_user_policy_id').getValue();
        var name = Ext.getCmp('txf_outer_user_policy_name').getValue();

        var each = Ext.getCmp('cmb_outer_user_policy_each').getValue();
        var expire = Ext.getCmp('cmb_outer_user_policy_expire').getValue();

        var query = {};

        if (server !== '서버팜 전체')
        {
            key = 'server_name';
            query[key] = {'$regex' : server};
        }

        if (userid !== '')
        {
            key = '$or';
            query[key] = [ {'userid' : {'$regex' : userid}}, {'userid' : {'$regex' : userid.toUpperCase()}}];
        }

        if (name !== '')
        {
            key = 'surname';
            query[key] = {'$regex' : name};
        }

        if (court !== '')
        {
            key = 'court_name';
            query[key] = {'$regex' : court};
        }

        if (each === 'true')
        {
            key = 'outer_policy.use';
            query[key] = true;

        }
        else if (each === 'false')
        {
            key = 'outer_policy.use';
            query[key] = false;
        }

        if (expire === 'true')
        {
            key = 'out_expire';
            query[key] = true;
        }
        else if (expire === 'false')
        {
            key = 'out_expire';
            query[key] = false;
        }

        Ext.getStore('st_tmov_user_policy').getProxy().extraParams = {
            query : Ext.encode(query),
            user : Ext.encode(Ext.getCmp('main').user)
        };

        Ext.getStore('st_tmov_user_policy').loadPage(1);
    },

    onCmb_outer_user_policy_eachAfterRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"all", "name":"모두"},
                {"value":"true", "name":"예"},
                {"value":"false", "name":"아니오"}
            ]
        });

        component.bindStore(store);
        component.setValue('all');
    },

    onCmb_outer_user_policy_expireAfterRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"all", "name":"모두"},
                {"value":"true", "name":"예"},
                {"value":"false", "name":"아니오"}
            ]
        });

        component.bindStore(store);
        component.setValue('all');
    },

    onGpn_outer_user_policyItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '모니터링 관리자는 사용자 정책 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_policy_setting', {
            isInner : false
        }).show();
    },

    onBtn_inner_user_policy_settingClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_inner_user_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '모니터링 관리자는 사용자 정책 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '사용자 정책을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_policy_setting', {
            isInner : true
        }).show();
    },

    onBtn_inner_user_policy_send_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_inner_user_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '모니터링 관리자는 정책 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '전송할 사용자 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_user_send', {
            isInner : true
        }).show().center();
    },

    onBtn_inner_user_policy_searchClick: function(button, e, eOpts) {
        var server = Ext.getCmp('txf_inner_user_policy_server').getValue();
        var court = Ext.getCmp('txf_inner_user_policy_court').getValue();
        var userid = Ext.getCmp('txf_inner_user_policy_id').getValue();
        var name = Ext.getCmp('txf_inner_user_policy_name').getValue();

        var each = Ext.getCmp('cmb_inner_user_policy_each').getValue();
        var expire = Ext.getCmp('cmb_inner_user_policy_expired').getValue();

        var query = {};

        if (server !== '서버팜 전체')
        {
            key = 'server_name';
            query[key] = {'$regex' : server};
        }

        if (userid !== '')
        {
            key = '$or';
            query[key] = [ {'userid' : {'$regex' : userid}}, {'userid' : {'$regex' : userid.toUpperCase()}}];
        }

        if (name !== '')
        {
            key = 'surname';
            query[key] = {'$regex' : name};
        }

        if (court !== '')
        {
            key = 'court_name';
            query[key] = {'$regex' : court};
        }

        if (each === 'true')
        {
            key = 'inner_policy.use';
            query[key] = true;

        }
        else if (each === 'false')
        {
            key = 'inner_policy.use';
            query[key] = false;
        }


        if (expire === 'true')
        {
            key = 'in_expire';
            query[key] = true;
        }
        else if (expire === 'false')
        {
            key = 'in_expire';
            query[key] = false;
        }

        Ext.getStore('st_tmov_user_policy').getProxy().extraParams = {
            query : Ext.encode(query),
            user : Ext.encode(Ext.getCmp('main').user)
        };

        Ext.getStore('st_tmov_user_policy').loadPage(1);
    },

    onCmb_policy_search_each_applyAfterRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"all", "name":"모두"},
                {"value":"true", "name":"예"},
                {"value":"false", "name":"아니오"}
            ]
        });

        component.bindStore(store);
        component.setValue('all');
    },

    onCmb_policy_search_policy_expireAfterRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"all", "name":"모두"},
                {"value":"true", "name":"예"},
                {"value":"false", "name":"아니오"}
            ]
        });

        component.bindStore(store);
        component.setValue('all');
    },

    onGpn_inner_user_policyItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '사용자 정책 설정', msg: '모니터링 관리자는 사용자 정책 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_policy_setting', {
            isInner : true
        }).show();
    }

});
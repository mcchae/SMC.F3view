
Ext.define('TMOV.view.pnl_tmov_server_list', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    border: false,
    id: 'pnl_tmov_server_list',
    layout: 'fit',
    title: '서버팜 목록',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    border: false,
                    id: 'tpn_tmov_server_list',
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            id: 'tab_tmov_outer_server',
                            layout: 'fit',
                            title: '외부',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    border: false,
                                    id: 'gpn_tmov_outer_server_farm',
                                    header: false,
                                    store: 'st_tmov_server_list',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_outer_server_farm_setting',
                                                            width: 80,
                                                            text: '설정',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_outer_server_farm_settingClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_outer_server_farm_send_policy',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '정책 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_outer_server_farm_send_policyClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_outer_server_farm_send_agent',
                                                            margin: '0 0 0 10',
                                                            width: 100,
                                                            text: '에이전트 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_outer_server_farm_send_agentClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_outer_server_farm_send_pattern',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '패턴 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_outer_server_farm_send_patternClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_outer_server_farm_send_tmm',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: 'TMM 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_outer_server_farm_send_tmmClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'exporterbutton',
                                                            tree: '',
                                                            type: 'outer_server',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '엑셀로 저장'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
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
                                            dataIndex: 'server_name',
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
                                            dataIndex: 'main_outer_ip',
                                            text: '주 서버 IP 주소',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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
                                            dataIndex: 'sub_outer_ip',
                                            text: '보조 서버 IP 주소'
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
                                            dataIndex: 'outer_agent',
                                            text: '에이전트 버전',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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
                                            dataIndex: 'outer_pattern',
                                            text: '패턴 버전',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value === 0)
                                                {
                                                    if (record.raw.outer_policy.expired === true)
                                                    {
                                                        metaData.style = 'background-color:#BDBDBD;';
                                                    }

                                                    return '전송완료';
                                                }

                                                if (value === 1)
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

                                                if (value === 2)
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
                                            width: 160,
                                            dataIndex: 'outer_state',
                                            text: '전송 상태'
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
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_tmov_server_listItemDblClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            id: 'tab_tmov_inner_server',
                            layout: 'fit',
                            title: '내부',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    border: false,
                                    id: 'gpn_tmov_inner_server_farm',
                                    header: false,
                                    store: 'st_tmov_server_list',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_inner_server_farm_setting',
                                                            width: 80,
                                                            text: '설정',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_inner_server_farm_settingClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_inner_server_farm_send_policy',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '정책 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_inner_server_farm_send_policyClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_inner_server_farm_send_agent',
                                                            margin: '0 0 0 10',
                                                            width: 100,
                                                            text: '에이전트 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_inner_server_farm_send_agentClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_inner_server_farm_send_pattern',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '패턴 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_inner_server_farm_send_patternClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'btn_inner_server_farm_send_tmm',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: 'TMM 전송',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_inner_server_farm_send_tmmClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'exporterbutton',
                                                            type: 'inner_server',
                                                            tree: '',
                                                            format: 'excel',
                                                            margin: '0 0 0 10',
                                                            width: 80,
                                                            text: '엑셀로 저장'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
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
                                            dataIndex: 'server_name',
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
                                            dataIndex: 'main_inner_ip',
                                            text: '주 서버 IP 주소',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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
                                            dataIndex: 'sub_inner_ip',
                                            text: '보조 서버 IP 주소',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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
                                            dataIndex: 'inner_agent',
                                            text: '에이전트 버전',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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
                                            dataIndex: 'inner_pattern',
                                            text: '패턴 버전',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            }
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

                                                    return '전송완료';
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

                                                    return '전송대기';
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

                                                    return '전송실패';
                                                }
                                            },
                                            width: 160,
                                            dataIndex: 'inner_state',
                                            text: '전송 상태'
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
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    }),
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onGpn_tmov_server_listItemDblClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmov_server_listAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_outer_server_farm_settingClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_outer_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '서버팜 설정', msg: '모니터링 관리자는 서버팜 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({  title: '서버 설정', msg: '설정할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_basic_policy',{
            isInner : false
        }).show();
    },

    onBtn_outer_server_farm_send_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_outer_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '모니터링 관리자는 정책 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_send_policy', {
            isInner : false
        }).show().center();
    },

    onBtn_outer_server_farm_send_agentClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_outer_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '에이전트 전송', msg: '모니터링 관리자는 에이전트 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '에이전트 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_agent', {
            isInner : false
        }).show().center();
    },

    onBtn_outer_server_farm_send_patternClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_outer_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '패턴 전송', msg: '모니터링 관리자는 패턴 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '패턴 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_pattern', {
            isInner : false
        }).show().center();
    },

    onBtn_outer_server_farm_send_tmmClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_outer_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '서버 전송', msg: '모니터링 관리자는 패턴 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '서버 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_tmm', {
            isInner : false
        }).show().center();
    },

    onGpn_tmov_server_listItemDblClick1: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '서버팜 설정', msg: '모니터링 관리자는 서버팜 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_basic_policy',{
            isInner : false
        }).show();
    },

    onBtn_inner_server_farm_settingClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_inner_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '서버팜 설정', msg: '모니터링 관리자는 서버팜 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '서버팜 설정', msg: '설정할 서버팜 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_basic_policy',{
            isInner : true
        }).show();
    },

    onBtn_inner_server_farm_send_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_inner_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '모니터링 관리자는 정책 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_send_policy', {
            isInner : true
        }).show().center();
    },

    onBtn_inner_server_farm_send_agentClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_inner_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '에이전트 전송', msg: '모니터링 관리자는 에이전트 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '에이전트 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_agent', {
            isInner : true
        }).show().center();
    },

    onBtn_inner_server_farm_send_patternClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_inner_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '패턴 전송', msg: '모니터링 관리자는 패턴 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '패턴 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_pattern', {
            isInner : true
        }).show().center();
    },

    onBtn_inner_server_farm_send_tmmClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_inner_server_farm');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '패턴 전송', msg: '모니터링 관리자는 패턴 전송 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '서버 전송', msg: '전송할 서버 목록을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_tmm', {
            isInner : true
        }).show().center();
    },

    onGpn_tmov_server_listItemDblClick: function(dataview, record, item, index, e, eOpts) {
        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '서버팜 설정', msg: '모니터링 관리자는 서버팜 설정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_basic_policy',{
            isInner : true
        }).show();
    },

    onPnl_tmov_server_listAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetServerList',
                params : {
                    server_farm : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw.server_farm),
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
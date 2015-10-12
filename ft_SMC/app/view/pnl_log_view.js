
Ext.define('SMC.view.pnl_log_view', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.tree.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Separator',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Date'
    ],

    frame: true,
    height: 900,
    id: 'pnl_log_view',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    split: true,
                    itemId: 'pnl_log_xtm',
                    minWidth: 100,
                    width: 320,
                    layout: 'fit',
                    collapsible: true,
                    title: '로그 뷰어',
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'pnl_xtm',
                            collapsible: false,
                            header: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    flex: 1,
                                    id: '',
                                    itemId: 'trpn_xtm',
                                    header: false,
                                    title: '장비 그룹',
                                    enableColumnHide: false,
                                    useArrows: true,
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            hidden: true,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    hidden: true,
                                                    text: '추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    hidden: true,
                                                    text: '수정',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick2,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    hidden: true,
                                                    text: '삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick3,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'tbseparator',
                                                    hidden: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'id_btn_search',
                                                    width: 100,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onId_btn_searchButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    viewConfig: {

                                    },
                                    listeners: {
                                        itemcontextmenu: {
                                            fn: me.onTreepanelItemContextMenu,
                                            scope: me
                                        },
                                        afterrender: {
                                            fn: me.onTreepanelAfterRender,
                                            scope: me
                                        },
                                        selectionchange: {
                                            fn: me.onId_tree_xtmSelectionChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_xtm',
                                    title: '장비 목록',
                                    titleCollapse: false,
                                    store: 'id_store_log_xtm',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                //ico_obj_dev_xtm_16
                                                metaData.tdCls = 'ico_obj_dev_xtm_16';
                                                return value;
                                            },
                                            dataIndex: 'name',
                                            text: '장비명',
                                            flex: 0.6
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ip',
                                            text: 'IP 주소',
                                            flex: 0.4
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onId_grid_xtmItemDblClick,
                                            scope: me
                                        }
                                    },
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    itemId: 'pnl_log_main',
                    layout: 'fit',
                    header: false,
                    title: 'Main',
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'pnl_main',
                            margin: '',
                            autoScroll: true,
                            layout: 'fit',
                            animCollapse: false,
                            collapsible: false,
                            header: false,
                            title: 'My Panel',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    border: false,
                                    hidden: true,
                                    itemId: 'tpn_main',
                                    bodyBorder: false,
                                    closable: true,
                                    closeAction: 'hide',
                                    collapsed: false,
                                    collapsible: false,
                                    title: '검색 결과',
                                    listeners: {
                                        close: {
                                            fn: me.onTpn_mainClose,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'east',
                    split: true,
                    itemId: 'pnl_log_search',
                    minWidth: 100,
                    width: 350,
                    layout: 'fit',
                    collapsible: true,
                    title: '검색 설정',
                    items: [
                        {
                            xtype: 'panel',
                            height: 150,
                            itemId: 'pnl_search',
                            layout: 'fit',
                            collapsible: true,
                            header: false,
                            title: 'My Panel',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    border: false,
                                    itemId: 'tpn_search',
                                    collapsible: false,
                                    activeTab: 0,
                                    tabPosition: 'right',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            itemId: 'pnl_search_log',
                                            title: '로그',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 24,
                                                    itemId: 'bt_search_log',
                                                    margin: '5 5 0 5',
                                                    width: 70,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_search_logClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    itemId: 'pnl_search_log_option',
                                                    margin: '5 5 0 5',
                                                    header: false,
                                                    title: 'My Panel',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 0.51,
                                                            itemId: 'cmb_search_log_order',
                                                            fieldLabel: '정렬방식',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 55,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onId_combo_log_orderAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 0.49,
                                                            itemId: 'cmb_search_log_count',
                                                            margin: '',
                                                            fieldLabel: '출력개수',
                                                            labelAlign: 'right',
                                                            labelPad: 10,
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onId_combo_log_countAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_log_countChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_log_type',
                                                    margin: '6 5 0 5',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            itemId: 'cmb_search_log_type',
                                                            margin: '10 0 10 0',
                                                            fieldLabel: '로그 종류',
                                                            labelAlign: 'right',
                                                            labelPad: 15,
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onId_combo_log_typeAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_log_typeChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'radiogroup',
                                                            hidden: true,
                                                            itemId: 'rdg_search_log_type',
                                                            width: 350,
                                                            fieldLabel: '',
                                                            labelAlign: 'right',
                                                            labelWidth: 70,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'id_rb_fw_log',
                                                                    width: 75,
                                                                    name: 'rb_log',
                                                                    boxLabel: '방화벽',
                                                                    checked: true,
                                                                    inputValue: 'fw'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'id_rb_nat_log',
                                                                    width: 75,
                                                                    name: 'rb_log',
                                                                    boxLabel: 'NAT-PT',
                                                                    inputValue: 'nat'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'id_rb_dpi_log',
                                                                    width: 75,
                                                                    name: 'rb_log',
                                                                    boxLabel: 'DPI',
                                                                    inputValue: 'dpi'
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onRadiogroupChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'radiogroup',
                                                            flex: 1,
                                                            hidden: true,
                                                            itemId: 'rdg_search_log_iptype',
                                                            margin: '5 0 5 0',
                                                            fieldLabel: '',
                                                            hideEmptyLabel: false,
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'id_rb_log_v4',
                                                                    margin: '',
                                                                    width: 70,
                                                                    name: 'id_rb_log',
                                                                    boxLabel: 'IPv4',
                                                                    checked: true,
                                                                    inputValue: 'v4'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'id_rb_log_v6',
                                                                    width: 70,
                                                                    name: 'id_rb_log',
                                                                    boxLabel: 'IPv6',
                                                                    inputValue: 'v6'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_log_time',
                                                    margin: '5 5 0 5',
                                                    title: '날짜/시간',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            height: 24,
                                                            itemId: 'rdg_search_log_period',
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_log_period_today',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_log_period',
                                                                    boxLabel: '오늘',
                                                                    checked: true,
                                                                    inputValue: 'today'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_log_period_day',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_log_period',
                                                                    boxLabel: '일별',
                                                                    inputValue: 'day'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_log_period_week',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_log_period',
                                                                    boxLabel: '주별',
                                                                    inputValue: 'week'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_log_period_month',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_log_period',
                                                                    boxLabel: '월별',
                                                                    inputValue: 'month'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    flex: 1,
                                                                    itemId: 'rd_search_log_period_user',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_log_period',
                                                                    boxLabel: '사용자',
                                                                    inputValue: 'user'
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onRdg_search_log_periodChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_log_start',
                                                            margin: '5 0 2.5 0',
                                                            fieldLabel: '시작 시간',
                                                            labelAlign: 'right',
                                                            labelPad: 15,
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                render: {
                                                                    fn: me.onId_dt_startRender12,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_log_end',
                                                            margin: '2.5 0 10 0',
                                                            fieldLabel: '종료 시간',
                                                            labelAlign: 'right',
                                                            labelPad: 15,
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                render: {
                                                                    fn: me.onId_dt_endRender12,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_log_level',
                                                    margin: '5 5 0 5',
                                                    title: '로그 레벨',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            itemId: 'ckg_search_log_level',
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_debug',
                                                                    minWidth: 110,
                                                                    width: 110,
                                                                    boxLabel: '1.Debug'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_info',
                                                                    minWidth: 125,
                                                                    width: 125,
                                                                    boxLabel: '2.Information'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            itemId: 'ckg_search_log_level1',
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_normal',
                                                                    minWidth: 110,
                                                                    width: 110,
                                                                    boxLabel: '3.Normal'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_warning',
                                                                    minWidth: 125,
                                                                    width: 125,
                                                                    boxLabel: '4.Warning'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            itemId: 'ckg_search_log_level2',
                                                            margin: '5 0 5 0',
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_serious',
                                                                    minWidth: 110,
                                                                    width: 110,
                                                                    boxLabel: '5.Serious'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    itemId: 'ck_search_log_level_critical',
                                                                    minWidth: 125,
                                                                    width: 125,
                                                                    boxLabel: '6.Critical'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'treepanel',
                                                    flex: 1,
                                                    border: false,
                                                    height: 200,
                                                    itemId: 'trpn_search_log_event',
                                                    margin: '5 5 0 5',
                                                    title: '이벤트',
                                                    root: {
                                                        text: '전체',
                                                        checked: false,
                                                        expanded: true,
                                                        children: [
                                                            {
                                                                text: '시스템',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: '시스템',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x11060001',
                                                                                text: '시스템 시작',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11050002',
                                                                                text: '스택 오버플로우',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11050003',
                                                                                text: '커널 메모리 부족',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11050004',
                                                                                text: '커널 메모리 할당 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11050005',
                                                                                text: '커널 메모리 해제 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11050006',
                                                                                text: '사용자 메모리 부족',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11060007',
                                                                                text: '인터페이스 연결 해제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11060008',
                                                                                text: '인터페이스 연결',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x11060009',
                                                                                text: '시스템 재부팅',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1106000a',
                                                                                text: '디스크 복구 실행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1106000b',
                                                                                text: '시스템 예약 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1106000c',
                                                                                text: '시스템 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1103001d',
                                                                                text: 'ERFC et table is full',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1103001e',
                                                                                text: 'ERFC et table flushed',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '관리 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x12040001',
                                                                                text: '수신한 Object에 오류가 있음',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030002',
                                                                                text: 'Object 적재 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030003',
                                                                                text: '관리자 로그인 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12040004',
                                                                                text: '관리자 로그인 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12060005',
                                                                                text: '관리자 로그인이 금지됨',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030006',
                                                                                text: '관리자 로그 아웃',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12020007',
                                                                                text: '무결성 검사 시작',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12020008',
                                                                                text: '무결성 검사 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030009',
                                                                                text: '무결성 검사 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205000a',
                                                                                text: '무결성 검사 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1202000b',
                                                                                text: '예약 전송 완료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1206000c',
                                                                                text: '오브젝트 변경',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203000d',
                                                                                text: '일일 리포팅 파일 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203000e',
                                                                                text: 'TCP 플로우 추가',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203000f',
                                                                                text: 'RTM 인증 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030010',
                                                                                text: 'RTM 인증 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050011',
                                                                                text: '서비스 정지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030012',
                                                                                text: '서비스 재시작',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030013',
                                                                                text: '정책 백업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030014',
                                                                                text: '정책 리스토어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050015',
                                                                                text: '데몬 다운',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050016',
                                                                                text: '데몬 업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050017',
                                                                                text: 'ARP Spoofing port up',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050018',
                                                                                text: 'ARP Spoofing port down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12040019',
                                                                                text: 'invalid source ip',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203001a',
                                                                                text: 'DHCP IP 할당',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203001b',
                                                                                text: 'PPPoE modem receive IP',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1203001c',
                                                                                text: 'IP 중복',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1201001d',
                                                                                text: 'Radius 상태 점검 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205001e',
                                                                                text: 'Radius 상태 점검 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1201004d',
                                                                                text: 'Radius(backup) 상태 점검 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205004e',
                                                                                text: 'Radius(backup) 상태 점검 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1201001f',
                                                                                text: 'AD_LDAP 상태 점검 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050020',
                                                                                text: 'AD_LDAP 상태 점검 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1201003c',
                                                                                text: 'TACACS 상태 점검 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205003d',
                                                                                text: 'TACACS 상태 점검 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12010021',
                                                                                text: 'NTP 서버 동기화 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050022',
                                                                                text: 'NTP 서버 동기화 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030023',
                                                                                text: '정책 동기화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030024',
                                                                                text: '관리자 메일 전송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12040025',
                                                                                text: 'interface ip changed',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050026',
                                                                                text: '로그 파일 복구 완료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050027',
                                                                                text: 'HDD 사용량 임계치 초과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050028',
                                                                                text: 'Add PKI completed',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050029',
                                                                                text: 'Delete PKI completed',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050030',
                                                                                text: 'PKI Successful Change PW',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050031',
                                                                                text: 'PKI Failed Change password',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030032',
                                                                                text: 'Apply policy user',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030033',
                                                                                text: 'Apply policy info',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12050034',
                                                                                text: 'Equipment anti-theft feature',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030035',
                                                                                text: 'License ok',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12060036',
                                                                                text: 'License expired',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12060037',
                                                                                text: 'Can\'t find License info',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12060038',
                                                                                text: 'Alert by SPD Rule',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12060039',
                                                                                text: 'FW rule has expired',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205003a',
                                                                                text: 'Bandwidth 측정',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1206003b',
                                                                                text: '관리자 비밀번호 유효기간 만료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205002c',
                                                                                text: '패킷 드랍 (not trustedhost)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205002d',
                                                                                text: '패킷 드랍 (not management port)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205003e',
                                                                                text: 'PKI Validity Error',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1205003f',
                                                                                text: 'PKI Init Error (Not Exist Certificate)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x12030040',
                                                                                text: 'CLI_COMMAND',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '센터 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x13030001',
                                                                                text: '센터로 부터 응답없음',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13040002',
                                                                                text: '센터메시지 해쉬 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13040003',
                                                                                text: '메시지 송신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13040004',
                                                                                text: '메시지 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13030005',
                                                                                text: '센터를 정상적으로 찾음',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13030006',
                                                                                text: 'MasterKey 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13020007',
                                                                                text: 'MasterKey 유효기간 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13020008',
                                                                                text: 'MasterKey 적재 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x13020009',
                                                                                text: 'MasterKey 변경 (KCP) 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1306000a',
                                                                                text: 'MasterKey 변경 (KCP) 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '업그레이드 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x14020001',
                                                                                text: 'Autoup FW 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040002',
                                                                                text: 'Autoup FW 업그레이드 중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020003',
                                                                                text: 'Autoup 유해 DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040004',
                                                                                text: 'Autoup 유해 DB 업그레이드 중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020005',
                                                                                text: 'Autoup 자동 업그레이드 중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040006',
                                                                                text: 'Autoup 자동 업그레이드에 의한 리셋',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020007',
                                                                                text: 'Autoup 자동 업그레이드 점검',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020008',
                                                                                text: 'Autoup RAMDISK 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040009',
                                                                                text: 'Autoup RAMDISK 업그레이드중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020021',
                                                                                text: 'Autoup HTTP+ DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040022',
                                                                                text: 'Autoup HTTP+ DB 업그레이드 시 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402000a',
                                                                                text: '안티 스팸 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404000b',
                                                                                text: '안티 스팸 업그레이드중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402000c',
                                                                                text: '안티 바이러스 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404000d',
                                                                                text: '안티 바이러스 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402000e',
                                                                                text: 'IPS 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404000f',
                                                                                text: 'IPS 업그레이드중 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020010',
                                                                                text: '펌웨어 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030011',
                                                                                text: '펌웨어 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020012',
                                                                                text: '램디스크 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030013',
                                                                                text: '램디스크 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020014',
                                                                                text: 'APP이미지 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030015',
                                                                                text: 'APP이미지 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020016',
                                                                                text: 'DPI 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030017',
                                                                                text: 'DPI 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020018',
                                                                                text: 'AV 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030019',
                                                                                text: 'AV 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402001a',
                                                                                text: 'URL 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1403001b',
                                                                                text: 'URL 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402001c',
                                                                                text: 'Autoup DPI 패턴 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404001d',
                                                                                text: 'Autoup DPI 패턴 업그레이드 시 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402001e',
                                                                                text: 'Autoup 바이러스 패턴 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404001f',
                                                                                text: 'Autoup 바이러스 업그레이드 시 오류 발생',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020023',
                                                                                text: '악성코드 배포지 DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030024',
                                                                                text: '악성코드 배포지 DB 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020025',
                                                                                text: 'HTTP+ DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030026',
                                                                                text: 'HTTP+ DB 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020027',
                                                                                text: 'APP+ DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14030028',
                                                                                text: 'APP+ DB 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14020029',
                                                                                text: 'Autoup 악성코드 배포지 DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404002a',
                                                                                text: 'Autoup 악성코드 배포지 DB 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402002b',
                                                                                text: 'Autoup HTTP+ DB 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404002c',
                                                                                text: 'Autoup HTTP+ DB 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1402002d',
                                                                                text: 'Autoup APP+ 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404002e',
                                                                                text: 'Autoup APP+ 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x1404002f',
                                                                                text: '.agent file 업그레이드 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x14040030',
                                                                                text: '.agent file 업그레이드 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '통계 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x15060001',
                                                                                text: '메모리 사용량 90%이상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x15060002',
                                                                                text: 'CPU 사용량 90%이상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x15060003',
                                                                                text: 'HDD 사용량 90% 이상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x15060004',
                                                                                text: 'Session 사용량 90%이상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x15060005',
                                                                                text: '메모리 사용량 제한에 따른 Alert',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x15060006',
                                                                                text: '세션 사용량 제한에 따른 Alert',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '로그 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x16020001',
                                                                                text: 'FTP Server 로 로그 전송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16060002',
                                                                                text: 'HDD 로그 삭제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16030003',
                                                                                text: '로그 압축',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16020004',
                                                                                text: '로그 압축 풀기',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16030005',
                                                                                text: '로그 백업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16020006',
                                                                                text: '로그 다운',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x16050007',
                                                                                text: 'FTP Server 로 로그 전송 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'User',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x17030001',
                                                                                text: 'Login Success',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x17040002',
                                                                                text: 'Login Fail',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x17030003',
                                                                                text: 'Expire',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x17040004',
                                                                                text: 'IP/ID Conflict',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '방화벽',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'Packet Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x20020001',
                                                                                text: '세션 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20030002',
                                                                                text: '패킷 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040003',
                                                                                text: '패킷 버림 (drop)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20030005',
                                                                                text: 'IPSEC  적용',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20030006',
                                                                                text: '사용자 인증 적용',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040007',
                                                                                text: 'NAT 적용 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040008',
                                                                                text: 'Content Filtering 적용 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040009',
                                                                                text: 'IPSEC 적용 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2004000a',
                                                                                text: '사용자 인증 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2004000b',
                                                                                text: '세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2004000c',
                                                                                text: 'abnomal 세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2003000d',
                                                                                text: 'TCP 플로우 SYN',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2003000e',
                                                                                text: 'TCP 플로우 SYN/ACK',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2003000f',
                                                                                text: 'TCP 플로우 FIN',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20030010',
                                                                                text: 'TCP 플로우 RST',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20020011',
                                                                                text: '6to4 세션 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20020012',
                                                                                text: '4to6 세션 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040013',
                                                                                text: '6to4 세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040014',
                                                                                text: '4to6 세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040015',
                                                                                text: '룰이 아닌 패킷 버림',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20020016',
                                                                                text: 'IPSEC 세션 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20030017',
                                                                                text: 'IPSEC 세션 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040018',
                                                                                text: 'IPSEC 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x20040019',
                                                                                text: 'IPSEC 룰이 아닌 패킷 버림',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2004001a',
                                                                                text: 'IPSEC 세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2004001b',
                                                                                text: 'IPSEC 비정상 세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2005001c',
                                                                                text: '메모리 사용량 제한에 따른 패킷 DROP',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2005001d',
                                                                                text: '방화벽 세션 사용량 제한에 따른 패킷 DROP',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'DOS Protection',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x21050001',
                                                                                text: 'DOS Attack',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x21030002',
                                                                                text: 'DOS Block End',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x21030004',
                                                                                text: 'DOS Block DROP',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x21030005',
                                                                                text: 'DOS Ping Size over',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'DDOS Protection',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x22050001',
                                                                                text: 'DDos Attack',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x22030002',
                                                                                text: 'DDos Block End',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x22030003',
                                                                                text: 'DDos Block Start',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x22030004',
                                                                                text: 'DDos Block Drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x22030005',
                                                                                text: 'DDos Ping Size over',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Portscan',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x23050001',
                                                                                text: 'Portscan Attack',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x23030002',
                                                                                text: 'Portscan Block End',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x23030003',
                                                                                text: 'Portscan Block Drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x23030004',
                                                                                text: 'Portscan Block Start',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IP Spoofing',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x24050001',
                                                                                text: 'IP spoofing 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'APP Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x25020001',
                                                                                text: '세션 생성',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x25030002',
                                                                                text: '패킷 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x25040003',
                                                                                text: '패킷 버림 (drop)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x25040004',
                                                                                text: '세션 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'SMTP Match Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x26030001',
                                                                                text: 'SMTP Match Filtering 접속 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x26030002',
                                                                                text: 'SMTP Match Filtering 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x26020003',
                                                                                text: 'SMTP Match Filtering 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'SMTP Transform Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x27030001',
                                                                                text: 'SMTP Transform Filtering 접속 차단 ',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x27030002',
                                                                                text: 'SMTP Transform Filtering 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x27020003',
                                                                                text: 'SMTP Transform Filtering 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'SMTP Advanced Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x28030001',
                                                                                text: 'SMTP Advanced Filtering 접속 차단 ',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x28030002',
                                                                                text: 'SMTP Advanced Filtering 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x28020003',
                                                                                text: 'SMTP Advanced Filtering 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP Content Filtering DROP',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x29040001',
                                                                                text: 'CF 접속 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040002',
                                                                                text: '유해 사이트 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040003',
                                                                                text: '차단 그룹 게임 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040004',
                                                                                text: '차단 그룹 증권 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040005',
                                                                                text: '차단 그룹 신문 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040006',
                                                                                text: '차단 그룹 방송 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040007',
                                                                                text: '차단 그룹 이메일 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040008',
                                                                                text: '차단 그룹 웹하드 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x29040009',
                                                                                text: '차단 그룹 P2P 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2904000a',
                                                                                text: '차단 그룹 사용자 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2902000b',
                                                                                text: 'HTTP CF 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2902000c',
                                                                                text: 'Youth Match drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2902000d',
                                                                                text: 'PICS Match drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2902000e',
                                                                                text: 'Malware URL Match drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2902000f',
                                                                                text: '응답 패킷 필터링 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP Content Filtering Accept',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2a040001',
                                                                                text: 'CF 접속 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040002',
                                                                                text: '유해 사이트 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040003',
                                                                                text: '차단 그룹 게임 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040004',
                                                                                text: '차단 그룹 증권 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040005',
                                                                                text: '차단 그룹 신문 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040006',
                                                                                text: '차단 그룹 방송 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040007',
                                                                                text: '차단 그룹 이메일 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040008',
                                                                                text: '차단 그룹 웹하드 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a040009',
                                                                                text: '차단 그룹 P2P 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a04000a',
                                                                                text: '차단 그룹 사용자 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a02000c',
                                                                                text: 'Youth Match Accept',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a02000d',
                                                                                text: 'PICS Match Accept',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a02000e',
                                                                                text: 'Malware URL Match Accept',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2a02000f',
                                                                                text: '응답 패킷 필터링 통과',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP+ Accept List',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2b030002',
                                                                                text: '게임',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030003',
                                                                                text: '경제, 경영 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030004',
                                                                                text: '경제 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030005',
                                                                                text: '경제 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030006',
                                                                                text: '경제, 경영학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030007',
                                                                                text: '경제 참고자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030008',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030009',
                                                                                text: '무역',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000a',
                                                                                text: '금리',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000b',
                                                                                text: '대출',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000c',
                                                                                text: '보험',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000d',
                                                                                text: '부동산',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000e',
                                                                                text: '은행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03000f',
                                                                                text: '증권, 주식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030010',
                                                                                text: '세금, 세무',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030011',
                                                                                text: '신용',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030012',
                                                                                text: '채권',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030013',
                                                                                text: '외환, 환율',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030014',
                                                                                text: '경제 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030015',
                                                                                text: '취업, 창업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030016',
                                                                                text: '경제 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030017',
                                                                                text: '교육',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030018',
                                                                                text: '시험, 자격증',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030019',
                                                                                text: '학문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001a',
                                                                                text: '교육시설',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001b',
                                                                                text: '교수, 학습자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001c',
                                                                                text: '교육기업, 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001d',
                                                                                text: '교육매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001e',
                                                                                text: '교육정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03001f',
                                                                                text: '학교, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030020',
                                                                                text: '교육협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030021',
                                                                                text: '인테리어 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030022',
                                                                                text: '건강, 의료 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030023',
                                                                                text: '건설, 토목 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030024',
                                                                                text: '쇼핑',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030025',
                                                                                text: '과학 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030026',
                                                                                text: '1차 산업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030027',
                                                                                text: '교육, 학습 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030028',
                                                                                text: '교통, 운송 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030029',
                                                                                text: '일반 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002a',
                                                                                text: '기업사보, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002b',
                                                                                text: '대행서비스 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002c',
                                                                                text: '렌트, 임대기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002d',
                                                                                text: '보안 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002e',
                                                                                text: '브랜드 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03002f',
                                                                                text: '산업용품 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030030',
                                                                                text: '어린이, 유아기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030031',
                                                                                text: '전기, 전자 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030032',
                                                                                text: '컴퓨터 인터넷 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030033',
                                                                                text: '컨설팅 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030034',
                                                                                text: 'TV 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030035',
                                                                                text: '교육, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030036',
                                                                                text: '뉴스속보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030037',
                                                                                text: '데이터 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030038',
                                                                                text: 'DMB',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030039',
                                                                                text: '라디오 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003a',
                                                                                text: '방송, 통신장비',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003b',
                                                                                text: '사설, 칼럼',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003c',
                                                                                text: '신문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003d',
                                                                                text: '언론인, 방송인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003e',
                                                                                text: '외국미디어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03003f',
                                                                                text: '위성방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030040',
                                                                                text: '인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030041',
                                                                                text: '일기예보, 날씨',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030042',
                                                                                text: '잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030043',
                                                                                text: '저널리즘',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030044',
                                                                                text: '통신사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030045',
                                                                                text: '뉴스 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030046',
                                                                                text: '생활',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030047',
                                                                                text: '건강',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030048',
                                                                                text: '생활정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030049',
                                                                                text: '주거, 환경',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004a',
                                                                                text: '법률, 상식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004b',
                                                                                text: '생활협동조합',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004c',
                                                                                text: '세대, 사회유형',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004d',
                                                                                text: '요리, 취미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004e',
                                                                                text: '스포츠',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03004f',
                                                                                text: '스포츠 업체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030050',
                                                                                text: '스포츠 동호회, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030051',
                                                                                text: '스포츠 대회, 경기',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030052',
                                                                                text: '스포츠 시설, 경기장',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030053',
                                                                                text: '스포츠 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030054',
                                                                                text: '스포츠 행사, 이벤트',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030055',
                                                                                text: '스포츠 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030056',
                                                                                text: '건축',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030057',
                                                                                text: '예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030058',
                                                                                text: '문화/예술 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030059',
                                                                                text: '문학, 사학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005a',
                                                                                text: '문화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005b',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005c',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005d',
                                                                                text: '종교 철학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005e',
                                                                                text: '출판, 도서',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03005f',
                                                                                text: '국제 경제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030060',
                                                                                text: '군대, 국방',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030061',
                                                                                text: '사회,정치/기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030062',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030063',
                                                                                text: '범죄',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030064',
                                                                                text: '법, 법률',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030065',
                                                                                text: '사회, 정치 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030066',
                                                                                text: '사회/정치 인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030067',
                                                                                text: '정치',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030068',
                                                                                text: '국가정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030069',
                                                                                text: '여행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006a',
                                                                                text: '여행 잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006b',
                                                                                text: '성인, 음란',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006c',
                                                                                text: '공연예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006d',
                                                                                text: '엔터테인먼트 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006e',
                                                                                text: '만화, 애니메이션',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03006f',
                                                                                text: '무용, 댄스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030070',
                                                                                text: '연예 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030071',
                                                                                text: '영화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030072',
                                                                                text: '연예 기획사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030073',
                                                                                text: '운세, 사주',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030074',
                                                                                text: '유머, 재미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030075',
                                                                                text: '마술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030076',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030077',
                                                                                text: '연예정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030078',
                                                                                text: '인물, 사람들',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030079',
                                                                                text: '계정 서비스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007a',
                                                                                text: '컴퓨터 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007b',
                                                                                text: '메신저',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007c',
                                                                                text: '바이러스, 백신',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007d',
                                                                                text: '보안, 암호화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007e',
                                                                                text: '블로그',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03007f',
                                                                                text: '소프트 웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030080',
                                                                                text: '이메일',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030081',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030082',
                                                                                text: '검색, 포털',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030083',
                                                                                text: '인터넷',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030084',
                                                                                text: '컴퓨터 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030085',
                                                                                text: '커뮤니티',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030086',
                                                                                text: '컴퓨터',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030087',
                                                                                text: '통신, 네트워크',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030088',
                                                                                text: '파일공유',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b030089',
                                                                                text: '하드웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03008a',
                                                                                text: '웹프락시, 원격접속',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03008b',
                                                                                text: '해킹, 크랙',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b03008c',
                                                                                text: '성인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ca',
                                                                                text: 'user Category 201',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300cb',
                                                                                text: 'user Category 202',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300cc',
                                                                                text: 'user Category 203',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300cd',
                                                                                text: 'user Category 204',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ce',
                                                                                text: 'user Category 205',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300cf',
                                                                                text: 'user Category 206',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d0',
                                                                                text: 'user Category 207',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d1',
                                                                                text: 'user Category 208',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d2',
                                                                                text: 'user Category 209',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d3',
                                                                                text: 'user Category 210',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d4',
                                                                                text: 'user Category 211',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d5',
                                                                                text: 'user Category 212',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d6',
                                                                                text: 'user Category 213',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d7',
                                                                                text: 'user Category 214',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d8',
                                                                                text: 'user Category 215',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300d9',
                                                                                text: 'user Category 216',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300da',
                                                                                text: 'user Category 217',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300db',
                                                                                text: 'user Category 218',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300dc',
                                                                                text: 'user Category 219',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300dd',
                                                                                text: 'user Category 220',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300de',
                                                                                text: 'user Category 221',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300df',
                                                                                text: 'user Category 222',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e0',
                                                                                text: 'user Category 223',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e1',
                                                                                text: 'user Category 224',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e2',
                                                                                text: 'user Category 225',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e3',
                                                                                text: 'user Category 226',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e4',
                                                                                text: 'user Category 227',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e5',
                                                                                text: 'user Category 228',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e6',
                                                                                text: 'user Category 229',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e7',
                                                                                text: 'user Category 230',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e8',
                                                                                text: 'user Category 231',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300e9',
                                                                                text: 'user Category 232',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ea',
                                                                                text: 'user Category 233',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300eb',
                                                                                text: 'user Category 234',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ec',
                                                                                text: 'user Category 235',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ed',
                                                                                text: 'user Category 236',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ee',
                                                                                text: 'user Category 237',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300ef',
                                                                                text: 'user Category 238',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f0',
                                                                                text: 'user Category 239',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f1',
                                                                                text: 'user Category 240',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f2',
                                                                                text: 'user Category 241',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f3',
                                                                                text: 'user Category 242',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f4',
                                                                                text: 'user Category 243',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f5',
                                                                                text: 'user Category 244',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f6',
                                                                                text: 'user Category 245',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f7',
                                                                                text: 'user Category 246',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f8',
                                                                                text: 'user Category 247',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300f9',
                                                                                text: 'user Category 248',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300fa',
                                                                                text: 'user Category 249',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2b0300fb',
                                                                                text: 'user Category 250',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP+ Block List',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2c030001',
                                                                                text: '악성코드배포지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030002',
                                                                                text: '게임',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030003',
                                                                                text: '경제, 경영 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030004',
                                                                                text: '경제 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030005',
                                                                                text: '경제 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030006',
                                                                                text: '경제, 경영학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030007',
                                                                                text: '경제 참고자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030008',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030009',
                                                                                text: '무역',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000a',
                                                                                text: '금리',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000b',
                                                                                text: '대출',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000c',
                                                                                text: '보험',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000d',
                                                                                text: '부동산',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000e',
                                                                                text: '은행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03000f',
                                                                                text: '증권, 주식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030010',
                                                                                text: '세금, 세무',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030011',
                                                                                text: '신용',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030012',
                                                                                text: '채권',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030013',
                                                                                text: '외환, 환율',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030014',
                                                                                text: '경제 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030015',
                                                                                text: '취업, 창업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030016',
                                                                                text: '경제 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030017',
                                                                                text: '교육',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030018',
                                                                                text: '시험, 자격증',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030019',
                                                                                text: '학문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001a',
                                                                                text: '교육시설',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001b',
                                                                                text: '교수, 학습자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001c',
                                                                                text: '교육기업, 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001d',
                                                                                text: '교육매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001e',
                                                                                text: '교육정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03001f',
                                                                                text: '학교, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030020',
                                                                                text: '교육협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030021',
                                                                                text: '인테리어 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030022',
                                                                                text: '건강, 의료 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030023',
                                                                                text: '건설, 토목 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030024',
                                                                                text: '쇼핑',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030025',
                                                                                text: '과학 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030026',
                                                                                text: '1차 산업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030027',
                                                                                text: '교육, 학습 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030028',
                                                                                text: '교통, 운송 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030029',
                                                                                text: '일반 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002a',
                                                                                text: '기업사보, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002b',
                                                                                text: '대행서비스 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002c',
                                                                                text: '렌트, 임대기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002d',
                                                                                text: '보안 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002e',
                                                                                text: '브랜드 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03002f',
                                                                                text: '산업용품 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030030',
                                                                                text: '어린이, 유아기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030031',
                                                                                text: '전기, 전자 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030032',
                                                                                text: '컴퓨터 인터넷 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030033',
                                                                                text: '컨설팅 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030034',
                                                                                text: 'TV 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030035',
                                                                                text: '교육, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030036',
                                                                                text: '뉴스속보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030037',
                                                                                text: '데이터 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030038',
                                                                                text: 'DMB',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030039',
                                                                                text: '라디오 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003a',
                                                                                text: '방송, 통신장비',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003b',
                                                                                text: '사설, 칼럼',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003c',
                                                                                text: '신문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003d',
                                                                                text: '언론인, 방송인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003e',
                                                                                text: '외국미디어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03003f',
                                                                                text: '위성방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030040',
                                                                                text: '인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030041',
                                                                                text: '일기예보, 날씨',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030042',
                                                                                text: '잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030043',
                                                                                text: '저널리즘',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030044',
                                                                                text: '통신사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030045',
                                                                                text: '뉴스 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030046',
                                                                                text: '생활',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030047',
                                                                                text: '건강',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030048',
                                                                                text: '생활정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030049',
                                                                                text: '주거, 환경',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004a',
                                                                                text: '법률, 상식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004b',
                                                                                text: '생활협동조합',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004c',
                                                                                text: '세대, 사회유형',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004d',
                                                                                text: '요리, 취미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004e',
                                                                                text: '스포츠',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03004f',
                                                                                text: '스포츠 업체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030050',
                                                                                text: '스포츠 동호회, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030051',
                                                                                text: '스포츠 대회, 경기',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030052',
                                                                                text: '스포츠 시설, 경기장',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030053',
                                                                                text: '스포츠 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030054',
                                                                                text: '스포츠 행사, 이벤트',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030055',
                                                                                text: '스포츠 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030056',
                                                                                text: '건축',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030057',
                                                                                text: '예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030058',
                                                                                text: '문화/예술 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030059',
                                                                                text: '문학, 사학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005a',
                                                                                text: '문화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005b',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005c',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005d',
                                                                                text: '종교 철학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005e',
                                                                                text: '출판, 도서',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03005f',
                                                                                text: '국제 경제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030060',
                                                                                text: '군대, 국방',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030061',
                                                                                text: '사회,정치/기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030062',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030063',
                                                                                text: '범죄',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030064',
                                                                                text: '법, 법률',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030065',
                                                                                text: '사회, 정치 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030066',
                                                                                text: '사회/정치 인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030067',
                                                                                text: '정치',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030068',
                                                                                text: '국가정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030069',
                                                                                text: '여행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006a',
                                                                                text: '여행 잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006b',
                                                                                text: '성인, 음란',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006c',
                                                                                text: '공연예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006d',
                                                                                text: '엔터테인먼트 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006e',
                                                                                text: '만화, 애니메이션',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03006f',
                                                                                text: '무용, 댄스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030070',
                                                                                text: '연예 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030071',
                                                                                text: '영화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030072',
                                                                                text: '연예 기획사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030073',
                                                                                text: '운세, 사주',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030074',
                                                                                text: '유머, 재미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030075',
                                                                                text: '마술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030076',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030077',
                                                                                text: '연예정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030078',
                                                                                text: '인물, 사람들',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030079',
                                                                                text: '계정 서비스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007a',
                                                                                text: '컴퓨터 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007b',
                                                                                text: '메신저',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007c',
                                                                                text: '바이러스, 백신',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007d',
                                                                                text: '보안, 암호화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007e',
                                                                                text: '블로그',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03007f',
                                                                                text: '소프트 웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030080',
                                                                                text: '이메일',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030081',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030082',
                                                                                text: '검색, 포털',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030083',
                                                                                text: '인터넷',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030084',
                                                                                text: '컴퓨터 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030085',
                                                                                text: '커뮤니티',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030086',
                                                                                text: '컴퓨터',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030087',
                                                                                text: '통신, 네트워크',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030088',
                                                                                text: '파일공유',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c030089',
                                                                                text: '하드웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03008a',
                                                                                text: '웹프락시, 원격접속',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03008b',
                                                                                text: '해킹, 크랙',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c03008c',
                                                                                text: '성인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ca',
                                                                                text: 'user Category 201',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300cb',
                                                                                text: 'user Category 202',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300cc',
                                                                                text: 'user Category 203',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300cd',
                                                                                text: 'user Category 204',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ce',
                                                                                text: 'user Category 205',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300cf',
                                                                                text: 'user Category 206',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d0',
                                                                                text: 'user Category 207',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d1',
                                                                                text: 'user Category 208',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d2',
                                                                                text: 'user Category 209',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d3',
                                                                                text: 'user Category 210',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d4',
                                                                                text: 'user Category 211',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d5',
                                                                                text: 'user Category 212',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d6',
                                                                                text: 'user Category 213',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d7',
                                                                                text: 'user Category 214',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d8',
                                                                                text: 'user Category 215',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300d9',
                                                                                text: 'user Category 216',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300da',
                                                                                text: 'user Category 217',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300db',
                                                                                text: 'user Category 218',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300dc',
                                                                                text: 'user Category 219',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300dd',
                                                                                text: 'user Category 220',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300de',
                                                                                text: 'user Category 221',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300df',
                                                                                text: 'user Category 222',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e0',
                                                                                text: 'user Category 223',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e1',
                                                                                text: 'user Category 224',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e2',
                                                                                text: 'user Category 225',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e3',
                                                                                text: 'user Category 226',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e4',
                                                                                text: 'user Category 227',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e5',
                                                                                text: 'user Category 228',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e6',
                                                                                text: 'user Category 229',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e7',
                                                                                text: 'user Category 230',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e8',
                                                                                text: 'user Category 231',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300e9',
                                                                                text: 'user Category 232',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ea',
                                                                                text: 'user Category 233',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300eb',
                                                                                text: 'user Category 234',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ec',
                                                                                text: 'user Category 235',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ed',
                                                                                text: 'user Category 236',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ee',
                                                                                text: 'user Category 237',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300ef',
                                                                                text: 'user Category 238',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f0',
                                                                                text: 'user Category 239',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f1',
                                                                                text: 'user Category 240',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f2',
                                                                                text: 'user Category 241',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f3',
                                                                                text: 'user Category 242',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f4',
                                                                                text: 'user Category 243',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f5',
                                                                                text: 'user Category 244',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f6',
                                                                                text: 'user Category 245',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f7',
                                                                                text: 'user Category 246',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f8',
                                                                                text: 'user Category 247',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300f9',
                                                                                text: 'user Category 248',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300fa',
                                                                                text: 'user Category 249',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2c0300fb',
                                                                                text: 'user Category 250',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP+ approve',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2d030002',
                                                                                text: '게임',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030003',
                                                                                text: '경제, 경영 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030004',
                                                                                text: '경제 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030005',
                                                                                text: '경제 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030006',
                                                                                text: '경제, 경영학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030007',
                                                                                text: '경제 참고자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030008',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030009',
                                                                                text: '무역',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000a',
                                                                                text: '금리',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000b',
                                                                                text: '대출',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000c',
                                                                                text: '보험',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000d',
                                                                                text: '부동산',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000e',
                                                                                text: '은행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03000f',
                                                                                text: '증권, 주식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030010',
                                                                                text: '세금, 세무',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030011',
                                                                                text: '신용',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030012',
                                                                                text: '채권',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030013',
                                                                                text: '외환, 환율',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030014',
                                                                                text: '경제 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030015',
                                                                                text: '취업, 창업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030016',
                                                                                text: '경제 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030017',
                                                                                text: '교육',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030018',
                                                                                text: '시험, 자격증',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030019',
                                                                                text: '학문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001a',
                                                                                text: '교육시설',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001b',
                                                                                text: '교수, 학습자료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001c',
                                                                                text: '교육기업, 연구소',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001d',
                                                                                text: '교육매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001e',
                                                                                text: '교육정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03001f',
                                                                                text: '학교, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030020',
                                                                                text: '교육협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030021',
                                                                                text: '인테리어 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030022',
                                                                                text: '건강, 의료 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030023',
                                                                                text: '건설, 토목 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030024',
                                                                                text: '쇼핑',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030025',
                                                                                text: '과학 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030026',
                                                                                text: '1차 산업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030027',
                                                                                text: '교육, 학습 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030028',
                                                                                text: '교통, 운송 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030029',
                                                                                text: '일반 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002a',
                                                                                text: '기업사보, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002b',
                                                                                text: '대행서비스 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002c',
                                                                                text: '렌트, 임대기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002d',
                                                                                text: '보안 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002e',
                                                                                text: '브랜드 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03002f',
                                                                                text: '산업용품 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030030',
                                                                                text: '어린이, 유아기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030031',
                                                                                text: '전기, 전자 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030032',
                                                                                text: '컴퓨터 인터넷 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030033',
                                                                                text: '컨설팅 기업',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030034',
                                                                                text: 'TV 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030035',
                                                                                text: '교육, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030036',
                                                                                text: '뉴스속보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030037',
                                                                                text: '데이터 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030038',
                                                                                text: 'DMB',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030039',
                                                                                text: '라디오 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003a',
                                                                                text: '방송, 통신장비',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003b',
                                                                                text: '사설, 칼럼',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003c',
                                                                                text: '신문',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003d',
                                                                                text: '언론인, 방송인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003e',
                                                                                text: '외국미디어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03003f',
                                                                                text: '위성방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030040',
                                                                                text: '인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030041',
                                                                                text: '일기예보, 날씨',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030042',
                                                                                text: '잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030043',
                                                                                text: '저널리즘',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030044',
                                                                                text: '통신사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030045',
                                                                                text: '뉴스 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030046',
                                                                                text: '생활',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030047',
                                                                                text: '건강',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030048',
                                                                                text: '생활정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030049',
                                                                                text: '주거, 환경',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004a',
                                                                                text: '법률, 상식',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004b',
                                                                                text: '생활협동조합',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004c',
                                                                                text: '세대, 사회유형',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004d',
                                                                                text: '요리, 취미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004e',
                                                                                text: '스포츠',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03004f',
                                                                                text: '스포츠 업체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030050',
                                                                                text: '스포츠 동호회, 학원',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030051',
                                                                                text: '스포츠 대회, 경기',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030052',
                                                                                text: '스포츠 시설, 경기장',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030053',
                                                                                text: '스포츠 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030054',
                                                                                text: '스포츠 행사, 이벤트',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030055',
                                                                                text: '스포츠 협회, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030056',
                                                                                text: '건축',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030057',
                                                                                text: '예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030058',
                                                                                text: '문화/예술 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030059',
                                                                                text: '문학, 사학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005a',
                                                                                text: '문화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005b',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005c',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005d',
                                                                                text: '종교 철학',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005e',
                                                                                text: '출판, 도서',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03005f',
                                                                                text: '국제 경제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030060',
                                                                                text: '군대, 국방',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030061',
                                                                                text: '사회,정치/기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030062',
                                                                                text: '노동',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030063',
                                                                                text: '범죄',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030064',
                                                                                text: '법, 법률',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030065',
                                                                                text: '사회, 정치 정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030066',
                                                                                text: '사회/정치 인터넷 방송',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030067',
                                                                                text: '정치',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030068',
                                                                                text: '국가정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030069',
                                                                                text: '여행',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006a',
                                                                                text: '여행 잡지, 웹진',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006b',
                                                                                text: '성인, 음란',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006c',
                                                                                text: '공연예술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006d',
                                                                                text: '엔터테인먼트 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006e',
                                                                                text: '만화, 애니메이션',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03006f',
                                                                                text: '무용, 댄스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030070',
                                                                                text: '연예 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030071',
                                                                                text: '영화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030072',
                                                                                text: '연예 기획사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030073',
                                                                                text: '운세, 사주',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030074',
                                                                                text: '유머, 재미',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030075',
                                                                                text: '마술',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030076',
                                                                                text: '음악',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030077',
                                                                                text: '연예정보',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030078',
                                                                                text: '인물, 사람들',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030079',
                                                                                text: '계정 서비스',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007a',
                                                                                text: '컴퓨터 기관, 단체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007b',
                                                                                text: '메신저',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007c',
                                                                                text: '바이러스, 백신',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007d',
                                                                                text: '보안, 암호화',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007e',
                                                                                text: '블로그',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03007f',
                                                                                text: '소프트 웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030080',
                                                                                text: '이메일',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030081',
                                                                                text: '이벤트, 행사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030082',
                                                                                text: '검색, 포털',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030083',
                                                                                text: '인터넷',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030084',
                                                                                text: '컴퓨터 매체',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030085',
                                                                                text: '커뮤니티',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030086',
                                                                                text: '컴퓨터',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030087',
                                                                                text: '통신, 네트워크',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030088',
                                                                                text: '파일공유',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d030089',
                                                                                text: '하드웨어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03008a',
                                                                                text: '웹프락시, 원격접속',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03008b',
                                                                                text: '해킹, 크랙',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d03008c',
                                                                                text: '성인',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ca',
                                                                                text: 'user Category 201',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300cb',
                                                                                text: 'user Category 202',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300cc',
                                                                                text: 'user Category 203',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300cd',
                                                                                text: 'user Category 204',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ce',
                                                                                text: 'user Category 205',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300cf',
                                                                                text: 'user Category 206',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d0',
                                                                                text: 'user Category 207',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d1',
                                                                                text: 'user Category 208',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d2',
                                                                                text: 'user Category 209',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d3',
                                                                                text: 'user Category 210',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d4',
                                                                                text: 'user Category 211',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d5',
                                                                                text: 'user Category 212',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d6',
                                                                                text: 'user Category 213',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d7',
                                                                                text: 'user Category 214',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d8',
                                                                                text: 'user Category 215',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300d9',
                                                                                text: 'user Category 216',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300da',
                                                                                text: 'user Category 217',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300db',
                                                                                text: 'user Category 218',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300dc',
                                                                                text: 'user Category 219',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300dd',
                                                                                text: 'user Category 220',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300de',
                                                                                text: 'user Category 221',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300df',
                                                                                text: 'user Category 222',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e0',
                                                                                text: 'user Category 223',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e1',
                                                                                text: 'user Category 224',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e2',
                                                                                text: 'user Category 225',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e3',
                                                                                text: 'user Category 226',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e4',
                                                                                text: 'user Category 227',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e5',
                                                                                text: 'user Category 228',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e6',
                                                                                text: 'user Category 229',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e7',
                                                                                text: 'user Category 230',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e8',
                                                                                text: 'user Category 231',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300e9',
                                                                                text: 'user Category 232',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ea',
                                                                                text: 'user Category 233',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300eb',
                                                                                text: 'user Category 234',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ec',
                                                                                text: 'user Category 235',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ed',
                                                                                text: 'user Category 236',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ee',
                                                                                text: 'user Category 237',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300ef',
                                                                                text: 'user Category 238',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f0',
                                                                                text: 'user Category 239',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f1',
                                                                                text: 'user Category 240',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f2',
                                                                                text: 'user Category 241',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f3',
                                                                                text: 'user Category 242',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f4',
                                                                                text: 'user Category 243',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f5',
                                                                                text: 'user Category 244',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f6',
                                                                                text: 'user Category 245',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f7',
                                                                                text: 'user Category 246',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f8',
                                                                                text: 'user Category 247',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300f9',
                                                                                text: 'user Category 248',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300fa',
                                                                                text: 'user Category 249',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2d0300fb',
                                                                                text: 'user Category 250',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'HTTP+ Bypass',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2e030001',
                                                                                text: 'Bypass',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'White/Black List',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x2f030001',
                                                                                text: 'White/Black List Accept',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x2f040002',
                                                                                text: 'White/Black List Drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'VPN',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'SEC',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x30020001',
                                                                                text: 'IPSec Management 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040002',
                                                                                text: 'IPsec Management 오류 (기타 오류)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040003',
                                                                                text: '키 토큰 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30050004',
                                                                                text: '키 토큰 요청 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040005',
                                                                                text: 'ID 요청 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040006',
                                                                                text: 'ID 요청 메시지 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040007',
                                                                                text: 'ID 응답 메시지 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040008',
                                                                                text: 'TED 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040009',
                                                                                text: 'TED 요청 송신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004000a',
                                                                                text: 'TED 요청 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004000b',
                                                                                text: 'TED 응답 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004000c',
                                                                                text: 'IKE 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004000d',
                                                                                text: 'IKE 1단계 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004000e',
                                                                                text: 'IKE 1단계 오류(initator)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3002000f',
                                                                                text: 'IKE 1단계 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040010',
                                                                                text: 'IKE 2단계 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30020011',
                                                                                text: 'IKE 2단계 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040012',
                                                                                text: 'IKE 통지 메시지 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040013',
                                                                                text: 'IKE 통지 메시지 송신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040014',
                                                                                text: 'PIC 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040015',
                                                                                text: 'FSCM 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040016',
                                                                                text: '테이블 관리 오류 (SA,KT …)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040017',
                                                                                text: '마스터키 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040018',
                                                                                text: '센터 응답 없음',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040019',
                                                                                text: '상대 응답 없음',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001a',
                                                                                text: 'IKE 1단계 정책 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001b',
                                                                                text: 'IKE 2단계 정책 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001c',
                                                                                text: '초기화 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001d',
                                                                                text: '메시지 송신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001e',
                                                                                text: '메시지 수신 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x3004001f',
                                                                                text: '키토큰 수신 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30050020',
                                                                                text: '키토큰 수신 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040021',
                                                                                text: '키토큰 송신 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30050022',
                                                                                text: '키토큰 송신 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040023',
                                                                                text: 'xauth client 인증 요청',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040024',
                                                                                text: 'xauth client 인증 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040025',
                                                                                text: 'xauth client 인증 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040026',
                                                                                text: 'xauth client 인증 타임아웃',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040027',
                                                                                text: 'xauth client 주소 할당',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x30040028',
                                                                                text: 'xauth client 주소 해제',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IPSec',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x31020001',
                                                                                text: 'IPSec 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31040002',
                                                                                text: 'IPSec 패킷의 MAC 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31040003',
                                                                                text: 'IPSec 패킷의 일련번호 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31010004',
                                                                                text: 'IPSec 패킷의 암호화 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31040005',
                                                                                text: 'IPSec 패킷의 암호화 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31010006',
                                                                                text: 'IPSec 패킷의 복호화 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31040007',
                                                                                text: 'IPSec 패킷의 복호화 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x31040008',
                                                                                text: 'IPSec 오류 (기타 오류)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'SSL',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: '로컬 사용자 인증 시도',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x40040001',
                                                                                text: '로컬 사용자 인증 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x40030002',
                                                                                text: '로컬 사용자 인증 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x40040003',
                                                                                text: '로컬 사용자 인증 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x40040004',
                                                                                text: '로컬 사용자 중복 로그인에 의한 연결 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '외부 사용자 인증',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x41040001',
                                                                                text: '외부 사용자 인증 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x41030002',
                                                                                text: '외부 사용자 인증 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x41040003',
                                                                                text: '외부 사용자 인증 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x41040004',
                                                                                text: '외부 사용자 중복 로그인에 의한 연결 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: '네트워크',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'FAILOVER Msg',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x50050001',
                                                                                text: '장비상태변화 (Master->Backup)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x50050002',
                                                                                text: '장비상태변화 (Backup->Master)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '라인 로드밸런싱 정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x51050001',
                                                                                text: 'Checker Line up/down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x51060002',
                                                                                text: 'Line manage force down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x51060003',
                                                                                text: 'Line manage force up',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x51060004',
                                                                                text: 'Line manage bandwidth force down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x51060005',
                                                                                text: 'Line manage bandwidth force up',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '라우터 메시지',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x52060001',
                                                                                text: 'Router 장비 업/다운',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '라우터 백업정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x53040001',
                                                                                text: '라우터 서비스 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x53040002',
                                                                                text: '전용선(Serial) UP/Down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x53040003',
                                                                                text: '전용선(VPN) UP/Down',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'RIP 프로토콜 정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x54040001',
                                                                                text: '라우터 RIP 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'OSPF 프로토콜 정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x55040001',
                                                                                text: '라우터 OSPF 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'BGP 프로토콜 정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x56040001',
                                                                                text: '라우터 BGP 오류',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IP Manager',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x57010001',
                                                                                text: 'IPMNG Accept',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x57040002',
                                                                                text: 'IPMNG MAC collision',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x57040003',
                                                                                text: 'IPMNG DROP',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x57030004',
                                                                                text: 'IPMNG ARP Request',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x57030005',
                                                                                text: 'IPMNG DELETE',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x57030006',
                                                                                text: 'IPMNG STATUS CHANGE',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'A-A',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x58030001',
                                                                                text: 'IP checker 의 up/down 여부',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x58030002',
                                                                                text: 'Secondary ip의  install/uninstall',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x58030003',
                                                                                text: 'HA 관련 라인의 up/down 여부',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'L2TP',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x59040001',
                                                                                text: 'L2TP Connect Start',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x59040002',
                                                                                text: 'L2TP Auth Success',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x59040003',
                                                                                text: 'L2TP Auth Fail',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'ALERT',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x5A050001',
                                                                                text: 'SYN_ALERT',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'NATPT',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x5B030001',
                                                                                text: '6to4 assignment',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x5B030002',
                                                                                text: '6to4 release',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x5B030003',
                                                                                text: '4to6 assignment',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x5B030004',
                                                                                text: '4to6 release',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IDS',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x5C040001',
                                                                                text: 'IDS Rcv',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'IPS',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'IPS Info',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x60020001',
                                                                                text: 'IPS Init',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x60040002',
                                                                                text: 'IPS Init Error',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IPS Detect',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x61040001',
                                                                                text: 'IPS Detect',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'IPS Block',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x62040001',
                                                                                text: 'IPS Block Start',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x62040002',
                                                                                text: 'IPS Block Drop',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x62040003',
                                                                                text: 'IPS Block End',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'AV/AS',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'SMTP POP3 AV Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x70030001',
                                                                                text: 'SMTP POP3 AV Filtering 접속 차단 ',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x70030002',
                                                                                text: 'SMTP POP3 AV Filtering 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x70020003',
                                                                                text: 'SMTP POP3 AV Filtering 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'SMTP POP3 AS Filtering',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x71030001',
                                                                                text: 'SMTP POP3 AS Filtering 접속 차단 ',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x71030002',
                                                                                text: 'SMTP POP3 AS Filtering 접속 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x71020003',
                                                                                text: 'SMTP POP3 AS Filtering 정상',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'NAC',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: '사용자 정보',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x80020001',
                                                                                text: '사용자 인증 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x80040002',
                                                                                text: '사용자 인증 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x80040003',
                                                                                text: '취약 알고리즘 통신 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '그룹 정보 검증',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x81020001',
                                                                                text: 'AD/LDAP 그룹 정보 성공',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x81040002',
                                                                                text: 'AD/LDAP 그룹 정보 실패',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: 'Legacy',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x82020001',
                                                                                text: 'Legacy Mac에 등록된 MAC 등록',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '필터링',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x83030001',
                                                                                text: '정책에 있는 사용자의 필터링',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x83030002',
                                                                                text: '정책에 없는 사용자의 필터링',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '스캔',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x84020001',
                                                                                text: 'Scan 시작',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x84020002',
                                                                                text: 'Scan 종료',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'WAF',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'HTTP Protocol 검사',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x90040001',
                                                                                text: '잘못된 HTTP요청',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x90040002',
                                                                                text: 'HTTP version 0.9 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x90040003',
                                                                                text: 'HTTP version 0.9/1.0/1.1외 버전 차단',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '디렉토리 접근 제어',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x91040001',
                                                                                text: '디렉토리 접근 제어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '입력값 검증',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x92040001',
                                                                                text: 'SQL injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040002',
                                                                                text: 'Blind SQL injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040003',
                                                                                text: '크로스사이트 스크립팅 방어 (XSS)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040004',
                                                                                text: 'PHP injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040005',
                                                                                text: 'SSL injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040006',
                                                                                text: 'LDAP injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040007',
                                                                                text: 'Email injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040008',
                                                                                text: 'Session Fixation 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x92040009',
                                                                                text: 'File injection 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9204000a',
                                                                                text: '시스템 명령어 삽입 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9204000b',
                                                                                text: 'HTTP Response Splitting',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '헤더/본문 검사',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x93040001',
                                                                                text: 'Content-length 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040002',
                                                                                text: '헤더 내용 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040003',
                                                                                text: 'URL encoding 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040004',
                                                                                text: 'full-width unicode 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040005',
                                                                                text: 'Invalid character 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040006',
                                                                                text: 'IP주소 접근 제한',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040007',
                                                                                text: '잘못된 URL 요청 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040008',
                                                                                text: 'URL 길이제한 (max:255)',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040009',
                                                                                text: '본문내용 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000a',
                                                                                text: 'POST 요청 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000b',
                                                                                text: '압축된 내용물 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000c',
                                                                                text: '암호화된 내용물 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000d',
                                                                                text: '스캐너 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000e',
                                                                                text: '웹크롤러 탐지',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x9304000f',
                                                                                text: '백도어 접근 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040010',
                                                                                text: 'Cache-Control 공격 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x93040011',
                                                                                text: '인증 우회 공격 방어',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: '서버 정보 유출 검사',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0x94040001',
                                                                                text: 'SQL 에러정보 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x94040002',
                                                                                text: 'IIS 에러정보 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x94040003',
                                                                                text: 'PHP 에러정보 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x94040004',
                                                                                text: 'ASP/JSP source code 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x94040005',
                                                                                text: 'PHP source code 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0x94040006',
                                                                                text: '파일 및 디렉토리 이름 유출 검사',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                text: 'ID+',
                                                                checked: false,
                                                                expanded: false,
                                                                children: [
                                                                    {
                                                                        text: 'User',
                                                                        checked: false,
                                                                        expanded: false,
                                                                        children: [
                                                                            {
                                                                                code: '0xa0030001',
                                                                                text: 'Login Success',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0xa0040002',
                                                                                text: 'Login Fail',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0xa0030003',
                                                                                text: 'Expire',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            },
                                                                            {
                                                                                code: '0xa0040004',
                                                                                text: 'IP Conflict',
                                                                                checked: false,
                                                                                leaf: 'true'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    viewConfig: {
                                                        frame: false
                                                    },
                                                    listeners: {
                                                        checkchange: {
                                                            fn: me.onTreepanelCheckChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'panel',
                                                    border: false,
                                                    height: 255,
                                                    itemId: 'pnl_search_log_detail_option',
                                                    margin: '5 5 5 5',
                                                    collapsed: true,
                                                    collapsible: true,
                                                    title: '상세 검색',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            height: 128,
                                                            itemId: 'gpn_search_log_detail',
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            hideHeaders: true,
                                                            store: 'id_store_log_option',
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 100,
                                                                    dataIndex: 'typename',
                                                                    text: 'Type'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    autoResizeWidth: true,
                                                                    dataIndex: 'value',
                                                                    text: 'Value',
                                                                    flex: 1
                                                                }
                                                            ],
                                                            viewConfig: {
                                                                listeners: {
                                                                    refresh: {
                                                                        fn: me.onViewRefresh,
                                                                        scope: me
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: 0,
                                                            itemId: 'pnl_search_log_detail_combo',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Panel',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    itemId: 'cmb_search_log_detail_type',
                                                                    margin: '0 2.5 0 0',
                                                                    fieldLabel: 'Label',
                                                                    hideLabel: true,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onId_combo_detail_typeAfterRender,
                                                                            scope: me
                                                                        },
                                                                        change: {
                                                                            fn: me.onId_combo_detail_typeChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    disabled: true,
                                                                    itemId: 'cmb_search_log_detail_subtype',
                                                                    margin: '0 0 0 2.5',
                                                                    fieldLabel: 'Label',
                                                                    hideLabel: true,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onId_combo_detail_optionAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                console.log(this);

                                                                var pnl_search_log = Ext.getCmp('pnl_log_view').componentStorage().pnl_search_log;

                                                                var gpn_search_log_detail = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=gpn_search_log_detail]');

                                                                // var store = gpn_search_log_detail.getStore();


                                                                var cmb_search_log_detail_type = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_type]');
                                                                // var cmb_search_log_detail_subtype = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_subtype]');
                                                                // var txf_search_log_detail_value = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=txf_search_log_detail_value]');


                                                                var type = cmb_search_log_detail_type;
                                                                // var value = txf_search_log_detail_value.rawValue;

                                                                if(type.value === 'sip' || type.value === 'dip' || type.value === 'natsip' || type.value === 'natdip')
                                                                {
                                                                    var retValue;

                                                                    retValue = CheckNotNull(value);

                                                                    if(!retValue){
                                                                        return true;
                                                                    }

                                                                    retValue = validIPForm(value, 'v4');

                                                                    if(!retValue){
                                                                        return false;
                                                                    }
                                                                }
                                                                else if(type.value === 'sport' || type.value === 'dport' || type.value === 'natsport'|| type.value === 'natdport')
                                                                {
                                                                    var retValue;

                                                                    retValue = CheckNotNull(value);

                                                                    if(!retValue){
                                                                        return true;
                                                                    }

                                                                    retValue = ValidNum(value);

                                                                    if(!retValue){
                                                                        return false;
                                                                    }
                                                                    else
                                                                    {
                                                                        retValue = LengthCheck(value, 0, 65535);

                                                                        if(!retValue){
                                                                            return false;
                                                                        }
                                                                    }
                                                                }

                                                                return true;
                                                            },
                                                            itemId: 'txf_search_log_detail_value',
                                                            margin: '5 0 0 0',
                                                            width: 250,
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            emptyText: '검색 조건을 입력하세요.'
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            itemId: 'pnl_search_log_detail_button',
                                                            margin: '5 0 0 0',
                                                            header: false,
                                                            title: 'My Panel',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    margins: '',
                                                                    itemId: 'bt_search_log_detail_add',
                                                                    margin: '0 2.5 0 0',
                                                                    width: 100,
                                                                    text: '추가',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick4,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    itemId: 'bt_search_log_detail_del',
                                                                    margin: '0 0 0 2.5',
                                                                    width: 100,
                                                                    text: '삭제',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick5,
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
                                            xtype: 'panel',
                                            border: false,
                                            itemId: 'pnl_search_stat',
                                            overlapHeader: false,
                                            title: '통계',
                                            titleAlign: 'center',
                                            titleCollapse: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            tabConfig: {
                                                xtype: 'tab',
                                                border: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 24,
                                                    itemId: 'bt_search_stat',
                                                    margin: '5 5 0 5',
                                                    width: 70,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_search_statClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_stat_type',
                                                    margin: '6 5 0 5',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            itemId: 'cmb_search_stat_type',
                                                            margin: '10 0 10 0',
                                                            fieldLabel: '통계 종류',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 65,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_stat_typeAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_stat_typeChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            margins: '-5 0 0 0',
                                                            border: false,
                                                            height: 30,
                                                            itemId: 'pnl_search_stat_subtype',
                                                            header: false,
                                                            title: 'My Panel',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    flex: 1,
                                                                    margins: '0 0 10 70',
                                                                    itemId: 'ck_search_stat_type_rtt',
                                                                    fieldLabel: 'Label',
                                                                    hideLabel: true,
                                                                    boxLabel: 'RTT 통계'
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    flex: 1,
                                                                    itemId: 'cmb_search_stat_type_eth',
                                                                    margin: '0 0 10 0',
                                                                    fieldLabel: '',
                                                                    labelAlign: 'right',
                                                                    labelSeparator: ' ',
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    queryMode: 'local',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_search_stat_type_ethAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_stat_time',
                                                    margin: '5 5 0 5',
                                                    title: '날짜/시간',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            height: 24,
                                                            itemId: 'rdg_search_stat_period',
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_stat_period_today',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_stat_period',
                                                                    boxLabel: '오늘',
                                                                    checked: true,
                                                                    inputValue: 'today'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_stat_period_day',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_stat_period',
                                                                    boxLabel: '일별',
                                                                    inputValue: 'day'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_stat_period_week',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_stat_period',
                                                                    boxLabel: '주별',
                                                                    inputValue: 'week'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_stat_period_month',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_stat_period',
                                                                    boxLabel: '월별',
                                                                    inputValue: 'month'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    flex: 1,
                                                                    itemId: 'rd_search_stat_period_user',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_stat_period',
                                                                    boxLabel: '사용자',
                                                                    inputValue: 'user'
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onRdg_search_stat_periodChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_stat_start',
                                                            margin: '5 0 2.5 0',
                                                            width: 200,
                                                            fieldLabel: '시작 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 65,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                render: {
                                                                    fn: me.onId_dt_startRender2,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_stat_end',
                                                            margin: '2.5 0 10 0',
                                                            width: 200,
                                                            fieldLabel: '종료 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 65,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                render: {
                                                                    fn: me.onId_dt_endRender2,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            hidden: true,
                                                            itemId: 'cmb_search_stat_period',
                                                            width: 200,
                                                            fieldLabel: '기간 ',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onId_combo_period_statAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            itemId: 'pnl_search_tracker',
                                            overlapHeader: false,
                                            title: '트래커',
                                            titleAlign: 'center',
                                            titleCollapse: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            tabConfig: {
                                                xtype: 'tab',
                                                border: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 24,
                                                    itemId: 'bt_search_tracker',
                                                    margin: '5 5 0 5',
                                                    width: 70,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_search_trackerClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_tracker_type',
                                                    margin: '6 5 0 5',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            itemId: 'cmb_search_tracker_type',
                                                            margin: '10 0 10 0',
                                                            fieldLabel: '트래커 종류',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_typeAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_tracker_typeChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_tracker_time',
                                                    margin: '5 5 0 5',
                                                    title: '날짜/시간',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            height: 24,
                                                            itemId: 'rdg_search_tracker_period',
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_tracker_period_today',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_tracker_period',
                                                                    boxLabel: '오늘',
                                                                    checked: true,
                                                                    inputValue: 'today'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_tracker_period_day',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_tracker_period',
                                                                    boxLabel: '일별',
                                                                    inputValue: 'day'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_tracker_period_week',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_tracker_period',
                                                                    boxLabel: '주별',
                                                                    inputValue: 'week'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_tracker_period_month',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_tracker_period',
                                                                    boxLabel: '월별',
                                                                    inputValue: 'month'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    flex: 1,
                                                                    itemId: 'rd_search_tracker_period_user',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_tracker_period',
                                                                    boxLabel: '사용자',
                                                                    inputValue: 'user'
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onRdg_search_tracker_periodChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            flex: 0.75,
                                                            itemId: 'dtf_search_tracker_start',
                                                            margin: '5 0 2.5 0',
                                                            width: 200,
                                                            fieldLabel: '시작 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onDtf_search_tracker_startAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            flex: 0.75,
                                                            itemId: 'dtf_search_tracker_end',
                                                            margin: '2.5 0 10 0',
                                                            width: 200,
                                                            fieldLabel: '종료 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onDtf_search_tracker_endAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            hidden: true,
                                                            itemId: 'cmb_search_tracker_period',
                                                            width: 200,
                                                            fieldLabel: '기간 ',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_periodAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    itemId: 'pnl_search_tracker_setting',
                                                    margin: '5 5 0 5',
                                                    title: '설정',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_search_tracker_count',
                                                            fieldLabel: '출력개수',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_countAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_search_tracker_order',
                                                            fieldLabel: '정렬기준',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_orderAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_search_tracker_action',
                                                            fieldLabel: '행위',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_actionAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_search_tracker_opmode',
                                                            fieldLabel: '경계구분',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_opmodeAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            itemId: 'cmb_search_tracker_search',
                                                            fieldLabel: '검색기준',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_searchAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_tracker_searchChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {

                                                                var retValue;

                                                                retValue = CheckNotNull(value);

                                                                if(!retValue){
                                                                    return true;
                                                                }

                                                                retValue = validIPForm(value, 'v4');

                                                                if(!retValue){
                                                                    return false;
                                                                }

                                                                return true;
                                                            },
                                                            flex: 1,
                                                            itemId: 'txf_search_tracker_ip',
                                                            margin: '0 0 10 0',
                                                            fieldLabel: 'IP',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            border: false,
                                                            hidden: true,
                                                            itemId: 'pnl_search_tracker_service',
                                                            margin: '0 0 10 0',
                                                            header: false,
                                                            title: 'My Panel',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    flex: 0.65,
                                                                    itemId: 'cmb_search_tracker_protocol',
                                                                    fieldLabel: '프로토콜',
                                                                    labelAlign: 'right',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 70,
                                                                    editable: false,
                                                                    displayField: 'name',
                                                                    valueField: 'value',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onCmb_search_tracker_protocolAfterRender,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {

                                                                        var retValue;

                                                                        retValue = CheckNotNull(value);

                                                                        if(!retValue){
                                                                            return true;
                                                                        }

                                                                        retValue = ValidNum(value);

                                                                        if(!retValue){
                                                                            return false;
                                                                        }
                                                                        else
                                                                        {
                                                                            retValue = LengthCheck(value, 0, 65535);

                                                                            if(!retValue){
                                                                                return false;
                                                                            }
                                                                        }

                                                                        return true;
                                                                    },
                                                                    flex: 0.35,
                                                                    itemId: 'txf_search_tracker_port',
                                                                    fieldLabel: '포트',
                                                                    labelAlign: 'right',
                                                                    labelSeparator: ' ',
                                                                    labelWidth: 40
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            hidden: true,
                                                            itemId: 'cmb_search_tracker_country',
                                                            margin: '0 0 10 0',
                                                            fieldLabel: '국가코드',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_tracker_countryAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            border: false,
                                            itemId: 'pnl_search_report',
                                            overlapHeader: false,
                                            title: '보고서',
                                            titleAlign: 'center',
                                            titleCollapse: false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            tabConfig: {
                                                xtype: 'tab',
                                                border: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 24,
                                                    itemId: 'bt_search_report',
                                                    margin: '5 5 0 5',
                                                    width: 70,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_search_reportClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_report_type',
                                                    margin: '6 5 0 5',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            itemId: 'cmb_search_report_type',
                                                            margin: '10 0 10 0',
                                                            fieldLabel: ' 종류',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_report_typeAfterRender,
                                                                    scope: me
                                                                },
                                                                change: {
                                                                    fn: me.onCmb_search_report_typeChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    border: true,
                                                    itemId: 'pnl_search_report_time',
                                                    margin: '5 5 0 5',
                                                    title: '날짜/시간',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            height: 24,
                                                            itemId: 'rdg_search_report_period',
                                                            fieldLabel: 'Label',
                                                            hideLabel: true,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_report_period_today',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_report_period',
                                                                    boxLabel: '오늘',
                                                                    checked: true,
                                                                    inputValue: 'today'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_report_period_day',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_report_period',
                                                                    boxLabel: '일별',
                                                                    inputValue: 'day'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_report_period_week',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_report_period',
                                                                    boxLabel: '주별',
                                                                    inputValue: 'week'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_search_report_period_month',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_report_period',
                                                                    boxLabel: '월별',
                                                                    inputValue: 'month'
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    flex: 1,
                                                                    itemId: 'rd_search_report_period_user',
                                                                    padding: '0 5 0 0',
                                                                    name: 'rd_search_report_period',
                                                                    boxLabel: '사용자',
                                                                    inputValue: 'user'
                                                                }
                                                            ],
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onRdg_search_report_periodChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_report_start',
                                                            margin: '5 0 2.5 0',
                                                            width: 200,
                                                            fieldLabel: '시작 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onDtf_search_report_startAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            itemId: 'dtf_search_report_end',
                                                            margin: '2.5 0 10 0',
                                                            width: 200,
                                                            fieldLabel: '종료 시간',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 70,
                                                            submitValue: false,
                                                            format: 'Y-m-d H:i:s',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onDtf_search_report_endAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            hidden: true,
                                                            itemId: 'cmb_search_report_period',
                                                            width: 200,
                                                            fieldLabel: '기간 ',
                                                            labelAlign: 'right',
                                                            labelSeparator: ' ',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            displayField: 'name',
                                                            queryMode: 'local',
                                                            valueField: 'value',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onCmb_search_report_periodAfterRender,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_log_viewAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        Ext.Msg.prompt('그룹 등록', '그룹 이름을 입력하세요 :', function(btn, text){
            if (btn == 'ok'){

                //                         var test = Ext.getStore('id_add_group_store');
                //                         test.getProxy().setExtraParam('group_name', Ext.encode(text));
                //                         test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

                //                         test.load();

                record.set('leaf', false);

                record.appendChild({
                    leaf: true,
                    text: text
                });

                record.expand();
            }
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        Ext.Msg.prompt('그룹 수정', '그룹 이름을 입력하세요 :', function(btn, text){
            if (btn == 'ok'){

                //                     var test = Ext.getStore('id_modify_group_store');
                //                     test.getProxy().setExtraParam('group_name', Ext.encode(text));
                //                     test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

                //                     test.load();

                record.set('text', text);

                //         var store_obj = Ext.getStore('id_jsonp_tree_object');
                //         store_obj.sync();
            }
        }, [], 0, record.data.text);
    },

    onButtonClick3: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        if (record.data.depth > 1)
        {
            Ext.Msg.show({
                title:'그룹 삭제',
                msg: '그룹을 삭제하시겠습니까?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: showResult
            });
        }
        else
        {
            return Ext.Msg.alert('Error','하위 그룹을 선택하세요.');
        }

        function showResult(btn){
            if(btn == 'yes'){

                //                         var test = Ext.getStore('id_delete_group_store');
                //                         test.getProxy().setExtraParam('group_cid', Ext.encode(record.raw.cid));

                //                         test.load();

                record.parentNode.set('leaf', true);
                record.destroy();
            }
        }
    },

    onId_btn_searchButtonClick: function(button, e, eOpts) {

        var win = Ext.create('MyApp.view.SearchXTM');
        win.show();



        // var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        // if(record === undefined)
        //     return Ext.Msg.alert('Error','장비를 선택하세요.');

        // if (record.data.depth >= 1)
        // {
        // //     var store = Ext.data.StoreManager.lookup('id_store_packet');
        // //     store.getProxy().extraParams = {
        // //         'cid': Ext.encode(record.raw.cid),
        // //         'start_dt': 1395759600,
        // //         'end_dt': 1395846000
        // //     };
        // //     Ext.getCmp('id_grid_log').bindStore(store);
        // //     store.load();
        // }
        // else
        // {
        //     return Ext.Msg.alert('Error','하위 그룹을 선택하세요.');
        // }

    },

    onTreepanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        var menu_grid = new Ext.menu.Menu({
            items:
            [
                {
                    text: '그룹 추가',
                    handler: function() {
                        Ext.Msg.prompt('그룹 등록', '그룹 이름을 입력하세요 :', function(btn, text){
                            if (btn == 'ok'){

        //                         var test = Ext.getStore('id_add_group_store');
        //                         test.getProxy().setExtraParam('group_name', Ext.encode(text));
        //                         test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

        //                         test.load();

                                record.set('leaf', false);

                                record.appendChild({
                                    leaf: true,
                                    text: text
                                });

                                record.expand();
                            }
                        });
                    }
                },
                {
                    text: '그룹 수정',
                    handler: function() {
                        Ext.Msg.prompt('그룹 수정', '그룹 이름을 입력하세요 :', function(btn, text){
                        if (btn == 'ok'){

        //                     var test = Ext.getStore('id_modify_group_store');
        //                     test.getProxy().setExtraParam('group_name', Ext.encode(text));
        //                     test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

        //                     test.load();

                            record.set('text', text);

                    //         var store_obj = Ext.getStore('id_jsonp_tree_object');
                    //         store_obj.sync();
                        }
                    }, [], 0, record.data.text);
                    }
                },
                {
                    text: '그룹 삭제',
                    handler: function() {
                        if (record.data.depth > 2)
                        {
                            Ext.Msg.show({
                                 title:'그룹 삭제',
                                 msg: '그룹을 삭제하시겠습니까?',
                                 buttons: Ext.Msg.YESNO,
                                 icon: Ext.Msg.QUESTION,
                                 fn: showResult
                            });
                        }
                        else
                        {
                            return Ext.Msg.alert('Error','하위 그룹을 선택하세요.');
                        }

                        function showResult(btn){
                            if(btn == 'yes'){

        //                         var test = Ext.getStore('id_delete_group_store');
        //                         test.getProxy().setExtraParam('group_cid', Ext.encode(record.raw.cid));

        //                         test.load();

                                record.parentNode.set('leaf', true);
                                record.destroy();
                            }
                        }
                    }
                }
            ]
        });

        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },

    onTreepanelAfterRender: function(component, eOpts) {
        // Ext.data.JsonP.request({

        //     url : 'https://10.31.10.1:45000/api/ftLOG/getUIGroup',
        //     callbackKey  : 'callback',
        //     success  : function(res){

        //         console.log('res -> ', res);

        //     }

        // });

        // console.log('tree -> ', this.componentStorage().logviewerTree);

        Ext.Ajax.request({

            'method' : 'GET',
            'url' : 'api/ftLOG/getUIGroup',
            success : function(res){

                var treeObj = JSON.parse(res.responseText);
                //console.log('afterrender : ', treeObj);
                component.setRootNode(treeObj);
            }
        });
    },

    onId_tree_xtmSelectionChange: function(model, selected, eOpts) {

        // var pnl_search_log = this.componentStorage().pnl_search_log;
        // var dtf_search_log_end = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_end]');

        var trpn_xtm = this.componentStorage().trpn_xtm;
        var gpn_xtm = this.componentStorage().gpn_xtm;


        // var treeview = Ext.getCmp('id_tree_xtm');
        var item = trpn_xtm.getSelectionModel().getSelection()[0].raw;
        var store = Ext.getStore('id_store_log_xtm');

        // console.log(item.cid);

        Ext.Ajax.request(
            {
                url : 'api/ftLOG/getDevices',
                params :
                {
                    group_cid : Ext.encode(item.cid)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    store.loadData(resObj);
                }
            }
        );
    },

    onId_grid_xtmItemDblClick: function(dataview, record, item, index, e, eOpts) {

        var tpn_main = this.componentStorage().tpn_main;
        var pnl_search_log = this.componentStorage().pnl_search_log;

        var cmb_search_log_order = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_order]').getValue();
        var cmb_search_log_count = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_count]').getValue();

        var cmb_search_log_type = pnl_search_log.down('[itemId=pnl_search_log_type]').down('[itemId=cmb_search_log_type]');

        // 장비 선택
        // var record = gpn_xtm.getSelectionModel().getSelection();
        // if(record === undefined)
        //     return Ext.Msg.alert('알림','장비를 선택하세요.');

        console.log(record.raw.name, record.raw['@cid']);

        var date = new Date();
        date = date.setHours(24, 0, 0, 0);

        var start_dt = 0;
        var end_dt = date/1000;


        // _gatecid_or = [];
        //     _gatecid_or_cnt = 0;

        //     // 장비 선택
        //     var gates = gpn_xtm.getSelectionModel().getSelection();

        //     for(var i=0; i<gates.length; i++)
        //     {
        //         _gatecid_or[i] = { gatecid:gates[i].data['@cid'] };
        //         ++_gatecid_or_cnt;
        //     }

        //     if(_gatecid_or_cnt > 0)
        //         optList[optList.length] = { or : _gatecid_or };


        //검색 조건 매개변수
        var _search_params = {};

        _search_params['schema_name'] = Ext.encode(cmb_search_log_type.value);//Ext.encode('FW_V4');

        _search_params['start_ts'] = start_dt;
        _search_params['end_ts'] = end_dt;

        _search_params['orderby'] = cmb_search_log_order;
        _search_params['offset'] = 0;
        _search_params['limit'] = cmb_search_log_count;

        _search_params['criteria'] = Ext.encode({gatecid:record.raw['@cid']});

        // if(optList.length > 0)
        // {
        //     _search_params['criteria'] = Ext.encode({
        //         and : optList
        //         //                 [
        //         //                     {dip:'10.100.0.150'},
        //         //                     {sip:'10.100.3.247'},
        //         //                     { sport : 1000 },
        //         //                     {
        //         //                         or : [
        //         //                             {'level':2}
        //         //                         ]
        //         //                     }
        //         //                 ]
        //     });
        // }

        console.log('_search_params : ', _search_params);
        console.log('criteria : ', _search_params['criteria']);

        // if(cmb_search_log_type.value === 'log')
        // {
            var store = Ext.create('Ext.data.Store', {
                storeId: 'id_store_data' + tpn_main.items.length,
                fields: [
                    {
                        name: 'logid'
                    },
                    {
                        name: 'gatename'
                    },
                    {
                        name: 'cid'
                    },
                    {
                        name: 'timestamp'
                    },
                    {
                        name: 'version'
                    },
                    {
                        name: 'loglevel'
                    },
                    {
                        name: 'direction'
                    },
                    {
                        name: 'rule_num'
                    },
                    {
                        name: 'event'
                    },
                    {
                        name: 'sip'
                    },
                    {
                        name: 'sport'
                    },
                    {
                        name: 'dip'
                    },
                    {
                        name: 'dport'
                    },
                    {
                        name: 'natsip'
                    },
                    {
                        name: 'natsport'
                    },
                    {
                        name: 'natdip'
                    },
                    {
                        name: 'natdport'
                    },
                    {
                        name: 'protocol'
                    },
                    {
                        name: 'pkt_id'
                    },
                    {
                        name: 'iface'
                    },
                    {
                        name: 'inpacket'
                    },
                    {
                        name: 'outpacket'
                    },
                    {
                        name: 'inbytes'
                    },
                    {
                        name: 'outbytes'
                    },
                    {
                        name: 'userid'
                    },
                    {
                        name: 'appid'
                    },
                    {
                        name: 'description'
                    },
                    {
                        name: 'appinfo'
                    }
                ]
            });
            //로그 검색 그리드 템플릿 생성 시작
            var _grid_tpl = SMC_VIEW.make_log_search_grid_tpl(_search_params, store);
            //로그 검색 그리드 템플릿 생성 끝

            var grid = Ext.create(_grid_tpl, {
                id: 'id_grid_data' + tpn_main.items.length,
                scroll : 'both',
                autoScroll : true
                //dockedItems : [_toolbar]
            });

        // }


        if(tpn_main.hidden)
        {
            tpn_main.show();
        }

        tpn_main.add({

            //         dockedItems: [
            //             {
            //                 xtype: 'panel',
            //                 border: false,
            //                 dock: 'top',
            //                 height: 300,
            //                 region: 'center',
            //                 header: false,
            //                 title: 'My Panel',
            //                 layout: 'fit',
            //                 items: [_tab_grid]
            //             }
            //         ],
            title: record.data.name,
            itemid: tpn_main.items.length,
            items: [grid],
            layout: 'fit',
            border: false,
            closable: true,
            listeners: {
                close: function(){

                    if(tpn_main.items.length === 1)
                        tpn_main.hide();
                }
            }

        }).show();

        grid.setLoading(true);

        //시간 포맷 함수
        var microDateTime = function(timestamp){
            var microtime = timestamp.microtime + '';

            while (microtime.length < 6)
                microtime = microtime + '0';

            return Ext.Date.format(new Date(timestamp.datetime*1000), 'Y-m-d H:i:s') + "." + microtime;
        };

        //프로토콜
        var getProtocol = function(protocol){
            var result = "";
            switch (protocol)
            {
                case 0:
                    result = "IP";
                    break;
                case 1:
                    result = "ICMP";
                    break;
                case 2:
                    result = "IGMP";
                    break;
                case 3:
                    result = "GGP";
                    break;
                case 6:
                    result = "TCP";
                    break;
                case 9:
                    result = "IGRP";
                    break;
                case 12:
                    result = "PUP";
                    break;
                case 17:
                    result = "UDP";
                    break;
                case 22:
                    result = "IDP";
                    break;
                case 41:
                    result = "IPv6";
                    break;
                case 46:
                    result = "RSVP";
                    break;
                case 47:
                    result = "GRE";
                    break;
                case 50:
                    result = "ESP";
                    break;
                case 51:
                    result = "AH";
                    break;
                case 58:
                    result = "ICMPv6";
                    break;
                case 88:
                    result = "EIGRP";
                    break;
                case 89:
                    result = "OSPF";
                    break;
                case 103:
                    result = "PIM";
                    break;
                case 124:
                    result = "ISIS";
                    break;
                case 520:
                    result = "RIP";
                    break;
                default:
                    result = protocol.ToString();
                    break;
            }

            return result;
        };
    },

    onTpn_mainClose: function(panel, eOpts) {
        panel.removeAll();
    },

    onBt_search_logClick: function(button, e, eOpts) {

        var gpn_xtm = this.componentStorage().gpn_xtm;
        var tpn_main = this.componentStorage().tpn_main;
        var pnl_search_log = this.componentStorage().pnl_search_log;

        //로그 종류
        var cmb_search_log_type = pnl_search_log.down('[itemId=pnl_search_log_type]').down('[itemId=cmb_search_log_type]');

        // 장비 선택
        var record = gpn_xtm.getSelectionModel().getSelection()[0];

        if(record === undefined)
            return Ext.Msg.alert('알림','장비를 선택하세요.');

        console.log(record.data['@cid'], record.data.name);


        //시간 포맷 함수
        var microDateTime = function(timestamp){
            var microtime = timestamp.microtime + '';

            while (microtime.length < 6)
                microtime = microtime + '0';

            return Ext.Date.format(new Date(timestamp.datetime*1000), 'Y-m-d H:i:s') + "." + microtime;
        };

        //검색조건 만들기 시작

            var cmb_search_log_order = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_order]').getValue();
            var cmb_search_log_count = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_count]').getValue();

            if(cmb_search_log_count === '')
                cmb_search_log_count = 0;

            //시간
            var dtf_search_log_start = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_start]');
            var dtf_search_log_end = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_end]');

            var start_dt = dtf_search_log_start.value.getTime()/1000;
            var end_dt = dtf_search_log_end.value.getTime()/1000;

        //     console.log('start_dt ->', dtf_search_log_start.value);
        //     console.log('end_dt ->', dtf_search_log_end.value);

            //로그레벨
            var pnl_search_log_level = pnl_search_log.down('[itemId=pnl_search_log_level]');

            var log_level_debug = pnl_search_log_level.down('[itemId=ckg_search_log_level]').down('[itemId=ck_search_log_level_debug]').rawValue;
            var log_level_info = pnl_search_log_level.down('[itemId=ckg_search_log_level]').down('[itemId=ck_search_log_level_info]').rawValue;
            var log_level_normal = pnl_search_log_level.down('[itemId=ckg_search_log_level1]').down('[itemId=ck_search_log_level_normal]').rawValue;
            var log_level_warning = pnl_search_log_level.down('[itemId=ckg_search_log_level1]').down('[itemId=ck_search_log_level_warning]').rawValue;
            var log_level_serious = pnl_search_log_level.down('[itemId=ckg_search_log_level2]').down('[itemId=ck_search_log_level_serious]').rawValue;
            var log_level_critical = pnl_search_log_level.down('[itemId=ckg_search_log_level2]').down('[itemId=ck_search_log_level_critical]').rawValue;


            //이벤트
            var trpn_search_log_event = pnl_search_log.down('[itemId=trpn_search_log_event]');

            var log_event_tree = trpn_search_log_event.getRootNode();


            //조건검색 리스트
            var optList = [];


            //장비종류
        //     console.log('record ->',record.data['@cid']);
        //     optList[optList.length] = { or : { gatecid: record.data['@cid'] } };

            _gatecid_or = [];
            _gatecid_or_cnt = 0;

            // 장비 선택
            var gates = gpn_xtm.getSelectionModel().getSelection();

            for(var i=0; i<gates.length; i++)
            {
                _gatecid_or[i] = { gatecid:gates[i].data['@cid'] };
                ++_gatecid_or_cnt;
            }

            if(_gatecid_or_cnt > 0)
                optList[optList.length] = { or : _gatecid_or };

            //로그레벨
            var log_level = [];

            log_level[0] = log_level_debug;
            log_level[1] = log_level_info;
            log_level[2] = log_level_normal;
            log_level[3] = log_level_warning;
            log_level[4] = log_level_serious;
            log_level[5] = log_level_critical;

            _loglevel_or = [];
            _loglevel_or_cnt = 0;

            for(var i=0; i<log_level.length;i++) {

                if (!log_level[i]) continue;

                _loglevel_or[_loglevel_or_cnt] = { loglevel:i+1 };
                ++_loglevel_or_cnt;
            }


            if(_loglevel_or_cnt > 0)
                optList[optList.length] = { or : _loglevel_or };


            //이벤트
            var log_event = [];

            _log_event_or = [];
            _log_event_or_cnt = 0;

            Ext.each(log_event_tree.childNodes, function(childData){

                childData.cascadeBy(function(node) {

                    if(node.data.checked && node.raw.code !== undefined)
                    {
                        _log_event_or[_log_event_or_cnt] = { event: parseInt(node.raw.code,16) };
                        ++_log_event_or_cnt;
                    }
                });

            });

            if(_log_event_or_cnt > 0)
                optList[optList.length] = { or : _log_event_or };

            //상세검색
            var gpn_search_log_detail = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=gpn_search_log_detail]').getStore();

            var items = gpn_search_log_detail.data.items;

            for(var i=0;i<items.length;i++) {

                var opt = {};
                opt[items[i].raw.type] = items[i].raw.value;

                optList[i] = opt;
            }

            //검색 조건 매개변수
            var _search_params = {};

            _search_params['schema_name'] = Ext.encode(cmb_search_log_type.value);//Ext.encode('FW_V4');

            _search_params['start_ts'] = start_dt;
            _search_params['end_ts'] = end_dt;

            _search_params['orderby'] = cmb_search_log_order;
            _search_params['offset'] = 0;
            _search_params['limit'] = cmb_search_log_count;

            if(optList.length > 0)
            {
                _search_params['criteria'] = Ext.encode({
                    and : optList
                    //                 [
                    //                     {dip:'10.100.0.150'},
                    //                     {sip:'10.100.3.247'},
                    //                     { sport : 1000 },
                    //                     {
                    //                         or : [
                    //                             {'level':2}
                    //                         ]
                    //                     }
                    //                 ]
                });
            }

            console.log('_search_params :', _search_params);
            console.log('criteria :', _search_params['criteria']);

        // 검색 조건 만들기 끝


        if(cmb_search_log_type.value === 'FW_V4' || cmb_search_log_type.value === 'FW_V6' ||
          cmb_search_log_type.value === 'NAT_PT' || cmb_search_log_type.value === 'IPS_V4' || cmb_search_log_type.value === 'IPS_V6')
        {
            var store = Ext.create('Ext.data.Store', {
                storeId: 'id_store_data' + tpn_main.items.length,
                fields: [
                    {
                        name: 'logid'
                    },
                    {
                        name: 'gatename'
                    },
                    {
                        name: 'cid'
                    },
                    {
                        name: 'timestamp'
                    },
                    {
                        name: 'version'
                    },
                    {
                        name: 'loglevel'
                    },
                    {
                        name: 'direction'
                    },
                    {
                        name: 'rule_num'
                    },
                    {
                        name: 'event'
                    },
                    {
                        name: 'sip'
                    },
                    {
                        name: 'sport'
                    },
                    {
                        name: 'dip'
                    },
                    {
                        name: 'dport'
                    },
                    {
                        name: 'nat_sip'
                    },
                    {
                        name: 'nat_sport'
                    },
                    {
                        name: 'nat_dip'
                    },
                    {
                        name: 'nat_dport'
                    },
                    {
                        name: 'protocol'
                    },
                    {
                        name: 'pkt_id'
                    },
                    {
                        name: 'iface'
                    },
                    {
                        name: 'inpacket'
                    },
                    {
                        name: 'outpacket'
                    },
                    {
                        name: 'inbytes'
                    },
                    {
                        name: 'outbytes'
                    },
                    {
                        name: 'userid'
                    },
                    {
                        name: 'appid'
                    },
                    {
                        name: 'description'
                    },
                    {
                        name: 'appinfo'
                    }
                ]
            });

            /*
            //로그 검색 그리드 템플릿 생성 시작
            var _grid_tpl = SMC_VIEW.make_log_search_grid_tpl(_search_params, store);
            //로그 검색 그리드 템플릿 생성 끝

            var grid = Ext.create(_grid_tpl, {
                id: 'id_grid_data' + tpn_main.items.length,
                scroll : 'both',
                autoScroll : true
                //dockedItems : [_toolbar]
            });
            */
            SMC_VIEW.make_log_search_grid_tpl(_search_params, function(_itemId, _grid_log){

                console.log(_grid_log);

                tpn_main.add({

                    //         dockedItems: [
                    //             {
                    //                 xtype: 'panel',
                    //                 border: false,
                    //                 dock: 'top',
                    //                 height: 300,
                    //                 region: 'center',
                    //                 header: false,
                    //                 title: 'My Panel',
                    //                 layout: 'fit',
                    //                 items: [_tab_grid]
                    //             }
                    //         ],
                    title: record.data.name,
                    itemid: tpn_main.items.length,
                    items: [_grid_log],
                    layout: 'fit',
                    border: false,
                    closable: true,
                    listeners: {
                        close: function(){

                            if(tpn_main.items.length === 1)
                                tpn_main.hide();
                        }
                    }

                }).show();

            });
        }
        else if(cmb_search_log_type.value === 'NAT_PT')
        {
            var store = Ext.create('Ext.data.Store', {
                storeId: 'id_store_data' + tpn_main.items.length,
                fields: [
                    {
                        name: 'gatename'
                    },
                    {
                        name: 'cid'
                    },
                    {
                        name: 'timestamp'
                    },
                    {
                        name: 'loglevel'
                    },
                    {
                        name: 'sipv4'
                    },
                    {
                        name: 'sipv6'
                    },
                    {
                        name: 'sport'
                    },
                    {
                        name: 'dipv4'
                    },
                    {
                        name: 'dipv6'
                    },
                    {
                        name: 'dport'
                    },
                    {
                        name: 'nat_sipv4'
                    },
                    {
                        name: 'nat_sipv6'
                    },
                    {
                        name: 'nat_sport'
                    },
                    {
                        name: 'nat_dipv4'
                    },
                    {
                        name: 'nat_dipv6'
                    },
                    {
                        name: 'nat_dport'
                    },
                    {
                        name: 'protocol'
                    },
                    {
                        name: 'description'
                    }
                ]
            });


            SMC_VIEW.make_log_search_grid_tpl(_search_params, function(_itemId, _grid_log){

                console.log(_grid_log);

                tpn_main.add({

                    title: record.data.name,
                    itemid: tpn_main.items.length,
                    items: [_grid_log],
                    layout: 'fit',
                    border: false,
                    closable: true,
                    listeners: {
                        close: function(){

                            if(tpn_main.items.length === 1)
                                tpn_main.hide();
                        }
                    }

                }).show();

            });


        //     //nat
        //     var grid = Ext.create('Ext.grid.Panel', {
        //         id: 'id_grid_data' + tpn_main.items.length,
        //         header: false,
        //         title: 'My Grid Panel',
        //         store: 'id_store_status' + tpn_main.items.length,
        //         columnLines: true,
        //         columns: [
        //             {
        //                 xtype: 'gridcolumn',
        //                 width: 170,
        //                 align: 'center',
        //                 dataIndex: 'timestamp',
        //                 text: '생성시간'
        //             },
        // //             {
        // //                 xtype: 'gridcolumn',
        // //                 align: 'right',
        // //                 dataIndex: 'byte64',
        // //                 text: '장비명'
        // //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte128',
        //                 text: '레벨'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte256',
        //                 text: '로그종류'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte512',
        //                 text: '응답정보'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1024',
        //                 text: '출발지주소'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1500',
        //                 text: '출발지주소(V6)'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'total',
        //                 text: '출발지포트'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1024',
        //                 text: '목적지주소'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1500',
        //                 text: '목적지주소(V6)'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'total',
        //                 text: '목적지포트'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1024',
        //                 text: 'NAT출발지주소'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1500',
        //                 text: 'NAT출발지주소(V6)'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'total',
        //                 text: 'NAT출발지포트'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1024',
        //                 text: 'NAT목적지주소'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1500',
        //                 text: 'NAT목적지주소(V6)'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'total',
        //                 text: 'NAT목적지포트'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 align: 'right',
        //                 dataIndex: 'byte1500',
        //                 text: '프로토콜'
        //             },
        //             {
        //                 xtype: 'gridcolumn',
        //                 autoResizeWidth: true,
        //                 flex: 1,
        //                 align: 'left',
        //                 dataIndex: 'description',
        //                 text: '정보'
        //             }
        //         ],
        //         viewConfig: {
        //             listeners: {
        //                 // auto resize column width
        //                 refresh: function(dataView) {
        //                     Ext.each(dataView.panel.columns, function(column) {
        //                         if (column.autoResizeWidth)
        //                             column.autoSize();
        //                     });


        //                 }
        //             }
        //         }
        //     });
        }
            else if(cmb_search_log_type.value === 'IPS_V4' || cmb_search_log_type.value === 'IPS_V6')
            {
                var store = new Ext.data.Store({

                    autoLoad: {
                        start: 0,
                        limit: 100
                    },
                    storeId: 'id_store_packet' + tpn_main.items.length,
                    proxy: {
                        type: 'jsonp',
                        url: 'https://10.31.40.100:35000/api/ftLOG/GetPacketsStatistics',
                        extraParams: {
                            'cid': Ext.encode(record.data['@cid']),
                            'start_dt': start_dt,
                            'end_dt': end_dt
                        }
                    },
                    fields: [
                        {
                            name: 'timestamp'
                        },
                        {
                            name: 'byte64'
                        },
                        {
                            name: 'byte128'
                        },
                        {
                            name: 'byte256'
                        },
                        {
                            name: 'byte512'
                        },
                        {
                            name: 'byte1024'
                        },
                        {
                            name: 'byte1500'
                        },
                        {
                            name: 'total'
                        }
                    ]
                });


                SMC_VIEW.make_log_search_grid_tpl(_search_params, function(_itemId, _grid_log){

                console.log(_grid_log);

                tpn_main.add({

                    title: record.data.name,
                    itemid: tpn_main.items.length,
                    items: [_grid_log],
                    layout: 'fit',
                    border: false,
                    closable: true,
                    listeners: {
                        close: function(){

                            if(tpn_main.items.length === 1)
                                tpn_main.hide();
                        }
                    }

                }).show();

            });


        //         //dpi
        //         var grid = Ext.create('Ext.grid.Panel', {
        //             id: 'id_grid_packet' + tpn_main.items.length,
        //             header: false,
        //             title: 'My Grid Panel',
        //             store: 'id_store_packet' + tpn_main.items.length,
        //             columnLines: true,
        //             columns: [
        //                 {
        //                     xtype: 'gridcolumn',
        //                     width: 170,
        //                     align: 'center',
        //                     dataIndex: 'timestamp',
        //                     text: '생성시간'
        //                 },
        // //                 {
        // //                     xtype: 'gridcolumn',
        // //                     align: 'right',
        // //                     dataIndex: 'gatename',
        // //                     text: '장비명'
        // //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'loglevel',
        //                     text: '레벨'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'direction',
        //                     text: '방향'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'pk',
        //                     text: 'UID'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte256',
        //                     text: '로그종류'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte512',
        //                     text: '응답정보'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1024',
        //                     text: '출발지주소'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'total',
        //                     text: '출발지포트'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1024',
        //                     text: '목적지주소'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'total',
        //                     text: '목적지포트'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1024',
        //                     text: '프로토콜'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1500',
        //                     text: '패킷번호'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'total',
        //                     text: 'IPS번호'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1024',
        //                     text: 'IPS_SID'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1500',
        //                     text: 'IPS_Group_ID'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'total',
        //                     text: '차단방식'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'byte1500',
        //                     text: '차단시간'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '공격시작시간'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '공격종료시간'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '위험도'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '인터페이스'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '감시데이터'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: 'In Packet'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: 'In Bytes'
        //                 },
        //                 {
        //                     xtype: 'gridcolumn',
        //                     autoResizeWidth: true,
        //                     flex: 1,
        //                     align: 'right',
        //                     dataIndex: 'description',
        //                     text: '정보'
        //                 }
        //             ],
        //             viewConfig: {
        //                 listeners: {
        //                     // auto resize column width
        //                     refresh: function(dataView) {
        //                         Ext.each(dataView.panel.columns, function(column) {
        //                             if (column.autoResizeWidth)
        //                                 column.autoSize();
        //                         });


        //                     }
        //                 }
        //             }
        //         });
            }

        if(tpn_main.hidden)
        {
            tpn_main.show();
        }
        /*
        tpn_main.add({

            //         dockedItems: [
            //             {
            //                 xtype: 'panel',
            //                 border: false,
            //                 dock: 'top',
            //                 height: 300,
            //                 region: 'center',
            //                 header: false,
            //                 title: 'My Panel',
            //                 layout: 'fit',
            //                 items: [_tab_grid]
            //             }
            //         ],
            title: record.data.name,
            itemid: tpn_main.items.length,
            items: [grid],
            layout: 'fit',
            border: false,
            closable: true,
            listeners: {
                close: function(){

                    if(tpn_main.items.length === 1)
                        tpn_main.hide();
                }
            }

        }).show();
        */
    },

    onId_combo_log_orderAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":-1, "name":"내림차순"},
                {"value":1, "name":"오름차순"}
            ]
        });

        component.bindStore(store);
        component.setValue(-1);
    },

    onId_combo_log_countAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":20, "name":"20"},
                {"value":30, "name":"30"},
                {"value":50, "name":"50"},
                {"value":100, "name":"100"},
                {"value":"user", "name":"사용자"}

        //         {"value":100, "name":"100"},
        //         {"value":200, "name":"200"},
        //         {"value":500, "name":"500"},
        //         {"value":1000, "name":"1000"},
        //         {"value":5000, "name":"5000"}
            ]
        });

        component.bindStore(store);
        component.setValue(30);
    },

    onCmb_search_log_countChange: function(field, newValue, oldValue, eOpts) {

        if(newValue === 'user')
        {
            field.setRawValue('');
            field.setEditable(true);
            field.focus();
        }
        else
        {
            field.setEditable(false);
        }
    },

    onId_combo_log_typeAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"FW_V4", "name":"방화벽 로그"},
                {"value":"FW_V6", "name":"방화벽 로그 (IPv6)"},
                {"value":"NAT_PT", "name":"NAT-PT 로그"},
                {"value":"IPS_V4", "name":"DPI 로그"},
                {"value":"IPS_V6", "name":"DPI 로그 (IPv6)"}
            ]
        });

        component.bindStore(store);
        component.setValue('FW_V4');
    },

    onCmb_search_log_typeChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        // 상세 조건 타입
        var pnl_search_log_detail_combo = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]');

        var cmb_search_log_detail_type = pnl_search_log_detail_combo.down('[itemId=cmb_search_log_detail_type]');

        var store_fw = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"natsip", "name":"NAT출발지주소"},
        //         {"value":"natsport", "name":"NAT출발지포트"},
                {"value":"natdip", "name":"NAT목적지주소"}
        //         {"value":"natdport", "name":"NAT목적지포트"},
        //         {"value":"protocol", "name":"프로토콜"},
        //         {"value":"uid", "name":"UID"},
        //         {"value":"userid", "name":"USER ID"},
        //         {"value":"appid", "name":"APP ID"},
        //         {"value":"description", "name":"정보"}
            ]
        });

        var store_nat = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"natsip", "name":"NAT출발지주소"},
        //         {"value":"natsport", "name":"NAT출발지포트"},
                {"value":"natdip", "name":"NAT목적지주소"}
        //         {"value":"natdport", "name":"NAT목적지포트"},
        //         {"value":"protocol", "name":"프로토콜"},
        //         {"value":"description", "name":"정보"}
            ]
        });

        var store_dpi = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"}
        //         {"value":"protocol", "name":"프로토콜"},
        //         {"value":"priority", "name":"위험도"},
        //         {"value":"patterngroup", "name":"패턴그룹"},
        //         {"value":"dpigroup", "name":"DPI그룹"},
        //         {"value":"fsid", "name":"FSID"},
        //         {"value":"description", "name":"정보"}
            ]
        });


        if(newValue === 'NAT_PT')
        {
            cmb_search_log_detail_type.bindStore(store_nat);
            cmb_search_log_detail_type.setValue("sip");
        }
        else if(newValue === 'IPS_V4' || newValue === 'IPS_V6')
        {
            cmb_search_log_detail_type.bindStore(store_dpi);
            cmb_search_log_detail_type.setValue("sip");
        }
        else //fw
        {
            cmb_search_log_detail_type.bindStore(store_fw);
            cmb_search_log_detail_type.setValue("sip");
        }
    },

    onRadiogroupChange: function(field, newValue, oldValue, eOpts) {
        // console.log(newValue.rb_log);

        var component = Ext.getCmp('id_combo_detail_type');

        var fw = Ext.getCmp('id_rb_fw_log').rawValue;
        var nat = Ext.getCmp('id_rb_nat_log').rawValue;
        var dpi = Ext.getCmp('id_rb_dpi_log').rawValue;

        var store_fw = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"natsip", "name":"NAT출발지주소"},
                {"value":"natsport", "name":"NAT출발지포트"},
                {"value":"natdip", "name":"NAT목적지주소"},
                {"value":"natdport", "name":"NAT목적지포트"},
                {"value":"protocol", "name":"프로토콜"},
                {"value":"uid", "name":"UID"},
                {"value":"userid", "name":"USER ID"},
                {"value":"appid", "name":"APP ID"},
                {"value":"description", "name":"정보"}
            ]
        });

        var store_nat = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"natsip", "name":"NAT출발지주소"},
                {"value":"natsport", "name":"NAT출발지포트"},
                {"value":"natdip", "name":"NAT목적지주소"},
                {"value":"natdport", "name":"NAT목적지포트"},
                {"value":"protocol", "name":"프로토콜"},
                 {"value":"description", "name":"정보"}
            ]
        });

        var store_dpi = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"protocol", "name":"프로토콜"},
                {"value":"priority", "name":"위험도"},
                {"value":"patterngroup", "name":"패턴그룹"},
                {"value":"dpigroup", "name":"DPI그룹"},
                {"value":"fsid", "name":"FSID"},
                {"value":"description", "name":"정보"}
            ]
        });


        if(nat)
        {
            component.bindStore(store_nat);
            component.setValue("sip");
        }
        else if(dpi)
        {
            component.bindStore(store_dpi);
            component.setValue("sip");
        }
        else
        {
            component.bindStore(store_fw);
            component.setValue("sip");
        }
    },

    onRdg_search_log_periodChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        var dtf_search_log_start = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_start]');
        var dtf_search_log_end = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_end]');

        console.log('newValue ->', newValue.rd_search_log_period);

        if(newValue.rd_search_log_period === 'today')
        {

            dtf_search_log_start.setEditable(false);
            dtf_search_log_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_end.setValue(today);

        }
        else if(newValue.rd_search_log_period === 'day')
        {

            dtf_search_log_start.setEditable(false);
            dtf_search_log_end.setEditable(false);

            //시작 시간
            var date = new Date(dtf_search_log_start.value.getTime());
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_end.setValue(today);

        }
        else if(newValue.rd_search_log_period === 'week')
        {

            dtf_search_log_start.setEditable(false);
            dtf_search_log_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setDate(date.getDate() - 6);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_end.setValue(today);

        }
        else if(newValue.rd_search_log_period === 'month')
        {

            dtf_search_log_start.setEditable(false);
            dtf_search_log_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_log_end.setValue(today);

        }
        else if(newValue.rd_search_log_period === 'user')
        {
            dtf_search_log_start.setEditable(true);
            dtf_search_log_end.setEditable(true);
        }


        // var today = new Date();
        // var date = new Date();

        // date = date.setHours(0, 0, 0, 0);
        // var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // // console.log(dtf_search_log_start);

        // component.setValue(today);



        // var today = new Date();
        // var date = new Date();

        // date.setDate(date.getDate() + 1);
        // date = date.setHours(0, 0, 0, 0);

        // var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // // console.log(dtf_search_log_end);

        // component.setValue(today);
    },

    onId_dt_startRender12: function(component, eOpts) {

        // var pnl_search_log = this.componentStorage().pnl_search_log;
        // var dtf_search_log_start = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_start]');

        var date = new Date();

        date = date.setHours(0, 0, 0, 0);
        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // console.log(dtf_search_log_start);

        component.setValue(today);

    },

    onId_dt_endRender12: function(component, eOpts) {

        // var pnl_search_log = this.componentStorage().pnl_search_log;
        // var dtf_search_log_end = pnl_search_log.down('[itemId=pnl_search_log_time]').down('[itemId=dtf_search_log_end]');

        var date = new Date();

        date.setDate(date.getDate() + 1);
        date = date.setHours(0, 0, 0, 0);

        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // console.log(dtf_search_log_end);

        component.setValue(today);
    },

    onTreepanelCheckChange: function(node, checked, eOpts) {

        node.cascadeBy(function(n) {
            n.set('checked', checked);
        });



        // if (node.get('leaf'))
        // {
        //     node = node.parentNode;
        //     var siblingStateEqual = true;
        //     node.cascadeBy(function (n)
        //                    {
        //                        if (n != node) {
        //                            if (n.get('checked') != checked) {
        //                                siblingStateEqual = false;
        //                            }
        //                        }

        //                    });

        //     if (siblingStateEqual == checked)
        //     {
        //         node.set('checked', checked);
        //     }

        // }
        // else
        // {
        //     node.cascadeBy(function (n) { n.set('checked', checked); });
        // }
    },

    onViewRefresh: function(dataview, eOpts) {
        Ext.each(dataView.panel.columns, function(column) {
            if (column.autoResizeWidth)
                column.autoSize();
        });
    },

    onId_combo_detail_typeAfterRender: function(component, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        //로그 종류
        var cmb_search_log_type = pnl_search_log.down('[itemId=pnl_search_log_type]').down('[itemId=cmb_search_log_type]');

        var store_fw = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sip", "name":"출발지주소"},
                {"value":"sport", "name":"출발지포트"},
                {"value":"dip", "name":"목적지주소"},
                {"value":"dport", "name":"목적지포트"},
                {"value":"natsip", "name":"NAT출발지주소"},
        //         {"value":"natsport", "name":"NAT출발지포트"},
                {"value":"natdip", "name":"NAT목적지주소"}
        //         {"value":"natdport", "name":"NAT목적지포트"},
        //         {"value":"protocol", "name":"프로토콜"},
        //         {"value":"uid", "name":"UID"},
        //         {"value":"userid", "name":"USER ID"},
        //         {"value":"appid", "name":"APP ID"},
        //         {"value":"description", "name":"정보"}
            ]
        });


        component.bindStore(store_fw);
        component.setValue("sip");

    },

    onId_combo_detail_typeChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        var gpn_search_log_detail = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=gpn_search_log_detail]');

        var cmb_search_log_detail_type = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_type]');
        var cmb_search_log_detail_subtype = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_subtype]');
        var txf_search_log_detail_value = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=txf_search_log_detail_value]');

        var component = cmb_search_log_detail_subtype;

        if(newValue === 'protocol')
        {
            var store = Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data : [
                    {"value":0, "name":"IP"},
                    {"value":1, "name":"ICMP"},
                    {"value":2, "name":"IGMP"},
                    {"value":94, "name":"IPIP"},
                    {"value":6, "name":"TCP"},
                    {"value":17, "name":"UDP"},
                    {"value":41, "name":"IPV6"},
                    {"value":50, "name":"ESP"},
                    {"value":51, "name":"AH"},
                    {"value":58, "name":"ICMPV6"}
                ]
            });

            component.bindStore(store);
            component.setValue('선택하세요.');
            component.setDisabled(false);

            txf_search_log_detail_value.setValue('');
            txf_search_log_detail_value.setDisabled(true);
        }
        else
        {
            component.setValue('');
            component.getStore().removeAll();
            component.setDisabled(true);

            txf_search_log_detail_value.setValue('');
            txf_search_log_detail_value.setDisabled(false);
        }
    },

    onId_combo_detail_optionAfterRender: function(component, eOpts) {

    },

    onButtonClick4: function(button, e, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        var gpn_search_log_detail = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=gpn_search_log_detail]');

        var store = gpn_search_log_detail.getStore();

        // var type = Ext.getCmp('id_combo_detail_type').rawValue;
        // var option = Ext.getCmp('id_text_detail_option').rawValue;
        // var suboption = Ext.getCmp('id_combo_detail_option').rawValue;

        var cmb_search_log_detail_type = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_type]');
        var cmb_search_log_detail_subtype = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=pnl_search_log_detail_combo]').down('[itemId=cmb_search_log_detail_subtype]');
        var txf_search_log_detail_value = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=txf_search_log_detail_value]');

        console.log("dd",txf_search_log_detail_value.validator);

        var type = cmb_search_log_detail_type;
        var value = txf_search_log_detail_value.rawValue;

        if(type.value === 'protocol')
            value = cmb_search_log_detail_subtype.rawValue;

        // console.log(type.rawValue);
        // console.log(subtype);
        // console.log(value);

        // console.log(store.data.items.length);
        // console.log(store.data.items);

        if(type ==='프로토콜' && subtype === '선택하세요.')
            return Ext.Msg.alert('Error','프로토콜을 선택하세요.');

        var items = store.data.items;

        var isData = false;
        for(var i =0;i<items.length;i++) {

            if(items[i].data.type === type.value && items[i].data.value === value)
                isData = true;
        }

        if(isData)
            return Ext.Msg.alert('Error','이미 추가된 옵션입니다.');
        else
            store.add({'type':type.value, 'typename':type.rawValue, 'value':value});
    },

    onButtonClick5: function(button, e, eOpts) {
        var pnl_search_log = this.componentStorage().pnl_search_log;

        var gpn_search_log_detail = pnl_search_log.down('[itemId=pnl_search_log_detail_option]').down('[itemId=gpn_search_log_detail]');

        var store = gpn_search_log_detail.getStore();

        var selection = gpn_search_log_detail.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            store.remove(selection);
        }
    },

    onBt_search_statClick: function(button, e, eOpts) {
        // console.log('button obj ->', this.componentStorage().logiptype.getValue().id_rb_log);
        // console.log('button obj ->', Ext.getCmp('pnl_log_view').componentStorage().logiptype.getValue().id_rb_log);

        var gpn_xtm = this.componentStorage().gpn_xtm;
        var tpn_main = this.componentStorage().tpn_main;
        var pnl_search_stat = this.componentStorage().pnl_search_stat;

        // var cmb_search_log_order = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_order]');
        // var cmb_search_log_count = pnl_search_log.down('[itemId=pnl_search_log_option]').down('[itemId=cmb_search_log_count]');

        // var rdg_search_stat_type = pnl_search_stat.down('[itemId=tb_search_stat_type]').down('[itemId=rdg_search_stat_type]').getValue().stat_type;

        var cmb_search_stat_type = pnl_search_stat.down('[itemId=pnl_search_stat_type]').down('[itemId=cmb_search_stat_type]');
        var cmb_search_stat_type_eth = pnl_search_stat.down('[itemId=pnl_search_stat_type]').down('[itemId=cmb_search_stat_type_eth]');

        var dtf_search_stat_start = pnl_search_stat.down('[itemId=pnl_search_stat_time]').down('[itemId=dtf_search_stat_start]');
        var dtf_search_stat_end = pnl_search_stat.down('[itemId=pnl_search_stat_time]').down('[itemId=dtf_search_stat_end]');


        var cmb_search_stat_period = pnl_search_stat.down('[itemId=pnl_search_stat_time]').down('[itemId=cmb_search_stat_period]');

        //time
        var start_dt = dtf_search_stat_start.value.getTime()/1000;
        var end_dt = dtf_search_stat_end.value.getTime()/1000;

        // 장비 선택
        var record = gpn_xtm.getSelectionModel().getSelection()[0];

        // 장비 선택
        var gates = gpn_xtm.getSelectionModel().getSelection();

        // 장비 리스트
        var gate_list = [];

        for(var i=0; i<gates.length; i++)
            gate_list[i] = gates[i];

        // console.log(gate_list);

        if(record === undefined)
            return Ext.Msg.alert('알림','장비를 선택하세요.');

        console.log(record.data['@cid'], record.data.name);

        // var iface = Ext.getCmp('id_rb_iface').rawValue;
        // var status = Ext.getCmp('id_rb_status').rawValue;
        // var packet = Ext.getCmp('id_rb_packet').rawValue;

        // var period = Ext.getCmp('id_combo_period_stat');

        // console.log('start_dt : ', start_dt);
        // console.log('__end_dt : ', end_dt);

        // if (record.data.depth >= 1)
        // {
            var itemsPerPage = 10;

            var fileSize = function(size) {

                            if (size < 1024) { //pow(2,10)
                                return Ext.util.Format.number(size, '0,000.00') + " bytes";
                            } else if (size < 1048576) { //pow(2,20)
                                return Ext.util.Format.number(Math.round(((size*100) / 1024))/100, '0,000.00') + " KB";
                            } else if (size < 1073741824) { //pow(2,30)
                                return Ext.util.Format.number(Math.round(((size*100) / 1048576))/100, '0,000.00') + " MB";
                            } else if (size < 1099511627776) { //pow(2,40)
                                return Ext.util.Format.number(Math.round(((size*100) / 1073741824))/100, '0,000.00') + " GB";
                            } else if (size < 1125899906842624) { //pow(2,50)
                                return Ext.util.Format.number(Math.round(((size*100) / 1099511627776))/100, '0,000.00') + " TB";
                            } else { //pow(2,60)
                                return Ext.util.Format.number(Math.round(((size*100) / 1125899906842624))/100, '0,000.00') + " PB";
                            }


                        };

            if(cmb_search_stat_type.value === "iface")
            {
                var store = new Ext.data.Store({

                    autoLoad: true,
        //             groupField: ['hour'],
                    storeId: 'id_store_data_' + tpn_main.items.length,
                    proxy: {
                        type: 'jsonp',
        //                 url: 'https:10.31.40.100:35000/api/ftLOG/GetDataStatistics',
                        extraParams: {
                            'cid': Ext.encode(record.data['@cid']),
                            'start_dt': start_dt,
                            'end_dt': end_dt,
                            'eth': Ext.encode(cmb_search_stat_type_eth.value),
                            'rtt': false
                        }
                    },
                    fields: [
                        {
                            name: 'hour'
                        },
                        {
                            name: 'timestamp'
                        },
                        {
                            name: 'eth'
                        },
                        {
                            name: 'inpacket'
                        },
                        {
                            name: 'outpacket'
                        },
                        {
                            name: 'inbyte'
                        },
                        {
                            name: 'outbyte'
                        },
                        {
                            name: 'dropbyte'
                        }
                    ]
                });

                if(cmb_search_stat_period.value === '10')
                    store.proxy.url = 'api/ftLOG/GetDataStatistics_10';
                else
                    store.proxy.url = 'api/ftLOG/GetDataStatistics';

                //iface
                var grid = Ext.create('Ext.grid.Panel', {
                    id: 'id_grid_data' + tpn_main.items.length,
                    header: false,
                    title: 'My Grid Panel',
        //             features: [{
        //                 ftype:'grouping',
        //                 startCollapsed: true
        //             }],
                    store: 'id_store_data_' + tpn_main.items.length,
                    columnLines: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 170,
                            align: 'center',
                            dataIndex: 'timestamp',
                            text: 'TIME'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 70,
                            align: 'center',
                            dataIndex: 'eth',
                            text: 'eth'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            align: 'right',
                            dataIndex: 'inpacket',
                            renderer: fileSize,
                            text: 'RX Packet'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            align: 'right',
                            dataIndex: 'outpacket',
                            renderer: fileSize,
                            text: 'TX Packet'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            align: 'right',
                            dataIndex: 'inbyte',
                            renderer: fileSize,
                            text: 'RX Byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            align: 'right',
                            dataIndex: 'outbyte',
                            renderer: fileSize,
                            text: 'TX Byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            align: 'right',
                            dataIndex: 'dropbyte',
                            renderer: fileSize,
                            text: 'Drop Byte'
                        }
                    ]
        //             dockedItems: [
        //                 {
        //                     xtype: 'pagingtoolbar',
        //                     dock: 'bottom',
        //                     width: 360,
        //                     displayInfo: true
        //                 }
        //             ],
        //             plugins: [{
        //                 ptype: 'rowexpander',
        //                 rowBodyTpl: []

        //             }]
                });

                //iface
                var chart = Ext.create('Ext.chart.Chart', {
                    height: 300,
                    animate: true,
                    store: 'id_store_data_' + tpn_main.items.length,
                    shadow: true,
                    theme: 'Category1',
                    legend: {
                        position: 'right'
                    },
                    axes: [
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['timestamp'],
                            title: 'timestamp',
                            label: {
                                rotate: {
                                    degrees: 350
                                }
                            }
                        },
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['inbyte'],
                            label: {
                                renderer: fileSize
                            },
                            title: 'RX Byte',
                            grid: true,
                            minimum: 0
                        },
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['outbyte'],
                            label: {
                                renderer: fileSize
                            },
                            title: 'TX Byte',
                            grid: true,
                            minimum: 0
                        }
                    ],
                    series: [{
                        type: 'column',
                        axis: 'left',
                        hightlight: true,
                        tips: {
                            trakMouse: true,
                            width: 300,
                            height: 28,
                            renderer: function (storeItem, item) {
                                this.setTitle(storeItem.get('timestamp') + ' RX: ' + fileSize(storeItem.get('inbyte')) + ', TX: ' + fileSize(storeItem.get('outbyte')));
                            }
                        },
                        xField: 'timestamp',
                        yField: ['inbyte', 'outbyte'],
                        showInLegend: true
                    }]
                });

            }
            else if(cmb_search_stat_type.value === "status")
            {
                var store = new Ext.data.Store({

                    autoLoad: true,
        //             groupField: ['hour'],
                    storeId: 'id_store_status_' + tpn_main.items.length,
                    proxy: {
                        type: 'jsonp',
        //                 url: 'https:10.31.40.100:35000/api/ftLOG/GetStatusStatistics',
                        extraParams: {
                            'cid': Ext.encode(record.data['@cid']),
                            'start_dt': start_dt,
                            'end_dt': end_dt
                        }
                    },
                    fields: [
                        {
                            name: 'hour'
                        },
                        {
                            name: 'timestamp'
                        },
                        {
                            name: 'cpu'
                        },
                        {
                            name: 'memory'
                        },
                        {
                            name: 'session'
                        },
                        {
                            name: 'hdd'
                        }
                    ]
                });

                if(cmb_search_stat_period.value === '10')
                    store.proxy.url = 'api/ftLOG/GetStatusStatistics_10';
                else
                    store.proxy.url = 'api/ftLOG/GetStatusStatistics';

                //status
                var grid = Ext.create('Ext.grid.Panel', {
                    id: 'id_grid_data' + tpn_main.items.length,
                    header: false,
                    title: 'My Grid Panel',
        //             features: [{
        //                 ftype:'grouping',
        //                 startCollapsed: true
        //             }],
                    store: 'id_store_status_' + tpn_main.items.length,
                    columnLines: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 170,
                            align: 'center',
                            dataIndex: 'timestamp',
                            text: 'TIME'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0 %'),
                            dataIndex: 'cpu',
                            text: 'CPU'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0 %'),
                            dataIndex: 'memory',
                            text: 'MEMORY'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0 Count'),
                            dataIndex: 'session',
                            text: 'SESSION'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0 %'),
                            dataIndex: 'hdd',
                            text: 'HDD'
                        }

                    ]
                });

                //status
                var chart = Ext.create('Ext.chart.Chart', {
                    height: 300,
                    animate: true,
                    store: 'id_store_status_' + tpn_main.items.length,
                    shadow: true,
                    theme: 'Category1',
                    legend: {
                        position: 'right'
                    },
                    axes: [
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['timestamp'],
                            title: 'timestamp',
                            label: {
                                rotate: {
                                    degrees: 350
                                }
                            }
                        },
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['cpu'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0%')
                            },
                            title: 'cpu',
                            grid: true,
                            minimum: 0
                        },
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['memory'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0%')
                            },
                            title: 'memory',
                            grid: true,
                            minimum: 0
                        }
                    ],
                    series: [
                        {
                            type: 'column',
                            axis: 'left',
                            hightlight: true,
                            tips: {
                                trakMouse: true,
                                width: 140,
                                height: 28,
                                renderer: function (storeItem, item) {
                                    this.setTitle(storeItem.get('timestamp') + ' : ' + storeItem.get('cpu'));
                                }
                            },
                            xField: 'timestamp',
                            yField: ['cpu', 'memory'],
                            showInLegend: true
                        }
                    ],
                    listeners: {

                    }
                });

            }
            else if(cmb_search_stat_type.value === "packet")
            {
                var store = new Ext.data.Store({

                    autoLoad: true,
        //             groupField: ['hour'],
        //             groupers: ["hour", "timestamp"],
                    storeId: 'id_store_packet_' + tpn_main.items.length,
                    proxy: {
                        type: 'jsonp',
        //                 url: 'api/ftLOG/GetPacketsStatistics',
                        extraParams: {
                            'cid': Ext.encode(record.data['@cid']),
                            'start_dt': start_dt,
                            'end_dt': end_dt
                        }
                    },
                    fields: [
                        {
                            name: 'hour'
                        },
                        {
                            name: 'timestamp'
                        },
                        {
                            name: 'byte64'
                        },
                        {
                            name: 'byte128'
                        },
                        {
                            name: 'byte256'
                        },
                        {
                            name: 'byte512'
                        },
                        {
                            name: 'byte1024'
                        },
                        {
                            name: 'byte1500'
                        },
                        {
                            name: 'total'
                        }
                    ]
                });

                if(cmb_search_stat_period.value === '10')
                    store.proxy.url = 'api/ftLOG/GetPacketsStatistics_10';
                else
                    store.proxy.url = 'api/ftLOG/GetPacketsStatistics';

                //packet
                var grid = Ext.create('Ext.grid.Panel', {
                    id: 'id_grid_packet' + tpn_main.items.length,
                    header: false,
                    title: 'My Grid Panel',
        //             features: [{
        //                 ftype:'grouping',
        //                 startCollapsed: true,
        //                 groupHeaderTpl: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{[values.rows[0].data.hour]}'
        // //                 '{[values.rows[0].data.hour]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte64]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte128]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte256]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte512]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte1024]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.byte1500]} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',
        // //                 '{[values.rows[0].data.total]}'
        //             }],
                    store: 'id_store_packet_' + tpn_main.items.length,
                    columnLines: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 170,
                            align: 'center',
                            dataIndex: 'timestamp',
                            text: 'TIME'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte64',
                            text: '64 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte128',
                            text: '128 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte256',
                            text: '256 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte512',
                            text: '512 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte1024',
                            text: '1024 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'byte1500',
                            text: '1500 byte'
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'right',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            dataIndex: 'total',
                            text: 'TOTAL'
                        }
                    ]

                });

                //packet
                var chart = Ext.create('Ext.chart.Chart', {
                    height: 300,
                    animate: true,
                    store: 'id_store_packet_' + tpn_main.items.length,
                    shadow: true,
                    theme: 'Category1',
                    legend: {
                        position: 'right'
                    },
                    axes: [
                        {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['timestamp'],
                            grid: true,
                            title: 'timestamp',
                            label: {

                            }
                        },
                        {
                            type: 'Numeric',
                            position: 'left',
                            fields: ['byte64','byte128','byte256','byte512','byte1024','byte1500'],
                            label: {
                                renderer: Ext.util.Format.numberRenderer('0,0')
                            },
                            title: 'Packet',
                            grid: true,
                            minimum: 0
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            xField: 'timestamp',
                            yField: 'byte64',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'timestamp',
                            yField: 'byte128',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'timestamp',
                            yField: 'byte256',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'timestamp',
                            yField: 'byte512',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'timestamp',
                            yField: 'byte1024',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        },
                        {
                            type: 'line',
                            highlight: {
                                size: 7,
                                radius: 7
                            },
                            axis: 'left',
                            smooth: true,
                            xField: 'timestamp',
                            yField: 'byte1500',
                            markerConfig: {
                                type: 'circle',
                                size: 4,
                                radius: 4,
                                'stroke-width': 0
                            }
                        }
                    ]
                });

            }


            if(tpn_main.hidden)
            {
                tpn_main.show();
            }

            //console.log(store.data.length);

            tpn_main.add({

                dockedItems: [
        //             {
        //                 xtype: 'toolbar',
        //                 border: false,
        //                 dock: 'top',
        //                 layout: {
        //                     type: 'hbox',
        //                     pack: 'end'
        //                 },
        //                 items: [
        //                     {
        //                         xtype: 'button',
        //                         width: 100,
        //                         text: 'Save Chart',
        //                         listeners: {
        //                             click: function(){
        //                                 Ext.MessageBox.confirm('다드운로드', '차트를 이미지로 저장하시겠습니까?', function(choice){
        //                                     if(choice == 'yes'){
        //                                         chart.save({
        //                                             type: 'image/png'
        //                                         });
        //                                     }
        //                                 });
        //                             }
        //                         }
        //                     },
        //                     {
        //                         xtype: 'button',
        //                         width: 100,
        //                         text: 'Save Grid',
        //                         listeners: {
        //                             click: function(){
        //                                 Ext.MessageBox.confirm('다드운로드', '통계 데이터를 엑셀로 저장하시겠습니까?', function(choice){
        //                                     if(choice == 'yes'){

        //                                     }
        //                                 });
        //                             }
        //                         }
        //                     }
        //                 ]
        //             },
                    {
                        xtype: 'panel',
                        border: false,
                        dock: 'top',
                        height: 300,
                        region: 'center',
                        header: false,
                        title: 'My Panel',
                        layout: 'fit',
                        items: [chart]
                    }
                ],
                title: record.data.name,
                itemid: tpn_main.items.length,
                items: [grid],
                layout: 'fit',
                border: false,
                closable: true,
                listeners: {
                    close: function(){

                        console.log('d : ', tpn_main.items.length);

                        if(tpn_main.items.length === 1)
                            tpn_main.hide();

                        //                 console.log('삭제 : ', tpn_main.items.length);
                    }
                }

            }).show();













        //     tpn_main.add({

        //         dockedItems: [
        //             //                 {
        //             //                     xtype: 'toolbar',
        //             //                     dock: 'top',
        //             //                     frame: false,
        //             //                     layout: {
        //             //                         type: 'hbox',
        //             //                         pack: 'end'
        //             //                     },
        //             //                     items: [
        //             //                         {
        //             //                             xtype: 'button',
        //             //                             width: 100,
        //             //                             text: 'chart',
        //             //                             listeners: {
        //             //                                 click: function(){

        //             //                                     window.show();
        //             //                                 }
        //             //                             }
        //             //                         },
        //             //                         {
        //             //                             xtype: 'tbseparator'
        //             //                         },
        //             //                         {
        //             //                             xtype: 'splitbutton',
        //             //                             width: 100,
        //             //                             text: 'Export',
        //             //                             menu: {
        //             //                                 xtype: 'menu',
        //             //                                 items: [
        //             //                                     {
        //             //                                         xtype: 'menuitem',
        //             //                                         text: 'save file (.csv)'
        //             //                                     },
        //             //                                     {
        //             //                                         xtype: 'menuitem',
        //             //                                         text: 'save file (.xlsx)'
        //             //                                     }
        //             //                                 ]
        //             //                             }
        //             //                         }
        //             //                     ]
        //             //                 },
        //             {
        //                 xtype: 'panel',
        //                 border: false,
        //                 dock: 'top',
        //                 height: 300,
        //                 region: 'center',
        //                 header: false,
        //                 title: 'My Panel',
        //                 layout: 'fit',
        //                 items: [chart]
        //             }
        //         ],
        //         title: record.data.name,
        //         itemid: tpn_main.items.length,
        //         items: [grid],
        //         layout: 'fit',
        //         closable: true,
        //         listeners: {
        //             close: function(){

        //                 if(tpn_main.items.length === 1)
        //                     tpn_main.hide();

        //                 console.log('삭제 : ', tpn_main.items.length);
        //             }
        //         }

        //     }).show();



    },

    onCmb_search_stat_typeAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"iface", "name":"인터페이스"},
                {"value":"status", "name":"시스템 상태"},
                {"value":"packet", "name":"패킷 분포도"}
            ]
        });

        component.bindStore(store);
        component.setValue('iface');
    },

    onCmb_search_stat_typeChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_stat = this.componentStorage().pnl_search_stat;

        var ck_search_stat_type_rtt = pnl_search_stat.down('[itemId=pnl_search_stat_type]').down('[itemId=ck_search_stat_type_rtt]');
        var cmb_search_stat_type_eth = pnl_search_stat.down('[itemId=pnl_search_stat_type]').down('[itemId=cmb_search_stat_type_eth]');

        if(newValue === 'iface')
        {
            ck_search_stat_type_rtt.show();
            cmb_search_stat_type_eth.show();
        }
        else
        {
            ck_search_stat_type_rtt.hide();
            cmb_search_stat_type_eth.hide();
        }
    },

    onCmb_search_stat_type_ethAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                //0
                {"value":0, "name":"eth0"},
                {"value":1, "name":"eth1"},
                {"value":2, "name":"eth2"},
                {"value":3, "name":"eth3"},
                {"value":4, "name":"eth4"},

                {"value":5, "name":"eth5"},
                {"value":6, "name":"eth6"},
                {"value":7, "name":"eth7"},
                {"value":8, "name":"eth8"},
                {"value":9, "name":"eth9"},
                //10
                {"value":10, "name":"eth10"},
                {"value":11, "name":"eth11"},
                {"value":12, "name":"eth12"},
                {"value":13, "name":"eth13"},
                {"value":14, "name":"eth14"},

                {"value":15, "name":"eth15"},
                {"value":16, "name":"eth16"},
                {"value":17, "name":"eth17"},
                {"value":18, "name":"eth18"},
                {"value":19, "name":"eth19"},
                //20
                {"value":20, "name":"eth20"},
                {"value":21, "name":"eth21"},
                {"value":22, "name":"eth22"},
                {"value":23, "name":"eth23"},
                {"value":24, "name":"eth24"},

                {"value":25, "name":"eth25"},
                {"value":26, "name":"eth26"},
                {"value":27, "name":"eth27"},
                {"value":28, "name":"eth28"},
                {"value":29, "name":"eth29"},
                //30
                {"value":30, "name":"eth30"},
                {"value":31, "name":"eth31"},

                {"value":32, "name":"eth32"}
            ]
        });

        component.bindStore(store);
        component.setValue(0);
    },

    onRdg_search_stat_periodChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_stat = this.componentStorage().pnl_search_stat;

        var dtf_search_stat_start = pnl_search_stat.down('[itemId=pnl_search_stat_time]').down('[itemId=dtf_search_stat_start]');
        var dtf_search_stat_end = pnl_search_stat.down('[itemId=pnl_search_stat_time]').down('[itemId=dtf_search_stat_end]');

        console.log('newValue ->', newValue.rd_search_stat_period);

        if(newValue.rd_search_stat_period === 'today')
        {

            dtf_search_stat_start.setEditable(false);
            dtf_search_stat_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_end.setValue(today);

        }
        else if(newValue.rd_search_stat_period === 'day')
        {

            dtf_search_stat_start.setEditable(false);
            dtf_search_stat_end.setEditable(false);

            //시작 시간
            var date = new Date(dtf_search_stat_start.value.getTime());
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_end.setValue(today);

        }
        else if(newValue.rd_search_stat_period === 'week')
        {

            dtf_search_stat_start.setEditable(false);
            dtf_search_stat_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setDate(date.getDate() - 6);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_end.setValue(today);

        }
        else if(newValue.rd_search_stat_period === 'month')
        {

            dtf_search_stat_start.setEditable(false);
            dtf_search_stat_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_stat_end.setValue(today);

        }
        else if(newValue.rd_search_stat_period === 'user')
        {
            dtf_search_stat_start.setEditable(true);
            dtf_search_stat_end.setEditable(true);
        }
    },

    onId_dt_startRender2: function(component, eOpts) {

        var date = new Date();

        date = date.setHours(0, 0, 0, 0);
        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);

        // var today = new Date();
        // var date = new Date('05/28/2014');

        // date = date.setHours(0, 0, 0, 0);
        // var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // Ext.getCmp('id_dt_start').setValue(today);
    },

    onId_dt_endRender2: function(component, eOpts) {

        var date = new Date();

        date.setDate(date.getDate() + 1);
        date = date.setHours(0, 0, 0, 0);

        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);


        // var today = new Date();
        // var date = new Date();

        // date.setDate(date.getDate());
        // date = date.setHours(0, 0, 0, 0);

        // var today = Ext.Date.format(new Date(date), 'Y-m-d');

        // Ext.getCmp('id_dt_end').setValue(today);
    },

    onId_combo_period_statAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"1분"},
                {"value":"10", "name":"10분"},
                {"value":"60", "name":"1시간"}
            ]
        });

        component.bindStore(store);
        component.setValue('60');
    },

    onBt_search_trackerClick: function(button, e, eOpts) {
        var gpn_xtm = this.componentStorage().gpn_xtm;
        var tpn_main = this.componentStorage().tpn_main;
        var pnl_search_tracker = this.componentStorage().pnl_search_tracker;

        // 트래커 종류
        var cmb_search_tracker_type = pnl_search_tracker.down('[itemId=pnl_search_tracker_type]').down('[itemId=cmb_search_tracker_type]');

        // 날짜/시간
        var dtf_search_tracker_start = pnl_search_tracker.down('[itemId=pnl_search_tracker_time]').down('[itemId=dtf_search_tracker_start]');
        var dtf_search_tracker_end = pnl_search_tracker.down('[itemId=pnl_search_tracker_time]').down('[itemId=dtf_search_tracker_end]');

        var cmb_search_tracker_period = pnl_search_tracker.down('[itemId=pnl_search_tracker_time]').down('[itemId=cmb_search_tracker_period]');

        var start_dt = dtf_search_tracker_start.value.getTime()/1000;
        var end_dt = dtf_search_tracker_end.value.getTime()/1000;

        // 상세 조건
        var cmb_search_tracker_count = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_count]');
        var cmb_search_tracker_order = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_order]');
        var cmb_search_tracker_action = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_action]');
        var cmb_search_tracker_opmode = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_opmode]');
        var cmb_search_tracker_search = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_search]');

        var txf_search_tracker_ip = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=txf_search_tracker_ip]');
        var cmb_search_tracker_protocol = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=pnl_search_tracker_service]').down('[itemId=cmb_search_tracker_protocol]');
        var txf_search_tracker_port = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=pnl_search_tracker_service]').down('[itemId=txf_search_tracker_port]');
        var cmb_search_tracker_country = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_country]');

        // 장비 선택
        var record = gpn_xtm.getSelectionModel().getSelection()[0];

        // 장비 선택
        var gates = gpn_xtm.getSelectionModel().getSelection();

        // 장비 리스트
        var gate_list = [];

        for(var i=0; i<gates.length; i++)
            gate_list[i] = gates[i];

        // console.log(gate_list);

        if(record === undefined)
            return Ext.Msg.alert('알림','장비를 선택하세요.');

        console.log(record.data['@cid'], record.data.name);

        // 정렬 기준
        var order_type = '';

        if(cmb_search_tracker_order.value !== 'packet' && cmb_search_tracker_order.value !== 'session')
            order_type = 'bytes';
        else
            order_type = cmb_search_tracker_order.value;

        // 행위
        var action = '';

        if(cmb_search_tracker_action.value === 'pass')
            action = 'action in (0,1,2)';
        else if(cmb_search_tracker_action.value === 'deny')
            action = 'action in (3,4)';
        else
            action = 'action = ' + cmb_search_tracker_action.value;

        // 검색 기준
        var search_types = cmb_search_tracker_search.value;
        var option_list = '';

        if(cmb_search_tracker_opmode.value !== 'all')
        {
            if(option_list !== '')
                option_list += ', ';

            option_list += 'op_mode' + ' = ' + cmb_search_tracker_opmode.value;
        }
        else if(search_types === 'sipv4' || search_types === 'dipv4' || search_types === 'uid')
        {
            if(txf_search_tracker_ip.rawValue !== '')
            {
                if(option_list !== '')
                    option_list += ', ';

                option_list += search_types + ' = ' + txf_search_tracker_ip.rawValue;
            }
        }
        else if(search_types === 'service')
        {
            if(cmb_search_tracker_protocol.value !== '선택하세요.' && txf_search_tracker_port.rawValue !== '')
            {
                if(option_list !== '')
                    option_list += ', ';

                option_list += search_types + ' = ' + cmb_search_tracker_protocol.value + ' ' + txf_search_tracker_port.rawValue;
            }
        }
        else if(search_types === 'country')
        {
            if(cmb_search_tracker_country.value !== '')
            {
                if(option_list !== '')
                    option_list += ', ';

                option_list += search_types + ' = ' + cmb_search_tracker_country.value;
            }
        }

        console.log('search_type :', search_types);
        console.log('option_list :', option_list);

        // 포맷함수들..
        var fileSize = function(size) {

            if (size < 1024) { //pow(2,10)
                return Ext.util.Format.number(size, '0,000') + " bytes";
            } else if (size < 1048576) { //pow(2,20)
                return Ext.util.Format.number(Math.round(((size*100) / 1024))/100, '0,000.00') + " KB";
            } else if (size < 1073741824) { //pow(2,30)
                return Ext.util.Format.number(Math.round(((size*100) / 1048576))/100, '0,000.00') + " MB";
            } else if (size < 1099511627776) { //pow(2,40)
                return Ext.util.Format.number(Math.round(((size*100) / 1073741824))/100, '0,000.00') + " GB";
            } else if (size < 1125899906842624) { //pow(2,50)
                return Ext.util.Format.number(Math.round(((size*100) / 1099511627776))/100, '0,000.00') + " TB";
            } else { //pow(2,60)
                return Ext.util.Format.number(Math.round(((size*100) / 1125899906842624))/100, '0,000.00') + " PB";
            }
        };

        var ipToInt = function (ip) {
            var parts = ip.split(".");
            var res = 0;

            res += parseInt(parts[0], 10) << 24;
            res += parseInt(parts[1], 10) << 16;
            res += parseInt(parts[2], 10) << 8;
            res += parseInt(parts[3], 10);

            return res;
        };


        // 조건별 검색
        if(cmb_search_tracker_type.value === "fw")
        {
            var store = new Ext.data.Store({

                autoLoad: true,
                storeId: 'id_store_data_' + tpn_main.items.length,
                proxy: {
                    type: 'jsonp',
                    url: 'api/ftLOG/GetFWTracker',
                    extraParams: {
                        'cid': Ext.encode(record.data['@cid']),
                        'start_dt':  start_dt,
                        'end_dt': end_dt,
                        'action': Ext.encode(action),
                        'count': cmb_search_tracker_count.value,
                        'search_type': Ext.encode(search_types),
                        'option_list': Ext.encode(option_list),
                        'order_type': Ext.encode(order_type)
                    }
                },
                fields: [
                    {
                        name: 'index'
                    },
                    {
                        name: 'op_mode'
                    },
                    {
                        name: 'sipv4'
                    },
                    {
                        name: 'dipv4'
                    },
                    {
                        name: 'service'
                    },
                    {
                        name: 'uid'
                    },
                    {
                        name: 'country'
                    },
                    {
                        name: 'option'
                    },
                    {
                        name: 'packet'
                    },
                    {
                        name: 'bytes'
                    },
                    {
                        name: 'session'
                    }
                ]
            });

        //     if(cmb_search_tracker_period.value === '10')
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics_10';
        //     else
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics';

            //iface
            var grid = Ext.create('Ext.grid.Panel', {
                id: 'id_grid_data' + tpn_main.items.length,
                header: false,
                title: 'My Grid Panel',
                //             features: [{
                //                 ftype:'grouping',
                //                 startCollapsed: true
                //             }],
                store: 'id_store_data_' + tpn_main.items.length,
                columnLines: true,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 40,
                        align: 'center',
                        dataIndex: 'index',
                        text: 'no'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 50,
                        align: 'center',
                        dataIndex: 'op_mode',
                        text: '경계',
                        renderer : function(value, metaData, record, rowIndex, colIndex, store, view){
                            if (value === 0)
                                metaData.tdCls = 'ico_tracker_op_all';
                            else if (value === 1)
                                metaData.tdCls = 'ico_tracker_op_internal';
                            else if (value === 2)
                                metaData.tdCls = 'ico_tracker_op_external';
                            else if (value === 3)
                                metaData.tdCls = 'ico_tracker_op_dmz';
                        }
                    },
                    {
                        hidden: true,
                        xtype: 'gridcolumn',
                        width: 100,
                        align: 'center',
                        dataIndex: 'sipv4',
                        text: '출발지'
                    },
                    {
                        hidden: true,
                        xtype: 'gridcolumn',
                        width: 100,
                        align: 'center',
                        dataIndex: 'dipv4',
                        text: '목적지'
                    },
                    {
                        hidden: true,
                        xtype: 'gridcolumn',
                        width: 100,
                        align: 'center',
                        dataIndex: 'service',
                        text: '서비스'
                    },
                    {
                        hidden: true,
                        xtype: 'gridcolumn',
                        width: 100,
                        align: 'center',
                        dataIndex: 'uid',
                        text: 'UID'
                    },
                    {
                        hidden: true,
                        xtype: 'gridcolumn',
                        width: 100,
                        align: 'center',
                        dataIndex: 'country',
                        text: '국가코드'
                    },
                    {
                        xtype: 'gridcolumn',
                        align: 'center',
                        text: '옵션',
                        columns:[
                            {
                                hidden: true,
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                align: 'center',
                                items: [{
                                    iconCls: 'ico_tracker_op_src',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                    tooltip: 'src',
                                    handler: function(grid2, rowIndex, colIndex) {

                                        if(!grid.columns[8].isVisible() && !grid.columns[9].isVisible() && !grid.columns[10].isVisible() && !grid.columns[11].isVisible())
                                        {
                                            grid.columns[12].setWidth(50);
                                        }

                                        grid.columns[7].setVisible(false);

                                        // 아이콘이 선택된 row Selct
                                        grid.getSelectionModel().select(rowIndex);

                                        // 선택된 row 가 존재하면
                                        if (grid.getSelectionModel().hasSelection()) {
                                            var row = grid.getSelectionModel().getSelection()[0];

                                            var types = search_types.split(',');

                                            if(option_list !== '')
                                                option_list += ', ';

                                            option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());

                                            // 검색 타입 추가
                                            search_types += ', sipv4';

                                            console.log('search_type :', search_types);
                                            console.log('option_list :', option_list);

                                            // 컬럼 추가
                                            var column = Ext.create('Ext.grid.column.Column', {

                                                xtype: 'gridcolumn',
                                                width: 100,
                                                align: 'center',
                                                dataIndex: 'sipv4',
                                                text: '출발지'
                                            });

                                            grid.headerCt.insert(search_types.split(',').length + 2, column);

                                            // 데이터 호출
                                            grid.getStore().getProxy().extraParams = {
                                                'cid': Ext.encode(record.data['@cid']),
                                                'start_dt':  start_dt,
                                                'end_dt': end_dt,
                                                'action': Ext.encode(action),
                                                'count': cmb_search_tracker_count.value,
                                                'search_type': Ext.encode(search_types),
                                                'option_list': Ext.encode(option_list),
                                                'order_type': Ext.encode(order_type)
                                            };

                                            grid.getStore().load();

                                        }
                                    }
                                }]
                            },
                            {
                                hidden: true,
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                layout: 'fit',
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'ico_tracker_op_dest',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                        tooltip: 'dest',
                                        handler: function(grid2, rowIndex, colIndex) {

                                            if(!grid.columns[7].isVisible() && !grid.columns[9].isVisible() && !grid.columns[10].isVisible() && !grid.columns[11].isVisible())
                                            {
                                                grid.columns[12].setWidth(50);
                                            }

                                            grid.columns[8].setVisible(false);

                                            // 아이콘이 선택된 row Selct
                                            grid.getSelectionModel().select(rowIndex);

                                            // 선택된 row 가 존재하면
                                            if (grid.getSelectionModel().hasSelection()) {
                                               var row = grid.getSelectionModel().getSelection()[0];

                                                var types = search_types.split(',');

                                                if(option_list !== '')
                                                    option_list += ', ';

                                                option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());


        //                                         Ext.getCmp('id_toolbar').add({
        //                                                                         xtype: 'button',
        //                                                                         text: types[types.length-1].trim() + '(' + row.get(types[types.length-1].trim()) + ')'
        //                                                                     });

                                                // 검색 타입 추가
                                                search_types += ', dipv4';

                                                console.log('search_type :', search_types);
                                                console.log('option_list :', option_list);

                                                // 컬럼 추가
                                                var column = Ext.create('Ext.grid.column.Column', {

                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    align: 'center',
                                                    dataIndex: 'dipv4',
                                                    text: '목적지'
                                                });

                                                grid.headerCt.insert(search_types.split(',').length + 2, column);

                                                // 데이터 호출
                                                grid.getStore().getProxy().extraParams = {
                                                    'cid': Ext.encode(record.data['@cid']),
                                                    'start_dt':  start_dt,
                                                    'end_dt': end_dt,
                                                    'action': Ext.encode(action),
                                                    'count': cmb_search_tracker_count.value,
                                                    'search_type': Ext.encode(search_types),
                                                    'option_list': Ext.encode(option_list),
                                                    'order_type': Ext.encode(order_type)
                                                };

                                                grid.getStore().load();

                                            }

                                        }

                                    }
                                ]
                            },
                            {
                                hidden: true,
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'ico_tracker_op_service',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                        tooltip: 'service',
                                        handler: function(grid2, rowIndex, colIndex) {

                                            if(!grid.columns[7].isVisible() && !grid.columns[8].isVisible() && !grid.columns[10].isVisible() && !grid.columns[11].isVisible())
                                            {
                                                grid.columns[12].setWidth(50);
                                            }

                                            grid.columns[9].setVisible(false);

                                            // 아이콘이 선택된 row Selct
                                            grid.getSelectionModel().select(rowIndex);

                                            // 선택된 row 가 존재하면
                                            if (grid.getSelectionModel().hasSelection()) {
                                                var row = grid.getSelectionModel().getSelection()[0];

                                                var types = search_types.split(',');

                                                if(option_list !== '')
                                                    option_list += ', ';

                                                option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());

                                                Ext.getCmp('id_toolbar').add({
                                                    xtype: 'button',
                                                    text: types[types.length-1].trim() + '(' + row.get(types[types.length-1].trim()) + ')'
                                                });

                                                // 검색 타입 추가
                                                search_types += ', service';

                                                console.log('search_type :', search_types);
                                                console.log('option_list :', option_list);

                                                // 컬럼 추가
                                                var column = Ext.create('Ext.grid.column.Column', {

                                                    xtype: 'gridcolumn',
                                                    width: 80,
                                                    align: 'center',
                                                    dataIndex: 'service',
                                                    text: '서비스'
                                                });

                                                grid.headerCt.insert(search_types.split(',').length + 2, column);

                                                // 데이터 호출
                                                grid.getStore().getProxy().extraParams = {
                                                    'cid': Ext.encode(record.data['@cid']),
                                                    'start_dt':  start_dt,
                                                    'end_dt': end_dt,
                                                    'action': Ext.encode(action),
                                                    'count': cmb_search_tracker_count.value,
                                                    'search_type': Ext.encode(search_types),
                                                    'option_list': Ext.encode(option_list),
                                                    'order_type': Ext.encode(order_type)
                                                };

                                                grid.getStore().load();
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                hidden: true,
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'ico_tracker_op_uid',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                        tooltip: 'uid',
                                        handler: function(grid2, rowIndex, colIndex) {

                                            if(!grid.columns[7].isVisible() && !grid.columns[8].isVisible() && !grid.columns[9].isVisible() && !grid.columns[11].isVisible())
                                            {
                                                grid.columns[12].setWidth(50);
                                            }

                                            grid.columns[10].setVisible(false);

                                            // 아이콘이 선택된 row Selct
                                            grid.getSelectionModel().select(rowIndex);

                                            // 선택된 row 가 존재하면
                                            if (grid.getSelectionModel().hasSelection()) {
                                               var row = grid.getSelectionModel().getSelection()[0];

                                                var types = search_types.split(',');

                                                if(option_list !== '')
                                                    option_list += ', ';

                                                option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());

                                                // 검색 타입 추가
                                                search_types += ', uid';

                                                console.log('search_type :', search_types);
                                                console.log('option_list :', option_list);

                                                // 컬럼 추가
                                                var column = Ext.create('Ext.grid.column.Column', {
                                                    xtype: 'gridcolumn',
                                                    width: 60,
                                                    align: 'center',
                                                    dataIndex: 'uid',
                                                    text: '정책'
                                                });

                                                grid.headerCt.insert(search_types.split(',').length + 2, column);

                                                // 데이터 호출
                                                grid.getStore().getProxy().extraParams = {
                                                    'cid': Ext.encode(record.data['@cid']),
                                                    'start_dt':  start_dt,
                                                    'end_dt': end_dt,
                                                    'action': Ext.encode(action),
                                                    'count': cmb_search_tracker_count.value,
                                                    'search_type': Ext.encode(search_types),
                                                    'option_list': Ext.encode(option_list),
                                                    'order_type': Ext.encode(order_type)
                                                };

                                                grid.getStore().load();

                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                hidden: true,
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'ico_tracker_op_country',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                                        tooltip: 'country',
                                        handler: function(grid2, rowIndex, colIndex) {

                                            if(!grid.columns[7].isVisible() && !grid.columns[8].isVisible() && !grid.columns[9].isVisible() && !grid.columns[10].isVisible())
                                            {
                                                grid.columns[12].setWidth(50);
                                            }

                                            grid.columns[11].setVisible(false);

                                            // 아이콘이 선택된 row Selct
                                            grid.getSelectionModel().select(rowIndex);

                                            // 선택된 row 가 존재하면
                                            if (grid.getSelectionModel().hasSelection()) {
                                                var row = grid.getSelectionModel().getSelection()[0];

                                                var types = search_types.split(',');

                                                if(option_list !== '')
                                                    option_list += ', ';

                                                option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());

                                                // 검색 타입 추가
                                                search_types += ', country';

                                                console.log('search_type :', search_types);
                                                console.log('option_list :', option_list);

                                                // 컬럼 추가
                                                var column = Ext.create('Ext.grid.column.Column', {
                                                    xtype: 'gridcolumn',
                                                    width: 80,
                                                    align: 'center',
                                                    dataIndex: 'country',
                                                    text: '국가코드'
                                                });

                                                grid.headerCt.insert(search_types.split(',').length + 2, column);

                                                // 데이터 호출
                                                grid.getStore().getProxy().extraParams = {
                                                    'cid': Ext.encode(record.data['@cid']),
                                                    'start_dt':  start_dt,
                                                    'end_dt': end_dt,
                                                    'action': Ext.encode(action),
                                                    'count': cmb_search_tracker_count.value,
                                                    'search_type': Ext.encode(search_types),
                                                    'option_list': Ext.encode(option_list),
                                                    'order_type': Ext.encode(order_type)
                                                };

                                                grid.getStore().load();

                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'actioncolumn',
                                width: 25,
                                height: 0,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'ico_tracker_op_time',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config,
                                        tooltip: 'time',
                                        handler: function(grid2, rowIndex, colIndex) {
                                            var me = this;

                                            // 아이콘이 선택된 row Selct
                                            grid.getSelectionModel().select(rowIndex);

                                            // 선택된 row 가 존재하면
                                            if (grid.getSelectionModel().hasSelection()) {
                                                /*
                                                var row = grid.getSelectionModel().getSelection()[0];

                                                //option_list 매개변수 설정
                                                var types = search_types.split(',');

                                                var typeHeader = types[types.length-1].trim();
                                                if(option_list !== '' ){
                                                        option_list += ', ';
                                                }

                                                var _regex = new RegExp(typeHeader + "..+\,", "g");
                                                console.log(_regex);
                                                option_list = option_list.replace(/[\s\r\n]/g,'');
                                                console.log("[" + option_list + "]");
                                                option_list = option_list.replace(_regex,'');
                                                console.log("[" + option_list + "]");
                                                if(option_list !== '' ){
                                                    option_list += ',';
                                                }

                                                console.log("[" + option_list + "]");
                                                option_list += types[types.length-1].trim() + ' = ' + row.get(types[types.length-1].trim());
                                                */

                                                //타임 구간별 사용량 보여주기 시작
                                                var _dh = Ext.DomHelper;
                                                var _selModel = grid.getSelectionModel();
                                                var _tpl_id = 'tpl_grid' + _selModel.view.focusedRow.id;

                                                var _el_grid = me[_tpl_id];  //닫기 기능을 위해서 값을 저장한다.

                                                if(typeof _el_grid === 'undefined' || _el_grid == null || _el_grid.length == 0){
                                                    //테이블의 row와 cell 템플릿을 만들기 시작
                                                    var _trstring = ['<tr role="row" class="x-grid-row  x-grid-data-row x-grid-tpl-tracker">',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"> </td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"> </td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"> </td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td" colspan=5><div class="x-grid-cell-inner" style="text-align:center;">{time}</div></td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"><div class="x-grid-cell-inner" style="text-align:center;" id="{pktid}"></div></td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"><div class="x-grid-cell-inner" style="text-align:center;" id="{bytesid}"></div></td>',
                                                                     '<td role="gridcell" class="x-grid-cell x-grid-td"><div class="x-grid-cell-inner" style="text-align:center;" id="{sessionid}"></div></td>',
                                                                     '</tr>'];

                                                    var _tr_tpl = _dh.createTemplate(_trstring);

                                                    //테이블의 row와 cell 템플릿을 만들기 끝

                                                    console.log('option_list :[%s]', option_list);

                                                    //서버에서 데이트를 갖고 오기 위한 파라미터 설정
                                                    var _params = {
                                                        'cid': Ext.encode(record.data['@cid']),
                                                        'start_dt':  start_dt,
                                                        'end_dt': end_dt,
                                                        'action': Ext.encode(action),
                                                        'count': cmb_search_tracker_count.value,
                                                        'search_type': Ext.encode(search_types),
                                                        'option_list': Ext.encode(option_list),
                                                        'order_type': Ext.encode(order_type)
                                                    };

                                                    //서버에서 데이터 갖고 오기
                                                    Ext.Ajax.request({
                                                        url : 'api/ftLOG/GetFWTracker_Time',
                                                        params : _params,
                                                        method : 'POST',
                                                        success : function(response){
                                                            //데이터를 정상적으로 갖고 온후 테이블 생성
                                                            var result = Ext.decode(response.responseText);
                                                            me[_tpl_id] = [];

                                                            var _len = result.length - 1;
                                                            for(var i = _len ; i > 0 ; i--){
                                                                var data = result[i];

                                                                var _pkt_id = _tpl_id + 'pkt' + i,
                                                                    _pkt = data.packet,
                                                                    _bytes_id = _tpl_id + 'bytes' + i,
                                                                    _bytes = data.bytes,
                                                                    _session_id = _tpl_id + 'session' + i,
                                                                    _session = data.session;

                                                                var _domEl = _tr_tpl.insertAfter(_selModel.view.focusedRow, {
                                                                    time : data.timestamp,
                                                                    pktid : _pkt_id,
                                                                    bytesid : _bytes_id,
                                                                    sessionid : _session_id
                                                                });

                                                                var pkt_el = Ext.get(_pkt_id),
                                                                    bytes_el = Ext.get(_bytes_id),
                                                                    session_el = Ext.get(_session_id);

                                                                Ext.create('Ext.ProgressBar', {
                                                                    renderTo: pkt_el,
                                                                    value: _pkt.rate / 100,
                                                                    height: 18,
                                                                    margin: '-1.5 0 0 0',
                                                                    text: fileSize(_pkt.count) + ' (' + _pkt.rate + '%)'
                                                                });

                                                                Ext.create('Ext.ProgressBar', {
                                                                    renderTo: bytes_el,
                                                                    value: _bytes.rate / 100,
                                                                    height: 18,
                                                                    margin: '-1.5 0 0 0',
                                                                    text: fileSize(_bytes.count) + ' (' + _bytes.rate + '%)'
                                                                });

                                                                Ext.create('Ext.ProgressBar', {
                                                                    renderTo: session_el,
                                                                    value: _session.rate / 100,
                                                                    height: 18,
                                                                    margin: '-1.5 0 0 0',
                                                                    text: fileSize(_session.count) + ' (' + _session.rate + '%)'
                                                                });

                                                                me[_tpl_id].push(_domEl);
                                                            }
                                                        },
                                                        failure : function(response){
                                                            console.log('failure : ', response);
                                                        }
                                                    });
                                                } else {
                                                    //그려진 표 지우기
                                                    var _len = me[_tpl_id].length;
                                                    for(var i = 0 ; i < _len ; i++){
                                                        var _getEl = Ext.get(me[_tpl_id][i]);

                                                        _getEl.destroy();
                                                    }
                                                    me[_tpl_id] = null;
                                                }

                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 170,
                        align: 'center',
                        dataIndex: 'packet',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: fileSize(value.count) + ' (' + value.rate + '%)'
        //                             text: Ext.util.Format.number(value.count, '0,000') + '\t(' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 패킷 (packet)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 170,
                        align: 'center',
                        dataIndex: 'bytes',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: fileSize(value.count) + ' (' + value.rate + '%)'
        //                             text: Ext.util.Format.number(value.count, '0,000') + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 사용량 (bytes)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 170,
                        align: 'center',
                        dataIndex: 'session',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: fileSize(value.count) + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 세션 (count)'
                    }
                ],
                dockedItems: [
        //             {
        //                 xtype: 'toolbar',
        // //                 border: false,
        //                 dock: 'top',
        // //                 header: false,
        // //                 height: 30,
        //                 layout: {
        //                     type: 'hbox',
        //                     align: 'stretch'
        //                 },
        //                 items: [
        //                     {
        //                         xtype: 'label',
        //                         cls: 'lb_tracker_op_src',
        //                         text: '출발지 (10.31.40.11)'
        //                     }
        //                 ]
        //             }
                ],
                plugins: [
                ]
            });


            if(cmb_search_tracker_search.value === 'sipv4')
            {
                grid.columns[2].setVisible(true);

                grid.columns[8].setVisible(true);
                grid.columns[9].setVisible(true);
                grid.columns[10].setVisible(true);
                grid.columns[11].setVisible(true);
            }
            else if(cmb_search_tracker_search.value === 'dipv4')
            {
                grid.columns[3].setVisible(true);

                grid.columns[7].setVisible(true);
                grid.columns[9].setVisible(true);
                grid.columns[10].setVisible(true);
                grid.columns[11].setVisible(true);
            }
            else if(cmb_search_tracker_search.value === 'service')
            {
                grid.columns[4].setVisible(true);

                grid.columns[7].setVisible(true);
                grid.columns[8].setVisible(true);
                grid.columns[10].setVisible(true);
                grid.columns[11].setVisible(true);
            }
            else if(cmb_search_tracker_search.value === 'uid')
            {
                grid.columns[5].setVisible(true);

                grid.columns[7].setVisible(true);
                grid.columns[8].setVisible(true);
                grid.columns[9].setVisible(true);
                grid.columns[11].setVisible(true);
            }
            else if(cmb_search_tracker_search.value === 'country')
            {
                grid.columns[6].setVisible(true);

                grid.columns[7].setVisible(true);
                grid.columns[8].setVisible(true);
                grid.columns[9].setVisible(true);
                grid.columns[10].setVisible(true);
            }
        }
        else if(cmb_search_tracker_type.value === "vpn")
        {
            var store = new Ext.data.Store({

                autoLoad: true,
                storeId: 'id_store_data_' + tpn_main.items.length,
                proxy: {
                    type: 'jsonp',
                    url: 'api/ftLOG/GetTrafficTrackerStatistics'
        //             extraParams: {
        //                 'cid': Ext.encode(record.data['@cid']),
        //                 'start_dt': start_dt,
        //                 'end_dt': end_dt,
        //                 'eth': Ext.encode(0),
        //                 'rtt': false
        //             }
                },
                fields: [
                    {
                        name: 'index'
                    },
                    {
                        name: 'op_mode'
                    },
                    {
                        name: 'sipv4'
                    },
                    {
                        name: 'option'
                    },
                    {
                        name: 'packet'
                    },
                    {
                        name: 'bytes'
                    },
                    {
                        name: 'session'
                    }
                ]
            });

        //     if(cmb_search_tracker_period.value === '10')
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics_10';
        //     else
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics';

            //iface
            var grid = Ext.create('Ext.grid.Panel', {
                id: 'id_grid_data' + tpn_main.items.length,
                header: false,
                title: 'My Grid Panel',
                //             features: [{
                //                 ftype:'grouping',
                //                 startCollapsed: true
                //             }],
                store: 'id_store_data_' + tpn_main.items.length,
                columnLines: true,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 40,
                        align: 'center',
                        dataIndex: 'index',
                        text: 'no'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 60,
                        align: 'center',
                        dataIndex: 'op_mode',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value === 0)
                                metaData.tdCls = 'ico_tracker_op_internal';
                            else if (value === 1)
                                metaData.tdCls = 'ico_tracker_op_external';
                            else //if (value === 2)
                                metaData.tdCls = 'ico_tracker_op_dmz';
                        },
                        text: '경계'
                    },
                    {
                        xtype: 'actioncolumn',
                        width: 150,
                        align: 'center',
        //                 dataIndex: 'option',
                        renderer: fileSize,
                        text: '옵션',
                        items: [{
                            iconCls: 'ico_tracker_op_dest',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'dest',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_service',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'service',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_uid',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'uid',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_country',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'country',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_time',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config,
                            tooltip: 'time',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        }]

                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'packet',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: Ext.util.Format.number(value.count, '0,000') + '\t(' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 패킷 (packet)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'bytes',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: Ext.util.Format.number(value.count, '0,000') + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 사용량 (bytes)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'session',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: Ext.util.Format.number(value.count, '0,000') + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 세션 (count)'
                    }
                ]
            });

        }
        else if(cmb_search_tracker_type.value === "dpi")
        {
            var store = new Ext.data.Store({

                autoLoad: true,
                storeId: 'id_store_data_' + tpn_main.items.length,
                proxy: {
                    type: 'jsonp',
                    url: 'api/ftLOG/GetTrafficTrackerStatistics'
        //             extraParams: {
        //                 'cid': Ext.encode(record.data['@cid']),
        //                 'start_dt': start_dt,
        //                 'end_dt': end_dt,
        //                 'eth': Ext.encode(0),
        //                 'rtt': false
        //             }
                },
                fields: [
                    {
                        name: 'index'
                    },
                    {
                        name: 'op_mode'
                    },
                    {
                        name: 'sipv4'
                    },
                    {
                        name: 'option'
                    },
                    {
                        name: 'packet'
                    },
                    {
                        name: 'bytes'
                    },
                    {
                        name: 'session'
                    }
                ]
            });

        //     if(cmb_search_tracker_period.value === '10')
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics_10';
        //     else
        //         store.proxy.url = 'api/ftLOG/GetDataStatistics';

            //iface
            var grid = Ext.create('Ext.grid.Panel', {
                id: 'id_grid_data' + tpn_main.items.length,
                header: false,
                title: 'My Grid Panel',
                //             features: [{
                //                 ftype:'grouping',
                //                 startCollapsed: true
                //             }],
                store: 'id_store_data_' + tpn_main.items.length,
                columnLines: true,
                columns: [
                    {
                        xtype: 'gridcolumn',
                        width: 40,
                        align: 'center',
                        dataIndex: 'index',
                        text: 'no'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 60,
                        align: 'center',
                        dataIndex: 'op_mode',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            if (value === 0)
                                metaData.tdCls = 'ico_tracker_op_internal';
                            else if (value === 1)
                                metaData.tdCls = 'ico_tracker_op_external';
                            else //if (value === 2)
                                metaData.tdCls = 'ico_tracker_op_dmz';
                        },
                        text: '경계'
                    },
                    {
                        xtype: 'actioncolumn',
                        width: 150,
                        align: 'center',
        //                 dataIndex: 'option',
                        renderer: fileSize,
                        text: '옵션',
                        items: [{
                            iconCls: 'ico_tracker_op_dest',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'dest',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_service',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'service',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_uid',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'uid',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_country',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                            tooltip: 'country',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        },
                        {
                            iconCls: 'ico_tracker_op_time',//'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config,
                            tooltip: 'time',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                alert("Edit " + rec.get('firstname'));
                            }
                        }]

                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'packet',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: fileSize(value.count) + '\t(' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 패킷 (packet)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'bytes',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    text: fileSize(value.count) + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 사용량 (bytes)'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 150,
                        align: 'center',
                        dataIndex: 'session',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            var id = Ext.id();

                            Ext.defer(function () {
                                Ext.widget('progressbar', {
                                    renderTo: id,
                                    value: value.rate / 100,
                                    height: 18,
                                    margin: '-1.5 0 0 0',
                                    renderer: fileSize(value.count)
        //                             text: fileSize(value.count) + ' (' + value.rate + '%)'
                                });
                            }, 50);

                            return Ext.String.format('<div id="{0}"></div>', id);
                        },
                        text: '누적 세션 (count)'
                    }
                ]
            });

        }


        if(tpn_main.hidden)
        {
            tpn_main.show();
        }

        //console.log(store.data.length);

        tpn_main.add({

            title: record.data.name,
            itemid: tpn_main.items.length,
            items: [grid],
            layout: 'fit',
            autoScroll: true,
            border: false,
            closable: true,
            listeners: {
                close: function(){

                    console.log('d : ', tpn_main.items.length);

                    if(tpn_main.items.length === 1)
                        tpn_main.hide();

                    //                 console.log('삭제 : ', tpn_main.items.length);
                }
            }

        }).show();
    },

    onCmb_search_tracker_typeAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"fw", "name":"방화벽"},
                {"value":"vpn", "name":"VPN"},
                {"value":"dpi", "name":"DPI"}
            ]
        });

        component.bindStore(store);
        component.setValue('fw');
    },

    onCmb_search_tracker_typeChange: function(field, newValue, oldValue, eOpts) {
        // var pnl_search_tracker = this.componentStorage().pnl_search_tracker;

        // var cmb_search_tracker_type_eth = pnl_search_stat.down('[itemId=pnl_search_tracker_type]').down('[itemId=cmb_search_tracker_type_eth]');

        // if(newValue === 'iface')
        // {
        //     cmb_search_tracker_type_eth.show();
        // }
        // else
        // {
        //     cmb_search_tracker_type_eth.hide();
        // }
    },

    onRdg_search_tracker_periodChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_tracker = this.componentStorage().pnl_search_tracker;

        var dtf_search_tracker_start = pnl_search_tracker.down('[itemId=pnl_search_tracker_time]').down('[itemId=dtf_search_tracker_start]');
        var dtf_search_tracker_end = pnl_search_tracker.down('[itemId=pnl_search_tracker_time]').down('[itemId=dtf_search_tracker_end]');

        console.log('newValue ->', newValue.rd_search_tracker_period);

        if(newValue.rd_search_tracker_period === 'today')
        {

            dtf_search_tracker_start.setEditable(false);
            dtf_search_tracker_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_end.setValue(today);

        }
        else if(newValue.rd_search_tracker_period === 'day')
        {

            dtf_search_tracker_start.setEditable(false);
            dtf_search_tracker_end.setEditable(false);

            //시작 시간
            var date = new Date(dtf_search_tracker_start.value.getTime());
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_end.setValue(today);

        }
        else if(newValue.rd_search_tracker_period === 'week')
        {

            dtf_search_tracker_start.setEditable(false);
            dtf_search_tracker_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setDate(date.getDate() - 6);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_end.setValue(today);

        }
        else if(newValue.rd_search_tracker_period === 'month')
        {

            dtf_search_tracker_start.setEditable(false);
            dtf_search_tracker_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_tracker_end.setValue(today);

        }
        else if(newValue.rd_search_tracker_period === 'user')
        {
            dtf_search_tracker_start.setEditable(true);
            dtf_search_tracker_end.setEditable(true);
        }
    },

    onDtf_search_tracker_startAfterRender: function(component, eOpts) {
        var today = new Date();
        var date = new Date();

        date = date.setHours(0, 0, 0, 0);
        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);
    },

    onDtf_search_tracker_endAfterRender: function(component, eOpts) {

        var date = new Date();

        date.setDate(date.getDate() + 1);
        date = date.setHours(0, 0, 0, 0);

        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);
    },

    onCmb_search_tracker_periodAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"1분"},
                {"value":"10", "name":"10분"},
                {"value":"60", "name":"1시간"}
            ]
        });

        component.bindStore(store);
        component.setValue('60');
    },

    onCmb_search_tracker_countAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":20, "name":"20"},
                {"value":30, "name":"30"},
                {"value":50, "name":"50"},
                {"value":100, "name":"100"},
                {"value":"user", "name":"사용자"}

        //         {"value":100, "name":"100"},
        //         {"value":200, "name":"200"},
        //         {"value":500, "name":"500"},
        //         {"value":1000, "name":"1000"},
        //         {"value":5000, "name":"5000"}
            ]
        });

        component.bindStore(store);
        component.setValue(30);
    },

    onCmb_search_tracker_orderAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"packet", "name":"누적 패킷"},
                {"value":"use", "name":"누적 사용량"},
                {"value":"totaluse", "name":"- 전체 누적 사용량"},
                {"value":"tx", "name":"- Tx"},
                {"value":"rx", "name":"- Rx"},
                {"value":"session", "name":"누적 세션"}
            ]
        });

        component.bindStore(store);
        component.setValue("packet");
    },

    onCmb_search_tracker_actionAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"pass", "name":"통과"},
                {"value":0, "name":"- 정상 종료"},
                {"value":1, "name":"- 비정상 종료 전"},
                {"value":2, "name":"- 비정상 종료 후"},
                {"value":"deny", "name":"차단"},
                {"value":3, "name":"- 룰에 의한 차단"},
                {"value":4, "name":"- 비정상 차단"}
            ]
        });

        component.bindStore(store);
        component.setValue("pass");
    },

    onCmb_search_tracker_opmodeAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"all", "name":"All"},
                {"value":0, "name":"Internal"},
                {"value":1, "name":"External"},
                {"value":2, "name":"DMZ"}
            ]
        });

        component.bindStore(store);
        component.setValue("all");
    },

    onCmb_search_tracker_searchAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"sipv4", "name":"출발지"},
                {"value":"dipv4", "name":"목적지"},
                {"value":"service", "name":"서비스"},
                {"value":"uid", "name":"정책"},
                {"value":"country", "name":"국가코드"}
            ]
        });

        component.bindStore(store);
        component.setValue("sipv4");
    },

    onCmb_search_tracker_searchChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_tracker = this.componentStorage().pnl_search_tracker;

        var txf_search_tracker_ip = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=txf_search_tracker_ip]');
        var pnl_search_tracker_service = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=pnl_search_tracker_service]');
        var cmb_search_tracker_country = pnl_search_tracker.down('[itemId=pnl_search_tracker_setting]').down('[itemId=cmb_search_tracker_country]');

        if(newValue === 'service')
        {
            txf_search_tracker_ip.hide();
            pnl_search_tracker_service.show();
            cmb_search_tracker_country.hide();
        }
        else if(newValue === 'uid')
        {
            txf_search_tracker_ip.setFieldLabel('UID');
            txf_search_tracker_ip.show();
            pnl_search_tracker_service.hide();
            cmb_search_tracker_country.hide();
        }
        else if(newValue === 'country')
        {
            txf_search_tracker_ip.hide();
            pnl_search_tracker_service.hide();
            cmb_search_tracker_country.show();
        }
        else //if(newValue === 'sip' || newValue == 'dip')
        {
            txf_search_tracker_ip.setFieldLabel('IP');
            txf_search_tracker_ip.show();
            pnl_search_tracker_service.hide();
            cmb_search_tracker_country.hide();
        }
    },

    onCmb_search_tracker_protocolAfterRender: function(component, eOpts) {
        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":0, "name":"IP"},
                {"value":1, "name":"ICMP"},
                {"value":2, "name":"IGMP"},
                {"value":94, "name":"IPIP"},
                {"value":6, "name":"TCP"},
                {"value":17, "name":"UDP"},
                {"value":41, "name":"IPV6"},
                {"value":50, "name":"ESP"},
                {"value":51, "name":"AH"},
                {"value":58, "name":"ICMPV6"}
            ]
        });

        component.bindStore(store);
        component.setValue('선택하세요.');
    },

    onCmb_search_tracker_countryAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"AF", "name":"Afghanistan"},
                {"value":"AX", "name":"Aland Islands"},
                {"value":"AL", "name":"Albania"},
                {"value":"DZ", "name":"Algeria"},
                {"value":"AS", "name":"American Samoa"},
                {"value":"AD", "name":"Andorra"},
                {"value":"AO", "name":"Angola"},
                {"value":"AI", "name":"Anguilla"},
                {"value":"A1", "name":"Anonymous Proxy"},

                {"value":"AQ", "name":"Antarctica"},
                {"value":"AG", "name":"Antigua and Barbuda"},
                {"value":"AR", "name":"Argentina"},
                {"value":"AM", "name":"Armenia"},
                {"value":"AW", "name":"Aruba"},
                {"value":"AP", "name":"Asia/Pacific Region"},
                {"value":"AU", "name":"Australia"},
                {"value":"AT", "name":"Austria"},
                {"value":"AZ", "name":"Azerbaijan"},
                {"value":"BS", "name":"Bahamas"},

                {"value":"BH", "name":"Bahrain"},
                {"value":"BD", "name":"Bangladesh"},
                {"value":"BB", "name":"Barbados"},
                {"value":"BY", "name":"Belarus"},
                {"value":"BE", "name":"Belgium"},
                {"value":"BZ", "name":"Belize"},
                {"value":"BJ", "name":"Benin"},
                {"value":"BM", "name":"Bermuda"},
                {"value":"BT", "name":"Bhutan"},
                {"value":"BO", "name":"Bolivia"},

                {"value":"BA", "name":"Bosnia and Herzegovina"},
                {"value":"BW", "name":"Botswana"},
                {"value":"BV", "name":"Bouvet Island"},
                {"value":"BR", "name":"Brazil"},
                {"value":"IO", "name":"British Indian Ocean Territory"},
                {"value":"BN", "name":"Brunei Darussalam"},
                {"value":"BG", "name":"Bulgaria"},
                {"value":"BF", "name":"Burkina Faso"},
                {"value":"BI", "name":"Burundi"},
                {"value":"KH", "name":"Cambodia"},

                {"value":"CM", "name":"Cameroon"},
                {"value":"CA", "name":"Canada"},
                {"value":"CV", "name":"Cape Verde"},
                {"value":"KY", "name":"Cayman Islands"},
                {"value":"CF", "name":"Central African Republic"},
                {"value":"TD", "name":"Chad"},
                {"value":"CL", "name":"Chile"},
                {"value":"CN", "name":"China"},
                {"value":"CX", "name":"Christmas Island"},
                {"value":"CC", "name":"Cocos {Keeling) Islands"},

                {"value":"CO", "name":"Colombia"},
                {"value":"KM", "name":"Comoros"},
                {"value":"CG", "name":"Congo"},
                {"value":"CD", "name":"Congo, The Democratic Republic of the"},
                {"value":"CK", "name":"Cook Islands"},
                {"value":"CR", "name":"Costa Rica"},
                {"value":"CI", "name":"Cote D'Ivoire"},
                {"value":"HR", "name":"Croatia"},
                {"value":"CU", "name":"Cuba"},
                {"value":"CY", "name":"Cyprus"},

                {"value":"CZ", "name":"Czech Republic"},
                {"value":"DK", "name":"Denmark"},
                {"value":"DJ", "name":"Djibouti"},
                {"value":"DM", "name":"Dominica"},
                {"value":"DO", "name":"Dominican Republic"},
                {"value":"EC", "name":"Ecuador"},
                {"value":"EG", "name":"Egypt"},
                {"value":"SV", "name":"El Salvador"},
                {"value":"GQ", "name":"Equatorial Guinea"},
                {"value":"ER", "name":"Eritrea"},

                {"value":"EE", "name":"Estonia"},
                {"value":"ET", "name":"Ethiopia"},
                {"value":"EU", "name":"Europe"},
                {"value":"FK", "name":"Falkland Islands {Malvinas)"},
                {"value":"FO", "name":"Faroe Islands"},
                {"value":"FJ", "name":"Fiji"},
                {"value":"FI", "name":"Finland"},
                {"value":"FR", "name":"France"},
                {"value":"GF", "name":"French Guiana"},
                {"value":"PF", "name":"French Polynesia"},

                {"value":"TF", "name":"French Southern Territories"},
                {"value":"GA", "name":"Gabon"},
                {"value":"GM", "name":"Gambia"},
                {"value":"GE", "name":"Georgia"},
                {"value":"DE", "name":"Germany"},
                {"value":"GH", "name":"Ghana"},
                {"value":"GI", "name":"Gibraltar"},
                {"value":"GR", "name":"Greece"},
                {"value":"GL", "name":"Greenland"},
                {"value":"GD", "name":"Grenada"},

                {"value":"GP", "name":"Guadeloupe"},
                {"value":"GU", "name":"Guam"},
                {"value":"GT", "name":"Guatemala"},
                {"value":"GG", "name":"Guernsey"},
                {"value":"GN", "name":"Guinea"},
                {"value":"GW", "name":"Guinea-Bissau"},
                {"value":"GY", "name":"Guyana"},
                {"value":"HT", "name":"Haiti"},
                {"value":"VA", "name":"Holy See {Vatican City State)"},
                {"value":"HN", "name":"Honduras"},

                {"value":"HK", "name":"Hong Kong"},
                {"value":"HU", "name":"Hungary"},
                {"value":"IS", "name":"Iceland"},
                {"value":"IN", "name":"India"},
                {"value":"ID", "name":"Indonesia"},
                {"value":"IR", "name":"Iran, Islamic Republic of"},
                {"value":"IQ", "name":"Iraq"},
                {"value":"IE", "name":"Ireland"},
                {"value":"IM", "name":"Isle of Man"},
                {"value":"IL", "name":"Israel"},

                {"value":"IT", "name":"Italy"},
                {"value":"JM", "name":"Jamaica"},
                {"value":"JP", "name":"Japan"},
                {"value":"JE", "name":"Jersey"},
                {"value":"JO", "name":"Jordan"},
                {"value":"KZ", "name":"Kazakhstan"},
                {"value":"KE", "name":"Kenya"},
                {"value":"KI", "name":"Kiribati"},
                {"value":"KP", "name":"Korea, Democratic People's Republic of"},
                {"value":"KR", "name":"Korea, Republic of"},

                {"value":"KW", "name":"Kuwait"},
                {"value":"KG", "name":"Kyrgyzstan"},
                {"value":"LA", "name":"Lao People's Democratic Republic"},
                {"value":"LV", "name":"Latvia"},
                {"value":"LB", "name":"Lebanon"},
                {"value":"LS", "name":"Lesotho"},
                {"value":"LR", "name":"Liberia"},
                {"value":"LY", "name":"Libyan Arab Jamahiriya"},
                {"value":"LI", "name":"Liechtenstein"},
                {"value":"LT", "name":"Lithuania"},

                {"value":"LU", "name":"Luxembourg"},
                {"value":"MO", "name":"Macau"},
                {"value":"MK", "name":"Macedonia"},
                {"value":"MG", "name":"Madagascar"},
                {"value":"MW", "name":"Malawi"},
                {"value":"MY", "name":"Malaysia"},
                {"value":"MV", "name":"Maldives"},
                {"value":"ML", "name":"Mali"},
                {"value":"MT", "name":"Malta"},
                {"value":"MH", "name":"Marshall Islands"},

                {"value":"MQ", "name":"Martinique"},
                {"value":"MR", "name":"Mauritania"},
                {"value":"MU", "name":"Mauritius"},
                {"value":"YT", "name":"Mayotte"},
                {"value":"MX", "name":"Mexico"},
                {"value":"FM", "name":"Micronesia, Federated States of"},
                {"value":"MD", "name":"Moldova, Republic of"},
                {"value":"MC", "name":"Monaco"},
                {"value":"MN", "name":"Mongolia"},
                {"value":"ME", "name":"Montenegro"},

                {"value":"MS", "name":"Montserrat"},
                {"value":"MA", "name":"Morocco"},
                {"value":"MZ", "name":"Mozambique"},
                {"value":"MM", "name":"Myanmar"},
                {"value":"NA", "name":"Namibia"},
                {"value":"NR", "name":"Nauru"},
                {"value":"NP", "name":"Nepal"},
                {"value":"NL", "name":"Netherlands"},
                {"value":"AN", "name":"Netherlands Antilles"},
                {"value":"NC", "name":"New Caledonia"},

                {"value":"NZ", "name":"New Zealand"},
                {"value":"NI", "name":"Nicaragua"},
                {"value":"NE", "name":"Niger"},
                {"value":"NG", "name":"Nigeria"},
                {"value":"NU", "name":"Niue"},
                {"value":"NF", "name":"Norfolk Island"},
                {"value":"MP", "name":"Northern Mariana Islands"},
                {"value":"NO", "name":"Norway"},
                {"value":"OM", "name":"Oman"},
                {"value":"PK", "name":"Pakistan"},

                {"value":"PW", "name":"Palau"},
                {"value":"PS", "name":"Palestinian Territory, Occupied"},
                {"value":"PA", "name":"Panama"},
                {"value":"PG", "name":"Papua New Guinea"},
                {"value":"PY", "name":"Paraguay"},
                {"value":"PE", "name":"Peru"},
                {"value":"PH", "name":"Philippines"},
                {"value":"PL", "name":"Poland"},
                {"value":"PT", "name":"Portugal"},
                {"value":"PR", "name":"Puerto Rico"},

                {"value":"QA", "name":"Qatar"},
                {"value":"RE", "name":"Reunion"},
                {"value":"RO", "name":"Romania"},
                {"value":"RU", "name":"Russian Federation"},
                {"value":"RW", "name":"Rwanda"},
                {"value":"SH", "name":"Saint Helena"},
                {"value":"KN", "name":"Saint Kitts and Nevis"},
                {"value":"LC", "name":"Saint Lucia"},
                {"value":"MF", "name":"Saint Martin"},
                {"value":"PM", "name":"Saint Pierre and Miquelon"},

                {"value":"VC", "name":"Saint Vincent and the Grenadines"},
                {"value":"WS", "name":"Samoa"},
                {"value":"SM", "name":"San Marino"},
                {"value":"ST", "name":"Sao Tome and Principe"},
                {"value":"A2", "name":"Satellite Provider"},
                {"value":"SA", "name":"Saudi Arabia"},
                {"value":"SN", "name":"Senegal"},
                {"value":"RS", "name":"Serbia"},
                {"value":"SC", "name":"Seychelles"},
                {"value":"SL", "name":"Sierra Leone"},

                {"value":"SG", "name":"Singapore"},
                {"value":"SK", "name":"Slovakia"},
                {"value":"SI", "name":"Slovenia"},
                {"value":"SB", "name":"Solomon Islands"},
                {"value":"SO", "name":"Somalia"},
                {"value":"ZA", "name":"South Africa"},
                {"value":"GS", "name":"South Georgia and the South Sandwich Islands"},
                {"value":"ES", "name":"Spain"},
                {"value":"LK", "name":"Sri Lanka"},
                {"value":"SD", "name":"Sudan"},

                {"value":"SR", "name":"Suriname"},
                {"value":"SJ", "name":"Svalbard and Jan Mayen"},
                {"value":"SZ", "name":"Swaziland"},
                {"value":"SE", "name":"Sweden"},
                {"value":"CH", "name":"Switzerland"},
                {"value":"SY", "name":"Syrian Arab Republic"},
                {"value":"TW", "name":"Taiwan"},
                {"value":"TJ", "name":"Tajikistan"},
                {"value":"TZ", "name":"Tanzania, United Republic of"},
                {"value":"TH", "name":"Thailand"},

                {"value":"TL", "name":"Timor-Leste"},
                {"value":"TG", "name":"Togo"},
                {"value":"TK", "name":"Tokelau"},
                {"value":"TO", "name":"Tonga"},
                {"value":"TT", "name":"Trinidad and Tobago"},
                {"value":"TN", "name":"Tunisia"},
                {"value":"TR", "name":"Turkey"},
                {"value":"TM", "name":"Turkmenistan"},
                {"value":"TC", "name":"Turks and Caicos Islands"},
                {"value":"TV", "name":"Tuvalu"},

                {"value":"UG", "name":"Uganda"},
                {"value":"UA", "name":"Ukraine"},
                {"value":"AE", "name":"United Arab Emirates"},
                {"value":"GB", "name":"United Kingdom"},
                {"value":"US", "name":"United States"},
                {"value":"UM", "name":"United States Minor Outlying Islands"},
                {"value":"UY", "name":"Uruguay"},
                {"value":"UZ", "name":"Uzbekistan"},
                {"value":"VU", "name":"Vanuatu"},
                {"value":"VE", "name":"Venezuela"},

                {"value":"VN", "name":"Vietnam"},
                {"value":"VG", "name":"Virgin Islands, British"},
                {"value":"VI", "name":"Virgin Islands, U.S."},
                {"value":"WF", "name":"Wallis and Futuna"},
                {"value":"EH", "name":"Western Sahara"},
                {"value":"YE", "name":"Yemen"},
                {"value":"ZM", "name":"Zambia"},
                {"value":"ZW", "name":"Zimbabwe"}
            ]
        });

        component.bindStore(store);
        component.setValue('선택하세요.');



    },

    onBt_search_reportClick: function(button, e, eOpts) {

        // var gpn_xtm = this.componentStorage().gpn_xtm;
        var tpn_main = this.componentStorage().tpn_main;
        // var pnl_search_report = this.componentStorage().pnl_search_report;

        // // 트래커 종류
        // var cmb_search_report_type = pnl_search_report.down('[itemId=pnl_search_report_type]').down('[itemId=cmb_search_report_type]');

        // // 날짜/시간
        // var dtf_search_report_start = pnl_search_report.down('[itemId=pnl_search_report_time]').down('[itemId=dtf_search_report_start]');
        // var dtf_search_report_end = pnl_search_report.down('[itemId=pnl_search_report_time]').down('[itemId=dtf_search_report_end]');

        // var cmb_search_report_period = pnl_search_report.down('[itemId=pnl_search_report_time]').down('[itemId=cmb_search_report_period]');

        // var start_dt = dtf_search_report_start.value.getTime()/1000;
        // var end_dt = dtf_search_report_end.value.getTime()/1000;

        // console.log(tpn_main.getTabBar().getItems().getAt(0));

        // if(tpn_main.items.length > 0)
        // {
        //     if(tpn_main.items[0].title === '보고서')
        //         return;
        // }


        var store = new Ext.data.Store({

            autoLoad: true,
            storeId: 'id_store_report',
            proxy: {
                type: 'jsonp',
                url: 'api/ftLOG/GetReportFileList'
            },
            fields: [
                {
                    name: 'index'
                },
                {
                    name: 'type'
                },
                {
                    name: 'filename'
                }
            ],
            sorters: [{
                property: 'filename',
                direction: 'ASC'
            }]
        });

        // var dir = '/home/toor/F3V/F3Vsmc/nodeapps/ft_SMC/public/javascripts/report';

        // var filesystem = require("fs");
        //     var results = [];

        //     filesystem.readdirSync(dir).forEach(function(file) {

        //         file = dir+'/'+file;
        //         var stat = filesystem.statSync(file);

        //         if (stat && stat.isDirectory()) {
        //             results = results.concat(_getAllFilesFromFolder(file));
        //         } else results.push(file);

        //     });

        //     conole.log(results);


        var grid = Ext.create('Ext.grid.Panel', {
            id: 'id_grid_report',
            header: false,
            title: 'My Grid Panel',
            //             features: [{
            //                 ftype:'grouping',
            //                 startCollapsed: true
            //             }],
            store: 'id_store_report',
            columnLines: true,
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    align: 'center',
                    dataIndex: 'index',
                    text: 'No'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'type',
                    text: '종류'
                },
        //         {
        //             xtype: 'gridcolumn',
        //             dataIndex: 'type',
        //             text: '생성시간'
        //         },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'filename',
                    text: '파일명'
                },
                {
                    text: '다운로드',
                    renderer: function(rowIndex) {

                        var id = Ext.id();
                        Ext.defer(function() {
                            Ext.widget('button', {
                                renderTo: id,
                                text: '다운로드',
                                scale: 'small',
                                handler: function() {

                                    // 아이콘이 선택된 row Selct
                                    grid.getSelectionModel().select(rowIndex);

                                    // 선택된 row 가 존재하면
                                    if (grid.getSelectionModel().hasSelection()) {
                                        var row = grid.getSelectionModel().getSelection()[0];

                                        console.log('filename ->',row.get('filename'));

                                        var service = 'ftLOG',
                                        svc_func = 'GetExportReportFile',
                                        params = {

                                            'file_name' : Ext.encode(row.get('filename'))

                                        };

                                        request_helper.xmlrpc_call_Ajax_Post(
                                            service,
                                            svc_func,
                                            params,
                                            function(res){

                                                console.log('res ->', res);

                                                window.location = '/fileDownload?filePath=' + res;

        //                                         me.destroy();

                                            }

                                        );


                                    }

                                }

                            });
                        }, 50);
                        return Ext.String.format('<div id="{0}"></div>', id);
                    }
                }

            ]
        });

        if(tpn_main.hidden)
        {
            tpn_main.show();
        }

        tpn_main.add({

            title: '보고서',
            itemid: tpn_main.items.length,
            items: [grid],
            layout: 'fit',
            border: false,
            closable: true,
            listeners: {
                close: function(){

                    if(tpn_main.items.length === 1)
                        tpn_main.hide();

                }
            }

        }).show();
    },

    onCmb_search_report_typeAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"fw", "name":"방화벽"},
                {"value":"vpn", "name":"VPN"},
                {"value":"dpi", "name":"DPI"}
            ]
        });

        component.bindStore(store);
        component.setValue('fw');
    },

    onCmb_search_report_typeChange: function(field, newValue, oldValue, eOpts) {
        // var pnl_search_tracker = this.componentStorage().pnl_search_tracker;

        // var cmb_search_tracker_type_eth = pnl_search_stat.down('[itemId=pnl_search_tracker_type]').down('[itemId=cmb_search_tracker_type_eth]');

        // if(newValue === 'iface')
        // {
        //     cmb_search_tracker_type_eth.show();
        // }
        // else
        // {
        //     cmb_search_tracker_type_eth.hide();
        // }
    },

    onRdg_search_report_periodChange: function(field, newValue, oldValue, eOpts) {
        var pnl_search_report = this.componentStorage().pnl_search_report;

        var dtf_search_report_start = pnl_search_report.down('[itemId=pnl_search_report_time]').down('[itemId=dtf_search_report_start]');
        var dtf_search_report_end = pnl_search_report.down('[itemId=pnl_search_report_time]').down('[itemId=dtf_search_report_end]');

        console.log('newValue ->', newValue.rd_search_report_period);

        if(newValue.rd_search_report_period === 'today')
        {

            dtf_search_report_start.setEditable(false);
            dtf_search_report_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_end.setValue(today);

        }
        else if(newValue.rd_search_report_period === 'day')
        {

            dtf_search_report_start.setEditable(false);
            dtf_search_report_end.setEditable(false);

            //시작 시간
            var date = new Date(dtf_search_report_start.value.getTime());
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_start.setValue(today);

            //종료 시간
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_end.setValue(today);

        }
        else if(newValue.rd_search_report_period === 'week')
        {

            dtf_search_report_start.setEditable(false);
            dtf_search_report_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setDate(date.getDate() - 6);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_end.setValue(today);

        }
        else if(newValue.rd_search_report_period === 'month')
        {

            dtf_search_report_start.setEditable(false);
            dtf_search_report_end.setEditable(false);

            //시작 시간
            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_start.setValue(today);

            //종료 시간
            var date = new Date();
            date.setDate(date.getDate() + 1);
            date = date.setHours(0, 0, 0, 0);
            var today = Ext.Date.format(new Date(date), 'Y-m-d');

            dtf_search_report_end.setValue(today);

        }
        else if(newValue.rd_search_report_period === 'user')
        {
            dtf_search_report_start.setEditable(true);
            dtf_search_report_end.setEditable(true);
        }
    },

    onDtf_search_report_startAfterRender: function(component, eOpts) {
        var today = new Date();
        var date = new Date();

        date = date.setHours(0, 0, 0, 0);
        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);
    },

    onDtf_search_report_endAfterRender: function(component, eOpts) {
        var today = new Date();
        var date = new Date();

        date.setDate(date.getDate() + 1);
        date = date.setHours(0, 0, 0, 0);

        var today = Ext.Date.format(new Date(date), 'Y-m-d');

        component.setValue(today);
    },

    onCmb_search_report_periodAfterRender: function(component, eOpts) {

        var store = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data : [
                {"value":"1", "name":"1분"},
                {"value":"10", "name":"10분"},
                {"value":"60", "name":"1시간"}
            ]
        });

        component.bindStore(store);
        component.setValue('60');
    },

    onPnl_log_viewAfterRender: function(component, eOpts) {
        // console.log('alert2222');
    },

    componentStorage: function() {
        var obj = {};

        var topObj = Ext.getCmp('pnl_log_view');

        var log_xtm    = topObj.down('[itemId=pnl_log_xtm]');
        var log_main   = topObj.down('[itemId=pnl_log_main]');
        var log_search = topObj.down('[itemId=pnl_log_search]').down('[itemId=pnl_search]').down('[itemId=tpn_search]');


        obj.trpn_xtm = log_xtm.down('[itemId=pnl_xtm]').down('[itemId=trpn_xtm]');
        obj.gpn_xtm = log_xtm.down('[itemId=pnl_xtm]').down('[itemId=gpn_xtm]');

        obj.tpn_main = log_main.down('[itemId=pnl_main]').down('[itemId=tpn_main]');

        obj.pnl_search_log = log_search.down('[itemId=pnl_search_log]');
        obj.pnl_search_stat = log_search.down('[itemId=pnl_search_stat]');
        obj.pnl_search_tracker = log_search.down('[itemId=pnl_search_tracker]');
        obj.pnl_search_report = log_search.down('[itemId=pnl_search_report]');

        return obj;
    }

});
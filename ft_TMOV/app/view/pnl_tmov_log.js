
Ext.define('TMOV.view.pnl_tmov_log', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.chart.Chart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Column'
    ],

    border: false,
    id: 'pnl_tmov_log',
    title: '로그',
    activeTab: 0,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    title: '자료전송 로그',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            border: false,
                            id: 'gpn_tmov_file_log',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'st_tmov_file_log',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'server_name',
                                    text: '서버팜'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'court_name',
                                    text: '법인'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'emp_no',
                                    text: '아이디'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'surname',
                                    text: '이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'employytype',
                                    text: '직급'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Ext.Date.format(new Date(value*1000), 'Y-m-d H:i:s');
                                    },
                                    width: 200,
                                    dataIndex: 'rgt_dtm_ts',
                                    text: '전송일시'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === '01')
                                        return '내부';
                                        else
                                        return '외부';
                                    },
                                    width: 160,
                                    align: 'center',
                                    dataIndex: 'dat_trf_clss_cd',
                                    text: '전송방향'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'grp_cf_val',
                                    text: '꾸러미 이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'dat_trf_nm',
                                    text: '파일이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (value > 1024 * 1024 * 1024)
                                        {
                                            return parseInt((value / (1024 * 1024 * 1024)), 10) + ' GByte';
                                        }

                                        if (value > 1024 * 1024)
                                        {
                                            return parseInt((value / (1024 * 1024)), 10) + ' MByte';
                                        }

                                        if (value > 1024)
                                        {
                                            return parseInt((value / 1024), 10) + ' KByte';
                                        }

                                        return parseInt(value, 10) + ' Byte';
                                    },
                                    width: 200,
                                    dataIndex: 'filesize',
                                    text: '파일 사이즈'
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'st_tmov_file_log'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'exporterbutton',
                                                    type: 'file_log',
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
                                                    id: 'txf_file_log_server_farm',
                                                    width: 240,
                                                    fieldLabel: '서버 팜',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_file_log_court',
                                                    width: 240,
                                                    fieldLabel: '법인',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_file_log_userid',
                                                    width: 240,
                                                    fieldLabel: '아이디',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_file_log_username',
                                                    width: 240,
                                                    fieldLabel: '이름',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_file_log_search',
                                                    margin: '0 0 0 10',
                                                    width: 80,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_file_log_searchClick,
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
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_file_log_transfer',
                                                    width: 240,
                                                    fieldLabel: '전송 방향',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '내부',
                                                        '외부'
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_file_log_group',
                                                    width: 240,
                                                    fieldLabel: '꾸러미 이름',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_file_log_name',
                                                    width: 240,
                                                    fieldLabel: '파일 이름',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_file_log_range',
                                                    width: 240,
                                                    fieldLabel: '검색 기간',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '하루',
                                                        '일주일',
                                                        '한달',
                                                        '특정기간'
                                                    ],
                                                    listeners: {
                                                        change: {
                                                            fn: me.onCmb_file_log_rangeChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_file_log_start',
                                                    width: 240,
                                                    fieldLabel: '시작',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_file_log_end',
                                                    width: 240,
                                                    fieldLabel: '종료',
                                                    labelAlign: 'right',
                                                    format: 'Y-m-d'
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
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_file_stats',
                            theme: 'Sky',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'x'
                                    ],
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'y'
                                    ],
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    label: {
                                        display: 'insideEnd',
                                        field: 'y',
                                        color: '#333',
                                        'text-anchor': 'middle'
                                    },
                                    xField: 'x',
                                    yField: 'y'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        activate: {
                            fn: me.onPanelActivate,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    border: false,
                    title: '에이전트 접속 로그',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            border: false,
                            id: 'gpn_tmov_agent_log',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'st_tmov_agent_log',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'server_name',
                                    text: '서버팜'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'court_name',
                                    text: '법인'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'usr_login_id',
                                    text: '아이디'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'surname',
                                    text: '이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'employytype',
                                    text: '직급'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === '01' || value === 1)
                                        return '내부';
                                        else
                                        return '외부';
                                    },
                                    width: 160,
                                    dataIndex: 'dat_trf_clss_cd',
                                    text: '접속 서버'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Ext.Date.format(new Date(value*1000), 'Y-m-d H:i:s');
                                    },
                                    width: 150,
                                    dataIndex: 'fnl_acs_ts',
                                    text: '접속 시간',
                                    flex: 1
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'st_tmov_agent_log'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'exporterbutton',
                                                    type: 'agent_log',
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
                                                    id: 'txf_agent_log_server_farm',
                                                    width: 240,
                                                    fieldLabel: '서버 팜',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_agent_log_court',
                                                    width: 240,
                                                    fieldLabel: '법인',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_agent_log_userid',
                                                    width: 240,
                                                    fieldLabel: '아이디',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_agent_log_username',
                                                    width: 240,
                                                    fieldLabel: '이름',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_agent_log_search',
                                                    margin: '0 0 0 10',
                                                    width: 80,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_agent_log_searchClick,
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
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'txf_agent_log_server',
                                                    width: 240,
                                                    fieldLabel: '접속 서버',
                                                    labelAlign: 'right',
                                                    value: '전체',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '내부',
                                                        '외부'
                                                    ]
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_agent_log_range',
                                                    width: 240,
                                                    fieldLabel: '검색 기간',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '하루',
                                                        '일주일',
                                                        '한달',
                                                        '특정기간'
                                                    ],
                                                    listeners: {
                                                        change: {
                                                            fn: me.onCmb_agent_log_rangeChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_agent_log_start',
                                                    width: 240,
                                                    fieldLabel: '시작',
                                                    labelAlign: 'right',
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_agent_log_end',
                                                    width: 240,
                                                    fieldLabel: '종료',
                                                    labelAlign: 'right',
                                                    format: 'Y-m-d'
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
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_agent_stats',
                            theme: 'Sky',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'x'
                                    ],
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'y'
                                    ],
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    label: {
                                        display: 'insideEnd',
                                        field: 'y',
                                        color: '#333',
                                        'text-anchor': 'middle'
                                    },
                                    xField: 'x',
                                    yField: 'y'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        activate: {
                            fn: me.onPanelActivate1,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    border: false,
                    title: 'URL 리다이렉션 로그',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            border: false,
                            id: 'gpn_tmov_url_log',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'st_tmov_url_log',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'server_name',
                                    text: '서버팜'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'court_name',
                                    text: '법인'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'usr_login_id',
                                    text: '아이디'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'surname',
                                    text: '이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'employytype',
                                    text: '직급'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return Ext.Date.format(new Date(value*1000), 'Y-m-d H:i:s');
                                    },
                                    width: 200,
                                    dataIndex: 'rgt_dtm_ts',
                                    text: '등록일'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === '01' || value === 1)
                                        return '내부';
                                        else
                                        return '외부';
                                    },
                                    align: 'center',
                                    dataIndex: 'net_dscd',
                                    text: '망 구분'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === '01' || value === 1)
                                        return '요청';
                                        else if(value === '02' || value === 2)
                                        return '정상';
                                        else
                                        return '오류';
                                    },
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'trf_stcd',
                                    text: '전송 상태'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'urls',
                                    text: '전송 URL',
                                    flex: 1
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    width: 360,
                                    displayInfo: true,
                                    store: 'st_tmov_url_log'
                                },
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'exporterbutton',
                                                    format: 'excel',
                                                    type: 'url_log',
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
                                                    id: 'txf_url_log_server_farm',
                                                    width: 240,
                                                    fieldLabel: '서버 팜',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_url_log_court',
                                                    width: 240,
                                                    fieldLabel: '법인',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_url_log_userid',
                                                    width: 240,
                                                    fieldLabel: '아이디',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_url_log_username',
                                                    width: 240,
                                                    fieldLabel: '이름',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_url_log_search',
                                                    margin: '0 0 0 10',
                                                    width: 80,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_url_log_searchClick,
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
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_url_log_net_dscd',
                                                    width: 240,
                                                    fieldLabel: '망 구분',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '내부',
                                                        '외부'
                                                    ]
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_url_log_trf_stcd',
                                                    width: 240,
                                                    fieldLabel: '전송 상태',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '요청',
                                                        '정상',
                                                        '오류'
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_url_log_url',
                                                    width: 480,
                                                    fieldLabel: '전송 URL',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_url_log_range',
                                                    width: 240,
                                                    fieldLabel: '검색 기간',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    store: [
                                                        '전체',
                                                        '하루',
                                                        '일주일',
                                                        '한달',
                                                        '특정기간'
                                                    ],
                                                    listeners: {
                                                        change: {
                                                            fn: me.onCmb_url_log_rangeChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_url_log_start',
                                                    width: 240,
                                                    fieldLabel: '시작',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_url_log_end',
                                                    width: 240,
                                                    fieldLabel: '종료',
                                                    labelAlign: 'right',
                                                    editable: false,
                                                    format: 'Y-m-d'
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
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_url_stats',
                            theme: 'Sky',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'x'
                                    ],
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'y'
                                    ],
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    label: {
                                        display: 'insideEnd',
                                        field: 'y',
                                        color: '#333',
                                        'text-anchor': 'middle'
                                    },
                                    xField: 'x',
                                    yField: 'y'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        activate: {
                            fn: me.onPanelActivate2,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_file_log_searchClick: function(button, e, eOpts) {
        var userid = Ext.getCmp('txf_file_log_userid').getValue();
        var transfer = Ext.getCmp('cmb_file_log_transfer').getValue();
        var group = Ext.getCmp('txf_file_log_group').getValue();
        var file_name = Ext.getCmp('txf_file_log_name').getValue();
        var range = Ext.getCmp('cmb_file_log_range').getValue();
        var server_farm = Ext.getCmp('txf_file_log_server_farm').getValue();
        var court = Ext.getCmp('txf_file_log_court').getValue();
        var username = Ext.getCmp('txf_file_log_username').getValue();

        var query = {};

        if (server_farm !== '')
        {
            key = 'server_name';
            query[key] = {'$regex' : server_farm};
        }

        if (court !== '')
        {
            key = 'court_name';
            query[key] = {'$regex' : court};
        }

        if (username !== '')
        {
            key = 'surname';
            query[key] = {'$regex' : username};
        }

        if (userid !== '')
        {
            key = 'emp_no';
            query[key] = {'$regex' : userid};
        }

        if (transfer !== '전체')
        {
            key = 'dat_trf_clss_cd';
            if (transfer === '내부')
                query[key] = '01';
            else
                query[key] = '02';
        }

        if (group !== '')
        {
            key = 'grp_cf_val';
            query[key] = {'$regex' : group};
        }

        if (file_name !== '')
        {
            key = 'dat_trf_nm';
            query[key] = {'$regex' : file_name};
        }

        if (range !== '전체')
        {
            var end_ts = (Math.round(+new Date() / 1000));

            if (range === '하루')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400;
                key = 'rgt_dtm_ts';
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '일주일')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 7;
                key = 'rgt_dtm_ts';
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
                else if (range === '한달')
                {
                    var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 30;
                    key = 'rgt_dtm_ts';
                    query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                }
                    else if (range === '특정기간')
                    {
                        start_ts = Ext.getCmp('dt_file_log_start').value.getTime() / 1000;
                        end_ts = (Ext.getCmp('dt_file_log_end').value.getTime() / 1000) + 86400;
                        key = 'rgt_dtm_ts';
                        query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                    }

        }

        Ext.getStore('st_tmov_file_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_file_log').load();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetFileStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_file_stats').loadData(resObj);
                }
            }
        );
    },

    onCmb_file_log_rangeChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === '특정기간')
        {
            Ext.getCmp('dt_file_log_start').show();
            Ext.getCmp('dt_file_log_end').show();
        }
        else
        {
            Ext.getCmp('dt_file_log_start').hide();
            Ext.getCmp('dt_file_log_end').hide();
        }
    },

    onPanelActivate: function(component, eOpts) {
        Ext.getCmp('cmb_file_log_transfer').setValue('전체');
        Ext.getCmp('cmb_file_log_range').setValue('전체');

        Ext.getCmp('dt_file_log_start').hide();
        Ext.getCmp('dt_file_log_end').hide();

        Ext.getCmp('dt_file_log_start').setValue(new Date());
        Ext.getCmp('dt_file_log_end').setValue(new Date());

        var query = {};

        Ext.getStore('st_tmov_file_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_file_log').load();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetFileStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_file_stats').loadData(resObj);
                }
            }
        );
    },

    onBtn_agent_log_searchClick: function(button, e, eOpts) {
        var userid = Ext.getCmp('txf_agent_log_userid').getValue();
        var server = Ext.getCmp('txf_agent_log_server').getValue();
        var range = Ext.getCmp('cmb_agent_log_range').getValue();
        var server_farm = Ext.getCmp('txf_agent_log_server_farm').getValue();
        var court = Ext.getCmp('txf_agent_log_court').getValue();
        var username = Ext.getCmp('txf_agent_log_username').getValue();

        var query = {};

        if (server_farm !== '')
        {
            key = 'server_name';
            query[key] = {'$regex' : server_farm};
        }

        if (court !== '')
        {
            key = 'court_name';
            query[key] = {'$regex' : court};
        }

        if (username !== '')
        {
            key = 'surname';
            query[key] = {'$regex' : username};
        }

        if (userid !== '')
        {
            key = 'usr_login_id';
            query[key] = {'$regex' : userid};
        }

        if (server !== '전체')
        {
            if (server === '내부')
            {
                key = 'dat_trf_clss_cd';
                query[key] = '01';
            }
            else
            {
                key = 'dat_trf_clss_cd';
                query[key] = '02';
            }
        }


        if (range !== '전체')
        {
            var end_ts = (Math.round(+new Date() / 1000));
            key = 'fnl_acs_ts';

            if (range === '하루')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '일주일')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 7;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '한달')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 30;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '특정기간')
            {
                start_ts = Ext.getCmp('dt_agent_log_start').value.getTime() / 1000;
                end_ts = (Ext.getCmp('dt_agent_log_end').value.getTime() / 1000) + 86400;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
        }

        console.log(query);

        Ext.getStore('st_tmov_agent_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_agent_log').load();


        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetAgentStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_agent_stats').loadData(resObj);

                }
            }
        );
    },

    onCmb_agent_log_rangeChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === '특정기간')
        {
            Ext.getCmp('dt_agent_log_start').show();
            Ext.getCmp('dt_agent_log_end').show();
        }
        else
        {
            Ext.getCmp('dt_agent_log_start').hide();
            Ext.getCmp('dt_agent_log_end').hide();
        }
    },

    onPanelActivate1: function(component, eOpts) {
        Ext.getCmp('cmb_agent_log_range').setValue('전체');

        Ext.getCmp('dt_agent_log_start').hide();
        Ext.getCmp('dt_agent_log_end').hide();

        Ext.getCmp('dt_agent_log_start').setValue(new Date());
        Ext.getCmp('dt_agent_log_end').setValue(new Date());


        var query = {};

        Ext.getStore('st_tmov_agent_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_agent_log').load();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetAgentStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_agent_stats').loadData(resObj);

                }
            }
        );
    },

    onBtn_url_log_searchClick: function(button, e, eOpts) {
        var userid = Ext.getCmp('txf_url_log_userid').getValue();
        var net_dscd = Ext.getCmp('cmb_url_log_net_dscd').getValue();
        var trf_stcd = Ext.getCmp('cmb_url_log_trf_stcd').getValue();
        var url = Ext.getCmp('txf_url_log_url').getValue();
        var range = Ext.getCmp('cmb_url_log_range').getValue();
        var server_farm = Ext.getCmp('txf_url_log_server_farm').getValue();
        var court = Ext.getCmp('txf_url_log_court').getValue();
        var username = Ext.getCmp('txf_url_log_username').getValue();

        var query = {};

        if (server_farm !== '')
        {
            key = 'server_name';
            query[key] = {'$regex' : server_farm};
        }

        if (court !== '')
        {
            key = 'court_name';
            query[key] = {'$regex' : court};
        }

        if (username !== '')
        {
            key = 'surname';
            query[key] = {'$regex' : username};
        }

        if (userid !== '')
        {
            key = 'usr_login_id';
            query[key] = {'$regex' : userid};
        }

        if (net_dscd !== '')
        {
            if (net_dscd !== '전체')
            {
                key = 'net_dscd';

                if (net_dscd === '내부')
                    query[key] = '01';

                if (net_dscd === '외부')
                    query[key] = '02';
            }

        }

        if (trf_stcd !== '')
        {
            if (trf_stcd !== '전체')
            {
                key = 'trf_stcd';

                if (trf_stcd === '요청')
                    query[key] = '01';

                if (trf_stcd === '정상')
                    query[key] = '02';

                if (trf_stcd === '오류')
                    query[key] = '03';
            }

        }

        if (url !== '')
        {
            key = 'urls';
            query[key] = {'$regex' : url};
        }

        if (range !== '전체')
        {
            var end_ts = (Math.round(+new Date() / 1000));
            key = 'rgt_dtm_ts';

            if (range === '하루')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '일주일')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 7;
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
                else if (range === '한달')
                {
                    var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 30;
                    query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                }
                    else if (range === '특정기간')
                    {
                        start_ts = Ext.getCmp('dt_url_log_start').value.getTime() / 1000;
                        end_ts = (Ext.getCmp('dt_url_log_end').value.getTime() / 1000) + 86400;
                        query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                    }
        }

        Ext.getStore('st_tmov_url_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_url_log').load();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetUrlLogStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_url_stats').loadData(resObj);

                }
            }
        );

    },

    onCmb_url_log_rangeChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === '특정기간')
        {
            Ext.getCmp('dt_url_log_start').show();
            Ext.getCmp('dt_url_log_end').show();
        }
        else
        {
            Ext.getCmp('dt_url_log_start').hide();
            Ext.getCmp('dt_url_log_end').hide();
        }
    },

    onPanelActivate2: function(component, eOpts) {
        Ext.getCmp('cmb_url_log_range').setValue('전체');
        Ext.getCmp('cmb_url_log_net_dscd').setValue('전체');
        Ext.getCmp('cmb_url_log_trf_stcd').setValue('전체');

        Ext.getCmp('dt_url_log_start').hide();
        Ext.getCmp('dt_url_log_end').hide();

        Ext.getCmp('dt_url_log_start').setValue(new Date());
        Ext.getCmp('dt_url_log_end').setValue(new Date());


        var query = {};

        Ext.getStore('st_tmov_url_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_url_log').load();

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetUrlLogStats',
                params : {
                    query : Ext.encode(query)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_url_stats').loadData(resObj);

                }
            }
        );



    }

});
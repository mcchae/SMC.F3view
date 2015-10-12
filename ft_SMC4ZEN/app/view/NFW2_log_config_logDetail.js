
Ext.define('SMC4ZEN.view.NFW2_log_config_logDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_logdetail',

    requires: [
        'SMC4ZEN.view.NFW2_log_config_logDetailViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.Img',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_log_config_logdetail'
    },
    //cls: 'zen_body',
    id: 'NFW2_log_config_logDetail',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : '상세 설정',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    enableToggle: true,
                    iconCls: 'ic_import',
                    bind: {
                        text: '{log_file_upload}'
                    },
                    listeners: {
                        toggle: 'onButtonToggle'
                    }
                },
                {
                    xtype: 'form',
                    hidden: true,
                    id: 'upform',
                    margin: 0,
                    bodyPadding: 0,
                    items: [
                        {
                            xtype: 'container',
                            cls: 'dv_pop_inner',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'filefield',
                                    id: 'uploadFile',
                                    margin: '2 0 0 0',
                                    name: 'uploadFile',
                                    buttonConfig: {
                                        xtype: 'filebutton',
                                        cls: 'btn_b',
                                        bind: {
                                            text: '{file_find}'
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'btn_b',
                                    margin: '0 0 0 5',
                                    iconCls: 'ft_confirm_icl',
                                    bind: {
                                        text: '{confirm}'
                                    },
                                    listeners: {
                                        click: 'onButtonClick2'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'form',
            bind: {
                title: '{system}'
            },
            bodyPadding: 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_system',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_systemChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_sys_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_sys_hddRender',
                                beforerender: 'onLog_sys_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_sys_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_mailRender',
                                beforerender: 'onLog_sys_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_sys_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_sysRender',
                                beforerender: 'onLog_sys_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_sys_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_syslogRender',
                                beforerender: 'onLog_sys_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_sys_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_sys_logRender',
                                beforerender: 'onLog_sys_logBeforeRender'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'con_system',
                    margin: '5 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_sys_sys'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_backup'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_log'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_sys_admin'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_set'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_daemon'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_sys_send'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_update'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_radius'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_cert'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_sys_center'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_sys',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '시스템',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_backup',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '백업/복원',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_log',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '로그',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_admin',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '관리자',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_set',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '설정',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_send',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '정책 전송',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_daemon',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '데몬 관리',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_update',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '업데이트',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_radius',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '외부서버',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_cert',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '인증서',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_sys_center',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{network}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_network',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_networkChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_network_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_network_hddRender',
                                beforerender: 'onLog_network_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_network_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_mailRender',
                                beforerender: 'onLog_network_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_network_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_sysRender',
                                beforerender: 'onLog_network_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_network_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_syslogRender',
                                beforerender: 'onLog_network_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_network_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_network_logRender',
                                beforerender: 'onLog_network_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_network_inter'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_l2'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_network_ha'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_llcf'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_network_multi'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_checker'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_network_vrrp'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_inter',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '인터페이스',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_inter" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_inter" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_inter" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_inter" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_inter" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_interHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_l2',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'L2TP',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_l2" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_l2" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_l2" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_l2" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_l2" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_l2HeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_ha',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'HA',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_ha" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_ha" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_ha" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_ha" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_ha" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_haHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_llcf',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'LLCF',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_llcf" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_llcf" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_llcf" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_llcf" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_llcf" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_llcfHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_multi',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'MULTIPATH',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_multi" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_multi" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_multi" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_multi" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_multi" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_multiHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_checker',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'CHECKER',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_checker" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_checker" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_checker" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_checker" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_checker" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_checkerHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_network_vrrp',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'VRRP',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_hdd_network_vrrp" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_mail_network_vrrp" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_sys_network_vrrp" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_syslog_network_vrrp" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","network") />';
                                            },
                                            header: '<button id="chk_log_network_vrrp" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_network_vrrpHeaderClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{fw}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_fw',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_fwChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_fw_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_fw_hddRender',
                                beforerender: 'onLog_fw_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_fw_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_mailRender',
                                beforerender: 'onLog_fw_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_fw_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_sysRender',
                                beforerender: 'onLog_fw_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_fw_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_syslogRender',
                                beforerender: 'onLog_fw_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_fw_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_fw_logRender',
                                beforerender: 'onLog_fw_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_fw_policy'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_nat'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_fw_web'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_white'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_fw_app'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_fw_user'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_policy',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '보안 정책',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_policy" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_policy" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_policy" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_policy" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_policy" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_policyHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_nat',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'NAT64',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_nat" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_nat" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_nat" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_nat" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_nat" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_natHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_web',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '웹 필터링',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_web" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_web" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_web" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_web" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_web" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_webHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_white',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '화이트/블랙 리스트',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_white" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_white" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_white" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_white" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_white" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_whiteHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_app',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '애플리케이션',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_app" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_app" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_app" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_app" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_app" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_appHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_fw_user',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '사용자',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_hdd_fw_user" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_fw_user" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_fw_user" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_syslog_fw_user" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","fw") />';
                                            },
                                            header: '<button id="chk_log_fw_user" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_fw_userHeaderClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{ipsec_vpn}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_vpn',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_vpnChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_vpn_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_vpn_hddRender',
                                beforerender: 'onLog_vpn_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_vpn_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_mailRender',
                                beforerender: 'onLog_vpn_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_vpn_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_sysRender',
                                beforerender: 'onLog_vpn_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_vpn_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_syslogRender',
                                beforerender: 'onLog_vpn_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_vpn_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_vpn_logRender',
                                beforerender: 'onLog_vpn_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_vpn_ike'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_vpn_ipsec'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_vpn_ike',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'IKE',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_hdd_vpn_ike" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_vpn_ike" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_vpn_ike" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_syslog_vpn_ike" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_log_vpn_ike" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_vpn_ikeHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_vpn_ipsec',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'IPSec',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_hdd_vpn_ipsec" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_mail_vpn_ipsec" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_vpn_ipsec" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_syslog_vpn_ipsec" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","vpn") />';
                                            },
                                            header: '<button id="chk_log_vpn_ipsec" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_vpn_ipsecHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{ssl_vpn}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ssl',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_sslChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ssl_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ssl_hddRender',
                                beforerender: 'onLog_ssl_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ssl_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_mailRender',
                                beforerender: 'onLog_ssl_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ssl_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_sysRender',
                                beforerender: 'onLog_ssl_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_ssl_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_syslogRender',
                                beforerender: 'onLog_ssl_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ssl_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ssl_logRender',
                                beforerender: 'onLog_ssl_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_user'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_inter'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_access'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ssl_flow'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ssl_user',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '사용자 인증',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_hdd_ssl_user" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ssl_user" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ssl_user" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_syslog_ssl_user" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_log_ssl_user" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ssl_userHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ssl_inter',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '무결성 검사',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_hdd_ssl_inter" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ssl_inter" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ssl_inter" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_syslog_ssl_inter" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_log_ssl_inter" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ssl_interHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ssl_access',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '액세스',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_hdd_ssl_access" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ssl_access" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ssl_access" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_syslog_ssl_access" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_log_ssl_access" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ssl_accessHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ssl_flow',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '트래픽',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_hdd_ssl_flow" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ssl_flow" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ssl_flow" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_syslog_ssl_flow" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ssl") />';
                                            },
                                            header: '<button id="chk_log_ssl_flow" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ssl_flowHeaderClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{ips}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ips',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_ipsChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ips_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ips_hddRender',
                                beforerender: 'onLog_ips_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ips_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_mailRender',
                                beforerender: 'onLog_ips_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ips_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_sysRender',
                                beforerender: 'onLog_ips_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_ips_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_syslogRender',
                                beforerender: 'onLog_ips_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ips_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ips_logRender',
                                beforerender: 'onLog_ips_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ips_detect'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ips_scan'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ips_spoofing'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ips_pre'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ips_detect',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'IPS',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_hdd_ips_detect" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ips_detect" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ips_detect" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_syslog_ips_detect" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_log_ips_detect" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ips_detectHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ips_scan',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'PortScan',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_hdd_ips_scan" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ips_scan" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ips_scan" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_syslog_ips_scan" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_log_ips_scan" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ips_scanHeaderClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ips_spoofing',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'IP Spoofing',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_hdd_ips_spoofing" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ips_spoofing" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ips_spoofing" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_syslog_ips_spoofing" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_log_ips_spoofing" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ips_spoofingHeaderClick'
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ips_pre',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'Preprocessor',
                                            flex: 2
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="hdd_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_hdd_ips_pre" class="log_hdd_off" data-qtip="로그 저장" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'create',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="mail_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_mail_ips_pre" class="log_mail_off" data-qtip="메일 전송" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'send_mail',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="sys_'+record.data.event+'" '+checked+' disabled onclick=chk_log_detail(this,null,"'+define+'") />';
                                            },
                                            header: '<button id="chk_sys_ips_pre" class="log_sys_off" data-qtip="시스템 알림" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'system',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="syslog_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_syslog_ips_pre" class="log_syslog_off" data-qtip="SYSLOG" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'syslog',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var define = record.data.define;
                                                var checked = (value==='on')?'checked':'';
                                                return '<input type="checkbox" id="log_'+record.data.event+'" '+checked+' onclick=chk_log_detail(this,null,"'+define+'","ips") />';
                                            },
                                            header: '<button id="chk_log_ips_pre" class="log_log_off" data-qtip="WeGuardia 로그서버 2.0" style="border:none" />&nbsp;',
                                            align: 'center',
                                            dataIndex: 'smc_log',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        headerclick: 'onGrid_ips_preHeaderClick'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{ddos}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_ddos',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_ddosChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_ddos_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_ddos_hddRender',
                                beforerender: 'onLog_ddos_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_ddos_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_mailRender',
                                beforerender: 'onLog_ddos_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_ddos_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_sysRender',
                                beforerender: 'onLog_ddos_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_ddos_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_syslogRender',
                                beforerender: 'onLog_ddos_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_ddos_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_ddos_logRender',
                                beforerender: 'onLog_ddos_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_dos'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_dns'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_ddos'
                                },
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_sql'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_ddos_http'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ddos_dos',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'DoS',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ddos_dns',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'DNS',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ddos_ddos',
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'DDoS',
                                            flex: 2
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ddos_sql',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'SQL',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_ddos_http',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: 'HTTP',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{av}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_av',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_avChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_av_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_av_hddRender',
                                beforerender: 'onLog_av_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_av_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_mailRender',
                                beforerender: 'onLog_av_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_av_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_sysRender',
                                beforerender: 'onLog_av_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_av_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_syslogRender',
                                beforerender: 'onLog_av_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_av_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_av_logRender',
                                beforerender: 'onLog_av_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_av_av'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 5'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_av_av',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '안티바이러스',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            bind: {
                title: '{as}'
            },
            bodyPadding : 5,
            items: [
                {
                    xtype: 'container',
                    cls: 'fld_info_box',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'com_as',
                            value: 'low',
                            editable: false,
                            displayField: 'name',
                            valueField: 'val',
                            listeners: {
                                change: 'onCom_asChange'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_hdd_off',
                            id: 'log_as_hdd',
                            margin: '-2 0 0 10',
                            listeners: {
                                render: 'onLog_as_hddRender',
                                beforerender: 'onLog_as_hddBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_mail_off',
                            id: 'log_as_mail',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_mailRender',
                                beforerender: 'onLog_as_mailBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_sys_off',
                            id: 'log_as_sys',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_sysRender',
                                beforerender: 'onLog_as_sysBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_syslog_off',
                            id: 'log_as_syslog',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_syslogRender',
                                beforerender: 'onLog_as_syslogBeforeRender'
                            }
                        },
                        {
                            xtype: 'image',
                            cls: 'log_log_off',
                            id: 'log_as_log',
                            margin: '-2 0 0 5',
                            listeners: {
                                render: 'onLog_as_logRender',
                                beforerender: 'onLog_as_logBeforeRender'
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
                            flex: 1,
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'con_as_as'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'grid_as_as',
                                    disableSelection: true,
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'subclassfication',
                                            text: '안티스팸',
                                            flex: 2
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '0 0 0 10'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_log_config_logDetailAfterRender',
        beforeclose : 'saveData'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],

    onCom_systemChange: function(field, newValue, oldValue, eOpts) {
        
        var me = this;
        var r_list = me.r_list;

        if(newValue){

            var ar = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            for(var i=0; i<ar.length; i++){

                var store = Ext.getCmp("grid_sys_"+ar[i]).getStore();

                for(var l=0; l<store.data.length; l++)
                {
                    var define = store.data.items[l].data.define;

                    eval('r_list[define].create = r_list[define].create'+newValue+';');

                    r_list[define].send_mail = 'off';

                    eval('r_list[define].system = r_list[define].system'+newValue+';');

                    r_list[define].syslog = 'off';

                    r_list[define].smc_log = 'off';

                }

            }

            console.log('R list -> ', r_list);

            me.r_list = r_list;

            me.re_detail(['시스템'],['sys']);
        }
    },

    onLog_sys_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }
            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_sys_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_sys_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_sys_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_sys_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_sys_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["시스템"];
            var ar = ['sys'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_sys_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_sys_sysHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_sys',column.dataIndex);
    },

    onGrid_sys_backupHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_backup',column.dataIndex);
    },

    onGrid_sys_logHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_log',column.dataIndex);
    },

    onGrid_sys_adminHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_admin',column.dataIndex);
    },

    onGrid_sys_setHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_set',column.dataIndex);
    },

    onGrid_sys_sendHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_send',column.dataIndex);
    },

    onGrid_sys_daemonHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_daemon',column.dataIndex);
    },

    onGrid_sys_updateHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_update',column.dataIndex);
    },

    onGrid_sys_radiusHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_radius',column.dataIndex);
    },

    onGrid_sys_certHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_sys_cert',column.dataIndex);
    },

    onCom_networkChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['inter','l2','ha','llcf','multi','checker','vrrp'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_network_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['네트워크'],['network']);
        }
    },

    onLog_network_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_network_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_network_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_network_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_network_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar_sys = ['inter','ha','multi','l2','llcf','checker','vrrp'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar_sys.length; i++){
                var store = Ext.getCmp("grid_network_"+ar_sys[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["네트워크"];
            var ar = ['network'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_network_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_network_interHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_inter',column.dataIndex);
    },

    onGrid_network_l2HeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_l2',column.dataIndex);
    },

    onGrid_network_haHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_ha',column.dataIndex);
    },

    onGrid_network_llcfHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_llcf',column.dataIndex);
    },

    onGrid_network_multiHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_multi',column.dataIndex);
    },

    onGrid_network_checkerHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_checker',column.dataIndex);
    },

    onGrid_network_vrrpHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_network_vrrp',column.dataIndex);
    },

    onCom_fwChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['policy','nat','web','white','app','user'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['방화벽'],['fw']);
        }
    },

    onLog_fw_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_fw_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.category+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_fw_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_fw_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_fw_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_fw_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_fw_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['policy','web','app','white','nat','user'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_fw_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["방화벽"];
            var ar = ['fw'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_fw_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_fw_policyHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_policy',column.dataIndex);
    },

    onGrid_fw_natHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_nat',column.dataIndex);
    },

    onGrid_fw_webHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_web',column.dataIndex);
    },

    onGrid_fw_whiteHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_white',column.dataIndex);
    },

    onGrid_fw_appHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_app',column.dataIndex);
    },

    onGrid_fw_userHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_fw_user',column.dataIndex);
    },

    onCom_vpnChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['ike','ipsec'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['IPSecVPN'],['vpn']);
        }
    },

    onLog_vpn_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_vpn_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_vpn_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_vpn_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_vpn_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_vpn_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_vpn_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['ike','ipsec'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_vpn_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["IPSecVPN"];
            var ar = ['vpn'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_vpn_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_vpn_ikeHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_vpn_ike',column.dataIndex);
    },

    onGrid_vpn_ipsecHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_vpn_ipsec',column.dataIndex);
    },

    onCom_sslChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['user','inter','access','flow'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['SSLVPN'],['ssl']);
        }
    },

    onLog_ssl_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ssl_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ssl_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ssl_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ssl_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ssl_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_ssl_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['user','access','flow','inter'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ssl_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["SSLVPN"];
            var ar = ['ssl'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ssl_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_ssl_userHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ssl_user',column.dataIndex);
    },

    onGrid_ssl_interHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ssl_inter',column.dataIndex);
    },

    onGrid_ssl_accessHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ssl_access',column.dataIndex);
    },

    onGrid_ssl_flowHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ssl_flow',column.dataIndex);
    },

    onCom_ipsChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['detect','scan','spoofing','pre'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['IPS'],['ips']);
        }
    },

    onLog_ips_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ips_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ips_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ips_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ips_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ips_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_ips_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['detect','scan','spoofing','pre'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ips_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["IPS"];
            var ar = ['ips'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ips_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_ips_detectHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ips_detect',column.dataIndex);
    },

    onGrid_ips_scanHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ips_scan',column.dataIndex);
    },

    onGrid_ips_spoofingHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ips_spoofing',column.dataIndex);
    },

    onGrid_ips_preHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ips_pre',column.dataIndex);
    },

    onCom_ddosChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['dos','dns','ddos','sql','http'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['DDoS'],['ddos']);
        }
    },

    onLog_ddos_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_ddos_mailRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ddos_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_ddos_sysRender: function(component, eOpts) {
        /*component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            me.re_detail();
        }, component);*/
    },

    onLog_ddos_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_ddos_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_ddos_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['dos','ddos','http','dns','sql'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_ddos_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["DDoS"];
            var ar = ['ddos'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_ddos_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_ddos_dosHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ddos_dos',column.dataIndex);
    },

    onGrid_ddos_dnsHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ddos_dns',column.dataIndex);
    },

    onGrid_ddos_ddosHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ddos_ddos',column.dataIndex);
    },

    onGrid_ddos_sqlHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ddos_sql',column.dataIndex);
    },

    onGrid_ddos_httpHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_ddos_http',column.dataIndex);
    },

    onCom_avChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['av'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['안티바이러스'],['av']);
        }
    },

    onLog_av_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_av_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_av_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_av_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_av_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['av'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_av_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["안티바이러스"];
            var ar = ['av'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_av_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_av_avHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_av_av',column.dataIndex);
    },

    onCom_asChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var r_list = me.r_list;

        if(newValue){
            var ar = ['as'];

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore();
                for(var l=0; l<store.data.length; l++){
                    var define = store.data.items[l].data.define;
                    eval('r_list[define].create = r_list[define].create'+newValue+';');
                    r_list[define].send_mail = 'off';
                    eval('r_list[define].system = r_list[define].system'+newValue+';');
                    r_list[define].syslog = 'off';
                    r_list[define].smc_log = 'off';
                }
            }

            me.r_list = r_list;
            me.re_detail(['안티스팸'],['as']);
        }
    },

    onLog_as_hddRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].create = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_hddBeforeRender: function(component, eOpts) {
        component.title = __zen('log_set');
    },

    onLog_as_mailRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].send_mail = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_mailBeforeRender: function(component, eOpts) {
        component.title = __zen('send_mail');
    },

    onLog_as_sysRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].system = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_sysBeforeRender: function(component, eOpts) {
        component.title = __zen('system_alarm');
    },

    onLog_as_syslogRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].syslog = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_syslogBeforeRender: function(component, eOpts) {
        component.title = __zen('syslog');
    },

    onLog_as_logRender: function(component, eOpts) {
        component.getEl().on('click', function(eOpts) {

            var me = Ext.getCmp("NFW2_log_config_logDetail");
            var r_list = me.r_list;
            var ar = ['as'];

            var checked = (eOpts.currentTarget.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<ar.length; i++){
                var store = Ext.getCmp("grid_as_"+ar[i]).getStore().data;

                for(var l=0; l<store.items.length; l++){
                    eval('r_list["'+store.items[l].data.define+'"].smc_log = "'+checked+'"');
                }
            }

            var ar_list = ["안티스팸"];
            var ar = ['as'];
            me.re_detail(ar_list,ar);
        }, component);
    },

    onLog_as_logBeforeRender: function(component, eOpts) {
        component.title = __zen('we_logserver');
    },

    onGrid_as_asHeaderClick: function(ct, column, e, t, eOpts) {
        this.chk_title('grid_as_as',column.dataIndex);
    },

    onNFW2_log_config_logDetailAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData().log_detail_setting;

        Ext.suspendLayouts();

        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];
        var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert'];
        var ar_network = ['inter','ha','multi','l2','llcf','checker','vrrp'];
        var ar_fw = ['policy','web','app','white','nat','user'];
        var ar_vpn = ['ike','ipsec'];
        var ar_ssl = ['user','access','flow','inter'];
        var ar_ips = ['detect','scan','spoofing','pre'];
        var ar_ddos = ['dos','ddos','http','dns','sql'];
        var ar_av = ['av'];
        var ar_as = ['as'];

        for(var i = 0, max = ar.length; i < max; i++){

            eval('var arr = ar_' + ar[i] + ';');

            for(var l = 0, max = arr.length; l < max; l++){

                eval("var record = Ext.create('Ext.data.Store',{data: [],fields: ['name','category','event','create','send_mail','syslog','system','smc_log','_id']});");
                eval('Ext.getCmp("grid_'+ar[i]+'_'+arr[l]+'").bindStore(record);');

            }

        }

        var record = Ext.create('Ext.data.Store',{
            data: [{
                'name':__zen('log_create_low'),
                'val':'low'
            },{
                'name':__zen('log_create_mid'),
                'val':'mid'
            },{
                'name':__zen('log_create_high'),
                'val':'high'
            }],
            fields: ['name','val','category']
        });

        Ext.getCmp("com_system").bindStore(record);
        Ext.getCmp("com_network").bindStore(record);
        Ext.getCmp("com_fw").bindStore(record);
        Ext.getCmp("com_vpn").bindStore(record);
        Ext.getCmp("com_ssl").bindStore(record);
        Ext.getCmp("com_ips").bindStore(record);
        Ext.getCmp("com_ddos").bindStore(record);
        Ext.getCmp("com_av").bindStore(record);
        Ext.getCmp("com_as").bindStore(record);

        // View Data 컴포넌트 초기화

        if(vd){

            var r_list = {};

            for(var i in vd){
                //r_list[response.list[i].define] = response.list[i];
                r_list[vd[i].event] = vd[i];

            }

            me.r_list = r_list;

            me.data = vd;

            var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
            var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];

            me.re_detail(ar_list, ar);

        }

        Ext.resumeLayouts(true);

    },

    saveData: function(button, e, eOpts) {

        var me = this;
        var vm = me.parentObj.getViewModel();

        var r_list = me.r_list;

        var logdetail_list = [];

        for(var i in r_list){

            logdetail_list.push({

                _id: r_list[i]._id,
                category: r_list[i].category,
                createmid: r_list[i].createmid,
                createlow: r_list[i].createlow,
                subcategory: r_list[i].subcategory,
                systemlow: r_list[i].systemlow,
                syslog: r_list[i].syslog,
                event: r_list[i].event,
                create: r_list[i].create,
                createhigh: r_list[i].createhigh,
                send_mail: r_list[i].send_mail,
                system: r_list[i].system,
                systemhigh: r_list[i].systemhigh,
                smc_log: r_list[i].smc_log,
                subclassfication: r_list[i].subclassfication,
                systemmid: r_list[i].systemmid,
                define: r_list[i].define

            });

        }

        vm.set('log_detail_setting', logdetail_list);

        me.parentObj.viewState = true;

        return true; 

    },

    chk_detail: function(t, depth, define, type) {

        var me = this;

        Ext.suspendLayouts();

        var r_list = me.r_list;

        var chk = t.checked;

        if(depth && depth.indexOf('dep')!==-1){

            var ar = define.split(",");

            var _dep = depth.split("_");

            for(var a in ar){

                if(_dep[1] === "hdd" || _dep[1] === "all"){ r_list[ar[a]].create = (chk===true)?'on':'off'; }
                if(_dep[1] === "mail" || _dep[1] === "all"){ r_list[ar[a]].send_mail = (chk===true)?'on':'off'; }
                if(_dep[1] === "sys" || _dep[1] === "all"){ r_list[ar[a]].system = (chk===true)?'on':'off'; }
                if(_dep[1] === "syslog" || _dep[1] === "all"){ r_list[ar[a]].syslog = (chk===true)?'on':'off'; }
                if(_dep[1] === "log" || _dep[1] === "all"){ r_list[ar[a]].smc_log = (chk===true)?'on':'off'; }

            }

        }
        else{

            var _id = t.id.split("_");
            var _event = _id[1];

            if(_id[0] === 'cc'){

                if(_event){

                    r_list[define].create = (chk===true)?'on':'off';
                    r_list[define].send_mail = (chk===true)?'on':'off';
                    r_list[define].system = (chk===true)?'on':'off';
                    r_list[define].syslog = (chk===true)?'on':'off';
                    r_list[define].smc_log = (chk===true)?'on':'off';

                }

            }else if(_id[0] === 'hdd'){
                r_list[define].create = (chk===true)?'on':'off';
            }else if(_id[0] === 'mail'){
                r_list[define].send_mail = (chk===true)?'on':'off';
            }else if(_id[0] === 'sys'){
                r_list[define].system = (chk===true)?'on':'off';
            }else if(_id[0] === 'syslog'){
                r_list[define].syslog = (chk===true)?'on':'off';
            }else if(_id[0] === 'log'){
                r_list[define].smc_log = (chk===true)?'on':'off';
            }
        }

        var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];

        var _ar = [type];
        for(var i=0; i<ar.length; i++){
            if(ar[i] === type){
                var _ar_list = [ar_list[i]];
            }
        }

        me.re_detail(_ar_list,_ar);

        Ext.resumeLayouts(true);
    },

    chk_title: function(grid, dataIndex) {
        if(dataIndex === "name"){ return false; }
        Ext.suspendLayouts();

        var ar_list = ["시스템","네트워크","방화벽","IPSecVPN","SSLVPN","IPS","DDoS","안티바이러스","안티스팸"];
        var ar = ['sys','network','fw','vpn','ssl','ips','ddos','av','as'];

        var me = Ext.getCmp("NFW2_log_config_logDetail");
        var r_list = me.r_list;
        var store = Ext.getCmp(grid).getStore().data;
        var grid = grid.split("_");

        var _ar = [grid[1]];
        for(var i=0; i<ar.length; i++){
            if(ar[i] === grid[1]){
                var _ar_list = [ar_list[i]];
            }
        }

        if(dataIndex === "create"){
            var chk = document.getElementById("chk_hdd_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.define+'"].create = "'+checked+'";');
            }
        }else if(dataIndex === "send_mail"){
            if(grid[1] === "sys" || grid[1] === "network" || grid[1] === "av" || grid[1] === "as"){
                var chk = document.getElementById("chk_mail_"+grid[1]+"_"+grid[2]);
                var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

                for(var i=0; i<store.items.length; i++){
                    eval('r_list["'+store.items[i].data.define+'"].send_mail = "'+checked+'";');
                }
            }
        }else if(dataIndex === "system"){
            if(grid[1] === "sys" || grid[1] === "network" || grid[1] === "av" || grid[1] === "as"){
                var chk = document.getElementById("chk_sys_"+grid[1]+"_"+grid[2]);
                var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

                for(var i=0; i<store.items.length; i++){
                    eval('r_list["'+store.items[i].data.define+'"].system = "'+checked+'";');
                }
            }
        }else if(dataIndex === "syslog"){
            var chk = document.getElementById("chk_syslog_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.define+'"].syslog = "'+checked+'";');
            }
        }else if(dataIndex === "smc_log"){
            var chk = document.getElementById("chk_log_"+grid[1]+"_"+grid[2]);
            var checked = (chk.className.indexOf("off") !== -1)?"on":"off";

            for(var i=0; i<store.items.length; i++){
                eval('r_list["'+store.items[i].data.define+'"].smc_log = "'+checked+'";');
            }
        }

        me.re_detail(_ar_list,_ar);
        Ext.resumeLayouts(true);
    },

    re_detail: function(ar_list, ar) {

        var me = this;
        var r_list = me.r_list;

        Ext.suspendLayouts();

        var children = [];

        var ar_sys_list = ['시스템','관리자','정책 전송','데몬 관리','백업/복원','업데이트','로그','외부서버','설정','인증서','센터관리'];
        var ar_sys = ['sys','admin','send','daemon','backup','update','log','radius','set','cert','center'];
        var ar_network_list = ["인터페이스","HA","Multipath","L2TP","LLCF","Checker","VRRP"];
        var ar_network = ['inter','ha','multi','l2','llcf','checker','vrrp'];
        var ar_fw_list = ["보안 정책","웹 필터링","애플리케이션","화이트/블랙 리스트","NAT64","사용자"];
        var ar_fw = ['policy','web','app','white','nat','user'];
        var ar_vpn_list = ["IKE","IPSec"];
        var ar_vpn = ['ike','ipsec'];
        var ar_ssl_list = ["사용자 인증","액세스","트래픽","무결성 검사"];
        var ar_ssl = ['user','access','flow','inter'];
        var ar_ips_list = ["IPS","Portscan","IP Spoofing","Preprocessor"];
        var ar_ips = ['detect','scan','spoofing','pre'];
        var ar_ddos_list = ["DoS","DDoS","HTTP","DNS","SQL"];
        var ar_ddos = ['dos','ddos','http','dns','sql'];
        var ar_av_list = ["안티바이러스"];
        var ar_av = ['av'];
        var ar_as_list = ["안티스팸"];
        var ar_as = ['as'];

        for(var i=0; i < ar.length; i++){

            eval('var _arl = ar_'+ar[i]+';');

            for(var l=0; l<_arl.length; l++){

                eval('var _ar_'+ar[i]+'_'+_arl[l]+' = [];');

            }

        }

        for(var i in r_list){

            for(var l=0; l<ar_list.length; l++){

                if(r_list[i].category[0].trim() === ar_list[l]){

                    eval('var _ar = ar_'+ar[l]+'_list;');

                    for(var j=0; j<_ar.length; j++){

                        if(r_list[i].subcategory[0].trim() === _ar[j]){

                            eval('var _ar_sub = ar_'+ar[l]+';');

                            eval('_ar_'+ar[l]+'_'+_ar_sub[j]+'.push(r_list[i]);');

                        }

                    }

                }

            }

        }

        for(var i=0; i<ar.length; i++){

            eval('var _arl = ar_'+ar[i]+';');

            for(var l = 0; l < _arl.length; l++){

                eval('var record =  _ar_'+ar[i]+'_'+_arl[l]+';');

                if(record.length === 0){ continue; }

                var _dis = (ar[i]==='fw'||ar[i]==='vpn'||ar[i]==='ssl'||ar[i]==='ips'||ar[i]==='ddos') ? 'disabled':'';

                var _grid = 'grid_'+ar[i]+'_'+_arl[l];

                var _subcategory = record[0].subcategory;

                _sub = (__zen_locale==='ko')?_subcategory[0]:(__zen_locale==='en')?_subcategory[1]:(__zen_locale==='jp')?_subcategory[2]:'';

                var list = '<table cellspacing="0" cellpadding="3" style="height:30px;width:100%"><tr>'+
                    '<td width="30%" class="x-column-header" style="position:static">'+_sub+'</td>'+
                    '<td width="15%" class="x-column-header" style="position:static"><button id="chk_hdd_'+ar[i]+'_'+_arl[l]+'" class="log_hdd_off" title="'+__zen('log_set')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'create\')">&nbsp;</button></td>'+
                    '<td width="15%" class="x-column-header" style="position:static"><button id="chk_mail_'+ar[i]+'_'+_arl[l]+'" class="log_mail_off" title="'+__zen('send_mail')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'send_mail\')">&nbsp;</button></td>'+
                    '<td width="15%" class="x-column-header" style="position:static"><button id="chk_sys_'+ar[i]+'_'+_arl[l]+'" class="log_sys_off" title="'+__zen('system_alarm')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'system\')">&nbsp;</button></td>'+
                    '<td width="15%" class="x-column-header" style="position:static"><button id="chk_syslog_'+ar[i]+'_'+_arl[l]+'" class="log_syslog_off" title="'+__zen('syslog')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'syslog\')">&nbsp;</button></td>'+
                    '<td width="15%" class="x-column-header" style="position:static"><button id="chk_log_'+ar[i]+'_'+_arl[l]+'" class="log_log_off" title="'+__zen('we_logserver')+'" style="border:none" onclick="chk_title(\''+_grid+'\',\'smc_log\')">&nbsp;</button></td></tr>';
                
                for(var j=0; j<record.length; j++){

                    var _create = (record[j].create==='on')?"checked":"";
                    var _mail = (record[j].send_mail==='on')?"checked":"";
                    var _system = (record[j].system==='on')?"checked":"";
                    var _syslog = (record[j].syslog==='on')?"checked":"";
                    var _smc_log = (record[j].smc_log==='on')?"checked":"";
                    var _subclassfication = record[j].subclassfication;
                    var _subclass = (__zen_locale==='ko')?_subclassfication[0]:(__zen_locale==='en')?_subclassfication[1]:(__zen_locale==='jp')?_subclassfication[2]:'';

                    list += '<tr><td class="x-grid-item x-grid-cell-inner" style="border-bottom:1px solid #ededed;max-width:10px;">'+_subclass+'</td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="hdd_'+record[j].event+'" '+_create+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="mail_'+record[j].event+'" '+_mail+' '+_dis+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="sys_'+record[j].event+'" '+_system+' '+_dis+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="syslog_'+record[j].event+'" '+_syslog+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td>';
                    list += '<td align="center" style="border-bottom:1px solid #ededed"><input type="checkbox" id="log_'+record[j].event+'" '+_smc_log+' onclick="chk_log_detail(this,null,\''+record[j].event+'\',\''+ar[i]+'\')" /></td></tr>';
                }

                list +='</table>';

                var ctn_object = Ext.getCmp("con_"+ar[i]+'_'+_arl[l]);

                if(ctn_object){

                    ctn_object.update(list);

                }

            }

        }

        for(var i=0; i<ar.length; i++){

            eval('var _arl = ar_'+ar[i]+';');

            for(var l=0; l<_arl.length; l++){

                var gpn_logdetail = Ext.getCmp("grid_'+ar[i]+'_'+_arl[l]+'");

                eval('var record =  _ar_'+ar[i]+'_'+_arl[l]+';');

                if(gpn_logdetail){

                    gpn_logdetail.getStore().loadData(record);

                }

            }

        }

        for(var i=0; i<ar.length; i++){

            var l_hdd = 0, l_mail = 0, l_sys = 0, l_syslog = 0, l_log = 0, l_len = 0;

            eval("var arr = ar_"+ar[i]+";");

            for(var l=0; l<arr.length; l++){

                var record = null;
                var gpn_logobject = Ext.getCmp('grid_'+ ar[i] + '_' + arr[l]);

                if(gpn_logobject){

                    record = gpn_logobject.getStore().getData();

                }

                if(!record){

                    continue;

                }

                var k_hdd = 0, k_mail = 0, k_sys = 0, k_syslog = 0, k_log = 0;

                for(var k=0; k<record.items.length; k++){

                    var data = record.items[k].data;

                    if(data.create === "on"){ k_hdd++; l_hdd++; }

                    if(data.send_mail === "on"){ k_mail++; l_mail++; }

                    if(data.system === "on"){ k_sys++; l_sys++; }

                    if(data.syslog === "on"){ k_syslog++; l_syslog++; }

                    if(data.smc_log === "on"){ k_log++; l_log++; }

                }

                l_len += record.items.length;

                var chk_hdd = (k_hdd===record.items.length)?"log_hdd_on":"log_hdd_off";
                eval('document.getElementById("chk_hdd_'+ar[i]+'_'+arr[l]+'").className = "'+chk_hdd+'";');

                var chk_mail = (k_mail===record.items.length)?"log_mail_on":"log_mail_off";
                eval('document.getElementById("chk_mail_'+ar[i]+'_'+arr[l]+'").className = "'+chk_mail+'";');

                var chk_sys = (k_sys===record.items.length)?"log_sys_on":"log_sys_off";
                eval('document.getElementById("chk_sys_'+ar[i]+'_'+arr[l]+'").className = "'+chk_sys+'";');

                var chk_syslog = (k_syslog===record.items.length)?"log_syslog_on":"log_syslog_off";
                eval('document.getElementById("chk_syslog_'+ar[i]+'_'+arr[l]+'").className = "'+chk_syslog+'";');

                var chk_log = (k_log===record.items.length)?"log_log_on":"log_log_off";
                eval('document.getElementById("chk_log_'+ar[i]+'_'+arr[l]+'").className = "'+chk_log+'";');

            }
            var chk_hdd = (l_hdd===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_hdd").className = "log_hdd_'+chk_hdd+'";');

            var chk_mail = (l_mail===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_mail").className = "log_mail_'+chk_mail+'";');

            var chk_sys = (l_sys===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_sys").className = "log_sys_'+chk_sys+'";');

            var chk_syslog = (l_syslog===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_syslog").className = "log_syslog_'+chk_syslog+'";');

            var chk_log = (l_log===l_len)?"on":"off";
            eval('document.getElementById("log_'+ar[i]+'_log").className = "log_log_'+chk_log+'";');
        }

        me.setWidth("100%");
        Ext.resumeLayouts(true);

    }

});
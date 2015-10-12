
Ext.define('SMC4ZEN.view.pnl_xtm_mgt_report', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_mgt_reportViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.form.FieldSet'
    ],

    viewModel: {
        type: 'pnl_xtm_mgt_report'
    },
    height: 680,
    id: 'pnl_xtm_mgt_report',
    width: 800,
    bodyPadding: 10,
    title: '보고서 설정',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_mgt_reportAfterRender',
        beforeclose: 'onPnl_xtm_mgt_reportBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_report_select',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'radiogroup',
                                itemId: 'rdg_select',
                                width: 400,
                                fieldLabel: '',
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_atoz',
                                        name: 'type',
                                        boxLabel: 'A to Z 리포트',
                                        checked: true,
                                        inputValue: 'atoz'
                                    },
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_report',
                                        name: 'type',
                                        boxLabel: '일일 리포팅',
                                        inputValue: 'day'
                                    }
                                ],
                                listeners: {
                                    change: 'onRdg_selectChange'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        itemId: 'ctn_report_atoz',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'ctn_report_name',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        itemId: 'txf_name',
                                        width: 450,
                                        fieldLabel: '보고서 명',
                                        labelWidth: 70
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_report_desc',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        itemId: 'txf_desc',
                                        margin: '0, 10, 0, 0',
                                        width: 450,
                                        fieldLabel: '설명',
                                        labelWidth: 70
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_savetime',
                                        width: 200,
                                        fieldLabel: '보관기간',
                                        labelWidth: 70,
                                        editable: false,
                                        displayField: 'value',
                                        queryMode: 'local',
                                        valueField: 'value',
                                        listeners: {
                                            afterrender: 'onCmb_savetimeAfterRender'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_report_email',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        itemId: 'txf_email',
                                        margin: '0, 10, 0, 0',
                                        width: 450,
                                        fieldLabel: 'Email 설정',
                                        labelWidth: 70
                                    },
                                    {
                                        xtype: 'label',
                                        text: '세미콜론 ( ; ) 을 구분자로 계속 추가할 수 있습니다.'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_report_createtype',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_report_type',
                                        margin: '0, 10, 0, 0',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cmb_type',
                                                width: 200,
                                                fieldLabel: '생성 방법',
                                                labelWidth: 70,
                                                editable: false,
                                                displayField: 'name',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCmb_typeChange',
                                                    afterrender: 'onCmb_typeAfterRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_report_createtime',
                                        margin: '0, 0, 10, 0',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                itemId: 'rdg_report_selecttime',
                                                margin: '0, 0, 10, 0',
                                                width: 400,
                                                fieldLabel: '',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'stretch'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_day',
                                                        margin: '0, 50, 0, 0',
                                                        name: 'select',
                                                        boxLabel: '일간',
                                                        checked: true,
                                                        inputValue: 'daily'
                                                    },
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_week',
                                                        margin: '0, 50, 0, 0',
                                                        name: 'select',
                                                        boxLabel: '주간',
                                                        inputValue: 'weekly'
                                                    },
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_month',
                                                        name: 'select',
                                                        boxLabel: '월간',
                                                        inputValue: 'monthly'
                                                    }
                                                ],
                                                listeners: {
                                                    change: 'onRdg_report_selecttimeChange'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_report_selecttime',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_day',
                                                        margin: '0, 10, 0, 0',
                                                        width: 170,
                                                        fieldLabel: '생성기준',
                                                        labelWidth: 70,
                                                        editable: false,
                                                        displayField: 'name',
                                                        queryMode: 'local',
                                                        valueField: 'value',
                                                        listeners: {
                                                            afterrender: 'onCmb_dayAfterRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_time',
                                                        margin: '0, 10, 0, 0',
                                                        width: 170,
                                                        fieldLabel: '시간',
                                                        labelWidth: 70,
                                                        value: 0,
                                                        editable: false,
                                                        store: [
                                                            0,
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5,
                                                            6,
                                                            7,
                                                            8,
                                                            9,
                                                            10,
                                                            11,
                                                            12,
                                                            13,
                                                            14,
                                                            15,
                                                            16,
                                                            17,
                                                            18,
                                                            19,
                                                            20,
                                                            21,
                                                            22,
                                                            23
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '0, 0, 10, 0',
                                                text: '※ 장비에 부하를 줄 수 있는 08~19 시 를 제외한 시간을 권장합니다.'
                                            },
                                            {
                                                xtype: 'label',
                                                text: '※ 생성기준 전일 선택 시 당일 로그는 리포트에 포함되지 않습니다.'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        itemId: 'ctn_report_date',
                                        margin: '0, 0, 10, 0',
                                        layout: 'vbox',
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_report_sedate',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'dtf_start',
                                                        margin: '0, 10, 0, 0',
                                                        width: 200,
                                                        fieldLabel: '시작 날짜',
                                                        labelWidth: 70,
                                                        format: 'Y-m-d'
                                                    },
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'dtf_end',
                                                        margin: '0, 10, 0, 0',
                                                        width: 200,
                                                        fieldLabel: '종료 날짜',
                                                        labelWidth: 70,
                                                        format: 'Y-m-d'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_report_sedate2',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'datefield',
                                                        itemId: 'dtf_create',
                                                        margin: '0, 10, 0, 0',
                                                        width: 200,
                                                        fieldLabel: '생성 날짜',
                                                        labelWidth: 70,
                                                        format: 'Y-m-d'
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        flex: 1,
                                                        itemId: 'cmb_time',
                                                        width: 210,
                                                        fieldLabel: '시간',
                                                        labelWidth: 70,
                                                        value: 0,
                                                        editable: false,
                                                        store: [
                                                            0,
                                                            1,
                                                            2,
                                                            3,
                                                            4,
                                                            5,
                                                            6,
                                                            7,
                                                            8,
                                                            9,
                                                            10,
                                                            11,
                                                            12,
                                                            13,
                                                            14,
                                                            15,
                                                            16,
                                                            17,
                                                            18,
                                                            19,
                                                            20,
                                                            21,
                                                            22,
                                                            23
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'ckg_report_system',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                fieldLabel: '시스템',
                                labelWidth: 65,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_sysbasic',
                                        boxLabel: '시스템 기본 설정 현황'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_sysresource',
                                        boxLabel: '시스템 자원 사용량'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_syspolicy',
                                        boxLabel: '미참조 보안 정책 현황'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_packet',
                                        boxLabel: '패킷 분포도 사용량'
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'ckg_report_system2',
                                margin: '0, 0, 10, 70',
                                width: 400,
                                fieldLabel: '',
                                labelWidth: 65,
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_critical',
                                        boxLabel: 'Critical 레벨 로그 현황'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_report_control',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_report_tracker',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'button',
                                                itemId: 'bt_tracker',
                                                margin: '0, 10, 0, 0',
                                                width: 100,
                                                text: '트래커 설정',
                                                listeners: {
                                                    click: 'onBt_trackerClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_report_crud',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'button',
                                                itemId: 'bt_add',
                                                margin: '0, 5, 0, 0',
                                                width: 100,
                                                text: '추 가',
                                                listeners: {
                                                    click: 'onBt_addClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'bt_mod',
                                                margin: '0, 5, 0, 0',
                                                width: 100,
                                                text: '수 정',
                                                listeners: {
                                                    click: 'onBt_modClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                itemId: 'bt_del',
                                                width: 100,
                                                text: '삭 제',
                                                listeners: {
                                                    click: 'onBt_delClick'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                itemId: 'gpn_report_list',
                                title: '',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        text: '보고서명',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'desc',
                                        text: '설명',
                                        flex: 2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value['@start'] !== '' || value['@end'] !== ''){

                                                var startDate = String(value['@start']);
                                                var endDate   = String(value['@end']);

                                                var startYear = startDate.substring(0, 4);
                                                var startMon  = startDate.substring(4, 6);
                                                var startDay  = startDate.substring(6, 8);

                                                var endYear   = endDate.substring(0, 4);
                                                var endMon    = endDate.substring(4, 6);
                                                var endDay    = endDate.substring(6, 8);

                                                return startYear + '-' + startMon + '-' + startDay + ' ~ ' + endYear + '-' + endMon + '-' + endDay;
                                            }
                                            else{

                                                var timeStr = '';

                                                if(value['@cycle'] === 'daily'){

                                                    timeStr += '일간, ';

                                                }
                                                else if(value['@cycle'] === 'weekly'){

                                                    timeStr += '주간, ';

                                                }
                                                else{

                                                    timeStr += '월간, ';

                                                }

                                                timeStr += value['@time'];

                                                return timeStr;

                                            }
                                        },
                                        dataIndex: 'create',
                                        text: '리포팅 주기',
                                        flex: 1
                                    }
                                ],
                                listeners: {
                                    itemclick: 'onGpn_report_listItemClick'
                                },
                                selModel: Ext.create('Ext.selection.RowModel', {
                                    selType: 'rowmodel',
                                    mode: 'MULTI'
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        hidden: true,
                        itemId: 'ctn_report_day',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                itemId: 'ctn_report_usereport',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_use',
                                        margin: '0, 150, 0, 0',
                                        boxLabel: '일일 리포팅 사용'
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_createreport',
                                        margin: '0, 10, 0, 0',
                                        width: 300,
                                        fieldLabel: '일일 리포팅 생성 시간 설정',
                                        labelWidth: 200,
                                        value: 1,
                                        editable: false,
                                        store: [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            7,
                                            8,
                                            9,
                                            10,
                                            11,
                                            12,
                                            13,
                                            14,
                                            15,
                                            16,
                                            17,
                                            18,
                                            19,
                                            20,
                                            21,
                                            22,
                                            23,
                                            24
                                        ]
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        text: '시'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'fds_report_fw',
                                layout: 'fit',
                                title: '방화벽',
                                items: [
                                    {
                                        xtype: 'checkboxgroup',
                                        itemId: 'ckg_report_fw',
                                        margin: '10, 0, 10, 0',
                                        fieldLabel: '',
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_user',
                                                width: 200,
                                                labelWidth: 200,
                                                boxLabel: '사용자별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_destination',
                                                width: 200,
                                                labelWidth: 200,
                                                boxLabel: '목적지별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_service',
                                                width: 200,
                                                fieldLabel: '',
                                                boxLabel: '서비스별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_protocol',
                                                fieldLabel: '',
                                                boxLabel: '프로토콜별 Top10'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'fds_report_dpi',
                                layout: 'fit',
                                title: 'DPI',
                                items: [
                                    {
                                        xtype: 'checkboxgroup',
                                        itemId: 'ckg_report_dpi',
                                        margin: '10, 0, 10, 0',
                                        fieldLabel: '',
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_attack',
                                                width: 200,
                                                boxLabel: '공격자별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_attackdest',
                                                width: 200,
                                                boxLabel: '공격 목적지별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_attacktype',
                                                width: 200,
                                                fieldLabel: '',
                                                boxLabel: '공격 유형별 Top10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_attackflow',
                                                fieldLabel: '',
                                                boxLabel: '공격 Flow별 Top10'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'fds_report_system',
                                layout: 'fit',
                                title: 'System',
                                items: [
                                    {
                                        xtype: 'checkboxgroup',
                                        itemId: 'ckg_report_system',
                                        margin: '10, 0, 10, 0',
                                        fieldLabel: '',
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_interface',
                                                width: 200,
                                                boxLabel: '인터페이스별'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_resource',
                                                width: 200,
                                                boxLabel: 'CPU, Hdd, Memory, Session'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_policy',
                                                width: 200,
                                                fieldLabel: '',
                                                boxLabel: 'Hit Policy Rule'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_serious',
                                                fieldLabel: '',
                                                boxLabel: 'Serious Log'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'fds_report_url',
                                title: 'URL',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxgroup',
                                        flex: 1,
                                        itemId: 'ckg_report_url',
                                        margin: '10, 0, 10, 0',
                                        width: 400,
                                        fieldLabel: '',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_alluser',
                                                width: 200,
                                                boxLabel: 'URL 전체 사용자별 Top 10'
                                            },
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'ck_domainurl',
                                                boxLabel: 'URL 도메인별 Top 10'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onRdg_selectChange: function(field, newValue, oldValue, eOpts) {
        var atozReport = field.up().up().down('[itemId=ctn_report_atoz]');
        var dayReport  = field.up().up().down('[itemId=ctn_report_day]');

        if(newValue.type === 'atoz'){

            atozReport.setVisible(true);
            dayReport.setVisible(false);

        }
        else{

            atozReport.setVisible(false);
            dayReport.setVisible(true);

        }
    },

    onCmb_savetimeAfterRender: function(component, eOpts) {
        var day_array = [];

        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_report_savetime',
            'fields' : [
                {	'name' : 'value'	}
            ],
            'data' : function(){

                for(var i = 7, max = 90; i <= max; i++ ){

                    day_array.push({'value' : i});

                }
                return day_array;
            }()
        }));

        component.setValue(7);
    },

    onCmb_typeChange: function(field, newValue, oldValue, eOpts) {
        var ctn_createtime = field.up().up().down('[itemId=ctn_report_createtime]');
        var ctn_date       = field.up().up().down('[itemId=ctn_report_date]');
        var rdg_createtime = ctn_createtime.down('[itemId=rdg_report_selecttime]');

        if(newValue === 0){

            ctn_createtime.setVisible(true);

            ctn_date.setVisible(false);

            rdg_createtime.setValue({	'select' : 'daliy'	});

        }
        else{

            ctn_createtime.setVisible(false);

            ctn_date.setVisible(true);

        }
    },

    onCmb_typeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_report_create',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '주기 생성', 'value' : 0	},
                {	'name' : '범위 생성', 'value' : 1	}
            ]
        }));

        component.setValue(0);
    },

    onRdg_report_selecttimeChange: function(field, newValue, oldValue, eOpts) {
        var timeStore = Ext.getStore('st_report_time');
        var dayObj    = field.up().down('[itemId=ctn_report_selecttime]').down('[itemId=cmb_day]');

        if(newValue.select === 'daily'){

            var dailyArray = [];

            dailyArray.push({	'name' : '전일', 'value' : 0	});
            dailyArray.push({	'name' : '당일', 'value' : 1	});

            timeStore.loadData(dailyArray);

            dayObj.setValue(0);

        }
        else if(newValue.select === 'weekly'){

            var weeklyArray = [];

            weeklyArray.push({	'name' : '월', 'value' : 0	});
            weeklyArray.push({	'name' : '화', 'value' : 1	});
            weeklyArray.push({	'name' : '수', 'value' : 2	});
            weeklyArray.push({	'name' : '목', 'value' : 3	});
            weeklyArray.push({	'name' : '금', 'value' : 4	});
            weeklyArray.push({	'name' : '토', 'value' : 5	});
            weeklyArray.push({	'name' : '일', 'value' : 6	});

            timeStore.loadData(weeklyArray);

            dayObj.setValue(0);

        }
        else{

            var dailyArray = [];

            for(var i = 1; i <= 31; i++){

                dailyArray.push({	'name' : i, 'value' : i		});

            }

            timeStore.loadData(dailyArray);

            dayObj.setValue(1);

        }
    },

    onCmb_dayAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_report_time',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : '전일', 'value' : 0		},
                {	'name' : '당일', 'value' : 1		}
            ]
        }));

        component.setValue(0);
    },

    onBt_trackerClick: function(button, e, eOpts) {
        // onBt_trackerClick ===========================================================================================================================================================
        //
        // 일시 : 2014.11.11
        //
        // 설명 : 선택된 리포트의 트래커 설정을 변경할 수 있습니다.
        //
        // =============================================================================================================================================================================

        var reportlist = this.componentStorage().reportlist;

        if(reportlist.getSelection()){

            Ext.create('SMC4ZEN.view.win_xtm_mgt_tracker', {

                'parentObject' : this

            }).show();

        }
        else{

            Ext.Msg.show({
                title : 'WeGuardia™ SMC 2.0',
                msg  : '설정할 리포트를 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

            return;

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick ===============================================================================================================================================================
        //
        // 일시 : 2014.06.25
        //
        // 설명 : 리포트 데이터를 추가합니다.
        //
        // =============================================================================================================================================================================

        var reportStore = Ext.getStore('st_report_reportlist');

        var component   = this.componentStorage();

        if(!this.validityCheck().blankCheck(component.reportname, (component.reportselect.getValue().type === 'atoz') ? true : false)){

            return;

        }

        var obj     = {};

        obj['@cid'] = '';
        obj['@groupcid'] = '';
        obj['@num'] = 0;
        obj['@use'] = 'on';

        var createObj = {};

        // 주기 선택 시 ==================================================================================================================================================================

        if(component.createtype.getValue() === 0){

            createObj['@cycle'] = component.selectdaily.getValue().select;
            createObj['@date']  = '';

            if(component.selectdaily.getValue().select === 'weekly' || component.selectdaily.getValue().select === 'monthly'){

                createObj['@day']   = component.selectday.getValue();

            }
            else{

                createObj['@day']   = '';

            }

            createObj['@end']   = '';
            createObj['@mode']  = component.createtype.getValue();
            createObj['@start'] = '';
            createObj['@time']  = component.selecttime.getValue();
            createObj['@type']  = component.selectday.getValue();

        }
        else{

            var createDate      = component.createdate.getValue();
            var startDate       = component.startdate.getValue();
            var endDate         = component.enddate.getValue();

            var createYear      = createDate.getFullYear();
            var createMonth     = createDate.getMonth() + 1;
            var createDay       = createDate.getDate();

            var startYear       = startDate.getFullYear();
            var startMonth      = startDate.getMonth() + 1;
            var startDay        = startDate.getDate();

            var endYear         = endDate.getFullYear();
            var endMonth        = endDate.getMonth() + 1;
            var endDay          = endDate.getDate();

            createObj['@cycle'] = '';
            createObj['@date']  = Number(createYear.toString() + ((createMonth < 10) ? '0' + createMonth.toString() : createMonth.toString()) +
                                         ((createDay < 10)   ? '0' + createDay.toString()   : createDay.toString()));
            createObj['@day']   = '';
            createObj['@end']   = Number(endYear.toString() + ((endMonth < 10) ? '0' + endMonth.toString() : endMonth.toString()) +
                                         ((endDay < 10)   ? '0' + endDay.toString()   : endDay.toString()));
            createObj['@mode']  = component.createtype.getValue();
            createObj['@start'] = Number(startYear.toString() + ((startMonth < 10) ? '0' + startMonth.toString() : startMonth.toString()) +
                                         ((startDay < 10)   ? '0' + startDay.toString()   : startDay.toString()));
            createObj['@time']  = component.datetime.getValue();
            createObj['@type']  = '';

        }

        obj.create  = createObj;

        obj.desc    = component.reportdesc.getValue();
        obj.email   = component.reportemail.getValue();
        obj.name    = component.reportname.getValue();
        obj.storage = component.savetime.getValue();

        var systemObj = {};

        systemObj['@chk_basic']    = (component.sysbasic.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_critical'] = (component.syscritical.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_lasthit']  = (component.syspolicy.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_packet']   = (component.syspacket.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_usage']    = (component.sysresource.getValue() === true) ? 'on' : 'off';

        obj.system  = systemObj;

        gridData_Add(component.reportlist, obj);

        reconfigNum(component.reportlist.getStore());
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick ===============================================================================================================================================================
        //
        // 일시 : 2014.06.25
        //
        // 설명 : 리포트 데이터를 수정합니다.
        //
        // =============================================================================================================================================================================

        var reportStore = Ext.getStore('st_report_reportlist');

        var component   = this.componentStorage();

        if(!component.reportlist.getSelectionModel().getSelection().length){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '수정할 리포트 데이터를 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        if(!this.validityCheck().blankCheck(component.reportname, (component.reportselect.getValue().type === 'atoz') ? true : false)){

            return;

        }

        var obj     = {};

        obj['@use'] = 'on';

        var createObj = {};

        // 주기 선택 시 ==================================================================================================================================================================

        if(component.createtype.getValue() === 0){

            createObj['@cycle'] = component.selectdaily.getValue().select;
            createObj['@date']  = '';

            if(component.selectdaily.getValue().select === 'weekly' || component.selectdaily.getValue().select === 'monthly'){

                createObj['@day']   = component.selectday.getValue();

            }
            else{

                createObj['@day']   = '';

            }

            createObj['@end']   = '';
            createObj['@mode']  = component.createtype.getValue();
            createObj['@start'] = '';
            createObj['@time']  = component.selecttime.getValue();
            createObj['@type']  = component.selectday.getValue();

        }
        else{

            var createDate      = component.createdate.getValue();
            var startDate       = component.startdate.getValue();
            var endDate         = component.enddate.getValue();

            var createYear      = createDate.getFullYear();
            var createMonth     = createDate.getMonth() + 1;
            var createDay       = createDate.getDate();

            var startYear       = startDate.getFullYear();
            var startMonth      = startDate.getMonth() + 1;
            var startDay        = startDate.getDate();

            var endYear         = endDate.getFullYear();
            var endMonth        = endDate.getMonth() + 1;
            var endDay          = endDate.getDate();

            createObj['@cycle'] = '';
            createObj['@date']  = Number(createYear.toString() + ((createMonth < 10) ? '0' + createMonth.toString() : createMonth.toString()) +
                                         ((createDay < 10)   ? '0' + createDay.toString()   : createDay.toString()));
            createObj['@day']   = '';
            createObj['@end']   = Number(endYear.toString() + ((endMonth < 10) ? '0' + endMonth.toString() : endMonth.toString()) +
                                         ((endDay < 10)   ? '0' + endDay.toString()   : endDay.toString()));
            createObj['@mode']  = component.createtype.getValue();
            createObj['@start'] = Number(startYear.toString() + ((startMonth < 10) ? '0' + startMonth.toString() : startMonth.toString()) +
                                         ((startDay < 10)   ? '0' + startDay.toString()   : startDay.toString()));
            createObj['@time']  = component.datetime.getValue();
            createObj['@type']  = '';

        }

        obj.create  = createObj;

        obj.desc    = component.reportdesc.getValue();
        obj.email   = component.reportemail.getValue();
        obj.name    = component.reportname.getValue();
        obj.storage = component.savetime.getValue();

        var systemObj = {};

        systemObj['@chk_basic']    = (component.sysbasic.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_critical'] = (component.syscritical.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_lasthit']  = (component.syspolicy.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_packet']   = (component.syspacket.getValue() === true) ? 'on' : 'off';
        systemObj['@chk_usage']    = (component.sysresource.getValue() === true) ? 'on' : 'off';

        obj.system  = systemObj;

        selectionGrid_Mod(component.reportlist, obj);
    },

    onBt_delClick: function(button, e, eOpts) {
        // onBt_delClick ================================================================================================================================================================
        //
        // 일시 : 2014.11.11
        //
        // 설명 : 선택된 보고서를 삭제합니다.
        //
        // ==============================================================================================================================================================================

        var trackerGrid = this.componentStorage().reportlist;

        if(!trackerGrid.getSelectionModel().getSelection().length){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '삭제할 리포트 데이터를 선택하세요.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return;

        }

        selectionGrid_Del(trackerGrid);

        reconfigNum(trackerGrid.getStore());
    },

    onGpn_report_listItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_report_listItemClick ==================================================================================================================================================
        //
        // 일시 : 2014.06.25
        //
        // 설명 : 그리드 row 를 선택 시 컴포넌트를 초기화 합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        component.reportname.setValue(record.data.name);
        component.reportdesc.setValue(record.data.desc);
        component.savetime.setValue(record.data.storage);
        component.reportemail.setValue(record.data.email);

        component.createtype.setValue(record.data.create['@mode']);

        // 주기 생성 선택시 ===============================================================================================================================================================

        if(record.data.create['@mode'] === 0){

            component.selectdaily.setValue({	'select' : record.data.create['@cycle']		});

            if(record.data.create['@cycle'] === 'daily'){

                component.selectday.setValue(record.data.create['@type']);

            }
            else{

                component.selectday.setValue(record.data.create['@day']);

            }

            component.selecttime.setValue(record.data.create['@time']);

        }
        else{

            component.startdate.setValue(new Date(record.data.create['@start'].toString().substring(0, 4) +
                                                  '-' + record.data.create['@start'].toString().substring(4, 6) +
                                                  '-' + record.data.create['@start'].toString().substring(6, 8)));
            component.enddate.setValue(new Date(record.data.create['@end'].toString().substring(0, 4) +
                                                  '-' + record.data.create['@end'].toString().substring(4, 6) +
                                                  '-' + record.data.create['@end'].toString().substring(6, 8)));
            component.createdate.setValue(new Date(record.data.create['@date'].toString().substring(0, 4) +
                                                  '-' + record.data.create['@date'].toString().substring(4, 6) +
                                                  '-' + record.data.create['@date'].toString().substring(6, 8)));
            component.datetime.setValue(record.data.create['@time']);

        }

        // 시스템 체크 박스 ===============================================================================================================================================================

        component.sysbasic.setValue((record.data.system['@chk_basic'] === 'on') ? true : false);
        component.sysresource.setValue((record.data.system['@chk_usage'] === 'on') ? true : false);
        component.syspolicy.setValue((record.data.system['@chk_lasthit'] === 'on') ? true : false);
        component.syspacket.setValue((record.data.system['@chk_packet'] === 'on') ? true : false);
        component.syscritical.setValue((record.data.system['@chk_critical'] === 'on') ? true : false);
    },

    onPnl_xtm_mgt_reportAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_reportAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.06.25
        //
        // 설명 : 리포트 데이터를 그리드에 출력합니다.
        //
        // 파라미터 :
        //
        // [0] report_type
        // [1] log_setting
        // [2] manage_log_report
        //
        // =============================================================================================================================================================================

        var reportStore = Ext.getStore('st_report_reportlist');

        var componentObj = this.componentStorage();

        var deviceData = component.deviceParams;

        this.initStore();

        // 날짜 값 현재 시스템 날짜로 초기화 ================================================================================================================================================

        componentObj.startdate.setValue(new Date());
        componentObj.enddate.setValue(new Date());
        componentObj.createdate.setValue(new Date());

        // 리포트 타입 선택 ==============================================================================================================================================================

        try{

            componentObj.reportselect.setValue(	{	'type' : deviceData[0]	});

        // A to Z 리포팅 초기화 ==========================================================================================================================================================

            if(deviceData[2]){

                Ext.each(deviceData[2].report, function(reportData){

                    reportStore.add(reportData);

                });

            }

        // 일일 리포팅 초기화 =============================================================================================================================================================

            if(deviceData[1]){

                componentObj.usereport.setValue((deviceData[1].report['@chk_use'] === 'on') ? true : false);

                componentObj.daycreatetime.setValue(deviceData[1].report.hour);

                componentObj.usertop10.setValue((deviceData[1].report.traffic['@chk_sip'] === 'on') ? true : false);
                componentObj.desttop10.setValue((deviceData[1].report.traffic['@chk_dip'] === 'on') ? true : false);
                componentObj.sevtop10.setValue((deviceData[1].report.traffic['@chk_service'] === 'on') ? true : false);
                componentObj.prottop10.setValue((deviceData[1].report.traffic['@chk_protocol'] === 'on') ? true : false);

                componentObj.ethsys.setValue((deviceData[1].report.amount['@chk_interface'] === 'on') ? true : false);
                componentObj.ressys.setValue((deviceData[1].report.amount['@chk_system'] === 'on') ? true : false);
                componentObj.hitsys.setValue((deviceData[1].report.amount['@chk_policy'] === 'on') ? true : false);
                componentObj.sersys.setValue((deviceData[1].report.amount['@chk_log'] === 'on') ? true : false);

                componentObj.attusertop10.setValue((deviceData[1].report.dpi['@chk_sip'] === 'on') ? true : false);
                componentObj.attdesttop10.setValue((deviceData[1].report.dpi['@chk_dip'] === 'on') ? true : false);
                componentObj.atttypetop10.setValue((deviceData[1].report.dpi['@chk_type'] === 'on') ? true : false);
                componentObj.attflowtop10.setValue((deviceData[1].report.dpi['@chk_flow'] === 'on') ? true : false);

                componentObj.urltop10.setValue((deviceData[1].report.url['@chk_user'] === 'on') ? true : false);
                componentObj.domaintop10.setValue((deviceData[1].report.url['@chk_domain'] === 'on') ? true : false);

            }

        }
        catch(err){

            console.log('로그 리포트 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_mgt_reportBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj          = {};

        var reportselect = this.down('[itemId=ctn_report_select]').down('[itemId=rdg_select]');

        var reportname   = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_name]').down('[itemId=txf_name]');

        var reportdesc   = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_desc]').down('[itemId=txf_desc]');
        var savetime     = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_desc]').down('[itemId=cmb_savetime]');

        var reportemail  = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_email]').down('[itemId=txf_email]');

        var createtype   = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_createtype]').down('[itemId=ctn_report_type]').down('[itemId=cmb_type]');

        var selectdaily  = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_createtype]').down('[itemId=ctn_report_createtime]').down('[itemId=rdg_report_selecttime]');
        var selectday    = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_createtype]').down('[itemId=ctn_report_createtime]').down('[itemId=ctn_report_selecttime]').down('[itemId=cmb_day]');
        var selecttime   = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_createtype]').down('[itemId=ctn_report_createtime]').down('[itemId=ctn_report_selecttime]').down('[itemId=cmb_time]');

        var startdate    = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_date]').down('[itemId=ctn_report_sedate]').down('[itemId=dtf_start]');
        var enddate      = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_date]').down('[itemId=ctn_report_sedate]').down('[itemId=dtf_end]');
        var createdate   = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_date]').down('[itemId=ctn_report_sedate2]').down('[itemId=dtf_create]');
        var datetime     = this.down('[itemId=ctn_report_atoz]').down('[itemId=ctn_report_date]').down('[itemId=ctn_report_sedate2]').down('[itemId=cmb_time]');

        var sysbasic     = this.down('[itemId=ctn_report_atoz]').down('[itemId=ckg_report_system]').down('[itemId=ck_sysbasic]');
        var sysresource  = this.down('[itemId=ctn_report_atoz]').down('[itemId=ckg_report_system]').down('[itemId=ck_sysresource]');
        var syspolicy    = this.down('[itemId=ctn_report_atoz]').down('[itemId=ckg_report_system]').down('[itemId=ck_syspolicy]');
        var syspacket    = this.down('[itemId=ctn_report_atoz]').down('[itemId=ckg_report_system]').down('[itemId=ck_packet]');

        var syscritical  = this.down('[itemId=ctn_report_atoz]').down('[itemId=ckg_report_system2]').down('[itemId=ck_critical]');

        var reportlist   = this.down('[itemId=ctn_report_atoz]').down('[itemId=gpn_report_list]');

        // 일일 리포팅 ===================================================================================================================================================================

        var ctn_day      = this.down('[itemId=ctn_report_day]');

        var ctn_use      = ctn_day.down('[itemId=ctn_report_usereport]');

        var usereport    = ctn_use.down('[itemId=ck_use]');
        var daycreatetime = ctn_use.down('[itemId=cmb_createreport]');

        var fds_fw       = ctn_day.down('[itemId=fds_report_fw]');

        var usertop10    = fds_fw.down('[itemId=ckg_report_fw]').down('[itemId=ck_user]');
        var desttop10    = fds_fw.down('[itemId=ckg_report_fw]').down('[itemId=ck_destination]');
        var sevtop10     = fds_fw.down('[itemId=ckg_report_fw]').down('[itemId=ck_service]');
        var prottop10    = fds_fw.down('[itemId=ckg_report_fw]').down('[itemId=ck_protocol]');

        var fds_dpi      = ctn_day.down('[itemId=fds_report_dpi]');

        var attusertop10 = fds_dpi.down('[itemId=ckg_report_dpi]').down('[itemId=ck_attack]');
        var attdesttop10 = fds_dpi.down('[itemId=ckg_report_dpi]').down('[itemId=ck_attackdest]');
        var atttypetop10 = fds_dpi.down('[itemId=ckg_report_dpi]').down('[itemId=ck_attacktype]');
        var attflowtop10 = fds_dpi.down('[itemId=ckg_report_dpi]').down('[itemId=ck_attackflow]');

        var fds_sys      = ctn_day.down('[itemId=fds_report_system]');

        var ethsys       = fds_sys.down('[itemId=ckg_report_system]').down('[itemId=ck_interface]');
        var ressys       = fds_sys.down('[itemId=ckg_report_system]').down('[itemId=ck_resource]');
        var hitsys       = fds_sys.down('[itemId=ckg_report_system]').down('[itemId=ck_policy]');
        var sersys       = fds_sys.down('[itemId=ckg_report_system]').down('[itemId=ck_serious]');

        var fds_url      = ctn_day.down('[itemId=fds_report_url]');

        var urltop10     = fds_url.down('[itemId=ckg_report_url]').down('[itemId=ck_alluser]');
        var domaintop10  = fds_url.down('[itemId=ckg_report_url]').down('[itemId=ck_domainurl]');

        obj.reportselect = reportselect;

        obj.reportname   = reportname;

        obj.reportdesc   = reportdesc;
        obj.savetime     = savetime;

        obj.reportemail  = reportemail;

        obj.createtype   = createtype;

        obj.selectdaily  = selectdaily;
        obj.selectday    = selectday;
        obj.selecttime   = selecttime;

        obj.startdate    = startdate;
        obj.enddate      = enddate;
        obj.createdate   = createdate;
        obj.datetime     = datetime;

        obj.sysbasic     = sysbasic;
        obj.sysresource  = sysresource;
        obj.syspolicy    = syspolicy;
        obj.syspacket    = syspacket;

        obj.syscritical  = syscritical;

        obj.reportlist   = reportlist;

        obj.usereport    = usereport;
        obj.daycreatetime = daycreatetime;

        obj.usertop10    = usertop10;
        obj.desttop10    = desttop10;
        obj.sevtop10     = sevtop10;
        obj.prottop10    = prottop10;

        obj.attusertop10 = attusertop10;
        obj.attdesttop10 = attdesttop10;
        obj.atttypetop10 = atttypetop10;
        obj.attflowtop10 = attflowtop10;

        obj.ethsys       = ethsys;
        obj.ressys       = ressys;
        obj.hitsys       = hitsys;
        obj.sersys       = sersys;

        obj.urltop10     = urltop10;
        obj.domaintop10  = domaintop10;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.09
        //
        // 설명 : 리포팅 유효성 검사를 수행합니다.
        //
        // - 보고서 명만 체크합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getValue() === '' && argument){

                    Ext.Msg.show({

                        'title'   : 'WeGuardia™ SMC 2.0',
                        'msg'     : '필수 입력 항목입니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon'    : Ext.Msg.ERROR,
                        'fn'      : function(){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.06.25
        //
        // 설명 : 리포트 데이터를 저장합니다. 저장 파라미터는 [0] report_type, [1] log_setting [2] manage_log_report 입니다.
        //
        // ============================================================================================================================================================================

        var reportStore   = Ext.getStore('st_report_reportlist');

        var component     = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        deviceAllData.report_type = component.reportselect.getValue().type;

        // A to Z 데이터를 저장합니다. ===================================================================================================================================================

        var storeCount = reportStore.count();

        if(storeCount){

            if(storeCount === 1){

                if(!deviceAllData.manage_log_report){

                    deviceAllData.manage_log_report = {};

                }

                deviceAllData.manage_log_report.report = reportStore.getAt(0).data;

            }
            else{

                var storeArray = [];

                if(!deviceAllData.manage_log_report){

                    deviceAllData.manage_log_report = {};

                }

                for(var i = 0; i < storeCount; i++){

                    storeArray.push(reportStore.getAt(i).data);

                }

                deviceAllData.manage_log_report.report = storeArray;

            }

        }
        else{

        // 리포트 데이터가 있을 경우 manage_log_report 의 데이터를 null로 초기화 합니다. ======================================================================================================

            if(deviceAllData.manage_log_report){

                delete deviceAllData.manage_log_report.report;

                deviceAllData.manage_log_report = null;

            }

        }

        // 일일 리포트 데이터를 저장합니다. ================================================================================================================================================

        deviceAllData.log_setting.report['@chk_use']              = (component.usereport.getValue() === true ) ? 'on' : 'off';

        deviceAllData.log_setting.report.hour                     = Number(component.daycreatetime.getValue());

        deviceAllData.log_setting.report.traffic['@chk_sip']      = (component.usertop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.traffic['@chk_dip']      = (component.desttop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.traffic['@chk_service']  = (component.sevtop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.traffic['@chk_protocol'] = (component.prottop10.getValue() === true) ? 'on' : 'off';

        deviceAllData.log_setting.report.amount['@chk_interface'] = (component.ethsys.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.amount['@chk_system']    = (component.ressys.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.amount['@chk_policy']    = (component.hitsys.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.amount['@chk_log']       = (component.sersys.getValue() === true) ? 'on' : 'off';

        deviceAllData.log_setting.report.dpi['@chk_sip']          = (component.attusertop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.dpi['@chk_dip']          = (component.attdesttop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.dpi['@chk_type']         = (component.atttypetop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.dpi['@chk_flow']         = (component.attflowtop10.getValue() === true) ? 'on' : 'off';

        deviceAllData.log_setting.report.url['@chk_user']         = (component.urltop10.getValue() === true) ? 'on' : 'off';
        deviceAllData.log_setting.report.url['@chk_domain']       = (component.domaintop10.getValue() === true) ? 'on' : 'off';

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_reportlist = Ext.getStore('st_report_reportlist');

        st_reportlist.removeAll();

        component.reportlist.bindStore(st_reportlist);
    }

});
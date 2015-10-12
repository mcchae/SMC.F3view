
Ext.define('TMOV.view.pnl_tmov_event_log', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    border: false,
    id: 'pnl_tmov_event_log',
    layout: 'fit',
    title: '감사로그',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    border: false,
                    id: 'gpn_tmov_event_log',
                    autoScroll: true,
                    header: false,
                    title: 'My Grid Panel',
                    store: 'st_tmov_event_log',
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
                                            xtype: 'exporterbutton',
                                            tree: '',
                                            type: 'event_log',
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
                                            id: 'txf_tmov_event_log_id',
                                            fieldLabel: '관리자 아이디',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_tmov_event_log_type',
                                            fieldLabel: '로그 종류',
                                            labelAlign: 'right',
                                            editable: false,
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_tmov_event_log_subtype',
                                            fieldLabel: '행위',
                                            labelAlign: 'right',
                                            editable: false,
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_event_log_desc',
                                            fieldLabel: '상세 정보',
                                            labelAlign: 'right'
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_tmov_event_log_search',
                                            margin: '0 0 0 10',
                                            width: 80,
                                            text: '검색',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_event_log_searchClick,
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
                                            id: 'cmb_event_log_range',
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
                                                    fn: me.onCmb_event_log_rangeChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            hidden: true,
                                            id: 'dt_event_log_start',
                                            fieldLabel: '시작',
                                            labelAlign: 'right',
                                            editable: false,
                                            format: 'Y-m-d'
                                        },
                                        {
                                            xtype: 'datefield',
                                            hidden: true,
                                            id: 'dt_event_log_end',
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
                        },
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true,
                            store: 'st_tmov_event_log'
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'cr_dtm',
                            text: '생성 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'userid',
                            text: '관리자 아이디'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'logtype',
                            text: '로그 종류'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'subtype',
                            text: '행위'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 140,
                            dataIndex: 'name',
                            text: '이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'content',
                            text: '상세 정보',
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmov_event_logAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_event_log_searchClick: function(button, e, eOpts) {
        var userid = Ext.getCmp('txf_tmov_event_log_id').getValue();
        var logtype = Ext.getCmp('cmb_tmov_event_log_type').getValue();
        var subtype = Ext.getCmp('cmb_tmov_event_log_subtype').getValue();
        var content = Ext.getCmp('txf_tmov_event_log_desc').getValue();
        var range = Ext.getCmp('cmb_event_log_range').getValue();

        query = {};

        if (userid !== '')
        {
            key = 'userid';
            value = userid;
            query[key] = {'$regex' : value};
        }

        if (logtype !== '')
        {
            key = 'logtype';
            value = logtype;
            query[key] = value;
        }

        if (subtype !== '')
        {
            key = 'subtype';
            value = subtype;
            query[key] = value;
        }


        if (content !== '')
        {
            key = 'content';
            query[key] = {'$regex' : content};
        }

        if (range !== '전체')
        {
            var end_ts = (Math.round(+new Date() / 1000));

            if (range === '하루')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400;
                key = 'cr_dtm_ts';
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
            else if (range === '일주일')
            {
                var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 7;
                key = 'cr_dtm_ts';
                query[key] = {'$gte' : start_ts, '$lt' : end_ts};
            }
                else if (range === '한달')
                {
                    var start_ts = (Math.round(+new Date() / 1000)) - 86400 * 30;
                    key = 'cr_dtm_ts';
                    query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                }
                    else if (range === '특정기간')
                    {
                        start_ts = Ext.getCmp('dt_event_log_start').value.getTime() / 1000;
                        end_ts = (Ext.getCmp('dt_event_log_end').value.getTime() / 1000) + 86400;
                        key = 'cr_dtm_ts';
                        query[key] = {'$gte' : start_ts, '$lt' : end_ts};
                    }
        }


        Ext.getStore('st_tmov_event_log').getProxy().extraParams = {
            'query' : Ext.encode(query)
        };

        Ext.getStore('st_tmov_event_log').load();
    },

    onCmb_event_log_rangeChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === '특정기간')
        {
            Ext.getCmp('dt_event_log_start').show();
            Ext.getCmp('dt_event_log_end').show();
        }
        else
        {
            Ext.getCmp('dt_event_log_start').hide();
            Ext.getCmp('dt_event_log_end').hide();
        }
    },

    onPnl_tmov_event_logAfterRender: function(component, eOpts) {
        Ext.getStore('st_tmov_event_log').getProxy().extraParams = {
            'query' : Ext.encode({})
        };

        Ext.getStore('st_tmov_event_log').load();

        var log_type = [];
        log_type.push({'text' : '전체', 'value' : ''});
        log_type.push({'text' : '로그인', 'value' : '로그인'});
        log_type.push({'text' : '로그아웃', 'value' : '로그아웃'});
        log_type.push({'text' : '확장자', 'value' : '확장자'});
        log_type.push({'text' : '사용자 정책', 'value' : '사용자 정책'});
        log_type.push({'text' : '서버팜 정책', 'value' : '서버팜 정책'});
        log_type.push({'text' : '사용자 정책전송', 'value' : '사용자 정책전송'});
        log_type.push({'text' : '서버팜 정책전송', 'value' : '서버팜 정책전송'});


        var log_type_store = Ext.create('Ext.data.Store', {
            fields: ['text', 'value'],
            data : log_type
        });

        var log_type_cmbox = Ext.getCmp('cmb_tmov_event_log_type');
        log_type_cmbox.bindStore(log_type_store);
        log_type_cmbox.select(log_type_store.getAt(0));
        log_type_cmbox.updateLayout();


        var log_sub_type = [];
        log_sub_type.push({'text' : '전체', 'value' : ''});
        log_sub_type.push({'text' : '추가', 'value' : '추가'});
        log_sub_type.push({'text' : '수정', 'value' : '수정'});
        log_sub_type.push({'text' : '삭제', 'value' : '삭제'});
        log_sub_type.push({'text' : '성공', 'value' : '성공'});
        log_sub_type.push({'text' : '실패', 'value' : '실패'});

        var log_sub_type_store = Ext.create('Ext.data.Store', {
            fields: ['text', 'value'],
            data : log_sub_type
        });

        var log_sub_type_cmbox = Ext.getCmp('cmb_tmov_event_log_subtype');
        log_sub_type_cmbox.bindStore(log_sub_type_store);
        log_sub_type_cmbox.select(log_sub_type_store.getAt(0));
        log_sub_type_cmbox.updateLayout();

        Ext.getCmp('cmb_event_log_range').setValue('전체');


    }

});
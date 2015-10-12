
Ext.define('SMC.view.pnl_object_schedule', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Action',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.field.Time',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_object_schedule',
    minHeight: 600,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: '스케줄',
    maximizable: true,
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
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_schedule',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.6,
                            title: '특정 기간',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.5,
                                    itemId: 'gpn_schedule_period',
                                    margin: '0 10 10 0',
                                    autoScroll: true,
                                    title: '',
                                    store: 'st_SchedulePeriod',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 160,
                                            align: 'center',
                                            dataIndex: 'start',
                                            text: '시작',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 164,
                                            align: 'center',
                                            dataIndex: 'end',
                                            text: '끝',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_schedule"]').down('gridpanel[itemId="gpn_schedule_period"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        itemclick: {
                                            fn: me.onGpn_schedule_periodItemClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '특정 기간'
                                        },
                                        {
                                            xtype: 'container',
                                            margins: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    flex: 1,
                                                    itemId: 'dtf_period_start',
                                                    fieldLabel: '',
                                                    editable: false,
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'label',
                                                    height: 12,
                                                    margin: '0 10 0 10',
                                                    text: ' ~'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    flex: 1,
                                                    itemId: 'dtf_period_end',
                                                    fieldLabel: '',
                                                    editable: false,
                                                    format: 'Y-m-d'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var period_start = me.down('datefield[itemId="dtf_period_start"]').getSubmitValue();
                                                        var period_end = me.down('datefield[itemId="dtf_period_end"]').getSubmitValue();
                                                        var schedule_period_store = me.down('gridpanel[itemId="gpn_schedule_period"]').getStore();

                                                        if(period_start && period_end)
                                                        {
                                                            for(var i=0; i<schedule_period_store.getCount(); i++)
                                                            {
                                                                if(period_start === schedule_period_store.data.items[i].data.start && period_end === schedule_period_store.data.items[i].data.end)
                                                                {
                                                                    alertMessage('같은 특정 날짜가 이미 등록 되었습니다.');
                                                                    return false;
                                                                }
                                                            }

                                                            if(new Date(period_start) <= new Date(period_end))
                                                            {
                                                                var period_object = {
                                                                    'start': period_start,
                                                                    'end': period_end
                                                                };

                                                                schedule_period_store.add(period_object);
                                                            }
                                                            else
                                                            {
                                                                alertMessage('시작 날짜가 종료 날짜보다 늦은 날짜로 설정 될 수 없습니다.');
                                                                return false;
                                                            }
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var period_start = me.down('datefield[itemId="dtf_period_start"]').getSubmitValue();
                                                        var period_end = me.down('datefield[itemId="dtf_period_end"]').getSubmitValue();
                                                        var select_record = me.down('gridpanel[itemId="gpn_schedule_period"]').getSelectionModel().getSelection()[0];
                                                        var schedule_period_store = me.down('gridpanel[itemId="gpn_schedule_period"]').getStore();

                                                        if(period_start && period_end && select_record)
                                                        {
                                                            schedule_period_store.each(function(record,idx){

                                                                if(record.data.start === select_record.data.start && record.data.end === select_record.data.end)
                                                                {
                                                                    for(var i=0; i<schedule_period_store.getCount().length; i++)
                                                                    {
                                                                        if(period_start === schedule_period_store.data.items[i].data.start && period_end === schedule_period_store.data.items[i].data.end)
                                                                        {
                                                                            alertMessage('같은 특정 날짜가 이미 등록 되었습니다.');
                                                                            return false;
                                                                        }
                                                                    }

                                                                    if(new Date(period_start) <= new Date(period_end))
                                                                    {
                                                                        record.set('start', period_start);
                                                                        record.set('end', period_end);

                                                                        record.commit();
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('시작 날짜가 종료 날짜보다 늦은 날짜로 설정 될 수 없습니다.');
                                                                    }

                                                                    me.down('gridpanel[itemId="gpn_schedule_period"]').getView().refresh();

                                                                    return false;
                                                                }
                                                            });
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: '1 5 1 5',
                                                    maxWidth: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_schedule_period"]').getSelectionModel().getSelection()[0];
                                                        var row =  me.down('gridpanel[itemId="gpn_schedule_period"]').store.indexOf(select_record);
                                                        var schedule_period_store = me.down('gridpanel[itemId="gpn_schedule_period"]').getStore();

                                                        if(select_record)
                                                        {
                                                            schedule_period_store.each(function(record,idx){

                                                                if(record.data.start === select_record.data.start && record.data.end === select_record.data.end && idx === row){

                                                                    schedule_period_store.removeAt(idx);
                                                                    return false;
                                                                }
                                                            });

                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.6,
                            autoScroll: true,
                            title: '시간 설정',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.5,
                                    itemId: 'gpn_schedule_time',
                                    margin: '0 10 10 0',
                                    autoScroll: true,
                                    title: '',
                                    store: 'st_ScheduleTime',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 162,
                                            align: 'center',
                                            dataIndex: 'start',
                                            text: '시작',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 168,
                                            align: 'center',
                                            dataIndex: 'end',
                                            text: '끝',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_schedule"]').down('gridpanel[itemId="gpn_schedule_time"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        itemclick: {
                                            fn: me.onGpn_schedule_timeItemClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '시간 설정'
                                        },
                                        {
                                            xtype: 'container',
                                            margins: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'timefield',
                                                    flex: 1,
                                                    itemId: 'tmf_time_start',
                                                    fieldLabel: '',
                                                    value: '00:00',
                                                    typeAhead: true,
                                                    format: 'H:i',
                                                    increment: 1
                                                },
                                                {
                                                    xtype: 'label',
                                                    height: 12,
                                                    margin: '0 10 0 10',
                                                    text: ' ~'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    flex: 1,
                                                    itemId: 'tmf_time_end',
                                                    fieldLabel: '',
                                                    value: '23:59',
                                                    typeAhead: true,
                                                    format: 'H:i',
                                                    increment: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var time_start = me.down('timefield[itemId="tmf_time_start"]').getSubmitValue();
                                                        var time_end = me.down('timefield[itemId="tmf_time_end"]').getSubmitValue();
                                                        var schedule_time_store = me.down('gridpanel[itemId="gpn_schedule_time"]').getStore();

                                                        if(time_start && time_end)
                                                        {
                                                            for(var i=0; i<schedule_time_store.getCount(); i++)
                                                            {
                                                                if(time_start === schedule_time_store.data.items[i].data.start && time_end === schedule_time_store.data.items[i].data.end)
                                                                {
                                                                    alertMessage('같은 특정 날짜가 이미 등록 되었습니다.');
                                                                    return false;
                                                                }
                                                            }

                                                            if(Number(time_start.split(":").join("")) < Number(time_end.split(":").join("")))
                                                            {
                                                                var time_object = {
                                                                    'start': time_start,
                                                                    'end': time_end
                                                                };

                                                                schedule_time_store.add(time_object);
                                                            }
                                                            else
                                                            {
                                                                alertMessage('종료시간이 시작시간보다 작거나 같을 수 없습니다.');
                                                                return false;
                                                            }
                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var time_start = me.down('timefield[itemId="tmf_time_start"]').getSubmitValue();
                                                        var time_end = me.down('timefield[itemId="tmf_time_end"]').getSubmitValue();
                                                        var select_record =me.down('gridpanel[itemId="gpn_schedule_time"]').getSelectionModel().getSelection()[0];
                                                        var schedule_time_store = me.down('gridpanel[itemId="gpn_schedule_time"]').getStore();

                                                        if(time_start && time_end && select_record)
                                                        {
                                                            schedule_time_store.each(function(record,idx){

                                                                if(record.data.start === select_record.data.start && record.data.end === select_record.data.end){

                                                                    for(var i=0; i<schedule_time_store.getCount(); i++)
                                                                    {
                                                                        if(time_start === schedule_time_store.data.items[i].data.start && time_end === schedule_time_store.data.items[i].data.end)
                                                                        {
                                                                            alertMessage('같은 특정 날짜가 이미 등록 되었습니다.');
                                                                            return false;
                                                                        }
                                                                    }

                                                                    if(Number(time_start.split(":").join("")) < Number(time_end.split(":").join("")))
                                                                    {
                                                                        record.set('start', time_start);
                                                                        record.set('end', time_end);

                                                                        record.commit();
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('종료시간이 시작시간보다 작거나 같을 수 없습니다.');
                                                                    }

                                                                    me.down('gridpanel[itemId="gpn_schedule_time"]').getView().refresh();

                                                                    return false;
                                                                }
                                                            });
                                                        }

                                                    },
                                                    flex: 1,
                                                    margin: '1 5 1 5',
                                                    maxWidth: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_schedule_time"]').getSelectionModel().getSelection()[0];
                                                        var row =  me.down('gridpanel[itemId="gpn_schedule_time"]').store.indexOf(select_record);
                                                        var schedule_time_store = me.down('gridpanel[itemId="gpn_schedule_time"]').getStore();

                                                        if(select_record)
                                                        {
                                                            schedule_time_store.each(function(record,idx){

                                                                if(record.data.start === select_record.data.start && record.data.end === select_record.data.end && idx === row){

                                                                    schedule_time_store.removeAt(idx);
                                                                    return false;
                                                                }
                                                            });

                                                        }
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    flex: 1,
                                    itemId: 'ckg_week',
                                    width: 400,
                                    fieldLabel: '특정 요일',
                                    labelWidth: 60,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_sun',
                                            boxLabel: '일요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_mon',
                                            boxLabel: '월요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_tue',
                                            boxLabel: '화요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_wed',
                                            boxLabel: '수요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_thu',
                                            boxLabel: '목요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_fri',
                                            boxLabel: '금요일'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_sat',
                                            boxLabel: '토요일'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = button.up('window[itemId="pnl_object_schedule"]');

                                        Ext.create('SMC.view.pnl_object_schedule_setting').loadData(me.object.month, me.object.day);
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '특정 월/일 설정'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_schedule"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 10 1 10',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_schedule"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                beforedestroy: {
                    fn: me.onPnl_object_scheduleBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_schedule_periodItemClick: function(dataview, record, item, index, e, eOpts) {
        this.down('datefield[itemId="dtf_period_start"]').setValue(record.raw.start);
        this.down('datefield[itemId="dtf_period_end"]').setValue(record.raw.end);
    },

    onGpn_schedule_timeItemClick: function(dataview, record, item, index, e, eOpts) {
        this.down('timefield[itemId="tmf_time_start"]').setValue(record.raw.start);
        this.down('timefield[itemId="tmf_time_end"]').setValue(record.raw.end);
    },

    onPnl_object_scheduleBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        Ext.getStore('st_SchedulePeriod').removeAll();
        Ext.getStore('st_ScheduleTime').removeAll();

        me.down('datefield[itemId="dtf_period_start"]').setValue(new Date());
        me.down('datefield[itemId="dtf_period_end"]').setValue(new Date());

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        if(record.period)
        {
            Ext.each(record.period, function(data, idx){

                var period_data = {
                    'start': data.start.replace(/:/g, '-'),
                    'end': data.end.replace(/:/g, '-')
                };

                me.down('gridpanel[itemId="gpn_schedule_period"]').getStore().add(period_data);
            });
        }
        if(record.time)
        {
            Ext.each(record.time, function(data, idx){
                me.down('gridpanel[itemId="gpn_schedule_time"]').getStore().add(data);
            });
        }

        if(record.week['@chk_sun'] === "on")
        {
            me.down('checkbox[itemId="chk_sun"]').setValue(true);
        }
        if(record.week['@chk_mon'] === "on")
        {
            me.down('checkbox[itemId="chk_mon"]').setValue(true);
        }
        if(record.week['@chk_tue'] === "on")
        {
            me.down('checkbox[itemId="chk_tue"]').setValue(true);
        }
        if(record.week['@chk_wed'] === "on")
        {
            me.down('checkbox[itemId="chk_wed"]').setValue(true);
        }
        if(record.week['@chk_thu'] === "on")
        {
            me.down('checkbox[itemId="chk_thu"]').setValue(true);
        }
        if(record.week['@chk_fri'] === "on")
        {
            me.down('checkbox[itemId="chk_fri"]').setValue(true);
        }
        if(record.week['@chk_sat'] === "on")
        {
            me.down('checkbox[itemId="chk_sat"]').setValue(true);
        }

        me.object = record;

        me.show();

        if(record._locked){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '해당 객체는 ' + record._locked + '에서</br> 사용중인 객체이므로 수정할 수 없습니다.',
                buttons : Ext.Msg.OK,
                alwaysOnTop : true,
                icon : Ext.Msg.INFO

            });

            me.setTitle(me.title + ' [읽기 전용]');

            me.down('button[itemId="btn_save"]').disable();
        }
    },

    saveData: function() {
        var me = this;

        var schedule_period_store = me.down('gridpanel[itemId="gpn_schedule_period"]').getStore();
        var schedule_time_store = me.down('gridpanel[itemId="gpn_schedule_time"]').getStore();
        var schedule_period;
        var schedule_time;

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('오브젝트 이름을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        if(schedule_period_store.getCount() > 0 || schedule_time_store.getCount() > 0 ||
          me.down('checkboxgroup[itemId="ckg_week"]').getChecked().length > 0)
        {
            if(schedule_period_store.getCount() > 1)
            {
                schedule_period = [];

                schedule_period_store.each(function(record, idx){

                    var period_data = {
                        'start': record.data.start.replace(/-/g,':'),
                        'end': record.data.end.replace(/-/g,':')
                    };
                    schedule_period.push(period_data);
                });

                me.object.period = schedule_period;
            }
            else if(schedule_period_store.getCount() === 1)
            {
                schedule_period = {
                    'start': schedule_period_store.data.items[0].data.start.replace(/-/g,':'),
                    'end': schedule_period_store.data.items[0].data.end.replace(/-/g,':')
                };
                me.object.period = schedule_period;
            }
            else
            {
                me.object.period = [];
            }

            if(schedule_time_store.getCount() > 1)
            {
                schedule_time = [];

                schedule_time_store.each(function(record, idx){

                    schedule_time.push(record.data);
                });

                me.object.time = schedule_time;
            }
            else if(schedule_time_store.getCount() === 1)
            {
                schedule_time = schedule_time_store.data.items[0].data;

                me.object.time = schedule_time;
            }
            else
            {
                me.object.time = [];
            }

            var week = me.down('checkboxgroup[itemId="ckg_week"]').items.items;

            if(week)
            {
                for(var i=0; i< week.length; i++)
                {
                    if(week[i].value === true)
                        me.object.week['@' + week[i].itemId] = "on";
                    else
                        me.object.week['@' + week[i].itemId] = "off";
                }
            }
        }
        else
        {
            alertMessage('설정된 스케줄이 없습니다.');
            return false;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'chkDuplicateObject',
            {obj : Ext.encode(me.object)},
            function(response){

                if(response === true){
                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '중복되는 객체명이 존재합니다. 저장하시겠습니까?',
                        buttonText: {
                            ok     : "저장",
                            cancel : "취소"
                        },

                        buttons : Ext.Msg.OKCANCEL,
                        alwaysOnTop : true,
                        icon : Ext.Msg.INFO,
                        fn: function(buttonId) {

                            if (buttonId === "ok") {
                                request_helper.xmlrpc_call_Ajax_Post(
                                    _svc,
                                    _func,
                                    _params,
                                    function(response){

                                        if(response)
                                        {
                                            if((_func === 'addObject') && response)
                                            {
                                                me.object['@cid'] = response;
                                            }

                                            if(typeof me.closeEvent === 'function'){
                                                me.closeEvent();
                                            }

                                            me.destroy();
                                        }
                                    }
                                );
                            }
                        }
                    });
                }
                else{
                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response){

                            if(response)
                            {
                                if((_func === 'addObject') && response)
                                {
                                    me.object['@cid'] = response;
                                }

                                if(typeof me.closeEvent === 'function'){
                                    me.closeEvent();
                                }

                                me.destroy();
                            }
                        }
                    );
                }
            }
        );
    }

});
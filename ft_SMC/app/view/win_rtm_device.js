
Ext.define('SMC.view.win_rtm_device', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.button.Button'
    ],

    height: 640,
    id: 'win_rtm_device',
    maxWidth: 760,
    minWidth: 760,
    width: 760,
    autoScroll: true,
    resizable: true,
    constrainHeader: true,
    title: '장비 수정',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onId_window_gateAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_rtm_deviceDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: '기본 설정',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_ip1',
                                                    width: 300,
                                                    fieldLabel: '장비 IP'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_ip2',
                                                    width: 300,
                                                    fieldLabel: '보조 IP'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_linecheckip',
                                                    width: 300,
                                                    fieldLabel: '회선점검대상 IP'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '3 3 3 3',
                                                    text: '※ 콤마(,)로 구분하여 최대 두 개 입력 가능'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        },
                                        {
                                            xtype: 'container',
                                            height: 28,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_rtm_corp',
                                                    width: 300,
                                                    fieldLabel: '법인 구분',
                                                    value: 'NH_BANK',
                                                    editable: false,
                                                    displayField: 'corp',
                                                    queryMode: 'local',
                                                    store: 'st_rtm_corp',
                                                    valueField: 'code'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ck_rpm',
                                                    boxLabel: 'WeGuardia RPM 상태 점검'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: 'RTM 서버 정보',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_id',
                                                    width: 300,
                                                    fieldLabel: 'ID'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_password',
                                                    width: 300,
                                                    fieldLabel: 'Password',
                                                    inputType: 'password'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 40
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    id: 'txt_updatetime',
                                                    width: 300,
                                                    fieldLabel: '정보 갱신 주기'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 12,
                                    width: 10
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: '인터페이스',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: '인터페이스',
                                                    emptyText: 'Select interface ...',
                                                    editable: false,
                                                    displayField: 'eth',
                                                    store: 'st_rtm_interface',
                                                    valueField: 'inputValue',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onComboboxChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_rtm_device_interface',
                                                    width: 260,
                                                    store: 'st_rtm_interface_list',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 200,
                                                            dataIndex: 'eth',
                                                            text: '검사할 인터페이스 목록'
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        var store = Ext.getStore('st_rtm_interface_list');
                                                                        store.removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
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
                                    xtype: 'container',
                                    height: 12,
                                    width: 10
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    height: 12,
                                    width: 10
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: '회선 대역폭',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: '인터페이스',
                                                    emptyText: 'Select interface ...',
                                                    editable: false,
                                                    displayField: 'eth',
                                                    store: 'st_rtm_bandwidth',
                                                    valueField: 'inputValue',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onComboboxChange1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    id: 'gpn_rtm_device_bandwidth',
                                                    width: 260,
                                                    store: 'st_rtm_bandwidth_list',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 200,
                                                            dataIndex: 'eth',
                                                            text: '검사할 인터페이스 목록'
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        var store = Ext.getStore('st_rtm_bandwidth_list');
                                                                        store.removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
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
                                    xtype: 'container',
                                    height: 12,
                                    width: 10
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    title: '점검제외 설정',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txt_except_msg',
                                                    width: 660,
                                                    fieldLabel: '점검 제외시 알람 문구',
                                                    labelWidth: 140
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ck_except_date',
                                                    boxLabel: '점검제외 기간설정'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 60
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_except_start',
                                                    width: 300,
                                                    fieldLabel: '시작 날짜',
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: 'dt_except_end',
                                                    width: 300,
                                                    fieldLabel: '종료 날짜',
                                                    format: 'Y-m-d'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 38
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 12
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    id: 'ck_except_time',
                                                    boxLabel: '점검제외 시간설정'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 60
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    id: 'tp_except_start',
                                                    width: 300,
                                                    fieldLabel: '시작 시간',
                                                    format: 'H:i',
                                                    increment: 30
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 20
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    id: 'tp_except_end',
                                                    width: 300,
                                                    fieldLabel: '종료 시간',
                                                    format: 'H:i',
                                                    increment: 30
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 38
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 8
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 28,
                    layout: 'table',
                    items: [
                        {
                            xtype: 'container',
                            width: 260
                        },
                        {
                            xtype: 'button',
                            height: 28,
                            width: 100,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 40,
                            layout: 'fit'
                        },
                        {
                            xtype: 'button',
                            height: 28,
                            width: 100,
                            text: '취소',
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
        });

        me.callParent(arguments);
    },

    onId_window_gateAfterRender: function(component, eOpts) {
        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');

        if (pnl_smc_device_center.taskObj)
        {
            clearInterval(pnl_smc_device_center.taskObj);
        }

        var grid = Ext.getCmp('gpn_rtm_devicelist');
        this.cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

        Ext.Ajax.request(
            {
                url : 'api/ftRTM/SeekDeviceInfo',
                params :
                {
                    cid : Ext.encode(Ext.getCmp('gpn_rtm_devicelist').getSelectionModel().getSelection()[0].raw['@cid'])
                },
                success : function(res_data)
                {
                    var item = JSON.parse(res_data.responseText);

                    Ext.getCmp('txt_ip1').setValue(item.gate_ip);
                    Ext.getCmp('txt_ip2').setValue(item.ip2);
                    Ext.getCmp('txt_id').setValue(item.id);
                    Ext.getCmp('txt_password').setValue(item.pwd);
                    Ext.getCmp('txt_updatetime').setValue(item.updatetime);
                    Ext.getCmp('txt_except_msg').setValue(item.except_msg);
                    Ext.getCmp('ck_rpm').setValue(item.rpm_use);
                    Ext.getCmp('txt_linecheckip').setValue(item.linecheckip);

                    if (item.start_date !== 0 && item.end_date !== 0)
                    {
                        year = parseInt(item.start_date / 10000, 10);
                        month = parseInt(((item.start_date - (year * 10000)) / 100), 10);
                        day = item.start_date - (year * 10000) - (month * 100);

                        if (month < 10)
                            month = '0' + month;

                        if (day < 10)
                            day = '0' + day;

                        start_date = '20' + year + '-' + month + '-' + day;

                        Ext.getCmp('dt_except_start').setValue(start_date);

                        year = parseInt(item.end_date / 10000, 10);
                        month = parseInt(((item.end_date - (year * 10000)) / 100), 10);
                        day = item.end_date - (year * 10000) - (month * 100);

                        if (month < 10)
                            month = '0' + month;

                        if (day < 10)
                            day = '0' + day;

                        end_date = '20' + year + '-' + month + '-' + day;

                        Ext.getCmp('dt_except_end').setValue(end_date);
                        Ext.getCmp('ck_except_date').setValue(true);
                    }
                    else
                    {
                        Ext.getCmp('dt_except_start').setValue(new Date());
                        Ext.getCmp('dt_except_end').setValue(new Date());
                    }

                    if (item.start_time !== 0 || item.end_time !== 0)
                    {
                        if (item.start_time === 0)
                        {
                            start_time = '00:00';
                        }
                        else
                        {
                            hour = parseInt(item.start_time / 60, 10);
                            minute = item.start_time - (hour * 60);

                            if (hour < 10)
                                hour = '0'+hour;

                            if (minute < 10)
                                minute = '0'+minute;

                            start_time = hour + ':' + minute;
                        }


                        hour = parseInt(item.end_time / 60, 10);
                        minute = item.end_time - (hour * 60);

                        if (hour < 10)
                            hour = '0'+hour;

                        if (minute < 10)
                            minute = '0'+minute;

                        end_time = hour + ':' + minute;

                        Ext.getCmp('tp_except_start').setValue(start_time);
                        Ext.getCmp('tp_except_end').setValue(end_time);
                        Ext.getCmp('ck_except_time').setValue(true);
                    }
                    else
                    {
                        Ext.getCmp('tp_except_start').setValue('00:00');
                        Ext.getCmp('tp_except_end').setValue('23:59');
                    }
                    var checkNet = item.check_net;
                    var store_iface = Ext.getStore('st_rtm_interface_list');
                    store_iface.loadData([],false);

                    if(checkNet - 128 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth7', 'inputValue' : 128 });
                        checkNet -= 128;
                    }

                    if(checkNet - 64 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth6', 'inputValue' : 64 });
                        checkNet -= 64;
                    }

                    if(checkNet - 32 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth5', 'inputValue' : 32 });
                        checkNet -= 32;
                    }

                    if(checkNet - 16 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth4', 'inputValue' : 16 });
                        checkNet -= 16;
                    }

                    if(checkNet - 8 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth3', 'inputValue' : 8 });
                        checkNet -= 8;
                    }

                    if(checkNet - 4 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth2', 'inputValue' : 4 });
                        checkNet -= 4;
                    }

                    if(checkNet - 2 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth1', 'inputValue' : 2 });
                        checkNet -= 2;
                    }

                    if(checkNet - 1 >= 0)
                    {
                        store_iface.add({ 'eth' : 'eth0', 'inputValue' : 1 });
                        checkNet -= 1;
                    }

                    var bandNet = item.bandwidth;
                    var store_band = Ext.getStore('st_rtm_bandwidth_list');
                    store_band.loadData([],false);

                    if(bandNet - 128 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth7', 'inputValue' : 128 });
                        bandNet -= 128;
                    }

                    if(bandNet - 64 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth6', 'inputValue' : 64 });
                        bandNet -= 64;
                    }

                    if(bandNet - 32 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth5', 'inputValue' : 32 });
                        bandNet -= 32;
                    }

                    if(bandNet - 16 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth4', 'inputValue' : 16 });
                        bandNet -= 16;
                    }

                    if(bandNet - 8 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth3', 'inputValue' : 8 });
                        bandNet -= 8;
                    }

                    if(bandNet - 4 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth2', 'inputValue' : 4 });
                        bandNet -= 4;
                    }

                    if(bandNet - 2 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth1', 'inputValue' : 2 });
                        bandNet -= 2;
                    }

                    if(bandNet - 1 >= 0)
                    {
                        store_band.add({ 'eth' : 'eth0', 'inputValue' : 1 });
                        bandNet -= 1;
                    }

                    Ext.getCmp('cmb_rtm_corp').setValue(item.corp);
                }
            }
        );



    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        var store = Ext.getStore('st_rtm_interface_list');

        for (var i in store.data.items)
        {
            if (store.data.items[i].raw.eth === field.rawValue)
            {
                Ext.Msg.alert('경고','같은 인터페이스가 이미 등록되었습니다.');
                return;
            }
        }

        store.add({ 'eth' : field.rawValue, 'inputValue' : newValue});
    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        var store = Ext.getStore('st_rtm_bandwidth_list');

        for (var i in store.data.items)
        {
            if (store.data.items[i].raw.eth === field.rawValue)
            {
                Ext.Msg.alert('경고','같은 인터페이스가 이미 등록되었습니다.');
                return;
            }
        }

        store.add({ 'eth' : field.rawValue, 'inputValue' : newValue});
    },

    onButtonClick1: function(button, e, eOpts) {
        var checkNet = 0;
        var bandNet = 0;
        var ip1 = Ext.getCmp('txt_ip1').getValue();
        var ip2 = Ext.getCmp('txt_ip2').getValue();

        var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        var i;

        if (re.test(ip1))
        {
            var parts = ip1.split(".");

            for (i=0; i<parts.length; i++)
            {
                if (parseInt(parseFloat(parts[i]), 10) > 255)
                {
                    Ext.Msg.alert('WeGuardia SMC2.0', '장비IP주소가 올바르지 않습니다.');
                    return false;
                }
            }
        }
        else
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '장비IP주소가 올바르지 않습니다.');
            return false;
        }

        if (re.test(ip2))
        {
            var parts = ip2.split(".");

            for (i=0; i<parts.length; i++)
            {
                if (parseInt(parseFloat(parts[i]), 10) > 255)
                {
                    Ext.Msg.alert('WeGuardia SMC2.0', '보조IP주소가 올바르지 않습니다.');
                    return false;
                }
            }
        }
        else
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '보조IP주소가 올바르지 않습니다.');
            return false;
        }

        if(ip1 === '0.0.0.0')
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '장비IP주소는 0.0.0.0으로 설정 할 수 없습니다.');
            return false;
        }

        var user_id = Ext.getCmp('txt_id').getValue();
        var pwd = Ext.getCmp('txt_password').getValue();
        var updatetime = Ext.getCmp('txt_updatetime').getValue();

        if (!user_id)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '계정은 필수 입력 항목입니다.');
            return false;
        }

        if (!pwd)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '패스워드는 필수 입력 항목입니다.');
            return false;
        }

        if(updatetime <= 0 || !updatetime || updatetime > 61)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '갱신 주기는 1~60 사이의 정수만 입력이 가능합니다.');
            return false;
        }


        var st_interface = Ext.getStore('st_rtm_interface_list');

        for (var i in st_interface.data.items)
        {
            checkNet += (st_interface.data.items[i].raw.inputValue);
        }

        if (checkNet === 0)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '인터페이스는 최소한 1개 이상 선택하셔야 합니다.');
            return false;
        }

        var st_bandwidth = Ext.getStore('st_rtm_bandwidth_list');

        for (var i in st_bandwidth.data.items)
        {
            bandNet += (st_bandwidth.data.items[i].raw.inputValue);
        }

        var except_msg = Ext.getCmp('txt_except_msg').getValue();
        var rpm = Ext.getCmp('ck_rpm').getValue();

        var isDate = Ext.getCmp('ck_except_date').getValue();
        var isTime = Ext.getCmp('ck_except_time').getValue();

        var start_date;
        var end_date;
        var start_time;
        var end_time;

        var linecheckip = Ext.getCmp('txt_linecheckip').getValue();

        if (isDate === true)
        {
            if( Ext.getCmp('dt_except_end').getValue() === undefined || Ext.getCmp('dt_except_start').getValue() === undefined)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '점검 제외 기간이 잘못되었습니다.');
                return false;
            }

            if( Ext.getCmp('dt_except_end').getValue().getTime() < Ext.getCmp('dt_except_start').getValue().getTime())
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '점검 제외 기간이 잘못되었습니다.');
                return false;
            }

            start_date = Ext.getCmp('dt_except_start').getSubmitValue();
            end_date = Ext.getCmp('dt_except_end').getSubmitValue();


            start_date = start_date.replace(/-/g, '');
            start_date = start_date - 20000000;

            end_date = end_date.replace(/-/g, '');
            end_date = end_date - 20000000;
        }
        else
        {
            start_date = 0;
            end_date = 0;
        }


        if (isTime === true)
        {

            if (Ext.getCmp('tp_except_start').getValue() === null || Ext.getCmp('tp_except_end').getValue() === null)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '점검 제외 시간이 잘못되었습니다.');
                return false;
            }

            if( Ext.getCmp('tp_except_end').getValue().getTime() <= Ext.getCmp('tp_except_start').getValue().getTime())
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '점검 제외 시간이 잘못되었습니다.');
                return false;
            }

            start_time = Ext.getCmp('tp_except_start').getSubmitValue();
            end_time = Ext.getCmp('tp_except_end').getSubmitValue();

            start_time = start_time.replace(/:/g, '');
            hour = parseInt(start_time / 100, 10);
            minute = start_time - (hour * 100);
            hour = hour * 60;
            start_time = hour + minute;

            end_time = end_time.replace(/:/g, '');
            hour = parseInt(end_time / 100, 10);
            minute = end_time - (hour * 100);
            hour = hour * 60;
            end_time = hour + minute;
        }
        else
        {
            start_time = 0;
            end_time = 0;
        }

        var corp = Ext.getCmp('cmb_rtm_corp').getValue();
        var corp_record = Ext.getCmp('cmb_rtm_corp').findRecord(Ext.getCmp('cmb_rtm_corp').valueField || Ext.getCmp('cmb_rtm_corp').displayField, corp);

        if(ip1 && ip2 && user_id && pwd && updatetime && checkNet)
        {
            Ext.data.JsonP.request(
                {
                    url : '/api/ftRTM/ModifyDeviceInfo',
                    params : {
                        cid: Ext.encode(this.cid),
                        ip1: Ext.encode(ip1),
                        ip2: Ext.encode(ip2),
                        userid: Ext.encode(user_id),
                        pwd: Ext.encode(pwd),
                        updatetime: updatetime,
                        checknet: checkNet,
                        bandwidth: bandNet,
                        start_date : start_date,
                        end_date : end_date,
                        start_time : start_time,
                        end_time : end_time,
                        except_msg : Ext.encode(except_msg),
                        rpm_use : Ext.encode(rpm),
                        corp : Ext.encode(corp_record.data.code),
                        linecheckip : Ext.encode(linecheckip)
                    },
                    success : function(res_data)
                    {

                    },
                    failure : function(res_data)
                    {
                        Ext.Msg.alert('Weguardia RTM2.0 Client','장비 수정 에러 발생');
                    }
                }
            );

        }
        else
        {
            Ext.Msg.alert('Weguardia RTM2.0 Client','필수 장비 정보가 입력되지 않았습니다');
        }


        Ext.data.JsonP.request(
            {
                url : '/api/ftRtmMsgMgr/ModifyDeviceInfo',
                params : {
                    cid: Ext.encode(this.cid),
                    ip1: Ext.encode(ip1),
                    ip2: Ext.encode(ip2),
                    userid: Ext.encode(user_id),
                    pwd: Ext.encode(pwd),
                    updatetime: updatetime,
                    checknet: checkNet,
                    bandwidth: bandNet,
                    start_date : start_date,
                    end_date : end_date,
                    start_time : start_time,
                    end_time : end_time,
                    except_msg : Ext.encode(except_msg),
                    rpm_use : Ext.encode(rpm),
                    corp : Ext.encode(corp_record.data.code),
                    linecheckip : Ext.encode(linecheckip)
                },
                success : function(res_data)
                {

                },
                failure : function(res_data)
                {
                    Ext.Msg.alert('Weguardia RTM2.0 Client','장비 수정 에러 발생');
                }
            });


        Ext.getCmp('win_rtm_device').destroy();
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_rtm_device').destroy();
    },

    onWin_rtm_deviceDestroy: function(component, eOpts) {
        Ext.getCmp('pnl_rtm_main').timer_tick();
    }

});
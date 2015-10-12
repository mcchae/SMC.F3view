
Ext.define('SMC4ZEN.view.win_rtm_setting', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_rtm_settingViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number'
    ],

    viewModel: {
        type: 'win_rtm_setting'
    },
    id: 'win_rtm_setting',
    resizable: false,
    width: 418,
    bodyPadding: 5,
    title: '환경설정',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            itemId: 'tpn_rtm_setting',
            margin: '0, 0, 5, 0',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    bodyPadding: 5,
                    title: 'NMS 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'NMS 설정',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_nms_pc1_use',
                                    fieldLabel: '사용'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_nms_pc1_trap',
                                    fieldLabel: 'Trap 모드'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id: 'txt_nms_pc1_ip',
                                    fieldLabel: 'IP 주소'
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    id: 'txt_nms_pc1_port',
                                    fieldLabel: '포트 번호',
                                    maxValue: 65535
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: '보조 NMS 설정',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_nms_pc2_use',
                                    fieldLabel: '사용'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_nms_pc2_trap',
                                    fieldLabel: 'Trap 모드'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id: 'txt_nms_pc2_ip',
                                    fieldLabel: 'IP 주소'
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    id: 'txt_nms_pc2_port',
                                    fieldLabel: '포트 번호',
                                    maxValue: 65535,
                                    minValue: 0
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: '기타',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_nms_reflect_port',
                                    fieldLabel: 'NMS 서버에서 정보 요청시 요청 포트로 응답',
                                    labelWidth: 280
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyPadding: 5,
                    title: 'Trap 모드 장애설정',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'LinkDown 설정',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_oneline_error',
                                    fieldLabel: '1 라인 이상'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_twoline_error',
                                    fieldLabel: '2 라인 이상'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '임계치 설정',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'CPU',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            id: 'ck_cpu_use',
                                            fieldLabel: '사용'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '100%',
                                            id: 'txt_cpu_rate',
                                            fieldLabel: '사용률 (%)',
                                            maxValue: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '메모리',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            id: 'ck_memory_use',
                                            fieldLabel: '사용'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '100%',
                                            id: 'txt_memory_rate',
                                            fieldLabel: '사용률 (%)',
                                            maxValue: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '회선 사용률',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            id: 'ck_band_use',
                                            fieldLabel: '사용'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '100%',
                                            id: 'txt_band_rate',
                                            fieldLabel: '사용률 (%)',
                                            maxValue: 100
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'CRC 에러',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            id: 'ck_crc_use',
                                            fieldLabel: '사용'
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
                    bodyPadding: 5,
                    title: '회선 대역폭 측정',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '회선 대역폭 측정',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    anchor: '100%',
                                    id: 'ck_bandwidth_use',
                                    fieldLabel: '사용',
                                    labelWidth: 180
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    id: 'txt_bandwidth_ip',
                                    fieldLabel: '회선 대역폭 측정 서버 주소',
                                    labelWidth: 180
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    id: 'txt_bandwidth_start_time',
                                    fieldLabel: '측정 시작 시간',
                                    labelWidth: 180,
                                    maxValue: 23
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    id: 'txt_bandwidth_end_time',
                                    fieldLabel: '측정 종료 시간',
                                    labelWidth: 180,
                                    maxValue: 24
                                },
                                {
                                    xtype: 'numberfield',
                                    anchor: '100%',
                                    id: 'txt_bandwidth_range',
                                    fieldLabel: '측정 주기',
                                    labelWidth: 180
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            height: 28,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    id: 'bt_setting_save',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '확인',
                    listeners: {
                        click: 'onBt_setting_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    id: 'bt_setting_cancel',
                    width: 100,
                    text: '취소',
                    listeners: {
                        click: 'onBt_setting_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        destroy: 'onWin_rtm_settingDestroy'
    },

    onBt_setting_saveClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_rtm_setting');

        me.option.option.nms.nms_reflect = Ext.getCmp('ck_nms_reflect_port').getValue();

        me.option.option.nms.linkdown_oneline = Ext.getCmp('ck_oneline_error').getValue();
        me.option.option.nms.linkdown_twoline = Ext.getCmp('ck_twoline_error').getValue();


        me.option.option.nms.error_cpu.use = Ext.getCmp('ck_cpu_use').getValue();
        if (me.option.option.nms.error_cpu.use === true)
        {
            me.option.option.nms.error_cpu.duty_cycle = Ext.getCmp('txt_cpu_rate').getValue();
        }

        me.option.option.nms.error_memory.use = Ext.getCmp('ck_memory_use').getValue();
        if (me.option.option.nms.error_memory.use === true)
        {
            me.option.option.nms.error_memory.duty_cycle = Ext.getCmp('txt_band_rate').getValue();
        }

        me.option.option.nms.error_link.use = Ext.getCmp('ck_band_use').getValue();
        if (me.option.option.nms.error_link.use === true)
        {
            me.option.option.nms.error_link.duty_cycle = Ext.getCmp('txt_band_rate').getValue();
        }

        me.option.option.nms.error_crc.use = Ext.getCmp('ck_crc_use').getValue();
        me.option.option.bandwidth.use = Ext.getCmp('ck_bandwidth_use').getValue();
        me.option.option.bandwidth.ip = Ext.getCmp('txt_bandwidth_ip').getValue();
        me.option.option.bandwidth.start_time = Ext.getCmp('txt_bandwidth_start_time').getValue();
        me.option.option.bandwidth.end_time = Ext.getCmp('txt_bandwidth_end_time').getValue();
        me.option.option.bandwidth.range = Ext.getCmp('txt_bandwidth_range').getValue();

        if (Ext.getCmp('ck_nms_pc1_use').getValue() === true)
        {
            me.option.option.nms.nms_pc1.use = Ext.getCmp('ck_nms_pc1_use').getValue();
            me.option.option.nms.nms_pc1.trap_mode = Ext.getCmp('ck_nms_pc1_trap').getValue();
            me.option.option.nms.nms_pc1.ip = Ext.getCmp('txt_nms_pc1_ip').getValue();
            me.option.option.nms.nms_pc1.port = Ext.getCmp('txt_nms_pc1_port').getValue();

            var ip1 = Ext.getCmp('txt_nms_pc1_ip').getValue();
            var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
            var i;

            if (re.test(ip1))
            {
                var parts = ip1.split(".");

                for (i=0; i<parts.length; i++)
                {
                    if (parseInt(parseFloat(parts[i]), 10) > 255)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 서버 IP주소가 올바르지 않습니다.');
                        return;
                    }
                }
            }
            else
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 서버 IP주소가 올바르지 않습니다.');
                return;
            }

            if (me.option.option.nms.nms_pc1.port > 65535)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 포트번호를 65535 보다 크게 설정 할 수 없습니다.');
                return;
            }

            if (me.option.option.nms.nms_pc1.port < 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 포트번호를 0 보다 작게 설정 할 수 없습니다.');
                return;
            }
        }

        if (Ext.getCmp('ck_nms_pc2_use').getValue() === true)
        {
            me.option.option.nms.nms_pc2.use = Ext.getCmp('ck_nms_pc2_use').getValue();
            me.option.option.nms.nms_pc2.trap_mode = Ext.getCmp('ck_nms_pc2_trap').getValue();
            me.option.option.nms.nms_pc2.ip = Ext.getCmp('txt_nms_pc2_ip').getValue();
            me.option.option.nms.nms_pc2.port = Ext.getCmp('txt_nms_pc2_port').getValue();

            var ip2 = Ext.getCmp('txt_nms_pc2_ip').getValue();

            if (re.test(ip2))
            {
                var parts = ip2.split(".");

                for (i=0; i<parts.length; i++)
                {
                    if (parseInt(parseFloat(parts[i]), 10) > 255)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 보조서버 IP주소가 올바르지 않습니다.');
                        return;
                    }
                }
            }
            else
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 보조서버 IP주소가 올바르지 않습니다.');
                return;
            }


            if (me.option.option.nms.nms_pc2.port > 65535)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '보조 NMS 포트번호를 65535 보다 크게 설정 할 수 없습니다.');
                return;
            }

            if (me.option.option.nms.nms_pc2.port < 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '보조 NMS 포트번호를 0 보다 작게 설정 할 수 없습니다.');
                return;
            }
        }

        if (Ext.getCmp('ck_nms_pc1_use').getValue() === true && Ext.getCmp('ck_nms_pc2_use').getValue() === true)
        {
            var ip1 = Ext.getCmp('txt_nms_pc1_ip').getValue();
            var ip2 = Ext.getCmp('txt_nms_pc2_ip').getValue();

            if ( ip1 === ip2)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 서버 IP주소와 보조서버 IP주소가 동일합니다.');
                return;
            }

        }

        if (me.option.option.nms.nms_reflect === true && me.option.option.nms.nms_pc1.use === true && me.option.option.nms.nms_pc1.port === 0)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', 'NMS 포트번호를 0으로 설정 할 수 없습니다.');
            return;
        }

        if (me.option.option.nms.nms_reflect === true && me.option.option.nms.nms_pc2.use === true && me.option.option.nms.nms_pc2.port === 0)
        {
            Ext.Msg.alert('WeGuardia SMC2.0', '보조 NMS 포트번호를 0으로 설정 할 수 없습니다.');
            return;
        }

        if (me.option.option.nms.error_cpu.use === true)
        {
            if (me.option.option.nms.error_cpu.duty_cycle > 100)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'CPU 사용률이 100%를 넘을 수 없습니다.');
                return;
            }

            if (me.option.option.nms.error_cpu.duty_cycle < 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', 'CPU 사용률이 0%보다 작을 수 없습니다.');
                return;
            }
        }

        if (me.option.option.nms.error_memory.use === true)
        {
            if (me.option.option.nms.error_memory.duty_cycle > 100)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '메모리 사용률이 100%를 넘을 수 없습니다.');
                return;
            }

            if (me.option.option.nms.error_memory.duty_cycle < 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '메모리 사용률이 0%보다 작을 수 없습니다.');
                return;
            }
        }

        if (me.option.option.bandwidth.use === true)
        {
            if (me.option.option.bandwidth.ip > "0.0.0.0")
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 서버 주소가 0.0.0.0으로 설정 할 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.start_time > 24)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 시작 시간이 23시를 넘을 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.end_time > 24)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 종료 시간이 24시를 넘을 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.start_time > me.option.option.bandwidth.end_time)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 시작 시간이 종료 시간보다 클 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.start_time === me.option.option.bandwidth.end_time)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 시작 시간이 종료 시간과 같을 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.end_time === 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 종료 시간이 0시가 될 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.range === 0)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 주기가 0시가 될 수 없습니다.');
                return;
            }

            if (me.option.option.bandwidth.range > 23)
            {
                Ext.Msg.alert('WeGuardia SMC2.0', '회선 대역폭 측정 주기가 23시가 넘을 수 없습니다.');
                return;
            }
        }

        Ext.Ajax.request(
           {
               url : '/api/ftRTM/SaveServerOption',
               params : {
                   option: Ext.encode(me.option)
               },
               success : function(res_data)
               {
               }
           }
        );

        Ext.getCmp('win_rtm_setting').destroy();
    },

    onBt_setting_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_rtm_setting').destroy();
    },

    onWindowAfterRender: function(component, eOpts) {
        clearInterval(Ext.getCmp('pnl_rtm_main').timer);

        Ext.Ajax.request(
            {
                url : '/api/ftRTM/SeekServerOption',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    var me = Ext.getCmp('win_rtm_setting');
                    me.option = resObj;

                    Ext.getCmp('ck_nms_pc1_use').setValue(resObj.option.nms.nms_pc1.use);
                    Ext.getCmp('ck_nms_pc1_trap').setValue(resObj.option.nms.nms_pc1.trap_mode);
                    Ext.getCmp('txt_nms_pc1_ip').setValue(resObj.option.nms.nms_pc1.ip);
                    Ext.getCmp('txt_nms_pc1_port').setValue(resObj.option.nms.nms_pc1.port);

                    Ext.getCmp('ck_nms_pc2_use').setValue(resObj.option.nms.nms_pc2.use);
                    Ext.getCmp('ck_nms_pc2_trap').setValue(resObj.option.nms.nms_pc2.trap_mode);
                    Ext.getCmp('txt_nms_pc2_ip').setValue(resObj.option.nms.nms_pc2.ip);
                    Ext.getCmp('txt_nms_pc2_port').setValue(resObj.option.nms.nms_pc2.port);

                    Ext.getCmp('ck_nms_reflect_port').setValue(resObj.option.nms.nms_reflect);
                    Ext.getCmp('ck_oneline_error').setValue(resObj.option.nms.linkdown_oneline);
                    Ext.getCmp('ck_twoline_error').setValue(resObj.option.nms.linkdown_twoline);

                    Ext.getCmp('ck_cpu_use').setValue(resObj.option.nms.error_cpu.use);
                    Ext.getCmp('txt_cpu_rate').setValue(resObj.option.nms.error_cpu.duty_cycle);

                    Ext.getCmp('ck_memory_use').setValue(resObj.option.nms.error_memory.use);
                    Ext.getCmp('txt_memory_rate').setValue(resObj.option.nms.error_memory.duty_cycle);

                    Ext.getCmp('ck_band_use').setValue(resObj.option.nms.error_link.use);
                    Ext.getCmp('txt_band_rate').setValue(resObj.option.nms.error_link.duty_cycle);

                    Ext.getCmp('ck_crc_use').setValue(resObj.option.nms.error_crc.use);

                    Ext.getCmp('ck_bandwidth_use').setValue(resObj.option.bandwidth.use);
                    Ext.getCmp('txt_bandwidth_ip').setValue(resObj.option.bandwidth.ip);
                    Ext.getCmp('txt_bandwidth_start_time').setValue(resObj.option.bandwidth.start_time);
                    Ext.getCmp('txt_bandwidth_end_time').setValue(resObj.option.bandwidth.end_time);
                    Ext.getCmp('txt_bandwidth_range').setValue(resObj.option.bandwidth.range);

                }
            }
        );
    },

    onWin_rtm_settingDestroy: function(component, eOpts) {
        Ext.getCmp('pnl_rtm_main').timer_tick();
    }

});
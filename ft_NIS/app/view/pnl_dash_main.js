
Ext.define('SMC.view.pnl_dash_main', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Display',
        'Ext.form.Label',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.RowNumberer'
    ],

    height: 1000,
    id: 'pnl_dash_main',
    width: 1800,
    layout: 'fit',
    title: 'WeGuardia SMC2.0',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            task: {
                run: function()
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/SeekDeviceList',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);                    
                                Ext.getStore('st_dash_device').loadData(resObj);
                            }
                        }
                    );
                    
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/SeekDeviceState',
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                
                                // CPU 이상
                                if (resObj[0].cpu >= 1)
                                {   
                                    Ext.getCmp('con_dash_cpu').addCls('ico_alert_state_o72');
                                }
                                else
                                {                        
                                    
                                    Ext.getCmp('con_dash_cpu').addCls('ico_alert_state_g72');
                                }
                                
                                Ext.getCmp('lbl_dash_cpu').setText(resObj[0].cpu);
                                
                                // 메모리 이상
                                if (resObj[0].memory >= 1)
                                {
                                    Ext.getCmp('con_dash_memory').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_memory').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_memory').addCls('ico_alert_state_o72');
                                }
                                
                                if (resObj[0].memory === 0)
                                {
                                    Ext.getCmp('con_dash_memory').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_memory').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_memory').addCls('ico_alert_state_g72');
                                }
                                
                                Ext.getCmp('lbl_dash_memory').setText(resObj[0].memory);
                                
                                // 세션이상
                                if (resObj[0].session >= 1)
                                {
                                    Ext.getCmp('con_dash_session').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_session').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_session').addCls('ico_alert_state_o72');
                                }
                                
                                if (resObj[0].session === 0)
                                {
                                    Ext.getCmp('con_dash_session').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_session').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_session').addCls('ico_alert_state_g72');
                                }
                                
                                Ext.getCmp('lbl_dash_session').setText(resObj[0].session);
                                
                                //응답없음
                                if (resObj[0].no_response >= 1)
                                {
                                    Ext.getCmp('con_dash_noresponse').removeCls('ico_alert_state_r72');
                                    Ext.getCmp('con_dash_noresponse').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_noresponse').addCls('ico_alert_state_r72');
                                }
                                
                                if (resObj[0].no_response === 0)
                                {
                                    Ext.getCmp('con_dash_noresponse').removeCls('ico_alert_state_r72');
                                    Ext.getCmp('con_dash_noresponse').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_noresponse').addCls('ico_alert_state_g72');
                                }
                                
                                Ext.getCmp('lbl_dash_noresponse').setText(resObj[0].no_response);                    
                                
                                // 회선장애
                                if (resObj[0].line_error >= 1)
                                {
                                    Ext.getCmp('con_dash_lineerror').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_lineerror').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_lineerror').addCls('ico_alert_state_o72');
                                }
                                
                                if (resObj[0].line_error === 0)
                                {
                                    Ext.getCmp('con_dash_lineerror').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_lineerror').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_lineerror').addCls('ico_alert_state_g72');
                                }
                                
                                Ext.getCmp('lbl_dash_lineerror').setText(resObj[0].line_error);
                                
                                // 터널장애
                                if (resObj[0].tunnels >= 1)
                                {
                                    Ext.getCmp('con_dash_tunnels').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_tunnels').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_tunnels').addCls('ico_alert_state_o72');                        
                                }
                                
                                if (resObj[0].tunnels === 0)
                                {
                                    Ext.getCmp('con_dash_tunnels').removeCls('ico_alert_state_o72');
                                    Ext.getCmp('con_dash_tunnels').removeCls('ico_alert_state_g72');
                                    Ext.getCmp('con_dash_tunnels').addCls('ico_alert_state_g72');                        
                                }
                                
                                Ext.getCmp('lbl_dash_tunnels').setText(resObj[0].tunnels);                    
                            }
                        });
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/SeekLocationDeviceList',
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_dash_location').loadData(resObj);
                            }
                        });
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/SeekDeviceAllState',
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getCmp('txt_dash_alldevice').setValue(resObj.all_count);
                                Ext.getCmp('txt_dash_errordevice').setValue(resObj.error);
                                
                            }
                        });
                },
                interval: 5000
            },
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_dash_mainBeforeDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 36,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 28,
                                    margin: '4 4 4 4',
                                    width: 100,
                                    text: '환경설정',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    region: 'west',
                                    split: true,
                                    width: 150,
                                    collapsible: true,
                                    title: 'VPN운용 현황',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    store: 'st_dash_location',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 140,
                                                            dataIndex: 'name',
                                                            text: '지역'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 80,
                                                            dataIndex: 'branch',
                                                            text: '지점수'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 80,
                                                            dataIndex: 'normal',
                                                            text: '정상동작'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 80,
                                                            dataIndex: 'line_error',
                                                            text: '회선장애'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 80,
                                                            dataIndex: 'no_response',
                                                            text: '응답없음'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    flex: 0.7,
                                                    title: '장비현황',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            border: false,
                                                            collapsed: false,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'middle'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    id: 'txt_dash_alldevice',
                                                                    fieldLabel: '전체 장비',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'font-size : 16px',
                                                                    labelWidth: 90,
                                                                    fieldStyle: 'font-size : 16px'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            border: false,
                                                            collapsed: false,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'middle'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: 'txt_dash_errordevice',
                                                                    fieldLabel: '장애 장비',
                                                                    labelAlign: 'right',
                                                                    labelStyle: 'font-size : 16px',
                                                                    labelWidth: 90,
                                                                    fieldStyle: 'font-size : 16px'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    title: '경고현황',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: 'CPU 이상',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_cpu',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_cpu',
                                                                            style: 'font-size:24px'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender6,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '메모리 이상',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_memory',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_memory',
                                                                            style: 'font-size:24px'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender5,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '세션 이상',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_session',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_session',
                                                                            style: 'font-size:24px'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender4,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    title: '장애현황',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '응답없음',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_noresponse',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_noresponse',
                                                                            style: 'font-size:24px'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender3,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '회선장애',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_lineerror',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_lineerror',
                                                                            style: 'font-size:24px'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender2,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '터널장애',
                                                            items: [
                                                                {
                                                                    xtype: 'container',
                                                                    id: 'con_dash_tunnels',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        align: 'middle',
                                                                        pack: 'center'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'label',
                                                                            id: 'lbl_dash_tunnels',
                                                                            style: 'font-size:24px',
                                                                            resizable: true
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender1,
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
                                    flex: 2,
                                    region: 'center',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'tabpanel',
                                            activeTab: 0,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    title: '트래픽 상황',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '인터넷 트래픽',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender14,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '업무 트래픽[양재]',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender15,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: 'fit',
                                                            title: '업무 트래픽[안성]',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onPanelAfterRender16,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    title: '법인별 트래픽',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 1,
                                                                    layout: 'fit',
                                                                    title: '농협 은행',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onPanelAfterRender10,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 1,
                                                                    layout: 'fit',
                                                                    title: '농협 중앙회',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onPanelAfterRender11,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 1,
                                                                    layout: 'fit',
                                                                    title: '농축협',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onPanelAfterRender12,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'panel',
                                                                    flex: 1,
                                                                    layout: 'fit',
                                                                    title: '기타',
                                                                    listeners: {
                                                                        afterrender: {
                                                                            fn: me.onPanelAfterRender13,
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
                                                    layout: 'fit',
                                                    title: '장비 현황',
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            store: 'st_dash_device',
                                                            viewConfig: {
                                                                preserveScrollOnRefresh: true
                                                            },
                                                            columns: [
                                                                {
                                                                    xtype: 'rownumberer',
                                                                    width: 70,
                                                                    text: '번호'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if (record.raw.state < 1)
                                                                        metaData.tdCls = 'ico_2u_block';

                                                                        else if (record.raw.state === 2)
                                                                        metaData.tdCls = 'ico_2u_unaccredited';

                                                                        else if (record.raw.state === 3)
                                                                        metaData.tdCls = 'ico_2u_unfit';

                                                                        else if (record.raw.port_line_normal === false)
                                                                        metaData.tdCls = 'ico_2u_alert';

                                                                        else
                                                                        metaData.tdCls = 'ico_2u';

                                                                        return value;
                                                                    },
                                                                    width: 200,
                                                                    dataIndex: 'name',
                                                                    text: '장비명'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 140,
                                                                    dataIndex: 'gate_ip',
                                                                    text: '장비 IP'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if (value > 89)
                                                                        metaData.tdCls = 'ico_level5';

                                                                        else if (value > 69)
                                                                        metaData.tdCls = 'ico_level4';

                                                                        else if (value > 49)
                                                                        metaData.tdCls = 'ico_level3';

                                                                        else if (value > 29)
                                                                        metaData.tdCls = 'ico_level2';

                                                                        else if (value > 9)
                                                                        metaData.tdCls = 'ico_level1';

                                                                        else if (value >= 0)
                                                                        metaData.tdCls = 'ico_level0';



                                                                        return value + '%';
                                                                    },
                                                                    width: 120,
                                                                    align: 'right',
                                                                    dataIndex: 'cpu_util',
                                                                    text: 'CPU 사용률(%)'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        if (value > 89)
                                                                        metaData.tdCls = 'ico_level5';

                                                                        else if (value > 69)
                                                                        metaData.tdCls = 'ico_level4';

                                                                        else if (value > 49)
                                                                        metaData.tdCls = 'ico_level3';

                                                                        else if (value > 29)
                                                                        metaData.tdCls = 'ico_level2';

                                                                        else if (value > 9)
                                                                        metaData.tdCls = 'ico_level1';

                                                                        else if (value >= 0)
                                                                        metaData.tdCls = 'ico_level0';



                                                                        return value + '%';
                                                                    },
                                                                    width: 120,
                                                                    align: 'right',
                                                                    dataIndex: 'mem_util',
                                                                    text: '메모리 사용률(%)'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 120,
                                                                    align: 'right',
                                                                    dataIndex: 'inkbps',
                                                                    text: '트래픽 사용량(Rx)'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 120,
                                                                    align: 'right',
                                                                    dataIndex: 'outkbps',
                                                                    text: '트래픽 사용량(Tx)'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 80,
                                                                    align: 'right',
                                                                    dataIndex: 'sessions',
                                                                    text: '세션(수)'
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    width: 80,
                                                                    align: 'right',
                                                                    dataIndex: 'tunnels',
                                                                    text: '터널(수)'
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
                                    xtype: 'panel',
                                    flex: 1,
                                    region: 'east',
                                    split: true,
                                    width: 150,
                                    collapsible: true,
                                    title: '서비스 TOP10',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onPanelAfterRender7,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            title: '호스트 전체 TOP10',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onPanelAfterRender8,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            title: '세션 TOP10',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onPanelAfterRender9,
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
        });

        me.callParent(arguments);
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.TaskManager.start(component.task);
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('SMC.view.win_dash_config');
        win.show();
    },

    onPanelAfterRender6: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_cpu');
            win.show();
        });
    },

    onPanelAfterRender5: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_memory');
            win.show();
        });
    },

    onPanelAfterRender4: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_sessions');
            win.show();
        });
    },

    onPanelAfterRender3: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_noresponse');
            win.show();
        });
    },

    onPanelAfterRender2: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_line_error');
            win.show();
        });
    },

    onPanelAfterRender1: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_tunnels');
            win.show();
        });
    },

    onPanelAfterRender14: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_center',
                            params : {
                                center_index : 0
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_center1';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender15: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_center',
                            params : {
                                center_index : 1
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_center2';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender16: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_center',
                            params : {
                                center_index : 2
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_center3';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender10: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_corp',
                            params : {
                                corp_index : 0
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_corp1';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender11: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_corp',
                            params : {
                                corp_index : 1
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_corp2';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender12: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_corp',
                            params : {
                                corp_index : 2
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_corp3';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender13: function(component, eOpts) {
        var _tplList = {
            drawType : 'spline',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
                    valueFormatString : 'mm:ss',
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0
                },
                data :
                [
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "rx"
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        name: "tx"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/fetch_corp',
                            params : {
                                corp_index : 3
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.inkbps, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.outkbps, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_corp4';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender7: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_port');
            win.show();
        });

        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'pie',
            chartAttr : {
                data :
                [
                    {
                        type : 'pie',
                        showInLegend: true,
                        toolTipContent: "{legendText} : <strong>{y} bps</strong>",
                        indexLabel: "{label} : {y} bps"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/SeekServiceTop',
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++)
                                {
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.bps, label : "" + _element.port + "", legendText : "" + _element.port + ""});
                                }

                                obj.setData(obj, [_data1]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Service'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval)
        {

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_port';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Service', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);
        component.add(_widget);
    },

    onPanelAfterRender8: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_host');
            win.show();
        });

        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'column',
            chartAttr : {
                axisY : {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data :
                [
                    {
                        type: "column",
                        showInLegend: true,
                        toolTipContent: "{legendText} : <strong>{y} bps</strong>",
                        name: "ip"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 },
                theme : "theme2"
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                     Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/SeekHostTop',
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++)
                                {
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.bps, label : _element.ip, legendText : _element.ip});
                                }

                                obj.setData(obj, [_data1]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Host'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_host';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Host', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender9: function(component, eOpts) {
        component.body.on('dblclick', function() {
            var win = Ext.create('SMC.view.win_dash_session');
            win.show();
        });

        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'bar',
            chartAttr : {
                axisY : {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data :
                [
                    {
                        type: "bar",
                        showInLegend: true,
                        toolTipContent: "{legendText} : <strong>{y} session</strong>",
                        name: "session"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 },
                theme : "theme2"
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftDashboard/SeekSessionTopN',
                            params : {
                                count : 10
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++)
                                {
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.sessions, label : _element.name, legendText : _element.name});
                                }

                                obj.setData(obj, [_data1]);

                            }
                        });
                }
            },
            interval : 5000,
            name : 'Host'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_sessions';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Host', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_dash_mainBeforeDestroy: function(component, eOpts) {
        Ext.TaskManager.stop(component.task);

        Ext.getCmp('ct_dash_port').onClearInterval();
        Ext.getCmp('ct_dash_host').onClearInterval();
        Ext.getCmp('ct_dash_sessions').onClearInterval();

        if (Ext.getCmp('ct_dash_corp1') !== undefined)
        {
            Ext.getCmp('ct_dash_corp1').onClearInterval();
            Ext.getCmp('ct_dash_corp2').onClearInterval();
            Ext.getCmp('ct_dash_corp3').onClearInterval();
            Ext.getCmp('ct_dash_corp4').onClearInterval();
        }

        if (Ext.getCmp('ct_dash_center1') !== undefined)
        {
            Ext.getCmp('ct_dash_center1').onClearInterval();
            Ext.getCmp('ct_dash_center2').onClearInterval();
            Ext.getCmp('ct_dash_center3').onClearInterval();
        }
    }

});
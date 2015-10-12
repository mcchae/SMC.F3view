
Ext.define('SMC.view.pnl_rtm_detail', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Display',
        'Ext.chart.Chart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup'
    ],

    height: 1024,
    id: 'pnl_rtm_detail',
    width: 1280,
    constrainHeader: true,
    title: 'WeGuardia SMC 2.0',
    maximizable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            task: {
                run: function()
                {
                    var store = Ext.getStore('store_rtm_detail');
                    var grid_store = Ext.getStore('store_rtm_info');        
                    var detail = Ext.getCmp('pnl_rtm_detail');
                    var name = Ext.getCmp('txt_rtm_devicename');
                    var ip = Ext.getCmp('txt_rtm_ipaddress');
                    var model = Ext.getCmp('txt_rtm_model');
                    var fwversion = Ext.getCmp('txt_rtm_fwversion');
                    var rdversion = Ext.getCmp('txt_rtm_rdversion');
                    var reboot = Ext.getCmp('txt_rtm_reboot');
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftRTM/getChart',
                            method : 'GET',
                            params : {
                                _id : Ext.encode(detail.objid)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                store.loadData(resObj);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });       
                    
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftRTM/SeekDeviceInfo',
                            method : 'GET',
                            params : {
                                cid : Ext.encode(detail.objcid)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                name.setValue(resObj.name);
                                ip.setValue(resObj.gate_ip);
                                model.setValue(resObj.model);
                                fwversion.setValue(resObj.fw_version);
                                rdversion.setValue(resObj.rd_version);
                                reboot.setValue(resObj.reboot_count);
                                
                                grid_store.loadData(resObj.eth);
                            }
                        });
                },
                interval: 2000
            },
            listeners: {
                destroy: {
                    fn: me.onPnl_rtm_detailDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '장비 상세정보',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 2,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            title: '장비 정보',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_devicename',
                                                    fieldLabel: '장비 명 ',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_ipaddress',
                                                    fieldLabel: 'IP 주소 ',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_model',
                                                    fieldLabel: '장비 모델 ',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_fwversion',
                                                    fieldLabel: '펌웨어 버전 ',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_rdversion',
                                                    fieldLabel: '램디스크 버전',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'txt_rtm_reboot',
                                                    fieldLabel: '재부팅 횟수',
                                                    labelAlign: 'right'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            title: 'CPU',
                                            items: [
                                                {
                                                    xtype: 'chart',
                                                    insetPadding: 20,
                                                    axes: [
                                                        {
                                                            type: 'Category',
                                                            fields: [
                                                                'time'
                                                            ],
                                                            grid: true,
                                                            position: 'bottom'
                                                        },
                                                        {
                                                            type: 'Numeric',
                                                            fields: [
                                                                'cpu'
                                                            ],
                                                            grid: true,
                                                            maximum: 100,
                                                            minimum: 0,
                                                            position: 'left'
                                                        }
                                                    ],
                                                    series: [
                                                        {
                                                            type: 'line',
                                                            yField: 'cpu',
                                                            fill: true,
                                                            showMarkers: false,
                                                            smooth: 2
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            title: 'Memory',
                                            items: [
                                                {
                                                    xtype: 'chart',
                                                    insetPadding: 20,
                                                    axes: [
                                                        {
                                                            type: 'Category',
                                                            fields: [
                                                                'time'
                                                            ],
                                                            grid: true,
                                                            position: 'bottom'
                                                        },
                                                        {
                                                            type: 'Numeric',
                                                            fields: [
                                                                'memory'
                                                            ],
                                                            grid: true,
                                                            maximum: 100,
                                                            minimum: 0,
                                                            position: 'left'
                                                        }
                                                    ],
                                                    series: [
                                                        {
                                                            type: 'line',
                                                            yField: 'memory',
                                                            fill: true,
                                                            showMarkers: false,
                                                            smooth: 2
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            layout: 'fit',
                                            title: 'Network',
                                            items: [
                                                {
                                                    xtype: 'chart',
                                                    insetPadding: 20,
                                                    axes: [
                                                        {
                                                            type: 'Category',
                                                            fields: [
                                                                'time'
                                                            ],
                                                            grid: true,
                                                            position: 'bottom'
                                                        },
                                                        {
                                                            type: 'Numeric',
                                                            fields: [
                                                                'network'
                                                            ],
                                                            grid: true,
                                                            maximum: 100,
                                                            minimum: 0,
                                                            position: 'left'
                                                        }
                                                    ],
                                                    series: [
                                                        {
                                                            type: 'line',
                                                            yField: 'network',
                                                            fill: true,
                                                            showMarkers: false,
                                                            smooth: 2
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 4,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
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
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth0',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth0_inbyte',
                                                                        'eth0_outbyte',
                                                                        'eth0_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth0_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth0_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'network',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth1',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            height: 250,
                                                            width: 400,
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth1_inbyte',
                                                                        'eth1_outbyte',
                                                                        'eth1_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth1_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth1_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth1_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth2',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            height: 250,
                                                            width: 400,
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth2_inbyte',
                                                                        'eth2_outbyte',
                                                                        'eth2_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth2_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth2_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth2_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth3',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            height: 250,
                                                            width: 400,
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth3_inbyte',
                                                                        'eth3_outbyte',
                                                                        'eth3_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth3_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth3_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth3_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
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
                                                    title: 'eth4',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth4_inbyte',
                                                                        'eth4_outbyte',
                                                                        'eth4_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth4_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth4_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth4_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 2
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth5',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth5_inbyte',
                                                                        'eth5_outbyte',
                                                                        'eth5_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth5_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth5_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth5_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth6',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    fields: [
                                                                        'eth6_inbyte',
                                                                        'eth6_outbyte',
                                                                        'eth6_dropbyte'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth6_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth6_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth6_dropbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    flex: 1,
                                                    layout: 'fit',
                                                    title: 'eth7',
                                                    items: [
                                                        {
                                                            xtype: 'chart',
                                                            insetPadding: 20,
                                                            axes: [
                                                                {
                                                                    type: 'Category',
                                                                    fields: [
                                                                        'time'
                                                                    ],
                                                                    grid: true,
                                                                    position: 'bottom'
                                                                },
                                                                {
                                                                    type: 'Numeric',
                                                                    grid: true,
                                                                    position: 'left'
                                                                }
                                                            ],
                                                            series: [
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth7_inbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    yField: 'eth7_outbyte',
                                                                    showMarkers: false,
                                                                    smooth: 3
                                                                },
                                                                {
                                                                    type: 'line',
                                                                    showMarkers: false,
                                                                    smooth: 3
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
                                    flex: 2,
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            autoScroll: true,
                                            title: 'Interface',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return 'eth' + value;
                                                    },
                                                    dataIndex: 'num',
                                                    text: '인터페이스'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return value + '%';
                                                    },
                                                    dataIndex: 'util',
                                                    text: '사용률'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value === 1024 * 10)
                                                        {
                                                            return '10M';
                                                        }

                                                        if (value === 1024 * 100)
                                                        {
                                                            return '100M';
                                                        }

                                                        if (value === 1024 * 1000)
                                                        {
                                                            return '1G';
                                                        }

                                                        if (value === 1024 * 1000 * 10)
                                                        {
                                                            return '10G';
                                                        }

                                                        return value;
                                                    },
                                                    dataIndex: 'bandwidth',
                                                    text: '회선대역폭'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'inpackets',
                                                    text: '입력패킷'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'outpackets',
                                                    text: '아웃패킷'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'droppackets',
                                                    text: '드랍패킷'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if ( value >= 1024 * 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024 * 1024)) + 'GB';
                                                        }

                                                        if ( value >= 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024)) + 'MB';
                                                        }

                                                        if ( value >= 1024)
                                                        {
                                                            return Math.floor(value / 1024) + 'KB';
                                                        }

                                                        return value;
                                                    },
                                                    dataIndex: 'inbytes',
                                                    text: '입력바이트'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if ( value >= 1024 * 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024 * 1024)) + 'GB';
                                                        }

                                                        if ( value >= 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024)) + 'MB';
                                                        }

                                                        if ( value >= 1024)
                                                        {
                                                            return Math.floor(value / 1024) + 'KB';
                                                        }

                                                        return value;
                                                    },
                                                    dataIndex: 'outbytes',
                                                    text: '아웃바이트'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if ( value >= 1024 * 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024 * 1024)) + 'GB';
                                                        }

                                                        if ( value >= 1024 * 1024)
                                                        {
                                                            return Math.floor(value / (1024 * 1024)) + 'MB';
                                                        }

                                                        if ( value >= 1024)
                                                        {
                                                            return Math.floor(value / 1024) + 'KB';
                                                        }

                                                        return value;
                                                    },
                                                    dataIndex: 'dropbytes',
                                                    text: '드랍바이트'
                                                }
                                            ]
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
                        },
                        {
                            xtype: 'panel',
                            layout: 'fit',
                            title: '실시간 패킷 모니터',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            height: 160,
                                            layout: {
                                                type: 'vbox',
                                                padding: 5
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 10 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 30 0 0',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    handler: function(checkbox, checked) {
                                                                        if(checked)
                                                                        {
                                                                            Ext.getCmp('txt_src_ip1').enable();
                                                                            Ext.getCmp('txt_src_ip2').enable();
                                                                        }
                                                                        else
                                                                        {
                                                                            Ext.getCmp('txt_src_ip1').disable();
                                                                            Ext.getCmp('txt_src_ip2').disable();

                                                                            Ext.getCmp('txt_src_ip1').setValue('');
                                                                            Ext.getCmp('txt_src_ip2').setValue('');
                                                                        }
                                                                    },
                                                                    id: 'chk_src_ip',
                                                                    boxLabel: 'Source IP Range'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_src_ip1',
                                                                    width: 170,
                                                                    labelAlign: 'top'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '~'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_src_ip2',
                                                                    width: 170,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 30 0 0',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    handler: function(checkbox, checked) {
                                                                        if(checked)
                                                                        {
                                                                            Ext.getCmp('txt_src_port1').enable();
                                                                            Ext.getCmp('txt_src_port2').enable();
                                                                        }
                                                                        else
                                                                        {
                                                                            Ext.getCmp('txt_src_port1').disable();
                                                                            Ext.getCmp('txt_src_port2').disable();

                                                                            Ext.getCmp('txt_src_port1').setValue('');
                                                                            Ext.getCmp('txt_src_port2').setValue('');
                                                                        }
                                                                    },
                                                                    id: 'chk_src_port',
                                                                    boxLabel: 'Port Range'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_src_port1',
                                                                    width: 170,
                                                                    labelAlign: 'top'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '~'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_src_port2',
                                                                    width: 170,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 30 0 0',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    id: 'cmb_direction',
                                                                    width: 140,
                                                                    fieldLabel: 'Direction',
                                                                    labelAlign: 'top',
                                                                    editable: false,
                                                                    queryMode: 'local'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            margin: '0 30 0 0',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    handler: function(checkbox, checked) {
                                                                        if(checked)
                                                                        {
                                                                            Ext.getCmp('txt_dst_ip1').enable();
                                                                            Ext.getCmp('txt_dst_ip2').enable();
                                                                        }
                                                                        else
                                                                        {
                                                                            Ext.getCmp('txt_dst_ip1').disable();
                                                                            Ext.getCmp('txt_dst_ip2').disable();

                                                                            Ext.getCmp('txt_dst_ip1').setValue('');
                                                                            Ext.getCmp('txt_dst_ip2').setValue('');
                                                                        }
                                                                    },
                                                                    id: 'chk_dst_ip',
                                                                    boxLabel: 'Destination IP Range'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_dst_ip1',
                                                                    width: 170,
                                                                    labelAlign: 'top'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '~'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_dst_ip2',
                                                                    width: 170,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'vbox',
                                                                align: 'center',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    handler: function(checkbox, checked) {
                                                                        if(checked)
                                                                        {
                                                                            Ext.getCmp('txt_dst_port1').enable();
                                                                            Ext.getCmp('txt_dst_port2').enable();
                                                                        }
                                                                        else
                                                                        {
                                                                            Ext.getCmp('txt_dst_port1').disable();
                                                                            Ext.getCmp('txt_dst_port2').disable();

                                                                            Ext.getCmp('txt_dst_port1').setValue('');
                                                                            Ext.getCmp('txt_dst_port2').setValue('');
                                                                        }
                                                                    },
                                                                    id: 'chk_dst_port',
                                                                    boxLabel: 'Port Range'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_dst_port1',
                                                                    width: 170,
                                                                    labelAlign: 'top'
                                                                },
                                                                {
                                                                    xtype: 'label',
                                                                    text: '~'
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    disabled: true,
                                                                    id: 'txt_dst_port2',
                                                                    width: 170,
                                                                    labelSeparator: ' '
                                                                }
                                                            ]
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
                                                            xtype: 'checkboxfield',
                                                            handler: function(checkbox, checked) {
                                                                if(checked)
                                                                {
                                                                    Ext.getCmp('cmb_uid').enable();
                                                                    Ext.getCmp('txt_uid').enable();
                                                                }
                                                                else
                                                                {
                                                                    Ext.getCmp('cmb_uid').disable();
                                                                    Ext.getCmp('txt_uid').disable();

                                                                    Ext.getCmp('cmb_uid').setValue('All');
                                                                    Ext.getCmp('txt_uid').setValue('');
                                                                }
                                                            },
                                                            id: 'chk_uid',
                                                            margin: '0 10 0 0',
                                                            labelWidth: 200,
                                                            boxLabel: 'UID 타입'
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            disabled: true,
                                                            id: 'cmb_uid',
                                                            margin: '0 35 0 0',
                                                            width: 140,
                                                            editable: false,
                                                            queryMode: 'local'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            margin: '0 10 0 0',
                                                            text: 'UID :'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            disabled: true,
                                                            id: 'txt_uid',
                                                            padding: '0 20 0 0',
                                                            width: 140,
                                                            fieldLabel: 'Label',
                                                            hideLabel: true
                                                        },
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            margin: '0 35 0 0',
                                                            width: 260,
                                                            fieldLabel: 'Action',
                                                            labelWidth: 40,
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'chk_accept',
                                                                    boxLabel: 'Accept',
                                                                    checked: true
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'chk_drop',
                                                                    boxLabel: 'Drop',
                                                                    checked: true
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    id: 'chk_ipsec',
                                                                    boxLabel: 'IPSec',
                                                                    checked: true
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_protocol',
                                                            width: 200,
                                                            fieldLabel: 'Protocol',
                                                            labelWidth: 60,
                                                            editable: false,
                                                            queryMode: 'local'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 40,
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'end',
                                                padding: 5
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    margin: '0 10 0 0',
                                                    width: 120,
                                                    text: '필터삭제',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'button',
                                                    task: {
                                                        run: function() 
                                                        {
                                                            var store = Ext.getStore('store_rtm_log');
                                                            var detail = Ext.getCmp('pnl_rtm_detail');
                                                            
                                                            Ext.data.JsonP.request(
                                                                {
                                                                    url : '/api/ftRTM/getRTLog',
                                                                    params : {
                                                                        cid : Ext.encode(detail.objcid)
                                                                    },
                                                                    success : function(res_data){
                                                                        if(store.data.items.length > 5000)
                                                                        {
                                                                            while(store.data.items.length < 5000)
                                                                                store.removeAt(store.data.items.length-1);
                                                                        }
                                                                        else
                                                                        {
                                                                            if (res_data != [])
                                                                            {
                                                                                store.insert(0,res_data);
                                                                            }
                                                                        }
                                                                    },
                                                                    failure : function(res_data)
                                                                    {                    
                                                                        Ext.TaskManager.stop(this.task);
                                                                        console.log(res_data);
                                                                    }
                                                                }
                                                            );        
                                                        },
                                                        interval: 100
                                                    },
                                                    state: true,
                                                    id: 'id_log_req',
                                                    margin: '0 10 0 0',
                                                    width: 120,
                                                    allowDepress: false,
                                                    text: '로그요청',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onId_log_reqClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            viewConfig: {
                                                loadMask: false,
                                                preserveScrollOnRefresh: true,
                                                
                                            },
                                            flex: 1,
                                            id: 'id_grid_gate_log',
                                            autoScroll: true,
                                            header: false,
                                            title: 'My Grid Panel',
                                            forceFit: false,
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'eth',
                                                    text: 'eth'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'Length',
                                                    text: 'Length'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'src_ip1',
                                                    text: 'Src IP'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'src_nat_ip',
                                                    text: 'Src Nat IP'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'dst_ip1',
                                                    text: 'Dest IP'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'dst_nat_ip',
                                                    text: 'Dest Nat IP'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'protocol',
                                                    text: 'Protocol'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'src_nat_port',
                                                    text: 'Src Port (Nat)'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'dst_nat_port',
                                                    text: 'Dest Port (Nat)'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'action',
                                                    text: 'Action'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'nat_uid',
                                                    text: 'UID (Nat)'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'timeout',
                                                    text: 'Timeout'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'payload',
                                                    text: 'Payload'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'etc',
                                                    text: 'etc'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPanelAfterRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_rtm_detailDestroy: function(component, eOpts) {
        Ext.TaskManager.stop(this.task);
        Ext.TaskManager.start(this.parent_panel);
    },

    onPanelAfterRender1: function(component, eOpts) {
        Ext.TaskManager.start(this.task);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('chk_src_ip').setValue(false);
        Ext.getCmp('chk_src_port').setValue(false);
        Ext.getCmp('chk_dst_ip').setValue(false);
        Ext.getCmp('chk_dst_port').setValue(false);
        Ext.getCmp('chk_uid').setValue(false);
        Ext.getCmp('chk_uid').setValue(false);
        Ext.getCmp('chk_accept').setValue(true);
        Ext.getCmp('chk_drop').setValue(true);
        Ext.getCmp('chk_ipsec').setValue(true);
        Ext.getCmp('cmb_protocol').setValue('All');
        Ext.getCmp('cmb_direction').setValue('<========>');
    },

    onId_log_reqClick: function(button, e, eOpts) {
        var chk_src_ip = Ext.getCmp('chk_src_ip').getValue();
        var chk_src_port = Ext.getCmp('chk_src_port').getValue();
        var chk_dst_ip = Ext.getCmp('chk_dst_ip').getValue();
        var chk_dst_port = Ext.getCmp('chk_dst_port').getValue();
        var chk_uid = Ext.getCmp('chk_uid').getValue();

        var protocol_value = Ext.getCmp('cmb_protocol').getValue();
        var protocol_record = Ext.getCmp('cmb_protocol').findRecord(Ext.getCmp('cmb_protocol').valueField || Ext.getCmp('cmb_protocol').displayField, protocol_value);
        var protocol_index = Ext.getCmp('cmb_protocol').store.indexOf(protocol_record);

        var direction_value = Ext.getCmp('cmb_direction').getValue();
        var direction_record = Ext.getCmp('cmb_direction').findRecord(Ext.getCmp('cmb_direction').valueField || Ext.getCmp('cmb_direction').displayField, direction_value);
        var direction_index = Ext.getCmp('cmb_direction').store.indexOf(direction_record);

        var src_ip1 = Ext.getCmp('txt_src_ip1').getValue();
        var src_ip2 = Ext.getCmp('txt_src_ip2').getValue();

        var dst_ip1 = Ext.getCmp('txt_dst_ip1').getValue();
        var dst_ip2 = Ext.getCmp('txt_dst_ip2').getValue();

        var src_port1 = Ext.getCmp('txt_src_port1').getValue();
        var src_port2 = Ext.getCmp('txt_src_port2').getValue();

        var dst_port1 = Ext.getCmp('txt_dst_port1').getValue();
        var dst_port2 = Ext.getCmp('txt_dst_port2').getValue();

        var uid_value = Ext.getCmp('cmb_uid').getValue();
        var uid_record = Ext.getCmp('cmb_uid').findRecord(Ext.getCmp('cmb_uid').valueField || Ext.getCmp('cmb_uid').displayField, uid_value);
        var uid_index = Ext.getCmp('cmb_uid').store.indexOf(uid_record);

        var accept = 1;
        var drop = 1;
        var ipsec = 1;

        if (Ext.getCmp('chk_accept').getValue() === false)
            accept = 0;

        if (Ext.getCmp('chk_drop').getValue() === false)
            drop = 0;

        if (Ext.getCmp('chk_ipsec').getValue() === false)
            ipsec = 0;

        var uid = Ext.getCmp('txt_uid').getValue();

        if (chk_src_ip === false)
        {
            src_ip1 = '0.0.0.0';
            src_ip2 = '255.255.255.255';
        }

        if (chk_src_port === false)
        {
            src_port1 = 0;
            src_port2 = 65535;
        }

        if (chk_dst_ip === false)
        {
            dst_ip1 = '0.0.0.0';
            dst_ip2 = '255.255.255.255';
        }

        if (chk_dst_port === false)
        {
            dst_port1 = 0;
            dst_port2 = 65535;
        }

        if (Ext.getCmp('chk_uid').getValue() === false)
            uid = 0;

        if (uid === '')
            uid = 0;

        var detail = Ext.getCmp('pnl_rtm_detail');
        var taskbutton = Ext.getCmp('id_log_req');

        console.log(taskbutton.state);

        if(taskbutton.state)
        {
            taskbutton.state = false;
            Ext.data.JsonP.request
            (
                {
                    url : '/api/ftRTM/ReqRTLog',
                    params :
                    {
                        cid : Ext.encode(detail.objcid),
                        sip1 : Ext.encode(src_ip1),
                        sip2 : Ext.encode(src_ip2),
                        sport1 : src_port1,
                        sport2 : src_port2,
                        dip1 : Ext.encode(dst_ip1),
                        dip2 : Ext.encode(dst_ip2),
                        dport1 : dst_port1,
                        dport2 : dst_port2,
                        direction : direction_index+1,
                        accept : accept,
                        drop : drop,
                        ipsec : ipsec,
                        protocol : protocol_index,
                        uid_type : uid_index,
                        uid : uid
                    },
                    success : function(res_data)
                    {
                        if(res_data === true)
                        {
                            taskbutton.setText('로그중지');
                            Ext.TaskManager.start(taskbutton.task);
                        }
                        else
                        {
                            Ext.Msg.alert('Weguardia RTM2.0 Client','실시간 로그 필터에 유효하지 않은 값이 있습니다.');
                            taskbutton.state = true;
                        }
                    },
                    failure : function(res_data)
                    {
                        Ext.Msg.alert('Weguardia RTM2.0 Client','실시간 로그 필터에 유효하지 않은 값이 있습니다.');
                        taskbutton.state = true;
                    }
                }
            );
        }
        else
        {
            taskbutton.state = true;
            Ext.TaskManager.stop(taskbutton.task);
            taskbutton.setText('로그요청');

            Ext.data.JsonP.request(
                {
                    url : '/api/ftRTM/ReqEndRTLog',
                    params :
                    {
                        cid : Ext.encode(detail.objcid)
                    },
                    success : function(res_data)
                    {
                    },
                    failure : function(res_data)
                    {
                    }
                }
            );
        }
    },

    onPanelAfterRender: function(component, eOpts) {
        Ext.getCmp('cmb_protocol').select(Ext.getStore('store_rtm_protocol').getAt(0));
        Ext.getCmp('cmb_uid').select(Ext.getStore('store_rtm_uid').getAt(0));
        Ext.getCmp('cmb_direction').select(Ext.getStore('store_rtm_direction').getAt(2));

        if (Ext.getCmp('id_log_req').pressed === true)
        {
            Ext.getCmp('id_log_req').toggle();
        }

    }

});
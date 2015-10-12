
Ext.define('TMOV.view.win_tmov_chart', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.panel.Panel',
        'Ext.chart.Chart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line'
    ],

    height: 780,
    width: 1024,
    autoScroll: true,
    title: '상세 정보',
    maximizable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'cbo_tmov_range',
                            fieldLabel: '데이터 검색 기간 (최근)',
                            labelWidth: 160,
                            editable: false,
                            store: 'st_tmov_range',
                            valueField: 'index',
                            listeners: {
                                change: {
                                    fn: me.onCbo_tmov_rangeChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: 'CPU 사용량 추이',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'cpu',
                                        'ave_cpu'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    maximum: 100,
                                    minimum: 0,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'cpu',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 0
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_cpu',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '메모리 사용량 추이',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            theme: 'Base',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'memory'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    maximum: 100,
                                    minimum: 0,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'memory',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_memory',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '디스크 사용량 추이',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'disk'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'disk',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_disk',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '입력 패킷',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'inPackets'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    minimum: 0,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'inPackets',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_inPackets',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '출력 패킷',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'outPackets'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    minimum: 0,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'outPackets',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_outPackets',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '드랍 패킷',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'dropPackets'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    minimum: 0,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'dropPackets',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                },
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'ave_dropPackets',
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        stroke: '#FF0000',
                                        'stroke-width': 1,
                                        opacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '접속자 사용자 추이',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'user'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'user',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    layout: 'fit',
                    title: '전송 파일 추이',
                    items: [
                        {
                            xtype: 'chart',
                            height: 250,
                            width: 400,
                            insetPadding: 20,
                            store: 'st_tmov_detail',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'time'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'file'
                                    ],
                                    dashSize: 1,
                                    grid: true,
                                    position: 'left'
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'time',
                                    yField: 'file',
                                    fill: true,
                                    showMarkers: false,
                                    smooth: 0,
                                    style: {
                                        'stroke-width': 1
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWindowBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCbo_tmov_rangeChange: function(field, newValue, oldValue, eOpts) {
        var cbo_search_range = Ext.getCmp('cbo_tmov_range');
        _type = cbo_search_range.getValue();

        var start = 600;

        if (_type === 0)
            start = 600;

        if (_type === 1)
            start = 3600;


        if (_type === 2)
            start = 3600 * 24;

        if (_type === 3)
            start = 3600 * 24 * 7;

        if (_type === 4)
            start = 3600 * 24 * 30;

        var _id = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/getPlot',
                params :
                {
                    _id : Ext.encode(_id),
                    st : start,
                    et : 0
                },
                method : 'GET',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    console.log(resObj);

                    Ext.getStore('st_tmov_detail').loadData(resObj);
                },
                failure : function(res_data)
                {
                    console.log(res_data);
                }
            }
        );
    },

    onWindowAfterRender: function(component, eOpts) {
        Ext.getStore('st_tmov_detail').loadData([]);

        var cbo_search_range = Ext.getCmp('cbo_tmov_range');
        cbo_search_range.setValue(cbo_search_range.getStore().getAt(0).get(cbo_search_range.valueField));

        var _id = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/getPlot',
                params :
                {
                    _id : Ext.encode(_id),
                    st : 600,
                    et : 0
                },
                method : 'GET',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_detail').loadData(resObj);
                },
                failure : function(res_data)
                {
                    console.log(res_data);
                }
            }
        );


        component.timer = function()
        {
            var _id = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw._id;

            var cbo_search_range = Ext.getCmp('cbo_tmov_range');
            _type = cbo_search_range.getValue();

            var start = 600;

            if (_type !== 0)
                return;


            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/getPlot',
                    params :
                    {
                        _id : Ext.encode(_id),
                        st : start,
                        et : 0
                    },
                    method : 'GET',
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_tmov_detail').loadData(resObj);
                    },
                    failure : function(res_data)
                    {
                        console.log(res_data);
                    }
                }
            );
        };

        component.timer = setInterval(component.timer, 30000);
    },

    onWindowBeforeDestroy: function(component, eOpts) {
        clearInterval(component.timer);
    }

});
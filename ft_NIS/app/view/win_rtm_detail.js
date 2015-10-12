
Ext.define('SMC.view.win_rtm_detail', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 680,
    id: 'win_rtm_detail',
    width: 1012,
    autoScroll: true,
    constrainHeader: true,
    title: 'WeGuardia SMC 2.0',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onWin_rtm_detailAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_rtm_detailBeforeDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    id: 'pnl_rtm_chart',
                    autoScroll: true,
                    header: false,
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
                                    bodyStyle: 'background-color: #353535',
                                    title: '장비 정보',
                                    items: [
                                        {
                                            xtype: 'container'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_devicename',
                                            fieldLabel: '장비 명 ',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_ipaddress',
                                            fieldLabel: 'IP 주소 ',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_model',
                                            fieldLabel: '장비 모델 ',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_fwversion',
                                            fieldLabel: '펌웨어 버전 ',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_rdversion',
                                            fieldLabel: '램디스크 버전',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'txt_rtm_reboot',
                                            fieldLabel: '재부팅 횟수',
                                            labelAlign: 'right',
                                            labelStyle: 'color: white',
                                            fieldStyle: 'color: white'
                                        },
                                        {
                                            xtype: 'container'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    html: '<div id = "ct_rtm_cpu" ></div>',
                                    id: 'pnl_cpu',
                                    layout: 'fit',
                                    bodyStyle: 'background-color: #353535',
                                    title: 'CPU',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPnl_cpuAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    html: '<div id = "ct_rtm_mem" ></div>',
                                    id: 'pnl_memory',
                                    layout: 'fit',
                                    bodyStyle: 'background-color: #353535',
                                    title: 'Memory',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPnl_memoryAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    html: '<div id = "ct_rtm_net" ></div>',
                                    id: 'pnl_network',
                                    layout: 'fit',
                                    bodyStyle: 'background-color: #353535',
                                    title: 'Network',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onPnl_networkAfterRender,
                                            scope: me
                                        }
                                    }
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
                                            html: '<div id = "ct_rtm_eth0" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth0',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onPanelAfterRender1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            html: '<div id = "ct_rtm_eth1" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth1',
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
                                            html: '<div id = "ct_rtm_eth2" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth2',
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
                                            html: '<div id = "ct_rtm_eth3" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth3',
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
                                            html: '<div id = "ct_rtm_eth4" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth4',
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
                                            html: '<div id = "ct_rtm_eth5" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth5',
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
                                            html: '<div id = "ct_rtm_eth6" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth6',
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
                                            html: '<div id = "ct_rtm_eth7" ></div>',
                                            layout: 'fit',
                                            bodyStyle: 'background-color: #353535',
                                            title: 'eth7',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onPanelAfterRender8,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            height: 200,
                            id: 'gpn_rtm_interface',
                            autoScroll: true,
                            header: false,
                            title: 'Interface',
                            store: 'st_rtm_info',
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

                                        if (value === 1024 * 1024)
                                        {
                                            return '1G';
                                        }

                                        if (value === 1024 * 1024 * 10)
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
            ]
        });

        me.callParent(arguments);
    },

    onWin_rtm_detailAfterRender: function(component, eOpts) {
        clearInterval(Ext.getCmp('pnl_rtm_main').timer);
    },

    onWin_rtm_detailBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('ct_rtm_cpu').onClearInterval();
        Ext.getCmp('ct_rtm_mem').onClearInterval();
        Ext.getCmp('ct_rtm_network').onClearInterval();
        Ext.getCmp('ct_rtm_eth0').onClearInterval();
        Ext.getCmp('ct_rtm_eth1').onClearInterval();
        Ext.getCmp('ct_rtm_eth2').onClearInterval();
        Ext.getCmp('ct_rtm_eth3').onClearInterval();
        Ext.getCmp('ct_rtm_eth4').onClearInterval();
        Ext.getCmp('ct_rtm_eth5').onClearInterval();
        Ext.getCmp('ct_rtm_eth6').onClearInterval();
        Ext.getCmp('ct_rtm_eth7').onClearInterval();

        Ext.getCmp('pnl_rtm_main').timer_tick();
    },

    onPnl_cpuAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY : {
                    title : 'CPU 사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    interval: 20,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data : [
                    {
                        type : 'line',
                        showInLegend: false,
                        name: 'CPU',
                        legendText: 'CPU',
                        markerType: "none",
                        color: 'orange',
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.cpu, label : _element.time, legendText : 'CPU'});
                                }

                                Ext.getCmp('pnl_cpu').setTitle('CPU 사용률 ( ' + resObj[_len - 1].cpu + '% )');

                                obj.setData(obj, [_data1]);

                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });
                }
            },
            interval : 2000,
            name : 'CPU'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_cpu';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'CPU_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_memoryAfterRender: function(component, eOpts) {
        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY : {
                    title : '메모리 사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    interval: 20,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type : 'line',
                        showInLegend: false,
                        name: 'Memory',
                        legendText: 'Memory',
                        markerType: "none",
                        color: 'orange',
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.memory, label : _element.time, legendText : '메모리'});
                                }

                                component.setTitle('메모리 사용률 ( ' + resObj[_len - 1].memory + '% )');

                                obj.setData(obj, [_data1]);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });
                }
            },
            interval : 2000,
            name : 'Memory'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_mem';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '메모리_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_networkAfterRender: function(component, eOpts) {
        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'splineArea',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY : {
                    title : 'Network 사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    interval: 20,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type : 'splineArea',
                        showInLegend: false,
                        name: 'Network',
                        legendText: 'Network',
                        markerType: "none",
                        color: 'orange',
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.network, label : _element.time, legendText : '네트워크'});
                                }

                                component.setTitle('네트워크 사용률(' + resObj[_len - 1].network.toFixed(2) + '%)');

                                obj.setData(obj, [_data1]);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_network';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender1: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : '',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth0_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth0_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth0';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender2: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : '',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth1_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth1_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth1';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender3: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];
                                var _data2 = [];

                                for(var i = 0 ; i < _len ; i++)
                                {
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.eth2_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth2_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth2';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender4: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth3_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth3_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth3';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender5: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth4_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth4_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth4';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender6: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth5_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth5_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth5';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender7: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth6_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth6_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });
                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth6';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender8: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    labelFontColor: "white",
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY :
                {
                    //title : 'Kbps',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    minimum : 0,
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1,
                    labelFontColor: "white",
                    titleFontColor: "white"
                },
                data :
                [
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "입력 바이트",
                        color : 'yellow',
                        lineThickness: 2
                    },
                    {
                        type: "line",
                        showInLegend: true,
                        markerType: "none",
                        name: "출력 바이트",
                        color : "#00D8FF",
                        lineThickness: 2
                    }
                ],
                backgroundColor: "#353535",
                toolTip :
                {
                    shared: true
                },
                legend :
                {
                    fontSize : 12,
                    fontColor : 'white'
                }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/getDetailChart',
                            params :
                            {
                                cid : Ext.encode(cid)
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
                                    _data1.push({x : i, y : _element.eth7_inbytes / 1024, label : _element.time, legendText : '입력 바이트'});
                                    _data2.push({x : i, y : _element.eth7_outbytes / 1024, label : _element.time, legendText : '출력 바이트'});
                                }

                                obj.setData(obj, [_data1, _data2]);

                            }
                        });

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRTM/SeekDeviceInfo',
                            method : 'GET',
                            params : {
                                cid : Ext.encode(cid)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getCmp('txt_rtm_devicename').setValue(resObj.name);
                                Ext.getCmp('txt_rtm_ipaddress').setValue(resObj.gate_ip);
                                Ext.getCmp('txt_rtm_model').setValue(resObj.model);
                                Ext.getCmp('txt_rtm_fwversion').setValue(resObj.fw_version);
                                Ext.getCmp('txt_rtm_rdversion').setValue(resObj.rd_version);
                                Ext.getCmp('txt_rtm_reboot').setValue(resObj.reboot_count);
                                Ext.getStore('st_rtm_info').loadData(resObj.eth);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });

                }
            },
            interval : 2000,
            name : 'Network'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_rtm_eth7';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    }

});
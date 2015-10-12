
Ext.define('SSL.view.pnl_ssl_device_dashboard', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    id: 'pnl_ssl_device_dashboard',
    itemId: 'pnl_ssl_device_dashboard',
    header: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    header: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: 'CPU',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: 'Memory',
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
                            layout: 'fit',
                            title: 'Disk',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender2,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    header: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: '네트워크',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender4,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: '터널수',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender3,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    layout: 'fit',
                    header: false,
                    items: [
                        {
                            xtype: 'gridpanel',
                            title: '실시간 인증 로그',
                            store: 'st_ssl_auth_log',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'time',
                                    text: '시간'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'type',
                                    text: '분류'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'login',
                                    text: '이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'remote_ip',
                                    text: '원격지 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'virtual_ip',
                                    text: '임대 주소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_ssl_device_dashboardAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPanelAfterRender: function(component, eOpts) {
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

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetDetailData',
                            params :
                            {
                                _id : Ext.encode('5480f5f47b24af0d15b76048')
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
            _attr.id = 'ct_ssl_cpu';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'CPU_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender1: function(component, eOpts) {
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

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetDetailData',
                            params :
                            {
                                _id : Ext.encode('5480f5f47b24af0d15b76048')
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
            _attr.id = 'ct_ssl_memory';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '메모리_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender2: function(component, eOpts) {
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
                    title : '디스크 사용량(%)',
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
                        name: 'Disk',
                        legendText: 'Disk',
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
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetDetailData',
                            params :
                            {
                                _id : Ext.encode('5480f5f47b24af0d15b76048')
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.disk, label : _element.time, legendText : '디스크'});
                                }

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
            name : 'Disk'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_ssl_disk';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '디스크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);
        component.add(_widget);
    },

    onPanelAfterRender4: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    title : 'Time(min:sec)',
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
                        type: "line",
                        showInLegend: false,
                        markerType: "none",
                        name: "rx"
                    },
                    {
                        type: "line",
                        showInLegend: false,
                        markerType: "none",
                        name: "tx"
                    }
                ],
                backgroundColor: "#353535",
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetDetailData',
                            params :
                            {
                                _id : Ext.encode('5480f5f47b24af0d15b76048')
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
                                    _data1.push({x : i, y : _element.rx, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.tx, label : _element.time, legendText : 'Tx'});
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
            _attr.id = 'ct_ssl_network';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender3: function(component, eOpts) {
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
                    title : '터널수',
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
                        name: 'Tunnels',
                        legendText: 'Tunnels',
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
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetDetailData',
                            params :
                            {
                                _id : Ext.encode('5480f5f47b24af0d15b76048')
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.tunnels, label : _element.time, legendText : '터널'});
                                }

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
            name : 'Tunnels'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_ssl_tunnels';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '터널수', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);
        component.add(_widget);
    },

    onPnl_ssl_device_dashboardAfterRender: function(component, eOpts) {
        // Ext.Ajax.request(
        //     {
        //         url : 'api/ftSSL/GetDetailData',
        //         params : {
        //             _id : Ext.encode('5480f5f47b24af0d15b76048')
        //         },
        //         success : function(res_data)
        //         {
        //             var resObj = JSON.parse(res_data.responseText);
        //             console.log(resObj);
        //             Ext.getStore('st_ssl_dashboard').loadData(resObj);
        //         }
        //     });
    }

});
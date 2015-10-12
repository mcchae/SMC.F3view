
Ext.define('SSL.view.win_ssl_dashboard', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 768,
    id: 'win_ssl_dashboard',
    width: 1024,
    title: '대시보드',
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
                            title: 'CPU 추이',
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
                            title: '메모리 추이',
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
                            title: '디스크 추이',
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
                            title: '네트워크 추이',
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
                            title: '터널수 추이',
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
                                    dataIndex: 'timevalue',
                                    text: '시간'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'logintype',
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
                beforedestroy: {
                    fn: me.onWin_ssl_dashboardBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPanelAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'column',
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
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
                    interval: 20
                },
                data : [
                    {
                        type : 'area',
                        showInLegend: false,
                        name: 'CPU',
                        legendText: 'CPU',
                        color : "rgba(0,84,255,0.5)",
                        lineThickness: 2
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {

                    var start_ts = (Math.round(+new Date() / 1000)) - 600;
                    var end_ts = (Math.round(+new Date() / 1000));

                    var grid = Ext.getCmp('gpn_ssl_devices');
                    var _id = grid.getSelectionModel().getSelection()[0].raw._id;
                    var ip = grid.getSelectionModel().getSelection()[0].raw.ip;


                    var query = {'server_ip' : {'$in' : [ip]}, '_time' : {'$gte' : start_ts, '$lt' : end_ts} };

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSL/GetLog',
                            params :
                            {
                                query : Ext.encode(query),
                                offset : 0,
                                limit : 100
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_auth_log').loadData(resObj.retval.data);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });


                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSLMsgMgr/getDetailChart',
                            params :
                            {
                                _id : Ext.encode(_id)
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_dev_dashboard').loadData(resObj);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });

                    var items = Ext.getStore('st_ssl_dev_dashboard').data.items;
                    var _data1 = [];
                    var _len = Ext.getStore('st_ssl_dev_dashboard').data.length;

                    for (var i = 0 ; i < _len; i++)
                    {
                        var _element = items[i].raw;
                        _data1.push({x : i, y : _element.cpu, label : _element.time, legendText : 'CPU'});
                    }

                    obj.setData(obj, [_data1]);

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
            drawType : 'line',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
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
                    interval: 20
                },
                data :
                [
                    {
                        type : 'area',
                        showInLegend: false,
                        name: 'Memory',
                        legendText: 'Memory',
                        color : "rgba(0,216,255, 1)",
                        lineThickness: 2
                    }

                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var items = Ext.getStore('st_ssl_dev_dashboard').data.items;
                    var _data1 = [];
                    var _len = Ext.getStore('st_ssl_dev_dashboard').data.length;


                    for (var i = 0 ; i < _len; i++)
                    {
                        var _element = items[i].raw;
                        _data1.push({x : i, y : _element.memory, label : _element.time, legendText : 'Memory'});
                    }

                    obj.setData(obj, [_data1]);
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
            drawType : 'splineArea',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
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
                    interval: 20
                },
                data :
                [
                    {
                        type : 'area',
                        showInLegend: false,
                        name: 'Disk',
                        legendText: 'Disk',
                        color : "rgba(165,102,255,0.5)",
                        lineThickness: 2
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var items = Ext.getStore('st_ssl_dev_dashboard').data.items;
                    var _data1 = [];
                    var _len = Ext.getStore('st_ssl_dev_dashboard').data.length;

                    for (var i = 0 ; i < _len; i++)
                    {
                        var _element = items[i].raw;
                        _data1.push({x : i, y : _element.disk, label : _element.time, legendText : '디스크크'});
                    }

                    obj.setData(obj, [_data1]);
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
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY :
                {
                    title : '네트워크 추이(Kbps)',
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    gridColor: "gray",
                    valueFormatString: "#0Kbps",
                    gridThickness : 1
                },
                data :
                [
                    {
                        type: "area",
                        showInLegend: false,
                        markerType: "none",
                        name: "rx"
                    },
                    {
                        type: "area",
                        showInLegend: false,
                        markerType: "none",
                        name: "tx"
                    }
                ],
                backgroundColor: "white",
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    var items = Ext.getStore('st_ssl_dev_dashboard').data.items;
                    var _data1 = [];
                    var _data2 = [];
                    var _len = Ext.getStore('st_ssl_dev_dashboard').data.length;

                    for (var i = 0 ; i < _len; i++)
                    {
                        var _element = items[i].raw;
                        _data1.push({x : i, y : _element.rx / 1024, label : _element.time, legendText : 'Rx'});
                        _data2.push({x : i, y : (_element.tx * -1) / 1024, label : _element.time, legendText : 'Tx'});
                    }

                    obj.setData(obj, [_data1, _data2]);
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
            _attr.id = 'ct_ssl_network';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender3: function(component, eOpts) {
        var _tplList = {
            drawType : 'line',
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1,
                    gridColor : "gray"
                },
                axisY : {
                    title : '터널수 추이',
                    minimum : 0,
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineColor: "white",
                    lineThickness: 1,
                    gridColor: "gray",
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'area',
                        showInLegend: false,
                        name: 'tunnels',
                        legendText: 'tunnels',
                        color : "rgba(255,187,0,0.5)",
                        lineThickness: 2
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent)
                {

                    var items = Ext.getStore('st_ssl_dev_dashboard').data.items;
                    var _data1 = [];
                    var _len = Ext.getStore('st_ssl_dev_dashboard').data.length;


                    for (var i = 0 ; i < _len; i++)
                    {
                        var _element = items[i].raw;
                        _data1.push({x : i, y : _element.tunnels, label : _element.time, legendText : 'tunnels'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 2000,
            name : 'tunnels'
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

        var _widget = makeWidget(_tplList.drawType, 'tunnels', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onWin_ssl_dashboardBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('ct_ssl_cpu').onClearInterval();
        Ext.getCmp('ct_ssl_memory').onClearInterval();
        Ext.getCmp('ct_ssl_disk').onClearInterval();
        Ext.getCmp('ct_ssl_network').onClearInterval();
        Ext.getCmp('ct_ssl_tunnels').onClearInterval();
    }

});
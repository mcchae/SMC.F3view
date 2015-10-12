
Ext.define('TMOV.view.win_tmov_detail', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.panel.Panel'
    ],

    height: 768,
    id: 'win_tmov_detail',
    width: 1024,
    constrainHeader: true,
    title: '상세 정보',
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
                            title: '패킷 추이',
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
                            title: '트래픽 추이',
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
                            title: '전체 프로세스 추이',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender5,
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
                            layout: 'fit',
                            title: '접속 사용자 추이',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender31,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: '전송 시도 파일 추이',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender41,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            layout: 'fit',
                            title: '필요 데몬 서비스 추이',
                            listeners: {
                                afterrender: {
                                    fn: me.onPanelAfterRender51,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_detailAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_detailBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPanelAfterRender: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1,
                    interval: 10
                },
                data : [
                    {
                        type : 'area',
                        name: 'CPU',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.cpu, 10), label : _element.time, legendText : 'CPU'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'CPU'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_cpu';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'CPU_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender1: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1,
                    interval: 10
                },
                data : [
                    {
                        type : 'area',
                        name: 'Memory',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.memory, 10), label : _element.time, legendText : 'Memory'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'Memory'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_memory';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Memory_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender2: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1,
                    interval: 10
                },
                data : [
                    {
                        type : 'area',
                        name: 'Disk',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true },
                theme : 'theme3'
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.disk, 10), label : _element.time, legendText : 'Disk'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'Disk'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_disk';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '디스크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender3: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'area',
                        name: '입력 패킷',
                        color: "#004B8D"
                    },
                    {
                        type : 'area',
                        name: '출력 패킷',
                        color: "#7ABAF2"
                    }
                ],
                toolTip : { shared: true }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];
                    var _data2 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.in_packets, 10), label : _element.time, legendText : 'Packets'});
                        _data2.push({x : i, y : parseInt(_element.out_packets * -1, 10), label : _element.time, legendText : 'Packets'});
                    }

                    obj.setData(obj, [_data1, _data2]);
                }
            },
            interval : 1000,
            name : 'Packets'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_packets';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Packets', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender4: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'area',
                        name: '입력 트래픽',
                        color: "#004B8D"
                    },
                    {
                        type : 'area',
                        name: '출력 트래픽',
                        color: "#7ABAF2"
                    }
                ],
                toolTip : { shared: true }
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];
                    var _data2 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.in_bytes, 10), label : _element.time, legendText : 'Bytes'});
                        _data2.push({x : i, y : parseInt(_element.out_bytes * -1, 10), label : _element.time, legendText : 'Bytes'});
                    }

                    obj.setData(obj, [_data1, _data2]);
                }
            },
            interval : 1000,
            name : 'Bytes'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_traffic';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Bytes', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender5: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'column',
                        name: 'Process',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true },
                theme : 'theme3'
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.process, 10), label : _element.time, legendText : 'Process'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'Process'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_process';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '프로세스', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onWin_tmov_detailAfterRender: function(component, eOpts) {
        // clearInterval(Ext.getCmp('pnl_tmov_main').timer);

        // var cbo_search_range = Ext.getCmp('cbo_tmov_range');
        // cbo_search_range.setValue(cbo_search_range.getStore().getAt(0).get(cbo_search_range.valueField));

        // var grid = Ext.getCmp('gpn_tmov_main');
        // var _id = grid.getSelectionModel().getSelection()[0].raw._id;

        // Ext.Ajax.request(
        //     {
        //         url : 'api/ftTMOV/getPlot',
        //         params :
        //         {
        //             _id : Ext.encode(_id),
        //             st : 600,
        //             et : 0
        //         },
        //         method : 'GET',
        //         success : function(res_data)
        //         {
        //             var resObj = JSON.parse(res_data.responseText);
        //             Ext.getStore('st_tmov_detail').loadData(resObj);
        //         },
        //         failure : function(res_data)
        //         {
        //             console.log(res_data);
        //         }
        //     }
        // );

        // component.timer = function()
        // {
        //     var grid = Ext.getCmp('gpn_tmov_main');
        //     var _id = grid.getSelectionModel().getSelection()[0].raw._id;

        //     cbo_search_range = Ext.getCmp('cbo_tmov_range');
        //     _type = cbo_search_range.getValue();

        //     var start = 600;

        //     if (_type === 0)
        //         start = 600;

        //     if (_type === 1)
        //         start = 3600;


        //     if (_type === 2)
        //         start = 3600 * 24;

        //     if (_type === 3)
        //         start = 3600 * 24 * 7;

        //     if (_type === 4)
        //         start = 3600 * 24 * 30;


        //     Ext.Ajax.request(
        //         {
        //             url : 'api/ftTMOV/getPlot',
        //             params :
        //             {
        //                 _id : Ext.encode(_id),
        //                 st : start,
        //                 et : 0
        //             },
        //             method : 'GET',
        //             success : function(res_data)
        //             {
        //                 var resObj = JSON.parse(res_data.responseText);
        //                 Ext.getStore('st_tmov_detail').loadData(resObj);
        //             },
        //             failure : function(res_data)
        //             {
        //                 console.log(res_data);
        //             }
        //         }
        //     );
        // };

        // component.timer = setInterval(component.timer, 5000);
    },

    onWin_tmov_detailBeforeDestroy: function(component, eOpts) {
        // Ext.getCmp('ct_tmov_cpu').onClearInterval();
        // Ext.getCmp('ct_tmov_memory').onClearInterval();
        // Ext.getCmp('ct_tmov_disk').onClearInterval();
        // Ext.getCmp('ct_tmov_packets').onClearInterval();
        // Ext.getCmp('ct_tmov_traffic').onClearInterval();
        // Ext.getCmp('ct_tmov_process').onClearInterval();
        // Ext.getCmp('ct_tmov_user').onClearInterval();
        // Ext.getCmp('ct_tmov_file').onClearInterval();
        // Ext.getCmp('ct_tmov_daemon').onClearInterval();
        // clearInterval(component.timer);

        // Ext.getStore('st_tmov_detail').loadData([]);
        // Ext.getCmp('pnl_tmov_main').timer_tick();
    },

    onPanelAfterRender31: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'column',
                        name: '접속 사용자 수',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true },
                theme : 'theme3'
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.cur_user, 10), label : _element.time, legendText : 'user'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'user'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_user';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'user', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender41: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'column',
                        name: '전체 전송 파일 수',
                        color: "#004B8D"
                    },
                    {
                        type : 'column',
                        name: '전송 성공 파일 수',
                        color: "#7ABAF2"
                    }
                ],
                toolTip : { shared: true },
                theme : 'theme3'
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];
                    var _data2 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.all_transfer_file, 10), label : _element.time, legendText : 'File'});
                        _data2.push({x : i, y : parseInt(_element.all_success_file, 10), label : _element.time, legendText : 'File'});
                    }

                    obj.setData(obj, [_data1, _data2]);
                }
            },
            interval : 1000,
            name : 'File'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_file';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'File', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPanelAfterRender51: function(component, eOpts) {
        var _tplList = {
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12,
                    lineThickness: 1,
                    gridThickness: 1
                },
                axisY : {
                    minimum : 0,
                    labelFontSize : 12,
                    lineThickness: 1,
                    gridThickness : 1
                },
                data : [
                    {
                        type : 'area',
                        name: '현재 데몬 서비스 수',
                        color: "#004B8D"
                    }
                ],
                toolTip : { shared: true },
                theme : 'theme3'
            },
            requestInfo : {
                getData : function(obj, parent)
                {
                    var resObj = Ext.getStore('st_tmov_detail').data.items;

                    var _len = resObj.length;
                    var _data1 = [];

                    for(var i = 0 ; i < _len ; i++)
                    {
                        var _element = resObj[i].raw;
                        _data1.push({x : i, y : parseInt(_element.cur_daemon_service, 10), label : _element.time, legendText : 'Daemon'});
                    }

                    obj.setData(obj, [_data1]);
                }
            },
            interval : 1000,
            name : 'Daemon'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_tmov_daemon';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'Daemon', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    }

});

Ext.define('SMC.view.pnl_mon_main', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    height: 1000,
    id: 'pnl_mon_main',
    width: 1800,
    title: 'WeGuardia™ SMC2.0',

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
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            title: '시스템 정보',
                            items: [
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_os',
                                    fieldLabel: '운영체제',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_process',
                                    fieldLabel: '프로세서',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_core',
                                    fieldLabel: '코어 개수',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_memory',
                                    fieldLabel: '메모리',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_disk',
                                    fieldLabel: '디스크 용량',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_mon_system',
                                    fieldLabel: '시스템 종류',
                                    labelAlign: 'right',
                                    labelStyle: 'font-size : 16px',
                                    fieldStyle: 'font-size : 16px'
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'pnl_mon_cpu',
                            layout: 'fit',
                            title: 'CPU',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_cpuAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'pnl_mon_mem',
                            layout: 'fit',
                            title: 'Memory',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_memAfterRender,
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
                            id: 'pnl_mon_disk',
                            layout: 'fit',
                            title: 'Disk',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_diskAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'pnl_mon_network',
                            layout: 'fit',
                            title: '네트워크',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_networkAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            id: 'pnl_mon_packets',
                            layout: 'fit',
                            title: '패킷',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_packetsAfterRender,
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
                            id: 'pnl_mon_process',
                            layout: 'fit',
                            title: '프로세스',
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_mon_processAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 2,
                            id: 'pnl_mon_proclist',
                            title: '프로세스 목록',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    store: 'st_mon_process',
                                    viewConfig: {
                                        preserveScrollOnRefresh: true
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 120,
                                            dataIndex: 'name',
                                            text: 'Name'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'pid',
                                            text: 'PID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'cpu',
                                            text: 'CPU'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'mem',
                                            text: 'Memory'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 120,
                                            dataIndex: 'io_read_count',
                                            text: 'Io_read_count'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 120,
                                            dataIndex: 'io_write_count',
                                            text: 'Io_write_count'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 120,
                                            dataIndex: 'io_read_bytes',
                                            text: 'Io_read_byte'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 120,
                                            dataIndex: 'io_write_bytes',
                                            text: 'Io_write_byte'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 400,
                                            dataIndex: 'cmd',
                                            text: 'Cmd'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_mon_mainAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_mon_mainBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_mon_cpuAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'splineArea',
            chartAttr :
            {
                axisX : {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY : {
                    title : '사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data : [
                    {
                        type : 'splineArea',
                        showInLegend: true,
                        name: 'CPU',
                        legendText: 'CPU',
                        markerType: "none",
                        color: "rgba(0,219,255,.3)"
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
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 1
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

                                Ext.getCmp('pnl_mon_cpu').setTitle('CPU 사용률 (' + resObj[_len - 1].cpu.toFixed(2) + '%)');

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
            _attr.id = 'ct_dash_cpu';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, 'CPU_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_mon_memAfterRender: function(component, eOpts) {
        var _tplList = {
            graphType : '',
            widgetTitle : '',
            drawType : 'splineArea',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY : {
                    title : '사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data :
                [
                    {
                        type : 'splineArea',
                        showInLegend: true,
                        name: 'Memory',
                        legendText: 'Memory',
                        markerType: "none",
                        color: "rgba(95,0,255,.3)"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 2
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

                                Ext.getCmp('pnl_mon_mem').setTitle('메모리 사용률(' + resObj[_len - 1].memory.toFixed(2) + '%)');

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
            _attr.id = 'ct_dash_mem';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '메모리_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_mon_diskAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'splineArea',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY : {
                    title : '사용량(%)',
                    minimum : 0,
                    maximum : 100,
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data :
                [
                    {
                        type : 'splineArea',
                        showInLegend: true,
                        name: 'Disk',
                        legendText: 'Disk',
                        markerType: "none",
                        color: "rgba(29,219,22,.3)"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 3
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

                                Ext.getCmp('pnl_mon_disk').setTitle('디스크 사용률(' + resObj[_len - 1].disk + '%)');

                                obj.setData(obj, [_data1], 20);
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
            _attr.id = 'ct_dash_disk';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '디스크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_mon_networkAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'splineArea',
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
                        type: "splineArea",
                        showInLegend: true,
                        name: "rx",
                        markerType: "none",
                        color: "rgba(0,84,255,.5)"
                    },
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "tx",
                        markerType: "none",
                        color: "rgba(255,94,0,.5)"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 4
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

                                    _data1.push({x : i, y : _element.net_bytes_recv, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.net_bytes_sent, label : _element.time, legendText : 'Tx'});
                                }

                                Ext.getCmp('pnl_mon_network').setTitle('네트워크 사용률(Rx : ' + resObj[_len - 1].net_bytes_recv + ' Kbps, Tx : ' + resObj[_len - 1].net_bytes_sent + ' Kbps)');

                                obj.setData(obj, [_data1, _data2], 20);
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
            _attr.id = 'ct_dash_network';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '네트워크_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_mon_packetsAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'splineArea',
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
                        type: "splineArea",
                        showInLegend: true,
                        name: "rx",
                        markerType: "none",
                        color: "rgba(0,84,255,.5)"
                    },
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "tx",
                        markerType: "none",
                        color: "rgba(255,94,0,.5)"
                    }
                ],
                toolTip : { shared: true },
                legend : { fontSize : 12 }
            },
            requestInfo : {
                getData : function(obj, parent){

                    Ext.Ajax.request(
                        {
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 5
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
                                    _data1.push({x : i, y : _element.net_packets_recv, label : _element.time, legendText : 'Rx'});
                                    _data2.push({x : i, y : _element.net_packets_sent, label : _element.time, legendText : 'Tx'});
                                }

                                obj.setData(obj, [_data1, _data2], 20);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });
                }
            },
            interval : 2000,
            name : 'Packets'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_packets';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '패킷_사용량', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);

        component.add(_widget);
    },

    onPnl_mon_processAfterRender: function(component, eOpts) {
        var _tplList = {
            drawType : 'splineArea',
            chartAttr : {
                axisX :
                {
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                axisY : {
                    title : '프로세스 수',
                    minimum : 0,
                    labelFontSize : 12,
                    titleFontSize : 12
                },
                data :
                [
                    {
                        type : 'splineArea',
                        showInLegend: true,
                        name: 'Process',
                        legendText: 'Process',
                        markerType: "none",
                        color: "rgba(255,95,0,.5)"
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
                            url : 'api/ftSysMon/fetch_rrd',
                            params :
                            {
                                chart_type : 6
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);

                                var _len = resObj.length;
                                var _data1 = [];

                                for(var i = 0 ; i < _len ; i++){
                                    var _element = resObj[i];
                                    _data1.push({x : i, y : _element.process, label : _element.time, legendText : '프로세스'});
                                }

                                Ext.getCmp('pnl_mon_process').setTitle('프로세스(' + resObj[_len - 1].process + ')');

                                obj.setData(obj, [_data1]);
                            },
                            failure : function(res_data)
                            {
                                console.log(res_data);
                            }
                        });


                    Ext.Ajax.request(
                        {
                            url : 'api/ftSysMon/get_procs',
                            params :
                            {
                                topn : 20,
                                order_by : 0
                            },
                            method : 'GET',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_mon_process').loadData(resObj);
                            }
                        });

                }
            },
            interval : 2000,
            name : 'Process'
        };

        var makeWidget = function(drawtype, widgetTitle, chartAttr, reqInfo, interval){

            var _widgettype = 'Extjs4Canvas';
            var _attr = {};
            _attr.graphType = drawtype;
            _attr.chartInfo = chartAttr;
            _attr.requestInfo = reqInfo;
            _attr.interval = interval;
            _attr.id = 'ct_dash_process';

            var _item = Ext.create(_widgettype, _attr);

            return _item;
        };

        var _widget = makeWidget(_tplList.drawType, '프로세스 수', _tplList.chartAttr, _tplList.requestInfo, _tplList.interval);
        component.add(_widget);
    },

    onPnl_mon_mainAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSysMon/get_systeminfo',
                method : 'GET',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getCmp('txt_mon_os').setValue(resObj.os);
                    Ext.getCmp('txt_mon_process').setValue(resObj.cpu_model);
                    Ext.getCmp('txt_mon_core').setValue(resObj.cpu_count);
                    Ext.getCmp('txt_mon_memory').setValue(resObj.mem_size);
                    Ext.getCmp('txt_mon_disk').setValue(resObj.disk_size);
                    Ext.getCmp('txt_mon_system').setValue(resObj.type);
                },
                failure : function(res_data)
                {
                    console.log(res_data);
                }
            });
    },

    onPnl_mon_mainBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('ct_dash_cpu').onClearInterval();
        Ext.getCmp('ct_dash_mem').onClearInterval();
        Ext.getCmp('ct_dash_disk').onClearInterval();
        Ext.getCmp('ct_dash_network').onClearInterval();
        Ext.getCmp('ct_dash_packets').onClearInterval();
        Ext.getCmp('ct_dash_process').onClearInterval();
    }

});

Ext.define('SMC.view.pnl_rtm_panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_rtm_panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    id: 'pnl_rtm_panel',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            rtm_task: {
                run: function() {        
                    //var store = Ext.getStore('store_rtm_device');        
                    var store = me.query('gridpanel[itemId=IId_grid_rtm_view]')[0].getStore();        
                    var treeObj  = Ext.getCmp('pnl_smc_device_tree_view_xtm');
                    var groupCid = treeObj.getSelectionModel().getSelection()[0].raw.cid;
                    
                    Ext.Ajax.request(
                        {
                            url : 'api/ftRTM/SeekDeviceList',
                            params :
                            {
                                group_cid : Ext.encode(groupCid)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                //console.log('task : ', resObj);
                                store.loadData(resObj);
                            }
                        }
                    );
                },
                interval: 5000
            },
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'west',
                    hidden: true,
                    id: 'grid_rtm_view',
                    width: 150,
                    autoScroll: true,
                    header: false,
                    title: 'My Grid Panel',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (record.get('activation') === false)
                                {
                                    metaData.tdCls = 'ico_rtm_noresponse';
                                }
                                else
                                {
                                    if (record.get('port_line_normal') === false)
                                    {
                                        metaData.tdCls = 'ico_rtm_warning';
                                    }
                                    else
                                    {
                                        metaData.tdCls = 'ico_rtm_normal';
                                    }
                                }


                                return value;
                            },
                            dataIndex: 'name',
                            text: '장비 명'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gate_ip',
                            text: 'IP 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'all_input_packets',
                            text: '입력패킷'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'all_drop_packets',
                            text: '드랍패킷'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'sessions',
                            text: '세션'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[0];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[1];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[2];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[3];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth3'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[4];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth4'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[5];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth5'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[6];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth6'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var item = value[7];

                                if (item.linkspeed === 0)
                                metaData.tdCls = 'ico_rtm_linkdown';

                                if (item.linkspeed === 10)
                                metaData.tdCls = 'ico_rtm_10m';

                                if (item.linkspeed === 100)
                                metaData.tdCls = 'ico_rtm_100m';

                                return item.ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth7'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[0];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth0 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[1];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth1 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[2];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth2 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[3];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth3 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[4];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth4 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[5];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth5 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[6];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth6 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;
                                var item = value[7];

                                if (item.bandwidth === 0)
                                return '0';

                                if (item.kbps > 1024)
                                kbps = Math.floor(item.kbps / 1024) + 'GB';
                                else
                                kbps = item.kbps + 'KB';

                                bandwidth = item.bandwidth;

                                if (item.bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (item.bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (item.bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (item.bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (item.bandwidth === 1024 * 100)
                                return item.util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth7 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'cpu_util',
                            text: 'CPU'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'cpu_max',
                            text: '최대 CPU'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'cpu_maxtime',
                            text: '최대 CPU 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'mem_util',
                            text: 'Memory'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'mem_max',
                            text: '최대 Memory'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'mem_maxtime',
                            text: '최대 Memory 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'net_util',
                            text: '네트워크'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value + '%';
                            },
                            dataIndex: 'net_max',
                            text: '최대 네트워크'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'net_maxtime',
                            text: '최대 네트워크 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'fw_version',
                            text: '펌웨어 버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'rd_version',
                            text: '램디스크 버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'rd_version',
                            text: '이미지 버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'tunnels',
                            text: '터널 수'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'detect_count',
                            text: '탐지 카운트'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'drop_count',
                            text: '차단 카운트'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'rpm',
                            text: 'RPM'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'operation_time',
                            text: '가동시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'checker',
                            text: 'Checker'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'power',
                            text: 'Power'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'except_msg',
                            text: '점검제외시 알람 메시지'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etc',
                            text: '기타 정보'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGrid_rtm_viewItemDblClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    region: 'center',
                    itemId: 'cont_grid_rtm_view',
                    layout: 'fit'
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_rtm_panelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGrid_rtm_viewItemDblClick: function(dataview, record, item, index, e, eOpts) {
        Ext.TaskManager.stop(this.rtm_task);

        gridObj = Ext.getCmp('grid_rtm_view');
        var item = gridObj.getSelectionModel().getSelection()[0].raw;

        var win = Ext.create('SMC.view.pnl_rtm_detail');

        var detail = Ext.getCmp('pnl_rtm_detail');
        detail.objid = item._id;
        detail.objcid = item['@cid'];
        detail.parent_panel = this.rtm_task;

        win.show();
    },

    onPnl_rtm_panelAfterRender: function(component, eOpts) {
        var me = this;
        ///*
        //사용자 컬럼 정의 그리드 생성 (문중현)
        SMC_VIEW.create_grid_panel(
            'rtm_view',
            'obj_rtm',
            'IId_grid_rtm_view',
            true,
            function(_grid_tpl){

                var _monitor_grid = Ext.create(_grid_tpl, {
                    id : 'grid_rtm_view'
                });

                _monitor_grid.on('itemdblclick', function(obj, record, item, index, e, eOpts){
                    Ext.TaskManager.stop(me.rtm_task);

                    gridObj = Ext.getCmp('grid_rtm_view');
                    var item = gridObj.getSelectionModel().getSelection()[0].raw;

                    var win = Ext.create('SMC.view.pnl_rtm_detail');

                    var detail = Ext.getCmp('pnl_rtm_detail');
                    detail.objid = item._id;
                    detail.objcid = item['@cid'];
                    detail.parent_panel = me.rtm_task;

                    win.show();
                });

                var _cont = component.query('container[itemId=cont_grid_rtm_view]')[0];
                _cont.add(_monitor_grid);
                Ext.TaskManager.start(me.rtm_task);
            }
        );

        //*/

    }

});
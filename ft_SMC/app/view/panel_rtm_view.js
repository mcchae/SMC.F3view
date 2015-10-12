
Ext.define('SMC.view.panel_rtm_view', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 768,
    width: 1024,
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    id: 'grid_rtm_view',
                    autoScroll: true,
                    header: false,
                    title: 'My Grid Panel',
                    store: 'store_rtm_device',
                    columns: [
                        {
                            xtype: 'gridcolumn',
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
                                return value[0].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth0'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[1].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth1'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[2].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth2'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[3].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth3'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[4].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth4'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[5].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth5'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[6].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth6'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[7].ip;
                            },
                            dataIndex: 'eth',
                            text: 'eth7'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var kbps;
                                var bandwidth;

                                if (value[0].kbps > 1024)
                                kbps = Math.floor(value[0].kbps / 1024) + 'GB';
                                else
                                kbps = value[0].kbps + 'KB';

                                bandwidth = value[0].bandwidth;

                                if (value[0].bandwidth === 1024 * 10)
                                bandwidth = '10MB';

                                if (value[0].bandwidth === 1024 * 100)
                                bandwidth = '100MB';

                                if (value[0].bandwidth === 1024 * 1000)
                                bandwidth = '1GB';

                                if (value[0].bandwidth === 1024 * 1024 * 10)
                                bandwidth = '10GB';

                                if (value[0].bandwidth === 1024 * 100)
                                return value[0].util + '% (' + kbps + ' / ' + bandwidth + ')';

                            },
                            dataIndex: 'eth',
                            text: 'eth0 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[1].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth1 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[2].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth2 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[3].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth3 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[4].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth4 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[5].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth5 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[6].util;
                            },
                            dataIndex: 'eth',
                            text: 'eth6 사용량'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value[7].util;
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
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPanelAfterRender: function(component, eOpts) {
        var store = Ext.getStore('store_rtm_device');

        var task = {
            run : function() {

                Ext.Ajax.request(
                    {
                        url : 'api/ftRTM2/SeekDeviceInfo',
                        params : {
                            cid : Ext.encode('000000001D0100000600020087732520')
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);

                            console.log(resObj);

                            delete resObj.id;

                            store.loadData([resObj]);
                        }
                    });
            },
            interval : 5000
        };

        Ext.TaskManager.start(task);
    }

});

Ext.define('TMOV.view.pnl_tmov_main', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    border: false,
    id: 'pnl_tmov_main',
    layout: 'border',
    header: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmover_mainAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_tmover_mainBeforeDestroy,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    border: false,
                    header: false,
                    title: '모니터',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            border: false,
                            id: 'gpn_tmov_main',
                            title: '모니터링',
                            store: 'st_tmov_device',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'exporterbutton',
                                                    tree: '',
                                                    format: 'excel',
                                                    type: 'tmover',
                                                    width: 80,
                                                    text: '엑셀로 저장'
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 10
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 80,
                                                    text: '인증 키 수정',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_tmov_monitor_search',
                                                    fieldLabel: '서버팜 이름',
                                                    labelAlign: 'right',
                                                    listeners: {
                                                        specialkey: {
                                                            fn: me.onTxf_tmov_monitor_searchSpecialkey,
                                                            scope: me
                                                        },
                                                        focus: {
                                                            fn: me.onTxf_tmov_monitor_searchFocus,
                                                            scope: me
                                                        },
                                                        blur: {
                                                            fn: me.onTxf_tmov_monitor_searchBlur,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 10
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btn_tmov_monitor_search',
                                                    width: 80,
                                                    text: '검색',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_tmov_monitor_searchClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return value;
                                    },
                                    minWidth: 100,
                                    width: 220,
                                    dataIndex: 'server_name',
                                    text: '서버팜 이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return value;
                                    },
                                    minWidth: 100,
                                    width: 120,
                                    align: 'center',
                                    dataIndex: 'ip',
                                    text: 'IP 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if ( value === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                            return "응답없음";
                                        }
                                        else
                                        {
                                            return "정상동작";
                                        }
                                    },
                                    minWidth: 80,
                                    width: 100,
                                    align: 'center',
                                    dataIndex: 'state',
                                    text: '서버팜 상태'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }


                                        return parseInt(value, 10) + ' (' + parseInt(record.raw.ave.inPackets, 10) + ')';
                                    },
                                    width: 120,
                                    align: 'right',
                                    dataIndex: 'inPackets',
                                    text: '입력 패킷'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return parseInt(value, 10) + ' (' + parseInt(record.raw.ave.outPackets, 10) + ')';
                                    },
                                    width: 120,
                                    align: 'right',
                                    dataIndex: 'outPackets',
                                    text: '출력 패킷'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return parseInt(value, 10) + ' (' + parseInt(record.raw.ave.dropPackets, 10) + ')';
                                    },
                                    width: 120,
                                    align: 'right',
                                    dataIndex: 'dropPackets',
                                    text: '드랍 패킷'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return parseInt(value, 10) + '% (' + parseInt(record.raw.ave.cpu, 10) + '%)';
                                    },
                                    width: 100,
                                    align: 'right',
                                    dataIndex: 'cpu',
                                    text: 'CPU'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return parseInt(value, 10) + '% (' + parseInt(record.raw.ave.memory, 10) + '%)';
                                    },
                                    width: 100,
                                    align: 'right',
                                    dataIndex: 'memory',
                                    text: '메모리'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return parseInt(value, 10) + '% (' + parseInt(record.raw.ave.disk, 10) + '%)';
                                    },
                                    width: 100,
                                    align: 'right',
                                    dataIndex: 'disk',
                                    text: '디스크'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        if (value === 1)
                                        return 'Active';
                                        else
                                        return 'Standby';
                                    },
                                    width: 100,
                                    align: 'right',
                                    dataIndex: 'ha',
                                    text: '이중화 상태'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return value;
                                    },
                                    width: 80,
                                    align: 'right',
                                    dataIndex: 'user_count',
                                    text: '사용자',
                                    tooltip: '현재 접속 사용자 수 / 전체 사용자 수'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.raw.state === 0)
                                        {
                                            metaData.style = 'color:#FF0000;';
                                        }

                                        return value;
                                    },
                                    width: 120,
                                    align: 'right',
                                    dataIndex: 'file_count',
                                    text: '전송시도 파일',
                                    tooltip: '전송 성공 파일 수 / 전체 전송 시도 파일 수'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    align: 'right',
                                    dataIndex: 'daemon_count',
                                    text: '데몬 서비스',
                                    tooltip: '전송 성공 파일 수 / 전체 전송 시도 파일 수',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    value = value - 64;
                                                }

                                                if (value >= 32)
                                                {
                                                    value = value - 32;
                                                }

                                                if (value >= 16)
                                                {
                                                    value = value - 16;
                                                }

                                                if (value >= 8)
                                                {
                                                    value = value - 8;
                                                }

                                                if (value >= 4)
                                                {
                                                    value = value - 4;
                                                }

                                                if (value >= 2)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'MySQL'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    value = value - 64;
                                                }

                                                if (value >= 32)
                                                {
                                                    value = value - 32;
                                                }

                                                if (value >= 16)
                                                {
                                                    value = value - 16;
                                                }

                                                if (value >= 8)
                                                {
                                                    value = value - 8;
                                                }

                                                if (value >= 4)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'pkTransfer'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    value = value - 64;
                                                }

                                                if (value >= 32)
                                                {
                                                    value = value - 32;
                                                }

                                                if (value >= 16)
                                                {
                                                    value = value - 16;
                                                }

                                                if (value >= 8)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'Heartbeat'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    value = value - 64;
                                                }

                                                if (value >= 32)
                                                {
                                                    value = value - 32;
                                                }

                                                if (value >= 16)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'Zebra'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    value = value - 64;
                                                }

                                                if (value >= 32)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'BitDefender'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    value = value - 128;
                                                }

                                                if (value >= 64)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'T-Mover'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    value = value - 256;
                                                }

                                                if (value >= 128)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'HTTP'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    value = value - 512;
                                                }

                                                if (value >= 256)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'Tomcat'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value >= 512)
                                                {
                                                    return '정상 동작';
                                                }
                                                else
                                                {
                                                    return '데몬 다운';
                                                }
                                            },
                                            dataIndex: 'daemon_count',
                                            text: 'T-look'
                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                preserveScrollOnRefresh: true,
                                listeners: {
                                    refresh: {
                                        fn: me.onViewRefresh,
                                        scope: me
                                    }
                                }
                            },
                            listeners: {
                                itemdblclick: {
                                    fn: me.onGpn_tmover_mainItemDblClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            })
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_tmover_mainAfterRender: function(component, eOpts) {
        component.timer_tick();
    },

    onPnl_tmover_mainBeforeDestroy: function(component, eOpts) {
        clearInterval(component.timer);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_key').show();
    },

    onTxf_tmov_monitor_searchSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('gpn_tmov_main').search = Ext.getCmp('txf_tmov_monitor_search').getValue();
            Ext.getCmp('gpn_tmov_main').isSearch = true;

            var treeview = Ext.getCmp('tpn_tmov_tree');
            var selectedItem = treeview.getSelectionModel().getSelection();

            if (selectedItem.length === 0)
                return;

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetDevices',
                    params : {
                        server_farm : Ext.encode(selectedItem[0].raw.server_farm),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);

                        var gridview = Ext.getCmp('gpn_tmov_main');
                        gridview.selectRecords = gridview.getSelectionModel().getSelection();

                        if (gridview.isSearch === true)
                        {
                            var store = [];

                            for (var i in resObj)
                            {
                                if (resObj[i].server_name.indexOf(gridview.search) > -1)
                                {
                                    store.push(resObj[i]);
                                }
                            }

                            Ext.getStore('st_tmov_device').loadData(store);
                        }
                        else
                        {
                            Ext.getStore('st_tmov_device').loadData(resObj);
                        }
                    }
                }
            );
        }
    },

    onTxf_tmov_monitor_searchFocus: function(component, e, eOpts) {
        clearInterval(Ext.getCmp('pnl_tmov_main').timer);
    },

    onTxf_tmov_monitor_searchBlur: function(component, e, eOpts) {
        Ext.getCmp('pnl_tmov_main').timer_tick();
    },

    onBtn_tmov_monitor_searchClick: function(button, e, eOpts) {
        Ext.getCmp('gpn_tmov_main').search = Ext.getCmp('txf_tmov_monitor_search').getValue();
        Ext.getCmp('gpn_tmov_main').isSearch = true;

        var treeview = Ext.getCmp('tpn_tmov_tree');
        var selectedItem = treeview.getSelectionModel().getSelection();

        if (selectedItem.length === 0)
            return;

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetDevices',
                params : {
                    server_farm : Ext.encode(selectedItem[0].raw.server_farm),
                    user : Ext.encode(Ext.getCmp('main').user)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    var gridview = Ext.getCmp('gpn_tmov_main');
                    gridview.selectRecords = gridview.getSelectionModel().getSelection();

                    if (gridview.isSearch === true)
                    {
                        var store = [];

                        for (var i in resObj)
                        {
                            if (resObj[i].server_name.indexOf(gridview.search) > -1)
                            {
                                store.push(resObj[i]);
                            }
                        }

                        Ext.getStore('st_tmov_device').loadData(store);
                    }
                    else
                    {
                        Ext.getStore('st_tmov_device').loadData(resObj);
                    }
                }
            }
        );
    },

    onViewRefresh: function(dataview, eOpts) {
        var component = Ext.getCmp('gpn_tmov_main');

        if ( component.selectRecords === undefined)
            return;

        if (component.selectRecords.length <= 0)
            return;

        var newRecordsToSelect = [];

        for (var i = 0; i < component.selectIndex.length; i++)
        {
            var record = component.getStore().getAt(component.selectIndex[i]);
            if (!Ext.isEmpty(record))
            {
                newRecordsToSelect.push(record);
            }
        }

        component.getSelectionModel().select(newRecordsToSelect);


    },

    onGpn_tmover_mainItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var user = Ext.getCmp('main').user;

        if (user.level === 2 || user.level === 3)
        {
            Ext.MessageBox.show({ title: '장비 수정', msg: '모니터링 관리자는 장비 수정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_chart').show();
    },

    timer_tick: function() {
        var component = Ext.getCmp('pnl_tmov_main');

        component.timer = function()
        {
            var treeview = Ext.getCmp('tpn_tmov_tree');
            var selectedItem = treeview.getSelectionModel().getSelection();

            if (selectedItem.length === 0)
                return;

            var gridview = Ext.getCmp('gpn_tmov_main');
            gridview.selectRecords = gridview.getSelectionModel().getSelection();

            var array = [];

            for(i = 0; i < gridview.selectRecords.length; i++)
                array.push(gridview.getStore().indexOf(gridview.selectRecords[i]));

            gridview.selectIndex = array;

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetDevices',
                    params : {
                        server_farm : Ext.encode(selectedItem[0].raw.server_farm),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);

                        if (gridview.isSearch === true)
                        {
                            var store = [];

                            for (var i in resObj)
                            {
                                if (resObj[i].server_name.indexOf(gridview.search) > -1)
                                {
                                    store.push(resObj[i]);
                                }
                            }

                            Ext.getStore('st_tmov_device').loadData(store);
                        }
                        else
                        {
                            Ext.getStore('st_tmov_device').loadData(resObj);
                        }
                    }
                }
            );
        };

        component.timer = setInterval(component.timer, 5000);
    }

});
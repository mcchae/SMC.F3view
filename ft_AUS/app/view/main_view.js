
Ext.define('AUS.view.main_view', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.CheckColumn'
    ],

    id: 'main_view',
    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'pnl_aus_main',
                    layout: 'border',
                    title: 'WeGuardia™ AUS',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'btn_config',
                                            margin: 5,
                                            width: 80,
                                            text: '환경설정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_configClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_version',
                                            margin: 5,
                                            width: 80,
                                            text: '파일정보',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_versionClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_close',
                                            margin: 5,
                                            width: 80,
                                            text: '로그아웃'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'panel',
                            timer_tick: function() {
                                var component = Ext.getCmp('pnl_aus_device');

                                component.timer = function()
                                {
                                    var gridview = Ext.getCmp('gpn_aus_device');

                                    gridview.selectRecords = gridview.getSelectionModel().getSelection();

                                    var array = [];

                                    for(i = 0; i < gridview.selectRecords.length; i++)
                                    array.push(gridview.getStore().indexOf(gridview.selectRecords[i]));

                                    gridview.selectIndex = array;

                                    Ext.Ajax.request(
                                    {
                                        url : 'api/ftAUS/GetDevices',
                                        success : function(res_data)
                                        {
                                            var resObj = JSON.parse(res_data.responseText);
                                            Ext.getStore('st_aus_device').loadData(resObj);
                                        }
                                    }
                                    );
                                };

                                component.timer = setInterval(component.timer, 5000);
                            },
                            region: 'center',
                            id: 'pnl_aus_device',
                            layout: 'border',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    region: 'west',
                                    split: true,
                                    width: 310,
                                    collapsible: true,
                                    title: '업데이트 버전 목록',
                                    store: 'st_aus_update',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 50,
                                            dataIndex: 'model_type',
                                            menuDisabled: true,
                                            text: '모델'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 70,
                                            dataIndex: 'cpu_type',
                                            menuDisabled: true,
                                            text: 'CPU 타입'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 70,
                                            dataIndex: 'file_type',
                                            menuDisabled: true,
                                            text: '파일 타입'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 150,
                                            dataIndex: 'version',
                                            menuDisabled: true,
                                            text: '버전',
                                            flex: 1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    region: 'center',
                                    id: 'gpn_aus_device',
                                    title: '장비 목록',
                                    store: 'st_aus_device',
                                    columns: [
                                        {
                                            xtype: 'checkcolumn',
                                            width: 30,
                                            resizable: false,
                                            dataIndex: 'all_use',
                                            menuDisabled: true,
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCheckcolumnCheckChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                return value;
                                            },
                                            id: 'col_device_name',
                                            width: 140,
                                            dataIndex: 'name',
                                            text: '장비 이름'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                return value;
                                            },
                                            id: 'col_ip_address',
                                            width: 90,
                                            dataIndex: 'ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            id: 'col_device_cid',
                                            width: 270,
                                            dataIndex: 'cid',
                                            text: 'CID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 70,
                                            dataIndex: 'model_type',
                                            text: '모델'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if (value === 0)
                                                return 'mips';

                                                if (value === 1)
                                                return 'x64';

                                                if (value === 2)
                                                return 'x86';

                                                return value;
                                            },
                                            width: 70,
                                            dataIndex: 'cpu_type',
                                            text: 'CPU 타입'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            id: 'col_device_serial',
                                            width: 220,
                                            dataIndex: 'serial',
                                            text: '시리얼'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }
                                                else
                                                {
                                                    if (record.raw.fw_update === 1)
                                                    metaData.style = 'color:#0054FF;';
                                                }


                                                return value;
                                            },
                                            id: 'col_device_firmware',
                                            width: 120,
                                            dataIndex: 'fw_version',
                                            text: '펌웨어'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }
                                                else
                                                {
                                                    if (record.raw.rd_update === 1)
                                                    metaData.style = 'color:#0054FF;';
                                                }

                                                return value;
                                            },
                                            id: 'col_device_ramdisk',
                                            width: 120,
                                            dataIndex: 'rd_version',
                                            text: '램디스크'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }
                                                else
                                                {
                                                    if (record.raw.img_update === 1)
                                                    metaData.style = 'color:#0054FF;';
                                                }


                                                return value;
                                            },
                                            id: 'col_device_image',
                                            width: 120,
                                            dataIndex: 'img_version',
                                            text: '이미지'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }
                                                else
                                                {
                                                    if (record.raw.do_update === 1)
                                                    metaData.style = 'color:#0054FF;';
                                                }

                                                return value;
                                            },
                                            id: 'col_device_do',
                                            width: 120,
                                            dataIndex: 'do_version',
                                            text: 'DO'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                return value;
                                            },
                                            id: 'col_time',
                                            width: 120,
                                            dataIndex: 'time',
                                            text: '시간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                if (value === 0)
                                                return '응답없음';

                                                if (value === 1)
                                                return '정상동작';

                                                if (value === 2)
                                                return '부팅중';




                                            },
                                            id: 'col_state',
                                            width: 80,
                                            dataIndex: 'state',
                                            text: '상태'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.raw.state === 0)
                                                {
                                                    metaData.style = 'color:#FF0000;';
                                                }

                                                return value;
                                            },
                                            id: 'col_msg',
                                            width: 140,
                                            dataIndex: 'msg',
                                            text: '메시지'
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            id: 'col_chk_firmware',
                                            width: 70,
                                            dataIndex: 'fw_use',
                                            text: '펌웨어',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCol_chk_firmwareCheckChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            id: 'col_chk_ramdisk',
                                            width: 70,
                                            dataIndex: 'rd_use',
                                            text: '램디스크',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCol_chk_ramdiskCheckChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            id: 'col_chk_image',
                                            width: 70,
                                            dataIndex: 'img_use',
                                            text: '이미지',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCol_chk_imageCheckChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            id: 'col_chk_do',
                                            width: 70,
                                            dataIndex: 'do_use',
                                            text: 'DO',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCol_chk_doCheckChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            id: 'col_chk_reboot',
                                            width: 70,
                                            dataIndex: 'reboot_use',
                                            text: '재부팅',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCol_chk_rebootCheckChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ],
                                    viewConfig: {
                                        id: 'grv_device',
                                        listeners: {
                                            refresh: {
                                                fn: me.onGrv_deviceRefresh,
                                                scope: me
                                            }
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_deviceAfterRender,
                                    scope: me
                                },
                                beforedestroy: {
                                    fn: me.onPnl_deviceBeforeDestroy,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            region: 'south',
                            split: true,
                            height: 250,
                            id: 'pnl_aus_log',
                            collapsible: true,
                            header: false,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    id: 'gpn_aus_log',
                                    title: '로그',
                                    store: 'st_aus_log',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'name',
                                            text: '장비 이름'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 200,
                                            dataIndex: 'ip',
                                            text: 'IP 주소'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 280,
                                            dataIndex: 'cid',
                                            text: 'CID'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 160,
                                            dataIndex: 'time',
                                            text: '시간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            hidden: true,
                                            width: 120,
                                            dataIndex: 'string',
                                            text: '상태'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 400,
                                            dataIndex: 'msg',
                                            text: '메시지',
                                            flex: 1
                                        }
                                    ],
                                    viewConfig: {
                                        id: 'grv_log',
                                        preserveScrollOnRefresh: true
                                    }
                                }
                            ],
                            listeners: {
                                afterrender: {
                                    fn: me.onPnl_aus_logAfterRender,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_configClick: function(button, e, eOpts) {
        Ext.create('AUS.view.win_aus_config').show();
    },

    onBtn_versionClick: function(button, e, eOpts) {
        Ext.create('AUS.view.win_aus_filelist').show();
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendAllUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_aus_device').loadData(resObj);
                }
            }
        );

    },

    onCol_chk_firmwareCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _type : Ext.encode('fw_use'),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                }
            }
        );

    },

    onCol_chk_ramdiskCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _type : Ext.encode('rd_use'),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                }
            }
        );

    },

    onCol_chk_imageCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _type : Ext.encode('img_use'),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                }
            }
        );

    },

    onCol_chk_doCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _type : Ext.encode('do_use'),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                }
            }
        );

    },

    onCol_chk_rebootCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var store = Ext.getStore('st_aus_device');

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/SetSendUse',
                params : {
                    _id : Ext.encode(store.data.items[rowIndex].raw._id),
                    _type : Ext.encode('reboot_use'),
                    _use : Ext.encode(checked)
                },
                success : function(res_data)
                {
                    store.sync();
                }
            }
        );

    },

    onGrv_deviceRefresh: function(dataview, eOpts) {
        var component = Ext.getCmp('gpn_aus_device');

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

    onPnl_deviceAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftAUS/GetDevices',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_aus_device').loadData(resObj);
                }
            }
        );

        Ext.Ajax.request(
            {
                url : 'api/ftAUS/GetUpdateVersion',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_aus_update').loadData(resObj);
                }
            }
        );

        component.timer_tick();
    },

    onPnl_deviceBeforeDestroy: function(component, eOpts) {
        clearInterval(component.timer);
    },

    onPnl_aus_logAfterRender: function(component, eOpts) {
        component.start_time = Math.floor(new Date().getTime() / 1000);

        component.timer = function()
        {
            end_time = Math.floor(new Date().getTime() / 1000);

            Ext.Ajax.request(
                {
                    url : 'api/ftAUS/GetLog',
                    params :
                    {
                        start : Ext.encode(component.start_time),
                        end : Ext.encode(end_time)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_aus_log').loadData(resObj);
                    }
                }
            );
        };

        component.timer = setInterval(component.timer, 5000);
    }

});
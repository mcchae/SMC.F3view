
Ext.define('SMC.view.win_xtm_state_device', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_state_device',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.RowNumberer'
    ],

    height: 550,
    id: 'win_xtm_state_device',
    minHeight: 500,
    minWidth: 800,
    width: 900,
    overflowY: 'auto',
    title: '상태 정보 확인',
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
                    xtype: 'tabpanel',
                    flex: 1,
                    border: false,
                    itemId: 'tpn_state_main',
                    bodyPadding: 10,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_state_deviceinfo',
                            title: '장비 정보',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_basic_gateinfo',
                                    padding: 10,
                                    title: '장비 상태',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo1',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_devicename',
                                                    margin: '0, 50, 0, 0',
                                                    fieldLabel: '장비명'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_gatename',
                                                    width: 300,
                                                    fieldLabel: '게이트 모델명',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo2',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_firmware',
                                                    margin: '0, 50, 0, 0',
                                                    fieldLabel: '펌웨어 버전'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_gateserial',
                                                    fieldLabel: '게이트 시리얼 번호',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo3',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_ramdisk',
                                                    margin: '0, 50, 0, 0',
                                                    fieldLabel: '램디스크 버전'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_dpi',
                                                    fieldLabel: 'DPI 패턴 버전',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo4',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_sessionbk',
                                                    margin: '0, 50, 0, 0',
                                                    fieldLabel: '세션 백업 상태'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_kiscomdb',
                                                    fieldLabel: 'Kiscom DB 버전',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo5',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_websm',
                                                    margin: '0, 50, 0, 0',
                                                    fieldLabel: 'WebSMC 포트'
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_ssh',
                                                    fieldLabel: 'SSH 접속 포트',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_gateinfo6',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_cid',
                                                    fieldLabel: 'CID'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 0.5,
                                    itemId: 'fds_basic_hwinfo',
                                    title: '하드웨어 정보',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: 10
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_cpuinfo',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_cpumodel',
                                                    margin: '0, 40, 0, 0',
                                                    fieldLabel: 'CPU 모델명',
                                                    labelWidth: 110
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_cpuclock',
                                                    margin: '0, 0, 0, 0',
                                                    fieldLabel: 'CPU 클럭',
                                                    labelWidth: 110
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_cpustatus',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_cpucore',
                                                    margin: '0, 40, 0, 0',
                                                    fieldLabel: 'CPU 코어',
                                                    labelWidth: 110
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_runtime',
                                                    margin: '0, 0, 0, 0',
                                                    fieldLabel: '가동 시간',
                                                    labelWidth: 110
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_basic_pwacc',
                                            margin: '0, 0, 0, 50',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    flex: 1,
                                                    itemId: 'txf_pwacc',
                                                    width: 638,
                                                    fieldLabel: '암호 가속기',
                                                    labelWidth: 110
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_state_status',
                            title: '장비 상태',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1.2,
                                    itemId: 'fds_basic_devicestatus',
                                    title: '장비 상태 (CPU 상태, 세션 현황, 메모리 사용량)',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_basic_packet',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            flex: 0.8,
                                            layout: 'fit',
                                            title: '패킷 분포',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_basic_packet',
                                                    margin: '0, 0, 10, 0',
                                                    title: '',
                                                    store: 'st_state_packet',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b64',
                                                            text: '64 Byte',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b128',
                                                            text: '128 Byte',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b256',
                                                            text: '256 Byte',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b512',
                                                            text: '512 Byte',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b1024',
                                                            text: '1024 Byte',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return addComma(value);
                                                            },
                                                            dataIndex: '@b1500',
                                                            text: '1500 Byte',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_basic_hddstatus',
                                    title: '하드 디스크 상태',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_basic_hddstatus',
                                            margin: '0, 0, 10, 0',
                                            title: '',
                                            store: 'st_state_hdd',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: '@num',
                                                    text: 'No.',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'name',
                                                    text: 'Name',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'current',
                                                    text: 'Current',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'total',
                                                    text: 'Total',
                                                    flex: 1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            itemId: 'pnl_state_ethinfo',
                            title: '인터페이스 정보',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_control_top',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_showdown',
                                            margin: '0, 10, 0, 0',
                                            width: 100,
                                            text: '전체 보기',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_showdownClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_hidedown',
                                            width: 100,
                                            text: '연결만 보기',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_hidedownClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_basic_eth',
                                    margin: '0, 0, 10, 0',
                                    layout: 'fit',
                                    title: '인터페이스 정보',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            itemId: 'gpn_basic_eth',
                                            margin: '0, 0, 10, 0',
                                            padding: '10, 0, 0, 0',
                                            overflowX: 'auto',
                                            title: '',
                                            store: 'st_state_interface',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    text: 'N'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    dataIndex: '@name',
                                                    text: 'Interface'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    dataIndex: 'mac_addr',
                                                    text: 'Mac Address'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value[0] !== undefined){

                                                            return value[0]['#text'];

                                                        }

                                                        return '';
                                                    },
                                                    width: 180,
                                                    dataIndex: 'ip',
                                                    text: 'IP v4'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value[1] !== undefined){

                                                            return value[1]['#text'];

                                                        }

                                                        return '';
                                                    },
                                                    width: 200,
                                                    dataIndex: 'ip',
                                                    text: 'IP v6'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    dataIndex: 'port',
                                                    text: 'Port'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return value[0]['@speed'] + '/' + value[0]['@duplex'];
                                                    },
                                                    width: 120,
                                                    dataIndex: 'link',
                                                    text: 'Speed / Duplex'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 120,
                                                    dataIndex: 'error',
                                                    text: 'Error/Collision'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    dataIndex: 'ip_mode',
                                                    text: 'IP Mode'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_state_close',
                    margin: '0, 10, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_close',
                            width: 100,
                            text: '닫 기',
                            listeners: {
                                click: {
                                    fn: me.onBt_closeClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onWin_xtm_state_deviceRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_showdownClick: function(button, e, eOpts) {
        // onBt_showdownClick ===========================================================================================================================================================
        //
        // 설명 : 모든 인터페이스 정보를 출력합니다.
        //
        // ==============================================================================================================================================================================

        var ethStore = Ext.getStore('st_state_interface');

        try{

            if(ethStore.originData)
                ethStore.loadData(ethStore.originData);

        }
        catch(err){

            console.log('스토어 정보를 삽입하는 도중 catch 발생 : ', err);

        }
    },

    onBt_hidedownClick: function(button, e, eOpts) {
        // onBt_hidedownClick ===========================================================================================================================================================
        //
        // 설명 : 연결된 인터페이스 정보만 출력합니다.
        //
        // ==============================================================================================================================================================================

        var ethStore = Ext.getStore('st_state_interface');

        try{

            var hideData = [];

            for(var i = 0; i < ethStore.count(); i++){

                var ethData = ethStore.getAt(i);

                if(ethData.get('link')[1] === "up")
                    hideData.push(ethData);

            }

            if(hideData)
                ethStore.loadData(hideData);

        }
        catch(err){

            console.log('하이드 인터페이스 정보 출력 중 catch 발생 : ', err);

        }
    },

    onBt_closeClick: function(button, e, eOpts) {
        // onBt_closeClick ===============================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 : 상태 정보 확인창을 닫습니다.
        //
        // ===============================================================================================================================================================================

        this.destroy();
    },

    onWin_xtm_state_deviceRender: function(component, eOpts) {
        // onWin_xtm_state_deviceRender ================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 : 장비의 기본 상태를 조회합니다. 할당된 IP가 없거나, 장비 상태가 초기 상태일 경우 장비 상태를 조회하지 않습니다.
        //
        // =============================================================================================================================================================================

        this.on('deviceStateInfo', this.setDeviceState);

        // 스토어 생성 ===================================================================================================================================================================

        this.initStore();

        var me = component;

        component.setTitle(me.deviceName + ' 의 상태 정보');

        try{

            var service = 'ftSMC',
                serchService = 'getDeviceStatusInfo',
                params = {

                    cid : Ext.encode(me.cid)

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(deviceState){

                    me.fireEvent('deviceStateInfo', deviceState, me.deviceName, me.cid);

                });

        }
        catch(err){

            console.log('장비 상태를 가져오는 도중 에러가 발생하였습니다.\n\n' + err);

        }
    },

    makeDynamicStore: function() {
        var ethStore = Ext.create('Ext.data.Store', {

            storeId : 'st_state_interface',
            fields: [
                {
                    name: '@name'
                },
                {
                    name: 'advertised'
                },
                {
                    name: 'coli'
                },
                {
                    name: 'error'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'ip_mode'
                },
                {
                    name: 'link'
                },
                {
                    name: 'mac_addr'
                },
                {
                    name: 'port'
                }

            ]

        });
    },

    componentStorage: function() {
        var tpn_main = this.down('[itemId=tpn_state_main]');

        var fds_status = tpn_main.down('[itemId=pnl_state_status]').down('[itemId=fds_basic_devicestatus]');
        var fds_hdd    = tpn_main.down('[itemId=pnl_state_status]').down('[itemId=fds_basic_hddstatus]');

        var fds_gate   = tpn_main.down('[itemId=pnl_state_deviceinfo]').down('[itemId=fds_basic_gateinfo]');
        var fds_hdinfo = tpn_main.down('[itemId=pnl_state_deviceinfo]').down('[itemId=fds_basic_hwinfo]');

        var fds_eth    = tpn_main.down('[itemId=pnl_state_ethinfo]').down('[itemId=fds_basic_eth]');

        // basic status =================================================================================================================================================================

        var sessionChart = fds_status.down('[itemId=ct_session]');
        var memoryChart  = fds_status.down('[itemId=ct_memory]');

        var hddstatus    = fds_hdd.down('[itemId=gpn_basic_hddstatus]');
        var hddChart     = fds_hdd.down('[itemId=ct_hddstatus]');

        // device info ==================================================================================================================================================================

        var deviceinfo_name = fds_gate.down('[itemId=txf_devicename]');
        var deviceinfo_gate = fds_gate.down('[itemId=txf_gatename]');
        var deviceinfo_fw   = fds_gate.down('[itemId=txf_firmware]');
        var deviceinfo_gs   = fds_gate.down('[itemId=txf_gateserial]');
        var deviceinfo_ram  = fds_gate.down('[itemId=txf_ramdisk]');
        var deviceinfo_dpi  = fds_gate.down('[itemId=txf_dpi]');
        var deviceinfo_sessionbk = fds_gate.down('[itemId=txf_sessionbk]');
        var deviceinfo_kiscomdb  = fds_gate.down('[itemId=txf_kiscomdb]');
        var deviceinfo_websm     = fds_gate.down('[itemId=txf_websm]');
        var deviceinfo_ssh       = fds_gate.down('[itemId=txf_ssh]');
        var deviceinfo_cid = fds_gate.down('[itemId=txf_cid]');

        var cpumodel = fds_hdinfo.down('[itemId=txf_cpumodel]');
        var cpuclock = fds_hdinfo.down('[itemId=txf_cpuclock]');
        var cpucore  = fds_hdinfo.down('[itemId=txf_cpucore]');
        var runtime  = fds_hdinfo.down('[itemId=txf_runtime]');
        var pwacc    = fds_hdinfo.down('[itemId=txf_pwacc]');

        var ethgrid  = fds_eth.down('[itemId=gpn_basic_eth]');

        var obj = {};

        obj.fds_status = fds_status;

        obj.sessionChart = sessionChart;
        obj.memoryChart  = memoryChart;

        obj.hddstatus  = hddstatus;
        obj.hddChart   = hddChart;

        obj.deviceinfo_name = deviceinfo_name;
        obj.deviceinfo_gate = deviceinfo_gate;
        obj.deviceinfo_fw   = deviceinfo_fw;
        obj.deviceinfo_gs   = deviceinfo_gs;
        obj.deviceinfo_ram  = deviceinfo_ram;
        obj.deviceinfo_dpi  = deviceinfo_dpi;
        obj.deviceinfo_sessionbk = deviceinfo_sessionbk;
        obj.deviceinfo_kiscomdb  = deviceinfo_kiscomdb;
        obj.deviceinfo_websm     = deviceinfo_websm;
        obj.deviceinfo_ssh  = deviceinfo_ssh;
        obj.deviceinfo_cid  = deviceinfo_cid;

        obj.cpumodel        = cpumodel;
        obj.cpuclock        = cpuclock;
        obj.cpucore         = cpucore;
        obj.runtime         = runtime;
        obj.pwacc           = pwacc;

        obj.ethgrid         = ethgrid;

        return obj;
    },

    setDeviceState: function(deviceBasic, deviceName, cid) {
        // setDeviceState ===============================================================================================================================================================
        //
        // 일시 : 2014.06.12
        //
        // 설명 : 장비의 정보를 컴포넌트에 초기화 합니다. 장비의 상태가 조회되지 않으면 컴포넌트 초기화는 빈 값으로 초기화 됩니다.
        //
        // ==============================================================================================================================================================================

        if(deviceBasic === undefined || !deviceBasic.faultCode || deviceBasic !== null){

            this.init_Stateinfo(deviceBasic.smc_status);

            this.init_Deviceinfo({

                'devicename' : deviceName,

                'cid'        : cid,

                'gate_info'  : deviceBasic.smc_status.gate_info,

                'hard_info'  : deviceBasic.smc_status.hardware_info,

                'system_use' : deviceBasic.smc_status.system_use

            });

            this.init_Ethinfo(deviceBasic.smc_status['interface']);

        }
    },

    init_Deviceinfo: function(params) {
        // init_Deviceinfo ==============================================================================================================================================================
        //
        // 설명 : 장비의 기본 설정 -> 장비 정보화면에 출력할 데이터를 컴포넌트에 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        component.deviceinfo_name.setValue(params.devicename);
        component.deviceinfo_gate.setValue(params.gate_info.model);
        component.deviceinfo_fw.setValue(params.gate_info.firmv);

        component.deviceinfo_gs.setValue(params.gate_info.serial);

        component.deviceinfo_ram.setValue(params.gate_info.ramv);
        component.deviceinfo_dpi.setValue(params.gate_info.dpi);
        component.deviceinfo_sessionbk.setValue(params.gate_info.sbackup);
        component.deviceinfo_kiscomdb.setValue(params.gate_info.kiscomdb);
        component.deviceinfo_websm.setValue(params.gate_info.policy_port);
        component.deviceinfo_ssh.setValue(params.gate_info.ssh_port);
        component.deviceinfo_cid.setValue(params.cid);

        component.cpumodel.setValue(params.hard_info.cpu);
        component.cpuclock.setValue(params.hard_info.cpu_clock);
        component.cpucore.setValue(params.hard_info.cpu_core);

        if(params.hard_info.uptime !== ''){

            var split_time = null;
            var split_runtime = params.hard_info.uptime.split(' ');

            if(split_runtime.length < 2){

                split_time = split_runtime[0].split(':');

                component.runtime.setValue('0일 ' + split_time[0] + '시 ' + split_time[1] + '분 ' + split_time[2] + '초');

            }
            else{

                split_time = split_runtime[1].split(':');

                component.runtime.setValue(split_runtime[0] + '일 ' + split_time[0] + '시 ' + split_time[1] + '분 ' + split_time[2] + '초');

            }

        }

        component.pwacc.setValue(params.hard_info.accelerator);

    },

    init_Stateinfo: function(params) {
        // init_Stateinfo ==============================================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 : 장비의 상태정보를 얻어와 스토어에 초기화합니다.
        //
        // =============================================================================================================================================================================

        var deviceFds    = this.componentStorage().fds_status;

        var sessionStore = Ext.getStore('st_state_session');
        var cpuStore     = Ext.getStore('st_state_cpu_chart');
        var memoryStore  = Ext.getStore('st_state_memory');

        var hddStore     = Ext.getStore('st_state_hdd');
        var packetStore  = Ext.getStore('st_state_packet');

        if(!params){

            return;

        }

        var sess_totalSize    = params.system_use.ses_info['@total'];
        var sess_currentSize  = params.system_use.ses_info['@current'];

        var mem_totalSize    = params.system_use.mem_info['@total'];
        var mem_currentSize  = params.system_use.mem_info['@current'];

        sessionStore.add(
            {
                '@total'   : parseInt(sess_totalSize, 10) * 1000,
                '@current' : parseInt(sess_currentSize, 10)
            }
        );

        cpuStore.add(
            {
                'cpu_info' : params.system_use.cpu_info
            }
        );

        memoryStore.add(
            {
                '@total'   : parseInt(mem_totalSize, 10),
                '@current' : parseInt(mem_currentSize, 10)
            }
        );

        var cpuChart = {

            xtype        : 'chart',
            flex         : 1,
            animate      : true,
            store        : cpuStore,
            insetPadding : 30,
            axes: [
                {
                    position : 'gauge',
                    type     : 'Gauge',
                    steps    : 2,
                    margin   : 8,
                    maximum  : 100,
                    minimum  : 0,
                    title    : params.system_use.cpu_info + '%'
                }
            ],
            series: [
                {

                    type       : 'gauge',
                    donut      : 70,
                    angleField : 'cpu_info',
                    colorSet   : ['00DAFF', '#a9a9a9']
                }
            ]
        };

        var sessionChart = {

            xtype        : 'chart',
            flex         : 1,
            animate      : true,
            store        : sessionStore,
            insetPadding: 30,
            axes: [
                {
                    position : 'gauge',
                    type     : 'Gauge',
                    steps    : 2,
                    margin   : 8,
                    maximum  : parseInt(sess_totalSize, 10) * 1000,
                    minimum  : 0,
                    title    : sess_currentSize + ' / ' + sess_totalSize
                }
            ],
            series: [
                {

                    type       : 'gauge',
                    donut      : 70,
                    angleField : '@current',
                    colorSet   : ['#7fff00', '#a9a9a9']
                }
            ]
        };

        var memoryChart = {

            xtype        : 'chart',
            flex         : 1,
            animate      : true,
            store        : memoryStore,
            insetPadding: 30,
            axes: [
                {
                    position : 'gauge',
                    type     : 'Gauge',
                    steps    : 2,
                    margin   : 8,
                    maximum  : parseInt(mem_totalSize, 10),
                    minimum  : 0,
                    title    : mem_currentSize
                }
            ],
            series: [
                {

                    type       : 'gauge',
                    donut      : 70,
                    angleField : '@current',
                    colorSet   : ['#ffd700', '#a9a9a9']
                }
            ]
        };

        deviceFds.add(cpuChart);
        deviceFds.add(sessionChart);
        deviceFds.add(memoryChart);

        // 패킷 그리드 추가, 퍼센트 연산

        var b64   = parseInt(params.hardware_info.mon['@b64'], 10);
        var b128  = parseInt(params.hardware_info.mon['@b128'], 10);
        var b256  = parseInt(params.hardware_info.mon['@b256'], 10);
        var b512  = parseInt(params.hardware_info.mon['@b512'], 10);
        var b1024 = parseInt(params.hardware_info.mon['@b1024'], 10);
        var b1500 = parseInt(params.hardware_info.mon['@b1500'], 10);

        packetStore.add(params.hardware_info.mon);

        var sum   = b64 + b128 + b256 + b512 + b1024 + b1500;

        packetStore.add({

            '@b64'   : numberFormat(b64/sum*100, 2)   + ' % ',
            '@b128'  : numberFormat(b128/sum*100, 2)  + ' % ',
            '@b256'  : numberFormat(b256/sum*100, 2)  + ' % ',
            '@b512'  : numberFormat(b512/sum*100, 2)  + ' % ',
            '@b1024' : numberFormat(b1024/sum*100, 2) + ' % ',
            '@b1500' : numberFormat(b1500/sum*100, 2) + ' % '
        });

        Ext.each(params.system_use.hdd_info, function(data, idx){

            hddStore.add(data);

        });
    },

    init_Ethinfo: function(params) {
        // init_Ethinfo =================================================================================================================================================================
        //
        // 설명 : 인터페이스 정보를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var ethStore = Ext.getStore('st_state_interface');

        try{

            ethStore.originData = params;

            ethStore.loadData(params);

        }
        catch(err){

            console.log('DEV BASIC ETHINFO ERROR -> ', err);

        }
    },

    initStore: function() {
        // initStore ====================================================================================================================================================================
        //
        // 설명 : 기본정보에서 사용하는 스토어를 모두 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var sessionStore = Ext.getStore('st_state_session');
        var cpuStore     = Ext.getStore('st_state_cpu_chart');
        var memoryStore  = Ext.getStore('st_state_memory');
        var hddStore     = Ext.getStore('st_state_hdd');
        var ethStore     = Ext.getStore('st_state_interface');

        sessionStore.removeAll();
        cpuStore.removeAll();
        memoryStore.removeAll();
        hddStore.removeAll();
        ethStore.removeAll();

        // 인터페이스 정보를 저장하는 객체를 초기화 합니다. =====================================================================================================================================

        ethStore.originData = null;
    }

});
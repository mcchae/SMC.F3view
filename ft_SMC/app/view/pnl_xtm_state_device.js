
Ext.define('SMC.view.pnl_xtm_state_device', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_state_device',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.grid.RowNumberer'
    ],

    height: 680,
    id: 'pnl_xtm_state_device',
    width: 900,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '상태 정보 확인',

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
                    itemId: 'tpn_state_main',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
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
                                    margin: '10, 0, 10, 0',
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
                                                    labelWidth: 110
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
                                                    labelWidth: 110
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
                                                    labelWidth: 110
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
                                                    labelWidth: 110
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
                            itemId: 'pnl_state_status',
                            title: '시스템 상태',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_basic_devicestatus',
                                    margin: '10, 0, 10, 0',
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
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            flex: 0.8,
                                            margin: '0, 0, 10, 0',
                                            layout: 'fit',
                                            title: '패킷 분포',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_basic_packet',
                                                    margin: '0, 0, 10, 0',
                                                    title: '',
                                                    store: 'st_basic_packet',
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
                                            store: 'st_basic_hdd',
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
                            itemId: 'pnl_state_ethinfo',
                            title: '인터페이스 상태',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    itemId: 'tb_control',
                                    margin: '10, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_showdown',
                                            width: 130,
                                            text: '전체 인터페이스',
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
                                            width: 130,
                                            text: '연결된 인터페이스',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_hidedownClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            items: [
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
                                            store: 'st_basic_interface',
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
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_state_deviceAfterRender,
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

        var ethStore = Ext.getStore('st_basic_interface');

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

        var ethStore = Ext.getStore('st_basic_interface');

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

    onPnl_xtm_state_deviceAfterRender: function(component, eOpts) {
        // onPnl_xtm_state_deviceAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.11.05
        //
        // 설명 : 장비의 기본 정보를 설정하고 상태를 조회합니다.
        //
        // ==============================================================================================================================================================================

        this.on('deviceStateInfo', this.setDeviceState);

        // 인터페이스 초기화 ===============================================================================================================================================================

        this.initStore();

        // 장비 상태 조회 =================================================================================================================================================================
        //
        // 설명 : 할당된 IP가 없거나, 장비 상태가 초기 상태일 경우 장비 상태를 조회하지 않습니다.
        //
        // ==============================================================================================================================================================================

        var me = component;

        var deviceAllData = Ext.getCmp('win_smc_device_set');

        if(component.deviceMode !== 'ADD' && deviceAllData.deviceIp !== '0.0.0.0' && deviceAllData.deviceState !== 0){

            try{

                var service = 'ftSMC',
                    serchService = 'getDeviceStatusInfo',
                    params = {

                        cid : Ext.encode(me.deviceParams[0])

                    };

                request_helper.xmlrpc_call_Ajax_Post(
                    service,
                    serchService,
                    params,
                    function(deviceState){

                        me.fireEvent('deviceStateInfo', deviceState, me.deviceMode);

                    });

            }
            catch(err){

                console.log('장비 상태를 가져오는 도중 에러가 발생하였습니다.\n\n' + err);

            }

        }


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

        var bt_show  = fds_eth.down('[itemId=bt_showdown]');
        var bt_hide  = fds_eth.down('[itemId=bt_hidedown]');
        var ethgrid  = fds_eth.down('[itemId=gpn_basic_eth]');

        var obj = {};

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

    setDeviceState: function(deviceBasic) {
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

                'devicename' : this.deviceParams[2],

                'cid'        : this.deviceParams[4].center['@cid'],

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
        component.devicenum.setValue(params.gate_info.serial);

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
        component.runtime.setValue(params.hard_info.uptime);
        component.pwacc.setValue(params.hard_info.accelerator);

    },

    validityCheck: function() {
        // validityCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 기타 설정 화면의 유효성 검사를 수행할 모듈을 정의합니다.
        //
        // =============================================================================================================================================================================

        var validateObject = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getXType() === 'textfield'){

                    if(component.getValue() === '' && argument){

                        Ext.Msg.show({

                            'title': 'WeGuardia™ SMC 2.0',
                            'msg'  : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn'   : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }
                else{

                    if(component.getValue() === null && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn'   : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'scaleValidate' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[2];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        'title': 'WeGuardia™ SMC 2.0',
                        'msg'  : msg,
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn'   : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'ipValidate' : function(component){

                if(!component.validate()){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : 'IP 형식에 맞지 않습니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn'   : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(value, field, storeid)){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    if(!duplicationItem(value, field, storeid) && value !== value2){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            }

        };

        return validateObject;
    },

    init_Stateinfo: function(params) {
        var deviceFds    = this.componentStorage().fds_status;

        var winObj       = Ext.getCmp('win_smc_device_set');

        var sessionStore = Ext.getStore('st_basic_session');
        var cpuStore     = Ext.getStore('st_basic_cpu_chart');
        var memoryStore  = Ext.getStore('st_basic_memory');
        var hddStore     = Ext.getStore('st_basic_hdd');
        var packetStore  = Ext.getStore('st_basic_packet');

        if(!params){

            return;

        }

        var sess_totalSize    = params.system_use.ses_info['@total'];
        var sess_currentSize  = params.system_use.ses_info['@current'];

        var mem_totalSize    = params.system_use.mem_info['@total'];
        var mem_currentSize  = params.system_use.mem_info['@current'];

        sessionStore.add(
            {
                '@total'   : parseInt(sess_totalSize) * 1000,
                '@current' : parseInt(sess_currentSize)
            }
        );

        cpuStore.add(
            {
                'cpu_info' : params.system_use.cpu_info
            }
        );

        memoryStore.add(
            {
                '@total'   : parseInt(mem_totalSize),
                '@current' : parseInt(mem_currentSize)
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
                    maximum  : parseInt(sess_totalSize) * 1000,
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
                    maximum  : parseInt(mem_totalSize),
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

        var b64   = parseInt(params.hardware_info.mon['@b64']);
        var b128  = parseInt(params.hardware_info.mon['@b128']);
        var b256  = parseInt(params.hardware_info.mon['@b256']);
        var b512  = parseInt(params.hardware_info.mon['@b512']);
        var b1024 = parseInt(params.hardware_info.mon['@b1024']);
        var b1500 = parseInt(params.hardware_info.mon['@b1500']);

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

        var ethStore = Ext.getStore('st_basic_interface');

        try{

            ethStore.originData = params;

            ethStore.loadData(params);

        }
        catch(err){

            console.log('DEV BASIC ETHINFO ERROR -> ', err);

        }
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.10.06
        //
        // 설명 : 장비의 기타설정을 deviceParam 데이터에 임시 저장합니다.
        //
        // =============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 멀티 라우팅 데이터 저장 =========================================================================================================================================================

        deviceAllData.vpn_script.multipath_type = componentObj.linetype.getValue();

        // Explicit routing 데이터 저장 ==================================================================================================================================================

        if(componentObj.linetype.getValue() === 5){

            var explicit_count = componentObj.gpn_explicit.getStore().count();

            if(explicit_count === 0){

                if(deviceAllData.vpn_script.explicit_network.explicit){

                    delete deviceAllData.vpn_script.explicit_network.explicit;

                }

                deviceAllData.vpn_script.explicit_network['@num'] = explicit_count;

            }
            else{

                var explicitArray = [];

                deviceAllData.vpn_script.explicit_network['@num'] = explicit_count;

                for(var i = 0; i < explicit_count; i++){

                    explicitArray.push(componentObj.gpn_explicit.getStore().getAt(i).data);

                }

                deviceAllData.vpn_script.explicit_network.explicit = explicitArray;

            }

        }
        else{

            if(deviceAllData.vpn_script.explicit_network.explicit){

                delete deviceAllData.vpn_script.explicit_network.explicit;

            }

            deviceAllData.vpn_script.explicit_network['@num'] = 0;

        }

        // 라인타임아웃, Drop 출발지 유효성 검사 ============================================================================================================================================

        if(!this.validityCheck().blankCheck(componentObj.timeout) || !this.validityCheck().scaleValidate(componentObj.timeout, '타임아웃의 범위는 1~255 입니다.') ||
           !this.validityCheck().blankCheck(componentObj.dropadddr) || !this.validityCheck().ipValidate(componentObj.dropadddr)){

            return false;

        }

        // 라인 타임아웃 결정 시간 =========================================================================================================================================================

        deviceAllData.vpn_script.line_timeout = componentObj.timeout.getValue();

        deviceAllData.vpn_script.inout_interface_sync.ip['#text'] = componentObj.dropadddr.getValue();
        deviceAllData.vpn_script.inout_interface_sync.ip['@type'] = 'single';
        deviceAllData.vpn_script.inout_interface_sync.ip['@version'] = 'v4';

        // 라인 품질관리 저장 =============================================================================================================================================================

        // 라인 체커 유효성 검사 ==========================================================================================================================================================

        console.log('라인체커 유효성 검사 ');

        if(!this.validityCheck().blankCheck(componentObj.linesec, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.linesec, '라인체커의 범위는 60~3600 입니다.', componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().blankCheck(componentObj.linedowncount, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.linedowncount, '다운 카운트 범위는 2~20 입니다.', componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().blankCheck(componentObj.ethdownsec, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.ethdownsec, '인터페이스 다운 시간은 10~3600 입니다.', componentObj.use_linchecker.getValue())){

            return false;

        }

        deviceAllData.vpn_script.isp_quality['@chk_use'] = (componentObj.use_linchecker.getValue() === true) ? 'on' : 'off';
        deviceAllData.vpn_script.isp_quality['@time_cycle'] = componentObj.linesec.getValue();
        deviceAllData.vpn_script.isp_quality['@down_count'] = componentObj.linedowncount.getValue();
        deviceAllData.vpn_script.isp_quality['@down_duration'] = componentObj.ethdownsec.getValue();

        // 라인 대역폭 제한 기능 인터페이스 리스트 ===========================================================================================================================================

        deviceAllData.vpn_script.isp_bandwidth['@chk_use'] = (componentObj.use_bandwidth.checkboxCmp.getValue() === true) ? 'on' : 'off';

        var bandwidth_count = componentObj.gpn_bandwidth.getStore().count();

        if(bandwidth_count === 0){

            if(deviceAllData.vpn_script.isp_bandwidth.band_iface){

                delete deviceAllData.vpn_script.isp_bandwidth.band_iface;

            }

        }
        else{

            var bandwidthArray = [];

            for(var i = 0; i < bandwidth_count; i++){

                bandwidthArray.push(componentObj.gpn_bandwidth.getStore().getAt(i).data);

            }

            deviceAllData.vpn_script.isp_bandwidth.band_iface = bandwidthArray;

        }

        // F/W Script 데이터 초기화 ======================================================================================================================================================

        deviceAllData.fw_script.mc_forwarding['@chk_use'] = (componentObj.usemulticast.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.ids_port['@chk_use'] = (componentObj.useids.getValue() === true) ? 'on' : 'off';
        deviceAllData.fw_script.ids_port.mode = (componentObj.idsactmode.getValue() === 0) ? null : componentObj.idsactmode.getValue();
        deviceAllData.fw_script.ids_port['interface'] = componentObj.idsport.getValue();

        deviceAllData.fw_script.sip['@chk_use'] = (componentObj.fwvoip.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.sysdebug['@chk_use'] = (componentObj.fwsysdebug.getValue() === true) ? 'on' : 'off';

        deviceAllData.center_setup.center.protection = (componentObj.fwsteal.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.bandwidth['@chk_use'] = (componentObj.fwbandwidth.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.snat_port_force_change['@chk_use'] = (componentObj.fwsnat.getValue() === true) ? 'on' : 'off';

        return true;
    },

    initStore: function() {
        // initStore ====================================================================================================================================================================
        //
        // 설명 : 기본정보에서 사용하는 스토어를 모두 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var sessionStore  = Ext.getStore('st_basic_session');
        var cpuStore      = Ext.getStore('st_basic_cpu_chart');
        var memoryStore   = Ext.getStore('st_basic_memory');
        var hddStore      = Ext.getStore('st_basic_hdd');
        var packetStore   = Ext.getStore('st_basic_packet');
        var ethStore      = Ext.getStore('st_basic_interface');

        sessionStore.removeAll();
        cpuStore.removeAll();
        memoryStore.removeAll();
        hddStore.removeAll();
        packetStore.removeAll();
        ethStore.removeAll();

        // 인터페이스 정보를 저장하는 객체를 초기화 합니다. =====================================================================================================================================

        ethStore.originData = null;
    }

});

Ext.define('SMC.view.win_smc_device_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_device_set',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    viewState: true,
    height: 650,
    id: 'win_smc_device_set',
    minHeight: 600,
    minWidth: 100,
    width: 1000,
    constrain: true,
    layout: 'border',
    title: '장비명',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    itemId: 'pnl_smc_devicemenu_tree',
                    margin: '0, 0, 10, 0',
                    width: 200,
                    animCollapse: true,
                    collapsed: false,
                    collapsible: true,
                    title: '설정 목록',
                    root: {
                        text: 'XTM',
                        expanded: true,
                        panelId: 'xtm_basic',
                        deviceParam: [
                            '@cid',
                            '@groupcid',
                            'name',
                            'desc',
                            'center_setup',
                            'network_interface',
                            'system_setting_option',
                            'system_autoup',
                            'log_setting',
                            'group_code',
                            'device_code'
                        ],
                        children: [
                            {
                                text: '기본 설정',
                                panelId: 'xtm_basic',
                                deviceParam: [
                                    '@cid',
                                    '@groupcid',
                                    'name',
                                    'desc',
                                    'center_setup',
                                    'network_interface',
                                    'system_setting_option',
                                    'system_autoup',
                                    'log_setting',
                                    'group_code',
                                    'device_code',
                                    'location'
                                ],
                                leaf: true
                            },
                            {
                                text: '네트워크',
                                panelId: 'xtm_network_interface',
                                deviceParam: 'network_interface',
                                expanded: false,
                                children: [
                                    {
                                        panelId: 'xtm_network_interface',
                                        deviceParam: 'network_interface',
                                        text: '인터페이스',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_bridge',
                                        deviceParam: 'network_bridge',
                                        text: '브릿지',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_bonding',
                                        deviceParam: 'network_bonding',
                                        text: '본딩',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_vlan',
                                        deviceParam: 'network_vlan',
                                        text: 'vlan',
                                        leaf: true
                                    },
                                    {
                                        text: 'DNS',
                                        expended: true,
                                        panelId: 'xtm_dns_dynamic',
                                        deviceParam: 'network_ddns',
                                        children: [
                                            {
                                                panelId: 'xtm_dns_dynamic',
                                                deviceParam: 'network_ddns',
                                                text: 'DDNS',
                                                leaf: true
                                            },
                                            {
                                                panelId: 'xtm_dns_inner',
                                                deviceParam: 'network_splitdns_innerdns',
                                                text: '내부',
                                                leaf: true
                                            },
                                            {
                                                panelId: 'xtm_dns_outer',
                                                deviceParam: 'network_splitdns_outerdns',
                                                text: '외부',
                                                leaf: true
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Anomaly',
                                        expended: true,
                                        panelId: 'xtm_anomaly_traffic',
                                        deviceParam: 'network_anomaly',
                                        children: [
                                            {
                                                panelId: 'xtm_anomaly_traffic',
                                                deviceParam: 'network_anomaly',
                                                text: 'Traffic Anomaly',
                                                leaf: true
                                            },
                                            {
                                                panelId: 'xtm_anomaly_portscan',
                                                deviceParam: 'network_anomaly_portscan',
                                                text: 'Portscan Anomaly',
                                                leaf: true
                                            },
                                            {
                                                panelId: 'xtm_anomaly_ipspoofing',
                                                deviceParam: 'network_anomaly_spoofing',
                                                text: 'IP Spoofing',
                                                leaf: true
                                            }
                                        ]
                                    },
                                    {
                                        panelId: 'xtm_network_dhcp_server',
                                        expended: true,
                                        deviceParam: 'network_dhcp_server',
                                        text: 'DHCP',
                                        children: [
                                            {
                                                panelId: 'xtm_network_dhcp_server',
                                                deviceParam: 'network_dhcp_server',
                                                text: 'DHCP 서버',
                                                leaf: true
                                            },
                                            {
                                                panelId: 'xtm_network_dhcp_relay',
                                                deviceParam: 'network_dhcp_relay',
                                                text: 'DHCP 릴레이',
                                                leaf: true
                                            }
                                        ]
                                    },
                                    {
                                        panelId: 'xtm_network_virtual_ip',
                                        deviceParam: [
                                            'network_virtual_ip',
                                            'network_virtual_ipv6'
                                        ],
                                        text: '가상 IP 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_ipv6_tunnel',
                                        text: 'IPv6 터널',
                                        deviceParam: [
                                            'network_tunneling_6in4',
                                            'network_tunneling_6to4'
                                        ],
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_ipmanage',
                                        deviceParam: 'ip_manager',
                                        text: 'IP 관리 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_ipscan',
                                        deviceParam: 'ip_scan',
                                        text: 'IP Scan 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_network_l2tp',
                                        deviceParam: 'l2tp_config',
                                        text: 'L2TP',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: '라우터',
                                expended: true,
                                panelId: 'xtm_route_static',
                                deviceParam: 'network_router_static',
                                children: [
                                    {
                                        panelId: 'xtm_route_static',
                                        deviceParam: 'network_router_static',
                                        text: '정적 라우팅',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_route_policy',
                                        deviceParam: 'network_router_policy',
                                        text: '정책기반 라우팅',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_route_multicast',
                                        deviceParam: 'network_router_multicast',
                                        text: '멀티캐스트',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_route_vrrp',
                                        deviceParam: 'network_router_vrrp',
                                        text: 'VRRP',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_route_checker',
                                        deviceParam: 'network_router_checker',
                                        text: '체커',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_route_script',
                                        deviceParam: 'network_router_script',
                                        text: '스크립트',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                panelId: 'xtm_policy_setting',
                                text: '보안 설정',
                                deviceParam: 'spdinfo',
                                leaf: true
                            },
                            {
                                text: 'HA',
                                expended: true,
                                panelId: 'xtm_ha_sync',
                                deviceParam: 'sync_session_backup',
                                children: [
                                    {
                                        panelId: 'xtm_ha_sync',
                                        deviceParam: 'sync_session_backup',
                                        text: '동기화',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_ha_head_office',
                                        deviceParam: 'ha_head_script',
                                        text: '본점',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_ha_branch_office',
                                        deviceParam: 'ha_branch_script',
                                        text: '지점',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_ha_physical_link',
                                        deviceParam: 'link_pack_script',
                                        text: '물리적링크',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'IPSEC VPN',
                                panelId: 'xtm_vpn_ipsec',
                                deviceParam: [
                                    'vpn_setting',
                                    'vpninfo'
                                ],
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_vpn_ipsec',
                                        text: 'IPSEC VPN',
                                        deviceParam: [
                                            'vpn_setting',
                                            'vpninfo'
                                        ],
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_vpn_head_office',
                                        deviceParam: 'vpn_script',
                                        text: '본점',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_vpn_branch_office',
                                        deviceParam: 'vpn_script',
                                        text: '지점',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_vpn_host',
                                        deviceParam: 'vpn_fixed_sechost',
                                        text: '보안호스트 고정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_vpn_option',
                                        deviceParam: 'vpn_script',
                                        text: '기타 설정',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'SSL VPN',
                                panelId: 'xtm_ssl_vpn',
                                deviceParam: 'ssl_setting',
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_ssl_vpn',
                                        text: 'SSL VPN 설정',
                                        deviceParam: 'ssl_setting',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_ssl_inspection',
                                        text: 'SSLI 설정',
                                        deviceParam: 'ssli',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'WAF',
                                panelId: 'xtm_waf_webserver',
                                deviceParam: [
                                    'waf_basic',
                                    'waf_dir',
                                    'waf_header',
                                    'waf_http',
                                    'waf_injection',
                                    'waf_outflow',
                                    'waf_webserver'
                                ],
                                leaf: true
                            },
                            {
                                text: '바이러스/스팸',
                                panelId: 'xtm_anti_virus',
                                deviceParam: 'anti_virus',
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_anti_virus',
                                        text: '안티 바이러스',
                                        deviceParam: 'anti_virus',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_anti_spam',
                                        text: '안티 스팸',
                                        deviceParam: 'anti_spam',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_anti_mail_filter',
                                        text: '메일 필터링',
                                        deviceParam: 'anti_smtp',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'ALG',
                                panelId: 'xtm_alg_telnet',
                                deviceParam: 'alg_telnet_proxy',
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_alg_telnet',
                                        deviceParam: 'alg_telnet_proxy',
                                        text: 'Telnet',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_alg_ftp',
                                        deviceParam: 'alg_ftp_proxy',
                                        text: 'FTP',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: '시스템',
                                panelId: 'xtm_system_manager',
                                deviceParam: [
                                    'system_user_admin',
                                    'system_user_access'
                                ],
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_system_manager',
                                        deviceParam: [
                                            'system_user_admin',
                                            'system_user_access'
                                        ],
                                        text: '관리자',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_system_auth_config',
                                        deviceParam: 'network_radius',
                                        text: '외부서버 인증',
                                        leaf: true
                                    },
                                    //                    {
                                    //                        panelId : 'xtm_system_certificate',
                                    //                        text: '인증서',
                                    //                        leaf: true
                                    //                    },
                                    {
                                        panelId: 'xtm_system_snmp',
                                        deviceParam: 'system_snmp',
                                        text: 'SNMP',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_system_basic',
                                        deviceParam: [
                                            'system_basic',
                                            'system_setting_option'
                                        ],
                                        text: '옵션',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: '로그',
                                panelId: 'xtm_mgt_log',
                                deviceParam: 'log_setting',
                                expended: true,
                                children: [
                                    {
                                        panelId: 'xtm_mgt_log',
                                        deviceParam: 'log_setting',
                                        text: '기본 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_report',
                                        deviceParam: [
                                            'report_type',
                                            'log_setting',
                                            'manage_log_report'
                                        ],
                                        text: '보고서 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_syslog',
                                        deviceParam: 'syslog_setting',
                                        text: '로그 전송',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_alarm',
                                        deviceParam: 'alarm_setting',
                                        text: '알람 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_monitor',
                                        deviceParam: 'manage_monitor',
                                        text: '모니터 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_rtt',
                                        deviceParam: 'log_rtt_setting',
                                        text: 'RTT 설정',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'xtm_mgt_rtm',
                                        deviceParam: 'log_setting',
                                        text: 'RTM 설정',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: '기타 설정',
                                panelId: 'xtm_etc_setting',
                                deviceParam: [
                                    'fw_script',
                                    'vpn_script',
                                    'network_interface',
                                    'center_setup'
                                ],
                                leaf: true
                            }
                        ]
                    },
                    viewConfig: {

                    },
                    listeners: {
                        itemclick: {
                            fn: me.onPnl_smc_devicemenu_treeItemClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    region: 'center',
                    itemId: 'ctn_device_center',
                    margin: '0, 0, 10, 0',
                    layout: 'fit'
                },
                {
                    xtype: 'container',
                    region: 'south',
                    height: 25,
                    itemId: 'ctn_smc_device_control',
                    margin: '0, 0, 5, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_save',
                            margin: '0, 5, 0, 0',
                            width: 100,
                            text: '저 장',
                            listeners: {
                                click: {
                                    fn: me.onBt_saveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_cancel',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_smc_device_setAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_smc_device_setBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_smc_devicemenu_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        // onPnl_smc_devicemenu_treeItemClick ============================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 트리 클릭시 내부 View 를 생성합니다.
        //
        // ===============================================================================================================================================================================

        var panelId = record.raw.panelId;

        var deviceData = this.deviceParams;

        this.createInnerview(panelId, record.raw.deviceParam, deviceData);
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 단일 장비 설정을 저장합니다. 모드에 따라 수정, 추가 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var panelId = 'pnl_' + this.oldAlias;

        var nowPanel = Ext.getCmp(panelId);
        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid;
        var filterValue = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue();

        if(this.deviceMode === 'MODIFY'){

            if(!nowPanel.saveData()){

                return;

            }

            var service = 'ftSMC',
                svc_func = 'modDevice',
                params = {

                    obj : Ext.encode(this.deviceParams)

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]');

                    var service = 'ftSMC',
                        serchService = 'getDeviceList',
                        params = {

                            'g_cid' : Ext.encode(groupCid),
                            'isRecursive' : Ext.encode(showMode.pressed)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            var store = Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore();

                            store.loadData(res);

                            // 2015.03.25 김민수 : 저장될 때 필터가 적용되도록 수정

                            searchDeviceName(store, filterValue, ['name', 'ip']);

                        }

                    );

                    Ext.getCmp('win_smc_device_set').destroy();

                }

            );

        }
        else{

            if(!nowPanel.saveData()){

                return;

            }

            var service = 'ftSMC',
                svc_func = 'addDevice',
                params = {

                    obj : Ext.encode(this.deviceParams),
                    g_cid : Ext.encode(this.deviceParams['@groupcid'])

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]');

                    var service = 'ftSMC',
                        serchService = 'getDeviceList',
                        params = {

                            'g_cid' : Ext.encode(groupCid),
                            'isRecursive' : Ext.encode(showMode.pressed)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        serchService,
                        params,
                        function(res){

                            var store = Ext.getCmp(DEVICE_COMMON_ID.devicelist).getStore();

                            store.loadData(res);

                            searchDeviceName(store, filterValue, ['name', 'ip']);

                        }

                    );

                    Ext.getCmp('win_smc_device_set').destroy();

                    console.log('Update');

                }

            );

        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        // onBt_cancelClick =============================================================================================================================================================

        Ext.getCmp('win_smc_device_set').destroy();
    },

    onWin_smc_device_setAfterRender: function(component, eOpts) {
        // onWin_smc_device_setAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.06.12
        //
        // 설명 : 장비 목록에서 선택된 장비의 옵션을 설정합니다. 화면이 생성되면 자동으로 pnl_xtm_basic을 내부 패널에 create합니다.
        //
        // ===============================================================================================================================================================================

        component.setTitle(DEVICE_COMMON_CONST.DEVICE_WIN_TITLE + ' : ' + this.deviceParams.name);

        this.on('getDeviceInfo', this.getDeviceInfo);

        var centerCont = this.down('[itemId=ctn_device_center]');

        var deviceData = this.deviceParams;

        var activationView = Ext.create('widget.xtm_basic', {

            'deviceParams' : function(){

                var paramArray = [];

                var paramIndex = ['@cid', '@groupcid', 'name', 'desc', 'center_setup', 'network_interface', 'system_setting_option', 'system_autoup', 'log_setting', 'group_code', 'device_code', 'location'];

                for(var i = 0; i < paramIndex.length; i++){

                    paramArray.push(deviceData[paramIndex[i]]);

                }

                return paramArray;

            }(),
            'deviceMode' : component.deviceMode

        });

        centerCont.add(activationView);

        this.oldView  = activationView;
        this.oldAlias = 'xtm_basic';
    },

    onWin_smc_device_setBeforeDestroy: function(component, eOpts) {
        // onWin_smc_device_setBeforeDestroy ============================================================================================================================================
        //
        // 일시 : 2014.07.04
        //
        // 수정 : (김민수) 창이 닫힐 경우 장비리스트 갱신 동작
        //
        // 설명 : 장비 설정 창이 닫히기 전에 모든 스토어의 데이터를 제거하고 기본 데이터를 초기화합니다.
        //
        // ==============================================================================================================================================================================

        // 인터페이스 스토어 ===============================================================================================================================================================

        var devEthStore = Ext.getStore('st_common_deveth');
        var totalEthStore = Ext.getStore('st_common_totaleth');
        var bondEthStore = Ext.getStore('st_common_bondeth');
        var vlanEthStore = Ext.getStore('st_common_vlaneth');
        var allEthStore = Ext.getStore('st_common_alleth');
        var pppEthStore = Ext.getStore('st_common_pppeth');

        // 정책 스토어 설정 ================================================================================================================================================================

        var policyVlan = Ext.getStore('st_policy_vlaneth');
        var serverStore = Ext.getStore('st_system_auth');
        var policyNum = Ext.getStore('st_route_policynum');

        var ethArray = [

            { 'eth' : 'eth0'  },
            { 'eth' : 'eth1'  },
            { 'eth' : 'eth2'  },
            { 'eth' : 'eth3'  },
            { 'eth' : 'eth4'  },
            { 'eth' : 'eth5'  },
            { 'eth' : 'eth6'  },
            { 'eth' : 'eth7'  },
            { 'eth' : 'eth8'  },
            { 'eth' : 'eth9'  },
            { 'eth' : 'eth10' },
            { 'eth' : 'eth11' },
            { 'eth' : 'eth12' },
            { 'eth' : 'eth13' },
            { 'eth' : 'eth14' },
            { 'eth' : 'eth15' },
            { 'eth' : 'eth16' },
            { 'eth' : 'eth17' },
            { 'eth' : 'eth18' },
            { 'eth' : 'eth19' },
            { 'eth' : 'eth20' },
            { 'eth' : 'eth21' },
            { 'eth' : 'eth22' },
            { 'eth' : 'eth23' },
            { 'eth' : 'eth24' },
            { 'eth' : 'eth25' }

        ];

        // 공통 스토어 초기화 ==============================================================================================================================================================

        devEthStore.loadData(ethArray);
        totalEthStore.loadData(ethArray);
        bondEthStore.loadData(ethArray);
        vlanEthStore.loadData(ethArray);
        allEthStore.loadData(ethArray);
        pppEthStore.loadData(ethArray);

        policyVlan.removeAll();
        serverStore.removeAll();
        policyNum.removeAll();

        // 장비 리스트 화면 갱신 동작 =======================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');

        // 장비 Clear Object

        var service = 'ftSMC',
            svc_func = 'clrObject',
            params = {

                'cid' : Ext.encode(component.deviceParams['@cid'])

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            svc_func,
            params,
            function(res){}

        );
    },

    createInnerview: function(panelId, deviceParam, deviceData) {
        // createInnerView =============================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 :
        //
        // ===============================================================================================================

        var centerCont = this.down('[itemId=ctn_device_center]');

        if(this.oldView){

            this.oldView.close();

        }

        if(this.viewState){

            var activationView = Ext.create('widget.' + panelId, {

                deviceParams : function(){

                    var deviceParams;

                    if(Object.prototype.toString.call(deviceParam) === "[object Array]"){

                        deviceParams = [];

                        Ext.each(deviceParam, function(params, idx){

                            deviceParams.push(deviceData[params]);

                        });

                    }
                    else{

                        deviceParams = deviceData[deviceParam];

                    }

                    return deviceParams;

                }()

            });

            centerCont.add(activationView);

            this.oldView  = activationView;
            this.oldAlias = panelId;

        }
    }

});
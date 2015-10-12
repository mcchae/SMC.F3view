
Ext.define('SMC4ZEN.view.win_smc_zendevice_basicset', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_zendevice_basicset',

    requires: [
        'SMC4ZEN.view.win_smc_zendevice_basicsetViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    config: {
        viewState: true
    },

    viewModel: {
        type: 'win_smc_zendevice_basicset'
    },
    constrain: true,
    height: 700,
    id: 'win_smc_zendevice_basicset',
    minHeight: 600,
    minWidth: 100,
    width: 1280,
    layout: 'border',
    title: '장비명',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onWin_zen_device_setAfterRender',
        beforedestroy: 'onWin_zen_device_setBeforeDestroy'
    },
    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            split: true,
            itemId: 'pnl_zen_devicemenu_tree',
            margin: '0, 0, 5, 0',
            width: 250,
            animCollapse: true,
            collapsed: false,
            collapsible: true,
            title: '설정 목록',
            root: {
                text: 'ZEN',
                panelId: 'NFW2_system_basic',
                expanded: true,
                deviceParam: [
                    'system_basic'
                ],
                stores: [
                    'store_timezone',
                    'store_timesync',
                    'store_timeserver'
                ],
                children: [
                    {
                        text: '시스템',
                        panelId: 'NFW2_system_basic',
                        deviceParam: [
                            'system_basic'
                        ],
                        stores: [
                            'store_timezone',
                            'store_timesync',
                            'store_timeserver'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_system_basic',
                                deviceParam: [
                                    'system_basic'
                                ],
                                stores: [
                                    'store_timezone',
                                    'store_timesync',
                                    'store_timeserver'
                                ],
                                text: '기본 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_system_admin_adminConfig',
                                deviceParam: [
                                    'mgtable_users'
                                ],
                                stores: [
                                    'store_usersList'
                                ],
                                text: '관리자',
                                leaf: true
                            },
                            //{
                            //panelId : 'NFW2_system_certificate',
                            //deviceParam : ['system_certs'],
                            //stores : ['store_system_cacertificate_list', 'store_system_certificate_list'],
                            //text : '인증서',
                            //leaf : true
                            //},
                            {
                                panelId: 'NFW2_system_extServerAuth',
                                deviceParam: [
                                    'system_external_access'
                                ],
                                stores: [
                                    'store_serverauth'
                                ],
                                text: '외부서버인증',
                                leaf: true
                            },
                            //{
                            //panelId : 'NFW2_system_update',
                            //deviceParam : ['upgrade_mus'],
                            //stores : ['store_weeks'],
                            //text: '업데이트',
                            //leaf: true
                            //},
                            {
                                panelId: 'NFW2_system_backup',
                                deviceParam: [
                                    'system_restore',
                                    'system_integrity'
                                ],
                                stores: [
                                    'store_backup_weeks',
                                    'store_rollback_firm',
                                    'store_backup_list',
                                    'store_rollback_ramd',
                                    'store_rollback_appimg',
                                    'store_rollback_do',
                                    'store_rollback_firm'
                                ],
                                text: '주기적 검사',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_system_systemState',
                                deviceParam: [
                                    'system_reboot'
                                ],
                                stores: [
                                    'store_system_state_min'
                                ],
                                text: '예약 재시작',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '네트워크',
                        panelId: 'NFW2_network_interface',
                        deviceParam: [
                            'network_interface',
                            'network_dhcp_server',
                            'network_dhcp_relay'
                        ],
                        stores: [
                            'store_getNetworkList',
                            'store_interfaceKind',
                            'store_lname_list',
                            'store_pname_list',
                            'store_bonding_member',
                            'store_bondingMode',
                            'store_arp_ip',
                            'store_lacpRate',
                            'store_hashMode',
                            'store_bonding_primary',
                            'store_lname_list',
                            'store_bridge_member',
                            'store_vip_ipv4',
                            'store_vip_ipv6',
                            'store_networkMode',
                            'store_networkDuplex',
                            'store_networkSpeed',
                            'store_networkZone',
                            'store_phy_ipv4',
                            'store_phy_ipv6'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_network_interface',
                                deviceParam: [
                                    'network_interface',
                                    'network_dhcp_server',
                                    'network_dhcp_relay'
                                ],
                                stores: [
                                    'store_getNetworkList',
                                    'store_interfaceKind',
                                    'store_lname_list',
                                    'store_pname_list',
                                    'store_bonding_member',
                                    'store_bondingMode',
                                    'store_arp_ip',
                                    'store_lacpRate',
                                    'store_hashMode',
                                    'store_bonding_primary',
                                    'store_lname_list',
                                    'store_bridge_member',
                                    'store_vip_ipv4',
                                    'store_vip_ipv6',
                                    'store_networkMode',
                                    'store_networkDuplex',
                                    'store_networkSpeed',
                                    'store_networkZone',
                                    'store_phy_ipv4',
                                    'store_phy_ipv6'
                                ],
                                text: '인터페이스',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_dns_dns',
                                deviceParam: [
                                    'network_dns'
                                ],
                                stores: [
                                    
                                ],
                                text: 'DNS',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_dns_ddns',
                                deviceParam: [
                                    'network_ddns'
                                ],
                                stores: [
                                    'store_serviceServer'
                                ],
                                text: 'DDNS',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_dns_iodns',
                                deviceParam: [
                                    'splitdns_list'
                                ],
                                stores: [
                                    'store_split_dns_list',
                                    'store_split_zone',
                                    'store_split_type'
                                ],
                                text: '내부/외부 DNS',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_dns_cache',
                                deviceParam: [
                                    'dns_cache'
                                ],
                                stores: [
                                    'store_network_dnscache_list',
                                    'store_interface'
                                ],
                                text: 'DNS Cache',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_static',
                                deviceParam: [
                                    'network_router_static'
                                ],
                                stores: [
                                    'store_router_static_list',
                                    'store_interface'
                                ],
                                text: 'Static 라우팅',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_policy',
                                deviceParam: [
                                    'network_router_policy'
                                ],
                                stores: [
                                    'store_router_policy_list',
                                    'store_interface'
                                ],
                                text: 'Policy 라우팅',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_multipath',
                                deviceParam: [
                                    'network_router_multipath'
                                ],
                                stores: [
                                    'store_multi_line_select_list',
                                    'store_network_multipath_list',
                                    'store_interface'
                                ],
                                text: 'Multipath',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_multicast',
                                deviceParam: [
                                    'network_router_multicast'
                                ],
                                stores: [
                                    'store_interface',
                                    'store_use_interface'
                                ],
                                text: 'Multicast',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_vrrp',
                                deviceParam: [
                                    'network_router_vrrp'
                                ],
                                stores: [
                                    'store_network_router_vrrp_list',
                                    'store_interface',
                                    'store_vrrp_failover'
                                ],
                                text: 'VRRP',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_checker',
                                deviceParam: [
                                    'network_router_checker'
                                ],
                                stores: [
                                    'store_network_router_checker_list',
                                    'store_interface',
                                    'store_checker_period',
                                    'store_checker_action'
                                ],
                                text: 'Checker',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_router_script',
                                deviceParam: [
                                    'network_router_script'
                                ],
                                stores: [
                                    
                                ],
                                text: '스크립트',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ha_sync',
                                deviceParam: [
                                    'network_ha_sync'
                                ],
                                stores: [
                                    'store_interface',
                                    'store_session_sync_list',
                                    'store_config_sync_list',
                                    'store_ha_sync_day',
                                    'store_ha_sync_hour',
                                    'store_ha_sync_minute',
                                    'store_log_sync_list'
                                ],
                                text: '동기화 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ha_l3',
                                deviceParam: [
                                    'ha_branch_script',
                                    'ha_head_script'
                                ],
                                stores: [
                                    'store_l3_compose',
                                    'store_l3_config_a',
                                    'store_l3_config_s',
                                    'store_l3_way_a',
                                    'store_l3_way_s',
                                    'store_ha_head_list',
                                    'store_interface'
                                ],
                                text: 'L3',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ha_l2',
                                deviceParam: [
                                    'ha_branch_script',
                                    'ha_head_script'
                                ],
                                stores: [
                                    'store_l2_compose',
                                    'store_l2_config_a',
                                    'store_l2_config_s',
                                    'store_l2_way_s',
                                    'store_ha_branch_list',
                                    'store_interface',
                                    'store_l2_type'
                                ],
                                text: 'L2',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ha_lb',
                                deviceParam: [
                                    'ha_load_balancing_script'
                                ],
                                stores: [
                                    'store_interface',
                                    'store_ha_lb_list',
                                    'store_ha_lb_type',
                                    'store_ha_lb_action'
                                ],
                                text: '부하 분산',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_ipm_network',
                                deviceParam: [
                                    'network_ipm_manager'
                                ],
                                stores: [
                                    'store_ipm_network_list',
                                    'store_interface'
                                ],
                                text: '관리 네트워크',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_ipm_allowHost',
                                deviceParam: [
                                    'network_ipm_manager',
                                    'network_ipm_host'
                                ],
                                stores: [
                                    'store_ipm_host_list',
                                    'store_ipm_host_manager_list'
                                ],
                                text: '허용호스트 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_llcf',
                                deviceParam: [
                                    'link_pack_script',
                                    'bond_pack_script'
                                ],
                                stores: [
                                    'store_physical_link',
                                    'store_physical_bond'
                                ],
                                text: 'LLCF',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ipv6Tunneling_6to4',
                                deviceParam: [
                                    'network_tunneling_6to4'
                                ],
                                stores: [
                                    'store_interface',
                                    'store_tunnel_6to4_list'
                                ],
                                text: '6 to 4',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ipv6Tunneling_6in4',
                                deviceParam: [
                                    'network_tunneling_6in4'
                                ],
                                stores: [
                                    'store_interface',
                                    'store_tunnel_set_list'
                                ],
                                text: '터널링 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_network_ipv6Tunneling_isatap',
                                deviceParam: [
                                    'network_tunneling_isatap'
                                ],
                                stores: [
                                    'store_interface_isatap',
                                    'store_tunnel_isatap_list'
                                ],
                                text: 'ISATAP',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '로그',
                        panelId: 'NFW2_log_config_log',
                        deviceParam: [
                            'log_setting'
                        ],
                        stores: [
                            'store_logDataDate',
                            'store_network_range',
                            'store_pname_list'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_log_config_log',
                                deviceParam: [
                                    'log_setting'
                                ],
                                stores: [
                                    'store_logDataDate',
                                    'store_network_range',
                                    'store_pname_list'
                                ],
                                text: '기본 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_log_config_logDetail',
                                deviceParam: [
                                    'log_detail_setting'
                                ],
                                stores: [
                                    
                                ],
                                text: '상세 설정',
                                leaf: true
                            },
                            {
                                panelId: 'NFW2_log_config_logServer',
                                deviceParam: [
                                    'syslog_setting',
                                    'system_snmp'
                                ],
                                stores: [
                                    'store_logserver_xtm',
                                    'store_logserver_syslist',
                                    'store_system_snmp_list',
                                    'store_auth_algo',
                                    'store_privacy_algo'
                                ],
                                text: '서버 설정',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'DDoS',
                        panelId: 'NFW2_ddos_trafficAnomaly',
                        deviceParam: [
                            'traffic_anomaly'
                        ],
                        stores: [
                            'store_trafficAnomaly_dns_portList',
                            'store_trafficAnomaly_portList',
                            'store_trafficAnomaly_sql_portList'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_ddos_trafficAnomaly',
                                deviceParam: [
                                    'traffic_anomaly'
                                ],
                                stores: [
                                    'store_trafficAnomaly_dns_portList',
                                    'store_trafficAnomaly_portList',
                                    'store_trafficAnomaly_sql_portList'
                                ],
                                text: '비정상 트래픽 검사',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'IPS',
                        panelId: 'NFW2_ips_portScan',
                        deviceParam: [
                            
                        ],
                        stores: [
                            
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_ips_portScan',
                                deviceParam: [
                                    
                                ],
                                stores: [
                                    
                                ],
                                text: 'PortScan',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'IPSec VPN',
                        panelId: 'NFW2_ipsec_etc',
                        deviceParam: [
                            'vpn_etc'
                        ],
                        stores: [
                            'store_etc_dr_list',
                            'store_etc_dr_tunnel',
                            'store_etc_tunnel',
                            'store_etc_tunnel_list',
                            'store_etc_tunnel_sd',
                            'store_etc_xauth_list',
                            'store_interface'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'NFW2_ipsec_etc',
                                deviceParam: [
                                    'vpn_etc'
                                ],
                                stores: [
                                    'store_etc_dr_list',
                                    'store_etc_dr_tunnel',
                                    'store_etc_tunnel',
                                    'store_etc_tunnel_list',
                                    'store_etc_tunnel_sd',
                                    'store_etc_xauth_list',
                                    'store_interface'
                                ],
                                text: '기타',
                                leaf: true
                            }
                        ]
                    }
                ]
            },
            viewConfig: {

            },
            listeners: {
                itemclick: 'onPnl_zen_devicemenu_treeItemClick'
            }
        },
        {
            xtype: 'container',
            flex: 1,
            region: 'center',
            itemId: 'ctn_device_center',
            margin: '0, 0, 5, 0',
            layout: 'fit'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 25,
            itemId: 'ctn_device_control',
            margin: '0, 5, 5, 0',
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
                        click: 'onBt_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancelClick'
                    }
                }
            ]
        }
    ],

    onWin_zen_device_setAfterRender: function(component, eOpts) {
        // 0. 공통 변수 선언
        var me = this;
        var dev_data = me.deviceParams;
        var ctn_center = me.down('[itemId=ctn_device_center]');

        // 1. 윈도우 타이틀 변경

        me.setTitle(ZEN_SET_PRODUCT);

        // 2. Ext.application 정보 수정

        var st_timezone = Ext.getStore('store_timezone');
        var st_timesync = Ext.getStore('store_timesync');
        var st_timeserver = Ext.getStore('store_timeserver');

        if(!st_timezone)    Ext.create('SMC4ZEN.store.store_timezone');
        if(!st_timesync)	Ext.create('SMC4ZEN.store.store_timesync');
        if(!st_timeserver)	Ext.create('SMC4ZEN.store.store_timeserver');

        Ext.application({
            stores: ['store_timezone', 'store_timesync', 'store_timeserver'],
            views: ['NFW2_system_basic'],
            models: [],
            appFolder: 'app',
            name: 'SMC4ZEN',
            launch: function() {

                // 3. Application 정보 갱신

                // 3-1. 화면 리스트에 해당하는 패널 객체 생성

                var activationView = Ext.create('SMC4ZEN.view.NFW2_system_basic', {

                    'parentObj' : me,
                    'deviceMode' : component.deviceMode

                });

                // 3-2. 패널 객체의 뷰-모델 객체 얻어오기

                var vm_basicdata = activationView.getViewModel();

                // 3-3. system_basic 아이템 가져오기

                // 3-3-1. 주의! - Zen 장비의 기본 설정값은 해당 패널의 뷰-모델이 아닌 win_zen_device_set의 뷰-모델에서 데이터를 가져오는 것입니다.

                vm_basicdata.set('system_basic', me.getViewModel().getData()['system_basic']);

                // 3-2. 생성된 패널 붙이기

                ctn_center.add(activationView);

                // 3-3. 이전 패널 정보 저장

                me.oldView = activationView;
                me.oldClass = 'SMC4ZEN.view.NFW2_system_basic';

            }

        });

        // 3. (2015.08.18 store_interface 초기화 구문 추가)

        var st_interface = Ext.getStore('store_interface');

        if(!st_interface){

            st_interface = Ext.create('SMC4ZEN.store.store_interface');

        }

        st_interface.removeAll();

        for(var i = 0; i <= 25; i++){

            st_interface.add({	'name' : 'eth' + i	});

        }
    },

    onWin_zen_device_setBeforeDestroy: function(component, eOpts) {

    },

    onPnl_zen_devicemenu_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        var pnl_id = record.get('panelId');
        var st_param = record.get('stores');
        var key_param = record.get('deviceParam');
        var dev_param = this.deviceParams;

        this.createInnerview('SMC4ZEN.view.' + pnl_id, key_param, st_param, dev_param);
    },

    onBt_saveClick: function(button, e, eOpts) {
        var me = this;
        var vm = me.getViewModel();
        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicezengroup).getSelection()[0].get('cid');
        var deviceParams = vm.getData();
        var filterValue = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_zen_device_search]').down('[itemId=txf_searchstr]').getValue();

        if(me.deviceMode === 'MODIFY'){

            if(!me.oldView.saveData()){

                return;

            }

            var service = 'ftSMC',
                svc_func = 'modDevice',
                params = {
                    'obj' : Ext.encode(deviceParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var showMode = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');

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

                            var st_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist).getStore();

                            st_zenlist.loadData(res);

                            // 2015.03.25 김민수 : 저장될 때 필터가 적용되도록 수정

                            searchDeviceName(st_zenlist, filterValue, ['name', 'ip']);

                        }

                    );

                    me.destroy();

                }

            );

        }
        else{

            if(!me.oldView.saveData()){

                return;

            }

            var service = 'ftSMC',
                svc_func = 'addDevice',
                params = {
                    'obj' : Ext.encode(deviceParams),
                    'g_cid' : Ext.encode(groupCid)
                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var showMode = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]');

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

                            var st_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist).getStore();

                            st_zenlist.loadData(res);

                            // 2015.03.25 김민수 : 저장될 때 필터가 적용되도록 수정

                            searchDeviceName(st_zenlist, filterValue, ['name', 'ip']);

                        }

                    );

                    me.destroy();

                }

            );

        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        // onBt_cancelClick =============================================================================================================================================================

        this.destroy();
    },

    /*
        일 시 : 2015.08.12

        설 명 : Zen 화면 노드 선택시 설정화면을 생성하고 View 영역에 생성된 화면을 추가합니다.
    */
    createInnerview: function(panelId, deviceParam, storeParam, deviceData) {
        // 0. 공통 변수 선언

        var me = this;
        var load_view = panelId.replace("SMC4ZEN.view.","");
        var centerCont = me.down('[itemId=ctn_device_center]');

        me.setLoading('ZEN 환경설정 로드 중 ...', true);

        // 1. 이전에 생성되어 있는 패널 제거

        if(me.oldView){

            me.oldView.close();

        }

        // 2. 필수 스토어 생성

        if(storeParam){

            for(var i = 0, max = storeParam.length; i < max; i++){

                if(!Ext.getStore(storeParam[i])){

                    Ext.create('SMC4ZEN.store.' + storeParam[i]);

                }

            }

        }

        console.log('deviceParam - ', deviceParam);

        // 3. Application 정보 갱신

        if(me.viewState){

            Ext.application({
                stores: storeParam,
                views: load_view,
                models: [],
                appFolder: 'app',
                name: 'SMC4ZEN',
                launch: function() {

                    var paramArray = [];

                    // 3-1. 설정 화면 생성

                    var activationView = Ext.create(panelId, {

                        'parentObj' : me,
                        'deviceMode' : me.deviceMode

                    });

                    // 3-2. 설정 화면 뷰-모델 객체 얻어오기

                    var vm_activate = activationView.getViewModel();

                    for(var i = 0, max = deviceParam.length; i < max; i++){

                        var vm_data = me.getViewModel().getData()[deviceParam[i]];

                        // 3-2-1. 뷰-모델 데이터가 없을 경우 (기본 디폴트 값 혹은 다른 문제로 불러오지 못한 경우)

                        if(vm_data === undefined)	continue;


                        // 3-2-2. 뷰-모델 데이터가 객체라면 뷰-모델에 데이터 바로 입력

                        vm_activate.set(deviceParam[i], vm_data);

                    }

                    console.log('View model data -> ', vm_activate.getData());

                    // 3-2. 생성된 패널 붙이기

                    centerCont.add(activationView);

                    // 3-3. 이전 패널 정보 저장

                    me.oldView = activationView;
                    me.oldClass = panelId;
                    me.setLoading(false);

                }

            });

        }
        else{

            me.setLoading(false);

        }
    }

});

Ext.define('SMC4ZEN.view.win_smc_device_set', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_smc_device_setViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    config: {
        viewState: true
    },

    viewModel: {
        type: 'win_smc_device_set'
    },
    constrain: true,
    height: 650,
    id: 'win_smc_device_set',
    minHeight: 600,
    minWidth: 100,
    width: 1000,
    layout: 'border',
    title: '장비명',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onWin_smc_device_setAfterRender',
        beforedestroy: 'onWin_smc_device_setBeforeDestroy'
    },
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
            animate: true,
            root: {
                text: 'XTM',
                expanded: true,
                panelId: 'pnl_xtm_basic',
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
                        panelId: 'pnl_xtm_basic',
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
                        stores: [
                            
                        ],
                        leaf: true
                    },
                    {
                        text: '네트워크',
                        panelId: 'pnl_xtm_network_interface',
                        deviceParam: 'network_interface',
                        expanded: false,
                        stores: [
                            'st_etc_eth',
                            'st_interface_grid'
                        ],
                        children: [
                            {
                                panelId: 'pnl_xtm_network_interface',
                                deviceParam: 'network_interface',
                                text: '인터페이스',
                                stores: [
                                    'st_etc_eth',
                                    'st_interface_grid'
                                ],
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_bridge',
                                deviceParam: 'network_bridge',
                                stores: [
                                    'st_bridge_name',
                                    'st_bridge_set',
                                    'st_bridge_bridgemember'
                                ],
                                text: '브릿지',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_bonding',
                                deviceParam: 'network_bonding',
                                stores: [
                                    'st_bonding_arpip',
                                    'st_bonding_member',
                                    'st_bonding_primary',
                                    'st_bonding_set'
                                ],
                                text: '본딩',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_vlan',
                                deviceParam: 'network_vlan',
                                stores: [
                                    'st_vlan_set'
                                ],
                                text: 'vlan',
                                leaf: true
                            },
                            {
                                text: 'DNS',
                                expended: true,
                                panelId: 'pnl_xtm_dns_dynamic',
                                deviceParam: 'network_ddns',
                                children: [
                                    {
                                        panelId: 'pnl_xtm_dns_dynamic',
                                        deviceParam: 'network_ddns',
                                        text: 'DDNS',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'pnl_xtm_dns_inner',
                                        deviceParam: 'network_splitdns_innerdns',
                                        stores: [
                                            'st_dns_indomain',
                                            'st_dns_enablenet'
                                        ],
                                        text: '내부',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'pnl_xtm_dns_outer',
                                        deviceParam: 'network_splitdns_outerdns',
                                        stores: [
                                            'st_dns_outdomain',
                                            'st_dns_outenablenet'
                                        ],
                                        text: '외부',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                text: 'Anomaly',
                                expended: true,
                                panelId: 'pnl_xtm_anomaly_traffic',
                                stores: [
                                    
                                ],
                                deviceParam: 'network_anomaly',
                                children: [
                                    {
                                        panelId: 'pnl_xtm_anomaly_traffic',
                                        deviceParam: 'network_anomaly',
                                        stores: [
                                            
                                        ],
                                        text: 'Traffic Anomaly',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'pnl_xtm_anomaly_portscan',
                                        deviceParam: 'network_anomaly_portscan',
                                        stores: [
                                            'st_portscan_extention',
                                            'st_portscan_watchip',
                                            'st_portscan_sourceip',
                                            'st_portscan_destinationip'
                                        ],
                                        text: 'Portscan Anomaly',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'pnl_xtm_anomaly_ipspoofing',
                                        deviceParam: 'network_anomaly_spoofing',
                                        stores: [
                                            
                                        ],
                                        text: 'IP Spoofing',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                panelId: 'pnl_xtm_network_dhcp_server',
                                expended: true,
                                deviceParam: 'network_dhcp_server',
                                stores: [
                                    'st_dhcpserver_set'
                                ],
                                text: 'DHCP',
                                children: [
                                    {
                                        panelId: 'pnl_xtm_network_dhcp_server',
                                        deviceParam: 'network_dhcp_server',
                                        stores: [
                                            'st_dhcpserver_set'
                                        ],
                                        text: 'DHCP 서버',
                                        leaf: true
                                    },
                                    {
                                        panelId: 'pnl_xtm_network_dhcp_relay',
                                        stores: [
                                            'st_dhcprelay_member'
                                        ],
                                        deviceParam: 'network_dhcp_relay',
                                        text: 'DHCP 릴레이',
                                        leaf: true
                                    }
                                ]
                            },
                            {
                                panelId: 'pnl_xtm_network_virtual_ip',
                                deviceParam: [
                                    'network_virtual_ip',
                                    'network_virtual_ipv6'
                                ],
                                text: '가상 IP 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_ipv6_tunnel',
                                text: 'IPv6 터널',
                                deviceParam: [
                                    'network_tunneling_6in4',
                                    'network_tunneling_6to4'
                                ],
                                stores: [
                                    'st_tunnel_set'
                                ],
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_ipmanage',
                                deviceParam: 'ip_manager',
                                stores: [
                                    'st_ipmanager_set'
                                ],
                                text: 'IP 관리 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_ipscan',
                                deviceParam: 'ip_scan',
                                stores: [
                                    'st_ipscan_set'
                                ],
                                text: 'IP Scan 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_network_l2tp',
                                deviceParam: 'l2tp_config',
                                text: 'L2TP',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '라우터',
                        expended: true,
                        panelId: 'pnl_xtm_route_static',
                        deviceParam: 'network_router_static',
                        stores: [
                            'st_route_policynum',
                            'st_route_static_ipv4',
                            'st_route_static_ipv6'
                        ],
                        children: [
                            {
                                panelId: 'pnl_xtm_route_static',
                                deviceParam: 'network_router_static',
                                stores: [
                                    'st_route_policynum',
                                    'st_route_static_ipv4',
                                    'st_route_static_ipv6'
                                ],
                                text: '정적 라우팅',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_route_policy',
                                deviceParam: 'network_router_policy',
                                stores: [
                                    'st_route_policy_ipv4',
                                    'st_route_policy_ipv6'
                                ],
                                text: '정책기반 라우팅',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_route_multicast',
                                deviceParam: 'network_router_multicast',
                                stores: [
                                    'st_route_multicast_ethlist'
                                ],
                                text: '멀티캐스트',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_route_vrrp',
                                deviceParam: 'network_router_vrrp',
                                stores: [
                                    'st_route_vrrp'
                                ],
                                text: 'VRRP',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_route_checker',
                                deviceParam: 'network_router_checker',
                                stores: [
                                    'st_route_checker'
                                ],
                                text: '체커',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_route_script',
                                deviceParam: 'network_router_script',
                                stores: [
                                    
                                ],
                                text: '스크립트',
                                leaf: true
                            }
                        ]
                    },
                    {
                        panelId: 'pnl_xtm_policy_setting',
                        text: '보안 설정',
                        deviceParam: 'spdinfo',
                        stores: [
                            'st_object_select',
                            'st_policy_filter',
                            'st_policy_vlaneth',
                            'st_policy_vlan'
                        ],
                        leaf: true
                    },
                    {
                        text: 'HA',
                        expended: true,
                        panelId: 'pnl_xtm_ha_sync',
                        deviceParam: 'sync_session_backup',
                        stores: [
                            
                        ],
                        children: [
                            {
                                panelId: 'pnl_xtm_ha_sync',
                                deviceParam: 'sync_session_backup',
                                stores: [
                                    
                                ],
                                text: '동기화',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_ha_head_office',
                                deviceParam: 'ha_head_script',
                                stores: [
                                    'st_ha_headoffice_set',
                                    'st_ha_master_backup_grid',
                                    'st_ha_bridge_grid'
                                ],
                                text: '본점',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_ha_branch_office',
                                deviceParam: 'ha_branch_script',
                                stores: [
                                    'st_ha_branchmain_subgrid',
                                    'st_ha_branchmain_extgrid',
                                    'st_ha_branchmain_sourgrid',
                                    'st_ha_branchmain_destgrid',
                                    'st_ha_branchsub_maingrid',
                                    'st_ha_branchsub_extgrid'
                                ],
                                text: '지점',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_ha_physical_link',
                                deviceParam: 'link_pack_script',
                                stores: [
                                    'st_ha_link_grid',
                                    'st_ha_bond_grid'
                                ],
                                text: '물리적링크',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'IPSEC VPN',
                        panelId: 'pnl_xtm_vpn_ipsec',
                        deviceParam: [
                            'vpn_setting',
                            'vpninfo'
                        ],
                        stores: [
                            'st_vpn_ipset'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_vpn_ipsec',
                                text: 'IPSEC VPN',
                                deviceParam: [
                                    'vpn_setting',
                                    'vpninfo'
                                ],
                                stores: [
                                    'st_vpn_ipset'
                                ],
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_vpn_head_office',
                                deviceParam: 'vpn_script',
                                stores: [
                                    'st_vpn_headoffice'
                                ],
                                text: '본점',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_vpn_branch_office',
                                deviceParam: 'vpn_script',
                                stores: [
                                    'st_vpn_source',
                                    'st_vpn_destination'
                                ],
                                text: '지점',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_vpn_host',
                                deviceParam: 'vpn_fixed_sechost',
                                stores: [
                                    
                                ],
                                text: '보안호스트 고정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_vpn_option',
                                deviceParam: 'vpn_script',
                                stores: [
                                    
                                ],
                                text: '기타 설정',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'SSL VPN',
                        panelId: 'pnl_xtm_ssl_vpn',
                        deviceParam: 'ssl_setting',
                        stores: [
                            'st_ssl_usrgroups'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_ssl_vpn',
                                text: 'SSL VPN 설정',
                                deviceParam: 'ssl_setting',
                                stores: [
                                    'st_ssl_usrgroups'
                                ],
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_ssl_inspection',
                                text: 'SSLI 설정',
                                deviceParam: 'ssli',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'WAF',
                        panelId: 'pnl_xtm_waf_webserver',
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
                        panelId: 'pnl_xtm_anti_virus',
                        deviceParam: 'anti_virus',
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_anti_virus',
                                text: '안티 바이러스',
                                deviceParam: 'anti_virus',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_anti_spam',
                                text: '안티 스팸',
                                stores: [
                                    'st_spam_rblserver',
                                    'st_spam_rulelist'
                                ],
                                deviceParam: 'anti_spam',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_anti_mail_filter',
                                text: '메일 필터링',
                                deviceParam: 'anti_smtp',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: 'ALG',
                        panelId: 'pnl_xtm_alg_telnet',
                        deviceParam: 'alg_telnet_proxy',
                        stores: [
                            'st_alg_telnet'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_alg_telnet',
                                deviceParam: 'alg_telnet_proxy',
                                stores: [
                                    'st_alg_telnet'
                                ],
                                text: 'Telnet',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_alg_ftp',
                                deviceParam: 'alg_ftp_proxy',
                                stores: [
                                    'st_alg_ftp',
                                    'st_alg_interface',
                                    'st_alg_userlist'
                                ],
                                text: 'FTP',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '시스템',
                        panelId: 'pnl_xtm_system_manager',
                        deviceParam: [
                            'system_user_admin',
                            'system_user_access'
                        ],
                        stores: [
                            'st_system_manager_accset',
                            'st_system_managergrid',
                            'st_system_auth',
                            'st_system_manager_portset'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_system_manager',
                                deviceParam: [
                                    'system_user_admin',
                                    'system_user_access'
                                ],
                                stores: [
                                    'st_system_manager_accset',
                                    'st_system_managergrid',
                                    'st_system_auth',
                                    'st_system_manager_portset'
                                ],
                                text: '관리자',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_system_auth_config',
                                deviceParam: 'network_radius',
                                stores: [
                                    
                                ],
                                text: '외부서버 인증',
                                leaf: true
                            },
                            //                    {
                            //                        panelId : 'xtm_system_certificate',
                            //                        text: '인증서',
                            //                        leaf: true
                            //                    },
                            {
                                panelId: 'pnl_xtm_system_snmp',
                                deviceParam: 'system_snmp',
                                stores: [
                                    'st_system_snmp_set'
                                ],
                                text: 'SNMP',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_system_basic',
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
                        panelId: 'pnl_xtm_mgt_log',
                        deviceParam: 'log_setting',
                        stores: [
                            'st_logset_ip'
                        ],
                        expended: true,
                        children: [
                            {
                                panelId: 'pnl_xtm_mgt_log',
                                deviceParam: 'log_setting',
                                stores: [
                                    'st_logset_ip'
                                ],
                                text: '기본 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_report',
                                deviceParam: [
                                    'report_type',
                                    'log_setting',
                                    'manage_log_report'
                                ],
                                text: '보고서 설정',
                                stores: [
                                    'st_report_reportlist',
                                    'st_tracker_act',
                                    'st_tracker_sort',
                                    'st_tracker_search'
                                ],
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_syslog',
                                deviceParam: 'syslog_setting',
                                stores: [
                                    'st_syslog_standardset'
                                ],
                                text: '로그 전송',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_alarm',
                                deviceParam: 'alarm_setting',
                                text: '알람 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_monitor',
                                deviceParam: 'manage_monitor',
                                stores: [
                                    'st_moniter_set'
                                ],
                                text: '모니터 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_rtt',
                                deviceParam: 'log_rtt_setting',
                                stores: [
                                    'st_rtt_set'
                                ],
                                text: 'RTT 설정',
                                leaf: true
                            },
                            {
                                panelId: 'pnl_xtm_mgt_rtm',
                                deviceParam: 'log_setting',
                                stores: [
                                    'st_rtm_checketh',
                                    'st_rtm_checkbandwidth'
                                ],
                                text: 'RTM 설정',
                                leaf: true
                            }
                        ]
                    },
                    {
                        text: '기타 설정',
                        panelId: 'pnl_xtm_etc_setting',
                        deviceParam: [
                            'fw_script',
                            'vpn_script',
                            'network_interface',
                            'center_setup'
                        ],
                        stores: [
                            'st_etc_eth'
                        ],
                        leaf: true
                    }
                ]
            },
            viewConfig: {

            },
            listeners: {
                itemclick: 'onPnl_smc_devicemenu_treeItemClick'
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

    onWin_smc_device_setAfterRender: function(component, eOpts) {
        component.setTitle(DEVICE_COMMON_CONST.DEVICE_WIN_TITLE + ' : ' + this.deviceParams.name);

        this.on('getDeviceInfo', this.getDeviceInfo);

        // 0. 공통 변수 선언

        var me = this;
        var ctn_center = this.down('[itemId=ctn_device_center]');
        var trpn_devmenu = component.down('[itemId=pnl_smc_devicemenu_tree]');

        // 2. 초기화면 생성

        var activationView = Ext.create('SMC4ZEN.view.pnl_xtm_basic', {

            'deviceParams' : function(){

                var paramArray = [];
                var paramIndex = ['@cid', '@groupcid', 'name', 'desc', 'center_setup', 'network_interface', 'system_setting_option', 'system_autoup', 'log_setting', 'group_code', 'device_code', 'location'];

                for(var i = 0; i < paramIndex.length; i++){

                    paramArray.push(me.deviceParams[paramIndex[i]]);

                }

                return paramArray;

            }(),
            'deviceMode' : component.deviceMode

        });

        // 3. 생성된 화면을 컨테이너 아이템에 추가

        ctn_center.add(activationView);

        this.oldView = activationView;
        this.oldClass = 'SMC4ZEN.view.pnl_xtm_basic';
    },

    onWin_smc_device_setBeforeDestroy: function(component, eOpts) {
        var devEthStore = Ext.getStore('st_common_deveth');
        var totalEthStore = Ext.getStore('st_common_totaleth');
        var bondEthStore = Ext.getStore('st_common_bondeth');
        var vlanEthStore = Ext.getStore('st_common_vlaneth');
        var allEthStore = Ext.getStore('st_common_alleth');
        var pppEthStore = Ext.getStore('st_common_pppeth');

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

        devEthStore.loadData(ethArray);
        totalEthStore.loadData(ethArray);
        bondEthStore.loadData(ethArray);
        vlanEthStore.loadData(ethArray);
        allEthStore.loadData(ethArray);
        pppEthStore.loadData(ethArray);

        policyVlan.removeAll();
        serverStore.removeAll();
        policyNum.removeAll();

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

        this.removeAll();
    },

    onPnl_smc_devicemenu_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        var pnl_id = record.get('panelId');
        var st_param = record.get('stores');
        var key_param = record.get('deviceParam');
        var dev_param = this.deviceParams;

        this.down('[itemId=ctn_device_center]').setLoading('설정 화면 로드 중 ...', true);

        this.createInnerview('SMC4ZEN.view.' + pnl_id, key_param, st_param, dev_param);
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 단일 장비 설정을 저장합니다. 모드에 따라 수정, 추가 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var nowPanel = Ext.getCmp(this.oldClass.split('.')[2]);
        var groupCid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelection()[0].get('cid');
        var filterValue = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]').getValue();

        if(this.deviceMode === 'MODIFY'){

            if(!nowPanel.saveData()){

                return;

            }

            this.setLoading('장비 설정을 저장하는 중 ...', true);

            var service = 'ftSMC',
                svc_func = 'modDevice',
                params = {
                    'obj' : Ext.encode(this.deviceParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var service = 'ftSMC',
                        serchService = 'getDeviceList',
                        params = {

                            'g_cid' : Ext.encode(groupCid),
                            'isRecursive' : Ext.encode(SMC_GROUP_RECURSIVE)

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

            this.setLoading('장비 설정을 저장하는 중 ...', true);

            var service = 'ftSMC',
                svc_func = 'addDevice',
                params = {

                    'obj' : Ext.encode(this.deviceParams),
                    'g_cid' : Ext.encode(this.deviceParams['@groupcid'])

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var service = 'ftSMC',
                        serchService = 'getDeviceList',
                        params = {

                            'g_cid' : Ext.encode(groupCid),
                            'isRecursive' : Ext.encode(SMC_GROUP_RECURSIVE)

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

                }

            );

        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        // onBt_cancelClick =============================================================================================================================================================

        Ext.getCmp('win_smc_device_set').destroy();
    },

    createInnerview: function(panelId, deviceParam, storeParam, deviceData) {
        // 0. 공통 변수 선언

        var ctn_devcenter = this.down('[itemId=ctn_device_center]');

        // 1. 이전에 생성되어 있는 패널 제거

        if(this.oldView){

            this.oldView.close();

        }

        // 2. 필수 스토어 생성

        if(storeParam){

            for(var i = 0, max = storeParam.length; i < max; i++){

                if(!Ext.getStore(storeParam[i])){

                    Ext.create('SMC4ZEN.store.' + storeParam[i]);

                }

            }

        }

        // 3. 뷰-State 설정에 따라 새로 생성

        if(this.viewState){

            var activationView = Ext.create(panelId, {

                'deviceParams' : function(){

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

            // 4. 생성된 패널 붙이기

            ctn_devcenter.add(activationView);
            ctn_devcenter.setLoading(false);

            // 5. 현재의 뷰 상태를 저장

            this.oldView = activationView;
            this.oldClass = panelId;

        }

        // 6. 로드마스크 제거

        ctn_devcenter.setLoading(false);
    }

});
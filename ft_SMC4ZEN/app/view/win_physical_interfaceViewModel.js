
Ext.define('SMC4ZEN.view.win_physical_interfaceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_physical_interface',

    data: {
        basic_info: __zen('basic_info'),
        virtual_ip: __zen('virtual_ip'),
        dhcp_server: __zen('dhcp_server'),
        dhcp_relay: __zen('dhcp_relay'),
        id2: __zen('id2'),
        pwd2: __zen('pwd2'),
        inter: __zen('inter'),
        section: __zen('section'),
        ipv4_mask: __zen('ipv4_mask'),
        ipv6_pre: __zen('ipv6_pre'),
        duplex: __zen('duplex'),
        speed2: __zen('speed2'),
        mtu: __zen('mtu'),
        mss: __zen('mss'),
        zone: __zen('zone'),
        multipath: __zen('multipath'),
        qos_bandwidth: __zen('qos_bandwidth'),
        add_ipv4_mask: __zen('add_ipv4_mask'),
        add_ipv6_pre: __zen('add_ipv6_pre'),
        allocate_period: __zen('allocate_period'),
        tftp_server: __zen('tftp_server'),
        dns_primary: __zen('dns_primary'),
        dns_secondary: __zen('dns_secondary'),
        start_point: __zen('start_point'),
        end_point: __zen('end_point'),
        netmask: __zen('netmask'),
        default_gateway: __zen('default_gateway'),
        dhcp_server_ip: __zen('dhcp_server_ip'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
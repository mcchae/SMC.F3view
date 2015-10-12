
Ext.define('SMC4ZEN.view.win_logical_interfaceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_logical_interface',

    data: {
        inter_type: __zen('inter_type'),
        bonding_num: __zen('bonding_num'),
        member: __zen('member'),
        operate_mode: __zen('operate_mode'),
        link_monitor_cycle: __zen('link_monitor_cycle'),
        up_delay: __zen('up_delay'),
        up_delay_info: __zen('up_delay_info'),
        down_delay: __zen('down_delay'),
        down_delay_info: __zen('down_delay_info'),
        arp_cycle: __zen('arp_cycle'),
        add_arp_id: __zen('add_arp_id'),
        bridge_num: __zen('bridge_num'),
        stp: __zen('stp'),
        learn_period: __zen('learn_period'),
        vlan_id: __zen('vlan_id'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        bonding_info: __zen('bonding_info'),
        bridge_info: __zen('bridge_info'),
        vlan_info: __zen('vlan_info'),
        add_ipv4_mask: __zen('add_ipv4_mask'),
        add_ipv6_pre: __zen('add_ipv6_pre'),
        primary_inter: __zen('primary_inter'),
        hash_mode: __zen('hash_mode'),
        lacp_speed: __zen('lacp_speed')
    }

});
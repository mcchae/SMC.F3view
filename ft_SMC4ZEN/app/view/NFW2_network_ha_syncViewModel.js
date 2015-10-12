
Ext.define('SMC4ZEN.view.NFW2_network_ha_syncViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ha_sync',

    data: {
        line_sync: __zen('line_sync'),
        inter: __zen('inter'),
        dest_ip: __zen('dest_ip'),
        dest_mac: __zen('dest_mac'),
        mode: __zen('mode'),
        all_sel_desel: __zen('all_sel_desel'),
        reset_op: __zen('reset_op'),
        fw: __zen('fw'),
        ips: __zen('ips'),
        ipsec: __zen('ipsec'),
        log_text: __zen('log'),
        sec_policy: __zen('sec_policy'),
        nat_policy: __zen('nat_policy'),
        setting_ips: __zen('setting_ips'),
        setting_ipsec: __zen('setting_ipsec'),
        setting_log: __zen('setting_log'),
        device_name: __zen('device_name'),
        tar_device_name: __zen('tar_device_name'),
        tar_device_port: __zen('tar_device_port'),
        setting_master: __zen('setting_master'),
        setting_slave: __zen('setting_slave'),
        sync_port: __zen('sync_port'),
        device_name_master: __zen('device_name_master'),
        device_name_slave: __zen('device_name_slave'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
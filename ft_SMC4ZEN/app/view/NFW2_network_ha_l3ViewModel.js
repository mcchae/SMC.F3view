
Ext.define('SMC4ZEN.view.NFW2_network_ha_l3ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ha_l3',

    data: {
        config: __zen('config'),
        set: __zen('set'),
        method: __zen('method'),
        basic_group_num: __zen('basic_group_num'),
        add: __zen('add'),
        del: __zen('del'),
        inter: __zen('inter'),
        check_period: __zen('check_period'),
        timeout: __zen('timeout'),
        group_num: __zen('group_num'),
        active_virtual_ip: __zen('active_virtual_ip'),
        backup_virtual_ip: __zen('backup_virtual_ip'),
        l3_device_ip: __zen('l3_device_ip'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        backup_device_ip: __zen('backup_device_ip')
    }

});
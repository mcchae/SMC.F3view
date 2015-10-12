
Ext.define('SMC4ZEN.view.win_ha_l3ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ha_l3',

    data: {
        config: __zen('config'),
        set: __zen('set'),
        method: __zen('method'),
        basic_group_num: __zen('basic_group_num'),
        inter: __zen('inter'),
        check_period: __zen('check_period'),
        timeout: __zen('timeout'),
        group_num: __zen('group_num'),
        active_virtual_ip: __zen('active_virtual_ip'),
        backup_virtual_ip: __zen('backup_virtual_ip'),
        l3_device_ip: __zen('l3_device_ip'),
        ha_info1: __zen('ha_info1'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        backup_device_ip: __zen('backup_device_ip')
    }

});
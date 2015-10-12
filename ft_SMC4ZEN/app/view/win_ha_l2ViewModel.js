
Ext.define('SMC4ZEN.view.win_ha_l2ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ha_l2',

    data: {
        config: __zen('config'),
        set: __zen('set'),
        method: __zen('method'),
        router_backup: __zen('router_backup'),
        basic_group_num: __zen('basic_group_num'),
        inter: __zen('inter'),
        checker_type: __zen('checker_type'),
        target_ip: __zen('target_ip'),
        check_period: __zen('check_period'),
        virtual_ip: __zen('virtual_ip'),
        priority_level: __zen('priority_level'),
        timeout: __zen('timeout'),
        backup_mac: __zen('backup_mac'),
        group_num: __zen('group_num'),
        trans_cycle: __zen('trans_cycle'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
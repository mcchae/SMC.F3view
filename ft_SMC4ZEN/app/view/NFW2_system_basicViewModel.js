
Ext.define('SMC4ZEN.view.NFW2_system_basicViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_basic',

    data: {
        device_name: __zen('device_name'),
        ssh_connection_port: __zen('ssh_connection_port'),
        https_connection_port: __zen('https_connection_port'),
        https_connection_timeout: __zen('https_connection_timeout'),
        standard_time_zone: __zen('standard_time_zone'),
        time_sync: __zen('time_sync'),
        banner_text: __zen('banner_text'),
        cancel: __zen('cancel'),
        confirm: __zen('confirm'),
        system_info1: __zen('system_info1'),
        system_info2: __zen('system_info2'),
        bypass_set: __zen('bypass_set'),
        immediate_execute: __zen('immediate_execute')
    }

});
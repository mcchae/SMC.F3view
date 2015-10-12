
Ext.define('SMC4ZEN.view.NFW2_log_config_logViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_config_log',

    data: {
        log_info2: __zen('log_info2'),
        server_ip: __zen('server_ip'),
        id: __zen('id'),
        pwd: __zen('pwd'),
        save_location: __zen('save_location'),
        ssh_auth: __zen('ssh_auth'),
        log_data_period: __zen('log_data_period'),
        com_log_data_control: __zen('com_log_data_control'),
        add: __zen('add'),
        ip: __zen('ip'),
        port_setting: __zen('port_setting'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});


Ext.define('SMC4ZEN.view.NFW2_log_config_logServerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_config_logserver',

    data: {
        weguardia_log_server: __zen('weguardia_log_server'),
        ip: __zen('ip'),
        port: __zen('port'),
        use_encryption: __zen('use_encryption'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add: __zen('add'),
        del: __zen('del'),
        syslog_server: __zen('syslog_server'),
        snmp: __zen('snmp'),
        encryption: __zen('encryption'),
        mib_list: __zen('mib_list'),
        ip_type: __zen('ip_type'),
        user_name_comm: __zen('user_name_comm'),
        trap_address: __zen('trap_address'),
        auth_algorithm: __zen('auth_algorithm'),
        pwd_algorithm: __zen('pwd_algorithm')
    }

});

Ext.define('SMC4ZEN.view.win_snmpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_snmp',

    data: {
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        snmp_type: __zen('snmp_type'),
        ip_type: __zen('ip_type'),
        community: __zen('community'),
        user_name: __zen('user_name'),
        trap_address: __zen('trap_address'),
        auth_algorithm: __zen('auth_algorithm'),
        auth_pwd: __zen('auth_pwd'),
        pwd_algorithm: __zen('pwd_algorithm'),
        secret_pwd: __zen('secret_pwd')
    }

});
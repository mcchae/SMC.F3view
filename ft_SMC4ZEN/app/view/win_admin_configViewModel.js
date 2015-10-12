
Ext.define('SMC4ZEN.view.win_admin_configViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_admin_config',

    data: {
        id: __zen('id'),
        pwd: __zen('pwd'),
        pwd_confirm: __zen('pwd_confirm'),
        receiving_log_alarm_mail: __zen('receiving_log_alarm_mail'),
        access_authority: __zen('access_authority'),
        contact_num: __zen('contact_num'),
        pwd_period: __zen('pwd_period'),
        trusted_network: __zen('trusted_network'),
        use_otp: __zen('use_otp'),
        re_email: __zen('re_email'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
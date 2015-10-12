
Ext.define('SMC4ZEN.view.NFW2_system_admin_adminConfigViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_admin_adminconfig',
    data: {
        add: __zen('add'),
        del: __zen('del'),
        section: __zen('section'),
        id: __zen('id'),
        e_mail: __zen('e_mail'),
        access_authority: __zen('access_authority'),
        set: __zen('set'),
        log: __zen('log'),
        monitor: __zen('monitor'),
        contact_num: __zen('contact_num'),
        pwd_period: __zen('pwd_period'),
        trusted_network: __zen('trusted_network'),
        receiving_log_alarm_mail: __zen('receiving_log_alarm_mail')
    }
});
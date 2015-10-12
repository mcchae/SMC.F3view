
Ext.define('SMC4ZEN.view.NFW2_log_config_logDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_log_config_logdetail',

    data: {
        system: __zen('system'),
        network: __zen('network'),
        fw: __zen('fw'),
        ipsec_vpn: __zen('ipsec_vpn'),
        ssl_vpn: __zen('ssl_vpn'),
        ips: __zen('ips'),
        ddos: __zen('ddos'),
        av: __zen('av'),
        as: __zen('as'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
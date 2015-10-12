
Ext.define('SMC4ZEN.view.NFW2_network_dns_ddnsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_dns_ddns',

    data: {
        dynamic_dns: __zen('dynamic_dns'),
        service_provide: __zen('service_provide'),
        host_name: __zen('host_name'),
        user_name: __zen('user_name'),
        pwd: __zen('pwd'),
        user_hash: __zen('user_hash'),
        renewal_period: __zen('renewal_period'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});

Ext.define('SMC4ZEN.view.NFW2_network_dns_dnsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_dns_dns',

    data: {
        dns_server_fir: __zen('dns_server_fir'),
        dns_server_sec: __zen('dns_server_sec'),
        dns_server_thi: __zen('dns_server_thi'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});